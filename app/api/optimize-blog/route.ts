import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";
import { buildOptimizeBlogPrompt } from "@/lib/prompts/optimize-blog";
import { OptimizeInputSchema } from "@/lib/schemas/optimize-input-schema";
import { OptimizeOutputSchema } from "@/lib/schemas/optimize-output-schema";
import { parseGeminiJson } from "@/lib/utils/json";

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

    const prompt = await buildOptimizeBlogPrompt(parsed.data);
    const model = getGeminiModel();
    const result = await model.generateContent(prompt);
    const raw = result.response.text();

    if (process.env.NODE_ENV === "development") {
      console.log("[optimize-blog] raw length:", raw.length);
      console.log("[optimize-blog] raw preview:", raw.slice(0, 500));
      console.log(
        "[optimize-blog] prompt feedback:",
        result.response.promptFeedback
      );
      console.log(
        "[optimize-blog] finish reason:",
        result.response.candidates?.[0]?.finishReason
      );
      console.log(
        "[optimize-blog] safety ratings:",
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

    const validated = OptimizeOutputSchema.safeParse(parsedJson);
    if (!validated.success) {
      return NextResponse.json({
        data: parsedJson,
        schemaWarning: true,
        schemaErrors: validated.error.flatten(),
      });
    }

    return NextResponse.json({ data: validated.data });
  } catch (error) {
    console.error("[optimize-blog] error:", error);
    return NextResponse.json(
      { error: "Internal server error. Check server logs." },
      { status: 500 }
    );
  }
}
