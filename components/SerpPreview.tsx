"use client";

interface SerpPreviewProps {
  seoTitle: string;
  metaDescription: string;
  slug: string;
  domain?: string;
}

export function SerpPreview({
  domain = "yourdomain.com",
  metaDescription,
  seoTitle,
  slug,
}: SerpPreviewProps) {
  const titleTooLong = seoTitle.length > 65;
  const metaTooLong = metaDescription.length > 160;
  const cleanSlug = slug.replace(/^\/+/, "");

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-950">SERP Preview</p>
          <p className="mt-1 text-xs text-slate-500">
            A lightweight search-result style preview for your metadata.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <StatPill ok={!titleTooLong}>Title {seoTitle.length}/65</StatPill>
          <StatPill ok={!metaTooLong}>
            Meta {metaDescription.length}/160
          </StatPill>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-100 bg-slate-50/80 p-4 font-[Arial,sans-serif]">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-600">
            {domain.slice(0, 1).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm text-slate-800">{domain}</p>
            <p className="break-words text-xs leading-5 text-emerald-700">
              {domain} / blog / {cleanSlug || "optimized-post"}
            </p>
          </div>
        </div>

        <p className="mt-3 break-words text-xl leading-7 text-blue-700">
          {seoTitle}
        </p>
        <p className="mt-1 break-words text-sm leading-6 text-slate-600">
          {metaDescription}
        </p>
      </div>
    </section>
  );
}

function StatPill({
  children,
  ok,
}: {
  children: React.ReactNode;
  ok: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        ok ? "bg-teal-50 text-teal-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {children}
    </span>
  );
}
