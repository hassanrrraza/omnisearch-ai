"use client";

import { useState } from "react";
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
  "mt-2 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-950 outline-none transition focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10";
const labelClass = "text-sm font-medium text-neutral-900";
const errorClass = "mt-1 text-sm text-red-500";
type BlogFormValues = z.input<typeof BlogInputSchema>;

export function BlogForm({ onResult, onLoading }: BlogFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isSubmittingBlog, setIsSubmittingBlog] = useState(false);

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

  async function onSubmit(values: BlogInput) {
    setError(null);
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
      };

      if (!response.ok || !payload.data) {
        throw new Error(payload.error ?? "Failed to generate blog.");
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
    <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <Field label="Blog Title" error={errors.title?.message} required>
        <input
          className={inputClass}
          placeholder="How to Build a SaaS with Next.js"
          type="text"
          {...register("title")}
        />
      </Field>

      <Field label="Main Keyword" error={errors.mainKeyword?.message} required>
        <input
          className={inputClass}
          placeholder="Next.js SaaS development"
          type="text"
          {...register("mainKeyword")}
        />
      </Field>

      <Field
        label="Secondary Keywords"
        error={errors.secondaryKeywords?.message}
        helpText="Comma-separated"
      >
        <input
          className={inputClass}
          placeholder="saas boilerplate, next.js starter, typescript saas"
          type="text"
          {...register("secondaryKeywords")}
        />
      </Field>

      <Field
        label="Target Audience"
        error={errors.targetAudience?.message}
        required
      >
        <input
          className={inputClass}
          placeholder="startup founders, indie developers"
          type="text"
          {...register("targetAudience")}
        />
      </Field>

      <Field label="Search Intent" error={errors.searchIntent?.message}>
        <select className={inputClass} {...register("searchIntent")}>
          <option value="informational">informational</option>
          <option value="commercial">commercial</option>
          <option value="transactional">transactional</option>
          <option value="navigational">navigational</option>
        </select>
      </Field>

      <Field label="Tone" error={errors.tone?.message}>
        <select className={inputClass} {...register("tone")}>
          <option value="professional">professional</option>
          <option value="conversational">conversational</option>
          <option value="technical">technical</option>
          <option value="beginner-friendly">beginner-friendly</option>
        </select>
      </Field>

      <Field label="Industry / Niche" error={errors.industry?.message} required>
        <input
          className={inputClass}
          placeholder="SaaS, AI, Developer Tools"
          type="text"
          {...register("industry")}
        />
      </Field>

      <Field
        label="Product or Service to Mention"
        error={errors.productMention?.message}
      >
        <input
          className={inputClass}
          placeholder="Your product name or URL"
          type="text"
          {...register("productMention")}
        />
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
          placeholder="Start your free trial at example.com"
          type="text"
          {...register("cta")}
        />
      </Field>

      <Field
        label={`Word Count: ${wordCount ?? 1500}`}
        error={errors.wordCount?.message}
      >
        <input
          className="mt-3 w-full accent-neutral-900"
          max={2500}
          min={300}
          step={100}
          type="range"
          {...register("wordCount", { valueAsNumber: true })}
        />
      </Field>

      {isSubmitted || isValid ? (
        <p className="text-center text-xs text-neutral-400">
          ⏱ Estimated generation time: 15-30 seconds
        </p>
      ) : null}

      <button
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
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
            Generating...
          </>
        ) : (
          "✦ Generate Optimized Blog"
        )}
      </button>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </form>
  );
}

interface FieldProps {
  children: React.ReactNode;
  error?: string;
  helpText?: string;
  label: string;
  required?: boolean;
}

function Field({ children, error, helpText, label, required }: FieldProps) {
  return (
    <label className="block">
      <span className={labelClass}>
        {label}
        {required ? <span className="text-red-500"> *</span> : null}
        {!required && !helpText ? (
          <span className="text-neutral-400"> optional</span>
        ) : null}
      </span>
      {children}
      {helpText ? <p className="mt-1 text-xs text-neutral-500">{helpText}</p> : null}
      {error ? <p className={errorClass}>{error}</p> : null}
    </label>
  );
}
