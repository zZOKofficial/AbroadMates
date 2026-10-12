"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

import { Icon } from "@/components/auth/icon";
import { Logo } from "@/components/auth/logo";
import {
  FLEXIBLE_OPTION,
  HEAR_ABOUT_US_LABELS,
  HEAR_ABOUT_US_OPTIONS,
  MAX_STEP,
  PROGRAM_FIELDS,
  STEP_CONFIGS,
  getOnboardingData,
  nextIncompleteStep,
  splitProgramFields,
  stepHref,
  syncDerivedFields,
  updateOnboardingField,
  useOnboardingStore,
  type OnboardingData,
} from "@/components/auth/onboarding-store";
import { cn } from "@/lib/utils";

// Rebuilt from the original site's /register/form wizard (chunks 3589/1206, modules
// 22935 + 50051). Module 50051 (the sticky progress header) normally lived in
// app/(auth)/register/form/layout.tsx; layout.tsx is not part of this rebuild, so the
// header is rendered at the top of the wizard instead.
// NOTE: backend endpoint was lost with the original site - wire to your API.

// Module 3937 `fs`/`Bs` - the auth `next` cookie.
const NEXT_COOKIE = "abm_auth_next";

function storeNextCookie(value: string | null | undefined) {
  if (typeof document === "undefined") return;
  if (!value || typeof value !== "string") return;
  const path = value.trim();
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\") || path.includes("\\"))
    return;
  document.cookie = `${NEXT_COOKIE}=${encodeURIComponent(path)}; Max-Age=${86400}; Path=/; SameSite=Lax`;
}

function readNextCookie(): string | null {
  if (typeof document === "undefined") return null;
  const entry = document.cookie.split("; ").find((c) => c.startsWith(`${NEXT_COOKIE}=`));
  if (!entry) return null;
  let path = entry.slice(NEXT_COOKIE.length + 1);
  try {
    path = decodeURIComponent(path);
  } catch {
    // keep raw value
  }
  if (!path.startsWith("/") || path.startsWith("//") || path.startsWith("/\\") || path.includes("\\"))
    return null;
  return path;
}

// Module 22935 `p` - the standalone Continue button (used by the landing step).
function ContinueButton({
  disabled,
  onClick,
  label = "Continue",
  className,
}: {
  disabled?: boolean;
  onClick?: () => void;
  label?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "btn-primary mt-6 w-full max-w-md cursor-pointer px-10 py-3 text-base font-semibold disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {label}
    </button>
  );
}

const LANDING_MENTOR_IMAGES = [
  { src: "/mentor-1.png", alt: "Mentor" },
  { src: "/mentor-3.png", alt: "Mentor" },
  { src: "/mentor-5.png", alt: "Mentor" },
  { src: "/mentor-2.png", alt: "Mentor" },
  { src: "/mentor-4.png", alt: "Mentor" },
];

const LANDING_FEATURES = [
  { icon: "mdi:school-outline", label: "Degree & field" },
  { icon: "mdi:earth", label: "Where to study" },
  { icon: "mdi:wallet-outline", label: "Budget & funding" },
  { icon: "mdi:handshake-outline", label: "Help you need" },
];

// Module 22935 `g` - step 0 landing.
function Landing({ onStart }: { onStart: () => void }) {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#fff]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(244,163,0,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(218,31,38,0.06),transparent_45%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-secondary/20 blur-3xl sm:h-80 sm:w-80"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-12 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
      />

      <div className="relative z-10 flex min-h-dvh w-full flex-col pb-[max(1.5rem,env(safe-area-inset-bottom))]">
        <header className="flex w-full shrink-0 items-center justify-between gap-3 px-4 pt-5 sm:px-8 sm:pt-6 md:px-10 lg:px-12 xl:px-16">
          <Logo size="sm" />
          <Link href="/login" className="shrink-0 text-sm font-semibold text-primary hover:underline">
            Sign in
          </Link>
        </header>

        <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 sm:px-8 md:px-10">
          <div className="flex flex-1 flex-col justify-center py-8 sm:py-10 md:py-12">
            <div className="mx-auto w-full max-w-xl text-center">
              <p className="inline-flex items-center gap-1.5 rounded-full border border-primary/15 bg-primary/5 px-3 py-1 text-[11px] font-semibold tracking-wide text-primary uppercase">
                <Icon icon="mdi:timer-outline" className="h-3.5 w-3.5" aria-hidden />
                About 2 minutes
              </p>

              <h1 className="mt-5 font-brand text-3xl leading-[1.1] font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                Skip agencies.
                <span className="mt-1 block font-secondary text-[1.2em] leading-[0.95] text-primary">
                  Talk to real students.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-black/70 sm:text-base">
                Answer a few quick questions about your study goals. We&apos;ll use them to match you with
                mentors who have already walked that path.
              </p>

              <div className="mt-8 flex flex-col items-center">
                <div className="flex items-center -space-x-3">
                  {LANDING_MENTOR_IMAGES.map((image, index) => (
                    <div
                      key={image.src}
                      className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white bg-secondary/20 shadow-sm sm:h-14 sm:w-14"
                      style={{ zIndex: LANDING_MENTOR_IMAGES.length - index }}
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        sizes="56px"
                        className="object-cover"
                        priority={index < 3}
                      />
                    </div>
                  ))}
                  <div className="relative z-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-primary text-[11px] font-bold text-white shadow-sm sm:h-14 sm:w-14 sm:text-xs">
                    +
                  </div>
                </div>
                <p className="mt-3 text-xs font-medium text-black/55 sm:text-sm">
                  Mentors studying across 20+ countries
                </p>
              </div>

              <ul className="mt-8 grid grid-cols-2 gap-2.5 sm:grid-cols-4 sm:gap-3">
                {LANDING_FEATURES.map((feature) => (
                  <li
                    key={feature.label}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-black/8 bg-white/80 px-3 py-3.5 text-center shadow-sm backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary/15 text-primary">
                      <Icon icon={feature.icon} className="h-5 w-5" aria-hidden />
                    </span>
                    <span className="text-xs font-semibold text-text-primary sm:text-[13px]">
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 sm:mt-10">
                <ContinueButton
                  className="mt-0 w-full max-w-none py-3.5 sm:mx-auto sm:max-w-sm"
                  label="Let's go!"
                  onClick={onStart}
                />
                <p className="mt-4 text-sm text-gray">
                  Already have an account?{" "}
                  <Link href="/login" className="font-semibold text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>

          <p className="mx-auto flex max-w-md items-center justify-center gap-2 pb-2 text-center text-[11px] leading-relaxed text-black/50 sm:text-xs">
            <Icon
              icon="mdi:arrow-right-circle-outline"
              className="h-3.5 w-3.5 shrink-0 text-primary"
              aria-hidden
            />
            Next: a few quick questions, then create your account.
          </p>
        </div>
      </div>
    </main>
  );
}

// Module 22935 `N` - the shared option button.
function OptionButton({
  label,
  selected,
  onClick,
  icon,
  className,
  textAlign = "left",
}: {
  label: React.ReactNode;
  selected: boolean;
  onClick?: () => void;
  icon?: string;
  className?: string;
  textAlign?: "left" | "center";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex items-center gap-3 rounded-xl border p-2.5 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30",
        textAlign === "center" ? "justify-center text-center" : "text-left",
        selected
          ? "border-primary bg-primary/4 text-primary"
          : "border-black/10 bg-white text-black hover:border-primary/30 hover:bg-primary/1",
        className
      )}
    >
      {icon ? (
        <span
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
            selected ? "bg-primary text-white" : "bg-black/4 text-black/55 group-hover:bg-primary/10 group-hover:text-primary"
          )}
        >
          <Icon icon={icon} className="h-4 w-4" aria-hidden />
        </span>
      ) : null}
      <span
        className={cn(
          "flex-1 text-[13px] font-semibold leading-tight sm:text-sm",
          textAlign === "center" && !icon && "text-center"
        )}
      >
        {label}
      </span>
    </button>
  );
}

// Module 22935 `v` - the hear-about-us grid (step 13 body).
function HearAboutGrid({
  selected,
  otherText,
  onSelect,
  onOtherTextChange,
}: {
  selected: string;
  otherText: string;
  onSelect: (value: string) => void;
  onOtherTextChange: (value: string) => void;
}) {
  return (
    <div className="w-full space-y-4">
      <div className="grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
        {HEAR_ABOUT_US_OPTIONS.map((value) => (
          <OptionButton
            key={value}
            label={HEAR_ABOUT_US_LABELS[value]}
            selected={selected === value}
            textAlign="center"
            className="min-h-18 justify-center px-3 py-4"
            onClick={() => onSelect(value)}
          />
        ))}
      </div>
      {selected === "other" ? (
        <div className="w-full space-y-2">
          <label htmlFor="hear-about-us-other" className="mb-1.5 block text-sm font-medium text-black">
            Please specify
          </label>
          <textarea
            id="hear-about-us-other"
            value={otherText}
            onChange={(event) => onOtherTextChange(event.target.value)}
            placeholder="Tell us where you heard about AbroadMates"
            rows={3}
            className="w-full rounded-xl border border-[#e5e7eb] bg-[#f1f1f1] px-4 py-3 text-sm text-black outline-none ring-primary/30 transition focus:border-primary focus:ring-2 placeholder:text-black/40"
          />
        </div>
      ) : null}
    </div>
  );
}

// Module 22935 `k` - the sticky bottom bar.
function BottomBar({
  backHref,
  onContinue,
  continueLabel = "Continue",
  continueDisabled = false,
  error,
  continueHref,
}: {
  backHref: string;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  error?: string | null;
  continueHref?: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-black/10 bg-[#fff] px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-black/50 transition hover:text-primary"
        >
          <Icon icon="mdi:arrow-left" className="h-4 w-4" aria-hidden />
          Back
        </Link>
        <div className="flex flex-col items-end gap-1.5">
          {error ? <p className="max-w-55 text-right text-xs text-red-600 sm:text-sm">{error}</p> : null}
          {continueHref ? (
            <Link
              href={continueHref}
              className="btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold sm:px-8 sm:py-3 sm:text-base"
            >
              {continueLabel}
              <Icon icon="mdi:arrow-right" className="h-4 w-4" aria-hidden />
            </Link>
          ) : (
            <button
              type="button"
              onClick={onContinue}
              disabled={continueDisabled}
              className="btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50 sm:px-8 sm:py-3 sm:text-base"
            >
              {continueLabel}
              <Icon icon="mdi:arrow-right" className="h-4 w-4" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const MAX_WIDTHS: Record<string, string> = {
  md: "max-w-md",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
};

// Module 22935 `C` - the shared step shell.
function StepShell({
  title,
  subtitle,
  maxWidth = "2xl",
  backHref,
  onContinue,
  continueLabel,
  continueDisabled,
  continueHref,
  error,
  tip,
  infoCallout,
  children,
  headerExtra,
  className,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  maxWidth?: keyof typeof MAX_WIDTHS;
  backHref: string;
  onContinue?: () => void;
  continueLabel?: string;
  continueDisabled?: boolean;
  continueHref?: string;
  error?: string | null;
  tip?: React.ReactNode;
  infoCallout?: React.ReactNode;
  children?: React.ReactNode;
  headerExtra?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex w-full flex-1 flex-col", className)}>
      <div className={cn("mx-auto w-full flex-1 px-4 pt-6 pb-28 sm:pt-8 md:pt-10", MAX_WIDTHS[maxWidth])}>
        <div className="space-y-6 md:space-y-8">
          <div className="text-center">
            <h1 className="font-secondary text-3xl font-bold leading-tight text-primary md:text-4xl lg:text-[2.5rem]">
              {title}
            </h1>
            {subtitle ? <p className="mt-2 text-sm text-black/70 md:text-base">{subtitle}</p> : null}
            {headerExtra}
          </div>
          {error ? (
            <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4">
              <div className="flex items-start gap-2">
                <Icon icon="mdi:alert-circle" className="h-5 w-5 shrink-0 text-red-600" aria-hidden />
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          ) : null}
          {infoCallout ? (
            <div className="rounded-xl border border-accent bg-secondary-light px-4 py-3 text-sm leading-relaxed text-black/70">
              {infoCallout}
            </div>
          ) : null}
          {children}
          {tip ? (
            <div className="flex items-start gap-2 rounded-xl bg-primary/5 px-4 py-3">
              <Icon icon="mdi:lightbulb-outline" className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div className="text-xs text-black/60">{tip}</div>
            </div>
          ) : null}
        </div>
      </div>

      <BottomBar
        backHref={backHref}
        onContinue={onContinue}
        continueLabel={continueLabel}
        continueDisabled={continueDisabled}
        continueHref={continueHref}
        error={error}
      />
    </div>
  );
}

// Module 22935 `A` - step 13: hear about us, then hand off to /register.
function HearAboutUsStep() {
  const { data, updateField } = useOnboardingStore();
  const router = useRouter();
  const [selected, setSelected] = React.useState(() => data.hearAboutUs ?? "");
  const [otherText, setOtherText] = React.useState(() => data.hearAboutUsOther ?? "");
  const [error, setError] = React.useState<string | null>(null);
  const canContinue = React.useMemo(() => hearAboutUsIsValid(selected, otherText), [selected, otherText]);

  const validate = () => {
    if (canContinue) {
      setError(null);
      return true;
    }
    if (selected !== "other" || otherText.trim()) setError("Please select an option");
    else setError("Please tell us where you heard about us");
    return false;
  };

  return (
    <StepShell
      title="Where did you hear about us?"
      subtitle="This helps us understand how students find AbroadMates."
      maxWidth="4xl"
      backHref={stepHref(12)}
      continueDisabled={!canContinue}
      continueLabel="Continue to create account"
      error={error}
      onContinue={() => {
        if (!validate() || !selected) return;
        updateField("hearAboutUs", selected);
        updateField("hearAboutUsOther", selected === "other" ? otherText.trim() : undefined);
        syncDerivedFields();
        const next = readNextCookie();
        if (next) storeNextCookie(next);
        router.push(next ? `/register?next=${encodeURIComponent(next)}` : "/register");
      }}
    >
      <div className="rounded-2xl border border-black/10 bg-[#fff] p-5 shadow-sm sm:p-6 md:p-8">
        <HearAboutGrid
          selected={selected}
          otherText={otherText}
          onSelect={(value) => setSelected(value)}
          onOtherTextChange={setOtherText}
        />
      </div>
    </StepShell>
  );
}

function hearAboutUsIsValid(selected: string, otherText: string) {
  return (
    !!selected &&
    (HEAR_ABOUT_US_OPTIONS as readonly string[]).includes(selected) &&
    (selected !== "other" || !!otherText.trim())
  );
}

const DEGREE_OPTIONS = ["Bachelor's", "Master's", "PhD", "Diploma"];

// Module 22935 `M` - step 1: degree level.
function DegreeStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const [selected, setSelected] = React.useState(() =>
    typeof data.desiredDegree === "string" && data.desiredDegree.trim() ? data.desiredDegree.trim() : null
  );

  return (
    <StepShell
      title="What type of program are you interested in?"
      subtitle="Choose your option"
      maxWidth="2xl"
      backHref={stepHref(0)}
      continueDisabled={!selected}
      onContinue={() => {
        if (!selected) return;
        updateField("desiredDegree", selected);
        go(2);
      }}
    >
      <div className="grid grid-cols-2 gap-2.5">
        {DEGREE_OPTIONS.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected === option}
            textAlign="center"
            className="min-h-18 justify-center px-3 py-4"
            onClick={() => {
              setSelected(option);
              updateField("desiredDegree", option);
            }}
          />
        ))}
      </div>
    </StepShell>
  );
}

// Module 22935 `I` - step 2: field of study.
function FieldOfStudyStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const [selected, setSelected] = React.useState(() => splitProgramFields(data.desiredProgram));

  return (
    <StepShell
      title="In which field of study are you interested?"
      subtitle="Choose as many as you'd like — we'll match you with mentors who fit your goals."
      maxWidth="4xl"
      backHref={stepHref(1)}
      continueDisabled={selected.length === 0}
      tip={
        <p>
          <span className="font-medium text-black/80">Tip:</span> You can update fields later in your profile.
        </p>
      }
      headerExtra={
        <div className="mt-4 flex items-center justify-center gap-3">
          <p className="text-xs text-black/45">Select all that apply</p>
          {selected.length > 0 ? (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              {selected.length} selected
            </span>
          ) : null}
        </div>
      }
      onContinue={() => {
        updateField("desiredProgram", selected.join(" | "));
        go(3);
      }}
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2.5 lg:grid-cols-3">
        {PROGRAM_FIELDS.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected.includes(option)}
            onClick={() =>
              setSelected((current) =>
                current.includes(option) ? current.filter((v) => v !== option) : [...current, option]
              )
            }
            className="min-h-12 px-3 py-2.5 sm:min-h-13"
          />
        ))}
      </div>
    </StepShell>
  );
}

// Module 22935 `_` - the embedded multi/single-select step (wizard steps 3, 6 and 11).
const EMBEDDED_FIELD_KEYS = [
  "mentorMatchRegions",
  "mentorMatchDegreeLevel",
  "mentorMatchFieldCategory",
  "mentorMatchBudgetBand",
  "mentorMatchHelpAreas",
] as const;

function ConfiguredStep({
  stepIndex,
  nextStep,
  nextPath,
  embedded = false,
  gridClassName,
  optionButtonClassName,
}: {
  stepIndex: number;
  pageNumber?: number;
  nextStep?: number;
  nextPath?: string;
  embedded?: boolean;
  gridClassName?: string;
  optionButtonClassName?: string;
}) {
  const router = useRouter();
  const { data, updateField } = useOnboardingStore();
  const config = STEP_CONFIGS[stepIndex];
  const [selected, setSelected] = React.useState<string[]>(() => {
    const stored = data[EMBEDDED_FIELD_KEYS[stepIndex]];
    if (stepIndex === 0 || stepIndex === 4) return Array.isArray(stored) ? (stored as string[]).filter(Boolean) : [];
    return typeof stored === "string" && stored.trim() ? [stored.trim()] : [];
  });

  React.useEffect(() => {
    syncDerivedFields();
  }, []);

  const persist = (value: string[]) => {
    if (stepIndex === 0) updateOnboardingField("mentorMatchRegions", value as OnboardingData["mentorMatchRegions"]);
    else if (stepIndex === 4)
      updateOnboardingField("mentorMatchHelpAreas", value as OnboardingData["mentorMatchHelpAreas"]);
    else if (stepIndex === 3) updateOnboardingField("mentorMatchBudgetBand", value[0] ?? "");
  };

  const onContinue = () => {
    if (selected.length === 0) return;
    persist(selected);
    if (typeof nextStep === "number") router.push(stepHref(nextStep));
    else if (nextPath) router.push(nextPath);
    else router.push(stepHref(0));
  };

  const grid =
    gridClassName ??
    (stepIndex === 0
      ? "grid w-full grid-cols-2 gap-2.5 sm:grid-cols-3"
      : "grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2");
  const width = stepIndex === 4 || config.options.length > 5 || stepIndex === 0 ? "3xl" : "2xl";

  const gridContent = (
    <div className={grid}>
      {config.options.map((option) => {
        const isSelected = config.multiple ? selected.includes(option) : selected[0] === option;
        return (
          <OptionButton
            key={option}
            label={option}
            selected={isSelected}
            textAlign={stepIndex === 4 ? "left" : "center"}
            className={cn(
              "min-h-13",
              stepIndex === 0 && "min-h-18 justify-center",
              stepIndex === 3 && "min-h-16 justify-center",
              optionButtonClassName
            )}
            onClick={() => {
              const next = config.multiple
                ? selected.includes(option)
                  ? selected.filter((v) => v !== option)
                  : [...selected, option]
                : [option];
              setSelected(next);
              persist(next);
            }}
          />
        );
      })}
    </div>
  );

  if (embedded) {
    return (
      <StepShell
        title={config.question}
        subtitle={config.subtitle}
        maxWidth={width}
        backHref={stepHref(stepIndex === 0 ? 2 : stepIndex === 3 ? 5 : 10)}
        continueDisabled={selected.length === 0}
        onContinue={onContinue}
        headerExtra={
          config.multiple ? (
            <div className="mt-4 flex items-center justify-center gap-3">
              <p className="text-xs text-black/45">Select all that apply</p>
              {selected.length > 0 ? (
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {selected.length} selected
                </span>
              ) : null}
            </div>
          ) : null
        }
      >
        {gridContent}
      </StepShell>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-white px-4 pt-20 pb-16">
      <div className="flex w-full max-w-3xl flex-col items-center">
        <h1 className="text-center font-secondary text-3xl font-bold text-primary md:text-4xl">
          {config.question}
        </h1>
        <p className="mt-2 max-w-md text-center text-sm text-black/70">{config.subtitle}</p>
        <div className="mt-8 w-full">{gridContent}</div>
        <ContinueButton disabled={selected.length === 0} onClick={onContinue} />
      </div>
    </main>
  );
}

// Module 22935 `E` - step 3: regions.
function RegionsStep() {
  return <ConfiguredStep embedded stepIndex={0} pageNumber={3} nextStep={4} />;
}

const EUROPE_COUNTRIES = new Set([
  "Albania","Andorra","Austria","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus",
  "Czech Republic","Denmark","Estonia","Finland","France","Germany","Greece","Hungary","Iceland","Ireland",
  "Italy","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Malta","Moldova","Monaco","Montenegro",
  "Netherlands","North Macedonia","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia",
  "Slovakia","Slovenia","Spain","Sweden","Switzerland","Ukraine","United Kingdom","Vatican City",
]);

const NORTH_AMERICA_COUNTRIES = new Set([
  "Antigua and Barbuda","Bahamas","Barbados","Belize","Canada","Costa Rica","Cuba","Dominica",
  "Dominican Republic","El Salvador","Grenada","Guatemala","Haiti","Honduras","Jamaica","Mexico","Nicaragua",
  "Panama","Puerto Rico","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines",
  "Trinidad and Tobago","United States",
]);

const ASIA_COUNTRIES = new Set([
  "Afghanistan","Armenia","Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","Cambodia","China","Georgia",
  "Hong Kong","India","Indonesia","Iran","Iraq","Israel","Japan","Jordan","Kazakhstan","Kuwait","Kyrgyzstan",
  "Laos","Lebanon","Macau","Malaysia","Maldives","Mongolia","Myanmar","Nepal","North Korea","Oman","Pakistan",
  "Palestine","Philippines","Qatar","Saudi Arabia","Singapore","South Korea","Sri Lanka","Syria","Taiwan",
  "Tajikistan","Thailand","Timor-Leste","Turkey","Turkmenistan","United Arab Emirates","Uzbekistan","Vietnam",
  "Yemen",
]);

const OCEANIA_COUNTRIES = new Set([
  "Australia","Fiji","Kiribati","Marshall Islands","Micronesia","Nauru","New Zealand","Palau","Papua New Guinea",
  "Samoa","Solomon Islands","Tonga","Tuvalu","Vanuatu",
]);

const COUNTRY_ALIASES: Record<string, string> = {
  usa: "United States",
  us: "United States",
  "u.s.a.": "United States",
  "u.s.a": "United States",
  "united states of america": "United States",
  america: "United States",
  uk: "United Kingdom",
  "u.k.": "United Kingdom",
  "great britain": "United Kingdom",
  britain: "United Kingdom",
  england: "United Kingdom",
  scotland: "United Kingdom",
  wales: "United Kingdom",
  "hong kong sar, china": "Hong Kong",
  "hong kong sar": "Hong Kong",
  "the netherlands": "Netherlands",
  holland: "Netherlands",
  nederland: "Netherlands",
  czechia: "Czech Republic",
  uae: "United Arab Emirates",
};

function countryRegion(country: string): string | null {
  if (EUROPE_COUNTRIES.has(country)) return "Europe";
  if (NORTH_AMERICA_COUNTRIES.has(country)) return "North America";
  if (ASIA_COUNTRIES.has(country)) return "Asia";
  if (OCEANIA_COUNTRIES.has(country)) return "Oceania";
  return null;
}

function normalizeCountryName(input: string) {
  const trimmed = input.trim().replace(/\s+/g, " ");
  if (!trimmed) return trimmed;
  const alias = COUNTRY_ALIASES[trimmed.toLowerCase()];
  return alias ?? trimmed;
}

function regionOfCountry(input: string): string | null {
  const normalized = normalizeCountryName(input);
  const region = countryRegion(normalized);
  if (region) return region;
  const lower = normalized.toLowerCase();
  for (const set of [EUROPE_COUNTRIES, NORTH_AMERICA_COUNTRIES, ASIA_COUNTRIES, OCEANIA_COUNTRIES]) {
    for (const country of set) {
      if (country.toLowerCase() === lower) return countryRegion(country);
    }
  }
  return null;
}

// Module 23187 `s` - the full country list (also the country step's fallback options).
const ALL_COUNTRIES = ["Afghanistan","Albania","Algeria","Andorra","Angola","Antigua and Barbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Central African Republic","Chad","Chile","China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France","Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Ivory Coast","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Kosovo","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Montenegro","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","New Zealand","Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway","Oman","Pakistan","Palau","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Romania","Russia","Rwanda","Saint Kitts and Nevis","Saint Lucia","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Korea","South Sudan","Spain","Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor-Leste","Togo","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","Uruguay","Uzbekistan","Vanuatu","Vatican City","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];

const OTHER_COUNTRY = "__OTHER__";

function uniqueSorted(values: string[]) {
  return [...new Set(values.map((v) => v.trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" })
  );
}

const TEXT_INPUT_CLASS =
  "w-full rounded-xl border border-[#e5e7eb] bg-[#f1f1f1] px-3 py-2.5 text-sm text-black placeholder:text-black/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-base";

// Module 22935 `G` - step 4: target countries.
function CountriesStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const [selected, setSelected] = React.useState<string[]>([]);
  const [countries, setCountries] = React.useState<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [otherText, setOtherText] = React.useState("");
  const selectedRef = React.useRef<string[]>([]);
  selectedRef.current = selected;

  const regions = (data.mentorMatchRegions as string[] | undefined) ?? undefined;

  const filteredCountries = React.useMemo(() => {
    const source = countries;
    const regionList = Array.isArray(regions) ? regions : [];
    if (regionList.length === 0 || regionList.includes(FLEXIBLE_OPTION)) return source;
    const activeRegions = new Set(
      regionList.filter((r) => r === "Europe" || r === "North America" || r === "Asia" || r === "Oceania")
    );
    if (activeRegions.size === 0) return source;
    return source.filter((country) => {
      const region = regionOfCountry(country);
      return !!region && activeRegions.has(region);
    });
  }, [countries, regions]);

  const storedTargetCountries = React.useCallback(() => {
    const stored = getOnboardingData().targetCountries;
    return Array.isArray(stored) ? stored : [];
  }, []);

  // Module 22935 - load country options (originally GET /api/catalog/mentors/filters).
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      const fallback = uniqueSorted(ALL_COUNTRIES);
      try {
        // NOTE: backend endpoint was lost with the original site - wire to your API
        // Original: GET /api/catalog/mentors/filters -> data.countries
        const response = await fetch("/api/catalog/mentors/filters");
        if (!response.ok) throw Error("mentors filters fetch failed");
        const payload = await response.json();
        const apiCountries = Array.isArray(payload?.data?.countries)
          ? uniqueSorted(payload.data.countries.map((c: unknown) => String(c).trim()).filter(Boolean))
          : [];
        const base = apiCountries.length > 0 ? apiCountries : fallback;
        const merged = uniqueSorted([...base, ...storedTargetCountries(), ...selectedRef.current]).filter(
          (c) => c !== "Other"
        );
        if (cancelled) return;
        setCountries(merged);
        setLoaded(true);
      } catch {
        const merged = uniqueSorted([...fallback, ...storedTargetCountries(), ...selectedRef.current]).filter(
          (c) => c !== "Other"
        );
        if (cancelled) return;
        setCountries(merged);
        setLoaded(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [storedTargetCountries]);

  // Module 22935 - reconcile the selection with the (region filtered) options.
  React.useEffect(() => {
    if (!loaded) return;
    const allowed = new Set(filteredCountries);
    const stored =
      Array.isArray(data.targetCountries) && data.targetCountries.length > 0
        ? (data.targetCountries as string[]).filter((c) => c !== "Other")
        : [];
    setSelected((current) => {
      const base = (current.length > 0 ? current : stored).filter((c) => c === OTHER_COUNTRY || allowed.has(c));
      const outOfSync = stored.filter((c) => !allowed.has(c) && c !== "Other");
      if (outOfSync.length > 0 && !base.includes(OTHER_COUNTRY)) {
        setOtherText((text) => text || outOfSync[0]);
        return [...base.filter((c) => c !== OTHER_COUNTRY), OTHER_COUNTRY];
      }
      return base;
    });
  }, [loaded, filteredCountries, data.targetCountries]);

  const hasOther = selected.includes(OTHER_COUNTRY);
  const otherValid = !hasOther || otherText.trim().length >= 2;
  const canContinue = loaded && selected.length > 0 && otherValid;

  const toggle = (option: string) =>
    setSelected((current) =>
      current.includes(option) ? current.filter((c) => c !== option) : [...current, option]
    );

  return (
    <StepShell
      title="Which countries are you planning to apply to?"
      subtitle="Pick every country you're considering. Choose Other if yours isn't listed."
      maxWidth="3xl"
      backHref={stepHref(3)}
      continueDisabled={!canContinue}
      infoCallout={
        <>
          Countries are filtered by your selected regions and where we currently have mentors.
        </>
      }
      onContinue={() => {
        if (!canContinue) return;
        const countriesValue = selected
          .filter((c) => c !== OTHER_COUNTRY)
          .concat(hasOther ? [otherText.trim()] : []);
        if (countriesValue.length === 0) return;
        updateField("targetCountries", countriesValue);
        syncDerivedFields();
        go(5);
      }}
    >
      {loaded ? (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {filteredCountries.map((country) => (
              <OptionButton
                key={country}
                label={country}
                selected={selected.includes(country)}
                textAlign="center"
                className="min-h-13 justify-center"
                onClick={() => toggle(country)}
              />
            ))}
            <OptionButton
              label="Other"
              selected={hasOther}
              textAlign="center"
              className="min-h-13 justify-center"
              onClick={() => toggle(OTHER_COUNTRY)}
            />
          </div>
          {hasOther ? (
            <div className="rounded-2xl border border-black/10 bg-[#fff] p-4 shadow-sm">
              <label htmlFor="other-country" className="mb-1.5 block text-sm font-medium text-black">
                Your country
              </label>
              <input
                id="other-country"
                type="text"
                value={otherText}
                onChange={(event) => setOtherText(event.target.value)}
                placeholder="e.g. Nepal"
                className={TEXT_INPUT_CLASS}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div
          className="flex w-full flex-col items-center gap-3 py-10 text-sm text-black/50"
          aria-busy="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <span>Loading countries…</span>
        </div>
      )}
    </StepShell>
  );
}

const BUDGET_OPTIONS = [
  { label: "Under $10,000 / year", value: 8000 },
  { label: "$10,000 – $25,000 / year", value: 17500 },
  { label: "$25,000 – $50,000 / year", value: 37500 },
  { label: "$50,000+ / year", value: 55000 },
];

// Module 22935 `q` - step 5: tuition budget.
function BudgetStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const [selected, setSelected] = React.useState<number | null>(() =>
    typeof data.studyBudget === "number" && data.studyBudget >= 1000 ? data.studyBudget : null
  );

  return (
    <StepShell
      title="What is your tuition budget per year?"
      subtitle="Tuition only (USD). Choose the range that fits best."
      maxWidth="2xl"
      backHref={stepHref(4)}
      continueDisabled={selected === null}
      tip={
        <p>
          <span className="font-medium text-black/80">Example:</span> a mid-range program might be $10,000 –
          $25,000 / year — pick the closest tier; you can refine this later in your profile.
        </p>
      }
      onContinue={() => {
        if (selected === null) return;
        updateField("studyBudget", selected);
        go(6);
      }}
    >
      <div className="flex w-full flex-col gap-2.5">
        {BUDGET_OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={selected === option.value}
            textAlign="center"
            className="min-h-11 w-full justify-center whitespace-nowrap"
            onClick={() => setSelected(option.value)}
          />
        ))}
      </div>
    </StepShell>
  );
}

// Module 22935 `Y` - step 6: funding band.
function FundingStep() {
  return <ConfiguredStep embedded stepIndex={3} pageNumber={6} nextStep={7} />;
}

// Module 22935 `Z` - step 7: work while studying.
function WorkStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const selected = data.needToWork === true ? "yes" : data.needToWork === false ? "no" : "";

  return (
    <StepShell
      title="Is it essential for you to work while studying?"
      subtitle="Select one option"
      maxWidth="2xl"
      backHref={stepHref(6)}
      continueDisabled={selected === ""}
      onContinue={() => go(8)}
    >
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-2.5">
        <OptionButton
          label="Yes"
          selected={selected === "yes"}
          textAlign="center"
          className="min-h-16 justify-center"
          onClick={() => updateField("needToWork", true)}
        />
        <OptionButton
          label="No"
          selected={selected === "no"}
          textAlign="center"
          className="min-h-16 justify-center"
          onClick={() => updateField("needToWork", false)}
        />
      </div>
    </StepShell>
  );
}

const STAY_OPTIONS = ["Yes", "No", "Not Essential"];

// Module 22935 `J` - step 8: stay after study.
function StayStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const selected = typeof data.interestToStudyAfterward === "string" ? data.interestToStudyAfterward : "";

  return (
    <StepShell
      title="Do you have plans to stay after study?"
      subtitle="Select one option"
      maxWidth="2xl"
      backHref={stepHref(7)}
      continueDisabled={!selected}
      onContinue={() => go(9)}
    >
      <div className="mx-auto flex w-full max-w-md flex-col gap-2.5">
        {STAY_OPTIONS.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected === option}
            textAlign="center"
            className="min-h-14 justify-center"
            onClick={() => updateField("interestToStudyAfterward", option)}
          />
        ))}
      </div>
    </StepShell>
  );
}

// Module 22935 `Q` - step 9: IELTS.
function IeltsStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const selected = data.ieltsTaken === true ? "yes" : data.ieltsTaken === false ? "no" : "";
  const [score, setScore] = React.useState(() => data.ieltsScore ?? "");
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (data.ieltsScore) setScore(data.ieltsScore);
  }, [data.ieltsScore]);

  const scoreValid = () => {
    if (selected !== "yes") return true;
    const parsed = parseFloat(score);
    return !Number.isNaN(parsed) && parsed >= 0 && parsed <= 9;
  };
  const valid = scoreValid();

  return (
    <StepShell
      title="Have you taken IELTS?"
      subtitle="Select your answer"
      maxWidth="2xl"
      backHref={stepHref(8)}
      continueDisabled={selected === "" || !valid}
      error={error}
      onContinue={() => {
        if (selected === "yes" && !valid) {
          setError("Enter a valid overall band score between 0 and 9.");
          return;
        }
        setError(null);
        if (selected === "yes") updateField("ieltsScore", score.trim());
        go(10);
      }}
    >
      <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-2.5">
        <OptionButton
          label="Yes"
          selected={selected === "yes"}
          textAlign="center"
          className="min-h-16 justify-center"
          onClick={() => {
            updateField("ieltsTaken", true);
            setError(null);
          }}
        />
        <OptionButton
          label="No"
          selected={selected === "no"}
          textAlign="center"
          className="min-h-16 justify-center"
          onClick={() => {
            updateField("ieltsTaken", false);
            updateField("ieltsScore", "");
            setScore("");
            setError(null);
          }}
        />
      </div>
      {selected === "yes" ? (
        <div className="mx-auto w-full max-w-md rounded-2xl border border-black/10 bg-[#fff] p-4 shadow-sm">
          <label htmlFor="ielts-score" className="mb-1.5 block text-sm font-medium text-black">
            Overall band score
          </label>
          <input
            id="ielts-score"
            type="text"
            inputMode="decimal"
            placeholder="e.g. 7 or 7.5"
            value={score}
            onChange={(event) => {
              setScore(event.target.value);
              updateField("ieltsScore", event.target.value.trim());
              setError(null);
            }}
            className={TEXT_INPUT_CLASS}
          />
          <p className="mt-2 text-xs text-black/50">
            Use your official overall band (0–9, half bands allowed).
          </p>
        </div>
      ) : null}
    </StepShell>
  );
}

const APPLY_OPTIONS = [
  { value: "self", label: "I will apply by myself" },
  { value: "need_help", label: "I need help from AbroadMates" },
];

// Module 22935 `ee` - step 10: application preference.
function ApplyStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const selected =
    data.applicationPreference === "self" || data.applicationPreference === "need_help"
      ? data.applicationPreference
      : "";

  return (
    <StepShell
      title="How do you want to apply?"
      subtitle="Choose whether you'll apply yourself or with AbroadMates help"
      maxWidth="2xl"
      backHref={stepHref(9)}
      continueDisabled={selected === ""}
      onContinue={() => go(11)}
    >
      <div className="flex w-full flex-col gap-2.5">
        {APPLY_OPTIONS.map((option) => (
          <OptionButton
            key={option.value}
            label={option.label}
            selected={selected === option.value}
            textAlign="center"
            className="min-h-14 w-full justify-center"
            onClick={() => updateField("applicationPreference", option.value)}
          />
        ))}
      </div>
    </StepShell>
  );
}

// Module 22935 `et` - step 11: help areas.
function HelpAreasStep() {
  return <ConfiguredStep embedded stepIndex={4} pageNumber={11} nextStep={12} />;
}

const SUPPORTED_TIME_ZONES: string[] =
  typeof Intl !== "undefined" && "supportedValuesOf" in Intl
    ? Intl.supportedValuesOf("timeZone")
    : ["UTC", "Asia/Dhaka", "Asia/Tokyo", "America/New_York", "Europe/London"];

// Module 22935 `en` - step 12: time zone.
function TimeZoneStep({ go }: { go: (step: number) => void }) {
  const { data, updateField } = useOnboardingStore();
  const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const [selected, setSelected] = React.useState(() => {
    const stored = data.timeZone;
    if (typeof stored === "string" && stored.trim()) return stored.trim();
    return detected && SUPPORTED_TIME_ZONES.includes(detected) ? detected : "";
  });

  React.useEffect(() => {
    if (!selected && detected && SUPPORTED_TIME_ZONES.includes(detected)) {
      setSelected(detected);
      updateField("timeZone", detected);
    }
  }, [detected, selected, updateField]);

  const hasSelection = selected.trim().length > 0;
  const detectedAvailable = !!detected && SUPPORTED_TIME_ZONES.includes(detected);
  const isDetectedSelected = detectedAvailable && selected === detected;

  const applyValue = (value: string) => {
    const trimmed = value.trim();
    setSelected(trimmed);
    if (trimmed) updateField("timeZone", trimmed);
  };

  return (
    <StepShell
      title="What is your time zone?"
      subtitle="We use this for session times, reminders, and your dashboard."
      maxWidth="2xl"
      backHref={stepHref(11)}
      continueDisabled={!hasSelection}
      onContinue={() => {
        updateField("timeZone", selected.trim());
        syncDerivedFields();
        go(13);
      }}
    >
      <div className="mx-auto w-full max-w-md">
        <div className="rounded-2xl border border-black/10 bg-[#fff] p-5 shadow-sm sm:p-6">
          {detectedAvailable ? (
            <button
              type="button"
              onClick={() => applyValue(detected)}
              aria-pressed={isDetectedSelected}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-3.5 py-3 text-left transition-all focus:outline-none focus:ring-2 focus:ring-primary/30",
                isDetectedSelected
                  ? "border-primary bg-primary/4 text-primary"
                  : "border-black/10 bg-[#fafafa] text-black hover:border-primary/30"
              )}
            >
              <span
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                  isDetectedSelected ? "bg-primary text-white" : "bg-black/4 text-black/55"
                )}
              >
                <Icon icon="mdi:map-clock-outline" className="h-5 w-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-medium text-black/50">Detected from your device</span>
                <span className="mt-0.5 block truncate text-sm font-semibold sm:text-base">{detected}</span>
              </span>
              {isDetectedSelected ? (
                <span className="text-xs font-semibold text-primary">Selected</span>
              ) : (
                <span className="text-xs font-medium text-black/40">Tap to use</span>
              )}
            </button>
          ) : null}

          <div className={cn(detectedAvailable && "mt-5")}>
            <label htmlFor="student-tz" className="mb-1.5 block text-sm font-medium text-black">
              {detectedAvailable ? "Or choose another time zone" : "Time zone"}
            </label>
            <div className="relative">
              <select
                id="student-tz"
                value={selected}
                onChange={(event) => applyValue(event.target.value)}
                className={cn(
                  "w-full appearance-none rounded-xl border border-[#e5e7eb] bg-[#f1f1f1] px-3 py-2.5 pr-10 text-sm text-black focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 md:text-base",
                  "h-12"
                )}
                aria-label="Select your time zone"
              >
                <option value="">Select your time zone</option>
                {SUPPORTED_TIME_ZONES.map((zone) => (
                  <option key={zone} value={zone}>
                    {zone}
                  </option>
                ))}
              </select>
              <Icon
                icon="mdi:chevron-down"
                className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-black/40"
                aria-hidden
              />
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-black/50">
          You can change this later from your student dashboard.
        </p>
      </div>
    </StepShell>
  );
}

// Module 50051 - the sticky onboarding progress header (originally register/form/layout.tsx).
const PROGRESS_STEPS = [
  { step: 1, label: "Degree" },
  { step: 2, label: "Field" },
  { step: 3, label: "Regions" },
  { step: 4, label: "Countries" },
  { step: 5, label: "Budget" },
  { step: 6, label: "Funding" },
  { step: 7, label: "Work" },
  { step: 8, label: "Stay" },
  { step: 9, label: "IELTS" },
  { step: 10, label: "Apply" },
  { step: 11, label: "Help" },
  { step: 12, label: "Timezone" },
  { step: 13, label: "Source" },
];

function ProgressHeader() {
  const stepParam = useSearchParams().get("step");
  const parsed = stepParam === null || stepParam === "" ? 0 : parseInt(stepParam, 10);
  const step = Number.isFinite(parsed) ? Math.min(MAX_STEP, Math.max(0, parsed)) : 0;
  if (step < 1) return null;
  const label = PROGRESS_STEPS.find((entry) => entry.step === step)?.label ?? "";
  const percent = Math.round((step / MAX_STEP) * 100);

  return (
    <header className="sticky top-0 z-30 w-full shrink-0 border-b border-black/10 bg-[#fff]">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6">
        <div className="shrink-0">
          <Logo link size="sm" />
        </div>
        <Link href="/login" className="shrink-0 text-sm font-medium text-black/50 transition hover:text-primary">
          Sign in
        </Link>
      </div>

      <nav className="border-t border-black/5 px-4 py-3 md:px-6" aria-label="Onboarding progress">
        <div className="mb-2 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-black/70">
            Step {step}: <span className="text-primary">{label}</span>
          </p>
          <span className="text-xs font-medium text-black/40">{percent}%</span>
        </div>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-black/10"
          role="progressbar"
          aria-valuenow={step}
          aria-valuemin={1}
          aria-valuemax={MAX_STEP}
          aria-label={`Onboarding step ${step}: ${label}`}
        >
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </nav>
    </header>
  );
}

// Module 22935 `el` - the wizard root.
export function RegisterWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data, resetForm } = useOnboardingStore();

  const stepParam = searchParams.get("step");
  const parsed = stepParam === null || stepParam === "" ? 0 : parseInt(stepParam, 10);
  const paramStep = Number.isFinite(parsed) ? Math.min(MAX_STEP, Math.max(0, parsed)) : 0;
  const resumeStep = React.useMemo(() => nextIncompleteStep(data), [data]);
  const step = Math.min(paramStep, resumeStep);

  React.useEffect(() => {
    storeNextCookie(searchParams.get("next"));
  }, [searchParams]);

  React.useEffect(() => {
    if (stepParam === null || stepParam === "") {
      router.replace(stepHref(0));
      return;
    }
    if (paramStep !== step) router.replace(stepHref(step));
  }, [stepParam, paramStep, step, router]);

  const go = (target: number) => router.push(stepHref(target));

  return (
    <>
      <ProgressHeader />
      {step === 0 ? (
        <Landing
          onStart={() => {
            resetForm();
            go(1);
          }}
        />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col bg-[#fff]">
          {step === 1 ? <DegreeStep go={go} /> : null}
          {step === 2 ? <FieldOfStudyStep go={go} /> : null}
          {step === 3 ? <RegionsStep /> : null}
          {step === 4 ? <CountriesStep go={go} /> : null}
          {step === 5 ? <BudgetStep go={go} /> : null}
          {step === 6 ? <FundingStep /> : null}
          {step === 7 ? <WorkStep go={go} /> : null}
          {step === 8 ? <StayStep go={go} /> : null}
          {step === 9 ? <IeltsStep go={go} /> : null}
          {step === 10 ? <ApplyStep go={go} /> : null}
          {step === 11 ? <HelpAreasStep /> : null}
          {step === 12 ? <TimeZoneStep go={go} /> : null}
          {step === 13 ? <HearAboutUsStep /> : null}
        </div>
      )}
    </>
  );
}

export default RegisterWizard;
