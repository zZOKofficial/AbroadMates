"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Reference page module exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

/**
 * Reconstructed from the original `app/chat-with-founders/page.tsx` client
 * chunk (module 2211).
 *
 * Two original dependencies were lost with the site and are stubbed here:
 *  - the auth context (`useAuth()` → `{ user }`): without it every card keeps
 *    its reference state — `disabled` with the "Setting up..." label;
 *  - the mentor lookup endpoints `/api/mentors/by-slug/:slug` and
 *    `/api/mentors/by-email?email=…`, so the mentor-id map stays empty.
 * The booking dialog (radix `Dialog` + booking form) only ever opened for a
 * logged-in user with a resolved mentor id, so it is unreachable and omitted;
 * clicking a card shows the original login gate instead.
 */
type Founder = {
  name: string;
  slug: string;
  email: string;
  profilePicture: string;
  profilePicture2x: string;
  role: string;
  dbSlug: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Yasin Rahat",
    slug: "rahat",
    email: "rahat.tiu@gmail.com",
    profilePicture: "/images/team/AM-Rahat0103.png",
    profilePicture2x: "/images/team/AM-Rahatec4d.png",
    role: "rahat@abroadmates.com",
    dbSlug: "rahat-yasin",
  },
  {
    name: "Mayesha Maliha Proma",
    slug: "proma",
    email: "2malihaproma@gmail.com",
    profilePicture: "/images/team/AM-Proma53e0.png",
    profilePicture2x: "/images/team/AM-Proma94b9.png",
    role: "proma@abroadmates.com",
    dbSlug: "mayesha-maliha-proma",
  },
];

export default function ChatWithFoundersPage() {
  const router = useRouter();
  // NOTE: backend auth context was lost with the original site - wire to your API
  const user: { id: string } | null = null;
  const [mentorIds, setMentorIds] = useState<Record<string, string>>({});
  const [, setBooking] = useState({ mentorId: "", open: false });
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // NOTE: backend endpoint was lost with the original site - wire to your API
    // Original effect resolved each founder's mentor profile:
    //   fetch(`/api/mentors/by-slug/${founder.dbSlug}`)
    //   fetch(`/api/mentors/by-email?email=${encodeURIComponent(founder.email)}`)
    // and stored `data.mentorId` per slug. Without it the map stays empty.
    setMentorIds({});
  }, []);

  function goLogin() {
    setShowLogin(false);
    router.push("/login?next=" + encodeURIComponent("/chat-with-founders"));
  }

  function handleCardClick(slug: string) {
    if (!user) {
      setShowLogin(true);
      return;
    }
    const mentorId = mentorIds[slug];
    if (!mentorId) {
      const founder = FOUNDERS.find((f) => f.slug === slug);
      alert(
        "Mentor profile for " +
          (founder ? founder.name : "") +
          " is not set up yet. Please contact support.",
      );
      return;
    }
    setBooking({ mentorId, open: true });
  }

  return (
    <>
      {showLogin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-center text-lg font-semibold text-gray-900">
              What best describes you?
            </h3>
            <p className="mt-2 text-center text-sm text-gray-600">
              Log in with your AbroadMates account to book your call.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={goLogin}
                className="rounded-xl border-2 border-primary bg-white px-4 py-3 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-primary/10"
              >
                I&apos;m an existing mentor or I want to become a mentor
              </button>
              <button
                type="button"
                onClick={goLogin}
                className="rounded-xl border-2 border-primary bg-white px-4 py-3 text-left text-sm font-medium text-gray-800 transition-colors hover:bg-primary/10"
              >
                I&apos;m a student or I&apos;m planning my studies
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowLogin(false)}
              className="mt-4 w-full text-center text-sm text-gray-500 hover:text-gray-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <section className="mx-auto mt-10 max-w-6xl space-y-10 px-4 py-16">
        <h1 className="text-center text-2xl font-bold sm:text-4xl lg:text-4xl">
          Book a Planning Call
          <span className="font-secondary block font-bold text-primary">
            Not sure where to start? Let’s talk!
          </span>
        </h1>
        <div className="mx-auto max-w-3xl text-center">
          <p className="mt-3 text-sm text-pretty text-neutral-600 md:text-base">
            Book a free 15-minute planning call with us. It&apos;s quick,
            it&apos;s helpful, and it&apos;s totally free.
          </p>
          <p className="mt-3 text-sm text-pretty text-neutral-600 md:text-base">
            Here&apos;s how it works: You share your goal. You tell us where
            you&apos;re at right now. We listen, we think, and then we give you
            clear next steps you can actually use.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {FOUNDERS.map((founder) => (
            <div key={founder.slug}>
              <div
                onClick={() => handleCardClick(founder.slug)}
                className="group w-[320px] cursor-pointer space-y-4 rounded-2xl bg-white p-5 text-center shadow-md transition-all hover:shadow-lg"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl">
                  <img
                    src={founder.profilePicture}
                    alt={founder.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                    style={{ color: "transparent" }}
                    srcSet={`${founder.profilePicture} 1x, ${founder.profilePicture2x} 2x`}
                  />
                </div>
                <div className="space-y-1">
                  <h2 className="flex items-center justify-center gap-1 text-lg font-semibold">
                    {founder.name}
                  </h2>
                  <p className="text-sm text-gray-500">{founder.role}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(founder.slug);
                  }}
                  disabled={!user}
                  className={
                    "mt-2 flex w-full items-center justify-center gap-1 rounded-full py-2 font-medium shadow-sm transition-all " +
                    (user
                      ? "bg-gray-100 text-gray-800 group-hover:bg-(--color-accent) group-hover:text-black"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed")
                  }
                >
                  {user ? "Book a Call" : "Setting up..."}
                </button>
              </div>
              {/* Booking dialog (radix Dialog + booking form) opened only when
                  `booking.open` was true for a logged-in user with a resolved
                  mentor id — unreachable without the lost auth/backend, so it
                  is not rendered. */}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
