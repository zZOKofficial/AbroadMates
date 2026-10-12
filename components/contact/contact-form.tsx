"use client";

import { useState } from "react";

/**
 * Reconstructed from the original `app/contact/page.tsx` client chunk
 * (module 56356) — the `#contact-form` section of the contact page.
 *
 * The reference SSR renders the Cloudflare Turnstile container empty
 * (`<div id="cf-turnstile"></div>`) and the submit button disabled because no
 * verification token has been received yet; both states are preserved here.
 */
function TurnstileBox({ onVerify }: { onVerify: (token: string) => void }) {
  // NOTE: the original widget used site key "0x4AAAAAADnd5vo_DhD_knHW" and
  // called onVerify(token) once Cloudflare verified the visitor. The widget
  // script is not part of this rebuild, so the container stays empty —
  // exactly matching the reference server-rendered output.
  void onVerify;
  return <div id="cf-turnstile" />;
}

const LABEL_CLASS =
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 text-text-primary";

const INPUT_CLASS =
  "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex min-w-0 outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive h-auto w-full rounded-xl border border-primary/10 bg-white px-4 py-3.5 text-base shadow-none transition focus-visible:border-primary focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10";

const SELECT_CLASS =
  "h-auto w-full rounded-xl border border-primary/10 bg-white px-4 py-3.5 text-base shadow-none transition focus-visible:border-primary focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 cursor-pointer focus:outline-none";

const TEXTAREA_CLASS =
  "placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm h-auto w-full rounded-xl border border-primary/10 bg-white px-4 py-3.5 text-base shadow-none transition focus-visible:border-primary focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-primary/10 min-h-32 resize-y";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [token, setToken] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      // NOTE: backend endpoint was lost with the original site - wire to your API
      // Original call:
      //   await fetch("/api/contact", {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({ ...data, turnstileToken: token }),
      //   })
      void data;
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact-form"
      className="scroll-mt-24 bg-transparent px-6 pb-16 sm:px-12 lg:px-16"
    >
      <div className="mx-auto max-w-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label
              data-slot="label"
              htmlFor="contact-name"
              className={LABEL_CLASS}
            >
              Name
            </label>
            <input
              type="text"
              data-slot="input"
              id="contact-name"
              placeholder="Your name"
              required
              name="name"
              className={INPUT_CLASS}
            />
          </div>
          <div className="space-y-2">
            <label
              data-slot="label"
              htmlFor="contact-email"
              className={LABEL_CLASS}
            >
              Email
            </label>
            <input
              type="email"
              data-slot="input"
              id="contact-email"
              placeholder="you@example.com"
              required
              name="email"
              className={INPUT_CLASS}
            />
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <label
                data-slot="label"
                htmlFor="contact-type"
                className={LABEL_CLASS}
              >
                Inquiry
              </label>
              <select
                id="contact-type"
                name="type"
                required
                className={SELECT_CLASS}
                defaultValue=""
              >
                <option value="" disabled>
                  Select type
                </option>
                <option value="student">Student Support</option>
                <option value="mentor">Mentor Application</option>
                <option value="partnership">Partnership</option>
                <option value="press">Press</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="space-y-2">
              <label
                data-slot="label"
                htmlFor="contact-urgency"
                className={LABEL_CLASS}
              >
                Priority
              </label>
              <select
                id="contact-urgency"
                name="urgency"
                required
                className={SELECT_CLASS}
                defaultValue="normal"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent (24h)</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label
              data-slot="label"
              htmlFor="contact-message"
              className={LABEL_CLASS}
            >
              Message
            </label>
            <textarea
              data-slot="textarea"
              id="contact-message"
              name="message"
              placeholder="How can we help?"
              required
              rows={5}
              className={TEXTAREA_CLASS}
            ></textarea>
          </div>
          <TurnstileBox onVerify={setToken} />
          {/* `.btn-primary` from the reference stylesheet is not present in
              globals.css, so its declarations are inlined here (bg, color,
              radius, font, shadow, padding-x, transition, hover). */}
          <button
            type="submit"
            className="btn-primary bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-semibold font-[var(--font-brand)] px-5 shadow-[var(--shadow-button)] transition-[background-color] duration-300 hover:bg-[#b71b21] w-full py-3.5 text-base disabled:cursor-not-allowed disabled:opacity-60"
            disabled={status === "loading" || !token.trim()}
          >
            {status === "loading" ? "Sending..." : "Send Message"}
          </button>
        </form>
        {status === "success" && (
          <div
            role="status"
            className="mt-5 flex items-center justify-center gap-2 text-sm font-medium text-success"
          >
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
              className="lucide lucide-circle-check-big h-4 w-4 shrink-0"
              aria-hidden="true"
            >
              <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
              <path d="m9 11 3 3L22 4"></path>
            </svg>
            Message sent — we&apos;ll be in touch soon.
          </div>
        )}
        {status === "error" && (
          <div
            role="alert"
            className="mt-5 text-center text-sm font-medium text-error"
          >
            Something went wrong. Please try again.
          </div>
        )}
      </div>
    </section>
  );
}
