"use client";

import { useState } from "react";
import { BlogForm } from "@/components/BlogForm";
import { OutputPreview } from "@/components/OutputPreview";
import type { BlogOutput } from "@/lib/schemas/blog-output-schema";

export default function NewBlogPage() {
  const [result, setResult] = useState<BlogOutput | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-50 px-5 py-8 text-neutral-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 lg:flex-row">
        <section className="lg:w-2/5">
          <p className="text-sm font-medium text-neutral-500">
            Generate New Blog
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Create New Blog
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-neutral-600">
            Fill in the details below. The optimization engine will apply SEO,
            AEO, GEO, and LLM rules automatically.
          </p>
          <BlogForm onLoading={setLoading} onResult={setResult} />
        </section>

        <section className="lg:w-3/5">
          <OutputPreview data={result} loading={loading} />
        </section>
      </div>
    </main>
  );
}
