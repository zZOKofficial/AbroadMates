import Link from "next/link";

/**
 * "AbroadMates by Help" services grid (reference module 61180).
 *
 * On the original site this section was populated client-side from
 * /api/services (lost with the backend); the SSR markup shows only the
 * empty grid. The six services are recovered from the scraped
 * /services/<slug> pages, and the card markup below is copied verbatim
 * from the reference page chunk.
 *
 * NOTE: the original card illustrations (`img`) were served by the lost
 * API. The closest original-named illustrations captured in public/svgs
 * are used as stand-ins (see mapping below) — replace if better
 * originals surface.
 */

type Service = { title: string; href: string; img: string };

const SERVICES: Service[] = [
  {
    title: "Application Strategy",
    href: "/services/application-strategy",
    img: "/svgs/roadmap.svg",
  },
  {
    title: "University Shortlisting",
    href: "/services/university-shortlisting",
    img: "/svgs/personal-statement.svg",
  },
  {
    title: "Essays and SOP Feedback",
    href: "/services/essays-and-sop-feedback",
    img: "/svgs/essay-review.svg",
  },
  {
    title: "Scholarship Guidance",
    href: "/services/scholarship-guidance",
    img: "/svgs/recommendation-letters.svg",
  },
  {
    title: "Visa and Arrival Preparation",
    href: "/services/visa-and-arrival-preparation",
    img: "/svgs/eca-guidance.svg",
  },
  {
    title: "Life Abroad Questions",
    href: "/services/life-abroad-questions",
    img: "/svgs/life-abroad.svg",
  },
];

export function HelpSection() {
  return (
    <section className="bg-[var(--color-white)] px-4 py-12 sm:px-12 sm:py-16 lg:px-16">
      <h2 className="font-secondary text-center text-3xl font-bold text-[var(--color-black)] md:text-5xl">
        AbroadMates by Help
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600 sm:text-lg">
        Your perfect study buddy, for every step of the journey.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-8 lg:grid-cols-3">
        {SERVICES.map((service) => (
          <Link
            key={service.title}
            href={service.href}
            className="relative flex h-28 flex-col overflow-hidden rounded-md border-2 border-[var(--color-black)] bg-[var(--color-primary)] px-3 pt-4 text-white transition-transform hover:-translate-y-2 hover:rotate-1 hover:shadow-lg sm:h-56 sm:px-5 sm:pt-10"
          >
            <div className="relative z-10 pr-12 text-left sm:pr-28">
              <h2 className="text-base leading-tight font-bold sm:text-3xl">
                {service.title}
              </h2>
            </div>
            <div className="pointer-events-none absolute right-[-15px] bottom-[-25px] w-24 sm:right-0 sm:bottom-[-50px] sm:w-auto">
              <img
                src={service.img}
                alt={service.title}
                width={240}
                height={240}
                className="object-contain select-none"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
