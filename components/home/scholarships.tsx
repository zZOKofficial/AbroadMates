import Link from "next/link";
import { ArrowRightIcon } from "@/components/home/icons";

/**
 * "AbroadMates by Scholarships" link grid (reference module 93518).
 * Cards/hrefs recovered verbatim from the reference DOM; slugs match
 * data/scholarships.ts (routes: /scholarships/[slug]).
 */

const SCHOLARSHIP_CARDS = [
  { slug: "erasmus-mundus-joint-masters", name: "Erasmus Mundus Joint Masters", region: "Europe" },
  { slug: "chevening-scholarship", name: "Chevening Scholarship", region: "UK" },
  { slug: "fulbright-foreign-student-program", name: "Fulbright Scholarship", region: "USA" },
  { slug: "commonwealth-scholarships", name: "Commonwealth Scholarships", region: "Commonwealth" },
  { slug: "daad-scholarships", name: "DAAD Scholarships", region: "Germany" },
  { slug: "stipendium-hungaricum", name: "Stipendium Hungaricum", region: "Hungary" },
  { slug: "mext-scholarship", name: "MEXT Scholarship", region: "Japan" },
  { slug: "global-korea-scholarship", name: "Global Korea Scholarship", region: "South Korea" },
  { slug: "turkiye-scholarships", name: "Türkiye Scholarships", region: "Turkey" },
  { slug: "australia-awards", name: "Australia Awards", region: "Australia" },
  { slug: "marie-sklodowska-curie-actions", name: "Marie Skłodowska-Curie Actions (MSCA)", region: "Europe" },
  { slug: "swedish-institute-scholarship-for-global-professionals", name: "Swedish Institute Scholarship (SI)", region: "Sweden" },
];

export function ScholarshipsSection() {
  return (
    <section className="relative z-30 overflow-hidden bg-white px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-secondary text-center text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
          AbroadMates by Scholarships
        </h2>
        <p className="mt-3 text-center text-sm text-pretty text-neutral-600 md:text-base">
          Connect with mentors who received leading global scholarships.
        </p>
        <div className="mt-6 grid grid-cols-2 items-stretch gap-4 sm:mt-8 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
          {SCHOLARSHIP_CARDS.map((card) => (
            <div key={card.slug} className="h-full">
              <Link
                href={`/scholarships/${card.slug}`}
                className="group block h-full w-full text-left"
              >
                <div className="flex h-full min-h-[100px] items-center justify-between gap-3 rounded-lg border border-white bg-primary px-3 py-3 transition-transform duration-300 hover:scale-105 hover:border-primary hover:bg-white sm:min-h-[108px] md:min-h-[116px]">
                  <div className="min-w-0 flex-1 text-left transition-transform duration-300 group-hover:translate-x-0.5">
                    <h3 className="font-brand line-clamp-2 text-sm leading-snug font-bold text-white transition-colors group-hover:text-primary sm:text-base md:text-lg">
                      {card.name}
                    </h3>
                    <p className="mt-0.5 text-[11px] text-white/85 transition-colors group-hover:text-primary/75 sm:text-xs">
                      {`${card.region} · `}
                      <span className="font-semibold">View mentors</span>
                    </p>
                  </div>
                  <ArrowRightIcon className="size-3 shrink-0 text-white transition-transform group-hover:translate-x-1 group-hover:text-primary sm:size-3.5" />
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link
            href="/mentors?scholarship=true"
            className="text-sm sm:text-base font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary sm:underline-offset-8"
          >
            View All Scholarship Mentors →
          </Link>
        </div>
      </div>
    </section>
  );
}
