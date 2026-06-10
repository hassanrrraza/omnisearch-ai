import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { buildOptimizeBlogPrompt } from "@/lib/prompts/optimize-blog";
import { OptimizeInputSchema } from "@/lib/schemas/optimize-input-schema";
import { OptimizeOutputSchema } from "@/lib/schemas/optimize-output-schema";

dotenv.config({ path: ".env.local", quiet: true });

async function optimize() {
  console.log("OmniSearch AI - Optimize Mode");
  console.log("==============================\n");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.error("ERROR: GEMINI_API_KEY is not set in .env.local\n");
    process.exit(1);
  }

  const blogPath = path.join(process.cwd(), "input", "existing-blog.md");
  if (!existsSync(blogPath)) {
    console.error(
      "ERROR: input/existing-blog.md not found.\n" +
        "Copy input/existing-blog.example.md to input/existing-blog.md " +
        "and paste your blog content.\n"
    );
    process.exit(1);
  }

  const configPath = path.join(process.cwd(), "input", "optimize-config.json");
  if (!existsSync(configPath)) {
    console.error(
      "ERROR: input/optimize-config.json not found.\n" +
        "Copy input/optimize-config.example.json to " +
        "input/optimize-config.json and fill in your values.\n"
    );
    process.exit(1);
  }

  console.log("Reading input files...");
  const existingBlog = await readFile(blogPath, "utf-8");
  const configRaw = await readFile(configPath, "utf-8");

  let config: unknown;
  try {
    config = JSON.parse(configRaw);
  } catch {
    console.error("ERROR: optimize-config.json is not valid JSON.\n");
    process.exit(1);
  }

  const inputData = { ...(config as object), existingBlog };
  const validated = OptimizeInputSchema.safeParse(inputData);
  if (!validated.success) {
    console.error("ERROR: Invalid config fields:");
    console.error(JSON.stringify(validated.error.flatten(), null, 2));
    process.exit(1);
  }

  console.log(`Keyword: ${validated.data.mainKeyword}`);
  console.log(`Goal: ${validated.data.optimizationGoal}`);
  console.log(`Blog length: ${existingBlog.length} characters\n`);
  console.log("Optimizing with Gemini...");
  console.log("(This takes 20-40 seconds)\n");

  const prompt = await buildOptimizeBlogPrompt(validated.data);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.0-flash",
    generationConfig: {
      responseMimeType: "application/json",
      maxOutputTokens: 8192,
    },
  });

  const result = await model.generateContent(prompt);
  const responseText = result.response.text();

  let responseJson: unknown;
  try {
    responseJson = JSON.parse(responseText);
  } catch {
    console.error("ERROR: Gemini returned non-JSON.");
    console.error("Raw (first 500):", responseText.slice(0, 500));
    process.exit(1);
  }

  const validatedOutput = OptimizeOutputSchema.safeParse(responseJson);
  const outputData = validatedOutput.success
    ? validatedOutput.data
    : (responseJson as Record<string, unknown>);

  if (!validatedOutput.success) {
    console.warn("WARNING: Output did not fully match schema. Saving anyway.\n");
  }

  const outputDir = path.join(process.cwd(), "output");
  await mkdir(outputDir, { recursive: true });

  const outputRecord = outputData as Record<string, unknown>;
  const slug = (outputRecord.slug as string) ?? "optimized-output";
  const optimizedMarkdown =
    (outputRecord.optimizedBlogMarkdown as string) ?? "";

  const jsonPath = path.join(outputDir, `${slug}-optimized.json`);
  await writeFile(jsonPath, JSON.stringify(outputData, null, 2), "utf-8");
  console.log(`Saved: output/${slug}-optimized.json`);

  const mdPath = path.join(outputDir, `${slug}-optimized.md`);
  await writeFile(mdPath, optimizedMarkdown, "utf-8");
  console.log(`Saved: output/${slug}-optimized.md`);

  const changesLog = outputRecord.changesLog;
  if (Array.isArray(changesLog)) {
    console.log(`\n${changesLog.length} changes made.`);
  }

  const scores = outputRecord.score as Record<string, number> | undefined;
  if (scores) {
    console.log("\n--- Optimization Scores ---");
    console.log(`SEO:     ${scores.seo}/100`);
    console.log(`AEO:     ${scores.aeo}/100`);
    console.log(`GEO:     ${scores.geo}/100`);
    console.log(`LLM:     ${scores.llm}/100`);
    console.log(`Overall: ${scores.overall}/100`);
  }

  console.log("\nDone. Files written to /output.\n");
}

optimize().catch((err: unknown) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
