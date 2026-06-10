import { z } from "zod";

export const ChangeItemSchema = z.object({
  section: z.string(),
  change: z.string(),
  reason: z.string(),
});

export const OptimizeOutputSchema = z.object({
  optimizedBlogMarkdown: z.string(),
  title: z.string(),
  slug: z.string(),
  seoTitle: z.string(),
  metaDescription: z.string(),
  targetKeyword: z.string(),
  secondaryKeywords: z.array(z.string()),
  excerpt: z.string(),
  changesLog: z.array(ChangeItemSchema),
  faq: z.array(
    z.object({
      question: z.string(),
      answer: z.string(),
    })
  ),
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

export type OptimizeOutput = z.infer<typeof OptimizeOutputSchema>;
