/** FAQ entries extracted from the original site's FAQ page chunk. */

export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export const FAQS: FaqItem[] = [
  {
    question: "What is AbroadMates?",
    answer: "AbroadMates is a 1-on-1 study abroad mentorship platform where current international students assist aspiring students through video call consultations.",
    category: "Getting Started",
  },
  {
    question: "How does AbroadMates work?",
    answer: "We connect aspiring students with current international students. You browse mentors, pick one, and book a video consultation.",
    category: "Getting Started",
  },
  {
    question: "How do I sign up for AbroadMates?",
    answer: "Create an account on our website. After registration, you can explore mentor profiles and book sessions.",
    category: "Getting Started",
  },
  {
    question: "Who are the mentors on AbroadMates?",
    answer: "Mentors are current international students from diverse countries and academic backgrounds with real, recent experience.",
    category: "Mentors",
  },
  {
    question: "How do I choose the right mentor for me?",
    answer: "Review profiles, read reviews, and check availability. Profiles include background, expertise, and lived experiences.",
    category: "Mentors",
  },
  {
    question: "What topics can I discuss with my mentor?",
    answer: "Applications, scholarships, visas, school shortlists, cultural adaptation, housing, and anything related to studying abroad.",
    category: "Mentors",
  },
  {
    question: "How long is each consultation session?",
    answer: "You choose what fits: our common sessions are 20 or 40 minutes. Some mentors may offer custom durations.",
    category: "Sessions & Pricing",
  },
  {
    question: "Is there a cost associated with using AbroadMates?",
    answer: "Yes. Each session has a fee that varies by mentor and duration. Prices are shown on the mentor profile when booking.",
    category: "Sessions & Pricing",
  },
  {
    question: "Can I book multiple sessions with the same mentor?",
    answer: "Absolutely. Many students book follow-ups to track progress throughout their application journey.",
    category: "Sessions & Pricing",
  },
  {
    question: "How do I pay for a consultation session?",
    answer: "Pay securely at checkout using cards or available local methods (e.g., Bkash, Nagad where supported).",
    category: "Sessions & Pricing",
  },
  {
    question: "Can I reschedule or cancel a booked session?",
    answer: "Yes—manage sessions from your dashboard. Cancellations must be ≥24 hours in advance to avoid fees.",
    category: "Sessions & Pricing",
  },
  {
    question: "How is my personal information protected?",
    answer: "We use encryption and robust security practices. Your data is processed and stored securely.",
    category: "Privacy & Support",
  },
  {
    question: "Will my consultation sessions be recorded?",
    answer: "No. We do not record sessions. Conversations remain confidential between you and your mentor.",
    category: "Privacy & Support",
  },
  {
    question: "What if I encounter technical issues during a session?",
    answer: "Contact support via site chat or email support@abroadmates.com and we’ll help you troubleshoot quickly.",
    category: "Privacy & Support",
  },
  {
    question: "Are refunds available?",
    answer: "We aim for great experiences. If you’re unhappy, reach out to support to discuss your situation and refund options.",
    category: "Privacy & Support",
  },
  {
    question: "How can I contact AbroadMates?",
    answer: "Use the contact form or email info@abroadmates.com—we're happy to help with anything you need.",
    category: "Privacy & Support",
  },
];

export const FAQ_CATEGORIES = [
  "Getting Started",
  "Mentors",
  "Privacy & Support",
  "Sessions & Pricing",
] as const;
