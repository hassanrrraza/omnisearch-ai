"use client";

import { useState } from "react";
import { BlogForm } from "@/components/BlogForm";
import { OutputPreview } from "@/components/OutputPreview";
import type { BlogOutput } from "@/lib/schemas/blog-output-schema";

export default function NewBlogPage() {
  const [result, setResult] = useState<BlogOutput | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="app-shell px-5 py-6 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              Generate New Blog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Create a search-ready blog package
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Add your topic, keyword, audience, and intent. OmniSearch AI will
              generate a complete blog with metadata, FAQ, schema, and scores.
            </p>
          </div>
          <p className="rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-800">
            Maximum 2,500 words per generated blog.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(320px,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <section className="surface-card rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Input
            </p>
            <BlogForm onLoading={setLoading} onResult={setResult} />
        </section>

          <section className="min-w-0">
            <OutputPreview data={result} loading={loading} />
          </section>
        </div>
      </div>
    </main>
  );
}
