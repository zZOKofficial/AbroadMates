import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact AbroadMates",
  description:
    "Get in touch with AbroadMates for student support, partnerships, or press inquiries.",
};

const DIRECT_CHANNELS = [
  {
    name: "WhatsApp",
    href: "https://wa.me/817022159352",
    // mdi:whatsapp
    path: "M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.4-4.19-1.15l-.3-.17-3.12.82.83-3.04-.2-.32a8.188 8.188 0 0 1-1.26-4.38c.01-4.54 3.7-8.24 8.25-8.24m-3.16 4.5c-.15 0-.4.06-.61.29-.21.23-.8.79-.8 1.92s.82 2.22.93 2.38c.12.15 1.57 2.51 3.89 3.43 1.93.77 2.33.62 2.75.58.42-.03 1.36-.55 1.55-1.09.19-.54.19-1 .13-1.1-.05-.09-.19-.15-.41-.25-.22-.11-1.36-.67-1.56-.75-.21-.07-.36-.11-.51.12-.16.23-.61.75-.74.9-.14.15-.28.17-.53.06-.24-.12-1.02-.38-1.95-1.21-.72-.64-1.21-1.45-1.35-1.69-.14-.24-.02-.37.11-.49.11-.11.24-.28.36-.43.12-.14.16-.24.24-.4.08-.15.04-.29-.02-.41-.06-.11-.51-1.25-.72-1.71-.18-.44-.36-.38-.51-.39l-.43-.01z",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/abroad.mates",
    // streamline-flex:facebook-1 (rendered with the standard Facebook mark)
    path: "M12 2.04c-5.5 0-10 4.5-10 10 0 4.99 3.66 9.13 8.44 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.1 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.45 2.89h-2.33v6.99C18.34 21.17 22 17.03 22 12c0-5.5-4.5-10-10-10z",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/abroad.mates/",
    // mdi:instagram
    path: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
  },
  {
    name: "Email",
    href: "mailto:team@abroadmates.com",
    // mdi:email-outline
    path: "M20 8l-8 5-8-5V6l8 5 8-5m0-2H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2z",
  },
];

const CONTACT_FAQS = [
  {
    q: "How do I book a mentor session?",
    a: "You can book a mentor directly through their profile page on AbroadMates.",
  },
  {
    q: "How do I apply to become a mentor?",
    a: "Visit our Mentor Onboarding page and fill out the application form.",
  },
  {
    q: "Do you offer scholarships?",
    a: "Yes, explore our ScholarshipArc section for available opportunities.",
  },
];

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <main
          className="relative"
          style={{
            background:
              "radial-gradient(1000px 520px at 50% -8%, #ffe6e8 0%, transparent 55%), linear-gradient(180deg, #fff6f6 0%, #fffaf9 38%, #fff8f6 62%, #fff6f6 82%, #fff7e8 100%)",
          }}
        >
          <section
            aria-label="Contact hero"
            className="relative overflow-hidden px-6 pt-20 pb-6 sm:px-12 sm:pt-28 lg:px-16"
          >
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-secondary text-5xl leading-[1.1] font-bold text-primary sm:text-6xl md:text-7xl">
                Contact Us
              </h1>
              <p className="mt-5 font-brand text-base leading-relaxed text-gray sm:text-lg">
                A real human replies within 24–48 hours.
              </p>
            </div>
          </section>

          <ContactForm />

          <section
            id="direct-support"
            className="scroll-mt-24 bg-transparent px-6 py-12 sm:px-12 lg:px-16"
          >
            <div className="mx-auto max-w-xl text-center">
              <p className="font-brand text-sm text-gray">Or reach us directly</p>
              <nav
                aria-label="Direct contact channels"
                className="mt-5 flex items-center justify-center gap-5 sm:gap-6"
              >
                {DIRECT_CHANNELS.map((channel) => (
                  <a
                    key={channel.name}
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={channel.name}
                    title={channel.name}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full text-text-primary transition hover:bg-white hover:text-primary"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d={channel.path} />
                    </svg>
                  </a>
                ))}
              </nav>
            </div>
          </section>

          <section className="bg-transparent px-6 py-16 sm:px-12 lg:px-16">
            <div className="mx-auto max-w-2xl">
              <h2 className="font-secondary text-center text-3xl font-bold text-primary sm:text-4xl">
                FAQ
              </h2>
              <div className="mt-10">
                {CONTACT_FAQS.map((item) => (
                  <details key={item.q} className="group border-b border-primary/15 py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-brand text-base font-semibold text-text-primary [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-chevron-down h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-open:rotate-180"
                        aria-hidden="true"
                      >
                        <path d="m6 9 6 6 6-6"></path>
                      </svg>
                    </summary>
                    <p className="mt-3 pr-8 text-[15px] leading-relaxed text-gray">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 font-semibold text-primary underline-offset-4 hover:underline"
                >
                  View all FAQs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right h-4 w-4"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
              <div className="mt-16 text-center">
                <p className="font-brand text-xs font-semibold tracking-wide text-primary uppercase">
                  Our Offices
                </p>
                <ul className="mt-4 space-y-2 font-brand text-sm text-text-primary sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-6 sm:gap-y-2 sm:space-y-0">
                  <li>Toronto, Canada</li>
                  <li>Tokyo, Japan</li>
                  <li>Dhaka, Bangladesh</li>
                </ul>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
