import { z } from "zod";

export const BlogInputSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(150),
  mainKeyword: z.string().min(2, "Main keyword is required").max(100),
  secondaryKeywords: z.string().max(300).optional(),
  targetAudience: z.string().min(3, "Target audience is required").max(150),
  searchIntent: z.enum([
    "informational",
    "commercial",
    "transactional",
    "navigational",
  ]),
  tone: z.enum([
    "professional",
    "conversational",
    "technical",
    "beginner-friendly",
  ]),
  industry: z.string().min(2, "Industry is required").max(100),
  productMention: z.string().max(200).optional(),
  internalLinks: z.string().max(500).optional(),
  cta: z.string().max(200).optional(),
  wordCount: z
    .number()
    .min(300, "Minimum 300 words")
    .max(2500, "Maximum 2500 words")
    .default(1500),
});

export type BlogInput = z.infer<typeof BlogInputSchema>;
