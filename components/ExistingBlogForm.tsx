"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import {
  OptimizeInputSchema,
  type OptimizeInput,
} from "@/lib/schemas/optimize-input-schema";
import type { OptimizeOutput } from "@/lib/schemas/optimize-output-schema";

interface ExistingBlogFormProps {
  onResult: (data: OptimizeOutput, original: string) => void;
  onLoading: (loading: boolean) => void;
}

const inputClass =
  "mt-2 w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 disabled:cursor-not-allowed disabled:bg-slate-50";
const labelClass = "text-sm font-semibold text-slate-900";
const errorClass = "mt-1 text-sm font-medium text-red-600";
const loadingMessages = [
  "Analyzing your existing blog...",
  "Improving structure, headings, and search intent...",
  "Optimizing for SEO, AEO, GEO, and LLM visibility...",
  "Generating metadata, FAQ, schema, and scoring report...",
  "Finalizing your optimized article...",
];
type OptimizeFormValues = z.input<typeof OptimizeInputSchema>;

export function ExistingBlogForm({
  onLoading,
  onResult,
}: ExistingBlogFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, isValid },
    control,
  } = useForm<OptimizeFormValues, unknown, OptimizeInput>({
    mode: "onChange",
    resolver: zodResolver(OptimizeInputSchema),
    defaultValues: {
      existingBlog: "",
      mainKeyword: "",
      targetAudience: "",
      optimizationGoal: "full-optimization",
      brandTone: "conversational",
      internalLinks: "",
      cta: "",
      notes: "",
    },
  });

  const existingBlog = useWatch({ control, name: "existingBlog" }) ?? "";
  const loadingMessage = loadingMessages[loadingMessageIndex];

  useEffect(() => {
    if (!isOptimizing) {
      return;
    }

    const interval = window.setInterval(() => {
      setLoadingMessageIndex(
        (current) => (current + 1) % loadingMessages.length
      );
    }, 4500);

    return () => window.clearInterval(interval);
  }, [isOptimizing]);

  async function onSubmit(values: OptimizeInput) {
    setError(null);
    setLoadingMessageIndex(0);
    setIsOptimizing(true);
    onLoading(true);

    try {
      const response = await fetch("/api/optimize-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const payload = (await response.json()) as {
        data?: OptimizeOutput;
        error?: string;
        hint?: string;
      };

      if (!response.ok || !payload.data) {
        const message = payload.error ?? "Failed to optimize blog.";
        throw new Error(payload.hint ? `${message} ${payload.hint}` : message);
      }

      onResult(payload.data, values.existingBlog);
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Something went wrong while optimizing the blog."
      );
    } finally {
      setIsOptimizing(false);
      onLoading(false);
    }
  }

  return (
    <form className="mt-5 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Field
        description="Paste the article you want to improve. Markdown is welcome."
        error={errors.existingBlog?.message}
        label="Existing Blog Post"
        required
      >
        <textarea
          className={`${inputClass} min-h-80 resize-y leading-6`}
          minLength={100}
          placeholder="Paste your existing blog post here..."
          rows={14}
          {...register("existingBlog")}
        />
        <p className="mt-1 text-xs text-slate-500">
          {existingBlog.length.toLocaleString()} / 20,000 characters
        </p>
        <p className="mt-2 rounded-lg bg-teal-50 px-3 py-2 text-xs leading-5 text-teal-900">
          For best results, paste blogs up to 2,500 words. Longer articles may
          take more time because OmniSearch AI processes optimization and
          reporting in separate steps.
        </p>
      </Field>

      <Field
        description="The primary phrase the optimized article should target."
        error={errors.mainKeyword?.message}
        label="Main Keyword"
        required
      >
        <input
          className={inputClass}
          placeholder="The primary keyword you want to rank for"
          type="text"
          {...register("mainKeyword")}
        />
      </Field>

      <Field
        description="Who should the improved article help?"
        error={errors.targetAudience?.message}
        label="Target Audience"
        required
      >
        <input
          className={inputClass}
          placeholder="e.g. startup founders, Python developers"
          type="text"
          {...register("targetAudience")}
        />
      </Field>

      <Field
        description="Choose the main outcome for this optimization run."
        error={errors.optimizationGoal?.message}
        label="Optimization Goal"
        required
      >
        <select className={inputClass} {...register("optimizationGoal")}>
          <option value="improve-seo-ranking">Improve SEO rankings</option>
          <option value="target-ai-overviews">
            Target AI Overviews and answer boxes
          </option>
          <option value="improve-readability">
            Improve readability and structure
          </option>
          <option value="full-optimization">
            Full optimization: SEO, AEO, GEO, and LLM
          </option>
        </select>
      </Field>

      <Field error={errors.brandTone?.message} label="Brand Tone">
        <select className={inputClass} {...register("brandTone")}>
          <option value="professional">Professional</option>
          <option value="conversational">Conversational</option>
          <option value="technical">Technical</option>
          <option value="beginner-friendly">Beginner-friendly</option>
        </select>
      </Field>

      <Field
        error={errors.internalLinks?.message}
        helpText="One URL per line. Links are included only when they fit naturally."
        label="Internal Links"
      >
        <textarea
          className={inputClass}
          placeholder="https://example.com/product"
          rows={3}
          {...register("internalLinks")}
        />
      </Field>

      <Field error={errors.cta?.message} label="Call to Action">
        <input
          className={inputClass}
          placeholder="e.g. Try OmniSearch AI free on GitHub"
          type="text"
          {...register("cta")}
        />
      </Field>

      <Field error={errors.notes?.message} label="Additional Notes">
        <textarea
          className={inputClass}
          placeholder="Any must-keep sections, tone notes, or publishing constraints"
          rows={3}
          {...register("notes")}
        />
      </Field>

      {isSubmitted || isValid ? (
        <p className="rounded-lg bg-slate-50 px-3 py-2 text-center text-xs text-slate-500">
          Estimated optimization time: 30-90 seconds for longer articles.
        </p>
      ) : null}

      <button
        aria-live="polite"
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={isOptimizing}
        type="submit"
      >
        {isOptimizing ? (
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
          "Optimize Blog"
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
