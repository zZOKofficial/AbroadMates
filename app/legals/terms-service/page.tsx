"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// Reference page module exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

/**
 * Reconstructed from the original `app/legals/terms-service/page.tsx` client
 * chunk (module 92672). The shared legal primitives mirror module 77565 from
 * the same chunk; the header/footer come from the root layout.
 */

const FONT_BRAND = "font-[var(--font-brand)]";
const FONT_SECONDARY = "font-secondary";
const LINK_CLASS = "font-normal text-[var(--color-secondary)] underline-offset-2 hover:underline";

function LegalP({ children }: { children: ReactNode }) {
  return <p className={`${FONT_BRAND} text-[17px] leading-8 text-gray-700`}>{children}</p>;
}

function LegalSmallP({ children }: { children: ReactNode }) {
  return <p className={`${FONT_BRAND} text-[15px] leading-7 text-gray-700`}>{children}</p>;
}

function LegalList({ children }: { children: ReactNode }) {
  return (
    <ul className={`${FONT_BRAND} list-none space-y-3 text-[15px] leading-7 text-gray-700`}>{children}</ul>
  );
}

function LegalCard({
  title,
  legalNote,
  children,
  titleVariant = "display",
}: {
  title: string;
  legalNote?: string;
  children: ReactNode;
  titleVariant?: "display" | "body";
}) {
  return (
    <article className="rounded-xl border border-gray-200/80 bg-gradient-to-b from-gray-50/70 to-white p-4 shadow-sm ring-1 ring-black/[0.04] sm:p-5">
      <p
        className={
          titleVariant === "body"
            ? `${FONT_BRAND} text-lg font-bold tracking-tight text-[var(--color-primary)] sm:text-xl`
            : `${FONT_SECONDARY} text-lg font-semibold tracking-tight text-[var(--color-primary)] sm:text-xl`
        }
      >
        {title}
      </p>
      {legalNote ? (
        <p className={`${FONT_BRAND} mt-2 text-xs font-medium leading-snug tracking-wide text-gray-500 italic`}>
          {legalNote}
        </p>
      ) : null}
      <div className="mt-4">{children}</div>
    </article>
  );
}

function AccordionItem({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="mb-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={onToggle}
        className={`${FONT_SECONDARY} flex w-full items-center justify-between px-5 py-4 text-left text-lg font-semibold tracking-tight text-gray-900 transition-colors hover:bg-gray-50 hover:text-[var(--color-primary)]`}
      >
        <span>{title}</span>
        <span className={`${FONT_BRAND} text-2xl font-light tabular-nums text-[var(--color-secondary)]`}>
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-t border-gray-100 px-5 pb-6 pt-5">{children}</div>
        </div>
      </div>
    </div>
  );
}

const ITEMS: { title: string; content: ReactNode }[] = [
  {
    title: "Welcome to AbroadMates!",
    content: (
      <LegalP>
        These <strong className="font-semibold text-gray-900">Terms of Service</strong> (&quot;Terms&quot;) govern
        your access to and use of the AbroadMates website, mobile application, and services (collectively, the{" "}
        <strong className="font-semibold text-gray-900">Services</strong>). By accessing or using our Services, you
        agree to these Terms.{" "}
        <strong className="font-semibold text-gray-900">
          If you do not agree, please do not use the Services.
        </strong>
      </LegalP>
    ),
  },
  {
    title: "1. Eligibility",
    content: (
      <LegalList>
        <li>
          You must be <strong className="font-semibold text-gray-900">at least 18 years old</strong> to use our
          Services.
        </li>
        <li>
          By using the Services, you confirm you have the{" "}
          <strong className="font-semibold text-gray-900">legal authority</strong> to agree to these Terms.
        </li>
      </LegalList>
    ),
  },
  {
    title: "2. Account responsibilities",
    content: (
      <LegalList>
        <li>
          You need an account to access <strong className="font-semibold text-gray-900">certain features</strong>.
        </li>
        <li>
          Keep your login credentials{" "}
          <strong className="font-semibold text-gray-900">secure and confidential</strong>.
        </li>
        <li>You are responsible for all activity under your account.</li>
      </LegalList>
    ),
  },
  {
    title: "3. Acceptable use",
    content: (
      <div className="space-y-5">
        <div>
          <LegalSmallP>
            <strong className="font-semibold text-gray-900">You agree to:</strong>
          </LegalSmallP>
          <LegalList>
            <li>Use the Services only for lawful purposes.</li>
            <li>Provide accurate, complete, and up-to-date information.</li>
          </LegalList>
        </div>
        <div>
          <LegalSmallP>
            <strong className="font-semibold text-gray-900">You agree not to:</strong>
          </LegalSmallP>
          <LegalList>
            <li>Post or share harmful, abusive, or illegal content.</li>
            <li>Impersonate others or misrepresent your identity.</li>
            <li>Attempt to disrupt the functionality of the Services.</li>
            <li>Reverse engineer or attempt unauthorized access to our systems.</li>
          </LegalList>
        </div>
      </div>
    ),
  },
  {
    title: "4. Payment and fees",
    content: (
      <LegalList>
        <li>
          Some Services require payment. You agree to pay{" "}
          <strong className="font-semibold text-gray-900">all applicable fees</strong>.
        </li>
        <li>Payments are processed by third-party providers—please ensure your details are accurate.</li>
        <li>
          Fees are <strong className="font-semibold text-gray-900">non-refundable</strong> unless we say otherwise
          in writing.
        </li>
      </LegalList>
    ),
  },
  {
    title: "4A. Mentor payouts",
    content: (
      <LegalList>
        <li>
          Mentors are paid from completed, student-paid sessions. The amount due is{" "}
          <strong className="font-semibold text-gray-900">mentor net after the platform fee</strong>, pooled across
          all unpaid sessions (not one student at a time).
        </li>
        <li>
          The platform default payout threshold is{" "}
          <strong className="font-semibold text-gray-900">$50 USD net</strong>. If none is saved, we fill $50.
          Mentors may set <strong className="font-semibold text-gray-900">$40 or more</strong>.
        </li>
        <li>
          For <strong className="font-semibold text-gray-900">1:1 mentor sessions</strong> and{" "}
          <strong className="font-semibold text-gray-900">Complete Application Mentorship</strong> package
          sessions, mentors who joined before 1 March 2026 keep an{" "}
          <strong className="font-semibold text-gray-900">80/20</strong> split (mentor / platform). Mentors joining
          on or after 1 March 2026 have a <strong className="font-semibold text-gray-900">70/30</strong> split.
          Application Mentorship pays out per completed package session at that same rate — not as one lump sum at
          purchase.
        </li>
        <li>
          For <strong className="font-semibold text-gray-900">group sessions</strong> (
          <strong className="font-semibold text-gray-900">50/50</strong>, mentor / platform), mentor net is
          calculated after the event ends, regardless of join date.
        </li>
        <li>
          The applicable split is saved on each payout batch and is not rewritten after a batch is marked paid.
        </li>
        <li>
          When pooled net reaches the mentor’s threshold, AbroadMates emails the mentor and the ops team. We send
          the transfer to the saved bank, Wise, PayPal, Payoneer, or bKash details{" "}
          <strong className="font-semibold text-gray-900">within the next week</strong>. An admin then marks the
          batch paid in the dashboard.
        </li>
      </LegalList>
    ),
  },
  {
    title: "5. Content ownership and licensing",
    content: (
      <div className="space-y-4">
        <LegalCard title="5.1 Your content">
          <LegalList>
            <li>You keep ownership of content you upload.</li>
            <li>
              You grant us a worldwide, non-exclusive license to use, display, and distribute your content as
              needed to operate the Services.
            </li>
          </LegalList>
        </LegalCard>
        <LegalCard title="5.2 Our content">
          <LegalList>
            <li>
              Intellectual property in the Services belongs to{" "}
              <strong className="font-semibold text-gray-900">AbroadMates</strong> or its licensors.
            </li>
          </LegalList>
        </LegalCard>
      </div>
    ),
  },
  {
    title: "6. Termination",
    content: (
      <LegalList>
        <li>We may suspend or terminate your account for violations of these Terms.</li>
        <li>We may modify or discontinue the Services at any time.</li>
        <li>
          You may close your account anytime by contacting{" "}
          <a href="mailto:abroadmates.official@gmail.com" className={LINK_CLASS}>
            abroadmates.official@gmail.com
          </a>
          .
        </li>
      </LegalList>
    ),
  },
  {
    title: "7. Disclaimer of warranties",
    content: (
      <LegalList>
        <li>
          The Services are provided <strong className="font-semibold text-gray-900">&quot;as is&quot;</strong>{" "}
          without warranties of any kind.
        </li>
        <li>We do not guarantee uninterrupted or error-free operation.</li>
        <li>Use of the Services is at your own risk.</li>
      </LegalList>
    ),
  },
  {
    title: "8. Limitation of liability",
    content: (
      <LegalList>
        <li>We are not liable for indirect, incidental, or consequential damages.</li>
        <li>
          Our total liability for direct damages will not exceed the fees you paid in the{" "}
          <strong className="font-semibold text-gray-900">last 12 months</strong>.
        </li>
      </LegalList>
    ),
  },
  {
    title: "9. Indemnification",
    content: (
      <LegalP>
        You agree to indemnify and hold us harmless from claims, damages, or expenses arising from your use of the
        Services or <strong className="font-semibold text-gray-900">violation of these Terms</strong>.
      </LegalP>
    ),
  },
  {
    title: "10. Changes to these Terms",
    content: (
      <LegalP>
        We may update these Terms from time to time. Changes take effect when posted.{" "}
        <strong className="font-semibold text-gray-900">Continued use of the Services means you accept</strong> the
        updated Terms.
      </LegalP>
    ),
  },
  {
    title: "11. Contact information",
    content: (
      <LegalList>
        <li>
          <strong className="font-bold text-gray-900">Email:</strong>{" "}
          <a href="mailto:abroadmates.official@gmail.com" className={LINK_CLASS}>
            abroadmates.official@gmail.com
          </a>
        </li>
        <li>
          <strong className="font-bold text-gray-900">Address:</strong> 〒350-1101, 2114-3, Matoba, Kawagoe-shi,
          Saitama, Greater Tokyo Area, Japan
        </li>
      </LegalList>
    ),
  },
];

export default function TermsServicePage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto mt-10 max-w-3xl px-4 py-12 font-[var(--font-brand)]">
          <header className="mb-12 text-center">
            <h1 className="font-secondary text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Terms of Service
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-gray-600">
              Please read these Terms carefully—they explain{" "}
              <strong className="font-semibold text-gray-800">how you may use AbroadMates</strong> and what we
              expect from you.
            </p>
          </header>
          {ITEMS.map((item, index) => (
            <AccordionItem
              key={item.title}
              title={item.title}
              open={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {item.content}
            </AccordionItem>
          ))}
          <p className="font-[var(--font-brand)] mt-10 text-center text-sm leading-relaxed text-gray-500">
            By using AbroadMates, you acknowledge that you have{" "}
            <strong className="font-semibold text-gray-600">read and agree</strong> to these Terms of Service.
          </p>
        </div>
      </div>
    </div>
  );
}
