"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { AuthForm, type FormValues } from "@/components/auth/auth-form";
import { GoogleButton } from "@/components/auth/google-button";
import { Icon } from "@/components/auth/icon";
import { Logo } from "@/components/auth/logo";
import { Turnstile } from "@/components/auth/turnstile";
import {
  getOnboardingData,
  isHearAboutUsSet,
  isWizardComplete,
  resumeHref,
  syncDerivedFields,
} from "@/components/auth/onboarding-store";

// Rebuilt from the original site's /register page (chunks 2678/7241, module 24683).
// NOTE: backend endpoint was lost with the original site - wire to your API.
// The original POSTed to /api/session/register (email signup) and /api/auth/google
// (Google signup), validated referral codes through /api/referrals/validate, and read
// the wizard answers from the in-memory onboarding store.

const REFERRAL_STORAGE_KEY = "abroadmates_referral_code";

const FIELDS = [
  { name: "firstName", label: "First Name", type: "text", required: true, placeholder: "Your first name" },
  { name: "lastName", label: "Last Name", type: "text", required: true, placeholder: "Your last name" },
  { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
  { name: "password", label: "Password", type: "password", required: true, placeholder: "At least 8 characters" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    type: "password",
    required: true,
    placeholder: "Re-enter your password",
  },
];

const FEATURES = [
  {
    icon: "mdi:compass-outline",
    title: "Find your direction",
    detail: "Turn broad ambitions into a clear study-abroad plan.",
  },
  {
    icon: "mdi:account-heart-outline",
    title: "Learn from real journeys",
    detail: "Connect with mentors who have already walked the path.",
  },
  {
    icon: "mdi:rocket-launch-outline",
    title: "Move with confidence",
    detail: "Make each application decision with the right support.",
  },
];

type OnboardingSnapshot = ReturnType<typeof getOnboardingData>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // NOTE: backend endpoint was lost with the original site - wire to your API
  // (original: const { user } = useAuth())
  const user = null as { role: string } | null;

  const [serverError, setServerError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [googleSubmitting, setGoogleSubmitting] = React.useState(false);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string[]>>({});
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [referralState, setReferralState] = React.useState<"valid" | "invalid" | null>(null);
  const [referrerName, setReferrerName] = React.useState("");
  const [mounted, setMounted] = React.useState(false);

  // Module 24683 - redirect signed-in users, else wait for the wizard resume check.
  React.useEffect(() => {
    // NOTE: backend endpoint was lost with the original site - wire to your API
    if (user) {
      const destination =
        user.role === "student" ? resumeHref(getOnboardingData()) : "/dashboard/student";
      router.push(destination);
      return;
    }
  }, [user, router]);

  // Module 24683 - referral code from ?ref/?invite or localStorage.
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get("ref") || params.get("invite") || "";
    const fromStorage = window.localStorage.getItem(REFERRAL_STORAGE_KEY) || "";
    const code = (fromUrl || fromStorage || "").toUpperCase().trim().replace(/[^A-Z0-9-]/g, "");
    if (!code) return;
    window.localStorage.setItem(REFERRAL_STORAGE_KEY, code);
    let cancelled = false;
    (async () => {
      try {
        // NOTE: backend endpoint was lost with the original site - wire to your API
        // Original: GET /api/referrals/validate?code=... -> { data: { valid, referrerName } }
        const response = await fetch(`/api/referrals/validate?code=${encodeURIComponent(code)}`);
        const payload = await response.json();
        if (cancelled) return;
        if (payload?.data?.valid) {
          setReferralState("valid");
          setReferrerName(typeof payload.data.referrerName === "string" ? payload.data.referrerName : "");
        } else {
          setReferralState("invalid");
        }
      } catch {
        if (!cancelled) setReferralState("invalid");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Module 24683 - resume the wizard (or show the form) once the store is checked.
  React.useEffect(() => {
    if (user) return;
    const timer = setTimeout(() => {
      syncDerivedFields();
      const data = getOnboardingData();
      if (!isWizardComplete(data)) {
        router.replace(resumeHref(data));
        return;
      }
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, [router, user]);

  const handleSubmit = async (values: FormValues) => {
    setServerError(null);
    const firstName = String(values.firstName || "").trim();
    const lastName = String(values.lastName || "").trim();
    const email = String(values.email || "").trim();
    const password = String(values.password || "");
    const confirmPassword = String(values.confirmPassword || "");

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setServerError("Please fill all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setServerError("Passwords don't match");
      return;
    }

    const fullName = `${firstName} ${lastName}`.trim();
    const onboarding = getOnboardingData();
    if (!isHearAboutUsSet(onboarding.hearAboutUs, onboarding.hearAboutUsOther)) {
      setServerError(
        "Please tell us where you heard about us in the onboarding flow, then return here to sign up."
      );
      return;
    }

    const referralCode = window.localStorage.getItem(REFERRAL_STORAGE_KEY) || "";
    setSubmitting(true);
    try {
      syncDerivedFields();
      const data = getOnboardingData();
      if (!isWizardComplete(data)) {
        setServerError("Please complete all onboarding steps first. Go through the steps and return here to sign up.");
        router.replace(resumeHref(data));
        return;
      }
      if (data.ieltsTaken === true && (!data.ieltsScore || String(data.ieltsScore).trim() === "")) {
        setServerError(
          "Please add your IELTS overall band score in the onboarding flow, then return here to sign up."
        );
        return;
      }

      const studentProfile = { ...data, firstName, lastName };
      // NOTE: backend endpoint was lost with the original site - wire to your API
      // Original: POST /api/session/register (credentials: include) with
      // { fullName, email, password, confirmPassword, role: "student", turnstileToken,
      //   hearAboutUs, hearAboutUsOther, referralCode?, studentProfile }
      // then router.push("/verify-email") after tracking a CompleteRegistration event.
      void fetch("/api/session/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          role: "student",
          turnstileToken,
          hearAboutUs: onboarding.hearAboutUs,
          hearAboutUsOther:
            onboarding.hearAboutUs === "other" ? onboarding.hearAboutUsOther?.trim() : undefined,
          ...(referralCode ? { referralCode } : {}),
          studentProfile,
        }),
      });
      window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
      window.sessionStorage.setItem("abroadmates_pending_verification_email", email);
      router.push("/verify-email");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleCredential = React.useCallback(
    async (credential: string) => {
      setServerError(null);
      setGoogleSubmitting(true);
      try {
        syncDerivedFields();
        const data = getOnboardingData();
        if (!isWizardComplete(data)) {
          setServerError("Please complete all onboarding steps first. Go through the steps and return here to sign up.");
          router.replace(resumeHref(data));
          return;
        }
        if (!isHearAboutUsSet(data.hearAboutUs, data.hearAboutUsOther)) {
          setServerError(
            "Please tell us where you heard about us in the onboarding flow, then return here to sign up."
          );
          return;
        }
        const referralCode = window.localStorage.getItem(REFERRAL_STORAGE_KEY) || "";
        // NOTE: backend endpoint was lost with the original site - wire to your API
        // Original: POST /api/auth/google { credential, intent: "signup", role: "student",
        //   hearAboutUs, hearAboutUsOther, referralCode?, studentProfile: data }
        void fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            credential,
            intent: "signup",
            role: "student",
            hearAboutUs: data.hearAboutUs,
            hearAboutUsOther: data.hearAboutUs === "other" ? data.hearAboutUsOther?.trim() : undefined,
            ...(referralCode ? { referralCode } : {}),
            studentProfile: data,
          }),
        });
        window.localStorage.removeItem(REFERRAL_STORAGE_KEY);
        const next = searchParams.get("next");
        router.push(next && next.startsWith("/") && !next.startsWith("//") ? next : "/dashboard/student");
      } catch (error) {
        setServerError(error instanceof Error ? error.message : "Google signup failed");
      } finally {
        setGoogleSubmitting(false);
      }
    },
    [router, searchParams]
  );

  if (!mounted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#fffaf5]">
        <p className="text-sm text-gray">Loading…</p>
      </main>
    );
  }

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
              Your dream deserves a clear plan
            </span>
            <h1 className="mt-5 font-brand text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Your next chapter
              <span className="block font-secondary text-[1.18em] leading-[0.95] text-secondary">
                starts right here.
              </span>
            </h1>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">
              From choosing the right country to submitting a strong application, build your journey with
              guidance from people who have done it before.
            </p>
          </div>

          <div className="relative mt-7 hidden min-h-65 sm:block min-[960px]:min-h-75">
            <div className="absolute top-2 left-[25%] h-56 w-56 rounded-full bg-white/10 blur-2xl min-[960px]:h-64 min-[960px]:w-64" />
            <Image
              src="/reg-page.png"
              alt="Student launching toward study-abroad opportunities"
              width={430}
              height={430}
              className="absolute -top-7 left-1/2 h-auto w-64 -translate-x-1/2 drop-shadow-2xl min-[960px]:w-80"
              priority
            />
            <div className="absolute top-3 left-0 -rotate-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-text-primary shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success">
                  <Icon icon="mdi:school-outline" className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] text-gray">Your goal</p>
                  <p className="text-xs font-bold">The right university</p>
                </div>
              </div>
            </div>
            <div className="absolute right-0 bottom-6 rotate-2 rounded-2xl bg-secondary px-4 py-3 text-black shadow-xl">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:map-marker-path" className="h-6 w-6" aria-hidden />
                <div>
                  <p className="text-[10px] font-medium opacity-70">Step by step</p>
                  <p className="text-xs font-bold">A clearer journey</p>
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
              Create your student account
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray">
              Save your preferences, meet the right mentors, and keep your journey moving.
            </p>
          </div>

          {referralState === "valid" ? (
            <div className="mb-4 rounded-xl border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary">
              <p className="flex items-center gap-2 font-semibold">
                <Icon icon="mdi:gift-outline" className="h-5 w-5" aria-hidden />
                Referral applied
              </p>
              <p className="mt-1 text-[13px] text-neutral-700">
                {referrerName ? `${referrerName} invited you. ` : ""}
                You&apos;ll get 5% off your first 2 mentorship sessions after signing up.
              </p>
            </div>
          ) : null}

          {referralState === "invalid" ? (
            <div className="mb-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              This referral link looks invalid, but you can still sign up normally.
            </div>
          ) : null}

          <GoogleButton
            text="signup_with"
            disabled={submitting || googleSubmitting}
            onCredential={handleGoogleCredential}
            onError={setServerError}
          />

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-gray-200" />
            <span className="text-xs font-medium text-gray">or</span>
            <span className="h-px flex-1 bg-gray-200" />
          </div>

          <AuthForm
            fields={FIELDS}
            onSubmit={handleSubmit}
            submitLabel={submitting ? "Creating your account…" : "Create my student account"}
            submitClassName="btn-primary mt-2 w-full cursor-pointer py-3.5 text-sm shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
            inputClassName="w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-3 text-sm text-text-primary placeholder:text-gray/70 transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 focus:outline-none"
            fieldErrors={fieldErrors}
            // Original also disabled this until Cloudflare Turnstile verified the widget;
            // with the Turnstile scripts lost only `submitting` can gate it.
            disabled={submitting}
            beforeSubmit={<Turnstile onVerify={setTurnstileToken} />}
          />

          {serverError ? (
            <div
              role="alert"
              className="mt-4 rounded-xl border border-error/20 bg-error/10 p-3 text-center text-sm text-error"
            >
              <p>{serverError}</p>
              {serverError.toLowerCase().includes("mentor") ||
              serverError.toLowerCase().includes("already registered") ? (
                <p className="mt-2">
                  <Link href="/login" className="font-medium underline">
                    Go to Log In
                  </Link>
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="mt-5 flex items-start gap-2 rounded-xl bg-secondary/10 px-3 py-2.5 text-xs leading-relaxed text-text-primary">
            <Icon icon="mdi:shield-check-outline" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <p>By signing up, you agree to our Terms &amp; Privacy Policy.</p>
          </div>

          <p className="mt-6 text-center text-sm text-gray">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Log in
            </Link>
          </p>

          <p className="mt-2 text-center text-sm text-gray">
            Want to guide students instead?{" "}
            <Link href="/register/mentor/sign-up" className="font-semibold text-primary hover:underline">
              Join as a mentor
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}

export default RegisterForm;
