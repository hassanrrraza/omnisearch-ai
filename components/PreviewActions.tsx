"use client";

import { useState } from "react";
import {
  downloadFile,
  markdownToBasicHtml,
} from "@/lib/utils/download";

interface ScoreSet {
  seo: number;
  aeo: number;
  geo: number;
  llm: number;
  overall: number;
}

interface ScoreCardsProps {
  score: ScoreSet;
}

interface ExportButtonsProps {
  markdown: string;
  slug: string;
  title: string;
}

const categories: Array<{
  key: keyof Pick<ScoreSet, "seo" | "aeo" | "geo" | "llm">;
  label: string;
}> = [
  { key: "seo", label: "SEO" },
  { key: "aeo", label: "AEO" },
  { key: "geo", label: "GEO" },
  { key: "llm", label: "LLM" },
];

export function ScoreCards({ score }: ScoreCardsProps) {
  return (
    <div className="grid gap-3">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {categories.map((category) => (
          <ScoreCard
            key={category.key}
            label={category.label}
            value={score[category.key]}
          />
        ))}
      </div>
      <ScoreCard label="Overall Score" large value={score.overall} />
    </div>
  );
}

export function ExportButtons({ markdown, slug, title }: ExportButtonsProps) {
  const [copyLabel, setCopyLabel] = useState("Copy Markdown");
  const safeSlug = slug || "optimized-blog";

  async function copyMarkdown() {
    await navigator.clipboard.writeText(markdown);
    setCopyLabel("Copied!");
    window.setTimeout(() => setCopyLabel("Copy Markdown"), 2000);
  }

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <button
        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-300 hover:bg-neutral-50"
        onClick={copyMarkdown}
        type="button"
      >
        {copyLabel}
      </button>
      <button
        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-300 hover:bg-neutral-50"
        onClick={() =>
          downloadFile(markdown, `${safeSlug}.md`, "text/markdown")
        }
        type="button"
      >
        Download .md
      </button>
      <button
        className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 transition hover:border-neutral-300 hover:bg-neutral-50"
        onClick={() =>
          downloadFile(
            markdownToBasicHtml(markdown, title),
            `${safeSlug}.html`,
            "text/html"
          )
        }
        type="button"
      >
        Download .html
      </button>
    </div>
  );
}

function ScoreCard({
  label,
  large,
  value,
}: {
  label: string;
  large?: boolean;
  value: number;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 bg-white p-4">
      <p className={`font-semibold text-neutral-900 ${large ? "text-base" : "text-sm"}`}>
        {label}
      </p>
      <div className="mt-3 flex items-end gap-1">
        <span
          className={`font-bold tracking-tight text-neutral-950 ${
            large ? "text-4xl" : "text-3xl"
          }`}
        >
          {Math.round(value)}
        </span>
        <span className="pb-1 text-sm text-neutral-500">/100</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-neutral-100">
        <div
          className={`h-full rounded-full ${scoreColor(value)}`}
          style={{ width: `${clampScore(value)}%` }}
        />
      </div>
    </div>
  );
}

function clampScore(value: number): number {
  return Math.min(100, Math.max(0, value));
}

function scoreColor(value: number): string {
  if (value >= 90) {
    return "bg-green-500";
  }

  if (value >= 70) {
    return "bg-yellow-500";
  }

  if (value >= 50) {
    return "bg-orange-500";
  }

  return "bg-red-500";
}
