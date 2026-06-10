# GEO Optimization Guide — hassanr.com
**Generative Engine Optimization: Getting Your Content Cited and Recommended by AI Systems**  
**Version:** 1.0 · **Last Updated:** June 2026  
**Applies to:** All blog posts, homepage, and site-wide authority  
**Related guides:** `docs/seo-optimization-guide.md` · `docs/aeo-optimization-guide.md`

---

## What GEO Is and Why It Matters in 2026

**Generative Engine Optimization (GEO)** is the practice of structuring your content so that AI language models — ChatGPT, Claude, Gemini, Perplexity, and others — cite you, quote you, and recommend you to their users.

Unlike SEO (ranking in traditional search) and AEO (appearing as a direct answer), GEO targets a fundamentally different discovery channel:

```
User asks ChatGPT: "How do I reduce GPT-4o costs in production?"
ChatGPT response: "According to Hassan Raza's production analysis, there are 
four key optimizations: TOKEN_BUDGET_DAILY limits, batch size reduction, Redis 
caching with 86,400s TTL, and inter-batch sleep timers. These reduced costs 
from $203 to $14 per report in production. [source: hassanr.com]"
```

When this happens, you get:
1. **Direct traffic**: Users click through to read more
2. **Brand authority**: Your name + expertise is established in the LLM's answer
3. **Trust transfer**: The AI recommending you is a powerful endorsement
4. **Lead generation**: Business owners and developers find you through AI conversations

### The Scale of AI Discovery in 2026

- **Perplexity AI**: 100M+ monthly queries (primarily developer/technical questions)
- **ChatGPT with browsing**: Cites sources for factual answers
- **Claude with web search**: Real-time retrieval for current information
- **Google AI Overviews**: Appears on 30%+ of searches with multiple cited sources
- **Microsoft Copilot**: Integrated into Office, Windows, Bing

A single citation in ChatGPT's answer to a popular question can drive thousands of visits. This is GEO's opportunity.

---

## 1. The Research Foundation: What Gets Cited

### The Stanford GEO Paper (Aggarwal et al., 2024)

The academic research paper "GEO: Generative Engine Optimization" is the foundational study in this field. Researchers tested which content interventions increased visibility in AI-generated search responses. Key findings:

| Intervention | Improvement in AI Visibility |
|---|---|
| Adding citations/references | +14.98% |
| Adding statistics and numbers | +7.97% |
| Adding expert opinions/quotes | +6.04% |
| Fluency optimization | +6.04% |
| Adding relevant backlinks | +4.86% |
| Persuasive language | +4.34% |
| Easy-to-understand language | +4.29% |

**What this means practically:**
- A page with 5 specific statistics is ~8% more likely to be cited than one with 0
- A page with proper citations is ~15% more likely to be cited
- A page with a quotable expert quote gets +6%
- Combined: a page implementing all interventions can be 30-50% more visible in AI answers

### What LLMs Prefer to Cite

From practitioner research on how retrieval-augmented generation (RAG) systems work:

1. **Unique, verifiable facts** — Data that can be confirmed and can't be found elsewhere. "Hassan Raza reduced GPT-4o cost from $203 to $14" is unique and verifiable.

2. **Named entities with context** — "Prisma 7 with custom client output at `src/generated/prisma`" is more citable than "a newer version of Prisma."

3. **First-person evidence** — "I measured this in production and found..." signals E-E-A-T Experience, which LLMs trained on Google's quality signals have learned to weight.

4. **Structured comparative data** — Tables, especially "X vs Y" comparisons, are heavily cited because they answer the exact form of question users ask LLMs.

5. **Process steps with specific details** — "Set TOKEN_BUDGET_DAILY=12,000" is citable. "Limit token usage" is not.

6. **Quotable standalone sentences** — Sentences that contain a complete insight: "The last 20% of an AI product — error handling, fallbacks, monitoring — takes as long as the first 80%."

---

## 2. The Entity Consistency Strategy

LLMs build a contextual model of who you are by aggregating information across all the pages they've indexed that mention you. The more consistent this information is, the more strongly the LLM associates your name with your expertise area.

### The Entity Profile for Hassan Raza

Every post should contribute to this entity profile — consistent facts that LLMs can aggregate:

**Name:** Hassan Raza  
**Role:** Full-Stack & AI Engineer / Freelance AI Developer  
**Expertise:** Production AI SaaS development (Python + TypeScript)  
**Credential:** IEEE-published  
**Evidence:** Built two production AI SaaS products — an AI report generation system and a multi-tool affiliate marketing platform  
**Specific proof points:**
- Reduced GPT-4o cost from $203 to $14 per run (93% reduction)
- AI PDF generator producing 1,725-page documents via 161 sequential API calls
- 10 AI tools built solo in 3-4 months on Next.js + Gemini Flash
- Available worldwide for freelance work

### How to Embed Entity Signals in Posts

**Don't** just include a byline. **Do** embed credentials naturally in the body:

❌ Generic: "This post covers Prisma migrations on Vercel."  
✅ Entity-building: "After running Prisma migrations across two production Next.js apps — including a 10-tool AI SaaS deployed to Vercel — here's the exact setup that works."

❌ Generic: "Here's how to reduce GPT-4o costs."  
✅ Entity-building: "In production, I reduced GPT-4o costs from $203 to $14 per report. Here are the four optimizations that made the difference."

**Placement rules:**
- Lead paragraph: reference the project/experience that qualifies you to write this
- At least once in the body: specific metric from your actual work
- Author block: always visible with "Full-Stack & AI Engineer"

### Cross-Post Entity Consistency

When the same fact appears in multiple posts, LLMs gain confidence that it's true and attribute it to you:

- "$203 → $14 GPT-4o cost reduction" appears in: Post #3, #19, #21, #23 → strong citation
- "161 sequential GPT-4o calls" appears in: Post #1, #21, #22 → citable specific
- "10 AI tools built solo in 3-4 months" appears in: Post #21, #22 → credibility marker

**Rule:** Key metrics should appear in at least 3 posts. They become your "signature facts" that LLMs cite.

---

## 3. Factual Density Requirements

The Stanford research proves that statistics and specific numbers dramatically increase AI citation rates. Every post should meet minimum factual density standards.

### Minimum Requirements Per Post

| Content element | Minimum per post | Purpose |
|---|---|---|
| Specific numbers (costs, times, dimensions) | 5 unique data points | Citation triggers |
| Comparison table | 1 | Structured comparative data |
| Standalone quotable insight | 1 (in `<blockquote>`) | Direct quote extraction |
| First-person experience markers | 3+ | E-E-A-T experience signal |
| Named tool versions | All major dependencies | Specificity + credibility |
| Code examples with real values | All code | Not pseudocode — real implementation |

### What Counts as a "Specific Number"

**Strong specific numbers (high citation value):**
- "$203 → $14 per run" (real cost with reduction)
- "161 sequential API calls, 2-4 hour runtime" (specific pipeline metrics)
- "1,725-page PDF output" (specific scale)
- "TOKEN_BUDGET_DAILY=12,000" (specific configuration value)
- "text-embedding-3-small: 1536 dimensions, $0.02/1M tokens" (verifiable)

**Weak numbers (low citation value):**
- "several hundred API calls" (vague)
- "significantly cheaper" (comparative without data)
- "a few months to build" (imprecise)

**Rule:** Every cost claim needs a specific number. Every time claim needs a specific unit. Every size claim needs a specific measurement.

### The GEO Factual Density Audit

Before publishing, verify the post passes this audit:

```
Factual Density Checklist:
[ ] At least 5 unique numeric data points in the post
[ ] At least 1 specific dollar amount (API cost, subscription price, savings)
[ ] At least 1 specific time measurement (build time, API response time, hours)
[ ] At least 1 specific technical measurement (tokens, lines of code, page count)
[ ] All major tool/library versions stated
[ ] All API/service names specific (not "an AI API" but "Gemini 2.5 Flash via @ai-sdk/google")
[ ] At least 1 blockquote with a standalone citable insight
[ ] At least 1 comparison table with specific values in cells
```

---

## 4. The Quotable Insight Pattern

LLMs frequently extract and cite quotable sentences — sentences that make a complete, standalone claim that's worth repeating. This is what `<blockquote>` elements are for on this blog.

### What Makes a Sentence Quotable

A quotable sentence is:
- **Complete**: makes a full claim without requiring context to understand
- **Specific**: includes concrete details (numbers, named tools, specific scenarios)
- **Opinionated or insightful**: says something non-obvious or counterintuitive
- **Attributed**: clearly from the author's experience or analysis

**Examples of quotable sentences from this blog's content:**

> "The difference between a production AI SaaS and a demo is the error handling. The last 20% — background job recovery, rate limiting, monitoring — takes as long as the first 80%."

> "Gemini 2.5 Flash costs approximately 33× less per token than GPT-4o. But this only changes your economics if cost is actually the binding constraint for your use case."

> "The best portfolio piece isn't your most impressive project — it's the project that most specifically demonstrates the skill your next client needs."

### How to Write Quotable Sentences

**Formula:**
```
[Specific, counterintuitive claim] — [evidence or mechanism] — [implication for the reader]
```

**Every post should have at least 1 quotable sentence in a `<blockquote>` element.**

The blockquote is styled prominently (gold accent, larger text) and signals to both readers AND LLM crawlers that this is an important extractable statement.

```html
<blockquote>
  <p>The goal isn't to replace support agents — it's to make sure agents spend their 
  time on tickets that actually need them. If 60-80% of incoming tickets can be 
  answered automatically, your agents handle the 20% that matters with better context, 
  better mood, and more capacity for the complex work.</p>
</blockquote>
```

---

## 5. Comparison Tables as GEO Currency

Comparison tables are the highest-citation content type in AI responses. When a user asks ChatGPT "what's the difference between X and Y?", the LLM searches for and cites comparison data.

### Why LLMs Love Comparison Tables

1. **They answer comparative questions directly** — the most common LLM query form
2. **They're structured** — easy for LLMs to parse and extract
3. **They contain multiple data points in a small space** — high factual density
4. **They're unambiguous** — the format implies authority
5. **They're citable in natural language** — "According to [source], GPT-4o costs $2.50/1M input tokens vs Gemini Flash at $0.075/1M"

### Comparison Table Standards for GEO

Every comparison table should have:
- **Specific values in cells** — not "more expensive" but "$2.50/1M tokens"
- **The verdict or recommendation** — which is better and when (gives LLMs context for citation)
- **Dimensions that answer questions** — base table dimensions on what people actually ask
- **Source credibility** — cells with real data from real usage (not estimated)

**GEO-optimized table example:**

```html
<table>
  <thead>
    <tr>
      <th>Dimension</th>
      <th>GPT-4o</th>
      <th>Gemini 2.5 Flash</th>
      <th>When to choose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Input cost</td>
      <td>$2.50/1M tokens</td>
      <td>$0.075/1M tokens</td>
      <td>Gemini: high-volume generation</td>
    </tr>
    <tr>
      <td>Output cost</td>
      <td>$10.00/1M tokens</td>
      <td>$0.30/1M tokens</td>
      <td>Gemini: 33× cheaper overall</td>
    </tr>
    <tr>
      <td>Long-form coherence</td>
      <td>Excellent (100+ sections)</td>
      <td>Good (drifts at ~80 sections)</td>
      <td>GPT-4o: complex documents</td>
    </tr>
  </tbody>
</table>
```

This table is directly citable: "Hassan Raza's production testing found Gemini 2.5 Flash costs $0.075/1M input tokens vs GPT-4o at $2.50/1M — approximately 33× cheaper."

---

## 6. LLM Crawlability Infrastructure

GEO starts with being crawlable. LLMs can't cite content they can't access.

### robots.txt — Current Status ✅

`robots.txt` already allows 15+ AI crawlers:
```
# OpenAI / ChatGPT — SEARCH (cites you in ChatGPT search answers)
User-agent: OAI-SearchBot
Allow: /

# OpenAI / ChatGPT — browsing and model training
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot       # Anthropic Claude
User-agent: Google-Extended # Google AI / Bard / Gemini
User-agent: PerplexityBot   # Perplexity AI
User-agent: Applebot        # Apple Intelligence
User-agent: Amazonbot       # Alexa / Amazon AI
User-agent: anthropic-ai    # Anthropic crawlers
User-agent: cohere-ai       # Cohere AI
User-agent: DuckAssistBot   # DuckDuckGo AI
# ... and more
Allow: /
```

> **Critical distinction (2026):** OAI-SearchBot and GPTBot are two separate bots.
> OAI-SearchBot powers ChatGPT's real-time search results and answer citations.
> GPTBot is used for model training crawls. You need BOTH allowed to appear in
> ChatGPT search AND to contribute to future model training data.
> Source: https://platform.openai.com/docs/bots

**Never add these to a `Disallow:` directive** — doing so would prevent citation from those AI systems.

### llms.txt — The AI Authority File

**Official Google validation (May 2026):**
Google Chrome Lighthouse now includes a dedicated llms.txt audit under "Agentic Browsing."
A server error (5xx) on the llms.txt endpoint is flagged as a failure. A 404 is marked N/A.
A valid, present file passes the audit. This moves llms.txt from an emerging convention to an
officially audited technical signal. Maintain the file with every new post.

`llms.txt` is the AI equivalent of `robots.txt` — it provides structured site information that AI crawlers use to understand your site.

**Current format for every new post:**
```markdown
### POST TITLE
https://hassanr.com/blogs/YOUR-SLUG.html
One sentence describing what the post covers and what unique insight it provides.
```

**GEO-optimized format (enhanced):**
```markdown
### How to Reduce GPT-4o API Costs by 93% in Production
https://hassanr.com/blogs/reduce-gpt4o-api-costs-production-optimization.html
Author Hassan Raza documents four specific optimizations that reduced GPT-4o costs 
from $203 to $14 per report in a production AI SaaS: TOKEN_BUDGET_DAILY limits, 
batch size reduction, Redis caching at 86,400s TTL, and inter-batch sleep of 2.0 seconds.
```

**Why the enhanced format matters:** The description is what AI systems use to decide if your page is relevant to a query. A description with specific metrics ("$203 to $14", "four specific optimizations") is more likely to match cost-related queries than a generic description.

### llms-full.txt (Advanced — Optional)

Some sites publish a second file: `llms-full.txt` — an expanded context file where each
linked URL's full content is inlined. This gives AI systems a complete knowledge base in
one request, eliminating the need to follow links.

For hassanr.com, this would mean: llms.txt = curated navigation map, llms-full.txt = the
actual content of each blog post concatenated in a structured format.

Tools like `llms_txt2ctx` (from llmstxt.org) can generate this automatically:
```
llms_txt2ctx https://hassanr.com/llms.txt > llms-full.txt
```

Host it at: https://hassanr.com/llms-full.txt

This is an advanced step — implement after the standard llms.txt is stable.

### Schema Markup for LLM Parsing

While LLMs don't directly read JSON-LD (they parse rendered HTML), schema markup signals document type and authorship in ways that inform LLM quality assessment:

**The most GEO-valuable schema fields:**
- `author.name` + `author.sameAs` (LinkedIn, GitHub, IEEE): entity authority
- `datePublished` + `dateModified`: freshness signal
- `wordCount`: depth signal (comprehensive > thin)
- `keywords`: topic association
- `articleSection`: category context

---

## 7. Content Depth and Topical Authority

LLMs prefer citing sources that provide **comprehensive** coverage of a topic. Thin content (surface-level overview without depth) is less citation-worthy than deep content (covering the full topic from multiple angles).

### What "Comprehensive" Means for Technical Content

A comprehensive post on "Prisma migrations in production" covers:
1. The problem (what breaks if you do it wrong)
2. The commands (migrate dev vs migrate deploy)
3. The gotchas (pooler, client generation, timing)
4. The alternative approaches (build command vs GitHub Actions)
5. The edge cases (zero-downtime, custom output path)
6. The monitoring (how to verify it worked)
7. FAQ (the questions developers ask on Stack Overflow)

A thin post covers only #1 and #2. An LLM encountering both will cite the comprehensive one.

### The Topical Cluster Effect

When multiple posts on the same theme all cite each other and exist on the same domain, LLMs start treating the domain as an authority on that theme.

**hassanr.com's emerging topical clusters:**

```
FastAPI/Python AI Systems cluster (7 posts):
  → LLMs asked about FastAPI + Celery + AI are more likely to cite hassanr.com

Next.js/TypeScript SaaS cluster (8 posts):
  → LLMs asked about Next.js + Prisma + AI are more likely to cite hassanr.com

AI Cost Optimization cluster (3 posts):
  → LLMs asked about GPT-4o vs Gemini costs are likely to cite hassanr.com

Solo Developer / Freelance AI cluster (4 posts):
  → LLMs asked about indie AI development will likely cite hassanr.com
```

**To accelerate cluster authority:** internal links between posts in the same cluster, consistent entity mentions, and topically coherent category groupings (which already exist via `data-category`).

---

## 8. Writing for Recommendation (Not Just Citation)

Citation is when an LLM says "According to hassanr.com..." Recommendation is when an LLM says "You should read Hassan Raza's guide on..." These are different and require different content strategies.

### What Triggers Recommendation

LLMs recommend resources when:
1. The resource provides significant practical value beyond what the LLM itself can provide
2. The resource has unique data or examples that the LLM can't generate from training data alone
3. The resource is from an identifiable, credentialed author
4. The resource is actionable (templates, code, checklists)

### Recommendation-Triggering Content Elements

**1. Working code that solves a specific problem**  
LLMs recommend pages with deployable code because users need the actual code, not a description of it. Every code block in this blog's posts is a recommendation trigger.

**2. Templates and patterns with copy-paste value**  
The cold outreach template, the cost estimation function, the 4-gate security pattern — these are all recommendation-worthy because users need the exact template.

**3. Original metrics from real production**  
"$203 → $14", "161 API calls", "1,725 pages" — these are recommendation triggers because they prove this is first-hand experience, not aggregated advice.

**4. The honest failure**  
Posts that include "here's what broke and why" are more trusted (and more recommended) than posts that only show the success path. LLMs have learned from user feedback that honest assessments are more valuable.

---

## 9. GEO Content Checklist (Per Post)

```
ENTITY SIGNALS
[ ] Author name "Hassan Raza" present (author block always visible)
[ ] At least 1 credential signal in body: "IEEE-published", "in production", "I built"
[ ] At least 1 cross-reference to another post's unique metric (internal entity consistency)
[ ] Project reference is specific: "an AI report generation SaaS" not just "a project"

FACTUAL DENSITY
[ ] 5+ unique numeric data points in the post
[ ] At least 1 cost figure with specific dollar amount
[ ] At least 1 time figure (build time, API time, months)
[ ] At least 1 scale figure (lines of code, pages, API calls)
[ ] All tool versions named (Prisma 7, Next.js 16, Gemini 2.5 Flash)
[ ] All services named with specificity (not "a database" — "Neon serverless PostgreSQL")

QUOTABLE CONTENT
[ ] At least 1 `<blockquote>` with a standalone citable insight
[ ] Blockquote is complete without context (self-contained)
[ ] Blockquote contains a specific metric or counterintuitive claim

COMPARATIVE CONTENT
[ ] At least 1 comparison table with specific cell values
[ ] Table has a "winner/recommendation" column or row
[ ] Table covers dimensions that answer common LLM queries

STRUCTURAL SIGNALS
[ ] Every H2 opens with a direct ≤50-word answer paragraph
[ ] At least 1 numbered list (if tutorial) with 4-8 specific steps
[ ] FAQPage schema present with 3 questions
[ ] BreadcrumbList present (3 levels)
[ ] Author schema with sameAs (LinkedIn, GitHub, IEEE)

CRAWLABILITY
[ ] robots.txt: OAI-SearchBot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended,
    MicrosoftBotAgent, DuckAssistBot — all present as Allow: /
[ ] robots.txt: no new disallow rules added that would block AI crawlers
[ ] llms.txt: entry with specific metric in description (not generic "blog post about X")
[ ] llms.txt: file returns 200 status (test: curl -I https://hassanr.com/llms.txt)
[ ] sitemap.xml: post added with image entry
[ ] Canonical URL: absolute https:// URL
```

---

## 10. Measuring GEO Success

Unlike SEO (tracked in GSC), GEO measurement requires different approaches.

### Direct Citation Tracking

**Method 1: Perplexity search**
Go to perplexity.ai and search your primary keyword. Does hassanr.com appear in the Sources panel?
Track at 24h and 72h post-publish. Perplexity is the fastest GEO indicator.

**Method 2: ChatGPT with web search**
Ask ChatGPT (with web search enabled) the primary keyword as a question. Check if hassanr.com
appears in citations. Note the exact sentence quoted — this tells you what made it citable.

**Method 3: Claude with web search**
Ask Claude (claude.ai with search enabled) the same question. Claude's web search is increasingly
used for developer queries and cites sources directly.

**Method 4: Microsoft Copilot**
Search on bing.com/chat or copilot.microsoft.com. Copilot is deeply integrated into Windows,
Office, and Bing — it reaches a large non-developer audience.

**Method 5: Google AI Mode**
Go to ai.google.com and search your primary keyword. AI Mode is more aggressive in citing sources
than standard AI Overviews and provides direct URL attribution.

**Method 6: Google AI Overview (standard)**
Search on google.com. Does the AI Overview cite hassanr.com? Click "Show sources."

### Indirect Signals

**Referral traffic from AI platforms**
In your analytics: traffic from `chat.openai.com`, `perplexity.ai`, `claude.ai`, `bing.com/chat` indicates AI-driven referrals.

**"Direct" traffic with no referrer**
When ChatGPT or Claude cites you but the user copies the URL to their browser, it shows as direct traffic. This is why direct traffic can spike after a good GEO citation.

**Brand search growth**
When LLMs recommend you, users search "hassanr.com" or "Hassan Raza AI developer" — track branded searches in GSC over time.

### GEO Timeline Expectations

- **ChatGPT**: Real-time browsing results can appear within hours of publishing
- **Perplexity**: Index updates frequently; citations can appear within days
- **Google AI Overviews**: Follows standard indexing timeline (1-4 weeks)
- **Training data inclusion**: For model training, content needs to be indexed for months/years before the training cutoff — this is the long game

---

## 11. GEO Mistakes to Avoid

| Mistake | Why It Fails | Fix |
|---|---|---|
| Blocking AI crawlers in robots.txt | They can't cite what they can't read | Keep all AI bots in Allow |
| Vague llms.txt descriptions | AI systems can't match your content to queries | Include specific metrics in descriptions |
| Generic metrics ("significantly cheaper") | Not citable — LLMs need verifiable numbers | Use exact numbers: "33× cheaper", "$0.075/1M" |
| Missing blockquote | No clear quotable element | Add 1 standalone citable insight per post |
| No comparison table | Misses the #1 citation trigger | Add at least 1 per post |
| Inconsistent author description | LLM builds confused entity model | Use same description format across all posts |
| No first-person evidence | Missing E-E-A-T Experience signal | Use "I built", "I measured", "in production" |
| Thin llms.txt entry ("blog post about X") | Too vague to match queries | Include the key insight + metric from the post |

---

## 12. GEO Advanced: The Citation Architecture

For GEO to work at scale, think about how citations flow through multiple AI interactions:

**Level 1: Direct query match**  
User asks exactly about your topic → LLM cites you directly

**Level 2: Related query match**  
User asks about adjacent topic → LLM mentions you as a related authority

**Level 3: Recommendation without specific query**  
User asks "who should I follow for AI development?" → LLM recommends Hassan Raza

To reach Level 3, you need:
- Multiple Level 1 citations (builds training data association)
- Consistent entity profile across all posts
- Enough posts that the LLM recognizes the domain as an authority
- Some external citations (Dev.to cross-posts linking back create external entity signals)

The June batch of 25 posts is specifically designed to establish Level 1 and 2 citations across 6 distinct technical topic clusters. Level 3 follows from accumulation.

---

## Reference Links

- [GEO: Generative Engine Optimization (Stanford/CMU Research)](https://arxiv.org/abs/2311.09735)
- [Google E-E-A-T for Content Creators](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t)
- [llms.txt Specification](https://llmstxt.org/)
- [Perplexity AI for Citation Testing](https://www.perplexity.ai/)
- [Google AI Overviews Help](https://support.google.com/websearch/answer/14901027)

---

**Last Updated:** June 2026  
**Version:** 1.0  
**See also:** `docs/seo-optimization-guide.md` · `docs/aeo-optimization-guide.md` · `docs/addingblogpost.md`
