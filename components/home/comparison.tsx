import {
  Building2,
  MailQuestion,
  MessagesSquare,
  Youtube,
} from "lucide-react";

/**
 * "Stop Taking Random Advice" comparison section (reference:
 * `aria-labelledby="how-different-heading"`).
 */

type ComparisonCard = {
  title: string;
  icon: React.ReactNode;
  problem: string;
  abroadmates: string;
};

const CARDS: ComparisonCard[] = [
  {
    title: "Forums & Reddit",
    icon: <MessagesSquare className="h-5 w-5" />,
    problem: "Slow replies, conflicting opinions, no accountability",
    abroadmates: "Book verified students and get a clear plan in one call",
  },
  {
    title: "Cold DMs",
    icon: <MailQuestion className="h-5 w-5" />,
    problem: "Low response rates, awkward asks, scattered advice",
    abroadmates:
      "One‑click booking with prepared mentors who want to help",
  },
  {
    title: "Agencies",
    icon: <Building2 className="h-5 w-5" />,
    problem: "Biased towards partner schools, expensive packages",
    abroadmates:
      "Student‑first, unbiased guidance with transparent pricing",
  },
  {
    title: "YouTube/Blogs",
    icon: <Youtube className="h-5 w-5" />,
    problem: "Generic content, not tailored to you",
    abroadmates: "Advice for your exact profile, country, and goals",
  },
];

function DotGrid() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute top-3 right-3 grid grid-cols-3 gap-1 opacity-30"
    >
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-neutral-300"
        />
      ))}
    </div>
  );
}

export function ComparisonSection() {
  return (
    <section
      aria-labelledby="how-different-heading"
      className="relative w-full overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2
          id="how-different-heading"
          className="font-secondary text-center text-3xl font-extrabold tracking-tight text-[var(--color-black)] md:text-5xl"
        >
          Stop Taking Random Advice
        </h2>
        <p className="mt-3 text-center text-sm text-pretty text-neutral-600 md:text-base">
          Why we&apos;re not the rests.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {CARDS.map((card) => (
            <article
              key={card.title}
              className="group relative rounded-2xl border border-neutral-200/70 bg-white/70 p-5"
            >
              <span className="absolute inset-x-0 top-0 h-2 rounded-t-2xl bg-[var(--color-primary)] opacity-100" />
              <header className="mb-4 flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-neutral-100 text-neutral-700 ring-1 ring-neutral-200 transition group-hover:scale-105">
                  {card.icon}
                </span>
                <h3 className="text-lg font-bold tracking-wider text-neutral-500 uppercase">
                  {card.title}
                </h3>
              </header>
              <div className="grid gap-4 rounded-xl bg-white/60 p-4 ring-1 ring-neutral-100 md:grid-cols-2">
                <div className="rounded-lg p-3">
                  <p className="text-xs font-semibold tracking-wide text-neutral-700 uppercase">
                    Problem
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                    {card.problem}
                  </p>
                </div>
                <div className="my-1 block h-px bg-gradient-to-r from-transparent via-neutral-200 to-transparent md:hidden" />
                <div className="rounded-lg p-3 md:border-l md:border-dashed md:border-neutral-200">
                  <p className="text-xs font-semibold tracking-wide text-[var(--color-primary)] uppercase">
                    AbroadMates
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-neutral-800">
                    {card.abroadmates}
                  </p>
                </div>
              </div>
              <DotGrid />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
