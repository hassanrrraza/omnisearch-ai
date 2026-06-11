import type { OptimizeInput } from "@/lib/schemas/optimize-input-schema";

interface OptimizeBlogReportPromptInput {
  input: OptimizeInput;
  optimizedBlogMarkdown: string;
}

export function buildOptimizeBlogReportPrompt({
  input,
  optimizedBlogMarkdown,
}: OptimizeBlogReportPromptInput): string {
  const outputJsonSchema = `{
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

  return `You are OmniSearch AI - an expert content optimization analyst for
SEO, AEO (Answer Engine Optimization), GEO (Generative Engine Optimization),
and LLM visibility.

Your task: analyze the optimized blog below and generate supporting metadata,
FAQ, JSON-LD schema, scores, change log, and optimization report.

Do NOT rewrite the blog. Do NOT return the full optimized blog in this call.
The server already has optimizedBlogMarkdown and will merge it into the final
response.

---
USER INPUTS:
Main Keyword: ${input.mainKeyword}
Target Audience: ${input.targetAudience}
Optimization Goal: ${input.optimizationGoal}
Brand Tone: ${input.brandTone}
Internal Links to Include: ${input.internalLinks ?? "none"}
CTA: ${input.cta ?? "none"}
Additional Notes: ${input.notes ?? "none"}

OPTIMIZED BLOG TO ANALYZE:
---
${optimizedBlogMarkdown}
---

REPORT RULES:
1. Generate metadata that accurately describes the optimized blog.
2. Generate exactly 3 FAQ questions from likely PAA queries.
3. Keep FAQ answers concise: first sentence <=30 words, total 2-4 sentences.
4. Generate valid FAQPage JSON-LD using the FAQ answers.
5. Generate a 40-60 word featured snippet answer.
6. Generate a 2-3 sentence LLM summary.
7. Log only the 8-12 most important changes in changesLog.
8. Keep optimizationReport concise with 5-8 bullets per category.
9. Score the optimized blog honestly from 0-100 for SEO, AEO, GEO, LLM,
   and overall.

OUTPUT RULES:
Return only one valid compact JSON object matching this schema.
Do not include optimizedBlogMarkdown.
Do not wrap the JSON in markdown fences.
Do not include comments.
Do not include text before or after the JSON.
Escape all newline characters inside JSON string values correctly.

${outputJsonSchema}`;
}
