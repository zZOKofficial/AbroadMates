"use client";

import { useState } from "react";
import type { ReactNode } from "react";

// Reference page module exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

/**
 * Reconstructed from the original `app/legals/privacy-policy/page.tsx` client
 * chunk (module 22426). The shared legal primitives mirror module 77565 from
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
    title: "Introduction",
    content: (
      <div className="space-y-5">
        <LegalP>
          <strong className="font-semibold text-gray-900">AbroadMates is committed</strong> to protecting the
          privacy and security of your personal information. This{" "}
          <strong className="font-semibold text-gray-900">Privacy Policy</strong> explains how AbroadMates Ltd.
          (&quot;AbroadMates,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, shares, and
          protects your personal information when you use our website, mobile application, and services
          (collectively, the <strong className="font-semibold text-gray-900">Services</strong>). It also outlines{" "}
          <strong className="font-semibold text-gray-900">your rights</strong> regarding your personal
          information—and how you can exercise them.
        </LegalP>
        <LegalP>
          We follow the principles of data protection and privacy laws that apply to our work, including the{" "}
          <strong className="font-semibold text-gray-900">General Data Protection Regulation (GDPR)</strong>, the{" "}
          <strong className="font-semibold text-gray-900">California Consumer Privacy Act (CCPA)</strong>, and
          Japan&apos;s{" "}
          <strong className="font-semibold text-gray-900">
            Act on the Protection of Personal Information (APPI)
          </strong>
          . <strong className="font-semibold text-gray-900">Your privacy matters to us.</strong> We are committed
          to protecting your personal information with care.
        </LegalP>
        <LegalP>
          This policy describes{" "}
          <strong className="font-semibold text-gray-900">how we handle your data</strong> when you use our
          services. By accessing or using our Services, you confirm that you have read and understood this Privacy
          Policy.{" "}
          <strong className="font-semibold text-gray-900">
            If you do not agree with our practices, please do not use our Services.
          </strong>
        </LegalP>
      </div>
    ),
  },
  {
    title: "Information We Collect",
    content: (
      <div className="space-y-6">
        <LegalP>
          <strong className="font-semibold text-gray-900">We collect only what we need</strong> to provide and
          improve our Services. The categories below depend on how you interact with us—which features you use, and
          whether you are a student, mentor, or visitor. This may include:
        </LegalP>
        <div className="space-y-4">
          <LegalCard title="Personal details (identifiers)">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Contact information:</strong> name, email address,
                phone number, postal address.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Account information:</strong> username, password,
                profile picture, and other registration details.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Demographic information:</strong> date of birth,
                gender, nationality (optional).
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Financial information (commercial)">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Payment information:</strong> credit card details,
                bank account information, and other payment methods—processed securely by trusted processors such
                as <strong className="font-semibold text-gray-900">Stripe</strong>.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Transaction data:</strong> mentorship sessions booked,
                payments made, and services purchased.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Technical data (network & device activity)">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Device information:</strong> IP address, operating
                system, browser type and version, device identifiers.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Usage data:</strong> how you use our Services—pages
                visited, features used, time on the platform, referral URLs.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Log data:</strong> server logs that may include your
                IP address, browser type, and visit timestamps.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Professional & educational information">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Mentor information:</strong> qualifications,
                experience, expertise, and professional background.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Student information:</strong> educational background,
                study-abroad interests, and academic goals.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Communications">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Correspondence:</strong> emails, chat messages, and
                support conversations with us.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Feedback:</strong> what you share in surveys or when
                you tell us how we&apos;re doing.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Sensitive personal information (CCPA / CPRA)">
            <LegalSmallP>
              <strong className="font-semibold text-gray-900">We do not intentionally collect</strong> sensitive
              personal information such as health data, genetic data, or biometric data. If such information is
              ever collected by mistake, we will handle it with the utmost care and in line with applicable law.
            </LegalSmallP>
          </LegalCard>
        </div>
      </div>
    ),
  },
  {
    title: "How We Use Your Information",
    content: (
      <div className="space-y-6">
        <LegalP>
          <strong className="font-semibold text-gray-900">We use your information for clear purposes</strong>,
          each tied to legal bases under GDPR, CCPA, and APPI. Below is a plain-language summary:
        </LegalP>
        <div className="space-y-4">
          <LegalCard
            title="Provide and improve our Services"
            legalNote="Legal basis: performance of a contract · legitimate interests"
          >
            <LegalList>
              <li>
                <strong className="font-semibold text-gray-900">Accounts & sessions:</strong> create and manage
                your account; connect students and mentors; process payments.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Support & experience:</strong> answer your
                questions, personalize the platform, and refine our features.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard
            title="Stay in touch with you"
            legalNote="Legal basis: contract · legitimate interests · consent (where required)"
          >
            <LegalList>
              <li>
                Service-related <strong className="font-semibold text-gray-900">notifications</strong>, updates,
                and administrative messages.
              </li>
              <li>
                Information about our Services, offers, or news—{" "}
                <strong className="font-semibold text-gray-900">only where you have agreed</strong> or where the
                law allows.
              </li>
              <li>
                <strong className="font-semibold text-gray-900">Surveys and feedback</strong> to learn what works
                for you.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard
            title="Security & fraud prevention"
            legalNote="Legal basis: legal obligation · legitimate interests"
          >
            <LegalList>
              <li>Detect, prevent, and investigate fraud or unauthorized access.</li>
              <li>
                Keep our platform <strong className="font-semibold text-gray-900">safe and reliable</strong> for
                everyone.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Legal & compliance" legalNote="Legal basis: legal obligation">
            <LegalList>
              <li>Meet laws, regulations, legal process, and lawful government requests.</li>
              <li>Enforce our Terms of Service and other agreements.</li>
              <li>
                Protect <strong className="font-semibold text-gray-900">rights, safety, and property</strong>
                —ours, yours, and those of our partners and users.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard
            title="Analytics & research"
            legalNote="Legal basis: legitimate interests · consent (where required)"
          >
            <LegalList>
              <li>Understand how our Services are used so we can improve them.</li>
              <li>
                Run research and analysis to make the experience{" "}
                <strong className="font-semibold text-gray-900">clearer and more helpful</strong>.
              </li>
            </LegalList>
          </LegalCard>
        </div>
      </div>
    ),
  },
  {
    title: "Sharing Your Information",
    content: (
      <div className="space-y-6">
        <LegalP>
          <strong className="font-semibold text-gray-900">We share information thoughtfully</strong>
          —only with the kinds of recipients below, and only for the purposes described in this policy:
        </LegalP>
        <div className="space-y-4">
          <LegalCard title="Mentors & students">
            <LegalSmallP>
              To run mentorship sessions, we share what&apos;s needed—such as{" "}
              <strong className="font-semibold text-gray-900">names, profiles, and session details</strong>
              —between students and mentors.
            </LegalSmallP>
          </LegalCard>
          <LegalCard title="Service providers">
            <LegalSmallP>
              Trusted partners help us with{" "}
              <strong className="font-semibold text-gray-900">
                payments, hosting, analytics, support, and marketing
              </strong>
              . They may access personal information only to perform their work for us and must protect it.
            </LegalSmallP>
          </LegalCard>
          <LegalCard title="Legal & regulatory authorities">
            <LegalSmallP>
              We may disclose information when{" "}
              <strong className="font-semibold text-gray-900">the law requires it</strong>
              —for example, in response to a valid court order or agency request.
            </LegalSmallP>
          </LegalCard>
          <LegalCard title="Business transfers">
            <LegalSmallP>
              If we are involved in a merger, financing, acquisition, or sale of assets, your information may{" "}
              <strong className="font-semibold text-gray-900">transfer as part of that transaction</strong>,
              subject to the same commitments to privacy.
            </LegalSmallP>
          </LegalCard>
          <LegalCard title="When you say yes">
            <LegalSmallP>
              We may share with other third parties when you have given us{" "}
              <strong className="font-semibold text-gray-900">clear, explicit consent</strong>.
            </LegalSmallP>
          </LegalCard>
        </div>
        <div className="font-[var(--font-brand)] rounded-xl border border-[var(--color-secondary)]/40 bg-[var(--color-secondary-light)]/60 px-5 py-4 text-[15px] leading-7 text-gray-800 shadow-sm">
          <span className="font-secondary block text-lg font-semibold text-[var(--color-primary)]">
            Your data is not for sale.
          </span>
          <span className="mt-2 block">
            We <strong className="font-bold text-gray-900">do not sell</strong> your personal information or share
            it for monetary or other valuable consideration, and we{" "}
            <strong className="font-bold text-gray-900">do not</strong> share it for cross-context behavioral
            advertising.
          </span>
        </div>
      </div>
    ),
  },
  {
    title: "Your Rights",
    content: (
      <div className="space-y-6">
        <LegalP>
          <strong className="font-semibold text-gray-900">Where you live shapes your rights.</strong> Depending on
          applicable law, you may be able to:
        </LegalP>
        <div className="space-y-4">
          <LegalCard title="Everyone">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Access:</strong> ask what personal information we hold
                about you.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Correction:</strong> ask us to fix inaccurate or
                incomplete information.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Deletion:</strong> ask us to delete your information
                in certain situations.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="EEA & UK (GDPR)">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Right to data portability</strong> — receive your data
                in a structured, commonly used format.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to restriction of processing</strong> — ask us
                to limit how we use your data in certain cases.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to object</strong> — object to processing based
                on legitimate interests or for direct marketing.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to withdraw consent</strong> — where we rely on
                consent, you may withdraw it at any time.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to lodge a complaint</strong> — with a
                supervisory authority in your country.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="California (CCPA / CPRA)">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Right to know</strong> — what personal information we
                collect, use, disclose, and share.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to opt out of sale / sharing</strong> — where
                applicable under California law.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to limit</strong> use and disclosure of
                sensitive personal information.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Right to non-discrimination</strong> — we will not
                deny services or change prices solely because you exercised your rights.
              </li>
            </LegalList>
          </LegalCard>
          <LegalCard title="Japan (APPI)">
            <LegalList>
              <li>
                <strong className="font-bold text-gray-900">Disclosure:</strong> request disclosure of your
                personal information.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Correction, addition, or deletion:</strong> request
                changes when information is inaccurate or incomplete.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Cessation of use or deletion:</strong> request that we
                stop using or delete your information under applicable conditions.
              </li>
              <li>
                <strong className="font-bold text-gray-900">Cessation of provision to third parties:</strong>{" "}
                request that we stop providing your information to third parties.
              </li>
            </LegalList>
          </LegalCard>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="mx-auto mt-10 max-w-3xl px-4 py-12 font-[var(--font-brand)]">
          <header className="mb-12 text-center">
            <h1 className="font-secondary text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Privacy Policy
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-gray-600">
              A straightforward guide to{" "}
              <strong className="font-semibold text-gray-800">how we respect your data</strong>
              —what we collect, why we use it, and the choices you have.
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
            By using our Services, you acknowledge that you have{" "}
            <strong className="font-semibold text-gray-600">read, understood, and agreed</strong> to this Privacy
            Policy.
          </p>
        </div>
      </div>
    </div>
  );
}
