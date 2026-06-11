"use client";

import { useState } from "react";
import {
  downloadFile,
  markdownToBasicHtml,
  markdownToMdx,
} from "@/lib/utils/download";

type ScoreSet = {
  seo: number;
  aeo: number;
  geo: number;
  llm: number;
  overall: number;
};

export type PreviewData = {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  excerpt: string;
  featuredSnippet: string;
  llmSummary: string;
  schemaJsonLd?: unknown;
  blogMarkdown?: string;
  optimizedBlogMarkdown?: string;
  score: ScoreSet;
};

interface ScoreCardsProps {
  score: ScoreSet;
}

interface ExportButtonsProps {
  data: PreviewData;
  title: string;
}

const categories: Array<{
  key: keyof Pick<ScoreSet, "seo" | "aeo" | "geo" | "llm">;
  label: string;
  description: string;
}> = [
  { key: "seo", label: "SEO Score", description: "Search visibility" },
  { key: "aeo", label: "AEO Score", description: "Answer readiness" },
  { key: "geo", label: "GEO Score", description: "Generative engine fit" },
  { key: "llm", label: "LLM Score", description: "AI readability" },
];

export function ScoreCards({ score }: ScoreCardsProps) {
  return (
    <div className="grid gap-3">
      <ScoreCard
        description="Average quality across SEO, AEO, GEO, and LLM readiness"
        label="Overall Score"
        large
        value={score.overall}
      />
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {categories.map((category) => (
          <ScoreCard
            description={category.description}
            key={category.key}
            label={category.label}
            value={score[category.key]}
          />
        ))}
      </div>
    </div>
  );
}

export function ExportButtons({ data, title }: ExportButtonsProps) {
  const [copyMarkdownLabel, setCopyMarkdownLabel] = useState("Copy Markdown");
  const [copyMetadataLabel, setCopyMetadataLabel] = useState(
    "Copy Metadata JSON"
  );
  const [copySchemaLabel, setCopySchemaLabel] = useState(
    "Copy Schema JSON-LD"
  );
  const markdown = data.blogMarkdown ?? data.optimizedBlogMarkdown ?? "";
  const safeSlug = data.slug || "optimized-blog";
  const hasMarkdown = markdown.trim().length > 0;

  async function copyMarkdown() {
    if (!hasMarkdown) {
      return;
    }

    await navigator.clipboard.writeText(markdown);
    setCopyMarkdownLabel("Copied");
    window.setTimeout(() => setCopyMarkdownLabel("Copy Markdown"), 2000);
  }

  async function copyMetadata() {
    const metadata = {
      seoTitle: data.seoTitle,
      metaDescription: data.metaDescription,
      slug: data.slug,
      targetKeyword: data.targetKeyword,
      secondaryKeywords: data.secondaryKeywords,
      excerpt: data.excerpt,
      featuredSnippet: data.featuredSnippet,
      llmSummary: data.llmSummary,
    };

    await navigator.clipboard.writeText(JSON.stringify(metadata, null, 2));
    setCopyMetadataLabel("Copied");
    window.setTimeout(
      () => setCopyMetadataLabel("Copy Metadata JSON"),
      2000
    );
  }

  async function copySchema() {
    await navigator.clipboard.writeText(
      JSON.stringify(data.schemaJsonLd ?? {}, null, 2)
    );
    setCopySchemaLabel("Copied");
    window.setTimeout(() => setCopySchemaLabel("Copy Schema JSON-LD"), 2000);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">Export Package</p>
          <p className="mt-1 text-xs text-slate-500">
            Copy or download the content and publishing metadata.
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <ActionButton disabled={!hasMarkdown} onClick={copyMarkdown}>
          {copyMarkdownLabel}
        </ActionButton>
        <ActionButton
          disabled={!hasMarkdown}
          onClick={() =>
            downloadFile(markdown, `${safeSlug}.md`, "text/markdown")
          }
        >
          Download .md
        </ActionButton>
        <ActionButton
          disabled={!hasMarkdown}
          onClick={() =>
            downloadFile(
              markdownToBasicHtml(markdown, title),
              `${safeSlug}.html`,
              "text/html"
            )
          }
        >
          Download .html
        </ActionButton>
        <ActionButton
          disabled={!hasMarkdown}
          onClick={() =>
            downloadFile(
              markdownToMdx(markdown, {
                title,
                slug: data.slug,
                seoTitle: data.seoTitle,
                metaDescription: data.metaDescription,
                targetKeyword: data.targetKeyword,
                excerpt: data.excerpt,
              }),
              `${safeSlug}.mdx`,
              "text/markdown"
            )
          }
        >
          Download .mdx
        </ActionButton>
        <ActionButton onClick={copyMetadata}>{copyMetadataLabel}</ActionButton>
        {data.schemaJsonLd ? (
          <ActionButton onClick={copySchema}>{copySchemaLabel}</ActionButton>
        ) : null}
      </div>
    </section>
  );
}

function ActionButton({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function ScoreCard({
  description,
  label,
  large,
  value,
}: {
  description: string;
  label: string;
  large?: boolean;
  value: number;
}) {
  const roundedValue = Math.round(value);

  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-4 shadow-sm ${
        large ? "sm:flex sm:items-center sm:justify-between" : ""
      }`}
    >
      <div>
        <p className="text-sm font-semibold text-slate-950">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      </div>
      <div className={large ? "mt-4 sm:mt-0 sm:min-w-48" : "mt-4"}>
        <div className="flex items-end gap-1">
          <span
            className={`font-bold tracking-tight text-slate-950 ${
              large ? "text-5xl" : "text-3xl"
            }`}
          >
            {roundedValue}
          </span>
          <span className="pb-1 text-sm text-slate-500">/100</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
          <div
            className={`h-full rounded-full ${scoreColor(value)}`}
            style={{ width: `${clampScore(value)}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function scoreColor(value: number): string {
  if (value >= 90) {
    return "bg-teal-500";
  }

  if (value >= 70) {
    return "bg-amber-500";
  }

  if (value >= 50) {
    return "bg-orange-500";
  }

  return "bg-red-500";
}
