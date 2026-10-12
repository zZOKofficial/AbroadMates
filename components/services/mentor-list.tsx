"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { MENTORS, type Mentor } from "@/data/mentors";
import { SCHOLARSHIPS } from "@/data/scholarships";
import { TOPIC_DESCRIPTIONS } from "@/data/topics";
import MentorCard from "./mentor-card";
import { mentorCountry } from "./format";

/**
 * Mentor directory list - ported from the original shared chunk
 * (chunk 6231, module 22066) plus the pieces it imported:
 *   u          MultiSelect (Country / Service)
 *   83624      Select (Program / Scholarship)
 *   w          desktop filter row
 *   j          mobile filter drawer (originally portal'd to document.body)
 *   40911      three bouncing dots loader
 *   72259 (_7) mentor profile href ("/<slug>")
 *
 * Faithful to the "service" mode this page uses. Two original dependencies are
 * gone and documented below:
 *   - `/api/catalog/mentors` and `/api/mentors/next-available-slots` died with
 *     the site, so the list falls back to `data/mentors.ts` (filtered by
 *     `lockedService`) and the slot column falls back to "No slots available";
 *   - the "Saved Mentors" tab / auth context (`useAuth`) needed a live session
 *     API and is omitted (it only rendered for mode="all").
 * Because `/mentors` itself is not part of this rebuild, changing Country or
 * Service filters narrows the list in place instead of pushing
 * `/mentors?country=...` like the original did.
 */

const PAGE_SIZE = 12;
const DEFAULT_SUBHEADING =
  "Find the mentors you want to talk to by searching based on country, university, program, or the kind of guidance you need.";

type FilterOptions = {
  countries: string[];
  services: string[];
  programs: string[];
  scholarships: string[];
};

const EMPTY_FILTERS: FilterOptions = {
  countries: [],
  services: [],
  programs: [],
  scholarships: [],
};

// ---------------------------------------------------------------------------
// Icons (original: modules 74233, 70898, 66630, 65229 + the inline checkmark)
// ---------------------------------------------------------------------------

function ChevronGlyph({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M294.1 256L167 129c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.3 34 0L345 239c9.1 9.1 9.3 23.7.7 33.1L201.1 417c-4.7 4.7-10.9 7-17 7s-12.3-2.3-17-7c-9.4-9.4-9.4-24.6 0-33.9l127-127.1z" />
    </svg>
  );
}

function SearchGlyph({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={size}
      height={size}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
    </svg>
  );
}

function ResetGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      width={24}
      height={24}
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M212.333 224.333H12c-6.627 0-12-5.373-12-12V12C0 5.373 5.373 0 12 0h48c6.627 0 12 5.373 12 12v78.112C117.773 39.279 184.26 7.47 258.175 8.007c136.906.994 246.448 111.623 246.157 248.532C504.041 393.258 393.12 504 256.333 504c-64.089 0-122.496-24.313-166.51-64.215-5.099-4.622-5.334-12.554-.467-17.42l33.967-33.967c4.474-4.474 11.662-4.717 16.401-.525C170.76 415.336 211.58 432 256.333 432c97.268 0 176-78.716 176-176 0-97.267-78.716-176-176-176-58.496 0-110.28 28.476-142.274 72.333h98.274c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12z" />
    </svg>
  );
}

function SlidersGlyph({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="21" x2="14" y1="4" y2="4" />
      <line x1="10" x2="3" y1="4" y2="4" />
      <line x1="21" x2="12" y1="12" y2="12" />
      <line x1="8" x2="3" y1="12" y2="12" />
      <line x1="21" x2="16" y1="20" y2="20" />
      <line x1="12" x2="3" y1="20" y2="20" />
      <line x1="14" x2="14" y1="2" y2="6" />
      <line x1="8" x2="8" y1="10" y2="14" />
      <line x1="16" x2="16" y1="18" y2="22" />
    </svg>
  );
}

function CloseGlyph({ size = 24, className }: { size?: number; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function CheckGlyph({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// 40911 - three bouncing dots
function LoadingDots() {
  return (
    <div className="flex flex-row gap-2">
      <div className="h-4 w-4 animate-bounce rounded-full bg-red-500" />
      <div className="h-4 w-4 animate-bounce rounded-full bg-red-500 [animation-delay:-.3s]" />
      <div className="h-4 w-4 animate-bounce rounded-full bg-red-500 [animation-delay:-.5s]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Filter controls
// ---------------------------------------------------------------------------

function MultiSelect({
  label,
  options,
  selected = [],
  onChange,
  placeholder = "Select options",
  className,
  compact = false,
}: {
  label?: string;
  options: string[];
  selected?: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocumentDown(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", onDocumentDown);
    return () => document.removeEventListener("mousedown", onDocumentDown);
  }, [open]);

  const value =
    selected.length === 0
      ? placeholder
      : selected.length === 1
        ? selected[0]
        : `${selected.length} Selected`;

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative flex w-full min-w-0 flex-col sm:w-46 sm:max-w-46",
        className,
      )}
    >
      {label ? (
        <label
          className={cn(
            "mb-1 text-sm font-medium text-gray-700",
            compact && "mb-0.5 text-xs sm:mb-1 sm:text-sm",
          )}
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex w-full min-w-0 items-center">
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          title={value}
          className={cn(
            "flex w-full min-w-0 items-center justify-between gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-left text-sm text-gray-700 shadow-sm transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none",
            compact &&
              "py-1.5 px-3 pr-9 text-xs sm:py-2 sm:px-4 sm:pr-10 sm:text-sm",
          )}
        >
          <span className="min-w-0 truncate">{value}</span>
        </button>
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600 transition-transform duration-200",
            open && "rotate-90",
            compact && "right-2 sm:right-3",
          )}
        >
          <ChevronGlyph size={compact ? 16 : 18} />
        </span>
        {open ? (
          <div className="absolute top-full left-0 z-50 mt-1 max-h-60 w-full min-w-50 overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg focus:outline-none sm:w-auto">
            <div className="px-4 py-1.5 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 sticky top-0 bg-white z-10 border-b border-gray-100">
              Select multiple options
            </div>
            {options.length === 0 ? (
              <div className="px-4 py-2 text-xs text-gray-500">
                No options available
              </div>
            ) : (
              options.map((option) => {
                const isSelected = selected.includes(option);
                return (
                  <div
                    key={option}
                    onClick={() =>
                      onChange(
                        isSelected
                          ? selected.filter((value) => value !== option)
                          : [...selected, option],
                      )
                    }
                    className={cn(
                      "flex cursor-pointer items-center justify-between px-4 py-2 text-sm transition-colors",
                      isSelected
                        ? "bg-primary/5 text-primary font-medium"
                        : "text-gray-700 hover:bg-gray-50",
                    )}
                  >
                    <span className="select-none truncate">{option}</span>
                    {isSelected ? (
                      <CheckGlyph className="ml-2 h-4 w-4 shrink-0 text-primary" />
                    ) : null}
                  </div>
                );
              })
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

function SelectControl({
  label,
  options,
  value,
  onChange,
  placeholder = "Select an option",
  className,
  compact = false,
}: {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  compact?: boolean;
}) {
  const [rotated, setRotated] = useState(false);
  return (
    <div
      className={cn(
        "relative flex w-full min-w-0 flex-col sm:w-46 sm:max-w-46",
        className,
      )}
    >
      {label ? (
        <label
          className={cn(
            "mb-1 text-sm font-medium text-gray-700",
            compact && "mb-0.5 text-xs sm:mb-1 sm:text-sm",
          )}
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex w-full min-w-0 items-center">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onClick={() => setRotated((prev) => !prev)}
          onBlur={() => setRotated(false)}
          title={value || placeholder}
          className={cn(
            "w-full min-w-0 max-w-full appearance-none truncate rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none",
            compact &&
              "py-1.5 px-3 pr-9 text-xs sm:py-2 sm:px-4 sm:pr-10 sm:text-sm",
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          className={cn(
            "pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-600 transition-transform duration-200",
            rotated && "rotate-90",
            compact && "right-2 sm:right-3",
          )}
        >
          <ChevronGlyph size={compact ? 16 : 18} />
        </span>
      </div>
    </div>
  );
}

// module w - the four filter fields
function FilterFields({
  filters,
  country,
  service,
  program,
  scholarship,
  onCountryChange,
  onServiceChange,
  onProgramChange,
  onScholarshipChange,
  compact = false,
  className,
}: {
  filters: FilterOptions;
  country: string;
  service: string;
  program: string;
  scholarship: string;
  onCountryChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onProgramChange: (value: string) => void;
  onScholarshipChange: (value: string) => void;
  compact?: boolean;
  className?: string;
}) {
  const selectedCountries = country ? country.split(",").filter(Boolean) : [];
  const selectedServices = service ? service.split(",").filter(Boolean) : [];
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <MultiSelect
        compact={compact}
        label="Country"
        options={filters.countries}
        selected={selectedCountries}
        onChange={(value) => onCountryChange(value.join(","))}
        placeholder="All Countries"
      />
      <MultiSelect
        compact={compact}
        label="Service"
        options={filters.services}
        selected={selectedServices}
        onChange={(value) => onServiceChange(value.join(","))}
        placeholder="All Services"
      />
      <SelectControl
        compact={compact}
        label="Program"
        options={filters.programs}
        value={program}
        onChange={onProgramChange}
        placeholder="All Programs"
      />
      <SelectControl
        compact={compact}
        label="Scholarship"
        options={filters.scholarships}
        value={scholarship === "true" ? "" : scholarship}
        onChange={onScholarshipChange}
        placeholder="All Scholarships"
      />
    </div>
  );
}

// module j - mobile filter drawer (sm:hidden)
function FilterDrawer({
  open,
  onOpenChange,
  filters,
  country,
  service,
  program,
  scholarship,
  onCountryChange,
  onServiceChange,
  onProgramChange,
  onScholarshipChange,
  onReset,
  hasActiveFilters,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: FilterOptions;
  country: string;
  service: string;
  program: string;
  scholarship: string;
  onCountryChange: (value: string) => void;
  onServiceChange: (value: string) => void;
  onProgramChange: (value: string) => void;
  onScholarshipChange: (value: string) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onOpenChange]);

  if (!open || !mounted) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close filters"
        className="fixed inset-0 z-60 h-dvh w-full bg-black/40 sm:hidden"
        onClick={() => onOpenChange(false)}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-list-filters-title"
        className="fixed top-0 right-0 z-61 flex h-dvh w-[65%] max-h-dvh flex-col overflow-hidden bg-white shadow-2xl sm:hidden"
      >
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-4 py-4">
          <div>
            <h2
              id="mentor-list-filters-title"
              className="text-base font-semibold text-gray-900"
            >
              Filters
            </h2>
            <p className="text-xs text-gray-500">
              Refine mentors by country, service, and more
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close filters"
          >
            <CloseGlyph size={18} />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          <FilterFields
            filters={filters}
            country={country}
            service={service}
            program={program}
            scholarship={scholarship}
            onCountryChange={onCountryChange}
            onServiceChange={onServiceChange}
            onProgramChange={onProgramChange}
            onScholarshipChange={onScholarshipChange}
          />
        </div>
        <div className="flex shrink-0 flex-col gap-2 border-t border-gray-200 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={onReset}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary bg-white px-4 py-2.5 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <ResetGlyph className="h-3.5 w-3.5 text-primary transition-colors duration-200 group-hover:text-white" />
              Reset filters
            </button>
          ) : null}
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:outline-none"
          >
            Show mentors
          </button>
        </div>
      </aside>
    </>
  );
}

// ---------------------------------------------------------------------------
// Data helpers
// ---------------------------------------------------------------------------

function scholarshipMatches(mentor: Mentor, name: string): boolean {
  const entry = SCHOLARSHIPS.find((scholarship) => scholarship.name === name);
  if (entry?.mentorSlugs.includes(mentor.slug)) return true;
  const haystack = [
    mentor.scholarshipLine ?? "",
    ...mentor.experiences.map((experience) => experience.scholarship ?? ""),
    ...mentor.experiences.flatMap((experience) =>
      (experience.scholarships ?? []).flatMap((scholarship) => [
        scholarship.displayName ?? "",
        scholarship.rawName ?? "",
      ]),
    ),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(name.toLowerCase());
}

// ---------------------------------------------------------------------------
// The list
// ---------------------------------------------------------------------------

export type MentorListProps = {
  mode?: "all" | "country" | "service" | "scholarship";
  lockedCountry?: string;
  lockedService?: string;
  lockedScholarship?: string;
  pageHeadingLead?: string;
  pageHeadingAccent?: string;
  pageSubheading?: string;
  emptyStateMessage?: string;
};

export default function MentorList({
  mode = "all",
  lockedCountry = "",
  lockedService = "",
  lockedScholarship = "",
  pageHeadingLead,
  pageHeadingAccent,
  pageSubheading,
  emptyStateMessage,
}: MentorListProps) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [all, setAll] = useState<Mentor[]>([]);

  const [country, setCountry] = useState(lockedCountry);
  const [service, setService] = useState(lockedService);
  const [program, setProgram] = useState("");
  const [scholarship, setScholarship] = useState(lockedScholarship);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [slots, setSlots] = useState<Record<string, string | undefined>>({});
  const [slotsLoading, setSlotsLoading] = useState(false);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  useEffect(() => setMounted(true), []);

  // module 22066: locked facets win on mount
  useEffect(() => {
    if (mode === "service" && lockedService) {
      setService(lockedService);
      setCountry("");
    } else if (mode === "country" && lockedCountry) {
      setCountry(lockedCountry);
      setService("");
    } else if (mode === "scholarship" && lockedScholarship) {
      setScholarship(lockedScholarship);
      setCountry("");
      setService("");
    }
  }, [mode, lockedCountry, lockedService, lockedScholarship]);

  // module 22066: 500ms debounce before the search hits the query
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => setSearch(query), 500);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  const filterKey = [
    mode,
    lockedCountry,
    lockedService,
    lockedScholarship,
    country,
    service,
    program,
    scholarship,
    search.trim().toLowerCase(),
  ].join("|");

  // module 22066 fetch effect - asks the catalog API, falls back to local data
  useEffect(() => {
    const request = ++requestIdRef.current;
    let cancelled = false;
    setLoading(true);
    setPage(1);
    (async () => {
      try {
        const params = new URLSearchParams();
        if (country) params.append("country", country);
        if (service) params.append("service", service);
        if (program) params.append("program", program);
        if (scholarship) params.append("scholarship", scholarship);
        if (search.trim()) params.append("search", search.trim());
        params.append("page", "1");
        params.append("limit", "100");
        const response = await fetch(`/api/catalog/mentors?${params.toString()}`);
        const payload = await response.json();
        if (cancelled || request !== requestIdRef.current) return;
        if (payload?.success && Array.isArray(payload?.data?.mentors)) {
          setAll(payload.data.mentors as Mentor[]);
          return;
        }
        throw new Error(payload?.message ?? "Unexpected catalog payload");
      } catch {
        // NOTE: /api/catalog/mentors died with the original site - fall back to
        // the mentor records recovered from the scraped RSC payloads.
        if (cancelled || request !== requestIdRef.current) return;
        setAll(MENTORS);
      } finally {
        if (!cancelled && request === requestIdRef.current) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [filterKey]);

  const results = useMemo(() => {
    const needle = search.trim().toLowerCase();
    const selectedCountries = country.split(",").filter(Boolean);
    const selectedServices = service.split(",").filter(Boolean);
    return all.filter((mentor) => {
      if (
        selectedServices.length > 0 &&
        !selectedServices.some((value) => (mentor.topics ?? []).includes(value))
      ) {
        return false;
      }
      if (selectedCountries.length > 0) {
        const info = mentorCountry(mentor);
        const label = info.label || info.iso;
        if (!selectedCountries.includes(label)) return false;
      }
      if (program && mentor.program !== program) return false;
      if (scholarship && !scholarshipMatches(mentor, scholarship)) return false;
      if (needle) {
        const haystack = [
          mentor.name,
          mentor.universityName ?? "",
          mentor.major ?? "",
          mentor.program ?? "",
          mentorCountry(mentor).label,
          ...(mentor.topics ?? []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(needle)) return false;
      }
      return true;
    });
  }, [all, country, program, scholarship, search, service]);

  // module 22066 `filters` payload - built from the loaded records instead
  // (service mode hides countries that have no mentors).
  const filters = useMemo<FilterOptions>(() => {
    const base =
      mode === "service" && service
        ? all.filter((mentor) =>
            service.split(",").filter(Boolean).some((value) =>
              (mentor.topics ?? []).includes(value),
            ),
          )
        : all;
    const countries = [
      ...new Set(
        base
          .map((mentor) => mentorCountry(mentor).label)
          .filter(Boolean),
      ),
    ].sort((a, b) => a.localeCompare(b));
    const programs = [
      ...new Set(all.map((mentor) => mentor.program ?? "").filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
    return {
      countries,
      services: Object.keys(TOPIC_DESCRIPTIONS),
      programs,
      scholarships: SCHOLARSHIPS.map((scholarship) => scholarship.name),
    };
  }, [all, mode, service]);

  const pageCount = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = results.slice(start, start + PAGE_SIZE);
  const pageIds = pageItems.map((mentor) => mentor.slug).join(",");

  // module 22066 next-available-slots fetch (endpoint died with the site)
  useEffect(() => {
    if (pageItems.length === 0) {
      setSlots({});
      setSlotsLoading(false);
      return;
    }
    let cancelled = false;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    setSlotsLoading(true);
    (async () => {
      try {
        const response = await fetch(
          `/api/mentors/next-available-slots?ids=${encodeURIComponent(pageIds)}`,
          { signal: controller.signal },
        );
        const payload = await response.json();
        if (cancelled) return;
        setSlots(
          payload?.data && typeof payload.data === "object" ? payload.data : {},
        );
      } catch {
        if (!cancelled) setSlots({});
      } finally {
        clearTimeout(timer);
        if (!cancelled) setSlotsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
      controller.abort();
      clearTimeout(timer);
    };
  }, [pageIds, pageItems.length]);

  const hasActiveFilters = !!(
    country ||
    service ||
    program ||
    scholarship ||
    search.trim()
  );
  const hasExtraFilters = !!(program || scholarship || query.trim());
  const activeFacetCount = [country, service, program, scholarship].filter(
    Boolean,
  ).length;

  // module 22066 eR - service/country/scholarship modes keep their locked facet
  const resetFilters = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (mode === "country" || mode === "service") {
      setProgram("");
      setScholarship("");
      setQuery("");
      setSearch("");
      return;
    }
    if (mode === "scholarship") {
      setProgram("");
      setQuery("");
      setSearch("");
      return;
    }
    setCountry("");
    setService("");
    setProgram("");
    setScholarship("");
    setQuery("");
    setSearch("");
  };

  const headingLead =
    pageHeadingLead ??
    (mode === "scholarship" ? "Choose Your Mate from" : "Choose Your Mate for");
  const headingAccent =
    pageHeadingAccent ??
    (mode === "country" && lockedCountry
      ? lockedCountry
      : mode === "service" && lockedService
        ? lockedService
        : mode === "scholarship" && lockedScholarship
          ? lockedScholarship
          : "Your Study Abroad Journey");

  return (
    <section className="mx-auto mt-10 max-w-7xl space-y-6 px-4 py-16 sm:space-y-10">
      <h1 className="text-center text-2xl font-bold sm:text-4xl lg:text-4xl">
        {headingLead}
        <span className="font-secondary block font-bold text-primary">
          {headingAccent}
        </span>
      </h1>

      <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-neutral-600 md:text-base">
        {pageSubheading ?? DEFAULT_SUBHEADING}
      </p>

      {/* search row + mobile Filters button */}
      <div className="mx-auto flex w-full max-w-md items-center gap-2 sm:max-w-none">
        <div className="relative min-w-0 flex-1 sm:mx-auto sm:max-w-md">
          <input
            type="text"
            placeholder="Search mentors by name, university, or major..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm text-gray-700 shadow-sm transition-all duration-200 outline-none focus:border-primary focus:ring-1 focus:ring-primary sm:text-base"
          />
          <SearchGlyph className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="relative inline-flex h-10.5 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white px-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-primary focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none sm:hidden"
          aria-label="Open filters"
        >
          <SlidersGlyph size={16} className="text-primary" />
          <span>Filters</span>
          {mounted && activeFacetCount > 0 ? (
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-xs font-semibold text-white">
              {activeFacetCount}
            </span>
          ) : null}
        </button>
      </div>

      <FilterDrawer
        open={drawerOpen}
        onOpenChange={setDrawerOpen}
        filters={filters}
        country={country}
        service={service}
        program={program}
        scholarship={scholarship}
        onCountryChange={setCountry}
        onServiceChange={setService}
        onProgramChange={setProgram}
        onScholarshipChange={setScholarship}
        onReset={resetFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* desktop filter row */}
      <div className="hidden w-full flex-col gap-3 sm:flex sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
        <div className="flex min-w-0 flex-wrap items-end gap-4">
          <MultiSelect
            label="Country"
            options={filters.countries}
            selected={country ? country.split(",").filter(Boolean) : []}
            onChange={(value) => setCountry(value.join(","))}
            placeholder="All Countries"
          />
          <MultiSelect
            label="Service"
            options={filters.services}
            selected={service ? service.split(",").filter(Boolean) : []}
            onChange={(value) => setService(value.join(","))}
            placeholder="All Services"
          />
          <SelectControl
            label="Program"
            options={filters.programs}
            value={program}
            onChange={setProgram}
            placeholder="All Programs"
          />
          <SelectControl
            label="Scholarship"
            options={filters.scholarships}
            value={scholarship === "true" ? "" : scholarship}
            onChange={setScholarship}
            placeholder="All Scholarships"
          />
          {hasActiveFilters || hasExtraFilters ? (
            <div className="flex flex-col">
              <span className="mb-1 text-sm font-medium text-gray-700">Reset</span>
              <button
                type="button"
                onClick={resetFilters}
                aria-label="Reset filters"
                className="group inline-flex items-center justify-center gap-2 rounded-lg border border-primary bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm transition-all duration-200 hover:bg-primary hover:text-white focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <ResetGlyph className="h-3.5 w-3.5 text-primary transition-colors duration-200 group-hover:text-white" />
                Reset filters
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <LoadingDots />
          <p className="text-center text-gray-500">Loading mentors...</p>
        </div>
      ) : pageItems.length === 0 ? (
        <div className="space-y-4 text-center">
          <p className="text-gray-500">
            {emptyStateMessage ?? "No mentors found."}
          </p>
          <Link
            href="/mentors"
            className="inline-flex text-sm font-medium text-primary underline-offset-2 hover:underline"
          >
            Browse all mentors
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((mentor) => (
            <Link
              key={mentor.slug}
              href={`/${mentor.slug}`}
              className="group flex h-full min-w-0 w-full cursor-pointer"
            >
              <MentorCard
                mentor={mentor}
                nextAvailableSlot={slots[mentor.slug] ?? null}
                nextAvailableSlotLoading={slotsLoading}
              />
            </Link>
          ))}
        </div>
      )}

      {!loading && pageItems.length > 0 ? (
        <div className="mt-10 flex items-center justify-center gap-3">
          <button
            onClick={() => setPage((value) => Math.max(value - 1, 1))}
            disabled={page === 1}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {page} of {pageCount}
          </span>
          <button
            onClick={() => setPage((value) => Math.min(value + 1, pageCount))}
            disabled={page === pageCount}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </div>
      ) : null}
    </section>
  );
}
