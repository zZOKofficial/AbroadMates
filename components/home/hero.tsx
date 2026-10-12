"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Hero section (reference module: chunk app/page — component 3920).
 * Client component: the headline word rotates through study-abroad
 * topics every 2 seconds (the reference cycles a list of 9 words; the
 * server-rendered HTML always contains the first one, "where to study").
 */
const ROTATING_WORDS = [
  "where to study",
  "scholarships",
  "how to IELTS",
  "how to SAT",
  "how to GRE",
  "how to GMAT",
  "ECA developments",
  "life abroad",
  "work abroad",
];

/**
 * Optimized hero image variants shipped by the original site's Next.js
 * image optimizer (`/_next/image?url=%2Fhero-page.png&w=…&q=75`), mapped
 * to the original-named files captured in public/images/hero/.
 * The 1920w (hero-page4169.png) and 3840w (hero-page57b7.png) variants
 * were not captured by the scraper, so the largest available file
 * (2048w) serves as both 2048w candidate and default src.
 */
const HERO_SRCSET = [
  "/images/hero/hero-page79ac.png 640w",
  "/images/hero/hero-page3f81.png 750w",
  "/images/hero/hero-page2a9e.png 828w",
  "/images/hero/hero-page523d.png 1080w",
  "/images/hero/hero-page1ce3.png 1200w",
  "/images/hero/hero-page0e62.png 2048w",
].join(", ");

export function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % ROTATING_WORDS.length),
      2000,
    );
    return () => clearInterval(id);
  }, []);

  const word = ROTATING_WORDS[wordIndex];

  return (
    <section className="relative min-h-dvh w-full overflow-hidden">
      {/* NOTE: the original site referenced url('/heroImage.png') here —
          that file already 404'd on the live site (the scrape captured a
          broken URL). The 95%-opacity overlay below hides it either way. */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
        style={{ backgroundImage: "url('/heroImage.png')" }}
      />
      <div className="absolute inset-0 bg-[#fff6f6] opacity-95 pointer-events-none" />
      <div className="relative z-10 flex min-h-dvh flex-col items-center justify-start px-4 pt-12 sm:pt-20 md:justify-center md:pt-16">
        <div className="relative z-20 text-center md:text-left">
          <p className="font-secondary mt-10 text-center text-3xl font-semibold sm:mt-8 sm:text-5xl">
            {"Ask About "}
            <br />
            <span
              key={word}
              className="font-brand animate__animated animate__fadeInUp relative inline-flex min-w-[12ch] items-center justify-center align-middle font-bold text-primary"
              style={{ animationDuration: "0.8s" }}
            >
              {word}
            </span>
            <br />
            <span className="font-brand block text-center text-[clamp(0.95rem,2vw,1.5rem)] font-normal md:text-2xl">
              to a current student.
            </span>
          </p>
        </div>
        <img
          alt="Hero Image"
          aria-hidden
          width={1500}
          height={1500}
          decoding="async"
          className="pointer-events-none absolute inset-0 h-full w-full -translate-y-8 object-cover md:translate-y-10 md:opacity-100"
          style={{ color: "transparent" }}
          sizes="100vw"
          srcSet={HERO_SRCSET}
          src="/images/hero/hero-page0e62.png"
        />
        <div className="relative z-10 mx-auto mt-72 flex max-w-2xl flex-col items-center justify-center gap-3 text-center sm:flex-row sm:gap-4">
          <Link
            href="/mentors"
            className="btn-primary text-md w-full sm:w-auto md:text-lg"
          >
            Talk to your AbroadMate
          </Link>
          <Link
            href="/chat-with-founders"
            className="md:text-md w-full rounded-md border px-3 py-2 text-sm font-medium sm:w-auto"
          >
            or, book a FREE planning call
          </Link>
        </div>
        <div className="relative z-10 mx-auto mt-2 max-w-3xl px-2 text-center text-sm font-medium text-gray-700 md:text-base">
          <p className="inline-block rounded-full bg-white/60 px-4 py-1 shadow-sm backdrop-blur-sm transition hover:bg-white/80">
            {"for : "}
            <span className="text-primary">undergrad,</span>
            <span className="text-primary">{" master’s,"}</span>
            <span className="text-primary">{" MBA,"}</span>
            <span className="text-primary">{" PhD,"}</span>
            <span className="text-primary">{" ECA,"}</span>
            {" work abroad & test prep"}
          </p>
        </div>
        <div className="z-10 mt-7 flex flex-col items-center justify-center gap-4 px-4 text-center text-sm text-black sm:flex-row sm:gap-10 sm:text-base">
          <div className="max-w-[680px] sm:max-w-none">
            <p className="inline-block w-full rounded-md bg-(--color-accent) px-4 py-1 shadow-sm backdrop-blur-sm transition hover:bg-white/80 sm:inline-block sm:w-110">
              {"Founded by "}
              <span className="relative">
                <span className="font-secondary absolute -top-6 left-1 -translate-x-1/2 text-2xl font-semibold text-primary">
                  former
                </span>
                {"^ students. "}
              </span>
              {"Applied to 100+ schools across North America, Europe, and Asia."}
            </p>
          </div>
          <div className="max-w-[680px] sm:max-w-none">
            <p className="inline-block w-full rounded-md bg-(--color-accent) px-4 py-1 shadow-sm backdrop-blur-sm transition hover:bg-white/80 sm:w-100">
              {
                "20 or 40 min call. No bullsh*t advice. Leave with a 3-step action plan."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
