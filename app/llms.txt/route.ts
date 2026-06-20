import { absoluteUrl, siteConfig, sitePages } from "@/lib/seo/site";

export async function GET() {
  const lines = [
    `# ${siteConfig.name}`,
    "",
    `> ${siteConfig.tagline}`,
    "",
    siteConfig.description,
    "",
    "## Primary pages",
    "",
    ...sitePages.map(
      (page) =>
        `- [${page.title}](${absoluteUrl(page.path)}): ${page.description.split(".")[0]}.`
    ),
    "",
    "## Workflows",
    "",
    "- Create new blog posts with SEO metadata, FAQ, schema, and scores.",
    "- Optimize existing articles for search engines and AI discovery.",
    "- Export Markdown, HTML, metadata JSON, and FAQPage JSON-LD.",
    "",
    "## Optional",
    "",
    `- [GitHub repository](${siteConfig.githubUrl})`,
    `- [Maintainer website](${siteConfig.maintainerUrl})`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, sitemap=604800",
    },
  });
}
