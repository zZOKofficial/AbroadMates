import Link from "next/link";
import { ArrowRight, Calendar, Clock, Monitor, Users } from "lucide-react";
import {
  PAST_SESSIONS,
  UPCOMING_SESSIONS,
  type Session,
} from "@/data/sessions";

/**
 * "Group Sessions" homepage section (reference module ~59199).
 *
 * The original fetched sessions client-side from
 * /api/catalog/group-sessions (lost with the backend) and rendered
 * SessionCard components (chunk 3157). Here the cards are rendered from
 * data/sessions.ts with the same card markup, using the pre-computed
 * date/time labels instead of the lost live API.
 */

/** Rebuild a Cloudinary delivery URL from the scraped relative path. */
function sessionCover(image: string | null): string | null {
  if (!image) return null;
  return image
    .replace(/^\.\.\/res\.cloudinary\.com/, "https://res.cloudinary.com")
    .replace(/%2C/g, ",");
}

function registrationState(session: Session) {
  const status =
    session.registrationStatus === "closed" ||
    session.registrationStatus === "coming_soon"
      ? session.registrationStatus
      : "open";
  const started =
    !!session.date && new Date(session.date).getTime() < Date.now();
  if (started) return { canRegister: false, label: "Registration closed" };
  if (status === "coming_soon") return { canRegister: false, label: "Coming soon" };
  if (status === "closed") return { canRegister: false, label: "Registration closed" };
  if (session.spotsRemaining < 1) return { canRegister: false, label: "Full" };
  return { canRegister: true, label: "Register now" };
}

function SessionCard({ session }: { session: Session }) {
  const href = `/sessions/${session.slug}`;
  const cover = sessionCover(session.image);
  const attendees = `${session.attendees} ${session.attendees === 1 ? "Attendee" : "Attendees"}`;
  const mode = session.mode ?? "Online";
  const badge = session.type?.trim() ? session.type.trim() : "Workshop";
  const registration = registrationState(session);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-colors duration-200 hover:border-primary hover:bg-primary/10 hover:shadow-lg">
      <Link
        href={href}
        aria-label={`${session.title ?? ""} details`}
        className="block relative aspect-4/3 overflow-hidden bg-neutral-100"
      >
        {cover ? (
          <img
            src={cover}
            alt={session.title ?? "Group session"}
            className="h-full w-full object-cover"
          />
        ) : null}
        <span className="absolute bottom-2 left-2 rounded bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black">
          {badge}
        </span>
      </Link>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-2 px-3.5 py-2.5 sm:gap-2.5 sm:px-5 sm:py-3">
          <Link href={href}>
            <h3 className="font-brand line-clamp-2 text-sm font-bold leading-snug text-text-primary sm:text-[15px] md:text-base">
              {session.title}
            </h3>
          </Link>
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-text-primary">
              <Calendar size={14} className="shrink-0 text-primary" aria-hidden />
              {session.dateLabel}
            </div>
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-600">
                <Clock size={14} className="shrink-0" aria-hidden />
                {session.timeLabel}
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 text-[11px] text-gray-500">
                Your local time
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} aria-hidden />
              {attendees}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Monitor size={14} aria-hidden />
              {mode}
            </span>
          </div>
          {session.excerpt ? (
            <p className="line-clamp-2 text-xs leading-snug text-gray sm:text-sm">
              {session.excerpt}
            </p>
          ) : null}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-black/10 px-4 py-2.5 sm:px-5">
          <Link
            href={href}
            className="shrink-0 text-xs font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary sm:text-sm sm:underline-offset-8"
          >
            See details →
          </Link>
          {registration.canRegister ? (
            <Link
              href={`${href}/register`}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-2.5 py-1 text-xs font-bold text-white transition-colors hover:bg-primary/90"
            >
              Register now
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-white">
                <ArrowRight size={12} aria-hidden />
              </span>
            </Link>
          ) : (
            <span className="inline-flex shrink-0 items-center rounded-full bg-gray-200 px-2.5 py-1 text-xs font-bold text-gray-600">
              {registration.label}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export function GroupSessionsSection() {
  // Reference logic: upcoming first, fall back to past when empty.
  const upcoming = UPCOMING_SESSIONS;
  const sessions = upcoming.length ? upcoming : PAST_SESSIONS;

  return (
    <section
      aria-labelledby="home-group-sessions-title"
      className="bg-white px-6 py-16 sm:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <h2
            id="home-group-sessions-title"
            className="font-secondary text-3xl font-bold text-primary sm:text-4xl md:text-5xl"
          >
            Group Sessions
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-gray-600 sm:text-lg">
            Live group sessions with mentors and scholarship winners.
          </p>
        </div>
        {sessions.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {sessions.map((session, i) => (
              <div
                key={`${session.slug}-${session.date}-${i}`}
                className={i >= 5 ? "hidden sm:block" : undefined}
              >
                <SessionCard session={session} />
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-8 text-center text-sm text-gray-600 sm:text-base">
            {
              "More Group Sessions will be updated here soon. Once a new session is published, it will appear on this section automatically."
            }
          </p>
        )}
        <div className="mt-10 flex justify-center sm:mt-16">
          <Link
            href="/sessions"
            className="text-sm sm:text-base font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary sm:underline-offset-8"
          >
            View all Group Sessions →
          </Link>
        </div>
      </div>
    </section>
  );
}
