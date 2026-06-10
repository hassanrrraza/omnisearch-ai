"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ExportButtons, ScoreCards } from "@/components/PreviewActions";
import type { BlogOutput } from "@/lib/schemas/blog-output-schema";

interface OutputPreviewProps {
  data: BlogOutput | null;
  loading: boolean;
}

const tabs = ["Blog", "Metadata", "FAQ + Snippet", "LLM + Schema"];

export function OutputPreview({ data, loading }: OutputPreviewProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  if (!data && !loading) {
    return (
      <CenteredState>
        <svg
          className="mx-auto h-10 w-10 text-neutral-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.36-6.36-2.12 2.12M7.76 16.24l-2.12 2.12m12.72 0-2.12-2.12M7.76 7.76 5.64 5.64" />
          <path d="M12 8.5 13.1 11l2.4 1-2.4 1-1.1 2.5L10.9 13l-2.4-1 2.4-1L12 8.5z" />
        </svg>
        <h2 className="mt-4 text-lg font-semibold text-neutral-950">
          Your blog will appear here
        </h2>
        <p className="mt-2 text-sm text-neutral-500">
          Fill in the form and click Generate to create your optimized blog.
        </p>
      </CenteredState>
    );
  }

  if (loading) {
    return (
      <CenteredState pulsing>
        <div className="mx-auto w-full max-w-md space-y-3">
          <div className="h-5 w-2/3 rounded bg-neutral-200" />
          <div className="h-3 w-full rounded bg-neutral-200" />
          <div className="h-3 w-11/12 rounded bg-neutral-200" />
          <div className="h-24 w-full rounded bg-neutral-100" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-12 rounded bg-neutral-100" />
            <div className="h-12 rounded bg-neutral-100" />
            <div className="h-12 rounded bg-neutral-100" />
          </div>
        </div>
        <h2 className="mt-6 text-lg font-semibold text-neutral-950">
          Generating your optimized blog...
        </h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-neutral-500">
          This takes 15-30 seconds. Gemini is applying SEO, AEO, GEO, and LLM
          optimization rules.
        </p>
      </CenteredState>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <section className="space-y-4">
      <ScoreCards score={data.score} />
      <ExportButtons
        markdown={data.blogMarkdown}
        slug={data.slug}
        title={data.title}
      />

      <div className="rounded-lg border border-neutral-200 bg-white">
        <div className="border-b border-neutral-200 px-5 pt-4">
          <div className="flex gap-5 overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                className={`whitespace-nowrap border-b-2 px-1 pb-3 text-sm transition ${
                  activeTab === index
                    ? "border-neutral-900 font-medium text-neutral-900"
                    : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
                key={tab}
                onClick={() => setActiveTab(index)}
                type="button"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-5">
          {activeTab === 0 ? (
            <div className="prose prose-neutral max-w-none">
              <ReactMarkdown>{data.blogMarkdown}</ReactMarkdown>
            </div>
          ) : null}

          {activeTab === 1 ? <MetadataTab data={data} /> : null}

          {activeTab === 2 ? (
            <FaqTab data={data} onToggle={setOpenFaq} openFaq={openFaq} />
          ) : null}

          {activeTab === 3 ? <LlmSchemaTab data={data} /> : null}
        </div>
      </div>
    </section>
  );
}

function MetadataTab({ data }: { data: BlogOutput }) {
  return (
    <div className="grid gap-4">
      <LabeledCard label="SEO Title">{data.seoTitle}</LabeledCard>
      <LabeledCard label="Meta Description">{data.metaDescription}</LabeledCard>
      <LabeledCard label="URL Slug">
        <code className="rounded bg-neutral-100 px-2 py-1 text-sm">
          {data.slug}
        </code>
      </LabeledCard>
      <LabeledCard label="Excerpt">{data.excerpt}</LabeledCard>
      <LabeledCard label="Target Keyword">
        <Badge>{data.targetKeyword}</Badge>
      </LabeledCard>
      <LabeledCard label="Secondary Keywords">
        <div className="flex flex-wrap gap-2">
          {data.secondaryKeywords.map((keyword) => (
            <Badge key={keyword}>{keyword}</Badge>
          ))}
        </div>
      </LabeledCard>
    </div>
  );
}

function FaqTab({
  data,
  onToggle,
  openFaq,
}: {
  data: BlogOutput;
  onToggle: (index: number) => void;
  openFaq: number;
}) {
  return (
    <div className="space-y-5">
      <div className="border-l-4 border-neutral-900 bg-neutral-50 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Featured Snippet Answer
        </p>
        <p className="mt-2 text-sm leading-6 text-neutral-800">
          {data.featuredSnippet}
        </p>
      </div>

      <div className="space-y-3">
        {data.faq.map((item, index) => (
          <div
            className="rounded-lg border border-neutral-200 bg-white"
            key={item.question}
          >
            <button
              className="flex w-full items-center gap-3 px-4 py-3 text-left"
              onClick={() => onToggle(openFaq === index ? -1 : index)}
              type="button"
            >
              <span className="rounded-full bg-neutral-900 px-2 py-1 text-xs font-medium text-white">
                Q{index + 1}
              </span>
              <span className="flex-1 text-sm font-medium text-neutral-950">
                {item.question}
              </span>
              <span className="text-neutral-400">
                {openFaq === index ? "-" : "+"}
              </span>
            </button>
            {openFaq === index ? (
              <p className="border-t border-neutral-100 px-4 py-3 text-sm leading-6 text-neutral-700">
                {item.answer}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function LlmSchemaTab({ data }: { data: BlogOutput }) {
  return (
    <div className="space-y-5">
      <OptimizationReportPanel data={data} />

      <div className="rounded-lg bg-neutral-50 p-4">
        <p className="text-sm font-medium text-neutral-950">LLM Summary</p>
        <p className="mt-2 text-sm leading-6 text-neutral-700">
          {data.llmSummary}
        </p>
        <p className="mt-3 text-xs text-neutral-500">
          This summary helps AI systems understand and cite your content.
        </p>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-neutral-950">
          Schema JSON-LD (FAQPage)
        </p>
        <pre className="overflow-x-auto rounded-lg bg-neutral-950 p-4 text-sm text-green-400">
          <code>{JSON.stringify(data.schemaJsonLd, null, 2)}</code>
        </pre>
      </div>
    </div>
  );
}

function OptimizationReportPanel({ data }: { data: BlogOutput }) {
  return (
    <div className="grid gap-3">
      <ReportSection items={data.optimizationReport.seo} label="SEO" />
      <ReportSection items={data.optimizationReport.aeo} label="AEO" />
      <ReportSection items={data.optimizationReport.geo} label="GEO" />
      <ReportSection items={data.optimizationReport.llm} label="LLM" />
    </div>
  );
}

function ReportSection({ items, label }: { items: string[]; label: string }) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <h3 className="text-sm font-bold text-neutral-950">{label}</h3>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-neutral-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function LabeledCard({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div className="rounded-lg border border-neutral-200 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <div className="mt-2 text-sm leading-6 text-neutral-900">{children}</div>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800">
      {children}
    </span>
  );
}

function CenteredState({
  children,
  pulsing,
}: {
  children: React.ReactNode;
  pulsing?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border border-dashed border-neutral-300 bg-white px-6 py-16 text-center ${
        pulsing ? "animate-pulse" : ""
      }`}
    >
      {children}
    </div>
  );
}
