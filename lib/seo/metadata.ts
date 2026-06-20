import type { Metadata } from "next";
import { absoluteUrl, getSitePage, siteConfig } from "@/lib/seo/site";

type CreatePageMetadataOptions = {
  path: string;
  title?: string;
  description?: string;
  keywords?: string[];
  noIndex?: boolean;
};

export function createPageMetadata({
  path,
  title,
  description,
  keywords,
  noIndex = false,
}: CreatePageMetadataOptions): Metadata {
  const page = getSitePage(path);
  const resolvedTitle = title ?? page.title;
  const resolvedDescription = description ?? page.description;
  const resolvedKeywords = keywords ?? page.keywords ?? siteConfig.keywords;
  const canonicalUrl = absoluteUrl(path);
  const ogImageUrl = absoluteUrl(siteConfig.ogImagePath);

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: [...resolvedKeywords],
    authors: [{ name: siteConfig.creator, url: siteConfig.creatorUrl }],
    creator: siteConfig.creator,
    publisher: siteConfig.name,
    applicationName: siteConfig.name,
    category: "technology",
    metadataBase: new URL(absoluteUrl("/")),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large",
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: canonicalUrl,
      siteName: siteConfig.name,
      title: `${resolvedTitle} | ${siteConfig.name}`,
      description: resolvedDescription,
      images: [
        {
          url: ogImageUrl,
          width: 512,
          height: 512,
          alt: `${siteConfig.name} — ${siteConfig.tagline}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${resolvedTitle} | ${siteConfig.name}`,
      description: resolvedDescription,
      creator: siteConfig.twitterHandle,
      images: [ogImageUrl],
    },
  };
}

export function createRootMetadata(): Metadata {
  const home = getSitePage("/");
  const base = createPageMetadata({
    path: "/",
    title: home.title,
    description: home.description,
  });

  return {
    ...base,
    title: {
      default: `${home.title} | ${siteConfig.name}`,
      template: `%s | ${siteConfig.name}`,
    },
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        {
          url: "/images/favicon/favicon.ico",
          sizes: "any",
        },
        {
          url: "/images/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/images/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
      ],
      apple: [
        {
          url: "/images/favicon/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    other: {
      "application-name": siteConfig.name,
    },
  };
}
