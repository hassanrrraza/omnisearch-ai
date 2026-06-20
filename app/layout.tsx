import type { Viewport } from "next";
import { Inter } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { globalJsonLd } from "@/lib/seo/json-ld";
import { createRootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

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
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={globalJsonLd()} />
        {children}
      </body>
    </html>
  );
}
