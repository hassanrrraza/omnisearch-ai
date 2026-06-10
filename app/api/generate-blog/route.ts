import { NextRequest, NextResponse } from "next/server";
import { getGeminiModel } from "@/lib/gemini";
import { buildCreateBlogPrompt } from "@/lib/prompts/create-blog";
import { BlogInputSchema } from "@/lib/schemas/blog-input-schema";
import { BlogOutputSchema } from "@/lib/schemas/blog-output-schema";

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
    console.error("[generate-blog] error:", error);
    return NextResponse.json(
      { error: "Internal server error. Check server logs." },
      { status: 500 }
    );
  }
}
