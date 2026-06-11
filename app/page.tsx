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
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            Open-source SEO · AEO · GEO · LLM engine
        </p>
          <h1 className="hero-title">
            Optimize content for Google Search and AI discovery.
        </h1>
          <p className="hero-subtitle">
            OmniSearch AI turns blog ideas and existing articles into
            structured content packages with SEO metadata, FAQs, schema,
            scoring, and LLM-ready summaries — powered by your own Gemini API
            key.
        </p>

          <p className="hero-package-line">
            Built from a proven workflow used in real client and agency
            projects. Better context creates better output.
        </p>

          <div className="hero-actions">
            <PrimaryLink href="/new-blog">Start New Blog</PrimaryLink>
          <SecondaryLink href="/optimize-blog">
            Optimize Existing Blog
          </SecondaryLink>
            <GhostLink href={githubUrl}>GitHub</GhostLink>
        </div>

          <p className="hero-credit">
          Developed and open-sourced by{" "}
          <a
            className="font-semibold text-teal-200 underline underline-offset-4 transition hover:text-white"
            href={hassanUrl}
            rel="noreferrer"
            target="_blank"
          >
            Hassan Raza
          </a>{" "}
            .
        </p>
      </div>

      <WorkflowPreview />
      </div>
    </section>
  );
}

function WorkflowPreview() {
  const rows = [
    {
      label: "Input",
      text: "Topic · Keyword · Audience · CTA",
    },
    {
      label: "Optimize",
      text: "SEO · AEO · GEO · LLM",
    },
    {
      label: "Package",
      text: "Blog · Metadata · FAQ · Schema",
    },
    {
      label: "Export",
      text: "Markdown · HTML · MDX · JSON",
    },
  ];

  return (
    <div className="workflow-preview-card">
      <div className="workflow-preview-header">
          <div>
          <p className="text-xs font-semibold uppercase text-teal-200">
            Workflow Preview
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            From raw context to publish-ready content.
            </h2>
          </div>
        <span className="rounded-full border border-teal-300/20 bg-teal-300/10 px-3 py-1 text-xs font-semibold text-teal-200">
            Gemini powered
          </span>
        </div>

      <div className="mt-6 grid gap-3">
        {rows.map((row) => (
          <div className="workflow-preview-row" key={row.label}>
            <p className="workflow-preview-label">{row.label}</p>
            <p className="workflow-preview-text">{row.text}</p>
            </div>
          ))}
        </div>

      <div className="mt-5 rounded-2xl border border-teal-300/20 bg-teal-300/10 p-4">
        <p className="text-sm leading-6 text-slate-200">
          A tested content optimization workflow packaged into an open-source
          tool.
        </p>
        </div>
    </div>
  );
}

function FeatureNavigation() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="mb-6 max-w-3xl sm:mb-8">
        <p className="text-xs font-extrabold uppercase tracking-wide text-teal-200">
          Start here
        </p>
        <h2 className="mt-3 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          Choose the right workflow for your content stage.
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-300">
          Start with a fresh topic or paste an existing article. OmniSearch AI
          guides both paths through the same SEO, AEO, GEO, and LLM
          optimization system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:gap-6">
        <WorkflowChoiceCard
          action="Start New Blog"
          badge="New content"
          checklist={[
            "Blog draft",
            "SEO metadata",
            "FAQ + schema",
            "LLM-ready summary",
          ]}
          description="Turn your topic, keyword, audience, search intent, links, and CTA into a complete search-ready content package."
          href="/new-blog"
          number="01"
          title="Create a New Blog"
        />
        <WorkflowChoiceCard
          action="Optimize Existing Blog"
          badge="Existing content"
          checklist={[
            "Content rewrite",
            "Optimization report",
            "SEO/AEO/GEO scoring",
            "Export-ready files",
          ]}
          description="Paste an article you already have and upgrade it with stronger structure, metadata, FAQs, schema, scoring, and AI-readable summaries."
          href="/optimize-blog"
          number="02"
          title="Optimize an Existing Blog"
        />
      </div>
    </section>
  );
}

function WorkflowChoiceCard({
  action,
  badge,
  checklist,
  description,
  href,
  number,
  title,
}: {
  action: string;
  badge: string;
  checklist: string[];
  description: string;
  href: string;
  number: string;
  title: string;
}) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20 transition hover:-translate-y-1 hover:border-teal-300/35 hover:bg-white/[0.08] sm:p-7">
      <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-teal-300/10 blur-3xl" />
      <div className="relative flex items-center justify-between gap-4">
        <span className="rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wide text-teal-200">
          {badge}
        </span>
        <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
          Workflow {number}
        </span>
      </div>
      <h3 className="relative mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        {title}
      </h3>
      <p className="relative mt-3 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
        {description}
      </p>
      <ul className="relative mt-5 grid gap-2 sm:grid-cols-2">
        {checklist.map((item) => (
          <li
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2.5 text-sm font-medium text-slate-200"
            key={item}
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-300"
            />
            {item}
          </li>
        ))}
      </ul>
      <Link
        className="relative mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-teal-100 sm:w-auto"
        href={href}
      >
        {action}
      </Link>
    </article>
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
