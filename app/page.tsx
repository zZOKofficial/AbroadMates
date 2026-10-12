import Link from "next/link";

import "@/components/home/home.css";

import { ComparisonSection } from "@/components/home/comparison";
import { BUTTON_ACCENT } from "@/components/home/button-classes";
import { CountriesGrid } from "@/components/home/countries";
import { FaqPreview } from "@/components/home/faq-preview";
import { GroupSessionsSection } from "@/components/home/group-sessions";
import { HelpSection } from "@/components/home/help";
import { Hero } from "@/components/home/hero";
import { PricingSection } from "@/components/home/pricing";
import { ScholarshipsSection } from "@/components/home/scholarships";
import { StatsSection } from "@/components/home/stats";
import { TeamSection } from "@/components/home/team";

/**
 * Homepage, reconstructed from the scraped reference
 * (`_reference/pages/index.html` + `chunks/app/page-0e56ed8e31c36c35b50f.js`).
 *
 * The root layout already renders the site header/footer, so `<main>` here only
 * contains the page sections. No `metadata` export: the original title /
 * description lived in the lost layout.
 */
export default function HomePage() {
  return (
    <main>
      <Hero />

      {/* Spacer between the hero and the intro section (reference-only element). */}
      <div className="bg-white py-2 sm:py-3" />

      {/* "What is AbroadMates" — inlined (client copy used a plain section). */}
      <section className="relative mx-auto w-full max-w-6xl px-4 pt-8 pb-8 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-3xl text-center">
          <h2 className="font-secondary text-3xl font-bold tracking-tight text-balance text-primary md:text-5xl">
            What is AbroadMates
          </h2>
          <p className="mt-3 text-sm text-pretty text-neutral-600 md:text-base">
            We replace study abroad agencies (read scams) with real students and
            their guidance.
          </p>
        </header>
        <div className="mt-10 flex flex-col items-center gap-10">
          <div className="w-full bg-[#DD0516] rounded-2xl md:rounded-[24px] py-8 md:py-10 px-6 md:px-8">
            <div className="text-base md:text-lg leading-relaxed font-normal text-white text-center tracking-wider">
              <p>
                <strong>AbroadMates</strong> is the{" "}
                <span className="relative inline-block px-1.5">
                  <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[24px] md:h-[28px] bg-[#f4a300] rounded-md opacity-80" />
                  <span className="relative z-10 text-black">
                    all-in-one mentorship platform
                  </span>
                </span>{" "}
                for study abroad. Study abroad agencies are scams. We help you
                apply without study abroad agencies. You book a 20 or 40 minute
                call with a mentor who went to your dream school.
              </p>
              <p className="mt-4 text-xs md:text-xs border-t border-white/25 pt-6">
                <span className="font-brand text-white">
                  Ask anything: Am I choosing the right country? Does my essay
                  suck? Visa questions? Cultural shock tips?
                  <br />
                  They&apos;ll tell you the truth. Even the ugly parts.
                  Especially the ugly parts.
                </span>
              </p>
            </div>
          </div>
          <Link
            data-slot="button"
            href="/register/form?step=0"
            className={BUTTON_ACCENT}
          >
            Start NOW
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 12H19M19 12L12 5M19 12L12 19"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </section>

      <StatsSection />

      <ComparisonSection />

      <PricingSection />

      {/* Countries */}
      <section className="relative z-30 px-4 py-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-secondary text-center text-3xl font-bold text-[var(--color-black)] sm:text-4xl md:text-5xl">
            AbroadMates by Countries
          </h2>
          <div className="mt-3 mb-8 text-center text-sm text-pretty text-neutral-600 md:text-base">
            Find mentor from your destination. NOW.
          </div>
          <CountriesGrid />
        </div>
      </section>

      <ScholarshipsSection />

      <HelpSection />

      <GroupSessionsSection />

      <TeamSection />

      <FaqPreview />
    </main>
  );
}
