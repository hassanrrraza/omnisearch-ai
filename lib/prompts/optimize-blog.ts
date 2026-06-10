import { readFile } from "fs/promises";
import path from "path";
import type { OptimizeInput } from "@/lib/schemas/optimize-input-schema";

async function loadGuide(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), "lib", "guides", filename);
  return readFile(filePath, "utf-8");
}

export async function buildOptimizeBlogPrompt(
  input: OptimizeInput
): Promise<string> {
  const [seoGuide, aeoGuide, geoGuide] = await Promise.all([
    loadGuide("seo-optimization-guide.md"),
    loadGuide("aeo-optimization-guide.md"),
    loadGuide("geo-optimization-guide.md"),
  ]);

  const outputJsonSchema = `{
  "optimizedBlogMarkdown": "string - full improved blog in Markdown",
  "title": "string - improved H1 title",
  "slug": "string - URL slug, hyphens only, no stop words",
  "seoTitle": "string - title tag <=65 chars, keyword first",
  "metaDescription": "string - 150-160 chars, keyword present",
  "targetKeyword": "string - primary keyword used throughout",
  "secondaryKeywords": ["array of secondary keyword strings"],
  "excerpt": "string - 1-2 sentence preview excerpt",
  "changesLog": [
    {
      "section": "string - which section or element was changed",
      "change": "string - what was changed",
      "reason": "string - why this improves SEO/AEO/GEO/LLM performance"
    }
  ],
  "faq": [
    {
      "question": "string - PAA-style question",
      "answer": "string - 2-4 concise sentences, first sentence <=30 words"
    }
  ],
  "featuredSnippet": "string - 40-60 word direct answer for the main query",
  "llmSummary": "string - 2-3 sentences for AI system comprehension",
  "schemaJsonLd": { "valid FAQPage schema JSON-LD object" },
  "optimizationReport": {
    "seo": ["5-8 SEO improvements made"],
    "aeo": ["5-8 AEO improvements made"],
    "geo": ["5-8 GEO improvements made"],
    "llm": ["5-8 LLM optimization improvements made"]
  },
  "score": {
    "seo": 0,
    "aeo": 0,
    "geo": 0,
    "llm": 0,
    "overall": 0
  }
}`;

  return `You are OmniSearch AI - an expert content optimization engine for
SEO, AEO (Answer Engine Optimization), GEO (Generative Engine Optimization),
and LLM visibility.

Your task: improve the provided existing blog post WITHOUT changing its core
meaning or topic. Preserve the author's voice as much as possible while
applying every relevant optimization rule from the guides below.
Keep the optimized article complete and reasonably close to the original
length unless the user's notes explicitly request expansion.

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

OPTIMIZATION RULES:
1. Improve the H1 title to include the main keyword naturally
2. Rewrite the opening paragraph so the first 100 words contain the keyword
   and directly answer the search intent
3. Convert any wall-of-text sections into H2/H3 structured sections
4. Every H2 must open with a direct answer paragraph <=50 words (AEO rule)
5. Add or improve a comparison table with specific values if missing
6. Add or improve a numbered list with 4-8 items if the content has steps
7. Add or improve a blockquote with a standalone citable insight
8. Add specific numeric data points only when they are present in the source
   content or clearly labeled as illustrative examples. Do not invent
   statistics, dates, percentages, or research claims.
9. Add exactly 3 FAQ questions from likely PAA queries - answers must have
   first sentence <=30 words and total 2-4 concise sentences each
10. Add a Key Takeaways section before the FAQ
11. Add a Featured Snippet answer block (40-60 words)
12. Add an LLM Summary
13. Generate FAQPage JSON-LD schema
14. Log the 8-12 most important changes in changesLog with section, change,
    and reason
15. Score the OPTIMIZED output (not the original) honestly against the
    same checklist used in the create-blog flow

SCORING - score the optimized output:
- SEO (0-100): keyword placement, title, meta, H2 structure, intent match
- AEO (0-100): direct answer opens, FAQ quality, featured snippet, list/table snippets
- GEO (0-100): factual density, comparison table, blockquote, llmSummary quality
- LLM (0-100): semantic headings, extractable facts, Q&A format, summary quality
- Overall: average of the four

---
OUTPUT RULES:
Return only one valid compact JSON object matching this schema.
Do not wrap the JSON in markdown fences.
Do not include comments.
Do not include text before or after the JSON.
Escape all newline characters inside JSON string values correctly.
Keep long markdown content inside string values.

${outputJsonSchema}`;
}
