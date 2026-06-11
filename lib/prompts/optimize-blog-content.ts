import { readFile } from "fs/promises";
import path from "path";
import type { OptimizeInput } from "@/lib/schemas/optimize-input-schema";

async function loadGuide(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), "lib", "guides", filename);
  return readFile(filePath, "utf-8");
}

export async function buildOptimizeBlogContentPrompt(
  input: OptimizeInput
): Promise<string> {
  const [seoGuide, aeoGuide, geoGuide] = await Promise.all([
    loadGuide("seo-optimization-guide.md"),
    loadGuide("aeo-optimization-guide.md"),
    loadGuide("geo-optimization-guide.md"),
  ]);

  return `You are OmniSearch AI - an expert content optimization engine for
SEO, AEO (Answer Engine Optimization), GEO (Generative Engine Optimization),
and LLM visibility.

Your task: optimize the existing blog content only. Preserve the original
meaning, topic, and author voice while improving structure, headings, clarity,
SEO, AEO, GEO, and LLM readability.

Keep the optimized article reasonably close to the original length. Do not
expand a 2000-word article into 3500+ words. If extra sections are useful,
keep them concise.

---
SEO OPTIMIZATION GUIDE:
${seoGuide}

---
AEO OPTIMIZATION GUIDE:
${aeoGuide}

---
GEO OPTIMIZATION GUIDE:
${geoGuide}

---
USER INPUTS:
Main Keyword: ${input.mainKeyword}
Target Audience: ${input.targetAudience}
Optimization Goal: ${input.optimizationGoal}
Brand Tone: ${input.brandTone}
Internal Links to Include: ${input.internalLinks ?? "none"}
CTA: ${input.cta ?? "none"}
Additional Notes: ${input.notes ?? "none"}

EXISTING BLOG POST TO OPTIMIZE:
---
${input.existingBlog}
---

CONTENT OPTIMIZATION RULES:
1. Improve the H1 title to include the main keyword naturally.
2. Rewrite the opening paragraph so the first 100 words contain the keyword
   and directly answer the search intent.
3. Convert wall-of-text sections into clear H2/H3 sections.
4. Every major H2 should open with a concise direct answer paragraph.
5. Add or improve a comparison table only if it fits the original topic.
6. Add or improve a numbered list with 4-8 items if the content has steps.
7. Add or improve a blockquote with a standalone citable insight if useful.
8. Add specific numeric data points only when they are present in the source
   content or clearly labeled as illustrative examples. Do not invent
   statistics, dates, percentages, or research claims.
9. Include a concise Key Takeaways section if it improves scanability.
10. Include internal links and CTA only when provided.

DO NOT generate SEO title, meta description, slug, FAQ, featured snippet,
LLM summary, JSON-LD schema, scores, optimization report, or change log in
this call.

OUTPUT RULES:
Return only one valid compact JSON object.
Do not wrap the JSON in markdown fences.
Do not include comments.
Do not include text before or after the JSON.
Escape all newline characters inside JSON string values correctly.
Keep markdown content inside the optimizedBlogMarkdown string.

JSON schema:
{
  "optimizedBlogMarkdown": "string - the complete optimized blog in Markdown"
}`;
}
