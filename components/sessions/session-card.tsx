import Link from "next/link";
import type { Session } from "@/data/sessions";

// ---------------------------------------------------------------------------
// Ported verbatim from the original bundle so server-rendered markup matches
// the reference 1:1. Original module ids: 88780 (lC), 37095 (nR/LW/R2),
// 53499 (FB), 32501 ($o), 21968 (Flag), 23157 (SessionCard).
// ---------------------------------------------------------------------------

// 88780: country/keyword -> ISO-3166 alpha-2 map
const COUNTRY_ISO: Record<string, string> = {
  afghanistan: "af", albania: "al", algeria: "dz", argentina: "ar", australia: "au",
  austria: "at", azerbaijan: "az", bangladesh: "bd", belgium: "be", brazil: "br",
  bulgaria: "bg", cambodia: "kh", canada: "ca", chile: "cl", china: "cn", colombia: "co",
  croatia: "hr", "czech republic": "cz", czechia: "cz", denmark: "dk", egypt: "eg",
  estonia: "ee", ethiopia: "et", finland: "fi", france: "fr", georgia: "ge", germany: "de",
  ghana: "gh", greece: "gr", hungary: "hu", india: "in", indonesia: "id", iran: "ir",
  ireland: "ie", israel: "il", italy: "it", japan: "jp", jordan: "jo", kazakhstan: "kz",
  kenya: "ke", latvia: "lv", lithuania: "lt", luxembourg: "lu", malaysia: "my",
  mexico: "mx", moldova: "md", morocco: "ma", nepal: "np", netherlands: "nl",
  "new zealand": "nz", nigeria: "ng", norway: "no", pakistan: "pk", peru: "pe",
  philippines: "ph", poland: "pl", portugal: "pt", qatar: "qa", romania: "ro",
  russia: "ru", "saudi arabia": "sa", serbia: "rs", singapore: "sg", slovakia: "sk",
  slovenia: "si", "south africa": "za", "south korea": "kr", spain: "es",
  "sri lanka": "lk", sweden: "se", switzerland: "ch", taiwan: "tw", thailand: "th",
  turkey: "tr", türkiye: "tr", ukraine: "ua", "united arab emirates": "ae", uae: "ae",
  "united kingdom": "gb", uk: "gb", england: "gb", scotland: "gb", wales: "gb",
  "united states": "us", usa: "us", "united states of america": "us", uzbekistan: "uz",
  vietnam: "vn", bahrain: "bh", kuwait: "kw", oman: "om", "hong kong": "hk",
  "hong kong sar": "hk", "hong kong sar china": "hk", "european union": "eu", eu: "eu",
  "erasmus mundus": "eu", erasmus: "eu", gks: "kr", "global korea scholarship": "kr",
  korea: "kr",
};

// 88780: strip regional indicators + punctuation, lowercase
function normalizeKeyword(input: string): string {
  return input
    .replace(/[\u{1F1E6}-\u{1F1FF}]/gu, "")
    .replace(/[^\p{L}\s'-]/gu, "")
    .trim()
    .toLowerCase();
}

// 88780: capitalize each word
function titleCase(input: string): string {
  return input
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export type SessionFlag = { iso: string; label: string };

// 88780: lC() - detect country flags from free text (max 3, deduped by ISO)
export function detectSessionFlags(text: string): SessionFlag[] {
  if (!text?.trim()) return [];
  const haystack = normalizeKeyword(
    text
      .replace(/[-_/]/g, " ")
      .replace(/\bU\.?S\.?A\.?\b/gi, " United States ")
      .replace(/\bU\.?S\.?\b/gi, " United States ")
      .replace(/\bUK\b/g, " United Kingdom ")
      .replace(/hungaricum/gi, " Hungary ")
      .replace(/\berasmus\s*mundus\b/gi, " European Union ")
      .replace(/\berasmus\b/gi, " European Union ")
      .replace(/\bglobal\s+korea\s+scholarship\b/gi, " South Korea ")
      .replace(/\bGKS\b/g, " South Korea ")
  );
  const results: SessionFlag[] = [];
  const seen = new Set<string>();
  const fromRegex = (key: string) =>
    new RegExp(`\\bfrom(?:\\s+the)?\\s+${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`);
  for (const key of Object.keys(COUNTRY_ISO).sort((a, b) => b.length - a.length)) {
    if ((key.length < 3 && key !== "uk" && key !== "uae" && key !== "eu") || !haystack.includes(key)) continue;
    if (fromRegex(key).test(haystack)) continue;
    const iso = COUNTRY_ISO[key];
    if (seen.has(iso)) continue;
    seen.add(iso);
    const labelWord =
      iso === "us" ? "united states"
      : iso === "gb" ? "united kingdom"
      : iso === "hu" ? "hungary"
      : iso === "eu" ? "european union"
      : iso === "kr" ? "south korea"
      : key;
    results.push({ iso, label: titleCase(labelWord) });
  }
  return results;
}

// Input string built by the original caller (23157) before running lC();
// all text normalization happens inside detectSessionFlags().
export function flagInput(session: Session): string {
  return [session.title ?? "", session.slug ?? "", session.excerpt ?? "", ...session.categories, ...session.tags].join(" ");
}

// 21968: Flag component - only renders a real 2-letter ISO
export function Flag({ iso, label, className = "h-3.5" }: { iso: string; label: string; className?: string }) {
  const code = iso.toLowerCase();
  if (code.length !== 2) return null;
  return (
    <span
      className={`fi fi-${code} inline-block shrink-0 overflow-hidden rounded-xs align-middle aspect-4/3 !bg-cover !bg-center !leading-none before:!hidden ${className}`}
      aria-hidden={label ? false : true}
      aria-label={label || undefined}
      title={label || undefined}
      role={label ? "img" : undefined}
    />
  );
}

// 32501: $o() - type badge text ("Live class" -> "Live course")
export function typeBadge(type: string): string {
  if (typeof type === "string" && type.trim()) {
    return type.trim() === "Live class" ? "Live course" : type.trim();
  }
  return "Workshop";
}

const TZ = "en-US";

type DateParts = {
  weekday: string; month: string; day: string; year: string;
  hour: string; minute: string; dayPeriod: string;
};

function partsFor(date: Date, timeZone: string): DateParts | null {
  const parts = new Intl.DateTimeFormat(TZ, {
    weekday: "short", month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit", hour12: true, timeZone,
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return {
    weekday: get("weekday"), month: get("month"), day: get("day"), year: get("year"),
    hour: get("hour"), minute: get("minute"), dayPeriod: get("dayPeriod"),
  };
}

function clockOf(p: DateParts): string {
  return p.dayPeriod ? `${p.hour}:${p.minute} ${p.dayPeriod}` : `${p.hour}:${p.minute}`;
}

function toDate(input: string | Date): Date {
  return typeof input === "string" ? new Date(input) : input;
}

// 37095: nR() - "Sun, Oct 18, 2026"
export function formatDate(input: string | Date, timeZone: string): string {
  const d = toDate(input);
  if (Number.isNaN(d.getTime())) return "—";
  const p = partsFor(d, timeZone);
  if (!p) return "—";
  return p.weekday && p.month && p.day && p.year
    ? `${p.weekday}, ${p.month} ${p.day}, ${p.year}`
    : "—";
}

// 37095: LW() - "9:00 – 10:30 PM" (drops duplicated meridiem)
export function formatTimeRange(input: string | Date, timeZone: string, durationMinutes: number | null = 60): string {
  const start = toDate(input);
  if (Number.isNaN(start.getTime())) return "—";
  const mins = Number(durationMinutes) > 0 ? Number(durationMinutes) : 60;
  const end = new Date(start.getTime() + 60000 * mins);
  const sp = partsFor(start, timeZone);
  const ep = partsFor(end, timeZone);
  if (!sp || !ep) return "—";
  const startClock = clockOf(sp);
  const endClock = clockOf(ep);
  return sp.dayPeriod && ep.dayPeriod && sp.dayPeriod === ep.dayPeriod
    ? `${sp.hour}:${sp.minute} – ${endClock}`
    : `${startClock} – ${endClock}`;
}

// 37095: R2() - "Sunday, October 18, 2026" (long form for CTAs)
export function formatLongDate(input: string | Date, timeZone: string): string {
  const d = toDate(input);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(TZ, {
    weekday: "long", year: "numeric", month: "long", day: "numeric", timeZone,
  }).format(d);
}

// 53499: FB() - registration status + label
export type RegistrationStatus = "open" | "closed" | "coming_soon";
export function registrationState(session: Session): { canRegister: boolean; label: string } {
  const raw = session.registrationStatus;
  const status: RegistrationStatus =
    raw === "closed" || raw === "coming_soon" ? raw : "open";
  if (session.date && new Date(session.date).getTime() < Date.now()) {
    return { canRegister: false, label: "Registration closed" };
  }
  if (status === "coming_soon") return { canRegister: false, label: "Coming soon" };
  if (status === "closed") return { canRegister: false, label: "Registration closed" };
  if (session.spotsRemaining < 1) return { canRegister: false, label: "Full" };
  return { canRegister: true, label: "Register now" };
}

// 23157: card title join
export function cardTitle(session: Session): string {
  return session.subtitle ? `${session.title}: ${session.subtitle}` : (session.title ?? "");
}

// The list/index card + sticky bar + register page use a curated marketing title
// for the US PhD session instead of the "title: subtitle" join.
const CARD_TITLE_OVERRIDES: Record<string, string> = {
  "fully-funded-us-phd-live-roadmap-q-and-a":
    "From Bangladesh to Fully Funded US PhD: Live Roadmap + Q&A",
};

// Marketing title shown on list cards and the register page.
export function sessionCardTitle(session: Session): string {
  return CARD_TITLE_OVERRIDES[session.slug ?? ""] ?? cardTitle(session);
}

// Mobile sticky bar title: title + subtitle joined by a space (no override).
export function stickyTitle(session: Session): string {
  return session.subtitle ? `${session.title} ${session.subtitle}` : (session.title ?? "");
}

// HTTrack-mangled stored image -> real Cloudinary URL
export function sessionImageUrl(image: string): string {
  if (image.startsWith("http")) return image;
  return `https://${image.replace(/%2c/gi, ",")}`;
}

function attendeesLabel(n: number): string {
  return `${n} ${n === 1 ? "Attendee" : "Attendees"}`;
}

export { attendeesLabel };

// "29 seats remaining" badge / "29 spots left" sticky status. seatsRemaining is
// null for the US PhD session, which the reference falls back to spotsRemaining.
export function seatCountLabel(session: Session): string {
  const n = session.seatsRemaining ?? session.spotsRemaining;
  return `${n} seats remaining`;
}

export function spotsLeftLabel(session: Session): string {
  const n = session.seatsRemaining ?? session.spotsRemaining;
  return `${n} spots left`;
}

// Mentor portrait Cloudinary URL built from the `photo` public-id (versioned).
export function mentorPhotoUrl(photo: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `https://res.cloudinary.com/dcrm3y8x2/image/upload/${photo}`;
}

// 96x96 face-focused hero avatar.
export function mentorAvatarUrl(photo: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `https://res.cloudinary.com/dcrm3y8x2/image/upload/c_fill,w_96,h_96,g_face,q_auto,f_auto/${photo}`;
}

// 400x533 face-aware spotlight portrait.
export function mentorSpotlightUrl(photo: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http")) return photo;
  return `https://res.cloudinary.com/dcrm3y8x2/image/upload/c_fill,w_400,h_533,g_auto:faces,q_auto,f_auto/${photo}`;
}

function detailHref(session: Session): string {
  return `/sessions/${session.slug}`;
}

function registerHref(session: Session): string {
  return `/sessions/${session.slug}/register`;
}

export default function SessionCard({
  session,
  viewerTimeZone,
}: {
  session: Session;
  viewerTimeZone?: string | null;
}) {
  const tz = viewerTimeZone || session.timezone || "UTC";
  const flags = detectSessionFlags(flagInput(session)).slice(0, 3);
  const reg = registrationState(session);
  const badge = typeBadge(session.type ?? "");
  const title = sessionCardTitle(session);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:border-primary hover:bg-primary/10 hover:shadow-lg">
      <Link aria-label={`${title} details`} className="block" href={detailHref(session)}>
        <figure className="relative overflow-hidden bg-neutral-900 aspect-4/3 w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={title}
            loading="lazy"
            decoding="async"
            className="object-cover object-center"
            style={{
              position: "absolute", height: "100%", width: "100%",
              left: 0, top: 0, right: 0, bottom: 0, color: "transparent",
            }}
            src={sessionImageUrl(session.image ?? "")}
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/40 to-transparent"
            aria-hidden="true"
          />
          {flags.length > 0 ? (
            <span className="absolute top-2 right-2 flex items-center gap-1">
              {flags.map((f) => (
                <Flag key={f.iso} iso={f.iso} label={f.label} className="h-6" />
              ))}
            </span>
          ) : null}
          <span className="absolute bottom-2 left-2 rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black">
            {badge}
          </span>
        </figure>
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2 px-3.5 py-2.5 sm:gap-2.5 sm:px-5 sm:py-3">
          <Link href={detailHref(session)}>
            <h3 className="font-brand line-clamp-2 text-sm font-bold leading-snug text-text-primary sm:text-[15px] md:text-base">
              {title}
            </h3>
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className="lucide lucide-calendar-days shrink-0 text-primary"
                aria-hidden="true"
              >
                <path d="M8 2v4" /><path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />
                <path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" />
                <path d="M8 18h.01" /><path d="M12 18h.01" /><path d="M16 18h.01" />
              </svg>
              <time dateTime={session.date ?? undefined}>{formatDate(session.date ?? "", tz)}</time>
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="lucide lucide-clock shrink-0" aria-hidden="true"
                >
                  <path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" />
                </svg>
                {formatTimeRange(session.date ?? "", tz, session.durationMinutes)}
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="lucide lucide-globe" aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                  <path d="M2 12h20" />
                </svg>
                Your local time
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="lucide lucide-chevron-down" aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className="lucide lucide-users" aria-hidden="true"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <path d="M16 3.128a4 4 0 0 1 0 7.744" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <circle cx="9" cy="7" r="4" />
              </svg>
              {attendeesLabel(session.attendees)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <svg
                xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                strokeLinejoin="round" className="lucide lucide-radio" aria-hidden="true"
              >
                <path d="M16.247 7.761a6 6 0 0 1 0 8.478" />
                <path d="M19.075 4.933a10 10 0 0 1 0 14.134" />
                <path d="M4.925 19.067a10 10 0 0 1 0-14.134" />
                <path d="M7.753 16.239a6 6 0 0 1 0-8.478" />
                <circle cx="12" cy="12" r="2" />
              </svg>
              {session.mode ?? "Online"}
            </span>
          </div>
          {session.excerpt ? (
            <p className="line-clamp-2 text-xs leading-snug text-gray sm:text-sm">{session.excerpt}</p>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 px-4 py-2.5 sm:px-5">
          <Link
            href={detailHref(session)}
            className="shrink-0 text-xs font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary sm:text-sm sm:underline-offset-8"
          >
            See details →
          </Link>
          {reg.canRegister ? (
            <Link
              href={registerHref(session)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white transition-colors hover:bg-primary/90"
            >
              Register now
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round" className="lucide lucide-arrow-right" aria-hidden="true"
                >
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </span>
            </Link>
          ) : (
            <span className="inline-flex shrink-0 items-center rounded-full bg-gray-200 px-2.5 py-1 text-xs font-bold text-gray-600">
              {reg.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
