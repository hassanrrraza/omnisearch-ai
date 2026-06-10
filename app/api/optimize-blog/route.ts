import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";
import { buildOptimizeBlogPrompt } from "@/lib/prompts/optimize-blog";
import { OptimizeInputSchema } from "@/lib/schemas/optimize-input-schema";
import { OptimizeOutputSchema } from "@/lib/schemas/optimize-output-schema";

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

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(raw);
    } catch {
      return NextResponse.json(
        {
          error: "Gemini returned non-JSON. Try again.",
          raw: raw.slice(0, 500),
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
