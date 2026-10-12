/**
 * Scholarship program pages (route: /scholarships/[slug]).
 * mentorSlugs: mentors whose profile data mentions the program.
 * Note: mentor lists on the live site were fetched from an API that no
 * longer exists; this mapping was re-derived from the scraped pages.
 */

export type Scholarship = {
  slug: string;
  name: string;
  description: string;
  mentorSlugs: string[];
};

export const SCHOLARSHIPS: Scholarship[] = [
  {
    slug: "australia-awards",
    name: "Australia Awards",
    description: "Connect with mentors who received or applied for Australia Awards and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "chevening-scholarship",
    name: "Chevening Scholarship",
    description: "Connect with mentors who received or applied for Chevening Scholarship and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "commonwealth-scholarships",
    name: "Commonwealth Scholarships",
    description: "Connect with mentors who received or applied for Commonwealth Scholarships and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "daad-scholarships",
    name: "DAAD Scholarships",
    description: "Connect with mentors who received or applied for DAAD Scholarships and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "erasmus-mundus-joint-masters",
    name: "Erasmus Mundus Joint Masters",
    description: "Connect with mentors who received or applied for Erasmus Mundus Joint Masters and get honest, first-hand guidance for your application journey.",
    mentorSlugs: ["md-ahnaf-farhan", "mohsina-siddika"],
  },
  {
    slug: "fulbright-foreign-student-program",
    name: "Fulbright Scholarship",
    description: "Connect with mentors who received or applied for Fulbright Scholarship and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "global-korea-scholarship",
    name: "Global Korea Scholarship",
    description: "Connect with mentors who received or applied for Global Korea Scholarship and get honest, first-hand guidance for your application journey.",
    mentorSlugs: ["selim-sarowar"],
  },
  {
    slug: "marie-sklodowska-curie-actions",
    name: "Marie Skłodowska-Curie Actions (MSCA)",
    description: "Connect with mentors who received or applied for Marie Skłodowska-Curie Actions (MSCA) and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "mext-scholarship",
    name: "MEXT Scholarship",
    description: "Connect with mentors who received or applied for MEXT Scholarship and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "stipendium-hungaricum",
    name: "Stipendium Hungaricum",
    description: "Connect with mentors who received or applied for Stipendium Hungaricum and get honest, first-hand guidance for your application journey.",
    mentorSlugs: ["aasheer-ishaque-taswar", "ashfia-salsabil", "md-sakib-khan"],
  },
  {
    slug: "swedish-institute-scholarship-for-global-professionals",
    name: "Swedish Institute Scholarship (SI)",
    description: "Connect with mentors who received or applied for Swedish Institute Scholarship (SI) and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
  {
    slug: "turkiye-scholarships",
    name: "Türkiye Scholarships",
    description: "Connect with mentors who received or applied for Türkiye Scholarships and get honest, first-hand guidance for your application journey.",
    mentorSlugs: [],
  },
];

export function getScholarship(slug: string): Scholarship | undefined {
  return SCHOLARSHIPS.find((s) => s.slug === slug);
}
