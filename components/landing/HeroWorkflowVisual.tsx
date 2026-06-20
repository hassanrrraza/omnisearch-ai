import type { CSSProperties } from "react";

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

export function HeroWorkflowVisual() {
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
