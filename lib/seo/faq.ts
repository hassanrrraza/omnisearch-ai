import type { FaqItem } from "@/lib/seo/json-ld";

export const homeFaqItems: FaqItem[] = [
  {
    question: "What is OmniSearch AI?",
    answer:
      "OmniSearch AI is an open-source content optimization engine that generates and upgrades blog posts for Google Search (SEO), AI Overviews and answer boxes (AEO), generative engine citations like ChatGPT and Perplexity (GEO), and LLM-powered discovery. Each run returns a structured content package with metadata, FAQ, JSON-LD schema, scores, and export-ready files.",
  },
  {
    question: "What is the difference between SEO, AEO, and GEO?",
    answer:
      "SEO helps pages rank in traditional search results on Google. AEO (Answer Engine Optimization) helps content appear in featured snippets, People Also Ask, and AI Overviews. GEO (Generative Engine Optimization) helps content get cited and summarized by LLMs such as ChatGPT, Claude, and Perplexity. OmniSearch AI optimizes for all three plus LLM-readable structure in one workflow.",
  },
  {
    question: "Do I need my own Gemini API key to use OmniSearch AI?",
    answer:
      "Yes. OmniSearch AI uses your own Google Gemini API key, which you add to a local .env.local file. All API calls run server-side through Next.js API routes, so your key is never exposed to the browser.",
  },
  {
    question: "Is OmniSearch AI free and open source?",
    answer:
      "Yes. OmniSearch AI is MIT-licensed and free to use, inspect, customize, and self-host. You only pay for your own Gemini API usage through Google AI Studio.",
  },
  {
    question: "Can OmniSearch AI optimize an existing blog post?",
    answer:
      "Yes. Paste an existing article into the Optimize Existing Blog workflow or use the CLI file mode. OmniSearch AI rewrites and structures the content, then generates metadata, FAQ, schema, change logs, and before/after optimization scores.",
  },
  {
    question: "What files does OmniSearch AI export?",
    answer:
      "OmniSearch AI exports optimized blog Markdown, styled HTML, metadata JSON, FAQPage JSON-LD schema, LLM summaries, and optimization scores. You can copy content to the clipboard or download files for your CMS, static site, or developer workflow.",
  },
];
