# Development Guide

## Overview

This guide covers everything you need to know to contribute to OmniSearch AI, including setup, coding standards, testing, and deployment.

---

## Prerequisites

- **Node.js**: 18 or higher
- **npm**: 9 or higher
- **Git**: Latest version
- **Gemini API Key**: Free from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

## Initial Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hassanrrraza/omnisearch-ai
cd omnisearch-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### 4. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Project Structure

```
omnisearch-ai/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Homepage
│   ├── new-blog/            # New blog creation page
│   ├── optimize-blog/       # Blog optimization page
│   ├── layout.tsx           # Root layout
│   ├── home.css             # Homepage styles
│   └── api/                 # API routes
│       ├── generate-blog/   # Blog generation endpoint
│       └── optimize-blog/   # Blog optimization endpoint
├── components/              # React components
│   ├── BlogForm.tsx         # New blog form
│   ├── ExistingBlogForm.tsx # Optimization form
│   ├── OutputPreview.tsx    # Generated content preview
│   ├── OptimizeOutputPreview.tsx # Optimization results
│   ├── PreviewActions.tsx   # Score cards & export buttons
│   ├── SerpPreview.tsx      # Google SERP preview
│   ├── JsonLd.tsx           # Schema JSON-LD component
│   └── landing/            # Landing page components
│       └── HeroWorkflowVisual.tsx
├── lib/                     # Core business logic
│   ├── gemini.ts           # Gemini API client
│   ├── guides/             # Optimization guides (SEO/AEO/GEO)
│   ├── prompts/            # Prompt builders
│   ├── schemas/            # Zod validation schemas
│   ├── file-mode/          # CLI file handlers
│   ├── seo/                # SEO utilities
│   └── utils/              # Utility functions
├── cli/                     # CLI tools
│   └── index.js            # CLI entry point
├── input/                   # Example input files
├── output/                  # Generated output files
├── public/                  # Static assets
├── docs/                    # Documentation
├── scripts/                 # Utility scripts
└── package.json
```

---

## Development Workflow

### Running the Application

**Development mode:**
```bash
npm run dev
```

**Production build:**
```bash
npm run build
npm start
```

**Linting:**
```bash
npm run lint
```

### CLI Mode

**Generate new blog from file:**
```bash
cp input/new-blog.example.json input/new-blog.json
# Edit new-blog.json with your content
npm run generate
```

**Optimize existing blog:**
```bash
cp input/existing-blog.example.md input/existing-blog.md
# Paste your blog content
cp input/optimize-config.example.json input/optimize-config.json
# Fill in configuration
npm run optimize:file
```

---

## Coding Standards

### TypeScript

- Use strict mode (already configured in `tsconfig.json`)
- Define interfaces/types for all data structures
- Avoid `any` type - use proper typing
- Use type inference where appropriate
- Export types for reuse

**Example:**
```typescript
// Good
interface BlogInput {
  title: string;
  keyword: string;
  audience: string;
}

function generateBlog(input: BlogInput): Promise<BlogOutput> {
  // ...
}

// Bad
function generateBlog(input: any): Promise<any> {
  // ...
}
```

### React Components

- Use functional components with hooks
- Define prop interfaces
- Use TypeScript for props
- Keep components focused and small
- Use `React.memo` for performance when needed

**Example:**
```typescript
// Good
interface BlogFormProps {
  onSubmit: (data: BlogInput) => void;
  initialValues?: Partial<BlogInput>;
}

export function BlogForm({ onSubmit, initialValues }: BlogFormProps) {
  // Component logic
}

// Bad
export function BlogForm(props: any) {
  // Component logic
}
```

### File Naming

- Components: PascalCase (`BlogForm.tsx`)
- Utilities: camelCase (`download.ts`)
- Types: PascalCase with `.types.ts` suffix if separate
- Schemas: kebab-case with `-schema.ts` suffix (`blog-input-schema.ts`)

### Import Organization

```typescript
// 1. React/Next.js imports
import { useState } from 'react';
import { NextResponse } from 'next/server';

// 2. Third-party imports
import { z } from 'zod';

// 3. Internal imports (absolute paths with @ alias)
import { BlogInputSchema } from '@/lib/schemas/blog-input-schema';
import { buildCreateBlogPrompt } from '@/lib/prompts/create-blog';
```

### Error Handling

- Use try-catch for async operations
- Return proper HTTP status codes in API routes
- Log errors with context
- Provide user-friendly error messages

**Example:**
```typescript
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Process request
    return NextResponse.json({ data: result });
  } catch (error) {
    console.error('[api-route] error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Testing

### Current Testing Approach

- Manual testing via web interface
- CLI mode testing
- Schema validation via Zod

### Adding Tests (Recommended)

**Unit Tests:**
```bash
npm install --save-dev vitest @testing-library/react @testing-library/jest-dom
```

Create test files alongside source files:
```
lib/
├── prompts/
│   ├── create-blog.ts
│   └── create-blog.test.ts
```

**Example test:**
```typescript
import { describe, it, expect } from 'vitest';
import { buildCreateBlogPrompt } from './create-blog';

describe('buildCreateBlogPrompt', () => {
  it('should include SEO guide in prompt', async () => {
    const input = {
      title: 'Test',
      keyword: 'test',
      audience: 'developers',
      searchIntent: 'informational'
    };
    const prompt = await buildCreateBlogPrompt(input);
    expect(prompt).toContain('SEO');
  });
});
```

**E2E Tests:**
```bash
npm install --save-dev @playwright/test
```

---

## Adding New Features

### 1. Adding a New Optimization Guide

Create a new guide in `lib/guides/`:

```bash
touch lib/guides/new-optimization-guide.md
```

Reference it in the prompt builder:

```typescript
// lib/prompts/create-blog.ts
import seoGuide from '@/lib/guides/seo-optimization-guide.md';
import newGuide from '@/lib/guides/new-optimization-guide.md';

export async function buildCreateBlogPrompt(input: BlogInput) {
  return `
${seoGuide}

${newGuide}

User Input:
${JSON.stringify(input, null, 2)}
  `;
}
```

### 2. Adding a New API Endpoint

Create the route in `app/api/`:

```bash
mkdir app/api/new-endpoint
touch app/api/new-endpoint/route.ts
```

```typescript
// app/api/new-endpoint/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Process request
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### 3. Adding a New Component

Create the component in `components/`:

```bash
touch components/NewComponent.tsx
```

```typescript
interface NewComponentProps {
  title: string;
  onAction: () => void;
}

export function NewComponent({ title, onAction }: NewComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
      <button onClick={onAction}>Action</button>
    </div>
  );
}
```

### 4. Adding a New Schema

Create the schema in `lib/schemas/`:

```bash
touch lib/schemas/new-schema.ts
```

```typescript
import { z } from 'zod';

export const NewSchema = z.object({
  field1: z.string().min(1),
  field2: z.number().min(0),
  field3: z.array(z.string()).optional(),
});

export type NewInput = z.infer<typeof NewSchema>;
```

---

## Debugging

### Development Logging

The app includes development logging for API routes:

```typescript
if (process.env.NODE_ENV === 'development') {
  console.log('[route-name] debug info:', data);
}
```

View logs in your terminal when running `npm run dev`.

### Debugging Gemini Responses

Set `NODE_ENV=development` to see:
- Raw Gemini responses
- Prompt feedback
- Safety ratings
- Finish reasons
- Schema validation errors

### Common Debugging Scenarios

**Gemini returns invalid JSON:**
- Check if response is truncated (reduce word count)
- Check if response is markdown-wrapped (parser handles this)
- Check if response was blocked by safety filters

**Schema validation fails:**
- Check schema definition in `lib/schemas/`
- Compare with actual Gemini response
- Adjust schema or prompt as needed

**API key issues:**
- Verify `GEMINI_API_KEY` in `.env.local`
- Check API key is valid in Google AI Studio
- Ensure key has sufficient quota

---

## Performance Optimization

### Client-Side

- Use `React.memo` for expensive components
- Implement code splitting with `dynamic` imports
- Optimize images with Next.js Image component
- Minimize re-renders with proper dependency arrays

**Example:**
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(
  () => import('@/components/HeavyComponent'),
  { loading: () => <div>Loading...</div> }
);
```

### Server-Side

- Cache optimization guides (already loaded from disk)
- Implement response caching for repeated requests
- Use streaming for large responses
- Optimize Gemini prompt length

### Bundle Size

- Analyze bundle: `npm run build` (shows bundle sizes)
- Remove unused dependencies
- Use tree-shaking friendly imports
- Lazy load non-critical components

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `GEMINI_MODEL`: `gemini-2.5-flash`
4. Deploy

**Demo Deployment (without API key):**
- Don't add `GEMINI_API_KEY`
- App will deploy but show "demo only" message
- Users must clone and add their own key

### Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t omnisearch-ai .
docker run -p 3000:3000 -e GEMINI_API_KEY=your_key omnisearch-ai
```

### Self-Hosted

```bash
npm run build
npm start
```

Use a process manager like PM2:

```bash
npm install -g pm2
pm2 start npm --name "omnisearch-ai" -- start
```

---

## Environment Variables

### Required

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Optional

```env
GEMINI_MODEL=gemini-2.5-flash
NODE_ENV=development
```

### Never Commit

- `.env.local` (local development)
- `.env.production` (production secrets)
- Any file with actual API keys

---

## Git Workflow

### Branch Naming

- `feature/new-feature`
- `fix/bug-fix`
- `docs/documentation-update`
- `refactor/code-refactor`

### Commit Messages

Follow conventional commits:

```
feat: add new optimization guide
fix: resolve JSON parsing error
docs: update API documentation
refactor: improve prompt builder
test: add unit tests for schemas
```

### Pull Request Process

1. Create feature branch
2. Make changes and commit
3. Push to GitHub
4. Create pull request
5. Describe changes in PR description
6. Request review
7. Address feedback
8. Merge after approval

---

## Code Review Checklist

- [ ] Code follows TypeScript best practices
- [ ] Components are properly typed
- [ ] Error handling is implemented
- [ ] No console.log in production code
- [ ] Environment variables are not hardcoded
- [ ] Schemas are defined for new inputs/outputs
- [ ] Documentation is updated
- [ ] Tests are added (if applicable)
- [ ] Bundle size impact is considered
- [ ] Accessibility is maintained

---

## Common Issues and Solutions

### Issue: "Module not found" error

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: TypeScript errors in VS Code

**Solution:**
- Reload TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
- Ensure `@types/*` packages are installed

### Issue: Styles not applying

**Solution:**
- Check Tailwind CSS is configured
- Verify class names are correct
- Check if CSS file is imported

### Issue: Gemini API rate limits

**Solution:**
- Check your API key quota in Google AI Studio
- Implement request queuing
- Add rate limiting in API routes

---

## Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zod Documentation](https://zod.dev/)
- [Gemini API Documentation](https://ai.google.dev/docs)

### Tools
- [React Hook Form](https://react-hook-form.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [react-markdown](https://github.com/remarkjs/react-markdown)

### Community
- [GitHub Issues](https://github.com/hassanrrraza/omnisearch-ai/issues)
- [GitHub Discussions](https://github.com/hassanrrraza/omnisearch-ai/discussions)
- [Contributing Guide](../CONTRIBUTING.md)

---

## Getting Help

If you encounter issues:

1. Check existing [GitHub Issues](https://github.com/hassanrrraza/omnisearch-ai/issues)
2. Review this documentation
3. Check the [README](../README.md)
4. Create a new issue with:
   - Clear description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (Node version, OS, etc.)

---

## License

By contributing to OmniSearch AI, you agree that your contributions will be licensed under the MIT License.
