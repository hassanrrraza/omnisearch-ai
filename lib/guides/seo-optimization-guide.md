# SEO Optimization Guide — hassanr.com
**Version:** 1.0 · **Last Updated:** June 2026  
**Applies to:** All blog posts under `blogs/` and the homepage  
**Related guides:** `docs/aeo-optimization-guide.md` · `docs/geo-optimization-guide.md`

---

## What This Guide Covers

Traditional Search Engine Optimization: making your pages discoverable, rankable, and clickable in Google, Bing, and other web search engines. SEO is the foundation — AEO and GEO build on top of it. A page that can't rank can't be cited.

This guide covers the complete SEO stack as applied to a **static HTML engineering blog** with technical AI/SaaS content targeting developers and founders.

---

## 1. Keyword Strategy for Technical Content

### The Three Keyword Tiers

**Tier 1 — Primary (one per post)**
The single keyword the post is built around. Appears in title, H1, first paragraph, meta description, URL slug, and canonical. Example: `Prisma migrations production Next.js Vercel deployment guide`

**Tier 2 — Secondary (3-6 per post)**
Supporting keywords that address related queries. Appear naturally in H2 headings, body paragraphs, and the JSON-LD `keywords` field. Example: `prisma migrate deploy Vercel`, `postinstall prisma generate Next.js`

**Tier 3 — Long-tail (10-20 per post)**
Specific phrases readers might search. Not explicitly targeted — they emerge from thorough content coverage. Example: `prisma migration fails in CI with connection pooler`

### Keyword Research Process for AI/Technical Posts

**Step 1: Seed the intent**  
Start with the problem a developer would Google when stuck: "prisma migrate vercel production"

**Step 2: Check PAA boxes**  
Google the seed keyword. Record every "People Also Ask" question. These become FAQ questions (required by the template) AND secondary keywords to address in the body.

**Step 3: Check search volume + competition**  
Use Google Search Console data from existing posts to calibrate. For new topics: Keyword Planner, Ahrefs (free tier), or just search volume estimates. The June batch targets: 5,000–18,000 searches/month, low competition.

**Step 4: Confirm informational intent**  
Technical tutorials must match **informational intent** (the person wants to learn how, not buy something). Mismatch kills rankings regardless of optimization quality.

**Step 5: Identify featured snippet opportunity**  
If the search returns a featured snippet from a generic source, you can displace it with a more specific, technical answer. These are the highest-value targets.

### Keyword Placement Rules

| Location | Requirement | Notes |
|---|---|---|
| `<title>` tag | Primary keyword in first 60 chars | Format: `Keyword — Hassan Raza` |
| `<h1>` | Primary keyword present | Can be longer — this is the visible title |
| First paragraph | Primary keyword in first 100 words | Natural inclusion, not forced |
| Meta description | Primary keyword once | 150-160 chars total |
| URL slug | 3-6 keyword words, hyphens | `prisma-migrations-production-nextjs-vercel` |
| At least one H2 | Primary keyword exact match or variant | For section targeting |
| JSON-LD `keywords` | All secondary keywords as comma string | Machine-readable, not visible |
| Image `alt` | Descriptive with keywords | For image search + accessibility |

### What NOT to Do

- **Keyword stuffing**: Never repeat the primary keyword more than naturally needed. Google's algorithms detect unnatural keyword density and penalize it.
- **Targeting multiple primaries**: One post, one primary keyword. Multiple primaries split focus and confuse the search intent signal.
- **Ignoring search intent**: A post titled "Why I Use Gemini Flash" has no search intent match. "GPT-4o vs Gemini Flash Cost Comparison" does.
- **Chasing volume over specificity**: 1,000 searches/month with high conversion beats 50,000 with zero relevance.

---

## 2. On-Page SEO: Every Element That Matters

### Title Tag

**Formula:** `[Primary Keyword] [Differentiator/Year] — Hassan Raza`

```html
<title>Prisma Migrations Production Next.js Vercel Deployment Guide — Hassan Raza</title>
```

**Rules:**
- Total length: ≤65 characters (Google truncates at ~65 in search results)
- Primary keyword: first 50 characters when possible
- Year: include for content where freshness matters (tutorials, comparisons)
- Never: click-bait titles, all-caps, excessive punctuation

**High-performing title patterns for this blog:**
- How to [Achieve X] with [Tech Stack] (Tutorial intent)
- [X] vs [Y]: Real [Metric] Comparison for [Use Case] (Comparison intent)
- Why I [Did X]: [Specific Lesson] (Personal insight intent)
- [Number] [Thing] That [Outcome] (List intent)

### Meta Description

**Formula:** [Primary outcome in ≤30 words]. [Secondary benefit]. [Specific differentiator with a number].

```html
<meta name="description" content="Prisma migrations on Vercel break in 3 specific ways. 
Here's the fix: postinstall generate, directUrl for poolers, and the build command 
pattern that won't time out.">
```

**Rules:**
- 150-160 characters total
- Include primary keyword naturally
- Write for the human reader, not for Google — Google shows this text in search results
- Include a specific number or differentiator ("3 specific ways", "$14 per run")
- Must be unique per post — no duplicate meta descriptions

### URL Slugs

**Formula:** `[primary-keyword-words]-[year-if-relevant].html`

```
prisma-migrations-production-nextjs-vercel.html     ✅
how-to-run-prisma-migrations-on-vercel-2026.html    ✅ (with year)
prisma.html                                          ❌ (too vague)
prisma-migrations-in-production-on-vercel-using-next-js.html  ❌ (too long)
```

**Rules:**
- Maximum 70 characters total
- Only lowercase letters, numbers, hyphens — no underscores, no special chars
- Remove stop words (a, the, in, on, with) unless keyword-critical
- **Never change a slug after publishing** — redirects are impossible on this static setup
- The slug is permanent; choose carefully before the first publish

### Header Hierarchy

**The SEO-correct structure for every post:**

```
<h1> — Post title (ONE per page, in the header, matches title tag's primary keyword)
  <h2 id="section-one"> — Major topic section
    <h3 id="subsection"> — Supporting detail
    <h3 id="another-subsection"> — Supporting detail
  <h2 id="section-two"> — Major topic section
    <h3 id="sub"> — Supporting detail
  <h2 id="faq"> — FAQ section (required)
```

**H2 writing formula for SEO + AEO:**
Each H2 should be a **direct statement** (not a question) that includes a secondary keyword:

```
✅  "Why Prompt-Only JSON Output Breaks in Production"
✅  "The tool_use Pattern: How to Force Structured Output From Claude"
❌  "Some Thoughts on Structured Output"
❌  "Part 3: The Technical Implementation"
```

**Why:** Google uses H2s to understand the topics a page covers. Each H2 is an opportunity to target a secondary keyword and serve as a standalone featured snippet.

### Internal Linking Strategy

**Why it matters:** Internal links pass "link equity" (ranking power) between pages and help Google understand your topic cluster. A well-linked cluster of posts on "FastAPI + AI" ranks better than isolated posts on the same topics.

**The topic cluster model for hassanr.com:**

```
Cluster: FastAPI/Python AI Systems
  Core: "FastAPI Celery Redis AI Jobs Production" (post #1)
  Supporting: "Async AI Pipeline Python" (post #5)
  Supporting: "Deploy FastAPI Celery Render" (post #8)
  Supporting: "WeasyPrint PDF Python" (post #2)
  All support each other + link back to core

Cluster: Next.js/TypeScript AI Development
  Core: "Multi-tenant Prisma PostgreSQL" (post #9)  
  Supporting: "Command Palette shadcn/ui" (post #10)
  Supporting: "Dark Mode Next.js" (post #11)
  Supporting: "Prisma Migrations Vercel" (post #20)
```

**Rules for internal links:**
- Every new post should link to at least 2 existing posts in the same cluster
- Every new post should receive a link from at least 1 existing post (update after publishing)
- Use descriptive anchor text: "the Celery task reliability patterns" not "click here"
- Link in context — only when the linked post provides genuine additional value

**HTML pattern:**
```html
<p>The same 4-gate security pattern used in 
<a href="multi-tenant-prisma-postgresql-nextjs.html">the multi-tenant architecture</a> 
applies directly here.</p>
```

---

## 3. Technical SEO for Static HTML

### Schema Markup (What We Use and Why)

All posts use `@graph` schema containing three types:

**1. BlogPosting** — tells Google this is a blog article with an author and date
- `datePublished` + `dateModified`: signals freshness
- `wordCount`: calibrates reading time estimates
- `author` with `@id`: links to the Person entity on the homepage
- `image`: enables rich preview in search results

**2. FAQPage** — enables rich results in SERPs (2× the real estate)
- Questions must match HTML text exactly (Google cross-checks)
- 3 questions minimum, drawn from real PAA research
- This is the primary AEO signal — see `docs/aeo-optimization-guide.md`

**3. BreadcrumbList** — shows Home > Blog > Post Title in search results
- Improves click-through rate by showing page context
- Required for FAQPage to appear alongside BreadcrumbList in rich results

**Additional schema to consider for specific post types:**

For tutorial/how-to posts (any post with numbered steps):
```json
{
  "@type": "HowTo",
  "name": "How to Set Up Prisma Migrations on Vercel",
  "step": [
    {"@type": "HowToStep", "name": "Add postinstall script", "text": "..."},
    {"@type": "HowToStep", "name": "Configure directUrl", "text": "..."}
  ]
}
```
Add this as a 4th item in the `@graph` array. Do not replace existing schema types.

### Sitemap Best Practices

> ⚠️ **2026:** Google explicitly ignores `<changefreq>` and `<priority>`. Keep `<lastmod>` accurate
> — this is the only field Google reads from the sitemap. Other search engines (Bing, Yandex) may
> still use `<changefreq>`, so including it is harmless, but never spend time tuning priority values.

```xml
<!-- Priority hierarchy — enforce consistently -->
<url>
  <loc>https://hassanr.com/</loc>
  <priority>1.0</priority>          <!-- Homepage -->
  <changefreq>weekly</changefreq>
</url>
<url>
  <loc>https://hassanr.com/blogs/</loc>
  <priority>0.9</priority>          <!-- Blog index -->
  <changefreq>weekly</changefreq>
</url>
<url>
  <loc>https://hassanr.com/blogs/your-post.html</loc>
  <priority>0.8</priority>          <!-- All blog posts — uniform priority -->
  <changefreq>monthly</changefreq>
  <lastmod>YYYY-MM-DD</lastmod>
  <image:image>                     <!-- Required for Google Image Search -->
    <image:loc>https://hassanr.com/assets/images/blog/blog-slug.webp</image:loc>
    <image:title>Post Title</image:title>
  </image:image>
</url>
```

> **Note:** These priority values are for organizational clarity only. Google ignores them.
> The only value that affects Google's crawl behavior is `<lastmod>`.

**Sitemap maintenance:**
- Bump `<lastmod>` on the `blogs/` index entry whenever a new post is published
- Update a post's `<lastmod>` if you substantially revise it (not minor edits)
- Submit sitemap in Google Search Console after publishing: GSC → Sitemaps → Submit

### Core Web Vitals for Static HTML

Static HTML has a massive CWV advantage over JavaScript-heavy frameworks. These are the targets:

| Metric | Target | hassanr.com Status | Notes |
|---|---|---|---|
| LCP (Largest Contentful Paint) | < 2.5s | ✅ Static HTML loads fast | |
| INP (Interaction to Next Paint) | < 200ms | ✅ Minimal JS | INP replaced FID as a Core Web Vital in March 2024. FID is no longer tracked. |
| CLS (Cumulative Layout Shift) | < 0.1 | ✅ Defined image dimensions | |

**To maintain CWV:**
- Always include `width` and `height` on `<img>` elements (prevents CLS)
- Use `loading="lazy"` on all images except the featured image (which uses `loading="eager"`)
- Load Highlight.js from CDN (already done) — don't bundle it inline
- `<link rel="preconnect">` for Google Fonts (already in template)

**Image optimization for SEO:**
- Format: WebP (already used ✅) — 25-35% smaller than JPEG at same quality
- Featured image: 1200×630px exactly (for OG image + blog featured)
- Alt text: descriptive + keyword, 5-15 words: `alt="Prisma migrations setup on Vercel showing postinstall script and directUrl configuration"`
- File name: `blog-[slug].webp` — the filename is an indexing signal

### robots.txt Status

Current `robots.txt` already allows 15+ AI crawlers — this is critical for GEO (see `docs/geo-optimization-guide.md`). Maintain this. Never add `Disallow: /blogs/` or blanket disallows.

```
User-agent: GPTBot         # ChatGPT
User-agent: ClaudeBot      # Claude
User-agent: Google-Extended # Google AI
User-agent: PerplexityBot  # Perplexity
User-agent: Applebot       # Apple Intelligence
# ... (15+ bots currently whitelisted)
Sitemap: https://hassanr.com/sitemap.xml
```

### llms.txt — Agentic Browsing Signal (New in 2026)

`llms.txt` is now an official component of Google Chrome Lighthouse's "Agentic Browsing"
audit suite (added May 5, 2026). It is the third file in the trilogy:

| File | Purpose | Audience |
|---|---|---|
| `robots.txt` | Controls which bots can crawl what | All crawlers |
| `sitemap.xml` | Full inventory of indexable URLs | Search engine crawlers |
| `llms.txt` | Curated "Best Of" map for AI inference | LLMs, AI agents |

**For SEO purposes:**
- `llms.txt` does NOT directly affect Google rankings (as of June 2026)
- `llms.txt` DOES affect agentic browsing Lighthouse score
- A 5xx error on the llms.txt endpoint is flagged by Lighthouse as a failure
- A 404 is marked N/A (not harmful, but a missed opportunity)
- John Mueller (Google) has noted that major crawlers don't currently prioritize these
  files over standard HTML — the primary value is for AI agents at inference time

**Maintenance rule:** Update llms.txt with every new blog post. The overhead is 3 lines
per post. The potential GEO benefit (AI systems discovering and citing new content) is
asymmetric — very low cost, meaningful upside.

---

## 4. Content SEO: E-E-A-T for AI Developer Content

Google's quality guidelines use **E-E-A-T**: Experience, Expertise, Authoritativeness, Trustworthiness. For technical developer content, E-E-A-T signals are the highest-impact ranking factor after keyword relevance.

### Experience — The First E (Added 2022, Most Important for This Blog)

**What it is:** Demonstrated first-hand experience with the topic. Not knowledge about the topic — actual experience doing it.

**Why it matters:** Google can distinguish "I built a production AI SaaS and reduced costs from $203 to $14" from "Here are 5 tips for reducing AI costs". The first has experience signals; the second doesn't.

**How to implement in every post:**
- Write in first person: "I built", "I discovered", "In production I use"
- Include specific metrics from real implementations: "$203 → $14", "161 GPT-4o calls", "1,725 pages"
- Describe specific failures and how you fixed them (not just the happy path)
- Reference real stack versions: "Prisma 7", "Next.js 16", "Celery 5.4.0"
- Include the "why I chose this over alternatives" reasoning

**Strong E signal:**
> "The first naive run of the report product cost $203. After four specific optimizations — TOKEN_BUDGET_DAILY=12,000, batch size reduction from 5 to 3 days, Redis caching at 86400s TTL, and INTER_BATCH_SLEEP=2.0s — the cost dropped to $14 per run."

**Weak E signal:**
> "AI API costs can be high. Here are some tips to reduce them."

### Expertise

**What it is:** Subject matter knowledge demonstrated through the quality and depth of the content.

**How to implement:**
- Show the decision tree: "I tested Chroma locally but chose pgvector for production because..."
- Address edge cases: "When similarity drops below 0.65 but the customer is angry, always escalate"
- Reference the underlying mechanisms: "PgBouncer doesn't support DDL statements in prepared statement mode"
- Be specific about failure modes: "The checksum mismatch error means you edited an applied migration"

### Authoritativeness

**What it is:** Reputation signals — who recognizes your expertise beyond the page itself.

**Current signals on hassanr.com:**
- IEEE publication link in the Person schema `sameAs` field
- LinkedIn profile with project work history
- GitHub profile with public repositories
- Blog posts that reference published tools (Prisma 7, Next.js 16)

**To strengthen:**
- Cross-post to Dev.to with canonical back to hassanr.com (backlink + distribution)
- GitHub repos referenced in posts (real code = authority signal)
- LinkedIn posts with links back to blog posts (social signals + potential backlinks)
- IEEE paper link in blog posts where AI/computer vision is mentioned (external authority)
- The blog post cross-referencing pattern (metric consistency across 5+ posts) signals
  a coherent, verifiable body of work — not a one-off article
- Perplexity/ChatGPT citations of your content (GEO success) themselves signal authority
  to Google when they drive branded search ("hassanr.com AI engineer")

### Trustworthiness

**What it is:** Accuracy, transparency, and reliability signals.

**How to implement:**
- Include version numbers so readers know exactly what context applies
- Note when something is version-specific: "This applies to Prisma 7+ — the output path changed from v6"
- Update posts when the technology changes (bump `dateModified`)
- Acknowledge what doesn't work: "I initially tried deploy in the postinstall script but this caused issues with..."
- Never overclaim: "This is one approach — the GitHub Actions alternative is safer for teams"

---

## 5. Content Freshness Strategy

Technical content decays. Google weights freshness heavily for topics like "Next.js deployment" or "GPT-4o pricing" because the correct answer changes.

### Freshness Signals

- `datePublished` and `dateModified` in JSON-LD
- `<time datetime="YYYY-MM-DD">` in the HTML header
- `<lastmod>` in sitemap.xml

### When to Update Posts

**Update immediately when:**
- A major version release changes the implementation (Next.js 17, Prisma 8, GPT-5)
- An API endpoint or configuration changes
- Pricing data becomes significantly outdated

**Update procedure:**
1. Make the content changes
2. Update `dateModified` in JSON-LD to today's date
3. Update `lastmod` in `sitemap.xml`
4. Add a brief "Updated [Month Year]:" note at the top if the change is significant
5. GSC: URL Inspection → Request Indexing again

### Year Inclusion in Titles

Include the year when:
- Content is time-sensitive: "GPT-4o vs Gemini Flash Cost Comparison 2026" ✅
- The field moves fast: "Solo Developer AI SaaS 2026" ✅
- The answer varies year-to-year: "Best AI APIs for Production 2026" ✅

Don't include the year when:
- The content is evergreen: "How to Build a RAG Pipeline" (still correct in 2028)
- It would force you to rename the file yearly (breaks canonical URLs)

---

## 6. GSC (Google Search Console) Monitoring

### What to Track Weekly

**After publishing a new post:**
1. Coverage: Is the URL indexed? (GSC → Pages → check the URL)
2. Rich results: Are FAQPage and BreadcrumbList appearing? (GSC → Search Results → filter by URL)
3. Average position: Is it in top 10 for the primary keyword within 4-6 weeks?

**Ongoing (monthly review):**
- Top queries for each post (are they ranking for the right keywords?)
- CTR by position (is the title/meta compelling enough to get clicks?)
- Core Web Vitals report (any new INP or CLS issues?)

### GSC Indexing After Publish

```
GSC → URL Inspection → paste full post URL → Request Indexing
```

Do this within 1 hour of publishing. Without this, Googlebot may take 2-4 weeks to crawl. With this: typically 1-3 days.

### Reading GSC Data to Improve Posts

**Scenario 1: Ranking position 8-15 for primary keyword**
Action: Strengthen the opening paragraph to directly answer the search intent. Add more specific data. Check if a competitor's featured snippet can be displaced.

**Scenario 2: Low CTR (< 2%) despite good position**
Action: Rewrite the title and meta description. Add a specific number or outcome. Make the title more compelling without being click-bait.

**Scenario 3: Ranking for unexpected keywords**
Action: Check if a subsection of the post could become its own post targeting that keyword.

---

## 7. The SEO Pre-Publish Checklist (Comprehensive)

```
KEYWORD & INTENT
[ ] Primary keyword confirmed (one per post)
[ ] Search intent is informational (tutorial/comparison/insight)
[ ] PAA questions researched (minimum 5, best 3 used for FAQ)
[ ] Keyword in: title, H1, first paragraph, meta, URL, one H2

ON-PAGE
[ ] Title: primary keyword in first 50 chars, ≤65 chars total
[ ] Meta description: 150-160 chars, primary keyword, specific differentiator
[ ] URL slug: keyword-focused, ≤70 chars, no stop words, hyphens only
[ ] H1: one per page (in header), matches title's intent
[ ] H2s: statement form, include secondary keywords, unique IDs
[ ] H3s: support their parent H2, unique IDs
[ ] First paragraph: primary keyword present, direct answer to search intent
[ ] Internal links: 2+ to existing related posts with descriptive anchor text

SCHEMA
[ ] @graph containing: BlogPosting + FAQPage + BreadcrumbList
[ ] BlogPosting: datePublished, dateModified, wordCount, image, author @id
[ ] FAQPage: 3 questions matching HTML exactly
[ ] BreadcrumbList: 3 levels (Home > Blog > Post)
[ ] HowTo schema added if post contains numbered steps

IMAGES
[ ] Featured image: 1200×630px, WebP format, named blog-[slug].webp
[ ] Alt text: descriptive + keyword, 5-15 words
[ ] Width/height attributes: set on all images (prevents CLS)
[ ] loading="eager" on featured image, loading="lazy" on all others
[ ] OG/Twitter/JSON-LD image URLs: absolute path to blog-[slug].webp

TECHNICAL
[ ] Canonical URL: absolute, matches actual file URL, no trailing slash
[ ] robots: "index, follow, max-snippet:-1, max-image-preview:large"
[ ] Sitemap entry: added with correct lastmod and image:image block
[ ] blogs/index.html: card added at top
[ ] llms.txt: post added with GEO-enhanced description (specific metric from post, not generic)
[ ] llms.txt file returns HTTP 200 (not 404 or 5xx — checked after deploy, Lighthouse audit)
[ ] Rich Results Test: FAQPage + BreadcrumbList both detected

E-E-A-T
[ ] First-person experience language present
[ ] At least 3 specific metrics from real implementation
[ ] Version numbers mentioned for all major dependencies
[ ] At least one failure mode or limitation acknowledged
[ ] Author block visible with name and role
```

---

## 8. SEO Mistakes Specific to This Blog

| Mistake | Impact | Fix |
|---|---|---|
| Changing a slug after publish | 404s on all existing links, loss of ranking | Never change slugs. Choose carefully before first publish. |
| Duplicate meta descriptions across posts | Google ignores both, may show own excerpt | Every post needs a unique meta description |
| Missing `dateModified` update on edits | Page appears stale to Google | Always update JSON-LD `dateModified` and sitemap `lastmod` on content changes |
| Internal links only going one direction | Unlinked posts rank poorly | After publishing, update 1-2 older posts to link to the new one |
| Targeting same keyword across two posts | Keyword cannibalization — both rank poorly | One keyword, one post. If overlap exists, merge or redirect. |
| No alt text on code block screenshots | Missed ranking signal for image search | Add meaningful alt text describing what the code/screenshot shows |

---

## Reference Links

- [Google Search Central — How Search Works](https://developers.google.com/search/docs/fundamentals/how-search-works)
- [Google E-E-A-T Guidelines](https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org BlogPosting](https://schema.org/BlogPosting)
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Schema.org HowTo](https://schema.org/HowTo)
- [Google Core Web Vitals](https://web.dev/vitals/)
- [Google Search Console](https://search.google.com/search-console)

---

**Last Updated:** June 2026  
**Version:** 1.0  
**See also:** `docs/aeo-optimization-guide.md` · `docs/geo-optimization-guide.md` · `docs/addingblogpost.md`
