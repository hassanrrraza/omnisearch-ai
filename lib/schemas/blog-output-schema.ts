import { z } from "zod";

export const FaqItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const BlogOutputSchema = z.object({
  title: z.string(),
  slug: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string(),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  blogMarkdown: z.string(),
  excerpt: z.string(),
  faq: z.array(FaqItemSchema),
  featuredSnippet: z.string(),
  llmSummary: z.string(),
  schemaJsonLd: z.record(z.string(), z.unknown()),
  optimizationReport: z.object({
    seo: z.array(z.string()),
    aeo: z.array(z.string()),
    geo: z.array(z.string()),
    llm: z.array(z.string()),
  }),
  score: z.object({
    seo: z.number().min(0).max(100),
    aeo: z.number().min(0).max(100),
    geo: z.number().min(0).max(100),
    llm: z.number().min(0).max(100),
    overall: z.number().min(0).max(100),
  }),
});

export type BlogOutput = z.infer<typeof BlogOutputSchema>;
