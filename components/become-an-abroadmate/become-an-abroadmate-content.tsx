"use client";

import Link from "next/link";
import { useState } from "react";

const PARINDA_IMAGE =
  "https://res.cloudinary.com/dcrm3y8x2/image/upload/v1760606022/abroadmates/mentors/bzzhsmm39a3yxg9tuqd2.jpg";

const HERO_AVATARS = [
  "/images/join-mate/joinMate-10015.png",
  "/images/join-mate/joinMate-20168.png",
  "/images/join-mate/joinMate-30f51.png",
  "/images/join-mate/joinMate-445d5.png",
];

const MENTOR_CARDS = [
  { one: "/images/mentors/mentor-1afe9.png", two: "/images/mentors/mentor-13fb5.png", rotate: "-5deg", ring: "border-primary" },
  { one: "/images/mentors/mentor-26e8d.png", two: "/images/mentors/mentor-2145e.png", rotate: "3deg", ring: "border-secondary" },
  { one: "/images/mentors/mentor-301a3.png", two: "/images/mentors/mentor-31afb.png", rotate: "-2deg", ring: "border-primary" },
  { one: "/images/mentors/mentor-4b72c.png", two: "/images/mentors/mentor-41992.png", rotate: "4deg", ring: "border-secondary" },
  { one: "/images/mentors/mentor-5b687.png", two: "/images/mentors/mentor-56fbc.png", rotate: "-4deg", ring: "border-primary" },
  { one: "/images/mentors/mentor-6767f.png", two: "/images/mentors/mentor-67aaf.png", rotate: "2deg", ring: "border-secondary" },
  { one: "/images/mentors/mentor-72fe3.png", two: "/images/mentors/mentor-74b93.png", rotate: "-3deg", ring: "border-primary" },
  { one: "/images/mentors/mentor-81ab8.png", two: "/images/mentors/mentor-8a60f.png", rotate: "5deg", ring: "border-secondary" },
  { one: "/images/mentors/mentor-9c659.jpg", two: "/images/mentors/mentor-9c189.jpg", rotate: "-5deg", ring: "border-primary" },
];

const FORMAT_BUTTON_CLASS = `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive shadow-[var(--shadow-button)] h-9 has-[>svg]:px-3 relative overflow-hidden rounded-xl px-5 py-2.5 text-[15px] font-semibold bg-primary text-white shadow-(--shadow-button) hover:bg-[#b71b21]`;

const FORMAT_20_BULLETS = [
  "Perfect for sanity-checking one big decision with a student.",
  "Great for country, course, or shortlisting questions.",
  "Easy to slot in between your own classes or work.",
];

const FORMAT_40_BULLETS = [
  "Review a student's full profile and goals in detail.",
  "Co-create an application, scholarship, or visa game plan.",
  "Enough time for honest, unhurried guidance that actually lands.",
];

const HOW_IT_WORKS = [
  { n: 1, title: <>Set your own availability</> },
  { n: 2, title: <>Set your<br />own price</> },
  { n: 3, title: <>Earn 70–80% on<br />1:1 sessions</> },
  { n: 4, title: <>No minimum<br />hours</> },
  { n: 5, title: <>No long-term commitment</> },
];

const FLEXIBILITY_ITEMS = [
  "Choose which days you are available",
  "Choose your time slots",
  "Update anytime",
  "Busy week? Turn availability off",
  "Break week? Add more slots",
  "Take a break? Pause slots instantly",
];

const TOPICS = [
  { title: "University Shortlisting", href: "/services/university-shortlisting", img: "/svgs/personal-statement.svg" },
  { title: "Application Strategy", href: "/services/application-strategy", img: "/svgs/essay-review.svg" },
  { title: "Essays and SOP Feedback", href: "/services/essays-and-sop-feedback", img: "/svgs/recommendation-letters.svg" },
  { title: "Scholarship Guidance", href: "/services/scholarship-guidance", img: "/svgs/life-abroad.svg" },
  { title: "Visa and Arrival Preparation", href: "/services/visa-and-arrival-preparation", img: "/svgs/roadmap.svg" },
  { title: "Life Abroad Questions", href: "/services/life-abroad-questions", img: "/svgs/eca-guidance.svg" },
];

const SESSION_AVATARS = [
  "/images/join-mate/joinMate-10015.png",
  "/images/join-mate/joinMate-445d5.png",
  "/images/join-mate/joinMate-30f51.png",
  "/images/join-mate/joinMate-20168.png",
];

const SESSION_ITEMS = [
  "Host group sessions — paid 50/50 after the event",
  "Run country or university focused group sessions",
  "We manage registrations and logistics",
  "You focus on the content",
];

const MENTOR_FAQS = [
  {
    question: "Do I need teaching experience?",
    answer:
      "Not at all! Your real-world experience studying abroad is what students value most. If you can share your journey and insights, you can be a mentor.",
  },
  {
    question: "How much time do I need to commit?",
    answer:
      "You decide. There are no minimum hours. You can offer as few or as many slots per week as fits your schedule — and change it anytime.",
  },
  {
    question: "When do I get paid?",
    answer:
      "After each completed 1:1 or Complete Application Mentorship session, your mentor net is added to an unpaid pool. When that pool reaches your payout threshold (default $50 USD net), we email you and send the transfer within about a week. You keep 70–80% on those sessions (80/20 if you joined before 1 March 2026, otherwise 70/30). Group sessions you host are paid 50/50 after the session ends.",
  },
  {
    question: "What if I need to cancel a session?",
    answer:
      "Life happens. You can cancel or reschedule from your dashboard. We ask for reasonable notice so students can rebook with another mentor.",
  },
  {
    question: "Can I mentor from anywhere in the world?",
    answer:
      "Yes — AbroadMates is fully remote. All sessions happen over video call, so you can mentor from wherever you are.",
  },
  {
    question: "What topics can I mentor on?",
    answer:
      "Anything from university shortlisting, applications, essays, SOPs, scholarships, visas, life abroad, and more. You choose the topics that match your experience.",
  },
];

function SparklesIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
      <path d="M20 3v4" />
      <path d="M22 5h-4" />
      <path d="M4 17v2" />
      <path d="M5 18H3" />
    </svg>
  );
}

function CircleCheckIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
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
      className={className}
      aria-hidden="true"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

function FormatBullet({ text }: { text: string }) {
  return (
    <li className="group/li flex items-start gap-3 text-[15px] text-neutral-800">
      <CircleCheckIcon className="lucide lucide-circle-check mt-px h-5 w-5 shrink-0 text-primary transition-transform group-hover/li:scale-110" />
      <span>{text}</span>
    </li>
  );
}

export default function BecomeAnAbroadmateContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <main>
          {/* Hero */}
          <section
            className="relative min-h-[95vh] overflow-hidden px-4 pt-12 pb-20 sm:px-6 sm:pt-16 sm:pb-24 lg:px-12"
            style={{ background: "linear-gradient(120deg, #FFE6E8 0%, #ffffff 35%, #ffffff 70%, #FFF7E0 100%)" }}
          >
            <div className="mx-auto mt-6 flex max-w-6xl flex-col-reverse items-center gap-10 sm:mt-10 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="relative w-full max-w-2xl flex-1 text-center md:text-left">
                <div className="bg-secondary inline-flex items-center gap-2 rounded-full px-4 py-2 shadow-sm">
                  <span></span>
                  <span className="text-sm font-medium text-white">Mentor students who are where you once were</span>
                </div>
                <h1 className="font-brand text-text-primary mt-6 text-3xl leading-[1.15] font-semibold tracking-tight sm:text-4xl md:text-[2.75rem] md:leading-[1.2] lg:text-5xl">
                  Turn your study abroad experience into <span className="text-primary">real impact</span> and{" "}
                  <span className="text-secondary">income.</span>
                </h1>
                <div className="mt-8 flex flex-col items-center gap-4 md:flex-col md:items-start md:gap-2">
                  <div className="flex -space-x-2">
                    {HERO_AVATARS.map((src) => (
                      <div
                        key={src}
                        className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-[#ffffff] bg-gray-200 shadow-sm"
                      >
                        <img
                          src={src}
                          alt=""
                          loading="lazy"
                          decoding="async"
                          className="object-cover"
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            color: "transparent",
                          }}
                          sizes="40px"
                        />
                      </div>
                    ))}
                    <div className="bg-secondary z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#ffffff] text-sm font-semibold text-[#ffffff] shadow-sm">
                      +
                    </div>
                  </div>
                  <p className="text-sm text-gray">
                    <span className="font-semibold">2,000+</span> mentoring hours delivered{" "}
                    <span aria-hidden="true">•</span> <span className="font-semibold">4.8 ★</span> average rating
                  </p>
                </div>
                <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:items-stretch sm:gap-4">
                  <Link
                    className="bg-primary inline-flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-base font-semibold text-white shadow-(--shadow-button) transition hover:bg-[#b71b21] sm:w-auto"
                    href="/register/mentor/sign-up"
                  >
                    Become a mentor<span></span>
                  </Link>
                  <a
                    className="border-primary text-primary hover:bg-primary/5 inline-flex w-full items-center justify-center rounded-lg border-2 bg-transparent px-6 py-3.5 text-base font-semibold shadow-sm transition sm:w-auto"
                    href="#how-it-works"
                  >
                    See how it works
                  </a>
                </div>
              </div>
              <div className="relative flex shrink-0 items-center justify-center md:justify-end">
                <div className="relative">
                  <Link
                    target="_blank"
                    rel="noreferrer"
                    className="relative block h-[320px] w-[320px] sm:h-[360px] sm:w-[360px]"
                    href="/parinda-rahman"
                  >
                    <div className="border-primary absolute inset-[4px] rounded-full border-8"></div>
                    <div className="bg-primary absolute inset-[16px] overflow-hidden rounded-full">
                      <img
                        src={PARINDA_IMAGE}
                        alt="Parinda Rahman, Mentor of the Month"
                        decoding="async"
                        className="object-cover"
                        style={{
                          position: "absolute",
                          height: "100%",
                          width: "100%",
                          left: 0,
                          top: 0,
                          right: 0,
                          bottom: 0,
                          color: "transparent",
                        }}
                        sizes="288px, 328px"
                      />
                    </div>
                    <div className="bg-secondary/95 absolute top-6 right-0 -rotate-12 rounded-lg px-4 py-2 shadow-md sm:top-8">
                      <span className="font-secondary text-xl font-bold text-white">Join us!</span>
                    </div>
                    <div className="absolute bottom-25 left-50 flex -translate-x-1/2 flex-col items-center gap-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 28">
                        <path
                          fill="#F4A300"
                          d="M6 3.604c0-1.346 1.56-2.09 2.607-1.243l16.88 13.669c1.018.824.435 2.47-.875 2.47h-9.377a2.25 2.25 0 0 0-1.749.835l-4.962 6.134C7.682 26.51 6 25.915 6 24.576z"
                          strokeWidth="1.8"
                          stroke="#fff"
                        />
                      </svg>
                      <span className="absolute -bottom-8 left-25 -translate-x-1/2 bg-secondary font-brand rounded-[8px] border-2 border-[#ffffff] px-3 py-1 text-sm font-semibold whitespace-nowrap text-[#ffffff] shadow-md">
                        Mentor of the Month
                      </span>
                    </div>
                  </Link>
                  <div className="bg-primary/90 absolute -bottom-2 -left-4 rounded-lg px-5 py-3 shadow-(--shadow-button) sm:-bottom-2">
                    <div className="font-secondary text-3xl leading-none font-bold text-white">500+</div>
                    <div className="mt-1 text-xs font-medium text-[#ffffff]">Active Mentors</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mentor strip */}
          <section className="relative -mt-16 hidden overflow-visible lg:-mt-20 xl:-mt-24 lg:block">
            <div className="pointer-events-none z-10 flex w-full justify-center px-4">
              <div className="flex w-full items-end justify-center gap-3 xl:gap-5">
                {MENTOR_CARDS.map((card) => (
                  <div
                    key={card.two}
                    className="pointer-events-auto shrink-0 rounded-[18px] xl:rounded-[22px]"
                    style={{ transform: `rotate(${card.rotate})`, boxShadow: "0 18px 45px rgba(0,0,0,0.45)" }}
                  >
                    <div className={`rounded-[14px] border-[3px] xl:rounded-[18px] ${card.ring}`}>
                      <img
                        srcSet={`${card.one} 1x, ${card.two} 2x`}
                        src={card.two}
                        alt="Mentor"
                        width={180}
                        height={220}
                        loading="lazy"
                        decoding="async"
                        className="h-[140px] w-[95px] rounded-[10px] object-cover xl:h-[190px] xl:w-[130px] xl:rounded-[14px]"
                        style={{ color: "transparent" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Choose How You Want to Mentor */}
          <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true"></div>
            <header className="mx-auto max-w-3xl text-center">
              <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl">
                Choose How You Want to Mentor
              </h2>
              <p className="mt-3 text-sm text-gray md:text-base">
                Pick the call formats you&apos;ll offer to students—from quick fixes to deep dives.
              </p>
            </header>
            <div className="mt-10 grid items-stretch gap-6 md:grid-cols-2">
              <div className="relative h-full rounded-3xl transition-transform duration-300 will-change-transform hover:-translate-y-0.5">
                <div className="absolute inset-0 -z-10 rounded-3xl blur" aria-hidden="true"></div>
                <div className="h-full rounded-3xl bg-linear-to-br from-neutral-200 to-neutral-100 p-px">
                  <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-[#ffffff] p-6 shadow-sm md:p-8">
                    <header className="mb-5 flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-[28px]">
                          20 minutes
                        </h2>
                        <p className="mt-1 text-[13px] text-neutral-600">Quick calls that fit your schedule.</p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200">
                        <SparklesIcon className="lucide lucide-sparkles h-3.5 w-3.5" />
                        Quick format
                      </span>
                    </header>
                    <div
                      className="my-4 h-px w-full"
                      style={{ background: "repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 6px, transparent 6px 12px)" }}
                    ></div>
                    <ul className="mt-4 mb-7 flex-1 space-y-3">
                      {FORMAT_20_BULLETS.map((text) => (
                        <FormatBullet key={text} text={text} />
                      ))}
                    </ul>
                    <button data-slot="button" className={FORMAT_BUTTON_CLASS}>
                      <span className="relative z-1 flex cursor-pointer items-center gap-2">
                        Offer a 20-min focus call
                      </span>
                    </button>
                    <p className="mt-3 text-[10px] text-neutral-500">
                      You can change or pause these formats anytime from your mentor dashboard.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative h-full rounded-3xl transition-transform duration-300 will-change-transform hover:-translate-y-0.5 scale-[1.01]">
                <div className="absolute inset-0 -z-10 rounded-3xl blur" aria-hidden="true"></div>
                <div className="h-full rounded-3xl bg-linear-to-br from-neutral-200 to-neutral-100 p-px">
                  <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-[#ffffff] p-6 shadow-sm md:p-8">
                    <header className="mb-5 flex items-start justify-between">
                      <div>
                        <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-[28px]">
                          40 minutes
                        </h2>
                        <p className="mt-1 text-[13px] text-neutral-600">
                          Give deep-dive sessions for full student journeys.
                        </p>
                      </div>
                      <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200">
                        <SparklesIcon className="lucide lucide-sparkles h-3.5 w-3.5" />
                        Deep-dive format
                      </span>
                    </header>
                    <div
                      className="my-4 h-px w-full"
                      style={{ background: "repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 6px, transparent 6px 12px)" }}
                    ></div>
                    <ul className="mt-4 mb-7 flex-1 space-y-3">
                      {FORMAT_40_BULLETS.map((text) => (
                        <FormatBullet key={text} text={text} />
                      ))}
                    </ul>
                    <button data-slot="button" className={FORMAT_BUTTON_CLASS}>
                      <span className="relative z-1 flex cursor-pointer items-center gap-2">
                        Offer a 40-min deep-dive
                        <StarIcon className="lucide lucide-star h-4 w-4" />
                      </span>
                    </button>
                    <p className="mt-3 text-[10px] text-neutral-500">
                      You can change or pause these formats anytime from your mentor dashboard.
                    </p>
                  </div>
                </div>
                <div
                  className="pointer-events-none absolute top-5 -right-5 z-10 rotate-45 rounded px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  style={{ background: "linear-gradient(90deg,#DA1F26,#f4a300)" }}
                  aria-hidden="true"
                >
                  Most booked
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="bg-[#fafafa] px-4 py-16 sm:px-6 md:py-20 lg:px-12">
            <div className="mx-auto max-w-6xl">
              <header className="mb-8 text-center md:mb-16">
                <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl">
                  How It Works
                </h2>
                <p className="mt-3 text-sm text-gray md:text-base">
                  The benefits that matter most to mentors like you.
                </p>
              </header>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
                {HOW_IT_WORKS.map((step) => (
                  <div
                    key={step.n}
                    className="relative flex min-h-[190px] flex-col items-center justify-center rounded-3xl bg-[#ffffff] px-4 py-8 text-center shadow-md"
                  >
                    <div className="absolute -top-4 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xl font-secondary font-semibold text-white shadow-md pr-1">
                      {step.n}
                    </div>
                    <div className="mb-4 flex h-12 items-center justify-center">
                      <span></span>
                    </div>
                    <h3 className="font-brand text-lg font-semibold leading-snug text-text-primary">{step.title}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Flexibility Meets Income */}
          <section id="how-it-works" className="w-full bg-white px-4 py-16 sm:px-8 lg:px-[120px] lg:py-[80px]">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
              <header className="flex flex-col items-center gap-3 text-center">
                <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl">
                  Flexibility Meets Income
                </h2>
                <p className="max-w-3xl text-base text-gray md:text-lg md:leading-[1.2]">
                  No rigid shifts. No penalties for being unavailable. Just simple, flexible scheduling.
                </p>
              </header>
              <div className="flex w-full flex-col items-stretch gap-16 md:flex-row">
                <div className="flex flex-1 flex-col justify-between gap-7 rounded-3xl bg-white p-8 shadow-[0px_24px_50px_0px_rgba(0,0,0,0.25)]">
                  <div className="flex flex-col gap-8">
                    <h3 className="font-brand text-2xl font-bold text-text-primary">
                      Freedom. Flexibility. Fair earnings
                    </h3>
                    <ul className="flex flex-col gap-5">
                      {FLEXIBILITY_ITEMS.map((item) => (
                        <li key={item} className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#FCE6E8]">
                            <span></span>
                          </div>
                          <span className="text-base text-text-primary md:text-[18px] md:leading-[1.2]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-lg border border-text-primary bg-secondary px-6 py-3">
                    <p className="text-center text-base font-normal text-black md:text-lg">Your schedule, your rules.</p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-6 rounded-3xl bg-white p-8 shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-brand text-2xl font-bold text-text-primary">Your Availability</h3>
                      <p className="mt-0.5 text-sm text-gray">March 2026</p>
                    </div>
                    <button type="button" className="rounded-xl bg-primary px-6 py-3 text-base font-semibold text-white">
                      Edit
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div
                      className="flex flex-col gap-3 rounded-2xl border border-primary bg-[#FCE6E8] p-6"
                      style={{ borderWidth: "1.6px" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="h-3 w-3 shrink-0 rounded-full bg-primary"></span>
                          <span className="text-base font-semibold text-text-primary">Monday</span>
                        </div>
                        <span className="text-sm font-medium text-primary">3 slots</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-primary">
                          9:00 AM
                        </span>
                        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-primary">
                          2:00 PM
                        </span>
                        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-primary">
                          6:00 PM
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex flex-col gap-3 rounded-2xl border border-primary bg-[#FCE6E8] p-6"
                      style={{ borderWidth: "1.6px" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="h-3 w-3 shrink-0 rounded-full bg-primary"></span>
                          <span className="text-base font-semibold text-text-primary">Wednesday</span>
                        </div>
                        <span className="text-sm font-medium text-primary">2 slots</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-primary">
                          10:00 AM
                        </span>
                        <span className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-text-primary">
                          4:00 PM
                        </span>
                      </div>
                    </div>
                    <div
                      className="flex items-center justify-between rounded-2xl border border-[#E5E7EB] bg-[#D4D4D4] px-6 py-5"
                      style={{ borderWidth: "1.6px" }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 shrink-0 rounded-full bg-gray"></span>
                        <span className="text-base font-semibold text-gray">Friday</span>
                      </div>
                      <span className="rounded-lg bg-white px-4 py-3 text-sm font-medium text-gray">Unavailable</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between border-t border-gray-light border-[#eaeaea] pt-6">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm text-gray">Total hours this week</span>
                      <span className="text-[32px] font-bold leading-[1.2] text-primary">7.5h</span>
                    </div>
                    <div className="flex flex-col items-end gap-0.5">
                      <span className="text-sm text-gray">Potential earnings</span>
                      <span className="text-[32px] font-bold leading-[1.2] text-secondary">$375</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* What You'll Help Students With */}
          <section className="bg-white px-6 py-16 sm:px-12 lg:px-16">
            <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl text-center">
              What You&apos;ll Help Students With
            </h2>
            <p className="mt-2 text-center text-lg text-gray">
              Students book mentors for exactly these topics. Pick one or all — it&apos;s your call.
            </p>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {TOPICS.map((topic) => (
                <Link
                  key={topic.title}
                  className="bg-primary relative flex h-56 flex-col overflow-hidden rounded-md border-2 border-black px-5 pt-10 text-white transition-transform hover:-translate-y-2 hover:rotate-1 hover:shadow-lg"
                  href={topic.href}
                >
                  <div className="relative z-10 pr-28 text-left">
                    <h3 className="font-brand text-3xl font-bold">{topic.title}</h3>
                  </div>
                  <div className="pointer-events-none absolute right-0 bottom-[-50px]">
                    <img
                      src={topic.img}
                      alt={topic.title}
                      width={240}
                      height={240}
                      loading="lazy"
                      decoding="async"
                      className="object-contain select-none"
                      style={{ color: "transparent" }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Sessions */}
          <section className="w-full bg-[#F8F8F8] px-4 py-16 sm:px-8 lg:px-[120px] lg:py-[80px]">
            <div className="mx-auto flex max-w-6xl flex-col items-center gap-16">
              <header className="flex w-full flex-col items-center gap-4 text-center">
                <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl">
                  Sessions
                </h2>
                <p className="max-w-2xl text-base text-gray md:text-lg md:leading-[1.2]">
                  Share your insights in group sessions. Hosts keep 50% of registration revenue after each event ends
                  (50/50 split with AbroadMates).
                </p>
              </header>
              <div className="flex w-full flex-col items-center gap-10 sm:gap-14 md:flex-row md:items-center md:justify-center md:gap-20">
                <div className="relative shrink-0">
                  <div className="absolute left-1/2 top-1/2 h-[150px] w-[150px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-secondary sm:h-[190px] sm:w-[190px] md:h-[220px] md:w-[220px]"></div>
                  <div className="relative grid grid-cols-2 gap-0">
                    {SESSION_AVATARS.map((src) => (
                      <div
                        key={src}
                        className="relative h-[150px] w-[150px] overflow-hidden rounded-full border-[5px] border-white shadow-[0px_6px_10px_-6px_rgba(0,0,0,0.1),0px_16px_24px_-5px_rgba(0,0,0,0.1)] sm:h-[190px] sm:w-[190px] sm:border-[6px] md:h-[220px] md:w-[220px]"
                      >
                        <img
                          src={src}
                          alt="Mentor"
                          loading="lazy"
                          decoding="async"
                          className="object-cover"
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: "100%",
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            color: "transparent",
                          }}
                          sizes="(max-width: 640px) 150px, (max-width: 768px) 190px, 220px"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-full max-w-[550px] flex-col gap-2 rounded-3xl bg-[#ffffff] p-8">
                  <div className="flex flex-col gap-8">
                    <h3 className="text-2xl font-brand font-bold text-text-primary">
                      Freedom. Flexibility. Fair earnings
                    </h3>
                    <ul className="flex flex-col gap-5">
                      {SESSION_ITEMS.map((item) => (
                        <li key={item} className="flex items-center gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-[#FEF6E6]">
                            <span></span>
                          </div>
                          <span className="text-base font-medium text-text-primary md:text-[18px] md:leading-[1.2]">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-[14px] border border-black bg-secondary py-[15px] px-8 text-lg font-semibold text-black transition-opacity hover:opacity-90"
                    href="/sessions"
                  >
                    Browse Group Sessions<span></span>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* Red CTA */}
          <section className="w-full bg-[#F8F8F8] px-4 py-10 sm:px-8 lg:px-[129px] lg:py-[80px]">
            <div
              className="mx-auto flex max-w-6xl flex-col items-center gap-6 rounded-3xl p-6 text-center sm:p-8 md:p-12"
              style={{ background: "linear-gradient(135deg, #DD0516 0%, #A60411 100%)" }}
            >
              <div className="flex flex-col items-center gap-3">
                <h3 className="font-caveat font-secondary text-3xl font-semibold text-white md:text-[32px] md:leading-[1.2]">
                  Ready to start earning?
                </h3>
                <p className="text-[18px] font-normal leading-[1.2] text-white/90">
                  Join hundreds of mentors who&apos;ve already made an impact
                </p>
              </div>
              <Link
                className="rounded-xl bg-white px-10 py-4 text-lg font-semibold text-primary transition-opacity hover:opacity-90"
                href="/register/mentor/sign-up"
              >
                Get started now
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
              <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl text-center">
                Frequently Asked <span className="text-[var(--color-primary)]">Questions</span>
              </h2>
              <p className="mt-3 text-center text-sm text-neutral-600 sm:text-base">
                Everything you need to know about becoming an AbroadMate mentor.
              </p>
              <div className="mt-8 divide-y divide-neutral-200">
                {MENTOR_FAQS.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={faq.question} className="py-4">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between text-left font-medium text-neutral-900 hover:text-[var(--color-primary)]"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.question}</span>
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
                          className={`lucide lucide-chevron-down h-5 w-5 transition-transform ${
                            isOpen ? "rotate-180 text-[var(--color-primary)]" : "text-neutral-500"
                          }`}
                          aria-hidden="true"
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </button>
                      {isOpen && <p className="mt-3 text-sm leading-relaxed text-neutral-600">{faq.answer}</p>}
                    </div>
                  );
                })}
              </div>
              <div className="mt-6 text-center">
                <Link
                  className="inline-block rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-button)] hover:bg-[#b71b21]"
                  href="/faq"
                >
                  View All FAQs
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
