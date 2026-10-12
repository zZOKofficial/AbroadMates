import { StarHalfIcon, StarSolidIcon } from "@/components/home/icons";

/**
 * Social-proof stats band (reference: section with the blur orbs).
 */
export function StatsSection() {
  return (
    <section className="relative z-20 bg-[var(--color-white)] px-4 py-14 sm:px-6 lg:px-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-16 -left-16 h-48 w-48 rounded-full bg-[var(--color-primary)]/10 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[var(--color-accent)]/10 blur-3xl" />
      </div>
      <div className="relative mx-auto grid max-w-4xl grid-cols-1 gap-10 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-2 rounded-2xl border-4 border-rose-100/40 bg-white/60 p-8 shadow-lg backdrop-blur">
          <div className="flex gap-1 text-3xl text-[var(--color-accent)]">
            <StarSolidIcon />
            <StarSolidIcon />
            <StarSolidIcon />
            <StarSolidIcon />
            <StarHalfIcon />
          </div>
          <h1 className="text-xl font-bold text-gray-900">
            {"4.8★ Average Session Rating"}
          </h1>
          <p className="text-center text-sm text-gray-600">
            Students love us for clear answers, real support, and results that
            matter.
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 rounded-2xl border-4 border-rose-100/40 bg-white/80 p-8 shadow-lg backdrop-blur">
          <h1 className="bg-[var(--color-primary)] bg-clip-text text-6xl font-bold text-transparent">
            93%
          </h1>
          <h2 className="text-center text-lg font-bold text-gray-900">
            come back for round two.
          </h2>
          <p className="text-center text-sm text-gray-600">
            Mentorship that builds lasting relationships.
          </p>
        </div>
      </div>
    </section>
  );
}
