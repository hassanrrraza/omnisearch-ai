import { readFile } from "fs/promises";
import path from "path";
import type { BlogInput } from "@/lib/schemas/blog-input-schema";

async function loadGuide(filename: string): Promise<string> {
  const filePath = path.join(process.cwd(), "lib", "guides", filename);
  return readFile(filePath, "utf-8");
}

export async function buildCreateBlogPrompt(input: BlogInput): Promise<string> {
  const [seoGuide, aeoGuide, geoGuide] = await Promise.all([
    loadGuide("seo-optimization-guide.md"),
    loadGuide("aeo-optimization-guide.md"),
    loadGuide("geo-optimization-guide.md"),
  ]);

  const outputJsonSchema = `{
  "title": "string - H1 blog title",
  "slug": "string - URL slug, hyphens only, no stop words, no .html extension",
  "seoTitle": "string - title tag <=65 chars, keyword first",
  "metaDescription": "string - 150-160 chars, keyword present, specific differentiator",
  "targetKeyword": "string - the exact primary keyword used throughout",
  "secondaryKeywords": ["array of secondary keyword strings"],
  "blogMarkdown": "string - FULL blog post in Markdown, proper H2/H3 structure, ${input.wordCount} words max",
  "excerpt": "string - 1-2 sentence social/preview excerpt",
  "faq": [
    {
      "question": "string - exact PAA-style question",
      "answer": "string - 80-150 words, first sentence <=30 words and self-contained"
    }
  ],
  "featuredSnippet": "string - 40-60 word direct answer paragraph for the main query",
  "llmSummary": "string - 2-3 sentences: This article explains [topic] for [audience]. It covers [main points] and provides [outcome].",
  "schemaJsonLd": { "valid FAQPage schema JSON-LD object" },
  "optimizationReport": {
    "seo": ["list of applied SEO techniques"],
    "aeo": ["list of applied AEO techniques"],
    "geo": ["list of applied GEO techniques"],
    "llm": ["list of applied LLM optimization techniques"]
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

Your task: generate a complete, fully-optimized blog post from the user's inputs.

Apply every relevant rule from the three optimization guides below.

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
Title: ${input.title}
Main Keyword: ${input.mainKeyword}
Secondary Keywords: ${input.secondaryKeywords ?? "none provided"}
Target Audience: ${input.targetAudience}
Search Intent: ${input.searchIntent}
Tone: ${input.tone}
Industry: ${input.industry}
Product/Service Mention: ${input.productMention ?? "none"}
Internal Links to Include: ${input.internalLinks ?? "none"}
CTA: ${input.cta ?? "none"}
Target Word Count: ${input.wordCount} words (blogMarkdown must not exceed this)

---
MANDATORY CONTENT RULES:
1. blogMarkdown: write the FULL post in Markdown - H2 sections, H3 subsections,
   proper paragraph spacing. ${input.wordCount} words maximum.
2. Keyword placement: main keyword in H1, within first 100 words, in at least
   one H2, and naturally distributed throughout.
3. Every H2 must open with a direct answer paragraph of <=50 words (AEO rule).
4. Include exactly 3 FAQ questions - phrased as real "People Also Ask" questions.
5. Every FAQ answer: first sentence <=30 words, total answer 80-150 words.
6. Include at least 1 comparison table with specific values in cells.
7. Include at least 1 numbered list with 4-8 items.
8. Include 1 blockquote with a standalone citable insight.
9. Include 5+ specific numeric data points (costs, times, measurements, versions).
10. Include a "Key Takeaways" section before the FAQ.
11. Write from a first-person experience perspective.
12. Match the tone: ${input.tone}.
13. If internal links are provided, include them as [anchor text](url) in context.
14. End with the CTA provided.

SCORING RULES - compute honestly based on what you actually wrote:
- SEO (0-100): keyword in title/H1/intro/H2, meta quality, intent match,
  H2 structure quality, internal links present
- AEO (0-100): direct answer opens, FAQ first sentence <=30 words,
  list/table snippet-ready, featured snippet quality, 3 FAQ questions
- GEO (0-100): 5+ numeric data points present, comparison table present,
  blockquote present, llmSummary completeness, first-person signals
- LLM (0-100): semantic heading clarity, extractable facts count,
  Q&A formatting, summary quality, citable standalone sentences
- Overall: average of the four scores

---
OUTPUT RULES:
Return ONLY a valid JSON object matching the schema below.
No markdown code fences. No explanation. No preamble. Only the JSON.

${outputJsonSchema}`;
}
