# Contributing to OmniSearch AI

Thank you for your interest in contributing. This guide covers everything you
need to get started.

## Development Setup

```bash
git clone https://github.com/hassanrrraza/omnisearch-ai
cd omnisearch-ai
npm install
cp .env.example .env.local
# Add your GEMINI_API_KEY to .env.local
npm run dev
```

## Project Structure

The codebase is split into three clear layers:

**API layer** (`app/api/`) — Next.js route handlers. One file per endpoint.
Each route validates input with Zod, builds a prompt, calls Gemini, validates
output, and returns JSON.

**Prompt layer** (`lib/prompts/`) — Pure functions that build Gemini prompts.
Each function loads the three guide files and injects them alongside user
inputs. Adding a new content type means adding a new prompt builder file.

**UI layer** (`components/`) — React components. Forms use React Hook Form +
Zod. Output panels use tabs + react-markdown.

## How to Add a New Content Type

1. Add a Zod input schema in `lib/schemas/`
2. Add a Zod output schema in `lib/schemas/`
3. Add a prompt builder in `lib/prompts/`
4. Add an API route in `app/api/`
5. Add a form component in `components/`
6. Add an output component in `components/`
7. Add a page in `app/`

Follow the existing `generate-blog` / `optimize-blog` pattern exactly.

## How to Improve the Optimization Guides

The three files in `lib/guides/` are the engine's knowledge base. Improving
them improves every piece of content OmniSearch AI generates.

If you add a new rule, add it to the relevant guide with:

- A clear heading
- The rule stated directly
- A good and bad example where applicable

## Pull Request Guidelines

- One PR per feature or fix
- Run `npm run lint` and `npm run build` before submitting
- Describe what changed and why in the PR description
- PRs that break the build will not be merged

## Issue Labels

| Label | Meaning |
|---|---|
| `good first issue` | Small, well-scoped, great for new contributors |
| `enhancement` | New feature or improvement |
| `bug` | Something is broken |
| `guide-improvement` | Improvement to SEO/AEO/GEO guides |
| `prompt-engineering` | Improvement to Gemini prompts |
| `ui` | Frontend / component changes |

## Questions?

Open a [GitHub Discussion](https://github.com/hassanrrraza/omnisearch-ai/discussions)
instead of an issue.

Maintainer: [Hassan Raza](https://github.com/hassanrrraza) ·
[hassanr.com](https://hassanr.com/)
