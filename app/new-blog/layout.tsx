import { JsonLd } from "@/components/JsonLd";
import { pageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";
import { getSitePage } from "@/lib/seo/site";

export const metadata = createPageMetadata({
  path: "/new-blog",
});

const page = getSitePage("/new-blog");
const jsonLd = pageJsonLd(page, [
  { name: "Home", path: "/" },
  { name: "Create New Blog", path: "/new-blog" },
]);

export default function NewBlogLayout({
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
