"use client";

import { useState } from "react";
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
  "mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-950 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10";
const labelClass = "text-sm font-medium text-neutral-900";
const errorClass = "mt-1 text-sm text-red-500";
type OptimizeFormValues = z.input<typeof OptimizeInputSchema>;

export function ExistingBlogForm({
  onLoading,
  onResult,
}: ExistingBlogFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isOptimizing, setIsOptimizing] = useState(false);

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

  async function onSubmit(values: OptimizeInput) {
    setError(null);
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
      };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error ?? "Failed to optimize blog.");
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
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Existing Blog Post" error={errors.existingBlog?.message} required>
        <textarea
          className={inputClass}
          minLength={100}
          placeholder="Paste your existing blog post here..."
          rows={12}
          {...register("existingBlog")}
        />
        <p className="mt-1 text-xs text-neutral-500">
          {existingBlog.length.toLocaleString()} / 20,000 characters
        </p>
      </Field>

      <Field label="Main Keyword" error={errors.mainKeyword?.message} required>
        <input
          className={inputClass}
          placeholder="The primary keyword you want to rank for"
          type="text"
          {...register("mainKeyword")}
        />
      </Field>

      <Field
        label="Target Audience"
        error={errors.targetAudience?.message}
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
        label="Optimization Goal"
        error={errors.optimizationGoal?.message}
        required
      >
        <select className={inputClass} {...register("optimizationGoal")}>
          <option value="improve-seo-ranking">Improve SEO Rankings</option>
          <option value="target-ai-overviews">
            Target AI Overviews & Answer Boxes
          </option>
          <option value="improve-readability">
            Improve Readability & Structure
          </option>
          <option value="full-optimization">
            Full Optimization (SEO + AEO + GEO + LLM)
          </option>
        </select>
      </Field>

      <Field label="Brand Tone" error={errors.brandTone?.message}>
        <select className={inputClass} {...register("brandTone")}>
          <option value="professional">professional</option>
          <option value="conversational">conversational</option>
          <option value="technical">technical</option>
          <option value="beginner-friendly">beginner-friendly</option>
        </select>
      </Field>

      <Field label="Internal Links" error={errors.internalLinks?.message}>
        <textarea
          className={inputClass}
          placeholder="One URL per line"
          rows={3}
          {...register("internalLinks")}
        />
      </Field>

      <Field label="Call to Action" error={errors.cta?.message}>
        <input
          className={inputClass}
          placeholder="e.g. Try OmniSearch AI free on GitHub"
          type="text"
          {...register("cta")}
        />
      </Field>

      <Field label="Additional Notes" error={errors.notes?.message}>
        <textarea
          className={inputClass}
          placeholder="Any specific instructions or context for the optimizer"
          rows={2}
          {...register("notes")}
        />
      </Field>

      {isSubmitted || isValid ? (
        <p className="text-center text-xs text-neutral-400">
          ⏱ Estimated optimization time: 20-40 seconds
        </p>
      ) : null}

      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
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
            Optimizing...
          </>
        ) : (
          "✦ Optimize My Blog"
        )}
      </button>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </form>
  );
}

interface FieldProps {
  children: React.ReactNode;
  error?: string;
  label: string;
  required?: boolean;
}

function Field({ children, error, label, required }: FieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
        {!required ? <span className="text-neutral-400"> optional</span> : null}
      </span>
      {children}
      {error ? <p className={errorClass}>{error}</p> : null}
    </label>
  );
}
