import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-50 px-5 py-16 text-neutral-950 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <section className="text-center">
          <p className="text-sm font-medium text-neutral-500">
            Open Source · Powered by Gemini
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            OmniSearch AI
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-neutral-600">
            Generate blog posts optimized for Google Search, AI Overviews, AEO,
            GEO, and LLM discovery - powered by your own Gemini API key.
          </p>
        </section>

        <section className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Link
            className="group rounded-lg border border-neutral-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm"
            href="/new-blog"
          >
            <DocumentPlusIcon />
            <h2 className="mt-5 text-xl font-semibold text-neutral-950">
              Create New Blog
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Generate a complete blog post from title, keyword, audience, and
              intent. Get blog + metadata + FAQ + schema.
            </p>
            <p className="mt-6 text-sm font-medium text-neutral-900">
              New → Markdown output
            </p>
          </Link>

          <Link
            className="relative rounded-lg border border-neutral-200 bg-white p-6 text-left opacity-60"
            href="/optimize-blog"
          >
            <span className="absolute right-4 top-4 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700">
              Coming Soon
            </span>
            <SparkleIcon />
            <h2 className="mt-5 text-xl font-semibold text-neutral-950">
              Optimize Existing Blog
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Paste your existing article and upgrade it for SEO, AEO, GEO, and
              LLM visibility.
            </p>
            <p className="mt-6 text-sm font-medium text-neutral-900">
              Coming in Phase 2
            </p>
          </Link>
        </section>

        <p className="mt-10 text-center text-sm text-neutral-500">
          Runs 100% locally. Your API key never leaves your machine. Open source
          on GitHub.
        </p>
      </div>
    </main>
  );
}

function DocumentPlusIcon() {
  return (
    <svg
      className="h-10 w-10 text-neutral-900"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M14 3v5a2 2 0 0 0 2 2h5" />
      <path d="M6 3h8l7 7v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M12 13v5M9.5 15.5h5" />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      className="h-10 w-10 text-neutral-900"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 3 13.8 8.2 19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" />
      <path d="m19 15 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" />
      <path d="m5 3 .8 2.2L8 6l-2.2.8L5 9l-.8-2.2L2 6l2.2-.8L5 3z" />
    </svg>
  );
}
