import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel, MissingGeminiApiKeyError } from "@/lib/gemini";
import { buildCreateBlogPrompt } from "@/lib/prompts/create-blog";
import { BlogInputSchema } from "@/lib/schemas/blog-input-schema";
import { BlogOutputSchema } from "@/lib/schemas/blog-output-schema";
import { parseGeminiJson } from "@/lib/utils/json";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = BlogInputSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const prompt = await buildCreateBlogPrompt(parsed.data);

    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    if (process.env.NODE_ENV === "development") {
      console.log("[generate-blog] raw length:", raw.length);
      console.log("[generate-blog] raw preview:", raw.slice(0, 500));
      console.log(
        "[generate-blog] prompt feedback:",
        result.response.promptFeedback
      );
      console.log(
        "[generate-blog] finish reason:",
        result.response.candidates?.[0]?.finishReason
      );
      console.log(
        "[generate-blog] safety ratings:",
        result.response.candidates?.[0]?.safetyRatings
      );
    }

    let parsedJson: unknown;
    try {
      parsedJson = parseGeminiJson(raw);
    } catch {
      return NextResponse.json(
        {
          error: "Gemini returned invalid JSON.",
          hint: "The response may be truncated, markdown-wrapped, blocked, or malformed. Try a shorter blog or reduce output length.",
          rawPreview:
            process.env.NODE_ENV === "development"
              ? raw.slice(0, 500)
              : undefined,
        },
        { status: 500 }
      );
    }

    const validated = BlogOutputSchema.safeParse(parsedJson);
    if (!validated.success) {
      return NextResponse.json({
        data: parsedJson,
        schemaWarning: true,
        schemaErrors: validated.error.flatten(),
      });
    }

    return NextResponse.json({ data: validated.data });
  } catch (error) {
    if (error instanceof MissingGeminiApiKeyError) {
      return NextResponse.json(
        {
          error: "Demo deployment only.",
          hint: "Clone OmniSearch AI and add your own GEMINI_API_KEY locally to generate content.",
        },
        { status: 503 }
      );
    }

    console.error("[generate-blog] error:", error);
    return NextResponse.json(
      { error: "Internal server error. Check server logs." },
      { status: 500 }
    );
  }
}
