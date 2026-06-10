# AEO Optimization Guide — [your-domain.com]
**Answer Engine Optimization: Getting Your Content Into AI-Powered Answer Boxes**  
**Version:** 1.0 · **Last Updated:** June 2026  
**Applies to:** All blog posts under `blogs/`  
**Related guides:** `docs/seo-optimization-guide.md` · `docs/geo-optimization-guide.md`

---

## What AEO Is (And Why It Matters in 2026)

**Answer Engine Optimization (AEO)** is the practice of structuring your content to be selected as the direct answer in:

- **Google AI Overviews** (the AI-generated summary at the top of standard search results)
- **Google AI Mode** (a dedicated AI-powered search experience at ai.google.com — more conversational, cites 4–6 sources per query, separate from the main SERP AI Overview)
- **Google Featured Snippets** (the blue-box direct answer, position zero)
- **People Also Ask (PAA)** boxes (the expandable question cards)
- **Bing Copilot** search answers
- **Voice search** (Google Assistant, Siri, Alexa)

> **2026 Update:** Google AI Mode (launched 2025) is now a primary AEO target alongside AI Overviews.
> AI Mode is more aggressive in citing sources and provides direct URL attribution. The same
> FAQPage schema and answer-first content structure that wins AI Overviews also wins AI Mode citations.

**Why AEO matters more than ever in 2026:**  
Google AI Overviews now appear on 30%+ of searches. For technical queries like "how to run Prisma migrations on Vercel", Google often shows a 2-3 paragraph AI-generated answer at the top — before any organic results. If your content is the source of that answer, you get:
1. **Massive brand visibility** even on zero-click searches
2. **Higher CTR** when the reader wants more detail (they click through to you)
3. **Authority signaling** — Google chose YOUR content to answer this question
4. **GEO spillover** — the same signals that earn featured snippets help LLMs cite you

**The critical difference between SEO and AEO:**
SEO ranks your page for a keyword. AEO makes your page the answer to a question. A page can rank #3 in organic results and simultaneously hold the featured snippet (position 0) — they're different results, different signals.

### Google Lighthouse Agentic Browsing Audit (May 2026)

As of May 5, 2026, Google Chrome Lighthouse tracks a new audit category: "Agentic Browsing."
It includes checks for:
- **llms.txt** presence and validity (server errors flagged; 404 = N/A, not a failure)
- **WebMCP tool registration** (forms and tools accessible to AI agents)
- **Accessibility for agents** (ARIA signals usable by AI browsing agents)
- **Layout stability** for agents

For this blog, the most actionable item is maintaining a valid llms.txt file. A 5xx server error
on the llms.txt endpoint will now show up as a Lighthouse agentic browsing failure. A 404 is
acceptable but suboptimal — the file should exist.

Source: https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt

---

## 1. The Five AEO Result Types

Understanding which result type to target determines how you format your content.

### Type 1: Paragraph Snippets (Most Common)

**Triggered by:** "What is X?", "Why does X happen?", "How does X work?"
**Format:** 40-60 words of continuous prose
**Google extracts:** The first paragraph after the matching H2 (usually)

**Optimization formula:**
```
H2: [Statement version of the question]
First sentence: [Direct definition or answer — ≤40 words]
Following sentences: [Supporting context, specific example, mechanism]
```

**Example:**
```html
<h2 id="why-tool-use">Why Prompt-Only Structured Output Breaks in Production</h2>
<p>Telling Claude to "respond only in JSON" works approximately 95% of the time —
but at 1,000 requests per day, that 5% failure rate means 50 broken responses per day. 
These failures are silent: JSON.parse() throws, the pipeline crashes, and the customer 
sees a generic 500 error while the API logs show a complete Claude response.</p>
```

The first sentence is ≤40 words and is a complete, extractable answer. This is the snippet candidate.

### Type 2: List Snippets

**Triggered by:** "How to X", "Steps to X", "Ways to X", "Top X for Y"  
**Format:** Numbered or bulleted list, 4-8 items  
**Google extracts:** The entire list with its H2 as the question

**Optimization formula:**
```html
<h2 id="how-to-migrate">How to Run Prisma Migrations in Production on Vercel</h2>
<ol>
  <li>Add <code>postinstall: prisma generate</code> to package.json</li>
  <li>Set the build command to <code>prisma migrate deploy && next build</code></li>
  <li>Add both <code>DATABASE_URL</code> and <code>DIRECT_URL</code> to Vercel environment variables</li>
  <li>Never use <code>prisma migrate dev</code> in CI — it hangs indefinitely</li>
</ol>
```

**Rules for list snippets:**
- Maximum 8 items (Google truncates longer lists)
- Each item: one specific, actionable instruction
- Use `<ol>` for sequential steps, `<ul>` for non-sequential options
- Keep items concise: 10-20 words each

### Type 3: Table Snippets

**Triggered by:** "X vs Y", "Compare X and Y", "Difference between X and Y"  
**Format:** Table with 2-4 columns, 4-8 rows  
**Google extracts:** The entire table

**Optimization formula:**
```html
<h2 id="gpt4o-vs-gemini">GPT-4o vs Gemini 2.5 Flash: Cost and Quality Comparison</h2>
<table>
  <thead>
    <tr><th>Dimension</th><th>GPT-4o</th><th>Gemini 2.5 Flash</th></tr>
  </thead>
  <tbody>
    <tr><td>Input cost</td><td>$2.50/1M tokens</td><td>$0.075/1M tokens</td></tr>
    <tr><td>Output cost</td><td>$10.00/1M tokens</td><td>$0.30/1M tokens</td></tr>
    <tr><td>Best for</td><td>Complex reasoning</td><td>High-volume generation</td></tr>
  </tbody>
</table>
```

**Rules for table snippets:**
- First column: the dimension being compared (specific, not generic)
- Data cells: specific values, not vague descriptions
- Maximum 4 columns (Google may truncate wider tables)
- The H2 must clearly signal this is a comparison

### Type 4: FAQ/PAA Results

**Triggered by:** The exact questions in your FAQPage schema  
**Format:** Expandable cards in the PAA section  
**Google extracts:** The `acceptedAnswer.text` from your FAQPage schema

This is the highest-value AEO target for this blog — see Section 3 below.

**2026 status of FAQPage schema:**
Google's documentation confirms FAQPage structured data remains supported and active in 2026.
The deprecated schema types (as of June 2025) are: CourseInfo, ClaimReview, EstimatedSalary,
LearningVideo, SpecialAnnouncement, VehicleListing, and Book Actions. FAQPage is NOT deprecated.
Continue using it on all blog posts.

### Type 5: AI Overview Sources

**Triggered by:** Complex multi-part queries where Google synthesizes from multiple pages  
**What Google uses:** Paragraphs that directly answer the sub-questions in the query  
**Signal:** Your page appears in the AI Overview source list

This overlaps significantly with GEO — see `docs/geo-optimization-guide.md`.

---

## 2. PAA (People Also Ask) Research Process

PAA questions are your AEO goldmine. They represent the questions Google has already confirmed people ask in relation to your topic. The exact PAA questions you find should become:
1. Your FAQ section questions (required by the template)
2. H2 headings in the body (statement form)
3. Secondary keywords

### Step-by-Step PAA Research

**Step 1: Seed search**  
Google your primary keyword. Don't click any results. Look at the PAA box (usually appears after position 2-3 in results).

**Step 2: Expand the PAA tree**  
Click each PAA question to expand it. This generates 4 more questions. Keep clicking — a single PAA box can yield 20-30 related questions.

**Step 3: Record all questions**  
Copy every PAA question exactly — word for word. The phrasing is important; use it verbatim in your FAQ.

**Step 4: Identify the 3 highest-value questions**  
For your FAQ section, choose 3 questions that:
- Have clear answers you can give from your experience
- Match the informational intent of your post
- Are specific enough to be answerable in 100-150 words

**Step 5: Answer in the required format**  
See Section 3 for exact writing rules.

### PAA Research for [your-domain.com] Content

Based on the June batch primary keywords, these PAA patterns were found:
- "How do I [action] in production?" → process/tutorial intent
- "What is the difference between X and Y?" → comparison intent  
- "When should I use X?" → decision intent
- "What is the best [tool] for [use case]?" → recommendation intent

Each requires a slightly different answer format — see Type 1-4 above.

---

## 3. Writing FAQ Answers for AEO (The Required Section)

Every post has a mandatory FAQ section (see `addingblogpost.md`). This section explains how to write those answers to maximize AEO performance.

### The AEO Answer Formula

**Structure:**
```
Sentence 1: Direct answer, ≤30 words, includes the keyword from the question
Sentence 2-3: Specific evidence (number, tool name, example, context)
Sentence 4-5: Qualification, alternative, or additional context
```

**Length:** 80-150 words per answer (this blog's standard). The first sentence is extractable by Google as a featured snippet on its own.

### The ≤30-Word First Sentence Rule

Google's featured snippet system extracts the most direct answer sentence. For PAA boxes, it's almost always the first sentence of the answer. Make that sentence:
- **Self-contained**: Someone reading only this sentence should understand the answer
- **Specific**: Include the keyword, a number, or a tool name
- **Direct**: No hedging, no "great question", no "it depends" as the opener

**Example analysis:**

❌ **Weak first sentence** (too hedged, too vague):
> "This is a common question and the answer depends on several factors that need to be considered carefully."

✅ **Strong first sentence** (direct, keyword-included, specific):
> "Use `prisma migrate deploy` in all production and CI/CD environments — never `prisma migrate dev`, which hangs indefinitely without interactive input."

The second example is Google-extractable. The first is not.

### The HTML-Schema Identity Rule

**This is non-negotiable:** The text in your `<div class="blog-faq__body"><p>` must be character-for-character identical to the `acceptedAnswer.text` in your FAQPage JSON-LD schema. Google cross-checks these and will not show FAQPage rich results if they don't match.

**Correct pattern:**

HTML:
```html
<div class="blog-faq__body">
  <p>Use prisma migrate deploy in production, not prisma migrate dev. The dev 
  command requires interactive input that CI/CD cannot provide — it hangs 
  indefinitely. The deploy command applies pending migrations silently with 
  no interaction. Add it to your build command: 
  "prisma migrate deploy && next build".</p>
</div>
```

JSON-LD (must match exactly):
```json
"acceptedAnswer": {
  "@type": "Answer",
  "text": "Use prisma migrate deploy in production, not prisma migrate dev. The dev command requires interactive input that CI/CD cannot provide — it hangs indefinitely. The deploy command applies pending migrations silently with no interaction. Add it to your build command: \"prisma migrate deploy && next build\"."
}
```

### The Specificity Hierarchy

For AEO, specific answers outperform general ones at every level:

| Specificity level | Example | AEO value |
|---|---|---|
| Vague | "It depends on your use case" | ❌ Rarely featured |
| General | "Use the right tool for the job" | ❌ Not featured |
| Directional | "Gemini Flash is cheaper than GPT-4o" | ⚠️ Sometimes featured |
| Specific | "Gemini 2.5 Flash costs $0.075/1M input tokens vs GPT-4o at $2.50/1M" | ✅ Often featured |
| Very specific | "At 1,000 API calls per month with 500 input + 200 output tokens each: Gemini Flash costs $0.14 vs GPT-4o at $3.00 — a 21× difference" | ✅✅ Very likely featured |

---

## 4. Section-Level AEO: Making Every H2 a Potential Snippet

Not just the FAQ — every H2 section is an AEO opportunity. Each H2 section should be written to potentially become a standalone featured snippet for its topic.

### The Direct-Answer H2 Opening

After every H2, the first paragraph should directly answer the implied question in that heading. This is both an SEO and AEO best practice.

**Pattern:**
```html
<h2 id="directurl">Why You Need a directUrl for Prisma Migrations Through Connection Poolers</h2>
<p>Connection poolers like Neon's PgBouncer do not support DDL statements — the 
CREATE TABLE and ALTER TABLE commands that migrations require. When you run 
prisma migrate deploy through a pooler URL, you get: "cannot start a transaction 
in prepared statements mode." The fix is a second database URL (DIRECT_URL) that 
bypasses the pooler for migration operations only.</p>
```

The first sentence (≤50 words) explains the why. The second sentence names the specific error. The third sentence gives the solution. Any of these three sentences is extractable by Google.

### The "So What" Test

Before publishing, test each H2 section: if Google extracted only the first paragraph as a featured snippet, would it be a useful, standalone answer? If not, rewrite the opener.

---

## 5. HowTo Schema for Tutorial Posts

For posts that contain numbered implementation steps (most technical tutorials), add a `HowTo` schema as a 4th item in the `@graph` array.

**When to use:**
- Post title starts with "How to..."
- Post contains a sequential numbered list of implementation steps
- Each step has a specific, actionable instruction

**Template:**
```json
{
  "@type": "HowTo",
  "@id": "https://[your-domain.com]/blogs/YOUR-SLUG.html#howto",
  "name": "How to Set Up Prisma Migrations in Production on Vercel",
  "description": "Step-by-step guide to running Prisma migrations safely on Vercel without downtime.",
  "totalTime": "PT30M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Add postinstall script",
      "text": "Add \"postinstall\": \"prisma generate\" to package.json scripts. This runs automatically after npm install, ensuring the Prisma client is generated in Vercel's build environment."
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Configure directUrl in schema.prisma",
      "text": "Add directUrl = env(\"DIRECT_URL\") to the datasource block in schema.prisma. This bypasses the connection pooler for DDL migration statements."
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Set the Vercel build command",
      "text": "Set the build command to \"prisma migrate deploy && next build\". If migration fails, the build halts and the old version remains deployed."
    }
  ]
}
```

Add this as the 4th type in the `@graph` array. Validate at [Google Rich Results Test](https://search.google.com/test/rich-results).

---

## 6. Voice Search AEO

Voice queries are longer and more conversational than typed queries. "Hey Google, how do I run Prisma migrations on Vercel?" needs a different answer format than "prisma migrations vercel".

### Voice Search Optimization Rules

1. **Conversational FAQ answers**: Write as if answering a spoken question. "To run Prisma migrations on Vercel, add the postinstall script to package.json, then..." — this is more voice-friendly than "Implementation: 1. Add postinstall..."

2. **Short sentences in FAQs**: Voice assistants read extracted sentences. Short sentences (≤15 words) are read clearly. Long complex sentences sound awkward when spoken.

3. **The speakable property** (optional, advanced):
```json
{
  "@type": "BlogPosting",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".blog-post__lead", ".blog-faq__body p:first-child"]
  }
}
```

> **Implementation note for [your-domain.com]:** The `.blog-post__lead` class wraps the post's
> opening paragraph. The `.blog-faq__body p:first-child` selects the first sentence of each
> FAQ answer — the part that is already optimized to ≤30 words. These two selectors in the
> speakable property target the highest-value voice-extractable content on every post.
> Add the speakable property inside the BlogPosting object in the @graph array.

This tells Google Assistant which sections to read aloud for voice search answers.

---

## 7. AEO Content Checklist (Per Post)

```
PRE-WRITING
[ ] Searched primary keyword to identify current featured snippet (can you displace it?)
[ ] Searched primary keyword for PAA questions (recorded all of them)
[ ] Chose 3 PAA questions for FAQ section
[ ] Identified which snippet type (paragraph/list/table) to target for each H2

H2-LEVEL AEO
[ ] Every H2 is a direct statement containing a secondary keyword
[ ] Every H2's first paragraph: ≤50 words, direct answer, extractable standalone
[ ] Numbered lists used for sequential steps (4-8 items max)
[ ] Tables used for comparisons (2-4 columns, 4-8 rows)
[ ] The "So What" test passed for every H2 section

FAQ SECTION
[ ] 3 FAQ questions from real PAA research (verbatim phrasing)
[ ] First sentence of every answer: ≤30 words, direct answer, keyword present
[ ] All answers: 80-150 words total
[ ] HTML text is IDENTICAL to FAQPage schema text (character for character)
[ ] FAQPage schema present in @graph
[ ] FAQ TOC link added as last TOC item

SCHEMA
[ ] FAQPage: 3 questions, all matching HTML exactly
[ ] HowTo schema added if post has numbered steps
[ ] BreadcrumbList: 3 levels present (required alongside FAQPage for rich results)

TESTING
[ ] Rich Results Test: FAQPage + BreadcrumbList both detected ✅
[ ] HowTo detected if applicable ✅
[ ] No "invalid markup" warnings in Rich Results Test
[ ] Google AI Mode: search primary keyword at ai.google.com — is [your-domain.com] cited?
[ ] Google AI Overview: search primary keyword on google.com — is [your-domain.com] in sources?
```

---

## 8. Measuring AEO Success

### What to Track in GSC

**Search Results report → filter by URL:**
- Are you appearing in Position 0 (featured snippet) for any queries?
- Are impressions growing for PAA-style queries ("how to X", "what is X")?
- What's the CTR from featured snippet position? (typically 5-15% for featured snippets)

### Signs Your AEO Is Working

1. **GSC shows impressions for question-format queries** ("how to run prisma migrations", "what is the difference between migrate deploy and migrate dev")
2. **Google search shows your post in the PAA box** — manually search your FAQ questions and check
3. **Rich Results Test shows FAQPage detected** — validate after every post
4. **Google AI Overviews cites your post** — search your primary keyword and check the AI Overview sources

### AEO Timeline

- Featured snippet: typically 2-6 weeks after indexing for competitive topics
- PAA box appearance: typically 1-4 weeks after FAQPage schema is indexed
- AI Overview citation: can appear in days if the content directly answers the query and the page is well-crawled

---

## 9. Common AEO Mistakes for This Blog

| Mistake | Why It Fails | Fix |
|---|---|---|
| FAQ questions paraphrased from PAA | Google won't match to the PAA box | Use verbatim PAA phrasing |
| First FAQ sentence is ≥50 words | Too long for snippet extraction | Rewrite to ≤30 words |
| HTML FAQ text differs from schema by even one character | Rich results don't appear | Copy-paste from HTML into schema |
| H2 is a question mark question ("What Is tool_use?") | Google prefers statement headings | Rewrite as statement: "What tool_use Does and Why It Matters" |
| No HowTo schema on tutorial posts | Misses HowTo rich results | Add when post has numbered steps |
| List items are too long (>30 words each) | Won't appear as clean list snippet | Split into shorter items |
| Table has 5+ columns | Google truncates wide tables | Keep to ≤4 columns |
| FAQ answers over 300 words | Too long for snippet extraction | Keep under 150 words |

---

## Reference Links

- [Google Search — Featured Snippets Documentation](https://developers.google.com/search/docs/appearance/featured-snippets)
- [Google PAA Optimization Guide](https://developers.google.com/search/docs/appearance/structured-data/faqpage)
- [Google HowTo Schema](https://developers.google.com/search/docs/appearance/structured-data/how-to)
- [Google Speakable Schema](https://developers.google.com/search/docs/appearance/structured-data/speakable)
- [Schema.org FAQPage](https://schema.org/FAQPage)
- [Schema.org HowTo](https://schema.org/HowTo)

---

**Last Updated:** June 2026  
**Version:** 1.0  
**See also:** `docs/seo-optimization-guide.md` · `docs/geo-optimization-guide.md` · `docs/addingblogpost.md`
