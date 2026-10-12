"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";

import { AuthForm, type FormValues } from "@/components/auth/auth-form";
import { Icon } from "@/components/auth/icon";
import { Logo } from "@/components/auth/logo";
import { Turnstile } from "@/components/auth/turnstile";

// Rebuilt from the original site's /register/mentor/sign-up page (chunk 5216, module 73755).
// NOTE: backend endpoint was lost with the original site - wire to your API.
// The original POSTed to /api/session/register with role: "mentor".

const LINK_CLASS =
  "text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2 decoration-[var(--color-primary)]/60 hover:opacity-90";

// Module 73755 `p` - "Account already exists" banner.
function AccountExistsBanner({ message, variant }: { message: string; variant: "mentor" | "student" }) {
  return (
    <div
      role="alert"
      className="mb-4 rounded-xl border-2 border-[var(--color-primary)]/35 bg-[var(--color-primary)]/8 px-4 py-3.5 shadow-sm sm:mb-5"
    >
      <p className="font-secondary text-xs font-semibold uppercase tracking-wide text-[var(--color-primary)]">
        Account already exists
      </p>
      <p className="mt-2 text-sm leading-relaxed text-[var(--color-black)]">{message}</p>
      <p className="mt-3 text-xs leading-relaxed text-neutral-600">
        One email can only be linked to one account type (student or mentor). Use the correct login or a
        different email.
      </p>
      <nav className="mt-4 flex flex-col gap-2 border-t border-[var(--color-primary)]/15 pt-3 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
        <Link href="/login" className={LINK_CLASS}>
          Log in
        </Link>
        {variant === "mentor" ? (
          <Link href="/register" className={LINK_CLASS}>
            Student sign-up
          </Link>
        ) : null}
        {variant === "student" ? (
          <Link href="/register/mentor/sign-up" className={LINK_CLASS}>
            Mentor sign-up
          </Link>
        ) : null}
      </nav>
    </div>
  );
}

const FIELDS = [
  { name: "fullName", label: "Full Name", type: "text", required: true, placeholder: "As students will see you" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@university.edu" },
  { name: "password", label: "Password", type: "password", required: true, placeholder: "At least 8 characters" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    placeholder: "Re-enter your password",
  },
  {
    name: "acceptedTerms",
    label: (
      <>
        Yes, I agree to the{" "}
        <Link href="/legals/terms-service" className="font-semibold text-primary underline underline-offset-2">
          Terms of Service
        </Link>
      </>
    ),
    type: "checkbox",
    required: true,
  },
];

const FEATURES = [
  {
    icon: "mdi:heart-outline",
    title: "Make a real impact",
    detail: "Turn your experience into someone else’s confidence.",
  },
  {
    icon: "mdi:calendar-clock-outline",
    title: "Mentor on your terms",
    detail: "Set your own availability around your life.",
  },
  {
    icon: "mdi:account-group-outline",
    title: "Find your people",
    detail: "Meet students who value the path you’ve walked.",
  },
];

export function MentorSignupForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [accountExists, setAccountExists] = React.useState(false);
  const [turnstileToken, setTurnstileToken] = React.useState("");

  const isAccountExistsError = (status: number, message: string) => {
    if (status === 409) return true;
    const lower = message.toLowerCase();
    return (
      lower.includes("already") &&
      (lower.includes("email") ||
        lower.includes("profile") ||
        lower.includes("account") ||
        lower.includes("registered"))
    );
  };

  const handleSubmit = async (values: FormValues) => {
    setFieldErrors({});
    setServerError(null);
    setAccountExists(false);

    if (values.acceptedTerms !== true) {
      setFieldErrors({ acceptedTerms: ["You must agree to the Terms of Service to continue"] });
      return;
    }

    setSubmitting(true);
    try {
      // NOTE: backend endpoint was lost with the original site - wire to your API
      // Original: POST /api/session/register { ...values, role: "mentor", turnstileToken }
      // then router.push("/verify-email?role=mentor") after tracking CompleteRegistration.
      const response = await fetch("/api/session/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, role: "mentor", turnstileToken }),
      });
      const payload = await response.json();
      if (!payload.success) {
        if (payload.fieldErrors) setFieldErrors(payload.fieldErrors);
        const message = payload.message || "Registration could not be completed.";
        if (payload.message) setServerError(message);
        setAccountExists(isAccountExistsError(response.status, message));
        return;
      }
      const email = typeof values.email === "string" ? values.email.trim().toLowerCase() : "";
      if (email) window.sessionStorage.setItem("abroadmates_pending_verification_email", email);
      router.push("/verify-email?role=mentor");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Registration failed");
      console.error("❌ Client error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fffaf5] min-[960px]:grid min-[960px]:grid-cols-[minmax(0,1.05fr)_minmax(480px,0.95fr)]">
      <section className="relative isolate hidden overflow-hidden bg-primary px-5 py-7 text-white sm:px-10 min-[960px]:flex min-[960px]:min-h-screen min-[960px]:flex-col min-[960px]:px-12 min-[960px]:py-9 xl:px-16">
        <div aria-hidden className="absolute -top-32 -left-32 h-80 w-80 rounded-full border-48 border-white/5" />
        <div aria-hidden className="absolute top-[42%] -right-24 h-72 w-72 rounded-full border-55 border-secondary/20" />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1.2px,transparent_1.2px)] bg-size-[22px_22px] opacity-[0.08]"
        />

        <div className="relative z-10 mx-auto my-auto w-full max-w-2xl py-6 min-[960px]:py-10">
          <div className="flex items-center justify-between gap-4">
            <Logo variant="dark" size="md" />
            <Link
              href="/login"
              className="shrink-0 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-primary sm:text-sm"
            >
              Already a member? <span className="underline underline-offset-2">Log in</span>
            </Link>
          </div>

          <div className="mt-8 max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-black shadow-sm">
              <Icon icon="mdi:sparkles" className="h-4 w-4" aria-hidden />
              Your experience can change a life
            </span>
            <h1 className="mt-5 font-brand text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Be the mentor
              <span className="block font-secondary text-[1.18em] leading-[0.95] text-secondary">
                you once needed.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              Your wins, wrong turns, and lessons are exactly what a student needs to hear. Share the
              journey—not just the destination.
            </p>
          </div>

          <div className="relative mt-7 hidden min-h-65 sm:block min-[960px]:min-h-75">
            <div className="absolute top-2 left-[25%] h-56 w-56 rounded-full bg-white/10 blur-2xl min-[960px]:h-64 min-[960px]:w-64" />
            <Image
              src="/reg-page.png"
              alt="AbroadMate launching toward new possibilities"
              width={430}
              height={430}
              className="absolute -top-7 left-1/2 h-auto w-64 -translate-x-1/2 drop-shadow-2xl min-[960px]:w-80"
              priority
            />
            <div className="absolute top-3 left-0 -rotate-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-text-primary shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success">
                  <Icon icon="mdi:message-text-outline" className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] text-gray">A student needs help with</p>
                  <p className="text-xs font-bold">Scholarship strategy</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-6 rotate-2 rounded-2xl bg-secondary px-4 py-3 text-black shadow-xl">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:calendar-check-outline" className="h-6 w-6" aria-hidden />
                <div>
                  <p className="text-[10px] font-medium opacity-70">You choose when</p>
                  <p className="text-xs font-bold">Flexible mentoring</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-7 grid gap-3 sm:grid-cols-3 min-[960px]:mt-2">
            {FEATURES.map((feature) => (
              <li key={feature.title} className="rounded-2xl border border-white/15 bg-black/10 p-4 backdrop-blur-sm">
                <Icon icon={feature.icon} className="h-6 w-6 text-secondary" aria-hidden />
                <p className="mt-2 text-sm font-bold">{feature.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/65">{feature.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative flex w-full flex-col items-center px-4 pt-5 pb-10 sm:px-8 sm:pt-6 min-[960px]:min-h-screen min-[960px]:justify-center min-[960px]:px-10 min-[960px]:py-10 xl:px-16">
        <div aria-hidden className="absolute top-0 right-0 h-40 w-40 rounded-bl-full bg-secondary/10" />

        <div className="relative z-10 flex w-full max-w-md shrink-0 items-center justify-between gap-3 min-[960px]:hidden">
          <Logo size="sm" />
          <Link href="/login" className="shrink-0 text-sm font-semibold text-primary hover:underline">
            Log in
          </Link>
        </div>

        <div className="relative w-full max-w-md pt-5 min-[960px]:pt-0">
          <div className="mb-7">
            <h2 className="font-brand text-3xl font-bold tracking-tight text-text-primary">
              Let’s get you started
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray">
              Create your account now. You’ll add your story, expertise, and availability next.
            </p>
          </div>

          {accountExists && serverError ? <AccountExistsBanner message={serverError} variant="mentor" /> : null}

          <AuthForm
            fields={FIELDS}
            onSubmit={handleSubmit}
            submitLabel={submitting ? "Creating your account…" : "Continue to build my profile"}
            submitClassName="btn-primary mt-2 w-full cursor-pointer py-3.5 text-sm shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            inputClassName="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm text-text-primary placeholder:text-gray/70 transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 focus:outline-none"
            fieldErrors={fieldErrors}
            // Original also disabled this until Cloudflare Turnstile verified the widget;
            // with the Turnstile scripts lost only `submitting` can gate it.
            disabled={submitting}
            beforeSubmit={<Turnstile onVerify={setTurnstileToken} />}
          />

          <p className="mt-3 text-center text-xs leading-relaxed text-gray">
            By creating an account you agree to our{" "}
            <Link href="/legals/terms-service" className="font-semibold text-primary underline underline-offset-2">
              Terms of Service
            </Link>
            .
          </p>

          {serverError && !accountExists ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-error/20 bg-error/10 p-3 text-center text-sm text-error"
            >
              <p>{serverError}</p>
            </div>
          ) : null}

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-secondary/10 px-3 py-2.5 text-xs leading-relaxed text-text-primary">
            <Icon icon="mdi:shield-check-outline" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <p>Your information stays private until you finish and submit your mentor profile.</p>
          </div>

          <p className="mt-6 text-center text-sm text-gray">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-gray">
            Here to find guidance?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Join as a student
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default MentorSignupForm;
