"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { FAQS } from "@/data/faq";

/**
 * Reconstructed from the original `app/(public)/faq/page.tsx` client chunk
 * (module 31231). The whole page body was a single client component with
 * `export const dynamic = "force-dynamic"` — the page shell lives in
 * `app/(public)/faq/page.tsx`.
 *
 * Category button order follows the reference markup, not `FAQ_CATEGORIES`
 * (which is alphabetically ordered in data/faq.ts).
 */
const CATEGORIES = [
  "Getting Started",
  "Mentors",
  "Sessions & Pricing",
  "Privacy & Support",
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-neutral-200 p-4 transition hover:shadow-sm">
      <button
        className="flex w-full items-center justify-between gap-6 text-left"
        onClick={() => setOpen((e) => !e)}
        aria-expanded={open}
      >
        <span className="text-[15px] font-semibold text-neutral-900">{q}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`lucide lucide-chevron-down h-5 w-5 flex-shrink-0 transition-transform ${
            open
              ? "rotate-180 text-[var(--color-primary)]"
              : "text-neutral-500"
          }`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6"></path>
        </svg>
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-neutral-700">{a}</p>}
    </div>
  );
}

export default function FaqAccordion() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const t = query.trim().toLowerCase();
    return FAQS.filter((item) => {
      const matchCategory = category === "All" || item.category === category;
      const matchQuery =
        t.length === 0 ||
        item.question.toLowerCase().includes(t) ||
        item.answer.toLowerCase().includes(t);
      return matchCategory && matchQuery;
    });
  }, [query, category]);

  const jsonLd = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: filtered.slice(0, 25).map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
    [filtered],
  );

  return (
    <main className="relative mx-auto mt-10 w-full max-w-5xl px-4 pt-14 pb-20 sm:px-6 lg:px-8">
      <header className="mb-8 flex flex-col items-center text-center">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-700 ring-1 ring-neutral-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-question-mark h-4 w-4"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <path d="M12 17h.01"></path>
          </svg>
          Help &amp; Support
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-balance text-neutral-900 md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-pretty text-neutral-600 md:text-base">
          Everything about mentors, sessions, pricing, and privacy at a glance.
        </p>
      </header>
      <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", ...CATEGORIES].map((c) => {
            const active = category === c;
            return (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={[
                  "rounded-full px-3.5 py-1.5 text-sm font-medium ring-1 transition",
                  active
                    ? "bg-[var(--color-primary)] text-white ring-transparent"
                    : "bg-white text-neutral-700 ring-neutral-200 hover:bg-neutral-50",
                ].join(" ")}
              >
                {c}
              </button>
            );
          })}
        </div>
        <label className="group relative block w-full sm:w-80">
          <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-search h-4 w-4 text-neutral-400"
              aria-hidden="true"
            >
              <path d="m21 21-4.34-4.34"></path>
              <circle cx="11" cy="11" r="8"></circle>
            </svg>
          </span>
          <input
            type="search"
            placeholder="Search questions…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-neutral-200 bg-white py-2 pr-3 pl-9 text-sm text-neutral-900 ring-[0.5px] ring-transparent transition outline-none placeholder:text-neutral-400 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]"
          />
        </label>
      </div>
      <div className="mt-8 grid gap-4">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-neutral-200 bg-white p-6 text-center text-neutral-600">
            No results. Try a different keyword.
          </div>
        ) : (
          filtered.map((item) => (
            <FaqItem
              key={item.question}
              q={item.question}
              a={item.answer}
            />
          ))
        )}
      </div>
      <div className="mt-10 flex flex-col items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-6 text-center">
        <p className="text-sm text-neutral-700">
          Still have questions? We’re here to help.
        </p>
        <div className="flex gap-3">
          <Link
            href="/contact"
            data-slot="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-medium font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive text-white shadow-[var(--shadow-button)] h-9 px-4 py-2 has-[>svg]:px-3 bg-[var(--color-primary)] hover:bg-[#b71b21] no-underline"
          >
            Contact support
          </Link>
          <Link
            href="/mentors"
            data-slot="button"
            className="inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-medium font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border border-[var(--color-primary)] bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white h-9 px-4 py-2 has-[>svg]:px-3 no-underline"
          >
            Browse mentors
          </Link>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </main>
  );
}
