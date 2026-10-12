"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRightIcon } from "@/components/home/icons";

/**
 * "AbroadMates by Countries" link grid (reference module 71783).
 *
 * The original client component received the full country list from the
 * server component; the first render (what the scrape captured) shows
 * only countries before the first "H…" entry, with a toggle revealing
 * the rest. Route shape matches the original: /study-in-<slug> (kept as
 * clean /study-in/<slug> routes in this reconstruction).
 */

const COUNTRIES = [
  "Australia",
  "Austria",
  "Bangladesh",
  "Belgium",
  "Canada",
  "China",
  "Czech Republic",
  "Denmark",
  "Estonia",
  "Finland",
  "France",
  "Germany",
  "Hong Kong SAR, China",
  "Hungary",
  "India",
  "Ireland",
  "Italy",
  "Japan",
  "Kazakhstan",
  "Lithuania",
  "Malaysia",
  "Netherlands",
  "New Zealand",
  "Norway",
  "Poland",
  "Portugal",
  "Qatar",
  "Russia",
  "South Korea",
  "Spain",
  "Sweden",
  "Taiwan",
  "Thailand",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
];

/** Slugify exactly like the original site (module 72259). */
function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function CountriesGrid() {
  const [expanded, setExpanded] = useState(false);

  const { initial, rest, expandLabel } = useMemo(() => {
    const hIndex = COUNTRIES.findIndex((c) => /^H/i.test(c.trim()));
    if (hIndex > 0) {
      return {
        initial: COUNTRIES.slice(0, hIndex),
        rest: COUNTRIES.slice(hIndex),
        expandLabel: 'Countries Named with "H" Onwards',
      };
    }
    const limit = Math.min(12, COUNTRIES.length);
    return {
      initial: COUNTRIES.slice(0, limit),
      rest: COUNTRIES.slice(limit),
      expandLabel: "More countries",
    };
  }, []);

  const shown = expanded ? COUNTRIES : initial;
  const hasRest = rest.length > 0;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
        {shown.map((country) => (
          <Link
            key={country}
            href={`/study-in/${slugify(country)}`}
            className="group block w-full text-left"
          >
            <div className="flex min-h-[60px] items-center justify-center gap-3 rounded-lg border-2 bg-(--color-accent) px-3 py-3 text-center transition-transform duration-300 hover:scale-105 hover:bg-white sm:min-h-[70px] md:min-h-[80px]">
              <h3 className="font-brand text-sm font-bold text-black sm:text-base md:text-lg">
                {country}
                Mates
              </h3>
              <ArrowRightIcon className="text-black transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
      {hasRest ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="text-sm sm:text-base font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary sm:underline-offset-8"
            aria-expanded={expanded}
          >
            {expanded ? "Show less" : `${expandLabel} →`}
          </button>
        </div>
      ) : null}
    </>
  );
}
