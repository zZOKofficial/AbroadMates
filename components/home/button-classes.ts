/**
 * shadcn-style Button class strings exactly as rendered by the reference
 * homepage (entities decoded from the scraped DOM). The reference pages
 * pass `data-slot="button"`; that attribute is kept on the elements for
 * fidelity.
 */

export const BUTTON_BASE = `inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive`;

/** Yellow "secondary" variant — used by "Start NOW" / "Become an AbroadMate". */
export const BUTTON_ACCENT = `${BUTTON_BASE} border border-black bg-[var(--color-secondary)] text-black shadow-sm hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md h-auto rounded-xl px-8 py-3 text-base font-semibold has-[>svg]:px-8`;

/** Primary variant — used by the 20/40-minute pricing card CTAs. */
export const BUTTON_PRIMARY = `${BUTTON_BASE} shadow-[var(--shadow-button)] h-9 has-[>svg]:px-3 relative overflow-hidden rounded-xl px-5 py-2.5 text-[15px] font-semibold bg-primary text-white shadow-(--shadow-button) hover:bg-[#b71b21]`;
