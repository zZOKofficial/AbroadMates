"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Icon } from "@/components/auth/icon";
import { Logo } from "@/components/auth/logo";
import { GoogleButton } from "@/components/auth/google-button";
import { PasswordField } from "@/components/auth/password-field";
import { Turnstile, resetTurnstile } from "@/components/auth/turnstile";

// Rebuilt from the original site's /login page (chunks 6678/5105, modules 89641/11066/3937).
// NOTE: backend endpoint was lost with the original site - wire to your API.
// The original page posted to /api/session/me (email + password + turnstileToken) and
// /api/auth/google (Google credential), and read the signed-in user from an AuthProvider
// fed by /api/session/me + /api/auth/refresh. None of those endpoints survive, so this
// rebuild keeps the exact markup and drives it with local state only.

const INPUT_CLASS =
  "w-full rounded-xl border border-gray-200 bg-[#fafafa] px-4 py-2.5 text-sm text-text-primary placeholder:text-gray/70 transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10 focus:outline-none lg:py-3";

const FEATURES = [
  {
    icon: "mdi:account-multiple-outline",
    title: "One place for everyone",
    detail: "Mentees and mentors use this login to access their dashboard.",
  },
  {
    icon: "mdi:compass-outline",
    title: "Pick up where you left off",
    detail: "Your dashboard, sessions, and progress wait for you.",
  },
  {
    icon: "mdi:shield-check-outline",
    title: "Secure by design",
    detail: "Your account stays protected every time you log in.",
  },
];

// Module 11066 - mentorship-checkout copy.
const CHECKOUT_REASON = "application-mentorship-checkout";
const CHECKOUT_TITLE = "Continue your mentorship checkout";
const CHECKOUT_BOOKING_COPY = `To book ${"Complete Application Mentorship"}, you need a free AbroadMates student account.`;
const CHECKOUT_LOGIN_COPY = "Already have an account? Log in below with your email and password.";
const CHECKOUT_NO_ACCOUNT_COPY = "Don't have an account yet?";
const CHECKOUT_SIGNUP_LABEL = "Create a free student account";

// Module 3937 - `next` query/cookie helpers.
const NEXT_COOKIE = "abm_auth_next";

function safePath(value: string | null | undefined, fallback = "/"): string | null {
  if (!value || typeof value !== "string") return fallback;
  let path = value.trim();
  try {
    path = decodeURIComponent(path);
  } catch {
    // keep raw value
  }
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\") || path.includes("\\"))
    return fallback;
  return path;
}

function readNextParam(value: string | null | undefined, opts?: { cookieNext?: string | null; allowCookie?: boolean }) {
  const direct = safePath(value, "");
  if (direct) return direct;
  if (opts?.allowCookie) {
    const fromCookie = safePath(opts.cookieNext ?? null, "");
    if (fromCookie) return fromCookie;
  }
  return null;
}

function storeNextCookie(value: string | null | undefined) {
  if (typeof document === "undefined") return;
  const path = safePath(value, "");
  if (path) {
    document.cookie = `${NEXT_COOKIE}=${encodeURIComponent(path)}; Max-Age=${86400}; Path=/; SameSite=Lax`;
  }
}

function readNextCookie(): string | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie.split("; ").find((c) => c.startsWith(`${NEXT_COOKIE}=`));
  if (!entry) return null;
  return safePath(entry.slice(NEXT_COOKIE.length + 1), "") || null;
}

// Module 3937 `Hh` - student sign-up href.
function signupHrefFor(next: string | null) {
  const path = safePath(next, "");
  return path ? `/register/form?step=1&next=${encodeURIComponent(path)}` : "/register/form?step=1";
}

type CheckoutBannerProps = { signupHref: string };

// Module 89641 `v` - "sign in to continue checkout" explainer (shown for ?reason=...checkout).
function CheckoutBanner({ signupHref }: CheckoutBannerProps) {
  return (
    <div
      className="mb-4 rounded-2xl border border-primary/15 bg-[#FFF5F5] px-4 py-4 text-text-primary"
      role="region"
      aria-label="How to continue mentorship checkout"
    >
      <div className="flex items-start gap-3">
        <span
          className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          aria-hidden
        >
          <Icon icon="mdi:login-variant" className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-primary">Sign in to continue checkout</p>
          <p className="mt-1 text-xs leading-relaxed text-gray">{CHECKOUT_BOOKING_COPY}</p>
          <p className="mt-2 text-xs font-medium leading-relaxed text-text-primary">{CHECKOUT_LOGIN_COPY}</p>
        </div>
      </div>
      <p className="mt-4 text-center text-xs leading-relaxed text-gray">
        {CHECKOUT_NO_ACCOUNT_COPY}{" "}
        <Link href={signupHref} className="font-semibold text-primary hover:underline">
          {CHECKOUT_SIGNUP_LABEL}
        </Link>
      </p>
    </div>
  );
}

// Module 89641 `w` - signed-in banners for the checkout flow.
function SignedInBanner({
  email,
  returnPath,
  needsStudentProfile,
}: {
  email: string;
  returnPath: string;
  needsStudentProfile: boolean;
}) {
  const profileHref = signupHrefFor(returnPath);
  const switchHref = `/login?next=${encodeURIComponent(returnPath)}`;

  if (needsStudentProfile) {
    return (
      <div
        className="mb-4 rounded-2xl border border-primary/15 bg-[#FFF5F5] px-4 py-4 text-text-primary"
        role="region"
        aria-label="Complete your student profile"
      >
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
            aria-hidden
          >
            <Icon icon="mdi:account-check-outline" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-primary">You&apos;re signed in as {email}</p>
            <p className="mt-1 text-xs leading-relaxed text-gray">
              Finish your free student profile to continue mentorship checkout. It only takes a few minutes.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Link href={profileHref} className="btn-primary flex-1 py-3 text-center text-sm">
            Complete student profile
          </Link>
          <button
            type="button"
            className="flex-1 rounded-full border border-gray-200 px-4 py-3 text-sm font-semibold text-gray hover:border-primary hover:text-primary"
            onClick={
              // NOTE: backend endpoint was lost with the original site - wire to your API
              // (original called the auth store's logout() here)
              () => {}
            }
          >
            Use a different account
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4 rounded-2xl border border-success/20 bg-success/5 px-4 py-4 text-sm text-text-primary">
      <p className="font-semibold text-success">You&apos;re signed in</p>
      <p className="mt-1 text-xs text-gray">
        Taking you back to checkout… If nothing happens,{" "}
        <Link href={returnPath} className="font-semibold text-primary hover:underline">
          continue here
        </Link>
        .
      </p>
    </div>
  );
}

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // NOTE: backend endpoint was lost with the original site - wire to your API
  // (original: const { user, setUser, refreshUser, loading } = useAuth())
  const user = null as { _id: string; email: string; role: string } | null;
  const authLoading = false;

  const [form, setForm] = React.useState({ email: "", password: "" });
  const [hasStudentProfile, setHasStudentProfile] = React.useState<boolean | null>(null);
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [verifiedMessage, setVerifiedMessage] = React.useState("");
  const [resendSuccess, setResendSuccess] = React.useState<string | null>(null);
  const [resendError, setResendError] = React.useState<string | null>(null);
  const [resending, setResending] = React.useState(false);
  const [turnstileToken, setTurnstileToken] = React.useState("");
  const [googleAccountMissing, setGoogleAccountMissing] = React.useState(false);
  const [googleSubmitting, setGoogleSubmitting] = React.useState(false);
  const turnstileRef = React.useRef<{ reset: () => void }>(null);

  React.useEffect(() => {
    storeNextCookie(searchParams.get("next"));

    const verified = searchParams.get("verified");
    if (verified === "true") {
      setVerifiedMessage("Your email has been successfully verified. You can now log in.");
    } else if (verified === "already") {
      setVerifiedMessage("Your email is already verified. Please log in.");
    }

    const email = searchParams.get("email");
    if (email) setForm((f) => (f.email ? f : { ...f, email }));

    const error = searchParams.get("error");
    if (error) {
      switch (error) {
        case "invalid_token":
          setServerError("Invalid or expired verification link. Please request a new verification email.");
          break;
        case "user_not_found":
          setServerError("User account not found. Please register again.");
          break;
        case "verification_failed":
          setServerError("Email verification failed. Please try again or contact support.");
          break;
        default:
          setServerError("An error occurred during email verification.");
      }
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resendVerification = async () => {
    if (!form.email || resending) {
      setResendError(null);
      setResendSuccess(null);
      setResending(true);
      try {
        // NOTE: backend endpoint was lost with the original site - wire to your API
        // Original: POST /api/auth/resend-verification { email } (credentials: include)
        void form.email;
        setResendError("Could not send. Try again.");
      } catch {
        setResendError("Could not send. Try again.");
      } finally {
        setResending(false);
      }
    }
  };

  const resolvePostLoginDestination = React.useCallback(
    (profile: { role?: string; profileCompleted?: boolean; scholarshipVerificationPending?: boolean }) => {
      const next = readNextParam(searchParams.get("next"), {
        cookieNext: readNextCookie(),
        allowCookie: !!searchParams.get("verified"),
      });
      if (profile.role === "mentor") {
        if (profile.profileCompleted) {
          if (profile.scholarshipVerificationPending) return "/register/mentor/verify-scholarships";
          return next || "/dashboard/mentor";
        }
        return "/register/mentor/onboarding";
      }
      if (next) return next;
      return "/dashboard/student";
    },
    [searchParams]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setServerError(null);
    setResendSuccess(null);
    setResendError(null);
    try {
      // NOTE: backend endpoint was lost with the original site - wire to your API
      // Original: POST /api/session/me { ...form, turnstileToken } (credentials: include),
      // then router.push(resolvePostLoginDestination(user)).
      void turnstileToken;
      void resolvePostLoginDestination;
      router.push("/dashboard/student");
    } catch (error) {
      setServerError(error instanceof Error ? error.message : "An unexpected error occurred");
    } finally {
      setSubmitting(false);
      resetTurnstile(setTurnstileToken, turnstileRef);
    }
  };

  const nextParam = searchParams.get("next");
  const signupHref = signupHrefFor(nextParam);
  const isCheckout = searchParams.get("reason") === CHECKOUT_REASON;
  const returnPath = readNextParam(nextParam, { cookieNext: readNextCookie(), allowCookie: true }) || "/mentors";
  const needsProfileBanner =
    isCheckout && !!user?._id && user.role === "student" && hasStudentProfile === false;
  const signedInBanner =
    needsProfileBanner || (isCheckout && !!user?._id && user.role === "student" && hasStudentProfile === true);
  const mentorSignupHref = nextParam
    ? `/register/mentor/sign-up?next=${encodeURIComponent(nextParam)}`
    : "/register/mentor/sign-up";

  React.useEffect(() => {
    if (!isCheckout || !user?._id || user.role !== "student") {
      setHasStudentProfile(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        // NOTE: backend endpoint was lost with the original site - wire to your API
        // Original: GET /api/students/application-mentorship (credentials: include) -> data.hasStudentProfile
        void 0;
        if (cancelled) return;
        setHasStudentProfile(true);
      } catch {
        if (!cancelled) setHasStudentProfile(null);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isCheckout, user?._id, user?.role]);

  const handleGoogleCredential = React.useCallback(
    async (credential: string) => {
      setGoogleSubmitting(true);
      setGoogleAccountMissing(false);
      setServerError(null);
      try {
        // NOTE: backend endpoint was lost with the original site - wire to your API
        // Original: POST /api/auth/google { credential, intent: "login" } (credentials: include)
        void credential;
        router.push("/dashboard/student");
      } catch (error) {
        setServerError(error instanceof Error ? error.message : "Google login failed");
      } finally {
        setGoogleSubmitting(false);
      }
    },
    [router]
  );

  return (
    <main className="flex h-dvh overflow-hidden bg-[#fffaf5] lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(420px,0.95fr)]">
      <section className="relative isolate hidden h-full overflow-hidden bg-primary px-10 py-8 text-white lg:flex lg:flex-col xl:px-14">
        <div
          aria-hidden
          className="absolute -top-32 -left-32 h-80 w-80 rounded-full border-48 border-white/5"
        />
        <div
          aria-hidden
          className="absolute top-[42%] -right-24 h-72 w-72 rounded-full border-55 border-secondary/20"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_1.2px,transparent_1.2px)] bg-size-[22px_22px] opacity-[0.08]"
        />
        <div className="relative z-10 mx-auto my-auto flex h-full w-full max-w-2xl flex-col justify-center py-4">
          <div className="flex items-center justify-between gap-4">
            <Logo variant="dark" size="md" />
            <Link
              href={signupHref}
              className="shrink-0 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-primary sm:text-sm"
            >
              New here? <span className="underline underline-offset-2">Sign up</span>
            </Link>
          </div>

          <div className="mt-6 max-w-xl xl:mt-8">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 text-xs font-bold text-black shadow-sm">
              <Icon icon="mdi:sparkles" className="h-4 w-4" aria-hidden />
              {isCheckout ? "Checkout in progress" : "Welcome back to AbroadMates"}
            </span>
            <h1 className="mt-4 font-brand text-4xl leading-[1.05] font-bold tracking-tight xl:mt-5 xl:text-5xl [@media(max-height:780px)]:text-3xl">
              {isCheckout ? (
                <>
                  Sign in to
                  <span className="block font-secondary text-[1.18em] leading-[0.95] text-secondary">
                    continue checkout.
                  </span>
                </>
              ) : (
                <>
                  Continue your
                  <span className="block font-secondary text-[1.18em] leading-[0.95] text-secondary">
                    study-abroad journey.
                  </span>
                </>
              )}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 xl:mt-4 xl:text-base [@media(max-height:780px)]:mt-2 [@media(max-height:780px)]:line-clamp-2">
              {isCheckout
                ? "Already have an account? Log in on the right. New here? You can create a free student account after you check."
                : "Log in to reconnect with mentors, track your progress, and keep moving toward the next chapter of your story."}
            </p>
          </div>

          <div className="relative mt-6 hidden min-h-40 xl:mt-8 xl:block [@media(max-height:820px)]:hidden">
            <div className="absolute top-2 left-[20%] h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute top-2 left-0 -rotate-3 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-text-primary shadow-xl">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-success/15 text-success">
                  <Icon icon="mdi:login-variant" className="h-4 w-4" aria-hidden />
                </span>
                <div>
                  <p className="text-[10px] text-gray">You&apos;re back</p>
                  <p className="text-xs font-bold">Ready to continue</p>
                </div>
              </div>
            </div>
            <div className="absolute top-14 right-0 rotate-2 rounded-2xl bg-secondary px-4 py-3 text-black shadow-xl">
              <div className="flex items-center gap-2">
                <Icon icon="mdi:rocket-launch-outline" className="h-6 w-6" aria-hidden />
                <div>
                  <p className="text-[10px] font-medium opacity-70">Next up</p>
                  <p className="text-xs font-bold">Your dashboard</p>
                </div>
              </div>
            </div>
          </div>

          <ul className="mt-6 grid gap-3 sm:grid-cols-3 xl:mt-8 [@media(max-height:700px)]:hidden">
            {FEATURES.map((feature) => (
              <li
                key={feature.title}
                className="rounded-2xl border border-white/15 bg-black/10 p-3 backdrop-blur-sm xl:p-4"
              >
                <Icon icon={feature.icon} className="h-5 w-5 text-secondary xl:h-6 xl:w-6" aria-hidden />
                <p className="mt-1.5 text-sm font-bold">{feature.title}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-white/65 [@media(max-height:820px)]:hidden">
                  {feature.detail}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden px-4 pt-5 pb-4 sm:px-8 sm:pt-6 lg:items-center lg:justify-center lg:px-10 lg:py-4 xl:px-14">
        <div
          aria-hidden
          className="absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-secondary/10 lg:h-40 lg:w-40"
        />
        <div className="relative z-10 flex w-full shrink-0 items-center justify-between gap-3 lg:hidden">
          <Logo size="sm" />
          <Link href={signupHref} className="shrink-0 text-sm font-semibold text-primary hover:underline">
            {isCheckout ? "Create account" : "Sign up"}
          </Link>
        </div>

        <div className="relative flex min-h-0 w-full flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <div className="mb-4 lg:mb-5">
              <h1 className="font-brand text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                {isCheckout ? CHECKOUT_TITLE : "Welcome back"}
              </h1>
              <p className="mt-1 text-sm leading-snug text-gray">
                {isCheckout
                  ? "Choose the option that fits you, then we will bring you right back to checkout."
                  : "Mentees and mentors should use this login to access their dashboard."}
              </p>
            </div>

            {needsProfileBanner && user ? (
              <SignedInBanner email={user.email} returnPath={returnPath} needsStudentProfile />
            ) : isCheckout && !signedInBanner ? (
              <CheckoutBanner signupHref={signupHref} />
            ) : null}

            {verifiedMessage ? (
              <div
                role="status"
                className="mb-3 rounded-xl border border-success/25 bg-success/5 px-3 py-2.5 text-center"
              >
                <div className="mb-1 flex items-center justify-center gap-2">
                  <Icon icon="mdi:check-circle-outline" className="h-4 w-4 text-success" aria-hidden />
                  <p className="text-sm font-semibold text-success">Email Verified!</p>
                </div>
                <p className="text-xs text-gray sm:text-sm">{verifiedMessage}</p>
              </div>
            ) : null}

            {serverError ? (
              <div
                role="alert"
                className="mb-3 rounded-xl border border-error/20 bg-error/10 px-3 py-2.5 text-center text-sm text-error"
              >
                <p>{serverError}</p>
              </div>
            ) : null}

            {googleAccountMissing ? (
              <div className="mb-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-3 text-center text-sm text-text-primary">
                <p className="font-semibold">No account found for this Google email</p>
                <p className="mt-1 text-xs text-gray">
                  Students can sign up with Google. Mentors need to create an account with email first.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                  <Link href={signupHref} className="btn-primary flex-1 py-2 text-xs">
                    Sign up as a student
                  </Link>
                  <Link
                    href={mentorSignupHref}
                    className="flex-1 rounded-full border border-primary px-4 py-2 text-xs font-semibold text-primary transition hover:bg-primary hover:text-white"
                  >
                    Create mentor account
                  </Link>
                </div>
              </div>
            ) : null}

            {serverError &&
            typeof serverError === "string" &&
            serverError.toLowerCase().includes("verify your email") ? (
              <div className="mb-3 space-y-1 text-center">
                <button
                  type="button"
                  onClick={resendVerification}
                  disabled={resending || !form.email}
                  className="text-sm font-medium text-primary hover:underline disabled:opacity-50"
                >
                  {resending ? "Sending…" : "Resend verification email"}
                </button>
                {resendSuccess ? <p className="text-sm text-success">{resendSuccess}</p> : null}
                {resendError ? <p className="text-sm text-error">{resendError}</p> : null}
              </div>
            ) : null}

            {signedInBanner ? null : (
              <form onSubmit={handleSubmit} className="space-y-3 lg:space-y-4">
                <div className="space-y-1">
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <label htmlFor="password" className="block text-sm font-medium text-text-primary">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-primary hover:underline sm:text-sm"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <PasswordField
                    id="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    placeholder="Your password"
                    value={form.password}
                    onChange={handleChange}
                    className={INPUT_CLASS}
                  />
                </div>
                <Turnstile ref={turnstileRef} onVerify={setTurnstileToken} />
                <button
                  type="submit"
                  // Original also disabled this until Cloudflare Turnstile verified the widget
                  // (disabled={submitting || requiresTurnstileToken(turnstileToken)}); with the
                  // Turnstile scripts lost the widget can never verify, so only `submitting` gates it.
                  disabled={submitting}
                  className="btn-primary w-full cursor-pointer py-3 text-sm shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 lg:py-3.5"
                >
                  {submitting ? "Logging in…" : "Log In"}
                </button>
              </form>
            )}

            {signedInBanner ? null : (
              <>
                <div className="my-4 flex items-center gap-3">
                  <span className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs font-medium text-gray">or</span>
                  <span className="h-px flex-1 bg-gray-200" />
                </div>
                <GoogleButton
                  text="continue_with"
                  disabled={submitting || googleSubmitting || authLoading}
                  onCredential={handleGoogleCredential}
                  onError={setServerError}
                />
              </>
            )}

            <div className="mt-4 space-y-1.5 text-center text-sm text-gray lg:mt-5">
              <p>
                {isCheckout ? (
                  <>
                    First time on AbroadMates?{" "}
                    <Link href={signupHref} className="font-semibold text-primary hover:underline">
                      Create your free student account
                    </Link>
                  </>
                ) : (
                  <>
                    Don&apos;t have an account?{" "}
                    <Link href={signupHref} className="font-semibold text-primary hover:underline">
                      Sign up as a student
                    </Link>
                  </>
                )}
              </p>
              <p>
                Want to guide students?{" "}
                <Link href="/register/mentor/sign-up" className="font-semibold text-primary hover:underline">
                  Join as a mentor
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LoginForm;
