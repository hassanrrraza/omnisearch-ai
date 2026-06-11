import { z } from "zod";

export const OptimizedBlogContentSchema = z.object({
  optimizedBlogMarkdown: z.string().min(500),
});

export type OptimizedBlogContent = z.infer<
  typeof OptimizedBlogContentSchema
>;
