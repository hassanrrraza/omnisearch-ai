import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqItems } from "@/lib/seo/faq";
import { homePageJsonLd } from "@/lib/seo/json-ld";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  path: "/",
});

const githubUrl = "https://github.com/hassanrrraza/omnisearch-ai";
const hassanUrl = "https://hassanr.com/";

const heroStages = [
  "Analyzing context",
  "Mapping search intent",
  "Applying SEO/AEO/GEO/LLM loops",
  "Generating schema and FAQ",
  "Scoring content package",
  "Export ready",
];

const workflowNodes = [
  { className: "node-input", label: "Input Context" },
  { className: "node-seo", label: "SEO Loop" },
  { className: "node-aeo", label: "AEO Loop" },
  { className: "node-geo", label: "GEO Loop" },
  { className: "node-llm", label: "LLM Loop" },
  { className: "node-package", label: "Content Package" },
  { className: "node-export", label: "Export" },
];

const workflowChoices = [
  {
    action: "Start New Blog",
    badge: "New content",
    checklist: [
      "Blog draft",
      "SEO metadata",
      "FAQ + schema",
      "LLM-ready summary",
    ],
    description:
      "Turn your topic, keyword, audience, search intent, links, and CTA into a complete search-ready content package.",
    href: "/new-blog",
    number: "01",
    title: "Create a New Blog",
  },
  {
    action: "Optimize Existing Blog",
    badge: "Existing content",
    checklist: [
      "Content rewrite",
      "Optimization report",
      "SEO/AEO/GEO scoring",
      "Export-ready files",
    ],
    description:
      "Paste an article you already have and upgrade it with stronger structure, metadata, FAQs, schema, scoring, and AI-readable summaries.",
    href: "/optimize-blog",
    number: "02",
    title: "Optimize an Existing Blog",
  },
];

const workflowSteps = [
  {
    output: "Input: topic, audience, intent, links, CTA",
    title: "Add your content context",
    description:
      "Enter your topic, keyword, audience, search intent, internal links, CTA, or paste an existing article.",
  },
  {
    output: "Loops: SEO / AEO / GEO / LLM",
    title: "Run the optimization loops",
    description:
      "The engine applies SEO, AEO, GEO, and LLM-focused prompt workflows using the included optimization guides.",
  },
  {
    output: "Package: article, metadata, FAQ, schema, scores",
    title: "Review the content package",
    description:
      "Get the article, metadata, FAQs, schema JSON-LD, featured snippet, scores, and LLM-ready summary.",
  },
  {
    output: "Exports: MD / HTML / MDX / JSON",
    title: "Export and publish",
    description:
      "Copy or download Markdown, HTML, MDX, metadata, and schema for your blog, CMS, or developer workflow.",
  },
];

const differentiators = [
  {
    highlight: "Structured pipeline",
    title: "Workflow-first, not prompt-only",
    description:
      "Instead of relying on one generic prompt, OmniSearch AI guides content through structured optimization steps for creation, refinement, metadata, scoring, and export.",
  },
  {
    highlight: "SEO / AEO / GEO / LLM",
    title: "Built for search and AI discovery",
    description:
      "Designed to make content easier to crawl, understand, extract, cite, and surface across Google Search, AI Overviews, answer engines, and LLM-driven discovery.",
  },
  {
    highlight: "Your key. Your workflow.",
    title: "Open-source and local-first",
    description:
      "Bring your own Gemini API key, inspect the prompts, customize the guides, and adapt the workflow to your own stack or publishing system.",
  },
  {
    highlight: "Proven workflow patterns",
    title: "Based on real project workflows",
    description:
      "Packaged from optimization patterns used in agency and client content systems, then made open-source for builders, creators, founders, and marketers.",
  },
];

const packageGroups = [
  {
    title: "Content Assets",
    items: [
      "Optimized Blog Markdown",
      "Featured Snippet",
      "LLM Summary",
      "FAQ Section",
    ],
  },
  {
    title: "Search Metadata",
    items: ["SEO Title", "Meta Description", "URL Slug", "SERP Preview"],
  },
  {
    title: "Publishing Toolkit",
    items: [
      "Schema JSON-LD",
      "SEO/AEO/GEO/LLM Scores",
      "Optimization Report",
      "Export Buttons",
    ],
  },
];

const openSourceCapabilities = [
  "Bring your own Gemini API key",
  "Customize the optimization guides",
  "Improve or replace the prompts",
  "Run the app locally",
  "Extend the export workflow",
  "Adapt it for your CMS or content stack",
];

export default function Home() {
  return (
    <main className="home-page">
      <JsonLd data={homePageJsonLd(homeFaqItems)} />
      <div className="home-background" aria-hidden="true">
        <div className="home-orb home-orb-one" />
        <div className="home-orb home-orb-two" />
        <div className="home-grid" />
      </div>

      <div className="home-shell">
        <Header />
        <Hero />
        <FeatureNavigation />
        <WorkflowSection />
        <DifferentSection />
        <OutputPackageSection />
        <OpenSourceSection />
        <FaqSection />
        <FinalCta />
        <SiteFooter />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="home-header">
      <Link className="brand-lockup" href="/">
        <span className="brand-mark">OS</span>
        <span>
          OmniSearch AI
          <span className="brand-subtitle">Open-source content engine</span>
        </span>
      </Link>
      <nav className="home-nav" aria-label="Homepage navigation">
        <NavLink href="/new-blog">Start New Blog</NavLink>
        <NavLink href="/optimize-blog">Optimize Existing Blog</NavLink>
        <NavLink href="/#faq">FAQ</NavLink>
        <a className="nav-link" href={githubUrl} rel="noreferrer" target="_blank">
          GitHub
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section className="home-hero">
      <div className="hero-copy">
        <p className="hero-eyebrow">Open-source SEO / AEO / GEO / LLM engine</p>
        <h1 className="hero-title">
          Optimize content for Google Search and AI discovery.
        </h1>
        <p className="hero-subtitle">
          OmniSearch AI turns blog ideas and existing articles into structured
          content packages with SEO metadata, FAQs, schema, scoring, and
          LLM-ready summaries - powered by your own Gemini API key.
        </p>
        <p className="hero-package-line">
          Built from a proven workflow used in real client and agency projects.
          Better context creates better output.
        </p>

        <div className="hero-actions">
          <PrimaryLink href="/new-blog">Start New Blog</PrimaryLink>
          <SecondaryLink href="/optimize-blog">Optimize Existing Blog</SecondaryLink>
          <GhostLink href={githubUrl}>GitHub</GhostLink>
        </div>

        <p className="hero-credit">
          Developed and open-sourced by{" "}
          <a href={hassanUrl} rel="noreferrer" target="_blank">
            Hassan Raza
          </a>
          .
        </p>
      </div>

      <HeroWorkflowVisual />
    </section>
  );
}

function HeroWorkflowVisual() {
  return (
    <div className="hero-visual-card" aria-label="Animated workflow preview">
      <div className="hero-visual-top">
        <div>
          <p className="visual-kicker">Workflow engine</p>
          <h2>From raw context to publish-ready content.</h2>
        </div>
        <span>Gemini powered</span>
      </div>

      <div className="workflow-graph" aria-hidden="true">
        <div className="graph-core">
          <span>Omni</span>
          <strong>Search</strong>
        </div>
        <div className="graph-ring graph-ring-one" />
        <div className="graph-ring graph-ring-two" />
        {workflowNodes.map((node) => (
          <div className={`graph-node ${node.className}`} key={node.label}>
            {node.label}
          </div>
        ))}
        <div className="graph-path graph-path-one" />
        <div className="graph-path graph-path-two" />
      </div>

      <div className="workflow-console">
        {heroStages.map((stage, index) => (
          <p key={stage} style={{ "--stage-index": index } as CSSProperties}>
            <span />
            {stage}
          </p>
        ))}
      </div>
    </div>
  );
}

function FeatureNavigation() {
  return (
    <section className="home-section">
      <SectionHeader
        eyebrow="Start here"
        title="Choose the right workflow for your content stage."
        description="Start with a fresh topic or paste an existing article. OmniSearch AI guides both paths through the same SEO, AEO, GEO, and LLM optimization system."
      />

      <div className="workflow-card-grid">
        {workflowChoices.map((choice) => (
          <WorkflowChoiceCard key={choice.title} {...choice} />
        ))}
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
}: (typeof workflowChoices)[number]) {
  return (
    <article className="workflow-choice-card premium-card">
      <div className="workflow-choice-top">
        <span className="mini-badge">{badge}</span>
        <span className="workflow-choice-number">Workflow {number}</span>
      </div>
      <h3 className="workflow-choice-title">{title}</h3>
      <p className="workflow-choice-description">{description}</p>
      <ul className="compact-checklist">
        {checklist.map((item) => (
          <li key={item}>
            <span aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
      <Link className="workflow-choice-action" href={href}>
        {action}
      </Link>
    </article>
  );
}

function WorkflowSection() {
  return (
    <section className="home-section process-section">
      <SectionHeader
        eyebrow="The workflow"
        title="A structured pipeline from raw context to publish-ready content."
        description="OmniSearch AI guides your input through a repeatable optimization workflow: context collection, SEO/AEO/GEO/LLM optimization, content packaging, and export-ready delivery."
      />

      <div className="process-grid">
        {workflowSteps.map((step, index) => (
          <article className="process-step-card premium-card" key={step.title}>
            <div className="process-step-top">
              <span className="process-step-number">
                {String(index + 1).padStart(2, "0")}
              </span>
              {index < workflowSteps.length - 1 ? (
                <span className="process-connector" aria-hidden="true" />
              ) : null}
            </div>
            <h3 className="process-step-title">{step.title}</h3>
            <p className="process-step-description">{step.description}</p>
            <p className="process-step-output">{step.output}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function DifferentSection() {
  return (
    <section className="home-section difference-section">
      <SectionHeader
        eyebrow="Why it's different"
        title="Not another AI writer. A structured optimization engine."
        description="Most AI writing tools stop at the draft. OmniSearch AI goes further with a repeatable workflow for content structure, metadata, answer optimization, schema, scoring, and export-ready publishing."
      >
        <div className="difference-comparison">
          <span>Generic AI writer: draft only</span>
          <span aria-hidden="true">-&gt;</span>
          <span>
            OmniSearch AI: draft + metadata + FAQ + schema + scoring + export
          </span>
        </div>
      </SectionHeader>

      <div className="difference-grid">
        {differentiators.map((item, index) => (
          <article className="difference-card premium-card" key={item.title}>
            <span className="difference-card-marker">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="difference-card-title">{item.title}</h3>
            <p className="difference-card-description">{item.description}</p>
            <p className="difference-card-highlight">{item.highlight}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OutputPackageSection() {
  return (
    <section className="home-section output-package-section">
      <SectionHeader
        eyebrow="Output package"
        title="Everything you need to review, publish, and reuse your content."
        description="Each run returns a structured content package - not just a draft. Review the article, copy metadata, inspect schema, check scores, and export files for your website, CMS, or developer workflow."
      />

      <div className="output-package-grid">
        {packageGroups.map((group) => (
          <article className="output-package-card premium-card" key={group.title}>
            <h3 className="output-package-card-title">{group.title}</h3>
            <ul className="output-package-list">
              {group.items.map((item) => (
                <li key={item}>
                  <span aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

function OpenSourceSection() {
  return (
    <section className="home-section opensource-section">
      <div className="opensource-grid">
        <div className="opensource-content">
          <p className="section-eyebrow">Open-source & local-first</p>
          <h2 className="section-title">
            Own the workflow instead of renting a black box.
          </h2>
          <p className="section-description">
            OmniSearch AI is open-sourced for builders, creators, founders, and
            marketers who want a transparent content optimization system they
            can inspect, run locally, customize, and extend.
          </p>
          <p className="opensource-credit">
            Developed and open-sourced by{" "}
            <a href={hassanUrl} rel="noreferrer" target="_blank">
              Hassan Raza
            </a>
            .
          </p>
        </div>

        <div className="opensource-card premium-card">
          <div className="opensource-code">
            <span>.env.local</span>
            <code>GEMINI_API_KEY=your_key_here</code>
          </div>
          <ul className="opensource-list">
            {openSourceCapabilities.map((item) => (
              <li key={item}>
                <span aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="home-section final-cta-section">
      <div className="final-cta-card">
        <p className="section-eyebrow">Build the package</p>
        <h2 className="final-cta-title">
          Ready to build a search-ready content package?
        </h2>
        <p className="final-cta-description">
          Start with a topic or paste an existing article. OmniSearch AI will
          turn your input into a structured content package built for search
          engines, answer engines, and AI discovery.
        </p>
        <div className="final-cta-actions">
          <PrimaryLink href="/new-blog">Start New Blog</PrimaryLink>
          <SecondaryLink href="/optimize-blog">Optimize Existing Blog</SecondaryLink>
          <GhostLink href={githubUrl}>GitHub</GhostLink>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="home-section faq-section" id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Common questions about OmniSearch AI"
        description="Answers to the questions creators, marketers, and developers ask before using an open-source SEO, AEO, GEO, and LLM optimization workflow."
      />

      <div className="faq-list">
        {homeFaqItems.map((item) => (
          <article className="faq-item" key={item.question}>
            <h3 className="faq-question">{item.question}</h3>
            <p className="faq-answer">{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <p className="site-footer-brand">OmniSearch AI</p>
          <p className="site-footer-copy">
            Open-source engine for SEO, AEO, GEO, and LLM content optimization.
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <p className="site-footer-heading">Product</p>
          <ul className="site-footer-links">
            <li>
              <Link href="/new-blog">Create New Blog</Link>
            </li>
            <li>
              <Link href="/optimize-blog">Optimize Existing Blog</Link>
            </li>
            <li>
              <Link href="/#faq">FAQ</Link>
            </li>
          </ul>
        </nav>

        <nav aria-label="Project links">
          <p className="site-footer-heading">Project</p>
          <ul className="site-footer-links">
            <li>
              <a href={githubUrl} rel="noreferrer" target="_blank">
                GitHub
              </a>
            </li>
            <li>
              <a href={hassanUrl} rel="noreferrer" target="_blank">
                Maintainer
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <p className="site-footer-meta">
        MIT License · Built and maintained by{" "}
        <a href={hassanUrl} rel="noreferrer" target="_blank">
          Hassan Raza
        </a>
      </p>
    </footer>
  );
}

function SectionHeader({
  children,
  description,
  eyebrow,
  title,
}: {
  children?: ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="section-header">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>
      {children}
    </div>
  );
}

function NavLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className="nav-link" href={href}>
      {children}
    </Link>
  );
}

function PrimaryLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className="btn btn-primary" href={href}>
      {children}
    </Link>
  );
}

function SecondaryLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <Link className="btn btn-secondary" href={href}>
      {children}
    </Link>
  );
}

function GhostLink({
  children,
  href,
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a className="btn btn-ghost" href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}
