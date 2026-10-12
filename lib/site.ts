/** Site-wide constants recovered from the scraped pages. */

export const SITE = {
  name: "Abroadmates",
  url: "https://www.abroadmates.com",
  description: "An AI powered Super app for study abroad",
  email: "team@abroadmates.com",
  whatsapp: "https://wa.me/817022159352",
  address: {
    city: "Dhaka",
    country: "Bangladesh",
  },
  socials: {
    facebook: "https://www.facebook.com/abroad.mates",
    instagram: "https://www.instagram.com/abroad.mates/",
    linkedin: "https://www.linkedin.com/company/abroadmates",
  },
} as const;

export const NAV_LINKS = [
  { href: "/mentors", label: "Find a Mentor" },
  { href: "/sessions", label: "Group Sessions" },
  { href: "/our-story", label: "About Us" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_LINKS = {
  company: [
    { href: "/our-story", label: "Our Story" },
    { href: "/mentors", label: "Find a Mentor" },
    { href: "/sessions", label: "Group Sessions" },
    { href: "/become-an-abroadmate", label: "Become a Mentor" },
    { href: "/chat-with-founders", label: "Chat With Founders" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/legals/terms-service", label: "Terms and Conditions" },
    { href: "/legals/privacy-policy", label: "Privacy Policy" },
    { href: "/legals/commerce-disclosure", label: "Commerce Disclosure" },
    { href: "/legals/bengali", label: "Legals (Bengali)" },
  ],
} as const;
