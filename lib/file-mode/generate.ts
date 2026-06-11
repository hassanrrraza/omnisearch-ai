import { existsSync } from "fs";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import { buildCreateBlogPrompt } from "@/lib/prompts/create-blog";
import { BlogInputSchema } from "@/lib/schemas/blog-input-schema";
import { BlogOutputSchema } from "@/lib/schemas/blog-output-schema";

dotenv.config({ path: ".env.local", quiet: true });

async function generate() {
  console.log("OmniSearch AI - File Mode");
  console.log("=========================\n");

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    console.error(
      "ERROR: GEMINI_API_KEY is not set.\n" +
        "Add your key to .env.local:\n" +
        "  GEMINI_API_KEY=your_key_here\n"
    );
    process.exit(1);
  }

  const inputPath = path.join(process.cwd(), "input", "new-blog.json");
  if (!existsSync(inputPath)) {
    console.error(
      "ERROR: input/new-blog.json not found.\n" +
        "Copy input/new-blog.example.json to input/new-blog.json " +
        "and fill in your values.\n"
    );
    process.exit(1);
  }

  console.log("Reading input/new-blog.json...");
  const raw = await readFile(inputPath, "utf-8");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("ERROR: input/new-blog.json is not valid JSON.\n");
    process.exit(1);
  }

  const validated = BlogInputSchema.safeParse(parsed);
  if (!validated.success) {
    console.error("ERROR: Invalid input fields:");
    console.error(JSON.stringify(validated.error.flatten(), null, 2));
    process.exit(1);
  }

  console.log(`Title: ${validated.data.title}`);
  console.log(`Keyword: ${validated.data.mainKeyword}`);
  console.log(`Word count target: ${validated.data.wordCount}\n`);
  console.log("Building prompt and calling Gemini...");
  console.log("(This takes 15-30 seconds)\n");

  const prompt = await buildCreateBlogPrompt(validated.data);
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
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
    console.error("ERROR: Gemini returned non-JSON response.");
    console.error("Raw response (first 500 chars):", responseText.slice(0, 500));
    process.exit(1);
  }

  const validatedOutput = BlogOutputSchema.safeParse(responseJson);
  const outputData = validatedOutput.success
    ? validatedOutput.data
    : (responseJson as Record<string, unknown>);

  if (!validatedOutput.success) {
    console.warn(
      "WARNING: Output did not fully match schema. " +
        "Saving raw output anyway.\n"
    );
  }

  const outputDir = path.join(process.cwd(), "output");
  await mkdir(outputDir, { recursive: true });

  const outputRecord = outputData as Record<string, unknown>;
  const slug = (outputRecord.slug as string) ?? "blog-output";
  const blogMarkdown = (outputRecord.blogMarkdown as string) ?? "";
  const seoTitle = (outputRecord.seoTitle as string) ?? "";

  const jsonPath = path.join(outputDir, `${slug}.json`);
  await writeFile(jsonPath, JSON.stringify(outputData, null, 2), "utf-8");
  console.log(`Saved: output/${slug}.json`);

  const mdPath = path.join(outputDir, `${slug}.md`);
  await writeFile(mdPath, blogMarkdown, "utf-8");
  console.log(`Saved: output/${slug}.md`);

  const meta = {
    seoTitle,
    metaDescription: outputRecord.metaDescription,
    slug,
    targetKeyword: outputRecord.targetKeyword,
    secondaryKeywords: outputRecord.secondaryKeywords,
    excerpt: outputRecord.excerpt,
    featuredSnippet: outputRecord.featuredSnippet,
    llmSummary: outputRecord.llmSummary,
  };
  const metaPath = path.join(outputDir, `${slug}-metadata.json`);
  await writeFile(metaPath, JSON.stringify(meta, null, 2), "utf-8");
  console.log(`Saved: output/${slug}-metadata.json`);

  const schemaPath = path.join(outputDir, `${slug}-schema.json`);
  await writeFile(
    schemaPath,
    JSON.stringify(outputRecord.schemaJsonLd, null, 2),
    "utf-8"
  );
  console.log(`Saved: output/${slug}-schema.json`);

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

generate().catch((err: unknown) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
