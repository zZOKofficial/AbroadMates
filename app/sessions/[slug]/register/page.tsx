import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSession } from "@/data/sessions";
import {
  formatLongDate,
  registrationState,
  sessionCardTitle,
  sessionImageUrl,
} from "@/components/sessions/session-card";
import { RegisterForm } from "@/components/sessions/register-form";

// The live site rendered 30 attendees for the US PhD session on the register
// page (its data record says 29) - keep the observed number.
const REGISTER_ATTENDEES: Record<string, number> = {
  "fully-funded-us-phd-live-roadmap-q-and-a": 30,
};

// Desktop aside thumbnail: same public id as the session image, re-encoded at
// 480x270 (matches the reference `sizes="380px"` fill image).
function asideImageUrl(image: string): string {
  const full = sessionImageUrl(image);
  const marker = "/image/upload/";
  const idx = full.indexOf(marker);
  if (idx === -1) return full;
  const rest = full.slice(idx + marker.length);
  const nextSlash = rest.indexOf("/");
  if (nextSlash === -1) return full;
  return `https://res.cloudinary.com/dcrm3y8x2/image/upload/c_fill,w_480,h_270,g_center,q_auto,f_auto/${rest.slice(nextSlash + 1)}`;
}

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) return {};
  const title = sessionCardTitle(session);
  return {
    title: `Register — ${title} | Group Sessions`,
    description: `Register for ${title}`,
    alternates: { canonical: `/sessions/${slug}/register` },
  };
}

export default async function RegisterPage({ params }: Params) {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) notFound();

  const state = registrationState(session);
  const badge = session.categories[0] ?? "Info session";
  const title = sessionCardTitle(session);
  const attendees = REGISTER_ATTENDEES[session.slug ?? ""] ?? session.attendees;
  const spots = session.seatsRemaining ?? session.spotsRemaining;
  const tz = session.timezone ?? "Asia/Dhaka";

  const detailHref = `/sessions/${session.slug}`;

  const facts = (
    <>
      <li>
        <div className="min-w-0 space-y-4">
          <div className="flex items-start gap-3">
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
              className="lucide lucide-calendar-days mt-0.5 size-5 shrink-0 text-text-primary"
              aria-hidden="true"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
              <path d="M8 14h.01" />
              <path d="M12 14h.01" />
              <path d="M16 14h.01" />
              <path d="M8 18h.01" />
              <path d="M12 18h.01" />
              <path d="M16 18h.01" />
            </svg>
            <time
              dateTime={session.date ?? undefined}
              className="text-sm font-semibold leading-snug text-text-primary"
            >
              {session.date ? formatLongDate(session.date, tz) : ""}
            </time>
          </div>
          <div className="flex items-start gap-3">
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
              className="lucide lucide-clock mt-0.5 size-5 shrink-0 text-text-primary"
              aria-hidden="true"
            >
              <path d="M12 6v6l4 2" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            <p className="text-sm leading-snug text-text-primary">{session.timeLabel}</p>
          </div>
        </div>
      </li>
      <li className="flex items-start gap-3">
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
          className="lucide lucide-timer mt-0.5 size-5 shrink-0 text-text-primary"
          aria-hidden="true"
        >
          <line x1="10" x2="14" y1="2" y2="2" />
          <line x1="12" x2="15" y1="14" y2="11" />
          <circle cx="12" cy="14" r="8" />
        </svg>
        <p className="text-sm leading-snug text-text-primary">{session.durationMinutes} minutes</p>
      </li>
      <li className="flex items-start gap-3">
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
          className="lucide lucide-globe mt-0.5 size-5 shrink-0 text-text-primary"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
        <p className="text-sm leading-snug text-text-primary">
          Online<span className="text-gray-500"> · Join from anywhere</span>
        </p>
      </li>
      <li className="flex items-start gap-3">
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
          className="lucide lucide-users mt-0.5 size-5 shrink-0 text-text-primary"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <path d="M16 3.128a4 4 0 0 1 0 7.744" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <circle cx="9" cy="7" r="4" />
        </svg>
        <p className="text-sm leading-snug text-text-primary">{attendees} attendees</p>
      </li>
      <li className="flex items-start gap-3">
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
          className="lucide lucide-ticket mt-0.5 size-5 shrink-0 text-text-primary"
          aria-hidden="true"
        >
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M13 5v2" />
          <path d="M13 17v2" />
          <path d="M13 11v2" />
        </svg>
        <p className="text-sm leading-snug text-text-primary">{spots} spots remaining</p>
      </li>
      <li className="flex items-start gap-3">
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
          className="lucide lucide-circle-dollar-sign mt-0.5 size-5 shrink-0 text-text-primary"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
          <path d="M12 18V6" />
        </svg>
        <p className="text-sm leading-snug text-text-primary">
          <span className="sr-only">Price </span>
          <span className="font-semibold text-sm text-text-primary">
            <span className="font-bold">৳</span>
            <span className="font-bold">{session.price}</span> BDT
          </span>
        </p>
      </li>
    </>
  );

  return (
    <main className="min-h-screen bg-white pb-16 pt-24">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href={detailHref}
          className="mb-5 inline-flex h-10 w-fit items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-primary sm:mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-left"
            aria-hidden="true"
          >
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
          Back to Session Details
        </Link>

        <div className="grid gap-6 md:grid-cols-[1fr_300px] md:items-start md:gap-8 lg:grid-cols-[1fr_380px]">
          <section id="registration" aria-labelledby="registration-title" className="order-2 min-w-0 md:order-1">
            <h2 id="registration-title" className="sr-only">
              Registration
            </h2>
            {state.canRegister ? (
              <RegisterForm price={session.price ?? ""} />
            ) : (
              <div className="rounded-2xl border border-black/10 bg-gray-50 p-6 text-center sm:p-8">
                <p className="font-brand text-lg font-bold text-text-primary">Registration closed</p>
                <p className="mt-2 text-sm text-gray-600">
                  Registration is not available for this session right now.
                </p>
                <Link
                  href={detailHref}
                  className="mt-5 inline-flex text-sm font-semibold text-primary underline decoration-primary underline-offset-4"
                >
                  Back to session details
                </Link>
              </div>
            )}
          </section>

          <aside className="order-1 md:sticky md:top-24 md:order-2 md:self-start">
            <div className="md:hidden">
              <div className="rounded-2xl border border-black/5 bg-white p-4 shadow-sm sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-brand text-base font-bold text-text-primary sm:text-lg">
                    Session Summary
                  </h2>
                  <span className="shrink-0 rounded border border-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary">
                    {badge}
                  </span>
                </div>
                <p className="font-brand mt-2 text-sm font-semibold leading-snug text-text-primary">
                  {title}
                </p>
                <div className="mt-4">
                  <ul className="flex flex-col gap-3.5">{facts}</ul>
                </div>
                <p className="mt-4 text-center text-xs text-gray-500">Seat confirmed after payment.</p>
              </div>
            </div>

            <div className="hidden md:block">
              <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="font-brand text-lg font-bold text-text-primary">Session Summary</h2>
                <div className="mt-4">
                  <figure className="relative aspect-video w-full overflow-hidden rounded-lg bg-neutral-900">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={asideImageUrl(session.image ?? "")}
                      alt={title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover object-center"
                    />
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-black/40 to-transparent"
                      aria-hidden="true"
                    />
                  </figure>
                  <h3 className="font-brand mt-3 text-base font-bold leading-snug text-text-primary">
                    {title}
                  </h3>
                  <span className="mt-3 inline-block rounded border border-secondary bg-white px-2 py-0.5 text-xs font-medium text-secondary">
                    {badge}
                  </span>
                </div>
                <div className="mt-5">
                  <ul className="flex flex-col gap-4">{facts}</ul>
                </div>
                <p className="mt-4 text-center text-xs text-gray-500">Seat confirmed after payment.</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
