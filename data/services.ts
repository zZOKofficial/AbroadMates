/**
 * Service pages (route: /services/[service]).
 *
 * The six slugs below are the ones that answered 200 on the live site - they
 * are also the names of the illustrations the original bundle referenced
 * (`/svgs/<slug>.svg`, see module 92796 on the become-an-abroadmate page).
 * The six "What You'll Help Students With" cards link to different slugs
 * (`/services/university-shortlisting` and friends); those all answered 404
 * when the site was still up, so they are deliberately NOT listed here and
 * fall through to `notFound()`.
 *
 * `subheading` / `emptyStateMessage` are the `pageSubheading` /
 * `emptyStateMessage` flight props the original `app/(public)/services/[service]`
 * page handed to the shared mentor list (module 22066), matching the wording
 * pattern used by the sibling scholarship / study-in pages.
 */

export type Service = {
  /** Route segment: /services/<slug> */
  slug: string;
  /** Display name - also the `lockedService` prop and the mentor topic it filters on. */
  title: string;
  /** Illustration shipped with the original site. */
  svg: string;
  /** `pageSubheading` prop for the mentor list. */
  subheading: string;
  /** `emptyStateMessage` prop for the mentor list. */
  emptyStateMessage: string;
};

export const SERVICES: Service[] = [
  {
    slug: "essay-review",
    title: "Essay Review",
    svg: "/svgs/essay-review.svg",
    subheading:
      "Book a session with mentors who specialize in essay review and move your study abroad plans forward.",
    emptyStateMessage:
      "We don't have mentors offering Essay Review listed yet. Browse all mentors to find other ways we can help.",
  },
  {
    slug: "roadmap",
    title: "Roadmap",
    svg: "/svgs/roadmap.svg",
    subheading:
      "Book a session with mentors who specialize in roadmap and move your study abroad plans forward.",
    emptyStateMessage:
      "We don't have mentors offering Roadmap listed yet. Browse all mentors to find other ways we can help.",
  },
  {
    slug: "personal-statement",
    title: "Personal Statement",
    svg: "/svgs/personal-statement.svg",
    subheading:
      "Book a session with mentors who specialize in personal statement and move your study abroad plans forward.",
    emptyStateMessage:
      "We don't have mentors offering Personal Statement listed yet. Browse all mentors to find other ways we can help.",
  },
  {
    slug: "recommendation-letters",
    title: "Recommendation Letters",
    svg: "/svgs/recommendation-letters.svg",
    subheading:
      "Book a session with mentors who specialize in recommendation letters and move your study abroad plans forward.",
    emptyStateMessage:
      "We don't have mentors offering Recommendation Letters listed yet. Browse all mentors to find other ways we can help.",
  },
  {
    slug: "eca-guidance",
    title: "ECA Guidance",
    svg: "/svgs/eca-guidance.svg",
    subheading:
      "Book a session with mentors who specialize in eca guidance and move your study abroad plans forward.",
    emptyStateMessage:
      "We don't have mentors offering ECA Guidance listed yet. Browse all mentors to find other ways we can help.",
  },
  {
    slug: "life-abroad",
    title: "Life Abroad",
    svg: "/svgs/life-abroad.svg",
    subheading:
      "Book a session with mentors who specialize in life abroad and move your study abroad plans forward.",
    emptyStateMessage:
      "We don't have mentors offering Life Abroad listed yet. Browse all mentors to find other ways we can help.",
  },
];

/** Look up a service by its `/services/<slug>` segment. */
export function getService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
