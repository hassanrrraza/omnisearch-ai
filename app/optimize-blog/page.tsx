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
    <main className="min-h-screen bg-neutral-50 px-5 py-8 text-neutral-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
        <section className="lg:w-2/5">
          <p className="text-sm font-medium text-neutral-500">
            Optimize Existing Blog
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Optimize Existing Blog
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Paste your existing article. The engine will upgrade it for SEO,
            AEO, GEO, and LLM visibility while preserving your voice.
          </p>
          <ExistingBlogForm onLoading={setLoading} onResult={handleResult} />
        </section>

        <section className="lg:w-3/5">
          <OptimizeOutputPreview
            data={result}
            loading={loading}
            originalBlog={originalBlog}
          />
        </section>
      </div>
    </main>
  );
}
