"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import {
  BlogInputSchema,
  type BlogInput,
} from "@/lib/schemas/blog-input-schema";
import type { BlogOutput } from "@/lib/schemas/blog-output-schema";

interface BlogFormProps {
  onResult: (data: BlogOutput) => void;
  onLoading: (loading: boolean) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-slate-50";
const labelClass = "text-sm font-semibold text-slate-900";
const errorClass = "mt-1 text-sm font-medium text-red-600";
const loadingMessages = [
  "Understanding your blog idea...",
  "Mapping search intent and content structure...",
  "Optimizing for SEO, AEO, GEO, and LLM visibility...",
  "Generating metadata, FAQ, schema, and scores...",
  "Finalizing your blog package...",
];
type BlogFormValues = z.input<typeof BlogInputSchema>;

export function BlogForm({ onResult, onLoading }: BlogFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
    control,
  } = useForm<BlogFormValues, unknown, BlogInput>({
    mode: "onChange",
    resolver: zodResolver(BlogInputSchema),
    defaultValues: {
      title: "",
      mainKeyword: "",
      secondaryKeywords: "",
      targetAudience: "",
      searchIntent: "informational",
      tone: "conversational",
      industry: "",
      productMention: "",
      internalLinks: "",
      cta: "",
      wordCount: 1500,
    },
  });

  const wordCount = useWatch({ control, name: "wordCount" });
  const loadingMessage = loadingMessages[loadingMessageIndex];

  useEffect(() => {
    if (!isSubmittingBlog) {
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingMessageIndex(
        (current) => (current + 1) % loadingMessages.length
      );
    }, 4000);

    return () => window.clearInterval(interval);
  }, [isSubmittingBlog]);

  async function onSubmit(values: BlogInput) {
    setError(null);
    setLoadingMessageIndex(0);
    setIsSubmittingBlog(true);
    onLoading(true);

    try {
      const response = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, wordCount: Number(values.wordCount) }),
      });

      const payload = (await response.json()) as {
        data?: BlogOutput;
        error?: string;
        hint?: string;
      };

      if (!response.ok || !payload.data) {
        const message = payload.error ?? "Failed to generate blog.";
        throw new Error(payload.hint ? `${message} ${payload.hint}` : message);
      }

      onResult(payload.data);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while generating the blog."
      );
    } finally {
      setIsSubmittingBlog(false);
      onLoading(false);
    }
  }

  return (
    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Field
        description="Use a working title. OmniSearch AI can refine it for search intent."
        error={errors.title?.message}
        label="Blog Title"
        required
      >
        <input
          className={inputClass}
          placeholder="How to Build a SaaS with Next.js"
          type="text"
          {...register("title")}
        />
      </Field>

      <Field
        description="The primary phrase this article should rank for."
        error={errors.mainKeyword?.message}
        label="Main Keyword"
        required
      >
        <input
          className={inputClass}
          placeholder="Next.js SaaS development"
          type="text"
          {...register("mainKeyword")}
        />
      </Field>

      <Field
        error={errors.secondaryKeywords?.message}
        helpText="Comma-separated supporting terms."
        label="Secondary Keywords"
      >
        <input
          className={inputClass}
          placeholder="saas boilerplate, next.js starter, typescript saas"
          type="text"
          {...register("secondaryKeywords")}
        />
      </Field>

      <Field
        description="Who should the article help?"
        error={errors.targetAudience?.message}
        label="Target Audience"
        required
      >
        <input
          className={inputClass}
          placeholder="Startup founders, indie developers"
          type="text"
          {...register("targetAudience")}
        />
      </Field>

      <Field
        description="Choose the closest intent behind the query."
        error={errors.searchIntent?.message}
        label="Search Intent"
      >
        <select className={inputClass} {...register("searchIntent")}>
          <option value="informational">Informational</option>
          <option value="commercial">Commercial</option>
          <option value="transactional">Transactional</option>
          <option value="navigational">Navigational</option>
        </select>
      </Field>

      <Field error={errors.tone?.message} label="Tone">
        <select className={inputClass} {...register("tone")}>
          <option value="professional">Professional</option>
          <option value="conversational">Conversational</option>
          <option value="technical">Technical</option>
          <option value="beginner-friendly">Beginner-friendly</option>
        </select>
      </Field>

      <Field
        error={errors.industry?.message}
        label="Industry / Niche"
        required
      >
        <input
          className={inputClass}
          placeholder="SaaS, AI, Developer Tools"
          type="text"
          {...register("industry")}
        />
      </Field>

      <Field
        error={errors.productMention?.message}
        label="Product or Service to Mention"
      >
        <input
          className={inputClass}
          placeholder="Your product name or URL"
          type="text"
          {...register("productMention")}
        />
      </Field>

      <Field
        error={errors.internalLinks?.message}
        helpText="One URL per line. OmniSearch AI will place them naturally."
        label="Internal Links"
      >
        <textarea
          className={inputClass}
          placeholder="https://example.com/pricing"
          rows={3}
          {...register("internalLinks")}
        />
      </Field>

      <Field error={errors.cta?.message} label="Call to Action">
        <input
          className={inputClass}
          placeholder="Start your free trial at example.com"
          type="text"
          {...register("cta")}
        />
      </Field>

      <Field
        error={errors.wordCount?.message}
        helpText="Maximum 2,500 words."
        label={`Word Count: ${wordCount ?? 1500}`}
      >
        <input
          className="mt-3 w-full accent-teal-600"
          max={2500}
          min={300}
          step={100}
          type="range"
          {...register("wordCount", { valueAsNumber: true })}
        />
      </Field>

      {isSubmitted || isValid ? (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
          Estimated generation time: 20-60 seconds depending on word count.
        </p>
      ) : null}

      <button
        aria-live="polite"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isSubmittingBlog}
        type="submit"
      >
        {isSubmittingBlog ? (
          <>
            <svg
              className="h-4 w-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                d="M4 12a8 8 0 0 1 8-8v4a4 4 0 0 0-4 4H4z"
                fill="currentColor"
              />
            </svg>
            {loadingMessage}
          </>
        ) : (
          "Generate Blog"
        )}
      </button>

      {error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </form>
  );
}

interface FieldProps {
  children: React.ReactNode;
  description?: string;
  error?: string;
  helpText?: string;
  label: string;
  required?: boolean;
}

function Field({
  children,
  description,
  error,
  helpText,
  label,
  required,
}: FieldProps) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-3">
        <span className={labelClass}>
          {label}
          {required ? <span className="text-red-500"> *</span> : null}
        </span>
        {!required && !helpText ? (
          <span className="text-xs text-slate-400">optional</span>
        ) : null}
      </span>
      {description ? (
        <span className="mt-1 block text-xs leading-5 text-slate-500">
          {description}
        </span>
      ) : null}
      {children}
      {helpText ? <p className="mt-1 text-xs text-slate-500">{helpText}</p> : null}
      {error ? <p className={errorClass}>{error}</p> : null}
    </label>
  );
}
