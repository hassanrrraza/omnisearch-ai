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

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {[
              "✦ SEO Optimized",
              "✦ AI Overview Ready",
              "✦ GEO + LLM Optimized",
              "✦ Gemini Powered",
            ].map((feature) => (
              <span
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-600"
                key={feature}
              >
                {feature}
              </span>
            ))}
          </div>
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
            className="group rounded-lg border border-neutral-200 bg-white p-6 text-left transition hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm"
            href="/optimize-blog"
          >
            <SparkleIcon />
            <h2 className="mt-5 text-xl font-semibold text-neutral-950">
              Optimize Existing Blog
            </h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">
              Paste your existing article and upgrade it for SEO, AEO, GEO, and
              LLM visibility.
            </p>
            <p className="mt-6 text-sm font-medium text-neutral-900">
              Paste → Optimized output
            </p>
          </Link>
        </section>

        <section className="mt-10 rounded-lg border border-neutral-200 bg-white p-5">
          <div className="grid gap-5 md:grid-cols-3">
            <HowItWorksStep
              description="Add a topic, keyword, audience, or existing article."
              icon={<PencilIcon />}
              title="1. Fill the form"
            />
            <HowItWorksStep
              description="The server loads your guides and applies Gemini."
              icon={<SparkleIcon small />}
              title="2. Gemini optimizes"
            />
            <HowItWorksStep
              description="Copy Markdown, metadata JSON, or download files."
              icon={<DownloadIcon />}
              title="3. Export your content"
            />
          </div>
        </section>

        <section className="mt-10 text-center">
          <p className="text-sm text-neutral-500">
            OmniSearch AI is free and open source.
          </p>
          <a
            className="mt-2 inline-flex text-sm font-medium text-neutral-900 underline underline-offset-4 hover:opacity-70"
            href="https://github.com/hassanrrraza/omnisearch-ai"
            rel="noreferrer"
            target="_blank"
          >
            ⭐ Star on GitHub →
          </a>
        </section>

        <p className="mt-10 text-center text-sm text-neutral-500">
          Runs 100% locally. Your API key never leaves your machine. Open source
          on GitHub.
        </p>
      </div>
    </main>
  );
}

function HowItWorksStep({
  description,
  icon,
  title,
}: {
  description: string;
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-neutral-950">{title}</h2>
        <p className="mt-1 text-sm leading-5 text-neutral-500">
          {description}
        </p>
      </div>
    </div>
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

function SparkleIcon({ small }: { small?: boolean }) {
  return (
    <svg
      className={small ? "h-5 w-5" : "h-10 w-10 text-neutral-900"}
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

function PencilIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="m16.5 3.5 4 4L8 20H4v-4z" />
      <path d="m14 6 4 4" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}
