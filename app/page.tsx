import Link from "next/link";

const features = [
  {
    title: "Generate search-ready blogs",
    description:
      "Turn a topic, keyword, audience, and intent into a complete content package with markdown, metadata, FAQ, schema, and scores.",
  },
  {
    title: "Optimize existing articles",
    description:
      "Paste an article and improve structure, search intent, answer readiness, and LLM readability while preserving the original meaning.",
  },
  {
    title: "Bring your own Gemini key",
    description:
      "Run locally with your API key. The app stays transparent, open-source friendly, and easy for developers to inspect.",
  },
];

const steps = [
  {
    title: "Choose a workflow",
    description:
      "Start fresh with a new blog or paste an existing post that needs a stronger search and AI discovery package.",
  },
  {
    title: "Add useful context",
    description:
      "Provide keyword, audience, tone, links, CTA, and intent so Gemini has the right constraints before it writes.",
  },
  {
    title: "Export the package",
    description:
      "Copy markdown, download MD/HTML/MDX, and reuse metadata or Schema JSON-LD in your publishing stack.",
  },
];

export default function Home() {
  return (
    <main className="app-shell px-5 py-6 sm:px-8 lg:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-7xl flex-col">
        <header className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            className="inline-flex items-center gap-3 text-sm font-semibold text-slate-950"
            href="/"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-950 text-sm font-bold text-white">
              OS
            </span>
            OmniSearch AI
          </Link>
          <nav className="flex flex-wrap gap-2 text-sm">
            <Link className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-white hover:text-slate-950" href="/new-blog">
              New Blog
            </Link>
            <Link className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-white hover:text-slate-950" href="/optimize-blog">
              Optimize
            </Link>
            <a
              className="rounded-lg px-3 py-2 text-slate-600 transition hover:bg-white hover:text-slate-950"
              href="https://github.com/hassanrrraza/omnisearch-ai"
              rel="noreferrer"
              target="_blank"
            >
              GitHub
            </a>
          </nav>
        </header>

        <section className="grid flex-1 items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div>
            <p className="inline-flex rounded-full border border-teal-200 bg-white/80 px-3 py-1 text-xs font-medium text-teal-800 shadow-sm">
              Open-source content optimization powered by Gemini
            </p>
            <h1 className="mt-6 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Generate and optimize blog posts for search engines, answer
              engines, and LLM discovery.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              OmniSearch AI helps creators, marketers, founders, and developers
              build complete SEO, AEO, GEO, and LLM-ready content packages using
              their own Gemini API key.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800"
                href="/new-blog"
              >
                Create New Blog
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-lg bg-teal-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:-translate-y-0.5 hover:bg-teal-700"
                href="/optimize-blog"
              >
                Optimize Existing Blog
              </Link>
              <a
                className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-800 transition hover:-translate-y-0.5 hover:border-slate-400 hover:bg-white"
                href="https://github.com/hassanrrraza/omnisearch-ai"
                rel="noreferrer"
                target="_blank"
              >
                View on GitHub
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {["SEO", "AEO", "GEO", "LLM visibility", "Schema JSON-LD"].map(
                (item) => (
                  <span
                    className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600"
                    key={item}
                  >
                    {item}
                  </span>
                )
              )}
            </div>
          </div>

          <div className="surface-card rounded-2xl p-5 sm:p-6">
            <div className="rounded-xl bg-slate-950 p-5 text-white">
              <p className="text-xs font-medium uppercase text-teal-300">
                Optimized Content Package
              </p>
              <h2 className="mt-3 text-2xl font-semibold">
                Markdown, metadata, FAQ, schema, and scoring in one workflow.
              </h2>
              <div className="mt-6 grid gap-3">
                {[
                  "SEO title and meta description",
                  "FAQ and featured snippet answer",
                  "Schema JSON-LD for publishing",
                  "SEO, AEO, GEO, and LLM scores",
                ].map((item) => (
                  <div className="flex items-center gap-3 rounded-lg bg-white/8 p-3" key={item}>
                    <span className="h-2 w-2 rounded-full bg-teal-300" />
                    <span className="text-sm text-slate-100">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {features.slice(0, 2).map((feature) => (
                <div className="rounded-xl border border-slate-200 bg-white p-4" key={feature.title}>
                  <h3 className="text-sm font-semibold text-slate-950">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-4 pb-12 md:grid-cols-3">
          {features.map((feature) => (
            <article className="soft-card rounded-xl p-5 transition hover:-translate-y-0.5 hover:shadow-lg" key={feature.title}>
              <h2 className="text-base font-semibold text-slate-950">
                {feature.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </section>

        <section className="surface-card rounded-2xl p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-teal-700">How it works</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
                From idea to publish-ready package
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              Designed for fast local workflows, transparent prompts, and
              outputs you can move into a CMS or codebase.
            </p>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {steps.map((step, index) => (
              <div className="rounded-xl border border-slate-200 bg-white p-5" key={step.title}>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-teal-700">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-sm font-semibold text-slate-950">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="my-12 rounded-2xl border border-slate-800 bg-slate-950 p-6 text-white sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-teal-300">
                Free, local, and open source
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Your API key stays on your machine.
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                OmniSearch AI is built for developers and teams who want an
                inspectable content workflow without handing publishing context
                to a closed SaaS dashboard.
              </p>
            </div>
            <a
              className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100"
              href="https://github.com/hassanrrraza/omnisearch-ai"
              rel="noreferrer"
              target="_blank"
            >
              View on GitHub
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
