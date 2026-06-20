import { absoluteUrl, siteConfig, type SitePage } from "@/lib/seo/site";

export type FaqItem = {
  question: string;
  answer: string;
};

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl(siteConfig.ogImagePath),
    },
    sameAs: [siteConfig.githubUrl, siteConfig.maintainerUrl],
    founder: {
      "@type": "Person",
      name: siteConfig.creator,
      url: siteConfig.creatorUrl,
    },
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${absoluteUrl("/")}#website`,
    name: siteConfig.name,
    url: absoluteUrl("/"),
    description: siteConfig.description,
    inLanguage: "en-US",
    publisher: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
  };
}

export function softwareApplicationSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": `${absoluteUrl("/")}#software`,
    name: siteConfig.name,
    applicationCategory: siteConfig.category,
    operatingSystem: "Web, macOS, Windows, Linux",
    description: siteConfig.description,
    url: absoluteUrl("/"),
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@id": `${absoluteUrl("/")}#organization`,
    },
    featureList: [
      "SEO blog generation",
      "AEO and featured snippet optimization",
      "GEO and LLM citation optimization",
      "FAQPage JSON-LD schema export",
      "Existing blog optimization",
      "Markdown and HTML export",
    ],
  };
}

export function webPageSchema(page: SitePage) {
  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl(page.path)}#webpage`,
    url: absoluteUrl(page.path),
    name: page.title,
    description: page.description,
    isPartOf: {
      "@id": `${absoluteUrl("/")}#website`,
    },
    about: {
      "@id": `${absoluteUrl("/")}#software`,
    },
    inLanguage: "en-US",
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqPageSchema(faqItems: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildJsonLdGraph(schemas: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}

export function globalJsonLd() {
  return buildJsonLdGraph([
    organizationSchema(),
    webSiteSchema(),
    softwareApplicationSchema(),
  ]);
}

export function homePageJsonLd(faqItems: FaqItem[]) {
  const homePage = {
    path: "/",
    title: "SEO, AEO, GEO & LLM Blog Optimization Engine",
    description: siteConfig.description,
    changeFrequency: "weekly" as const,
    priority: 1,
  };

  return buildJsonLdGraph([
    webPageSchema(homePage),
    breadcrumbSchema([{ name: "Home", path: "/" }]),
    faqPageSchema(faqItems),
  ]);
}

export function pageJsonLd(
  page: SitePage,
  breadcrumbs: Array<{ name: string; path: string }>
) {
  return buildJsonLdGraph([webPageSchema(page), breadcrumbSchema(breadcrumbs)]);
}
