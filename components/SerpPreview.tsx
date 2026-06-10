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
  const displayTitle =
    seoTitle.length > 65 ? `${seoTitle.slice(0, 62)}...` : seoTitle;

  return (
    <section className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <p className="text-xs text-neutral-400">Search Preview</p>

      <div className="mt-4 font-[Arial,sans-serif]">
        <div className="flex items-center gap-2">
          <span className="h-3.5 w-3.5 rounded-full bg-neutral-300" />
          <div>
            <p className="text-sm text-neutral-800">{domain}</p>
            <p className="text-sm text-green-700">
              {domain} › blogs › {slug}
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-wrap items-center gap-2">
          <p className="cursor-pointer text-[20px] leading-6 text-[#1a0dab] hover:underline">
            {displayTitle}
          </p>
          {titleTooLong ? (
            <span className="text-xs font-medium text-orange-600">
              ⚠ Title too long
            </span>
          ) : null}
        </div>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-[#4d5156]">
          {metaDescription}
        </p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <p className="text-xs text-neutral-400">
            {metaDescription.length} / 160 characters
          </p>
          {metaTooLong ? (
            <span className="text-xs font-medium text-orange-600">
              ⚠ Too long
            </span>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatPill ok={!titleTooLong}>Title: {seoTitle.length} chars</StatPill>
        <StatPill ok={!metaTooLong}>
          Meta: {metaDescription.length} chars
        </StatPill>
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
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        ok ? "bg-green-50 text-green-700" : "bg-orange-50 text-orange-700"
      }`}
    >
      {children}
    </span>
  );
}
