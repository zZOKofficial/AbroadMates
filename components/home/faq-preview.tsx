"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    question: "What is AbroadMates?",
    answer:
      "AbroadMates is a 1-on-1 study abroad mentorship platform where current international students assist aspiring students in fulfilling their dream of studying abroad through video call consultations.",
  },
  {
    question: "How does AbroadMates work?",
    answer:
      "We connect aspiring students with current international students. Mentors provide guidance, advice, and support through scheduled video call consultations.",
  },
  {
    question: "Who are the mentors?",
    answer:
      "Our mentors are current international students from diverse countries and academic backgrounds, with firsthand experience studying abroad.",
  },
  {
    question: "Is there a cost?",
    answer:
      "Yes. Each consultation session has a fee, which varies based on the mentor and session length.",
  },
];

export function FaqPreview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="rounded-3xl border border-neutral-200 bg-white/90 p-6 shadow-lg backdrop-blur-sm">
        <h2 className="font-secondary text-4xl font-bold tracking-tight text-balance text-text-primary md:text-5xl text-center">
          Frequently Asked{" "}
          <span className="text-[var(--color-primary)]">Questions</span>
        </h2>

        <div className="mt-8 divide-y divide-neutral-200">
          {FAQS.map((faq, index) => {
            const isOpen = index === openIndex;
            return (
              <div key={faq.question} className="py-4">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between text-left font-medium text-neutral-900 hover:text-[var(--color-primary)]"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={
                      "h-5 w-5 transition-transform ".concat(
                        isOpen
                          ? "rotate-180 text-[var(--color-primary)]"
                          : "text-neutral-500",
                      )
                    }
                  />
                </button>
                {isOpen ? (
                  <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/faq"
            className="inline-block rounded-lg bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white shadow-[var(--shadow-button)] hover:bg-[#b71b21]"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
