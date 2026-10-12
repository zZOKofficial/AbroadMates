/**
 * Mentorship topic catalogs extracted from the original shared chunk:
 * TOPIC_DESCRIPTIONS - shown on the "How I Can Help" cards.
 * TOPIC_ICONS - icon keys used alongside topics.
 */

export const TOPIC_DESCRIPTIONS: Record<string, string> = {
  "Essay Review": "Feedback on essays and written applications.",
  "Test Prep": "Plan and practice for IELTS, TOEFL, GRE, and more.",
  "Roadmap": "A clear step-by-step study-abroad plan.",
  "University Application": "Applications, deadlines, and strategy.",
  "Scholarships": "Find and strengthen scholarship applications.",
  "Life Abroad": "Living, studying, and settling abroad.",
  "Visa Application": "Visa steps, documents, and timelines.",
  "Abroad Career": "Career paths and job-search tips abroad.",
  "ECA Guidance": "Strengthen extracurriculars for your profile.",
  "Mock Interviews": "Practice interviews with targeted feedback.",
  "Personal Statement": "Craft a compelling personal statement.",
  "Resume Review": "Polish your CV or resume for applications.",
  "Recommendation Letters": "Guidance on asking for and using LORs.",
};

export const TOPIC_ICONS: Record<string, string> = {
  "Essay Review": "mdi:file-document-edit-outline",
  "Test Prep": "mdi:book-open-page-variant-outline",
  "Roadmap": "mdi:map-marker-path",
  "University Application": "mdi:school-outline",
  "Scholarships": "mdi:cash-multiple",
  "Life Abroad": "mdi:earth",
  "Visa Application": "mdi:passport",
  "Abroad Career": "mdi:briefcase-outline",
  "ECA Guidance": "mdi:account-group-outline",
  "Mock Interviews": "mdi:microphone-outline",
  "Personal Statement": "mdi:text-box-outline",
  "Resume Review": "mdi:file-account-outline",
  "Recommendation Letters": "mdi:email-outline",
};

export function topicDescription(topic: string): string | null {
  return TOPIC_DESCRIPTIONS[topic] ?? null;
}
