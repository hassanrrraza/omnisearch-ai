# API Documentation

## Overview

OmniSearch AI provides RESTful API endpoints for generating and optimizing blog content. All API routes are server-side Next.js API routes that handle Gemini AI integration securely.

**Base URL:** `http://localhost:3000/api` (development) or your deployed domain

**Authentication:** None required (API key managed server-side via environment variables)

**Content Type:** `application/json`

---

## Endpoints

### 1. Generate New Blog

Generates a complete SEO-optimized blog post from input parameters.

**Endpoint:** `POST /api/generate-blog`

**Request Body:**

```typescript
{
  title: string;              // Blog post title (required)
  keyword: string;            // Primary SEO keyword (required)
  audience: string;           // Target audience (required)
  searchIntent: string;       // Search intent: "informational" | "commercial" | "transactional" | "navigational" (required)
  internalLinks: string[];    // Array of internal link URLs (optional)
  cta: string;                // Call-to-action text (optional)
  wordCount?: number;         // Target word count (optional, default: ~2000)
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/generate-blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "How to Optimize Content for AI Search",
    "keyword": "AI search optimization",
    "audience": "content marketers and SEO specialists",
    "searchIntent": "informational",
    "internalLinks": [
      "https://example.com/seo-guide",
      "https://example.com/content-strategy"
    ],
    "cta": "Start optimizing your content today"
  }'
```

**Success Response (200 OK):**

```typescript
{
  data: {
    blogMarkdown: string;           // Full blog post in Markdown
    seoTitle: string;              // Optimized SEO title tag
    metaDescription: string;        // Meta description
    urlSlug: string;               // URL-friendly slug
    featuredSnippet: string;       // Featured snippet answer (40-60 words)
    faq: Array<{                   // FAQ section
      question: string;
      answer: string;
    }>;
    faqSchema: object;             // FAQPage JSON-LD schema
    breadcrumbSchema: object;      // BreadcrumbList JSON-LD schema
    llmSummary: string;            // LLM-ready summary
    scores: {
      seo: number;                // SEO score (0-100)
      aeo: number;                // AEO score (0-100)
      geo: number;                // GEO score (0-100)
      llm: number;                // LLM score (0-100)
      overall: number;            // Overall score (0-100)
    };
  }
}
```

**Error Responses:**

**400 Bad Request - Invalid Input:**
```json
{
  "error": "Invalid input",
  "details": {
    "fieldErrors": {
      "title": ["Title is required"],
      "keyword": ["Keyword is required"]
    }
  }
}
```

**500 Internal Server Error - Invalid JSON:**
```json
{
  "error": "Gemini returned invalid JSON.",
  "hint": "The response may be truncated, markdown-wrapped, blocked, or malformed. Try a shorter blog or reduce output length.",
  "rawPreview": "..." // Only in development
}
```

**503 Service Unavailable - Missing API Key:**
```json
{
  "error": "Demo deployment only.",
  "hint": "Clone OmniSearch AI and add your own GEMINI_API_KEY locally to generate content."
}
```

**Schema Warning (200 OK with warning):**

If Gemini returns valid JSON that doesn't perfectly match the schema:

```json
{
  "data": { /* partial data */ },
  "schemaWarning": true,
  "schemaErrors": {
    "fieldErrors": { /* schema validation errors */ }
  }
}
```

---

### 2. Optimize Existing Blog

Optimizes an existing blog post for SEO, AEO, GEO, and LLM discoverability.

**Endpoint:** `POST /api/optimize-blog`

**Request Body:**

```typescript
{
  existingBlogMarkdown: string;   // Existing blog content in Markdown (required)
  focusKeywords: string[];        // Target keywords (required)
  targetAudience: string;         // Target audience (required)
  toneOfVoice: string;           // Tone: "professional" | "casual" | "technical" | "friendly" (required)
  goal: string;                  // Optimization goal (optional)
  internalLinks?: string[];      // Internal links to include (optional)
  cta?: string;                  // Call-to-action (optional)
}
```

**Example Request:**

```bash
curl -X POST http://localhost:3000/api/optimize-blog \
  -H "Content-Type: application/json" \
  -d '{
    "existingBlogMarkdown": "# Your Existing Blog\n\nYour blog content here...",
    "focusKeywords": ["AI search", "content optimization"],
    "targetAudience": "digital marketers",
    "toneOfVoice": "professional",
    "goal": "Improve AI search visibility",
    "internalLinks": ["https://example.com/related-post"],
    "cta": "Learn more about AI optimization"
  }'
```

**Success Response (200 OK):**

```typescript
{
  data: {
    optimizedBlogMarkdown: string;  // Improved blog content
    changeLog: Array<{              // Detailed change log
      section: string;
      changes: string[];
      reason: string;
    }>;
    beforeAfter: {                  // Before/after comparison
      seoTitle: { before: string; after: string };
      metaDescription: { before: string; after: string };
      structure: { before: string; after: string };
    };
    improvementScores: {
      seo: { before: number; after: number; improvement: number };
      aeo: { before: number; after: number; improvement: number };
      geo: { before: number; after: number; improvement: number };
      llm: { before: number; after: number; improvement: number };
      overall: { before: number; after: number; improvement: number };
    };
    seoTitle: string;
    metaDescription: string;
    urlSlug: string;
    featuredSnippet: string;
    faq: Array<{ question: string; answer: string }>;
    faqSchema: object;
    breadcrumbSchema: object;
    llmSummary: string;
    scores: {
      seo: number;
      aeo: number;
      geo: number;
      llm: number;
      overall: number;
    };
  }
}
```

**Error Responses:**

**400 Bad Request - Invalid Input:**
```json
{
  "error": "Invalid input",
  "details": {
    "fieldErrors": {
      "existingBlogMarkdown": ["Blog content is required"],
      "focusKeywords": ["At least one keyword is required"]
    }
  }
}
```

**500 Internal Server Error - Invalid Content JSON:**
```json
{
  "error": "Gemini returned invalid optimized blog content.",
  "hint": "The optimized content response did not match the expected shape. Try reducing the input length.",
  "schemaErrors": { /* ... */ } // Only in development
}
```

**500 Internal Server Error - Invalid Report JSON:**
```json
{
  "error": "Gemini returned an optimization report that did not match the expected schema.",
  "hint": "The metadata/report response may be incomplete or malformed. Try again.",
  "schemaErrors": { /* ... */ } // Only in development
}
```

**503 Service Unavailable - Missing API Key:**
```json
{
  "error": "Demo deployment only.",
  "hint": "Clone OmniSearch AI and add your own GEMINI_API_KEY locally to optimize content."
}
```

---

## Request/Response Schemas

### Blog Input Schema

```typescript
{
  title: string;           // min: 5, max: 100 characters
  keyword: string;         // min: 2, max: 50 characters
  audience: string;        // min: 10, max: 200 characters
  searchIntent: string;    // enum: "informational" | "commercial" | "transactional" | "navigational"
  internalLinks?: string[]; // max: 10 URLs
  cta?: string;           // max: 200 characters
  wordCount?: number;     // min: 500, max: 5000
}
```

### Optimize Input Schema

```typescript
{
  existingBlogMarkdown: string;  // min: 100 characters
  focusKeywords: string[];      // min: 1, max: 5 keywords
  targetAudience: string;       // min: 10, max: 200 characters
  toneOfVoice: string;          // enum: "professional" | "casual" | "technical" | "friendly"
  goal?: string;               // max: 300 characters
  internalLinks?: string[];    // max: 10 URLs
  cta?: string;               // max: 200 characters
}
```

### Blog Output Schema

```typescript
{
  blogMarkdown: string;        // Generated blog content
  seoTitle: string;           // SEO-optimized title (50-60 chars)
  metaDescription: string;     // Meta description (150-160 chars)
  urlSlug: string;            // URL-friendly slug
  featuredSnippet: string;     // Featured snippet (40-60 words)
  faq: Array<{
    question: string;          // FAQ question
    answer: string;           // FAQ answer (50-100 words)
  }>;                          // Exactly 3 FAQs
  faqSchema: object;          // FAQPage JSON-LD
  breadcrumbSchema: object;   // BreadcrumbList JSON-LD
  llmSummary: string;         // LLM summary (100-150 words)
  scores: {
    seo: number;              // 0-100
    aeo: number;              // 0-100
    geo: number;              // 0-100
    llm: number;              // 0-100
    overall: number;          // 0-100 (average)
  };
}
```

---

## Rate Limiting

Currently, there is no built-in rate limiting. Rate limiting is managed by:

1. **Gemini API quotas**: Based on your Gemini API key tier
2. **Next.js server capacity**: Based on your deployment platform

**Recommended:** Implement rate limiting for production deployments using:
- Vercel Edge Config
- Redis-based rate limiting
- API gateway rate limiting

---

## Error Handling

All endpoints follow consistent error handling:

1. **Input Validation (400)**: Zod schema validation errors
2. **JSON Parsing (500)**: Gemini returns invalid/malformed JSON
3. **Missing API Key (503)**: Server not configured with Gemini API key
4. **Internal Errors (500)**: Unexpected server errors

**Development Mode:** Additional error details and raw response previews included in error responses.

**Production Mode:** Minimal error details for security.

---

## Security Considerations

### API Key Management
- API keys stored in `GEMINI_API_KEY` environment variable
- Never exposed to client-side
- Server-side only access via Next.js API routes
- Validate API key presence on startup

### Input Sanitization
- All inputs validated via Zod schemas
- Length limits enforced
- Type safety with TypeScript
- No arbitrary code execution

### Output Validation
- All Gemini responses validated against Zod schemas
- Schema warnings for partial matches
- Fallback handling for malformed responses

---

## Usage Examples

### JavaScript/TypeScript

```typescript
// Generate new blog
async function generateBlog() {
  const response = await fetch('/api/generate-blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: 'How to Use OmniSearch AI',
      keyword: 'AI content optimization',
      audience: 'content creators',
      searchIntent: 'informational',
      internalLinks: ['https://example.com/guide'],
      cta: 'Start optimizing today'
    })
  });

  const { data } = await response.json();
  console.log(data.blogMarkdown);
  console.log(data.scores);
}

// Optimize existing blog
async function optimizeBlog() {
  const response = await fetch('/api/optimize-blog', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      existingBlogMarkdown: '# My Blog\n\nContent here...',
      focusKeywords: ['AI', 'optimization'],
      targetAudience: 'marketers',
      toneOfVoice: 'professional'
    })
  });

  const { data } = await response.json();
  console.log(data.optimizedBlogMarkdown);
  console.log(data.improvementScores);
}
```

### Python

```python
import requests
import json

# Generate new blog
def generate_blog():
    url = 'http://localhost:3000/api/generate-blog'
    payload = {
        'title': 'How to Use OmniSearch AI',
        'keyword': 'AI content optimization',
        'audience': 'content creators',
        'searchIntent': 'informational',
        'internalLinks': ['https://example.com/guide'],
        'cta': 'Start optimizing today'
    }
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    print(data['data']['blogMarkdown'])
    print(data['data']['scores'])

# Optimize existing blog
def optimize_blog():
    url = 'http://localhost:3000/api/optimize-blog'
    payload = {
        'existingBlogMarkdown': '# My Blog\n\nContent here...',
        'focusKeywords': ['AI', 'optimization'],
        'targetAudience': 'marketers',
        'toneOfVoice': 'professional'
    }
    
    response = requests.post(url, json=payload)
    data = response.json()
    
    print(data['data']['optimizedBlogMarkdown'])
    print(data['data']['improvementScores'])
```

---

## Testing the API

### Using cURL

```bash
# Test generate-blog endpoint
curl -X POST http://localhost:3000/api/generate-blog \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Blog",
    "keyword": "test",
    "audience": "developers",
    "searchIntent": "informational"
  }'

# Test optimize-blog endpoint
curl -X POST http://localhost:3000/api/optimize-blog \
  -H "Content-Type: application/json" \
  -d '{
    "existingBlogMarkdown": "# Test\n\nContent",
    "focusKeywords": ["test"],
    "targetAudience": "developers",
    "toneOfVoice": "professional"
  }'
```

### Using Postman

1. Import the API endpoints
2. Set method to `POST`
3. Set URL to `http://localhost:3000/api/generate-blog` or `/api/optimize-blog`
4. Set headers: `Content-Type: application/json`
5. Add request body as JSON
6. Send request

---

## Response Time Expectations

- **Generate Blog**: 15-45 seconds (depends on word count)
- **Optimize Blog**: 20-60 seconds (depends on input length)
- **Validation**: < 100ms

Factors affecting response 时间:
- Gemini API latency
- Content length
- Network conditions
- Server load

---

## Browser Integration

The web interface uses these endpoints via `fetch()`:

```typescript
// Example from BlogForm.tsx
const response = await fetch('/api/generate-blog', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

No additional authentication or headers required for browser requests.

---

## Troubleshooting

### Common Issues

**1. "Demo deployment only" error**
- Cause: Missing `GEMINI_API_KEY` in environment variables
- Add API key to `.env.local` file

**2. "Invalid JSON" error**
- Cause: Gemini response truncated or malformed
- Try shorter content or reduce word count

**3. "Invalid input" error**
- Cause: Request body doesn't match schema
- Check required fields and data types

**4. Slow response times**
- Cause: Long content or Gemini API latency
- Consider reducing word count or input length

### Debug Mode

Set `NODE_ENV=development` to see:
- Raw Gemini responses
- Detailed error messages
- Schema validation errors
- Prompt feedback and safety ratings

---

## Future API Enhancements

Planned improvements:
- [ ] Streaming responses for real-time generation
- [ ] Batch processing for multiple blogs
- [ ] Webhook notifications for long-running tasks
- [ ] API key management endpoints
- [ ] Usage analytics endpoints
- [ ] Custom optimization guide upload
- [ ] History/retrieval endpoints
