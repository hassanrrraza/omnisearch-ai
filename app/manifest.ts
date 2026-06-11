import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OmniSearch AI",
    short_name: "OmniSearch AI",
    description:
      "Generate SEO, AEO, GEO, and LLM-optimized blog posts with Gemini.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6f7f9",
    theme_color: "#064e3b",
    icons: [
      {
        src: "/images/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
