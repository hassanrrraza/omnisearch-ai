import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo/site";

const aiCrawlers = [
  "OAI-SearchBot",
  "GPTBot",
  "ClaudeBot",
  "Google-Extended",
  "PerplexityBot",
  "Applebot",
  "Amazonbot",
  "anthropic-ai",
  "cohere-ai",
  "DuckAssistBot",
  "Bytespider",
  "CCBot",
  "FacebookBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  const siteUrl = absoluteUrl("/");

  return {
    rules: [
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow: ["/api/"],
      })),
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteUrl}sitemap.xml`,
    host: siteUrl.replace(/\/$/, ""),
  };
}
