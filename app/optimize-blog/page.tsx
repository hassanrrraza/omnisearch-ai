"use client";

import { useState } from "react";
import { ExistingBlogForm } from "@/components/ExistingBlogForm";
import { OptimizeOutputPreview } from "@/components/OptimizeOutputPreview";
import type { OptimizeOutput } from "@/lib/schemas/optimize-output-schema";

export default function OptimizeBlogPage() {
  const [result, setResult] = useState<OptimizeOutput | null>(null);
  const [originalBlog, setOriginalBlog] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleResult(data: OptimizeOutput, original: string) {
    setResult(data);
    setOriginalBlog(original);
  }

  return (
    <main className="app-shell px-5 py-6 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm sm:p-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-teal-700">
              Optimize Existing Blog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Upgrade an existing article
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
              Paste a draft or published post. OmniSearch AI improves the
              article first, then generates metadata, FAQ, schema, and scores.
            </p>
          </div>
          <p className="rounded-lg bg-teal-50 px-3 py-2 text-xs font-medium text-teal-800">
            Best results up to 2,500 words.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(320px,0.42fr)_minmax(0,0.58fr)] lg:items-start">
          <section className="surface-card rounded-2xl p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase text-slate-500">
              Input
            </p>
            <ExistingBlogForm onLoading={setLoading} onResult={handleResult} />
        </section>

          <section className="min-w-0">
            <OptimizeOutputPreview
              data={result}
              loading={loading}
              originalBlog={originalBlog}
            />
          </section>
        </div>
      </div>
    </main>
  );
}
