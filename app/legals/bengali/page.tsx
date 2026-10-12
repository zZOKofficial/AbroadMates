"use client";

import Link from "next/link";
import type { ReactNode } from "react";

// Reference page module exports `dynamic = "force-dynamic"`.
export const dynamic = "force-dynamic";

/**
 * Reconstructed from the original `app/legals/bengali/page.tsx` client chunk
 * (module 11507). The shared legal primitives mirror module 77565 from the
 * same chunk; the header/footer come from the root layout.
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

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <p className={`${FONT_BRAND} font-bold text-gray-900`}>{title}</p>
      <div className={`${FONT_BRAND} space-y-2 text-[15px] leading-7 text-gray-700`}>{children}</div>
    </div>
  );
}

export default function BengaliPage() {
  return (
    <div className="flex min-h-dvh flex-col overflow-x-hidden">
      <div className="flex min-h-0 flex-1 flex-col">
        <div lang="bn" dir="ltr" className={`mx-auto mt-10 max-w-3xl px-4 py-12 ${FONT_BRAND}`}>
          <header className="mb-12 text-center">
            <h1 className={`${FONT_SECONDARY} text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl`}>
              Legals (Bengali)
            </h1>
            <p className={`${FONT_BRAND} mt-3 text-lg font-semibold text-[var(--color-primary)] sm:text-xl`}>
              বাণিজ্যিক তথ্য, শর্তাবলি ও গোপনীয়তা নীতি
            </p>
          </header>

          <LegalP>
            এই পৃষ্ঠায় অ্যাব্রডমেটস-এর বাণিজ্যিক তথ্য প্রকাশ, শর্তাবলি এবং গোপনীয়তা নীতি একত্রে উপস্থাপিত হলো।
            অ্যাব্রডমেটস-এর ওয়েবসাইট, অনলাইন মেন্টরশিপ সেবা, বুকিং ব্যবস্থা এবং অর্থপ্রদান-সংক্রান্ত কার্যক্রমের
            ক্ষেত্রে এই নীতিসমূহ প্রযোজ্য হবে।
          </LegalP>

          <div className="mt-10 space-y-4">
            <LegalCard title="১. বাণিজ্যিক তথ্য প্রকাশ" titleVariant="body">
              <div className="space-y-6">
                <LegalP>
                  অ্যাব্রডমেটস একটি অনলাইন মেন্টরশিপ ও পরামর্শভিত্তিক সেবা, যার মাধ্যমে বিদেশে অধ্যয়ন,
                  বিশ্ববিদ্যালয়ে আবেদন, বৃত্তি, ভিসা এবং সংশ্লিষ্ট প্রস্তুতি বিষয়ে শিক্ষার্থীরা অভিজ্ঞ মেন্টরদের কাছ
                  থেকে নির্ধারিত সময়ে পরামর্শ গ্রহণ করতে পারেন।
                </LegalP>

                <Section title="প্রতিষ্ঠানের তথ্য">
                  <div className="space-y-3">
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">প্রতিষ্ঠানের নাম:</strong> অ্যাব্রডমেটস
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">আইনগত নাম:</strong> অ্যাব্রডমেটস স্টাডি অ্যাব্রড
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">ব্যবসার ধরন:</strong> তথ্য প্রযুক্তি সেবা
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">স্বত্বাধিকারী:</strong> মায়িশা মালিহা প্রমা
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">ট্রেড লাইসেন্স নম্বর:</strong> ০০২৬৫১
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">লাইসেন্স আইডি:</strong> ০১-২০৮-০০২৬৫১
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">লাইসেন্স প্রদানকারী কর্তৃপক্ষ:</strong> শ্রীপুর পৌরসভা
                      কার্যালয়
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">লাইসেন্স ইস্যুর তারিখ:</strong> ১১/০৮/২০২৫
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">নবায়নের অর্থবছর:</strong> ২০২৫-২০২৬
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">নবায়নের তারিখ:</strong> ১১/০৮/২০২৫
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">নিবন্ধিত ঠিকানা:</strong> হোল্ডিং নং ৮৪, শ্রীপুর
                      বাজার, শ্রীপুর, গাজীপুর
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">ফোন নম্বর:</strong> ০১৯৭৮১৩১৭৭৬
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">ই-মেইল:</strong>{" "}
                      <a href="mailto:team@abroadmates.com" className={LINK_CLASS}>
                        team@abroadmates.com
                      </a>
                    </LegalSmallP>
                    <LegalSmallP>
                      <strong className="font-bold text-gray-900">ওয়েবসাইট:</strong>{" "}
                      <a
                        href="https://www.abroadmates.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_CLASS}
                      >
                        https://www.abroadmates.com
                      </a>
                    </LegalSmallP>
                  </div>
                </Section>

                <Section title="সেবার প্রকৃতি">
                  <div className="space-y-3">
                    <LegalSmallP>
                      অ্যাব্রডমেটস-এর সেবার মধ্যে অন্তর্ভুক্ত থাকতে পারে ব্যক্তিগত ভিডিও-পরামর্শ, বিদেশে
                      পড়াশোনা-সংক্রান্ত দিকনির্দেশনা, বিশ্ববিদ্যালয়ে আবেদন সহায়তা, বৃত্তি ও ভিসা-সংক্রান্ত পরামর্শ,
                      নথিপত্র প্রস্তুতি এবং প্রয়োজনভিত্তিক পরিকল্পনা সহায়তা।
                    </LegalSmallP>
                    <LegalSmallP>
                      এই সেবা সম্পূর্ণ অনলাইনভিত্তিক। কোনো ভৌত পণ্য বিক্রয়, সরবরাহ বা প্রেরণ করা হয় না।
                    </LegalSmallP>
                  </div>
                </Section>

                <Section title="মূল্য ও অর্থপ্রদান">
                  <div className="space-y-3">
                    <LegalSmallP>
                      প্রতি সেশন বা সেবার মূল্য মেন্টর, সেবার ধরন, সময়কাল, প্যাকেজ অথবা বিশেষ সেবার প্রকৃতি অনুযায়ী
                      ভিন্ন হতে পারে। চূড়ান্ত মূল্য গ্রাহক অর্ডার নিশ্চিত করার পূর্বে চেকআউট পাতায় দেখতে পারবেন।
                    </LegalSmallP>
                    <LegalSmallP>
                      অর্থপ্রদান সফল হওয়ার পর বুকিং নিশ্চিত বলে গণ্য হবে। গৃহীত অর্থপ্রদানের মাধ্যম ওয়েবসাইটে
                      প্রদর্শিত অনুমোদিত ডিজিটাল পদ্ধতির মাধ্যমে সম্পন্ন হবে, যার মধ্যে কার্ড, মোবাইল আর্থিক সেবা,
                      ইন্টারনেট ব্যাংকিং বা অন্যান্য অনলাইন পরিশোধপদ্ধতি অন্তর্ভুক্ত থাকতে পারে।
                    </LegalSmallP>
                  </div>
                </Section>

                <Section title="সেবা প্রদানের সময়">
                  <p>
                    এটি একটি অনলাইন ও অমূর্ত সেবা। তাই ভৌত পণ্য সরবরাহের জন্য প্রযোজ্য সময়সীমা এখানে প্রযোজ্য নয়।
                    সফল অর্থপ্রদানের পর গ্রাহকের নির্ধারিত তারিখ ও সময় অনুযায়ী অনলাইন সেশন অনুষ্ঠিত হবে।
                  </p>
                </Section>

                <Section title="বাতিল, পুনঃনির্ধারণ ও অর্থ ফেরত">
                  <div className="space-y-3">
                    <LegalSmallP>
                      গ্রাহক নির্ধারিত সেশনের অন্তত ২৪ ঘণ্টা পূর্বে বাতিল বা পুনঃনির্ধারণের অনুরোধ করলে তা গ্রহণযোগ্য
                      হতে পারে। ২৪ ঘণ্টার কম সময় বাকি থাকলে পূর্ণ অর্থ ফেরত প্রযোজ্য নাও হতে পারে।
                    </LegalSmallP>
                    <LegalSmallP>
                      যদি মেন্টর নির্ধারিত সেশনে উপস্থিত না হন, অথবা প্ল্যাটফর্মজনিত সমস্যা, কারিগরি ত্রুটি বা
                      প্রতিষ্ঠানের নিয়ন্ত্রণাধীন অন্য কোনো কারণে সেশন সম্পন্ন না হয়, তাহলে গ্রাহক পূর্ণ অর্থ ফেরত,
                      পুনঃনির্ধারণ অথবা সমমূল্যের বিকল্প সেবা পাওয়ার যোগ্য হতে পারেন।
                    </LegalSmallP>
                    <LegalSmallP>
                      অনুমোদিত অর্থ ফেরতের আবেদন সাধারণত ৭ থেকে ১০ কর্মদিবসের মধ্যে প্রক্রিয়াকরণের জন্য পাঠানো হবে।
                      তবে ব্যবহৃত ব্যাংক, মোবাইল আর্থিক সেবা বা অন্য অর্থপ্রদান-চ্যানেলের নিয়ম অনুযায়ী গ্রাহকের হিসাবে
                      অর্থ সমন্বয়ে অতিরিক্ত সময় লাগতে পারে।
                    </LegalSmallP>
                  </div>
                </Section>

                <Section title="সেবা প্রদানের প্রমাণ">
                  <p>
                    বুকিং-সংক্রান্ত তথ্য, লেনদেনের তথ্য, নিশ্চিতকরণ বার্তা, ই-মেইল, সেশন ইতিহাস, সহায়তা-সংক্রান্ত
                    যোগাযোগ এবং উপস্থিতির রেকর্ড প্রয়োজনে সেবা প্রদানের প্রমাণ হিসেবে সংরক্ষিত হতে পারে।
                  </p>
                </Section>

                <Section title="গ্রাহকের সম্মতি">
                  <p>
                    অর্ডার নিশ্চিত করার আগে গ্রাহককে শর্তাবলি, গোপনীয়তা নীতি এবং বাতিল ও অর্থ ফেরত নীতি পড়ে সম্মতি
                    দিতে হবে। এই সম্মতি গ্রাহক নিজে প্রদান করবেন।
                  </p>
                </Section>
              </div>
            </LegalCard>

            <LegalCard title="২. শর্তাবলি" titleVariant="body">
              <div className="space-y-5">
                <LegalP>
                  অ্যাব্রডমেটস-এর ওয়েবসাইট, বুকিং ব্যবস্থা এবং সেবা ব্যবহার করার মাধ্যমে ব্যবহারকারী নিম্নোক্ত
                  শর্তাবলিতে সম্মতি প্রদান করছেন।
                </LegalP>

                <Section title="সেবার ব্যবহার">
                  <p>
                    অ্যাব্রডমেটস একটি পরামর্শভিত্তিক ও মেন্টরশিপকেন্দ্রিক প্ল্যাটফর্ম। এখানে প্রদত্ত তথ্য,
                    দিকনির্দেশনা এবং সহায়তা শিক্ষার্থীকে সচেতন সিদ্ধান্ত নিতে সাহায্য করার উদ্দেশ্যে প্রদান করা হয়।
                  </p>
                </Section>

                <Section title="তথ্যের সঠিকতা">
                  <p>
                    ব্যবহারকারীর দায়িত্ব হলো বুকিং, যোগাযোগ এবং সেবা গ্রহণের সময় প্রদত্ত সব তথ্য সঠিক, সম্পূর্ণ এবং
                    হালনাগাদ রাখা। ভুল, অসম্পূর্ণ বা বিভ্রান্তিকর তথ্যের কারণে সেবা ব্যাহত হলে তার সম্পূর্ণ দায়
                    ব্যবহারকারীর ওপর বর্তাবে।
                  </p>
                </Section>

                <Section title="বুকিং ও অর্থপ্রদান">
                  <p>
                    ওয়েবসাইটে প্রদর্শিত সেবা, মেন্টর, সময় এবং মূল্যের ভিত্তিতে গ্রাহক সেশন বুক করতে পারবেন। সফল
                    অর্থপ্রদানের পর বুকিং নিশ্চিত বলে গণ্য হবে। অর্থপ্রদান ব্যর্থ হলে বুকিং নিশ্চিত হবে না।
                  </p>
                </Section>

                <Section title="মেন্টর পেআউট">
                  <p>
                    মেন্টরদের পেমেন্ট সম্পন্ন, শিক্ষার্থী-পরিশোধিত সেশন থেকে হয়। প্রদেয় অর্থ প্ল্যাটফর্ম ফি বাদ
                    দিয়ে মেন্টর নেট, সব অবৈতনিক সেশন মিলিয়ে (একজন শিক্ষার্থীর জন্য আলাদা নয়)। থ্রেশহোল্ড খালি থাকলে
                    ৫০ মার্কিন ডলার নেট বসানো হয়; মেন্টর ৪০ বা তার বেশি সেট করতে পারেন। ১ সেপ্টেম্বর ২০২৬-এর আগে
                    যোগ দেওয়া মেন্টরদের ভাগ ৮০/২০; নতুন মেন্টরদের ৭০/৩০। থ্রেশহোল্ড পূরণ হলে পরবর্তী সপ্তাহের মধ্যে
                    সেভ করা ব্যাংক, Wise, PayPal, Payoneer বা bKash-এ টাকা পাঠানো হয়।
                  </p>
                </Section>

                <Section title="সেশনে অংশগ্রহণ">
                  <p>
                    নির্ধারিত দিন ও সময়ে সেশনে অংশগ্রহণ করা গ্রাহকের দায়িত্ব। গ্রাহকের নিজস্ব যন্ত্র, ইন্টারনেট
                    সংযোগ, সফটওয়্যার, বিদ্যুৎ বা পরিবেশগত কারণে সেশন ব্যাহত হলে তা সব ক্ষেত্রে প্রতিষ্ঠানের দায়
                    হিসেবে গণ্য হবে না।
                  </p>
                </Section>

                <Section title="ফলাফলের নিশ্চয়তা">
                  <p>
                    অ্যাব্রডমেটস মেন্টরশিপ, দিকনির্দেশনা এবং পরিকল্পনা-সহায়তা প্রদান করে। তবে কোনো বিশ্ববিদ্যালয়ে
                    ভর্তি, বৃত্তি প্রাপ্তি, ভিসা অনুমোদন, চাকরি অর্জন বা নির্দিষ্ট ফলাফলের নিশ্চয়তা প্রদান করে না।
                  </p>
                </Section>

                <Section title="আচরণবিধি">
                  <p>
                    ব্যবহারকারী মেন্টর, কর্মী, অন্য ব্যবহারকারী বা প্ল্যাটফর্মের প্রতি অশোভন, অপমানজনক, বিভ্রান্তিকর,
                    প্রতারণামূলক, বেআইনি বা ক্ষতিকর আচরণ করতে পারবেন না। প্রয়োজনে প্রতিষ্ঠান কোনো বুকিং বাতিল, সীমিত,
                    স্থগিত বা বন্ধ করার অধিকার সংরক্ষণ করে।
                  </p>
                </Section>

                <Section title="মেধাস্বত্ব">
                  <p>
                    ওয়েবসাইটের লেখা, নকশা, উপস্থাপনা, সেবা-বিবরণ, ব্র্যান্ড-নাম, লোগো এবং অন্যান্য বিষয়বস্তুর ওপর
                    প্রযোজ্য অধিকার অ্যাব্রডমেটস বা সংশ্লিষ্ট মালিকের অধীন সংরক্ষিত থাকবে। পূর্বানুমতি ছাড়া এসব
                    ব্যবহার, অনুলিপি, পুনঃপ্রকাশ বা বাণিজ্যিক ব্যবহার করা যাবে না।
                  </p>
                </Section>

                <Section title="নীতিমালা পরিবর্তন">
                  <p>
                    প্রতিষ্ঠান যে কোনো সময় এই শর্তাবলি পরিবর্তন, সংশোধন বা হালনাগাদ করার অধিকার সংরক্ষণ করে।
                    সংশোধিত সংস্করণ ওয়েবসাইটে প্রকাশের পর থেকে কার্যকর বলে গণ্য হবে।
                  </p>
                </Section>

                <Section title="যোগাযোগ">
                  <p>
                    শর্তাবলি সম্পর্কে কোনো প্রশ্ন থাকলে{" "}
                    <a href="mailto:team@abroadmates.com" className={LINK_CLASS}>
                      team@abroadmates.com
                    </a>{" "}
                    ঠিকানায় যোগাযোগ করা যাবে।
                  </p>
                </Section>
              </div>
            </LegalCard>

            <LegalCard title="৩. গোপনীয়তা নীতি" titleVariant="body">
              <div className="space-y-5">
                <LegalP>
                  অ্যাব্রডমেটস ব্যবহারকারীর ব্যক্তিগত তথ্যের গোপনীয়তা ও নিরাপত্তাকে গুরুত্ব সহকারে বিবেচনা করে। এই
                  নীতিতে কী তথ্য সংগ্রহ করা হয়, কেন সংগ্রহ করা হয়, কীভাবে ব্যবহার করা হয় এবং কীভাবে সুরক্ষিত রাখা
                  হয় তা বর্ণনা করা হলো।
                </LegalP>

                <Section title="সংগ্রহকৃত তথ্য">
                  <p>
                    অ্যাব্রডমেটস প্রয়োজনে ব্যবহারকারীর নাম, ফোন নম্বর, ই-মেইল ঠিকানা, বুকিং তথ্য, লেনদেন-সংক্রান্ত
                    প্রাথমিক তথ্য, যোগাযোগের বার্তা এবং সেবা ব্যবহারের জন্য প্রয়োজনীয় কিছু প্রযুক্তিগত তথ্য সংগ্রহ
                    করতে পারে।
                  </p>
                </Section>

                <div className="space-y-2">
                  <p className={`${FONT_BRAND} font-bold text-gray-900`}>তথ্য সংগ্রহের উদ্দেশ্য</p>
                  <p className={`${FONT_BRAND} text-[15px] leading-7 text-gray-700`}>
                    সংগৃহীত তথ্য নিম্নোক্ত কাজে ব্যবহৃত হতে পারে:
                  </p>
                  <LegalList>
                    <li>সেবা প্রদান</li>
                    <li>বুকিং নিশ্চিত করা</li>
                    <li>গ্রাহকের সঙ্গে যোগাযোগ করা</li>
                    <li>সহায়তা প্রদান</li>
                    <li>লেনদেন যাচাই করা</li>
                    <li>জালিয়াতি ও অপব্যবহার প্রতিরোধ করা</li>
                    <li>সেবার মান উন্নত করা</li>
                  </LegalList>
                </div>

                <Section title="অর্থপ্রদান-সংক্রান্ত তথ্য">
                  <p>
                    অর্থপ্রদানের তথ্য নিরাপদ অর্থপ্রদান-ব্যবস্থার মাধ্যমে প্রক্রিয়াকৃত হতে পারে। প্রয়োজনে অনুমোদিত
                    অর্থপ্রদানসেবা প্রদানকারী লেনদেন পরিচালনা করতে পারে।
                  </p>
                </Section>

                <Section title="তথ্য শেয়ারিং">
                  <p>
                    অ্যাব্রডমেটস ব্যবহারকারীর ব্যক্তিগত তথ্য অনুমোদনহীন কোনো তৃতীয় পক্ষের কাছে বিক্রি করে না। তবে
                    আইনগত প্রয়োজন, নিরাপত্তা, লেনদেন যাচাই, কারিগরি সহায়তা বা বৈধ সেবা প্রদানের প্রয়োজনে সীমিত তথ্য
                    সংশ্লিষ্ট সেবাদাতা বা কর্তৃপক্ষের সঙ্গে শেয়ার করা হতে পারে।
                  </p>
                </Section>

                <Section title="তথ্য সুরক্ষা">
                  <p>
                    ব্যবহারকারীর তথ্য অননুমোদিত প্রবেশ, অপব্যবহার, পরিবর্তন, প্রকাশ বা ধ্বংস থেকে সুরক্ষিত রাখতে
                    যুক্তিসঙ্গত প্রশাসনিক, প্রযুক্তিগত এবং কার্যকরী নিরাপত্তা ব্যবস্থা গ্রহণ করা হয়।
                  </p>
                </Section>

                <Section title="ব্যবহারকারীর অধিকার">
                  <p>
                    ব্যবহারকারী প্রয়োজনে নিজের তথ্য হালনাগাদ, সংশোধন বা অপসারণের অনুরোধ করতে পারেন। এ বিষয়ে{" "}
                    <a href="mailto:team@abroadmates.com" className={LINK_CLASS}>
                      team@abroadmates.com
                    </a>{" "}
                    ঠিকানায় যোগাযোগ করতে হবে।
                  </p>
                </Section>

                <Section title="নীতির পরিবর্তন">
                  <p>
                    গোপনীয়তা নীতি সময়ে সময়ে সংশোধন বা হালনাগাদ করা হতে পারে। সংশোধিত নীতি ওয়েবসাইটে প্রকাশের পর
                    থেকে কার্যকর হবে।
                  </p>
                </Section>

                <Section title="যোগাযোগ">
                  <p>
                    গোপনীয়তা নীতি সম্পর্কে কোনো প্রশ্ন থাকলে{" "}
                    <a href="mailto:team@abroadmates.com" className={LINK_CLASS}>
                      team@abroadmates.com
                    </a>{" "}
                    ঠিকানায় যোগাযোগ করা যাবে।
                  </p>
                </Section>
              </div>
            </LegalCard>
          </div>

          <p className={`${FONT_BRAND} mt-10 text-center text-sm leading-relaxed text-gray-500`}>
            ইংরেজি সংস্করণের জন্য{" "}
            <Link href="/legals/commerce-disclosure/" className={LINK_CLASS}>
              Commerce disclosure
            </Link>
            ,{" "}
            <Link href="/legals/terms-service/" className={LINK_CLASS}>
              Terms and conditions
            </Link>{" "}
            এবং{" "}
            <Link href="/legals/privacy-policy/" className={LINK_CLASS}>
              Privacy Policy
            </Link>{" "}
            দেখুন।
          </p>
        </div>
      </div>
    </div>
  );
}
