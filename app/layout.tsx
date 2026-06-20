import type { Viewport } from "next";
import { JsonLd } from "@/components/JsonLd";
import { globalJsonLd } from "@/lib/seo/json-ld";
import { createRootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

export const metadata = createRootMetadata();

export const viewport: Viewport = {
  themeColor: "#064e3b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <JsonLd data={globalJsonLd()} />
        {children}
      </body>
    </html>
  );
}
