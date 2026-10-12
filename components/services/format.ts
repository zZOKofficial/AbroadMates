import type { Mentor } from "@/data/mentors";
import { detectSessionFlags } from "@/components/sessions/session-card";

/**
 * Display helpers ported verbatim from the original mentor card
 * (chunk 8088: modules 24088 / 53257 / 21338 / 51571 / 88780, chunk 5696).
 * They turn the raw mentor record into the university / scholarship / country
 * strings the card renders.
 */

const REGIONAL_INDICATORS = /[\u{1F1E6}-\u{1F1FF}]/gu;

// 21338 (if) - Title-case words, keeping small stopwords lowercase unless they
// are the first/last word. Acronyms (A-Z 2-5 chars) and numbers stay as-is.
const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "for", "nor",
  "on", "at", "to", "from", "by", "of", "in",
]);

function titleCaseWord(word: string, index: number, total: number): string {
  if (!word || /^\d+(?:\.\d+)?%?$/.test(word) || /^[A-Z0-9]{2,5}$/.test(word)) {
    return word;
  }
  const lower = word.toLowerCase();
  if (index !== 0 && index !== total - 1 && STOPWORDS.has(lower)) return lower;
  return word
    .split("-")
    .map((part, i, parts) => {
      if (
        !part ||
        (parts.length > 1 && parts.every((p) => /^[A-Z0-9]{2,5}$/.test(p))) ||
        (/^[A-Z0-9]{2,5}$/.test(part) && parts.length === 1)
      ) {
        return part;
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join("-");
}

function titleCase(input: string): string {
  const text = input.trim();
  if (!text) return "";
  const words = text.split(/\s+/);
  return words.map((w, i) => titleCaseWord(w, i, words.length)).join(" ");
}

// 21338 (rG) - normalize a raw scholarship string to its display name:
// drop flag emoji, take the segment after the last "|", then make sure it reads
// like "<something> Scholarship".
function scholarshipName(raw: string): string {
  const cleaned = String(raw ?? "")
    .replace(/^(?:\u{1F393})+\s*/u, "")
    .trim();
  const segment = cleaned.includes("|")
    ? cleaned.split("|").map((part) => part.trim()).filter(Boolean).at(-1) ?? ""
    : cleaned;
  if (!segment) return "";
  let candidate: string;
  if (/\b(scholarship|awardee)\b/i.test(segment)) {
    candidate = segment;
  } else if (/^(\d+(?:\.\d+)?)\s*%?$/.test(segment)) {
    candidate = `${segment.match(/^(\d+(?:\.\d+)?)\s*%?$/)![1]}% Scholarship`;
  } else if (/^[\p{L}0-9][\p{L}0-9'-]*$/u.test(segment)) {
    candidate = `${segment} Scholarship`;
  } else {
    candidate = segment;
  }
  return titleCase(candidate);
}

// 53130 (K) was not part of the saved chunks; the sibling helpers only ever
// used it to strip flag emoji out of a location string.
function normalizeLocation(value: string): string {
  return value.replace(REGIONAL_INDICATORS, "").trim();
}

function endsWithLocation(line: string, location: string): boolean {
  const a = line.toLowerCase();
  const b = location.toLowerCase();
  return a === b || a.endsWith(`, ${b}`);
}

// 53257 (Wq) - one comma-segment, flags + parentheticals stripped, title-cased.
function cleanSegment(value: string): string {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const head = ((text.split(",")[0] ?? "").trim()) || text;
  return titleCase(
    head.replace(REGIONAL_INDICATORS, "").replace(/\s*\([^)]*\)/g, "").trim(),
  );
}

// 53257 (P6) - "University, City, Country"
function universityLine({ name, city, location }: {
  name?: string | null;
  city?: string | null;
  location?: string | null;
}): string {
  const raw = String(name ?? "").trim();
  const cleaned = titleCase(
    raw
      .replace(REGIONAL_INDICATORS, "")
      .replace(/\s*\([^)]*\)/g, "")
      .replace(/,\s*[^,]*$/, "")
      .trim() || raw.trim(),
  );
  if (!cleaned) return "";
  const cityPart = String(city ?? "").trim();
  const locationPart = normalizeLocation(String(location ?? ""));
  const parts = [cleaned];
  if (cityPart && !endsWithLocation(cleaned, cityPart)) parts.push(cityPart);
  if (locationPart && !endsWithLocation(parts.join(", "), locationPart)) {
    parts.push(locationPart);
  }
  return parts.join(", ");
}

// 53257 (BN) - title-case the first segment, keep the rest verbatim.
function joinSegments(value: string): string {
  const text = String(value ?? "").trim();
  if (!text) return "";
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length === 0) return "";
  const first = cleanSegment(parts[0]);
  return parts.length === 1 ? first : [first, ...parts.slice(1)].join(", ");
}

// 21338 (u) - pick the mentor's scholarship display name out of their
// experience records (scholarship objects first, then the free-text lines).
function resolveScholarship(mentor: Mentor): string {
  const experiences = mentor.experiences ?? [];

  const nameOf = (experience: Mentor["experiences"][number]): string => {
    const active = (experience.scholarships ?? []).filter(
      (s) => s.relationshipStatus !== "ignored",
    );
    const primary =
      active.find((s) => s.relationshipStatus === "awarded") ?? active[0];
    return primary?.displayName?.trim() || primary?.rawName?.trim() || "";
  };

  const funded = experiences.filter(
    (experience) => (experience.scholarships ?? []).length > 0,
  );
  const currentlyStudying = funded.find((experience) => experience.currentlyStudying);
  if (currentlyStudying) {
    const name = nameOf(currentlyStudying);
    if (name) return name;
  }
  const accepted = funded.find((experience) => experience.accepted === "accepted");
  if (accepted) {
    const name = nameOf(accepted);
    if (name) return name;
  }
  if (funded[0]) {
    const name = nameOf(funded[0]);
    if (name) return name;
  }

  const withLine = experiences.filter((experience) => experience.scholarship?.trim());
  const studyingLine = withLine.find((experience) => experience.currentlyStudying);
  if (studyingLine?.scholarship?.trim()) return studyingLine.scholarship.trim();
  const acceptedLine = withLine.find((experience) => experience.accepted === "accepted");
  if (acceptedLine?.scholarship?.trim()) return acceptedLine.scholarship.trim();
  if (withLine[0]?.scholarship?.trim()) return withLine[0].scholarship.trim();
  return mentor.scholarshipLine?.trim() || "";
}

// 51571 (h) - the country line the card shows (and flags on).
export function locationOf(mentor: Mentor): string {
  const tail = mentor.universityName?.match(/,\s*([^,]+)$/)?.[1]?.trim();
  return (
    mentor.universityCountry?.trim() ||
    mentor.country?.trim() ||
    tail ||
    ""
  );
}

/** University line rendered in the muted row of the card (53257 P6 + BN). */
export function universityLineOf(mentor: Mentor): string {
  return joinSegments(
    universityLine({
      name: mentor.universityName,
      city: mentor.universityCity,
      location: mentor.universityCountry,
    }),
  );
}

/** Scholarship line rendered in the accent row of the card (21338 u + rG). */
export function scholarshipLineOf(mentor: Mentor): string {
  const resolved = resolveScholarship(mentor);
  if (!resolved) return "";
  // 21338 - drop a trailing parenthetical, e.g. "... (Italy)".
  return scholarshipName(resolved).replace(/\s*\([^)]*\)\s*$/u, "").trim();
}

// 88780 (af) - country text -> { iso, label } for `fi fi-<iso>` flags.
export function countryInfo(text: string): { iso: string; label: string } {
  const match = detectSessionFlags(String(text ?? ""))[0];
  if (match) return match;
  return {
    iso: "",
    label: String(text ?? "").replace(REGIONAL_INDICATORS, "").trim(),
  };
}

/** The country a mentor is listed under (88780 af over 51571 h). */
export function mentorCountry(mentor: Mentor): { iso: string; label: string } {
  return countryInfo(locationOf(mentor));
}
