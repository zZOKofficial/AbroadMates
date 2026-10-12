import Link from "next/link";

import { Button } from "@/components/ui/button";

// Rebuilt from the original site's global not-found route (app/_not-found).
// The reference rendered the exact same markup for every 404.
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <main
          aria-labelledby="not-found-heading"
          className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-6 py-20 sm:px-12 sm:py-24"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(circle at 50% 30%, #ffffff 0%, #fff7f7 48%, #ffecec 100%)",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
            <div
              className="relative mx-auto h-40 overflow-hidden sm:h-52"
              aria-hidden="true"
            >
              <span className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[48%] -translate-y-[46%] rotate-[-3deg] font-secondary text-[9rem] leading-none font-bold text-[var(--color-secondary)] sm:text-[13rem]">
                404
              </span>
              <p className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-[52%] -translate-y-[54%] font-secondary text-[9rem] leading-none font-bold text-[var(--color-primary)] sm:text-[13rem]">
                404
              </p>
            </div>
            <p className="font-secondary mt-2 text-xl font-semibold text-[var(--color-primary)] sm:text-2xl">
              Well, this is awkward.
            </p>
            <h1
              id="not-found-heading"
              className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-black)] sm:text-5xl"
            >
              This page went abroad.
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-neutral-600 sm:text-lg">
              The link may be broken or the page may have moved. Let&apos;s get
              you somewhere useful.
            </p>
            <div className="relative z-10 mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                variant="default"
                size="cta"
                className="w-full sm:w-auto"
              >
                <Link href="/">Back to home</Link>
              </Button>
              <Button
                asChild
                variant="accent"
                size="cta"
                className="w-full sm:w-auto"
              >
                <Link href="/mentors">Find a mentor</Link>
              </Button>
            </div>
            <p className="relative z-10 mt-6 text-sm text-neutral-500">
              Still lost?{" "}
              <a
                className="font-medium text-[var(--color-primary)] underline underline-offset-4"
                href="/contact"
              >
                Contact us
              </a>
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
