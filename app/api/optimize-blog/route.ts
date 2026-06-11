import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";
import { buildOptimizeBlogContentPrompt } from "@/lib/prompts/optimize-blog-content";
import { buildOptimizeBlogReportPrompt } from "@/lib/prompts/optimize-blog-report";
import { OptimizedBlogContentSchema } from "@/lib/schemas/optimized-blog-content-schema";
import { OptimizeInputSchema } from "@/lib/schemas/optimize-input-schema";
import { OptimizeOutputSchema } from "@/lib/schemas/optimize-output-schema";
import { parseGeminiJson } from "@/lib/utils/json";

type GeminiModel = ReturnType<typeof getGeminiModel>;

async function generateParsedJson(
  model: GeminiModel,
  prompt: string,
  label: "content" | "report"
) {
  const result = await model.generateContent(prompt);
  const raw = result.response.text();
  const logLabel = `[optimize-blog:${label}]`;

  if (process.env.NODE_ENV === "development") {
    console.log(`${logLabel} raw length:`, raw.length);
    console.log(`${logLabel} raw preview:`, raw.slice(0, 500));
    console.log(`${logLabel} finish reason:`, result.response.candidates?.[0]?.finishReason);
    console.log(`${logLabel} prompt feedback:`, result.response.promptFeedback);
    console.log(
      `${logLabel} safety ratings:`,
      result.response.candidates?.[0]?.safetyRatings
    );
  }

  try {
    return parseGeminiJson(raw);
  } catch {
    if (label === "content") {
      throw new Error("INVALID_CONTENT_JSON");
    }

    throw new Error("INVALID_REPORT_JSON");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = OptimizeInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const model = getGeminiModel();

    const contentPrompt = await buildOptimizeBlogContentPrompt(parsed.data);
    const contentJson = await generateParsedJson(model, contentPrompt, "content");
    const contentData = OptimizedBlogContentSchema.safeParse(contentJson);

    if (!contentData.success) {
      return NextResponse.json(
        {
          error: "Gemini returned invalid optimized blog content.",
          hint: "The optimized content response did not match the expected shape. Try reducing the input length.",
          schemaErrors:
            process.env.NODE_ENV === "development"
              ? contentData.error.flatten()
              : undefined,
        },
        { status: 500 }
      );
    }

    const reportPrompt = buildOptimizeBlogReportPrompt({
      input: parsed.data,
      optimizedBlogMarkdown: contentData.data.optimizedBlogMarkdown,
    });
    const reportJson = await generateParsedJson(model, reportPrompt, "report");
    const reportData =
      reportJson && typeof reportJson === "object" && !Array.isArray(reportJson)
        ? (reportJson as Record<string, unknown>)
        : {};

    const finalOutput = {
      ...reportData,
      optimizedBlogMarkdown: contentData.data.optimizedBlogMarkdown,
    };

    const validated = OptimizeOutputSchema.safeParse(finalOutput);
    if (!validated.success) {
      return NextResponse.json(
        {
          error: "Gemini returned an optimization report that did not match the expected schema.",
          hint: "The metadata/report response may be incomplete or malformed. Try again.",
          schemaErrors:
            process.env.NODE_ENV === "development"
              ? validated.error.flatten()
              : undefined,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ data: validated.data });
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_CONTENT_JSON") {
      return NextResponse.json(
        {
          error: "Gemini returned invalid JSON while optimizing blog content.",
          hint: "The article may be too long or the response was truncated. Try reducing the input length.",
        },
        { status: 500 }
      );
    }

    if (error instanceof Error && error.message === "INVALID_REPORT_JSON") {
      return NextResponse.json(
        {
          error: "Gemini returned invalid JSON while generating optimization report.",
          hint: "The metadata/report response may be malformed. Try again.",
        },
        { status: 500 }
      );
    }

    console.error("[optimize-blog] error:", error);
    return NextResponse.json(
      { error: "Internal server error. Check server logs." },
      { status: 500 }
    );
  }
}
