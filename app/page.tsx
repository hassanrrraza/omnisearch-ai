import Link from "next/link";

const githubUrl = "https://github.com/hassanrrraza/omnisearch-ai";
const hassanUrl = "https://hassanr.com/";

const workflowSteps = [
  {
    title: "Add your content context",
    description:
      "Enter the topic, audience, keywords, intent, links, CTA, or paste an existing article.",
  },
  {
    title: "Run the optimization engine",
    description:
      "OmniSearch AI applies SEO, AEO, GEO, and LLM optimization loops using the included guide files and prompt workflow.",
  },
  {
    title: "Review the content package",
    description:
      "Get the article, metadata, FAQs, Schema JSON-LD, scoring report, and LLM-ready summary.",
  },
  {
    title: "Export and publish",
    description:
      "Copy or download Markdown, HTML, MDX, metadata, and schema for your website or blog system.",
  },
];

const differentiators = [
  {
    title: "Not just blog generation",
    description:
      "A workflow engine with structured optimization steps for creation, refinement, metadata, scoring, and export.",
  },
  {
    title: "Search and AI discovery focused",
    description:
      "Designed for Google Search, AI Overviews, answer engines, and content that is easier for LLMs to understand.",
  },
  {
    title: "Open-source and local-first",
    description:
      "Use your own Gemini API key, inspect the prompts, customize the guides, and adapt the workflow to your stack.",
  },
  {
    title: "Built from real project workflows",
    description:
      "Based on optimization patterns used in agency and client content systems, packaged into an open-source product.",
  },
];

const packageItems = [
  "Optimized Blog Markdown",
  "SEO Title",
  "Meta Description",
  "URL Slug",
  "SERP Preview",
  "FAQ Section",
  "Featured Snippet",
  "Schema JSON-LD",
  "LLM Summary",
  "SEO/AEO/GEO/LLM Scores",
  "Optimization Report",
  "Export Buttons",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-[-14rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-teal-500/20 blur-3xl" />
        <div className="absolute right-[-12rem] top-40 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
        <Header />
        <Hero />
        <FeatureNavigation />
        <WorkflowSection />
        <DifferentSection />
        <OutputPackageSection />
        <OpenSourceSection />
        <FinalCta />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        className="inline-flex items-center gap-3 text-sm font-semibold text-white"
        href="/"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white text-sm font-bold text-slate-950 shadow-2xl shadow-teal-950/20">
          OS
        </span>
        <span>
          OmniSearch AI
          <span className="block text-xs font-normal text-slate-400">
            Open-source content optimization
          </span>
        </span>
      </Link>
      <nav className="flex flex-wrap gap-2 text-sm">
        <NavLink href="/new-blog">Create New Blog</NavLink>
        <NavLink href="/optimize-blog">Optimize Existing Blog</NavLink>
        <a
          className="rounded-lg border border-white/10 px-3 py-2 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
          href={githubUrl}
          rel="noreferrer"
          target="_blank"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
      <div>
        <p className="inline-flex rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs font-semibold uppercase text-teal-200">
          Open-source SEO - AEO - GEO - LLM optimization engine
        </p>
        <h1 className="mt-7 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          Turn blog ideas and existing articles into search-ready,
          AI-readable content packages.
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
          OmniSearch AI packages a proven content optimization workflow into an
          open-source engine. Generate new blogs or upgrade existing articles
          with structured SEO, AEO, GEO, and LLM optimization loops - powered by
          your own Gemini API key.
        </p>

        <p className="mt-5 max-w-3xl rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
          Built around a simple principle: better inputs create better outputs.
          OmniSearch AI gives you the workflow, structure, prompts, and
          optimization system. Your audience, context, and strategy make the
          final result stronger.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <PrimaryLink href="/new-blog">Create New Blog</PrimaryLink>
          <SecondaryLink href="/optimize-blog">
            Optimize Existing Blog
          </SecondaryLink>
          <GhostLink href={githubUrl}>View on GitHub</GhostLink>
        </div>

        <p className="mt-6 text-sm leading-6 text-slate-400">
          Developed and open-sourced by{" "}
          <a
            className="font-semibold text-teal-200 underline underline-offset-4 transition hover:text-white"
            href={hassanUrl}
            rel="noreferrer"
            target="_blank"
          >
            Hassan Raza
          </a>{" "}
          - Full-Stack Engineer and AI Engineer.
        </p>
      </div>

      <WorkflowPreview />
    </section>
  );
}

function WorkflowPreview() {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-4 shadow-2xl shadow-black/30 backdrop-blur">
      <div className="rounded-[1.25rem] border border-white/10 bg-slate-950/80 p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-teal-200">
              Workflow Preview
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
              From raw context to publish-ready output
            </h2>
          </div>
          <span className="rounded-full bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-200">
            Gemini powered
          </span>
        </div>

        <div className="mt-6 grid gap-3">
          {[
            "Topic, keyword, audience, intent, links, CTA",
            "SEO/AEO/GEO/LLM optimization loops",
            "Article, metadata, FAQ, schema, scores",
            "Markdown, HTML, MDX, JSON exports",
          ].map((item, index) => (
            <div
              className="flex gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4"
              key={item}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-300 text-xs font-bold text-slate-950">
                {index + 1}
              </span>
              <p className="text-sm leading-6 text-slate-200">{item}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-teal-300/20 bg-teal-300/10 p-4">
          <p className="text-sm font-semibold text-teal-100">
            A tested content optimization workflow packaged into an open-source
            tool.
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Designed to help content become easier to crawl, understand, cite,
            and surface across search and AI systems.
          </p>
        </div>
      </div>
    </div>
  );
}

function FeatureNavigation() {
  return (
    <SectionShell
      eyebrow="Start here"
      title="Choose the workflow that matches your content stage."
      description="Create something new from structured context, or improve an existing article with a focused optimization pass."
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <FeatureCard
          button="Create New Blog"
          description="Generate a complete SEO/AEO/GEO/LLM-ready blog from your topic, keyword, audience, search intent, and CTA."
          href="/new-blog"
          label="New content"
          title="Create a New Blog"
        />
        <FeatureCard
          button="Optimize Existing Blog"
          description="Paste your current article and upgrade it with better structure, metadata, FAQs, schema, scoring, and AI-readable summaries."
          href="/optimize-blog"
          label="Existing content"
          title="Optimize an Existing Blog"
        />
      </div>
    </SectionShell>
  );
}

function WorkflowSection() {
  return (
    <SectionShell
      eyebrow="Workflow"
      title="A repeatable optimization system, not a blank prompt box."
      description="The engine improves the workflow, but the quality of the final output still depends on the quality of the context you provide."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {workflowSteps.map((step, index) => (
          <article
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
            key={step.title}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-slate-950">
              {index + 1}
            </span>
            <h3 className="mt-5 text-lg font-semibold text-white">
              {step.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {step.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function DifferentSection() {
  return (
    <SectionShell
      eyebrow="Why it is different"
      title="Built for search and AI discovery workflows."
      description="OmniSearch AI is positioned around structured optimization, transparent prompts, and practical publishing outputs."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {differentiators.map((item) => (
          <article
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-5"
            key={item.title}
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  );
}

function OutputPackageSection() {
  return (
    <SectionShell
      eyebrow="Output package"
      title="Everything you need to move from draft to publishing workflow."
      description="Each successful run returns structured content and publishing assets that are easy to review, copy, download, or adapt."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {packageItems.map((item) => (
          <div
            className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-medium text-slate-200"
            key={item}
          >
            {item}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}

function OpenSourceSection() {
  return (
    <section className="my-20 rounded-[1.5rem] border border-teal-300/20 bg-teal-300/10 p-6 sm:p-8 lg:p-10">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-teal-200">
            Open-source and local-first
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            More control over your content optimization workflow.
          </h2>
          <p className="mt-4 text-base leading-8 text-slate-300">
            Open-sourced for builders, creators, founders, and marketers who
            want a transparent workflow they can inspect, run locally, and
            extend for their own publishing systems.
          </p>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            Developed and open-sourced by{" "}
            <a
              className="font-semibold text-teal-100 underline underline-offset-4 transition hover:text-white"
              href={hassanUrl}
              rel="noreferrer"
              target="_blank"
            >
              Hassan Raza
            </a>
            .
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Bring your own Gemini API key",
            "Customize the guides",
            "Improve the prompts",
            "Run it locally",
            "Extend the export workflow",
            "Adapt it for your CMS",
          ].map((item) => (
            <div
              className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm font-medium text-slate-200"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="mb-16 rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 text-center sm:p-10">
      <p className="text-sm font-semibold uppercase text-teal-200">
        Ready to build a content package?
      </p>
      <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Start with a topic or paste an existing article.
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-slate-300">
        OmniSearch AI will turn it into a structured content package built for
        search engines and AI discovery.
      </p>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <PrimaryLink href="/new-blog">Create New Blog</PrimaryLink>
        <SecondaryLink href="/optimize-blog">Optimize Existing Blog</SecondaryLink>
        <GhostLink href={githubUrl}>View on GitHub</GhostLink>
      </div>
    </section>
  );
}

function SectionShell({
  children,
  description,
  eyebrow,
  title,
}: {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mb-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase text-teal-200">
          {eyebrow}
        </p>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-300">
          {description}
        </p>
      </div>
      {children}
    </section>
  );
}

function FeatureCard({
  button,
  description,
  href,
  label,
  title,
}: {
  button: string;
  description: string;
  href: string;
  label: string;
  title: string;
}) {
  return (
    <article className="group rounded-[1.5rem] border border-white/10 bg-white/[0.06] p-6 transition hover:-translate-y-1 hover:border-teal-300/30 hover:bg-white/[0.08] sm:p-7">
      <p className="text-sm font-semibold uppercase text-teal-200">{label}</p>
      <h3 className="mt-4 text-2xl font-bold tracking-tight text-white">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-7 text-slate-300">{description}</p>
      <Link
        className="mt-6 inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-950 transition group-hover:bg-teal-100"
        href={href}
      >
        {button}
      </Link>
    </article>
  );
}

function NavLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="rounded-lg border border-white/10 px-3 py-2 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
      href={href}
    >
      {children}
    </Link>
  );
}

function PrimaryLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 shadow-2xl shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-100"
      href={href}
    >
      {children}
    </Link>
  );
}

function SecondaryLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-2xl shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-300"
      href={href}
    >
      {children}
    </Link>
  );
}

function GhostLink({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <a
      className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-5 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.08]"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
    </a>
  );
}
