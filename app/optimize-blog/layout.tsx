import { JsonLd } from "@/components/JsonLd";
import { pageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getSitePage } from "@/lib/seo/site";

export const metadata = createPageMetadata({
  path: "/optimize-blog",
});

const page = getSitePage("/optimize-blog");
const jsonLd = pageJsonLd(page, [
  { name: "Home", path: "/" },
  { name: "Optimize Existing Blog", path: "/optimize-blog" },
]);

export default function OptimizeBlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JsonLd data={jsonLd} />
      {children}
    </>
  );
}
