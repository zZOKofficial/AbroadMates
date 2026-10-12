import type { Metadata } from "next";
import SessionCard from "@/components/sessions/session-card";
import { UPCOMING_SESSIONS, PAST_SESSIONS, SESSIONS } from "@/data/sessions";

export const metadata: Metadata = {
  title: "Group Sessions",
  description:
    "Live study-abroad Group Sessions with mentors and scholarship winners. Register for upcoming Group Sessions on applications, scholarships, and visas.",
  alternates: { canonical: "/sessions" },
  openGraph: {
    title: "Group Sessions | AbroadMates",
    description: "Live study-abroad Group Sessions with mentors and scholarship winners.",
    url: "/sessions",
  },
  twitter: {
    card: "summary",
    title: "Group Sessions | AbroadMates",
    description: "Live study-abroad Group Sessions with mentors and scholarship winners.",
  },
};

// Reference module 32501: session category taxonomy.
const CATEGORIES = [
  "Workshop",
  "Info session",
  "Q&A",
  "Application prep",
  "Career",
  "Scholarships",
  "Visa & immigration",
  "Other",
] as const;

// Reference page chunk (23698dd7dc609302b50f) rendered this section as a
// client component; the server-rendered initial state is reproduced here
// (All filter active, empty search, all sessions listed).
export default function SessionsPage() {
  const all = SESSIONS.length;
  const upcoming = UPCOMING_SESSIONS.length;
  const past = PAST_SESSIONS.length;

  return (
    <main className="flex flex-col">
      <section aria-label="Group Sessions hero" className="bg-white">
        <div className="mx-auto mt-10 max-w-6xl space-y-6 px-4 pt-12 pb-6">
          <h1 className="text-center text-2xl font-bold sm:text-4xl lg:text-4xl">
            Group Sessions
            <span className="font-secondary block font-bold text-[var(--color-primary)]">
              From Mates Who Have Made It
            </span>
          </h1>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mt-3 text-sm text-pretty text-neutral-600 md:text-base">
              Learn directly from mentors who have already navigated applications,
              scholarships, and visas through live Group Sessions, then pick the ones
              that match your goals, bring your questions, and leave with practical next
              steps you can use right away.
            </p>
          </div>
        </div>
      </section>
      <div className="order-2 sm:order-3">
        <section
          aria-labelledby="events-section-title"
          className="mb-10 bg-white px-4 pt-6 pb-10 sm:mb-20 sm:px-6 lg:px-10"
        >
          <div className="mx-auto max-w-7xl">
            <h2 id="events-section-title" className="sr-only">
              Browse Group Sessions
            </h2>
            <div className="mb-5 text-center sm:hidden">
              <h3 className="font-brand text-xl font-bold text-text-primary">
                Browse Group Sessions
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Search or filter to find the right session.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="grid w-full grid-cols-3 gap-1 rounded-full bg-white p-1 sm:mb-1 sm:inline-flex sm:w-auto">
                <button
                  type="button"
                  className="min-w-0 rounded-full border-2 px-2 py-1.5 text-xs font-semibold transition sm:px-4 sm:text-sm bg-(--color-accent) border-black text-black shadow-sm"
                >
                  All ({all})
                </button>
                <button
                  type="button"
                  className="min-w-0 rounded-full border-2 px-2 py-1.5 text-xs font-semibold transition sm:ml-1 sm:px-4 sm:text-sm bg-white border-black/10 text-text-primary hover:border-black/40"
                >
                  Upcoming ({upcoming})
                </button>
                <button
                  type="button"
                  className="min-w-0 rounded-full border-2 px-2 py-1.5 text-xs font-semibold transition sm:ml-1 sm:px-4 sm:text-sm bg-white border-black/10 text-text-primary hover:border-black/40"
                >
                  Past ({past})
                </button>
              </div>
              <div className="relative mx-auto flex w-full max-w-md items-center">
                <input
                  type="text"
                  placeholder="Search Group Sessions..."
                  aria-label="Search Group Sessions"
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm text-gray-700 shadow-sm transition-all duration-200 outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] sm:text-base"
                  defaultValue=""
                />
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  className="absolute left-3 text-gray-400"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 sm:hidden">
              <label
                htmlFor="mobile-event-category"
                className="mb-1.5 block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <select
                id="mobile-event-category"
                className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 shadow-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                defaultValue="All"
              >
                <option value="All">All</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-5 hidden flex-wrap items-center justify-center gap-2 sm:flex sm:gap-3">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 bg-white border-[var(--color-primary)] text-[var(--color-primary)] shadow-sm"
              >
                All
              </button>
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-200 bg-white border-gray-300 text-gray-700 hover:border-[var(--color-primary)]"
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="mt-8">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {SESSIONS.map((session) => (
                  <SessionCard key={session.slug} session={session} />
                ))}
              </div>
            </div>
            <p className="mt-5 flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-center text-xs text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clock shrink-0"
                aria-hidden="true"
              >
                <path d="M12 6v6l4 2" />
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>Times are shown in your local time (auto-detected).</span>
              <button type="button" className="font-medium text-primary hover:underline">
                Change time zone
              </button>
            </p>
          </div>
        </section>
      </div>
      <div className="order-3 sm:order-2" />
    </main>
  );
}
