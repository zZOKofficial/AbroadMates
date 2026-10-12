"use client";

import type { ReactNode } from "react";

// Reference page module exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

/**
 * Reconstructed from the original `app/legals/commerce-disclosure/page.tsx`
 * client chunk (module 78542). The shared legal primitives mirror module 77565
 * from the same chunk; the header/footer come from the root layout.
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

export default function CommerceDisclosurePage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className={`mx-auto mt-10 max-w-3xl px-4 py-12 ${FONT_BRAND}`}>
          <header className="mb-12 text-center">
            <h1 className={`${FONT_SECONDARY} text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl`}>
              Commerce disclosure
            </h1>
            <p className={`${FONT_SECONDARY} mt-3 text-lg text-[var(--color-primary)] sm:text-xl`}>
              特定商取引法に基づく表記
            </p>
            <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-gray-600">
              Required information under{" "}
              <strong className="font-semibold text-gray-800">Japan&apos;s specified commercial transactions law</strong>
              —who we are, what we sell, and how billing works.
            </p>
          </header>

          <div className="space-y-4">
            <LegalCard title="Operator & contact">
              <div className="space-y-3">
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Platform name:</strong> Abroadmates.com
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Website:</strong>{" "}
                  <a href="https://www.abroadmates.com/" target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
                    www.abroadmates.com
                  </a>
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Legal entity:</strong> Mayesha Maliha Proma
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Representative:</strong> Md Yasin Rahat —{" "}
                  <a href="mailto:rahat@abroadmates.com" className={LINK_CLASS}>
                    rahat@abroadmates.com
                  </a>
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Business address:</strong> 〒350-1101, 2202-10, Matoba,
                  Kawagoe-shi, Saitama, Japan
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Phone:</strong> +81 07022159352 (10:00–18:00 JST)
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Email:</strong>{" "}
                  <a href="mailto:team@abroadmates.com" className={LINK_CLASS}>
                    team@abroadmates.com
                  </a>
                </LegalSmallP>
              </div>
            </LegalCard>

            <LegalCard title="What we offer">
              <LegalP>
                <strong className="font-semibold text-gray-900">AbroadMates</strong> is a peer-to-peer study abroad
                mentorship platform. We connect aspiring international students with current students abroad. Our
                services include:
              </LegalP>
              <LegalList>
                <li>One-to-one video consultations with mentors</li>
                <li>Guidance on applications, scholarships, and visas</li>
                <li>Personalized strategies supported by AI tools</li>
              </LegalList>
              <LegalSmallP>
                Consultations are booked through our platform. Sessions typically last{" "}
                <strong className="font-semibold text-gray-900">20 to 40 minutes</strong>.
              </LegalSmallP>
            </LegalCard>

            <LegalCard title="Pricing and payments">
              <div className="space-y-3">
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Prices (tax included):</strong> Session fees vary by
                  mentor and duration, as shown on each mentor&apos;s page at booking. Displayed prices include
                  applicable taxes. <strong className="font-semibold text-gray-900">No extra service tax</strong> at
                  checkout.
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Additional fees:</strong> None—the price you see is the
                  final price (no shipping; online service only).
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Payment methods:</strong> Credit and debit cards (Visa,
                  Mastercard, American Express, and others) processed securely via{" "}
                  <strong className="font-semibold text-gray-900">Stripe</strong>.
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">When you are charged:</strong> Payment is taken at
                  booking; sessions are confirmed after successful payment.
                </LegalSmallP>
              </div>
            </LegalCard>

            <LegalCard title="Delivery of service">
              <LegalSmallP>
                Sessions are held <strong className="font-semibold text-gray-900">online by video call</strong> at the
                date and time you schedule.{" "}
                <strong className="font-semibold text-gray-900">No physical goods are shipped.</strong>
              </LegalSmallP>
            </LegalCard>

            <LegalCard title="Cancellation & refunds">
              <div className="space-y-3">
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Your cancellations:</strong> Cancel or reschedule from
                  your account. Cancellations at least <strong className="font-semibold text-gray-900">24 hours</strong>{" "}
                  before the session receive a{" "}
                  <strong className="font-semibold text-gray-900">full refund</strong> to the original payment method.
                  Late cancellations (within 24 hours) may not qualify for a refund.
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">No-show or issues on our side:</strong> If a mentor does
                  not attend, or the session cannot run due to technical problems or other issues attributable to us,
                  you are entitled to a <strong className="font-semibold text-gray-900">full refund</strong> or a free
                  reschedule.
                </LegalSmallP>
                <LegalSmallP>
                  <strong className="font-bold text-gray-900">Dissatisfaction:</strong> If you completed a session but
                  are unhappy with the service, contact support within{" "}
                  <strong className="font-semibold text-gray-900">7 days</strong>. We review refund requests case by
                  case and aim for a fair outcome.
                </LegalSmallP>
              </div>
            </LegalCard>

            <LegalCard title="Consumer protection note">
              <LegalSmallP>
                This disclosure follows Japan&apos;s consumer protection rules. The statutory{" "}
                <strong className="font-semibold text-gray-900">&quot;cooling-off&quot; period</strong> does not apply
                to online services such as digital mentorship sessions.
              </LegalSmallP>
            </LegalCard>

            <LegalCard title="Privacy and security">
              <LegalSmallP>
                We treat your personal details and session content as{" "}
                <strong className="font-semibold text-gray-900">confidential</strong> and protect them with appropriate
                security measures. We do <strong className="font-semibold text-gray-900">not</strong> record video
                consultations.
              </LegalSmallP>
            </LegalCard>

            <LegalCard title="Contact us">
              <LegalSmallP>
                Questions, technical issues, or support—reach us at{" "}
                <a href="mailto:team@abroadmates.com" className={LINK_CLASS}>
                  team@abroadmates.com
                </a>{" "}
                or{" "}
                <a href="mailto:rahat@abroadmates.com" className={LINK_CLASS}>
                  rahat@abroadmates.com
                </a>
                .
              </LegalSmallP>
            </LegalCard>
          </div>
        </div>
      </div>
    </div>
  );
}
