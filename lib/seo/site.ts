export const siteConfig = {
  name: "OmniSearch AI",
  tagline: "Open-source SEO, AEO, GEO, and LLM content optimization engine",
  description:
    "OmniSearch AI is the open-source engine for SEO, AEO, GEO, and LLM content optimization. Generate or upgrade blog posts that rank on Google, appear in AI Overviews, get cited by ChatGPT and Perplexity, and surface in LLM-powered search — powered by your own Gemini API key.",
  shortDescription:
    "Generate and optimize blog posts for Google Search, AI Overviews, answer engines, and LLM discovery with your own Gemini API key.",
  locale: "en_US",
  creator: "Hassan Raza",
  creatorUrl: "https://github.com/hassanrrraza",
  maintainerUrl: "https://hassanr.com/",
  githubUrl: "https://github.com/hassanrrraza/omnisearch-ai",
  license: "MIT",
  category: "DeveloperApplication",
  keywords: [
    "SEO blog generator",
    "AEO optimization tool",
    "GEO content optimization",
    "LLM content optimization",
    "AI blog writer open source",
    "Gemini blog generator",
    "SEO metadata generator",
    "FAQ schema generator",
    "JSON-LD blog schema",
    "AI Overview optimization",
    "answer engine optimization",
    "generative engine optimization",
    "ChatGPT citation optimization",
    "Perplexity SEO tool",
    "Next.js SEO tool",
    "blog post optimizer",
    "featured snippet generator",
    "content optimization engine",
  ],
  ogImagePath: "/images/favicon/android-chrome-512x512.png",
  twitterHandle: "@hassanrrraza",
} as const;

export type SitePage = {
  path: string;
  title: string;
  description: string;
  keywords?: readonly string[];
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export const sitePages: SitePage[] = [
  {
    path: "/",
    title: "SEO, AEO, GEO & LLM Blog Optimization Engine",
    description: siteConfig.description,
    keywords: siteConfig.keywords,
    changeFrequency: "weekly",
    priority: 1,
  },
  {
    path: "/new-blog",
    title: "Create SEO, AEO, GEO & LLM-Optimized Blog Posts",
    description:
      "Generate complete search-ready blog posts up to 2,500 words with SEO metadata, featured snippets, FAQ sections, FAQPage JSON-LD schema, LLM summaries, and optimization scores across SEO, AEO, GEO, and LLM.",
    keywords: [
      "generate SEO blog post",
      "AI blog generator",
      "FAQ schema generator",
      "featured snippet generator",
      "Gemini blog writer",
      "SEO metadata generator",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },
  {
    path: "/optimize-blog",
    title: "Optimize Existing Blog Posts for SEO, AEO, GEO & LLM",
    description:
      "Paste an existing article and upgrade it for Google Search, AI Overviews, answer engines, and LLM discovery. Get rewritten content, metadata, FAQ, schema, change logs, and before/after optimization scores.",
    keywords: [
      "optimize existing blog post",
      "SEO content rewriter",
      "blog optimization tool",
      "AEO content upgrade",
      "GEO optimization",
      "LLM-ready blog content",
    ],
    changeFrequency: "monthly",
    priority: 0.9,
  },
];

export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (configured) {
    return configured.replace(/\/$/, "");
  }

  const vercelUrl = process.env.VERCEL_URL?.trim();

  if (vercelUrl) {
    return `https://${vercelUrl.replace(/\/$/, "")}`;
  }

  return "http://localhost:3000";
}

export function absoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getSiteUrl()}${normalizedPath}`;
}

export function getSitePage(path: string): SitePage {
  const page = sitePages.find((entry) => entry.path === path);

  if (!page) {
    throw new Error(`Unknown site page: ${path}`);
  }

  return page;
}
