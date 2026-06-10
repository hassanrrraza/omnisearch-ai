import { z } from "zod";

export const OptimizeInputSchema = z.object({
  existingBlog: z
    .string()
    .min(100, "Please paste your existing blog post (minimum 100 characters)")
    .max(20000, "Blog post is too long (maximum 20,000 characters)"),
  mainKeyword: z.string().min(2, "Main keyword is required").max(100),
  targetAudience: z.string().min(3).max(150),
  optimizationGoal: z.enum([
    "improve-seo-ranking",
    "target-ai-overviews",
    "improve-readability",
    "full-optimization",
  ]),
  brandTone: z.enum([
    "professional",
    "conversational",
    "technical",
    "beginner-friendly",
  ]),
  internalLinks: z.string().max(500).optional(),
  cta: z.string().max(200).optional(),
  notes: z.string().max(500).optional(),
});

export type OptimizeInput = z.infer<typeof OptimizeInputSchema>;
