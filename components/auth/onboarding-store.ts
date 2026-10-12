import * as React from "react";

// Rebuilt from the original site's onboarding wizard state (chunks 755/6231):
// - module 2359: zustand store `{ data, updateField, updateFields, resetForm }` (vendored
//   zustand, created WITHOUT the persist middleware - state lived in memory only)
// - module 31201: `nextStep` / `isWizardComplete` / `resumeHref` / `stepHref`
// - module 47271: hearAboutUs options + `isHearAboutUsSet`
// - module 81317: `syncDerivedFields` (degree -> mentorMatchDegreeLevel, program -> category)
// - modules 10503/16771/65664: option lists shared with the wizard steps
//
// NOTE: backend endpoint was lost with the original site - wire to your API. The wizard
// answers were POSTed to /api/session/register as `studentProfile`.

export type OnboardingData = {
  desiredDegree?: string;
  desiredProgram?: string;
  mentorMatchRegions?: string[];
  targetCountries?: string[];
  studyBudget?: number;
  mentorMatchBudgetBand?: string;
  needToWork?: boolean;
  interestToStudyAfterward?: boolean;
  ieltsTaken?: boolean;
  ieltsScore?: string;
  applicationPreference?: string;
  mentorMatchHelpAreas?: string[];
  timeZone?: string;
  mentorMatchDegreeLevel?: string;
  mentorMatchFieldCategory?: string;
  hearAboutUs?: string;
  hearAboutUsOther?: string;
  [key: string]: unknown;
};

export const FLEXIBLE_OPTION = "I'm flexible!";

// Module 10503 `Uu` - wizard step configs (steps 3, 6, 11 embed this list).
export const STEP_CONFIGS = [
  {
    question: "Where do you want to study?",
    subtitle: "Select all regions you're interested in",
    options: ["Europe", "North America", "Asia", "Oceania", FLEXIBLE_OPTION],
    multiple: true,
  },
  {
    question: "What level are you aiming for?",
    subtitle: "Choose your target degree level",
    options: ["Bachelor's", "Master's", "PhD", "Diploma"],
  },
  {
    question: "What field interests you most?",
    subtitle: "Select your primary area of study",
    options: [
      "Engineering & Tech",
      "Business & Management",
      "Natural Sciences",
      "Arts & Humanities",
      "Social Sciences",
      "Medicine & Health",
    ],
  },
  {
    question: "What's your budget situation?",
    subtitle: "This helps us match you with relevant scholarship mentors",
    options: ["Need full scholarship", "Need partial funding", "Self-funded", "Flexible / Not sure"],
  },
  {
    question: "What do you need help with?",
    subtitle: "Select all that apply",
    options: [
      "Essay Review",
      "Test Prep",
      "Roadmap",
      "University Application",
      "Scholarships",
      "Life Abroad",
      "Visa Application",
      "Abroad Career",
      "ECA Guidance",
      "Mock Interviews",
      "Personal Statement",
      "Resume Review",
      "Recommendation Letters",
    ],
    multiple: true,
  },
];

// Module 45258 `d` - help areas (also the 13 mentor topics).
export const HELP_AREAS = STEP_CONFIGS[4].options;

// Module 16771 `VO` - program fields (sorted, then "Other / Not listed").
export const PROGRAM_FIELDS: string[] = [
  ...[
    "Business, Management & Economics",
    "Computer Science, IT & Data",
    "Engineering & Technology",
    "Health, Medicine & Life Sciences",
    "Natural Sciences & Mathematics",
    "Social Sciences & International Relations",
    "Arts, Design, Media & Architecture",
    "Law, Policy & Governance",
    "Education, Teaching & Training",
    "Environmental Science & Sustainability",
    "Hospitality, Tourism & Sports",
    "Agriculture, Food & Forestry",
    "Humanities, Languages & Culture",
    "Creative Industries & Communication",
    "Interdisciplinary / Not Sure Yet",
  ].sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" })),
  "Other / Not listed",
];

const PROGRAM_FIELD_SET = new Set(PROGRAM_FIELDS);

// Module 16771 `N0` - split a stored " | " / comma joined program string back into fields.
export function splitProgramFields(value: string | null | undefined): string[] {
  const raw = (value ?? "").trim();
  if (!raw) return [];
  if (raw.includes(" | ")) return raw.split(" | ").map((v) => v.trim()).filter(Boolean);
  if (raw.includes(",")) {
    const parts = raw.split(",").map((v) => v.trim()).filter(Boolean);
    const out: string[] = [];
    let i = 0;
    while (i < parts.length) {
      let matched = 0;
      const window = Math.min(parts.length - i, 12);
      for (let size = window; size >= 1; size--) {
        const candidate = parts.slice(i, i + size).join(", ");
        if (PROGRAM_FIELD_SET.has(candidate)) {
          out.push(candidate);
          matched = size;
          break;
        }
      }
      if (matched) i += matched;
      else {
        out.push(parts[i]);
        i += 1;
      }
    }
    return out;
  }
  return [raw];
}

// Module 65664 - hearAboutUs option keys + labels.
export const HEAR_ABOUT_US_OPTIONS = [
  "facebook_reel",
  "instagram_reel",
  "youtube_shorts",
  "youtube_video",
  "facebook_group",
  "friend",
  "abroadmates_mentor",
  "other",
] as const;

export const HEAR_ABOUT_US_LABELS: Record<string, string> = {
  facebook_reel: "Facebook Reel",
  instagram_reel: "Instagram Reel",
  youtube_shorts: "YouTube Shorts",
  youtube_video: "YouTube video",
  facebook_group: "Facebook group",
  friend: "Friend",
  abroadmates_mentor: "AbroadMates mentor",
  other: "Other",
};

// Module 47271 `KK`.
export function isHearAboutUsSet(hearAboutUs?: string, hearAboutUsOther?: string) {
  return (
    !!hearAboutUs &&
    (HEAR_ABOUT_US_OPTIONS as readonly string[]).includes(hearAboutUs) &&
    (hearAboutUs !== "other" || !!hearAboutUsOther?.trim())
  );
}

// Module 47271 `mg`.
export const MAX_STEP = 13;

// Module 31201 `BF`.
export function stepHref(step: number) {
  const clamped = Math.max(0, Math.min(MAX_STEP, Math.floor(step)));
  return `/register/form?step=${clamped}`;
}

function hasText(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function hasItems(value: unknown): value is unknown[] {
  return Array.isArray(value) && value.length > 0;
}

// Module 31201 `od` - first incomplete step for a given data snapshot.
export function nextIncompleteStep(data: OnboardingData): number {
  if (!hasText(data.desiredDegree)) return 1;
  if (!hasText(data.desiredProgram)) return 2;
  if (!hasItems(data.mentorMatchRegions)) return 3;
  if (!hasItems(data.targetCountries)) return 4;
  if (typeof data.studyBudget !== "number" || data.studyBudget < 1000) return 5;
  if (!hasText(data.mentorMatchBudgetBand)) return 6;
  if (typeof data.needToWork !== "boolean") return 7;
  if (typeof data.interestToStudyAfterward !== "boolean") return 8;
  if (!(typeof data.ieltsTaken === "boolean" && (data.ieltsTaken !== true || hasText(data.ieltsScore))))
    return 9;
  if (data.applicationPreference !== "self" && data.applicationPreference !== "need_help") return 10;
  if (!hasItems(data.mentorMatchHelpAreas)) return 11;
  if (!hasText(data.timeZone)) return 12;
  if (!isHearAboutUsSet(data.hearAboutUs, data.hearAboutUsOther)) return 13;
  return MAX_STEP;
}

// Module 31201 `W$`.
export function isWizardComplete(data: OnboardingData) {
  return (
    nextIncompleteStep(data) === MAX_STEP &&
    isHearAboutUsSet(data.hearAboutUs, data.hearAboutUsOther) &&
    hasText(data.timeZone) &&
    hasText(data.mentorMatchDegreeLevel) &&
    hasText(data.mentorMatchFieldCategory)
  );
}

// Module 31201 `Xk` - where to resume the wizard.
export function resumeHref(data: OnboardingData) {
  const step = nextIncompleteStep(data);
  if (!(data.desiredDegree || data.desiredProgram || data.hearAboutUs) && step <= 1) return stepHref(0);
  return stepHref(step);
}

// Module 81317 `s` - derived mentor-match fields.
const DEGREE_LEVEL_OPTIONS = new Set(STEP_CONFIGS[1].options);

const PROGRAM_CATEGORY_MAP: Record<string, string> = {
  "Business, Management & Economics": "Business & Management",
  "Computer Science, IT & Data": "Engineering & Tech",
  "Engineering & Technology": "Engineering & Tech",
  "Health, Medicine & Life Sciences": "Medicine & Health",
  "Natural Sciences & Mathematics": "Natural Sciences",
  "Social Sciences & International Relations": "Social Sciences",
  "Arts, Design, Media & Architecture": "Arts & Humanities",
  "Law, Policy & Governance": "Social Sciences",
  "Education, Teaching & Training": "Social Sciences",
  "Environmental Science & Sustainability": "Natural Sciences",
  "Hospitality, Tourism & Sports": "Business & Management",
  "Agriculture, Food & Forestry": "Natural Sciences",
  "Humanities, Languages & Culture": "Arts & Humanities",
  "Creative Industries & Communication": "Arts & Humanities",
  "Interdisciplinary / Not Sure Yet": "Social Sciences",
  "Other / Not listed": "Social Sciences",
  "Agriculture & Forestry": "Natural Sciences",
  "Applied Sciences & Professions": "Natural Sciences",
  "Arts, Design & Architecture": "Arts & Humanities",
  "Business Management": "Business & Management",
  "Environmental & Earth Science": "Natural Sciences",
  "Education & Training": "Social Sciences",
  Humanities: "Arts & Humanities",
  "Computer Science & IT": "Engineering & Tech",
  Law: "Social Sciences",
};

function fieldCategoryFor(program: string | undefined): string | null {
  if (!program || typeof program !== "string") return null;
  const fields = splitProgramFields(program);
  if (fields.length === 0) return null;
  for (const field of fields) {
    const category = PROGRAM_CATEGORY_MAP[field];
    if (category) return category;
  }
  return "Social Sciences";
}

// Module 2359 - the store itself (same in-memory semantics as the original vendored zustand).
type Listener = (data: OnboardingData) => void;

let storeData: OnboardingData = {};
const listeners = new Set<Listener>();

export function getOnboardingData(): OnboardingData {
  return storeData;
}

export function updateOnboardingField<K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) {
  storeData = { ...storeData, [key]: value };
  listeners.forEach((listener) => listener(storeData));
}

export function updateOnboardingFields(patch: Partial<OnboardingData>) {
  storeData = { ...storeData, ...patch };
  listeners.forEach((listener) => listener(storeData));
}

export function resetOnboardingForm() {
  storeData = {};
  listeners.forEach((listener) => listener(storeData));
}

export function subscribeOnboarding(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// React binding for the store (the original used its vendored zustand `useStore`).
export function useOnboardingStore() {
  const data = React.useSyncExternalStore(subscribeOnboarding, getOnboardingData, getOnboardingData);
  return {
    data,
    updateField: updateOnboardingField,
    updateFields: updateOnboardingFields,
    resetForm: resetOnboardingForm,
  };
}

// Module 81317 `s` wired to the store.
export function syncDerivedFields() {
  const data = getOnboardingData();
  const degree = data.desiredDegree;
  if (typeof degree === "string" && degree.trim() && DEGREE_LEVEL_OPTIONS.has(degree) && data.mentorMatchDegreeLevel !== degree) {
    updateOnboardingField("mentorMatchDegreeLevel", degree);
  }
  const category = fieldCategoryFor(data.desiredProgram);
  if (category && data.mentorMatchFieldCategory !== category) {
    updateOnboardingField("mentorMatchFieldCategory", category);
  }
}
