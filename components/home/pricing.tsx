import Link from "next/link";
import { CircleCheck, Sparkles, Star } from "lucide-react";
import { BUTTON_PRIMARY } from "@/components/home/button-classes";

/**
 * "Book Your Ultra-Personalized Call" pricing section. Card data
 * (taglines, bullets, CTA hrefs) recovered from the reference page
 * chunk: 20-min card → /mentors?duration=20, 40-min card →
 * /mentors?duration=40. The reference buttons checked auth and
 * redirected to /login first; without the lost auth API they now link
 * straight to /mentors.
 */

type Plan = {
  minutes: number;
  tagline: string;
  bullets: string[];
  href: string;
  featured?: boolean;
};

const PLANS: Plan[] = [
  {
    minutes: 20,
    tagline: "Fast, focused, and straight to the point",
    bullets: [
      'Ask: "Am I choosing the right country?"',
      "Shortlist the right schools/programs",
      "Visa interview checklists",
    ],
    href: "/mentors?duration=20",
  },
  {
    minutes: 40,
    tagline: "Go deep. Fix it all in one call.",
    bullets: [
      "Personal profile review. No sugar-coating",
      " Essay/SOP outline feedback that helps",
      "Scholarship & visa roadmap you can act on",
    ],
    href: "/mentors?duration=40",
    featured: true,
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const { minutes, tagline, bullets, href, featured } = plan;
  return (
    <div
      className={[
        "relative rounded-3xl transition-transform duration-300 will-change-transform hover:-translate-y-0.5",
        featured ? "scale-[1.01]" : "",
      ].join(" ")}
    >
      <div className="absolute inset-0 -z-10 rounded-3xl blur" aria-hidden="true" />
      <div className="rounded-3xl bg-linear-to-br from-neutral-200 to-neutral-100 p-px">
        <div className="rounded-[calc(1.5rem-1px)] bg-white/90 p-6 shadow-sm md:p-8">
          <header className="mb-5 flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 md:text-[28px]">
                {minutes}
                {" minutes"}
              </h2>
              <p className="mt-1 text-[13px] text-neutral-600">{tagline}</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              {featured ? "Deep-Dive" : "Focused"}
            </span>
          </header>
          <div
            className="my-4 h-px w-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, rgba(0,0,0,.09) 0 6px, transparent 6px 12px)",
            }}
          />
          <ul className="mt-4 mb-7 space-y-3">
            {bullets.map((bullet) => (
              <li
                key={bullet}
                className="group/li flex items-start gap-3 text-[15px] text-neutral-800"
              >
                <CircleCheck
                  className="mt-px h-5 w-5 shrink-0 text-primary transition-transform group-hover/li:scale-110"
                  aria-hidden
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Link
            data-slot="button"
            href={href}
            className={BUTTON_PRIMARY}
          >
            <span className="relative z-1 flex items-center gap-2 cursor-pointer">
              {minutes === 20
                ? `Book My ${minutes}-Min Fix`
                : minutes === 40
                  ? `Book My ${minutes}-Min Deep Dive`
                  : `Book My ${minutes}-Min Session`}
              {featured ? <Star className="h-4 w-4" aria-hidden /> : null}
            </span>
          </Link>
          <p className="mt-3 text-[10px] text-neutral-500">
            Instant confirmation. Secure payment. Cancel anytime, no awkward
            questions.
          </p>
        </div>
      </div>
      {featured ? (
        <div
          className="pointer-events-none absolute top-5 -right-5 z-10 rotate-45 rounded px-3 py-1 text-xs font-semibold text-white shadow-sm"
          style={{ background: "linear-gradient(90deg,#DA1F26,#f4a300)" }}
          aria-hidden="true"
        >
          Most booked
        </div>
      ) : null}
    </div>
  );
}

export function PricingSection() {
  return (
    <section className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="font-secondary text-3xl font-bold tracking-tight text-balance text-primary md:text-5xl">
          Book Your Ultra-Personalized Call
        </h2>
        <p className="mt-3 text-sm text-pretty text-neutral-600 md:text-base">
          Honest advice. No fluff. Get exactly what you need.
        </p>
      </header>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {PLANS.map((plan) => (
          <PlanCard key={plan.minutes} plan={plan} />
        ))}
      </div>
      <div className="mt-8">
        <p className="mb-3 text-center text-sm font-medium text-neutral-600">
          Planning your full journey? Save with our mentor bundle.
        </p>
        {/* NOTE: the reference renders a bundle-offer countdown below this
            line, fed by /api/site-settings/bundle-offer-countdown. That API
            was lost with the original site and the scraped DOM shows nothing
            here (the component renders null without an active offer). */}
      </div>
    </section>
  );
}
