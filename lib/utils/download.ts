export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function markdownToBasicHtml(markdown: string, title: string): string {
  const body = markdown
    .split(/\r?\n/)
    .map((line) => lineToHtml(line))
    .join("\n")
    .replace(/<\/ul>\n<ul>/g, "\n")
    .replace(/<\/ol>\n<ol>/g, "\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <style>
    body { font-family: -apple-system, sans-serif; max-width: 800px;
           margin: 40px auto; padding: 0 20px; line-height: 1.7;
           color: #1a1a1a; }
    h1, h2, h3 { line-height: 1.3; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 16px; border-radius: 6px;
          overflow-x: auto; }
    blockquote { border-left: 4px solid #d4d4d4; margin: 0;
                 padding-left: 16px; color: #555; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px 12px; text-align: left; }
    th { background: #f9f9f9; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

export function markdownToMdx(
  markdown: string,
  meta: {
    title: string;
    slug: string;
    seoTitle: string;
    metaDescription: string;
    targetKeyword: string;
    excerpt: string;
  }
): string {
  const frontmatter = `---
title: "${escapeYamlString(meta.title)}"
slug: "${escapeYamlString(meta.slug)}"
seoTitle: "${escapeYamlString(meta.seoTitle)}"
metaDescription: "${escapeYamlString(meta.metaDescription)}"
targetKeyword: "${escapeYamlString(meta.targetKeyword)}"
excerpt: "${escapeYamlString(meta.excerpt)}"
date: "${new Date().toISOString().split("T")[0]}"
---

`;

  return frontmatter + markdown;
}

function lineToHtml(line: string): string {
  const trimmed = line.trim();

  if (!trimmed) {
    return "";
  }

  if (trimmed.startsWith("### ")) {
    return `<h3>${inlineMarkdown(trimmed.slice(4))}</h3>`;
  }

  if (trimmed.startsWith("## ")) {
    return `<h2>${inlineMarkdown(trimmed.slice(3))}</h2>`;
  }

  if (trimmed.startsWith("# ")) {
    return `<h1>${inlineMarkdown(trimmed.slice(2))}</h1>`;
  }

  if (trimmed.startsWith("> ")) {
    return `<blockquote>${inlineMarkdown(trimmed.slice(2))}</blockquote>`;
  }

  if (/^\d+\.\s+/.test(trimmed)) {
    return `<ol><li>${inlineMarkdown(trimmed.replace(/^\d+\.\s+/, ""))}</li></ol>`;
  }

  if (/^[-*]\s+/.test(trimmed)) {
    return `<ul><li>${inlineMarkdown(trimmed.replace(/^[-*]\s+/, ""))}</li></ul>`;
  }

  return `<p>${inlineMarkdown(trimmed)}</p>`;
}

function inlineMarkdown(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>");
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeYamlString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}
