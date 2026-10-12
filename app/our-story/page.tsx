"use client";

import { useState } from "react";

// Reference page module exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

/**
 * Reconstructed from the original `app/our-story/page.tsx` client chunk
 * (module 5598). The whole page was one client component; the header/footer
 * come from the root layout.
 */
function TurnstileBox({ onVerify }: { onVerify: (token: string) => void }) {
  // NOTE: the original widget used Cloudflare Turnstile (site key
  // "0x4AAAAAADnd5vo_DhD_knHW") and called onVerify(token) once verified.
  // The widget script is not part of this rebuild, so the container stays
  // empty — exactly matching the reference server-rendered output.
  void onVerify;
  return <div id="cf-turnstile" />;
}

const INPUT_CLASS =
  "w-full rounded-lg border border-neutral-300 p-3 text-[var(--color-black)] outline-none focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary)]/20";

const BUTTON_CLASS =
  'inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-lg)] text-sm font-medium font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-[var(--color-primary)] text-white shadow-[var(--shadow-button)] hover:bg-[#b71b21] h-9 px-4 py-2 has-[>svg]:px-3 btn-primary w-full';

type Status = "idle" | "loading" | "success" | "error";

export default function OurStoryPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setMessage(null);
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      turnstileToken: token,
    };
    try {
      // NOTE: backend endpoint was lost with the original site - wire to your API
      // Original call:
      //   await fetch("/api/subscribers", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(payload),
      //   })
      void payload;
      setStatus("success");
      setMessage("Thanks for subscribing!");
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    }
  }

  return (
    <main className="mx-auto mt-14 min-h-screen bg-[var(--color-white)] px-6 py-16 text-[var(--color-black)]">
      <div className="mx-auto max-w-3xl space-y-10 text-lg leading-relaxed">
        <h2 className="text-center text-4xl font-bold">
          The Future of{" "}
          <span className="underline decoration-[var(--color-primary)]">
            Crossing Borders
          </span>
        </h2>
        <p className="font-secondary text-2xl font-bold italic">
          For decades, global education has been controlled by agencies.
        </p>
        <div className="space-y-1">
          <p>They sold dreams for commission.</p>
          <p>They offered promises without clarity.</p>
          <p>They sent students where profit mattered more than potential.</p>
        </div>
        <p className="mt-6">And, we accepted it.</p>
        <div className="space-y-1">
          <p>Accepted universities far below our potential.</p>
          <p>
            Accepted lives that weren’t what we imagined, planned, or deserved.
          </p>
          <p>
            Accepted that moving abroad meant gatekeeping, confusion, and
            stress.
          </p>
        </div>
        <p className="mt-8 text-2xl font-bold text-[var(--color-primary)]">
          THAT ERA IS OVER.
        </p>
        <p>
          We are building the future of crossing borders with{" "}
          <span className="font-secondary text-xl font-bold italic">
            next-gen tech.
          </span>
        </p>
        <div className="space-y-1">
          <p>Where you have full control.</p>
          <p>Where moving abroad feels less stressful.</p>
          <p>Where preparation is organized.</p>
          <p>Where guidance is honest.</p>
        </div>
        <p>
          <span className="font-bold text-[var(--color-primary)]">
            Beginning with AbroadMates:
          </span>{" "}
          <span className="text-[var(--color-black)]">
            A platform that connects you directly to real students, already
            abroad, already living the journey you dream of.
          </span>
        </p>
        <p className="font-bold text-[var(--color-black)]">Not agents.</p>
        <p className="font-bold text-[var(--color-black)]">Not salespeople.</p>
        <p>Peers who’ve been where you are.</p>
        <div className="space-y-1">
          <p>They help you avoid mistakes that cost time, money, and hope.</p>
          <p>This is not consultancy.</p>
          <p>This is mentorship: straight, personal, and real.</p>
        </div>
        <p>
          <span className="font-bold text-[var(--color-primary)]">
            Next, ApplicationMate:
          </span>{" "}
          <span className="text-[var(--color-black)]">
            an intelligent workspace where you can organize your application
            and apply to any university in the world with just one click.
          </span>
        </p>
        <div className="space-y-1">
          <p>We are starting with study abroad.</p>
          <p>Tomorrow, we&apos;ll expand to support every journey across borders.</p>
          <p>
            In the next 5 years, we will change applications to test prep, from
            visas to settling in, from landing your first job to building a new
            life – we&apos;ll be with you every step of the way.
          </p>
        </div>
        <section className="mt-12">
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <input
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your Name"
              className={INPUT_CLASS}
              required
            />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Your Email"
              className={INPUT_CLASS}
              required
            />
            <TurnstileBox onVerify={setToken} />
            <button
              type="submit"
              disabled={status === "loading" || !token.trim()}
              className={BUTTON_CLASS}
            >
              {status === "loading" ? "Submitting..." : "Join the movement"}
            </button>
            {message && (
              <p
                className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}
              >
                {message}
              </p>
            )}
          </form>
        </section>
      </div>
    </main>
  );
}
