/**
 * Study-in country pages (route: /study-in/[countrySlug]).
 * The mentor grid is filtered client-side by mentor.country.
 */

export type StudyCountry = {
  slug: string;
  name: string;
  description: string;
};

export const STUDY_COUNTRIES: StudyCountry[] = [
  {
    slug: "australia",
    name: "Australia",
    description: "Connect with mentors who studied in Australia and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "austria",
    name: "Austria",
    description: "Connect with mentors who studied in Austria and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "bangladesh",
    name: "Bangladesh",
    description: "Connect with mentors who studied in Bangladesh and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "belgium",
    name: "Belgium",
    description: "Connect with mentors who studied in Belgium and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "canada",
    name: "Canada",
    description: "Connect with mentors who studied in Canada and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "china",
    name: "China",
    description: "Connect with mentors who studied in China and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "czech-republic",
    name: "Czech Republic",
    description: "Connect with mentors who studied in Czech Republic and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "denmark",
    name: "Denmark",
    description: "Connect with mentors who studied in Denmark and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "estonia",
    name: "Estonia",
    description: "Connect with mentors who studied in Estonia and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "finland",
    name: "Finland",
    description: "Connect with mentors who studied in Finland and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "france",
    name: "France",
    description: "Connect with mentors who studied in France and get honest, first-hand guidance for your application journey.",
  },
  {
    slug: "germany",
    name: "Germany",
    description: "Connect with mentors who studied in Germany and get honest, first-hand guidance for your application journey.",
  },
];

export function getStudyCountry(slug: string): StudyCountry | undefined {
  return STUDY_COUNTRIES.find((c) => c.slug === slug);
}
