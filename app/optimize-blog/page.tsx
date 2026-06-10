import Link from "next/link";

export default function OptimizeBlogPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-5 text-neutral-950">
      <section className="max-w-lg text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Optimize Existing Blog
        </h1>
        <p className="mt-3 text-sm leading-6 text-neutral-600">
          This feature is being built. Coming in Phase 2.
        </p>
        <Link
          className="mt-6 inline-flex text-sm font-medium text-neutral-900 underline underline-offset-4"
          href="/"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
