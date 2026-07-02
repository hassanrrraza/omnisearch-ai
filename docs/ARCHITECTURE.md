# Architecture

## Overview

OmniSearch AI is a Next.js 16 application that leverages Google's Gemini 2.5 Flash API to optimize blog content for SEO (Search Engine Optimization), AEO (Answer Engine Optimization), GEO (Generative Engine Optimization), and LLM (Large Language Model) discoverability.

The architecture follows a client-server pattern with server-side API routes handling all AI operations to keep API keys secure.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Homepage   │  │  New Blog    │  │  Optimize    │          │
│  │   (page.tsx)  │  │   Form       │  │   Blog Form  │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      API Layer (Next.js)                         │
│  ┌──────────────────────────┐  ┌──────────────────────────┐     │
│  │ POST /api/generate-blog  │  │ POST /api/optimize-blog  │     │
│  └──────────────────────────┘  └──────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Gemini     │  │   Prompts    │  │   Guides     │          │
│  │   Client     │  │   Builder    │  │   (SEO/AEO/  │          │
│  │              │  │              │  │   GEO)       │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│  ┌──────────────┐  ┌──────────────┐                           │
│  │   Zod        │  │   File Mode  │                           │
│  │   Schemas    │  │   Handlers   │                           │
│  └──────────────┘  └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              Google Gemini 2.5 Flash API                  │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Core Components

### 1. Application Layer (`app/`)

#### Pages
- **`page.tsx`**: Landing page with hero section, feature overview, and navigation
- **`new-blog/page.tsx`**: Form interface for creating new blog posts
- **`optimize-blog/page.tsx`**: Form interface for optimizing existing blog posts

#### API Routes
- **`api/generate-blog/route.ts`**: Handles new blog generation requests
- **`api/optimize-blog/route.ts`**: Handles blog optimization requests

### 2. Components Layer (`components/`)

#### Form Components
- **`BlogForm.tsx`**: React Hook Form for new blog creation
  - Fields: title, keyword, audience, search intent, internal links, CTA
  - Zod schema validation
  - Real-time form validation

- **`ExistingBlogForm.tsx`**: Form for blog optimization
  - Text area for pasting existing content
  - Configuration fields (keywords, audience, tone)
  - Content analysis preview

#### Preview Components
- **`OutputPreview.tsx`**: Displays generated blog output
  - Markdown rendering with react-markdown
  - SEO metadata display
  - FAQ section
  - Schema JSON-LD preview
  - LLM summary

- **`OptimizeOutputPreview.tsx`**: Displays optimization results
  - Before/after comparison
  - Change log
  - Improvement scores
  - Optimized content preview

- **`SerpPreview.tsx`**: Google SERP preview component
  - Title tag preview
  - Meta description preview
  - URL slug preview
  - Real-time updates based on form input

#### Action Components
- **`PreviewActions.tsx`**: Score cards and export buttons
  - SEO/AEO/GEO/LLM score displays
  - Export to Markdown
  - Export to HTML
  - Copy to clipboard
  - Download metadata JSON

#### Landing Components
- **`HeroWorkflowVisual.tsx`**: Animated workflow visualization
  - 3D CSS transforms
  - Animated graph nodes
  - Console output simulation

### 3. Business Logic Layer (`lib/`)

#### Gemini Integration (`lib/gemini.ts`)
```typescript
// Core Gemini client wrapper
- generateContent(prompt: string): Promise<GenerateContentResponse>
- configureModel(model: string, apiKey: string)
- Handle rate limiting and retries
- Error handling and logging
```

#### Optimization Guides (`lib/guides/`)
- **`seo-optimization-guide.md`**: SEO best practices
  - Keyword placement strategies
  - E-E-A-T signals
  - Meta optimization
  - Structured data requirements

- **`aeo-optimization-guide.md`**: Answer engine optimization
  - Featured snippet optimization
  - FAQPage schema
  - People Also Ask patterns
  - Direct answer formatting

- **`geo-optimization-guide.md`**: Generative engine optimization
  - Factual density
  - Comparison tables
  - LLM citation signals
  - Semantic structure

#### Prompt Builders (`lib/prompts/`)
- **`build-new-blog-prompt.ts`**: Constructs prompts for new blog generation
  - Combines user input with optimization guides
  - Structures output requirements
  - Defines scoring criteria

- **`build-optimize-prompt.ts`**: Constructs prompts for blog optimization
  - Analyzes existing content
  - Applies optimization rules
  - Generates change recommendations

#### Validation Schemas (`lib/schemas/`)
- **`input-schemas.ts`**: Zod schemas for form validation
  - New blog input schema
  - Optimize blog input schema
  - Type safety and runtime validation

- **`output-schemas.ts`**: Zod schemas for API response validation
  - Blog output schema
  - Metadata schema
  - FAQ schema
  - Schema JSON-LD validation

#### File Mode (`lib/file-mode/`)
- **`generate.ts`**: CLI-based blog generation
  - Reads from `input/new-blog.json`
  - Writes to `output/` directory
  - Terminal output with scores

- **`optimize.ts`**: CLI-based blog optimization
  - Reads from `input/existing-blog.md`
  - Reads config from `input/optimize-config.json`
  - Writes optimized output to `output/`

#### Utilities (`lib/utils/`)
- **`download.ts`**: Export functionality
  - Markdown download
  - HTML download
  - JSON metadata export
  - Clipboard operations

### 4. CLI Layer (`cli/`)

- **`index.js`**: CLI entry point
  - Command parsing
  - File mode routing
  - Error handling

## Data Flow

### New Blog Generation Flow

```
User Input (Form)
    ↓
Zod Validation
    ↓
Load Optimization Guides (SEO/AEO/GEO)
    ↓
Build Prompt (lib/prompts/build-new-blog-prompt.ts)
    ↓
Call Gemini API (lib/gemini.ts)
    ↓
Validate Response (Zod schema)
    ↓
Render Components (OutputPreview, SerpPreview)
    ↓
Calculate Scores (SEO/AEO/GEO/LLM)
    ↓
Display Results + Export Options
```

### Blog Optimization Flow

```
User Input (Existing Content + Config)
    ↓
Zod Validation
    ↓
Load Optimization Guides (SEO/AEO/GEO)
    ↓
Build Prompt (lib/prompts/build-optimize-prompt.ts)
    ↓
Call Gemini API (lib/gemini.ts)
    ↓
Validate Response (Zod schema)
    ↓
Generate Change Log
    ↓
Render Components (OptimizeOutputPreview)
    ↓
Calculate Improvement Scores
    ↓
Display Before/After + Export Options
```

## Security Architecture

### API Key Management
- API keys stored in `.env.local` (never committed)
- Server-side only access via Next.js API routes
- No client-side exposure of API keys
- Environment variable validation on startup

### Input Validation
- Zod schemas for all inputs
- Type-safe TypeScript throughout
- Sanitization of user content
- Length limits on text inputs

### Output Validation
- Zod schema validation of Gemini responses
- Type-safe response parsing
- Error handling for malformed responses
- Fallback for API failures

## Performance Considerations

### Client-Side
- React 19 with concurrent features
- Dynamic imports for heavy components
- CSS-in-JS with Tailwind CSS
- Optimized re-renders with React.memo

### Server-Side
- Next.js API routes for serverless execution
- Streaming responses for large content
- Caching of optimization guides
- Rate limiting considerations

### Bundle Size
- Code splitting by route
- Dynamic imports for non-critical components
- Tree shaking with webpack
- Minimal dependencies

## Scalability

### Current Limitations
- Single API key per deployment
- No database persistence
- File-based CLI mode
- No user authentication

### Future Scalability Options
- Multi-tenant API key management
- Database integration for content history
- Queue system for batch processing
- Caching layer for repeated optimizations
- Distributed processing for large-scale operations

## Technology Rationale

### Next.js 16 (App Router)
- Server-side rendering for SEO
- API routes for backend logic
- Built-in optimization
- Strong TypeScript support

### Gemini 2.5 Flash
- Fast inference for real-time generation
- Strong reasoning capabilities
- Cost-effective compared to larger models
- Good understanding of SEO/technical content

### Zod
- Runtime type validation
- TypeScript integration
- Clear error messages
- Schema composition

### React Hook Form
- Performance-optimized form handling
- Built-in validation
- TypeScript support
- Minimal re-renders

## Deployment Architecture

### Development
```bash
npm run dev
# Next.js dev server on localhost:3000
```

### Production
```bash
npm run build
npm start
# Production Next.js server
```

### Environment Variables
```env
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### Platform Considerations
- Vercel: Native Next.js support
- Docker: Containerizable deployment
- Self-hosted: Node.js server required
- Static export: Limited (API routes not supported)

## Monitoring & Observability

### Current Implementation
- Console logging for API calls
- Error tracking in API routes
- Response time logging

### Recommended Additions
- Structured logging
- Error tracking (Sentry)
- Performance monitoring
- API usage metrics
- Score analytics

## Testing Strategy

### Current State
- Manual testing via web interface
- CLI mode testing
- Schema validation via Zod

### Recommended Testing
- Unit tests for prompt builders
- Integration tests for API routes
- E2E tests with Playwright
- Schema validation tests
- Load testing for API routes
