import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SessionCard, {
  cardTitle,
  formatLongDate,
  mentorAvatarUrl,
  mentorSpotlightUrl,
  registrationState,
  seatCountLabel,
  sessionImageUrl,
  spotsLeftLabel,
  stickyTitle,
  typeBadge,
} from "@/components/sessions/session-card";
import { getMentor } from "@/data/mentors";
import { getSession, UPCOMING_SESSIONS, type Session } from "@/data/sessions";

// ---------------------------------------------------------------------------
// Per-page overrides recovered from the reference render. The extracted data
// records lost a few page-specific pieces (SEO copy, the US PhD hero badge,
// mentor pull-quotes and the Japan co-mentor block), restored here.
// ---------------------------------------------------------------------------

const SEO_OVERRIDES: Record<string, { title: string; description: string }> = {
  "fully-funded-us-phd-live-roadmap-q-and-a": {
    title: "Fully Funded US PhD Roadmap",
    description:
      "A live small-group roadmap through the complete US PhD application — taught by a researcher who secured a fully funded position at Northeastern University.",
  },
};

const HERO_BADGE_OVERRIDES: Record<string, string> = {
  "fully-funded-us-phd-live-roadmap-q-and-a": "Roadmap Session",
};

const QUOTE_OVERRIDES: Record<string, string> = {
  "fully-funded-us-phd-live-roadmap-q-and-a":
    "I built the roadmap I wish I had. No agencies, no guesswork — just the strategy that actually got me funded.",
  "erasmus-mundus-application-overview-programme-shortlisting-live-qa":
    "Choosing the right programme is not about applying everywhere. It is about understanding where your profile actually fits.",
  "japan-university-application-and-scholarship":
    "Studying abroad is not just about finding a university. It is about understanding which opportunity actually fits your profile and preparing for it strategically.",
};

// The US PhD page renders a generic avatar placeholder in the mentor spotlight.
const PLACEHOLDER_SPOTLIGHT = new Set(["fully-funded-us-phd-live-roadmap-q-and-a"]);

// Japan's page adds a second mentor showcase (rendered without the #the-mentor id).
const CO_MENTORS: Record<string, { mentorSlug: string; bio: string; talkTo: string }> = {
  "japan-university-application-and-scholarship": {
    mentorSlug: "rahat-yasin",
    bio: "Hi, I’m Rahat! I’ve applied to and been accepted by schools across the US, Europe, and Asia, so I bring firsthand experience with diverse application processes. Over the past three years, I’ve mentored more than 50 students, helping them craft strong, authentic applications to their dream universities. My extracurricular background includes debating, public speaking, creative writing, and leadership. Since I study IR, I’m especially passionate about supporting applications focused on social justice, politics, and nonprofit work. I’m well-versed in applications for the US, Europe, and Japan, and my mentoring style is friendly, personalized, and encouraging.",
    talkTo: "Yasin",
  },
};

// Static marquee copy (6 items rendered twice for the seamless loop).
const MARQUEE_ITEMS = [
  "Learn from real experience",
  "Get focused guidance",
  "Ask your questions",
  "200+ mentors across 30+ countries",
  "2,000+ mentorship sessions completed",
  "150+ students studying abroad",
];

const HERO_CTA_CLASSES =
  "inline-flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-[var(--font-brand)] transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*=\"size-\"])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-[var(--color-primary)] text-white shadow-[var(--shadow-button)] hover:bg-[#b71b21] h-auto rounded-xl px-8 py-3 text-base font-semibold has-[>svg]:px-8";

function Star() {
  return (
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
      className="lucide lucide-star size-4 fill-primary text-primary"
      aria-hidden="true"
    >
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
    </svg>
  );
}

function CircleCheck() {
  return (
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
      className="lucide lucide-circle-check mt-0.5 size-4 shrink-0 text-primary"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function MentorShowcase({
  sectionId,
  headingId,
  eyebrow,
  heading,
  bio,
  quote,
  photoSrc,
  photoAlt,
  talkTo,
}: {
  sectionId?: string;
  headingId: string;
  eyebrow: string;
  heading: string;
  bio: string;
  quote?: string;
  photoSrc: string;
  photoAlt: string;
  talkTo?: { href: string; name: string };
}) {
  return (
    <section
      id={sectionId}
      aria-labelledby={headingId}
      className="session-section-anchor py-14 md:py-20"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 session-roadmap-mentor-showcase grid items-center gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-stretch lg:gap-14">
        <div className="session-mentor-spotlight-media-col session-roadmap-mentor-showcase-media">
          <div className="session-mentor-spotlight-media">
            <div className="session-mentor-spotlight-matte" aria-hidden="true" />
            <div className="session-mentor-spotlight-frame session-roadmap-mentor-showcase-frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={photoAlt}
                loading="lazy"
                decoding="async"
                className="object-cover object-top"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                src={photoSrc}
              />
            </div>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{eyebrow}</p>
          <h2
            id={headingId}
            className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl lg:text-[2.1rem]"
          >
            {heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">{bio}</p>
          {quote ? (
            <blockquote className="mt-8 border-l-4 border-primary bg-primary/5 px-5 py-4">
              <p className="font-secondary text-lg leading-snug text-text-primary sm:text-xl">
                {'“'}
                {quote}
                {'”'}
              </p>
            </blockquote>
          ) : null}
          {talkTo ? (
            <a
              className="mt-6 inline-flex text-sm font-semibold text-primary transition hover:underline"
              href={`/mentors/${talkTo.href}`}
            >
              {`Talk to ${talkTo.name} →`}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

type DetailParams = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: DetailParams): Promise<Metadata> {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) return {};
  const seo = SEO_OVERRIDES[slug];
  const title = seo?.title ?? cardTitle(session);
  const description = seo?.description ?? session.description ?? session.excerpt ?? "";
  const full = `${title} | Group Sessions | AbroadMates`;
  return {
    title,
    description,
    alternates: { canonical: `/sessions/${slug}` },
    openGraph: { title: full, description, url: `/sessions/${slug}` },
    twitter: { card: "summary", title: full, description },
  };
}

export default async function SessionDetailPage({ params }: DetailParams) {
  const { slug } = await params;
  const session = getSession(slug);
  if (!session) notFound();

  return <SessionDetail session={session} slug={slug} />;
}

function SessionDetail({ session, slug }: { session: Session; slug: string }) {
  const tz = session.timezone ?? "Asia/Dhaka";
  const reg = registrationState(session);
  const seats = session.seatsRemaining ?? session.spotsRemaining;
  const heroBadge = HERO_BADGE_OVERRIDES[slug] ?? typeBadge(session.type ?? "");
  const quote = QUOTE_OVERRIDES[slug];
  const co = CO_MENTORS[slug];

  const mentor = session.mentorSlug ? getMentor(session.mentorSlug) : undefined;
  const mentorPhoto = mentor?.photo ?? null;
  const spotlightPlaceholder = PLACEHOLDER_SPOTLIGHT.has(slug) || !mentorPhoto;
  const spotlightSrc = spotlightPlaceholder
    ? "/images/avatar-placeholder.svg"
    : (mentorSpotlightUrl(mentorPhoto) ?? "/images/avatar-placeholder.svg");
  const spotlightAlt = spotlightPlaceholder
    ? (session.mentorHeading ?? "")
    : (session.mentorName ?? "");
  const avatarSrc = mentorAvatarUrl(mentor?.photo ?? null) ?? "";

  const coMentor = co ? getMentor(co.mentorSlug) : undefined;
  const coPhoto = coMentor?.photo ?? null;
  const coSpotlightSrc = coPhoto
    ? (mentorSpotlightUrl(coPhoto) ?? "/images/avatar-placeholder.svg")
    : "/images/avatar-placeholder.svg";

  const firstWord = (session.mentorName ?? "").split(" ")[0];
  const tzCity = tz.split("/")[1]?.replace(/_/g, " ") ?? "Dhaka";
  const related = UPCOMING_SESSIONS.filter((s) => s.slug !== slug).slice(0, 4);

  return (
    <main id="top" className="session-detail min-h-screen pb-24 lg:pb-0">
      {/* ---------------------------------------------------------------- hero */}
      <section
        aria-labelledby="session-roadmap-hero-title"
        className="session-hero relative overflow-x-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 pt-24 pb-12 sm:px-6 sm:pt-28 sm:pb-16 lg:px-8 lg:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,541px)_minmax(0,603px)] lg:justify-between lg:gap-14">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
                  {heroBadge}
                </span>
                <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-text-primary">
                  {`${seats} seats left`}
                </span>
              </div>
              <h1
                id="session-roadmap-hero-title"
                className="mt-5 font-brand font-bold tracking-tight"
              >
                <span
                  className="block text-text-primary"
                  style={{ fontSize: "clamp(24px, 2.125rem + 0.45vw, 44px)", lineHeight: 1.1 }}
                >
                  {session.title}
                </span>
                {session.subtitle ? (
                  <span
                    className="block text-primary"
                    style={{ fontSize: "clamp(20px, 1.75rem + 0.4vw, 36px)", lineHeight: 1.12 }}
                  >
                    {session.subtitle}
                  </span>
                ) : null}
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-gray-700 sm:text-lg">
                {session.description}
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-x-3 border-t border-black/10 pt-5 sm:gap-x-6 lg:gap-x-8">
                <div className="min-w-0">
                  <dt className="text-lg font-bold leading-tight text-text-primary sm:text-xl lg:text-2xl">
                    {session.dateLabel}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-gray-600 sm:text-sm">
                    {session.timeLabel}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-lg font-bold leading-tight text-text-primary sm:text-xl lg:text-2xl">
                    {session.durationLabel}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-gray-600 sm:text-sm">
                    {session.heroMode}
                  </dd>
                </div>
                <div className="min-w-0">
                  <dt className="text-lg font-bold leading-tight text-text-primary sm:text-xl lg:text-2xl">
                    {session.tags[0]}
                  </dt>
                  <dd className="mt-1 text-xs leading-snug text-gray-600 sm:text-sm">
                    {session.tags[1]}
                  </dd>
                </div>
              </dl>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link data-slot="button" className={HERO_CTA_CLASSES} href={`/sessions/${slug}/register`}>
                  Reserve your seat
                </Link>
                <a
                  href="#session-roadmap"
                  className="inline-flex items-center justify-center rounded-xl px-2 py-3 text-base font-semibold text-text-primary underline decoration-primary decoration-2 underline-offset-4 transition hover:text-primary sm:underline-offset-8"
                >
                  See what&apos;s inside →
                </a>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                <span className="font-semibold text-text-primary">
                  <span className="font-bold">৳</span>
                  <span className="font-bold">{session.price}</span> BDT
                </span>
              </p>
            </div>
            <div className="session-hero-visual min-w-0 w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={sessionImageUrl(session.image ?? "")}
                alt=""
                width="960"
                height="662"
                fetchPriority="high"
                className="session-hero-image"
              />
              <div className="session-hero-mentor-card">
                <div className="session-hero-mentor-avatar">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={avatarSrc}
                    alt={session.mentorName ?? ""}
                    loading="lazy"
                    width="48"
                    height="48"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    className="text-base font-semibold leading-snug break-words text-text-primary hover:text-primary"
                    href={`/mentors/${session.mentorSlug}`}
                  >
                    {session.mentorName}
                  </a>
                  <p className="mt-1 text-sm leading-snug break-words text-gray">
                    {session.mentorUniversity}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      <section aria-label="AbroadMates community highlights" className="overflow-hidden bg-primary">
        <div className="flex whitespace-nowrap py-3.5">
          <div className="flex w-max items-center gap-8 px-4 [animation:us-phd-marquee_36s_linear_infinite] motion-reduce:[animation:none]">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
              <span
                key={`${item}-${i}`}
                className="inline-flex items-center gap-8 text-sm font-medium text-white sm:text-[15px]"
              >
                {item}
                <span className="text-secondary" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- the mentor(s) */}
      <MentorShowcase
        sectionId="the-mentor"
        headingId="session-roadmap-mentor-heading-0"
        eyebrow="The mentor"
        heading={session.mentorHeading ?? ""}
        bio={session.mentorBio.join("\n")}
        quote={quote}
        photoSrc={spotlightSrc}
        photoAlt={spotlightAlt}
        talkTo={slug === "fully-funded-us-phd-live-roadmap-q-and-a" ? undefined : { href: session.mentorSlug ?? "", name: firstWord }}
      />
      {co && coMentor ? (
        <MentorShowcase
          headingId="session-roadmap-mentor-heading-1"
          eyebrow="Co-mentor"
          heading="Learn from another mentor on this session."
          bio={co.bio}
          photoSrc={coSpotlightSrc}
          photoAlt={coMentor.name}
          talkTo={{ href: co.mentorSlug, name: co.talkTo }}
        />
      ) : null}

      {/* ------------------------------------------------------------ outcomes */}
      <section
        id="what-you-learn"
        aria-labelledby="session-roadmap-outcomes-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              What you will learn
            </p>
            <h2
              id="session-roadmap-outcomes-heading"
              className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              {session.outcomesHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              {session.outcomesIntro}
            </p>
          </div>
          <ol className="mt-10 grid gap-6 pt-2 sm:grid-cols-2 lg:grid-cols-4">
            {session.outcomes.map((outcome, i) => (
              <li
                key={outcome.title}
                className="relative flex min-h-[11.5rem] flex-col items-center justify-center rounded-3xl bg-white px-4 py-8 text-center shadow-md"
              >
                <div
                  className="absolute -top-4 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xl font-secondary font-semibold text-white shadow-md"
                  aria-hidden="true"
                >
                  {i + 1}
                </div>
                <h3 className="font-brand text-lg font-semibold leading-snug text-text-primary">
                  {outcome.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">{outcome.description ?? ""}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------- roadmap */}
      <section
        id="session-roadmap"
        aria-labelledby="session-roadmap-agenda-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Inside the session
            </p>
            <h2
              id="session-roadmap-agenda-heading"
              className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              {session.roadmapHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              {session.roadmapIntro}
            </p>
          </div>
          <ol className="mt-10 space-y-4">
            {session.parts.map((part) => (
              <li
                key={part.title}
                className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm sm:p-6 lg:p-7"
              >
                <div className="grid gap-5 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start lg:gap-8">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      {part.part !== null ? (
                        <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                          {`Part ${part.part}`}
                        </span>
                      ) : null}
                      {part.minutes !== null ? (
                        <span className="inline-flex rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-medium text-text-primary">
                          {`${part.minutes} min`}
                        </span>
                      ) : null}
                    </div>
                    <h3 className="mt-3 font-brand text-lg font-bold leading-snug text-text-primary sm:text-xl">
                      {part.title}
                    </h3>
                  </div>
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {part.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-2.5 rounded-xl border border-primary/15 bg-primary/5 px-3.5 py-3 text-sm font-medium leading-snug text-text-primary"
                      >
                        <CircleCheck />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------------ audience */}
      <section
        aria-labelledby="session-roadmap-audience-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-start lg:gap-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
                Who this is for
              </p>
              <h2
                id="session-roadmap-audience-heading"
                className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
              >
                {session.whoHeading}
              </h2>
              {session.whoIntro ? (
                <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
                  {session.whoIntro}
                </p>
              ) : null}
            </div>
            <ol className="grid gap-3 sm:grid-cols-2">
              {session.whoItems.map((item) => (
                <li
                  key={item.number}
                  className="flex gap-3 rounded-2xl border border-black/5 bg-white px-4 py-4 shadow-sm"
                >
                  <span className="font-secondary text-lg font-bold text-primary">{item.number}</span>
                  <span className="text-sm leading-relaxed text-text-primary sm:text-[15px]">
                    {item.text}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- community */}
      <section
        aria-labelledby="session-roadmap-community-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Why AbroadMates
            </p>
            <h2
              id="session-roadmap-community-heading"
              className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              A growing global mentorship community — not an agency.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              Study abroad agencies sell packages. We connect you directly to students who already
              got in, and they tell you the truth — especially the hard parts.
            </p>
          </div>
          <ul className="mt-10 grid gap-5 sm:grid-cols-3 md:gap-6">
            <li className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-7 md:p-8">
              <p className="font-brand text-3xl font-bold text-primary md:text-4xl">200+</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-text-primary">
                Mentors across 30+ countries
              </p>
            </li>
            <li className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-7 md:p-8">
              <p className="font-brand text-3xl font-bold text-primary md:text-4xl">2,000+</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-text-primary">
                Mentorship sessions completed
              </p>
            </li>
            <li className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary hover:shadow-md sm:p-7 md:p-8">
              <p className="font-brand text-3xl font-bold text-primary md:text-4xl">150+</p>
              <p className="mt-3 text-lg font-semibold leading-snug text-text-primary">
                Students studying abroad
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* ----------------------------------------------------------- spotlight */}
      <section
        aria-labelledby="session-roadmap-spotlight-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Curated mentors
            </p>
            <h2
              id="session-roadmap-spotlight-heading"
              className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              Real students, real journeys
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              Book a call, join a roadmap, or listen to a mentor break down how they got funded —
              then ask your own questions before you apply.
            </p>
          </div>
          {/* The original widget fetched mentor cards client-side; the reference
              server render shows four loading skeletons, reproduced here. */}
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="h-96 animate-pulse rounded-3xl bg-gray-100" aria-hidden="true" />
            <div className="h-96 animate-pulse rounded-3xl bg-gray-100" aria-hidden="true" />
            <div className="h-96 animate-pulse rounded-3xl bg-gray-100" aria-hidden="true" />
            <div className="h-96 animate-pulse rounded-3xl bg-gray-100" aria-hidden="true" />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- testimonials */}
      <section
        aria-labelledby="session-roadmap-testimonials-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              From past attendees
            </p>
            <h2
              id="session-roadmap-testimonials-heading"
              className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              {session.testimonialsHeading}
            </h2>
          </div>
          <ul className="mt-10 grid gap-4 lg:grid-cols-3">
            {session.testimonials.map((testimonial) => (
              <li
                key={testimonial.quote}
                className="flex h-full flex-col rounded-2xl border border-black/5 bg-white p-6 shadow-sm sm:p-7"
              >
                <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>
                <span className="mt-4 font-secondary text-4xl leading-none text-primary" aria-hidden="true">
                  {'“'}
                </span>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-700 sm:text-[15px]">
                  {testimonial.quote}
                </p>
                <div className="mt-6 border-t border-black/5 pt-4">
                  <p className="text-xs text-gray-600 sm:text-sm">{testimonial.attribution}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------- related */}
      <section
        aria-labelledby="session-roadmap-related-heading"
        className="session-section-anchor py-14 md:py-20"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">
              Upcoming group sessions
            </p>
            <h2
              id="session-roadmap-related-heading"
              className="mt-3 font-brand text-2xl font-bold leading-tight text-text-primary sm:text-3xl"
            >
              More roadmaps from real AbroadMates
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-700 sm:text-lg">
              Live, mentor-led workshops — matched to your level, starting with what is coming up
              next.
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {related.map((s) => (
              <SessionCard key={s.slug} session={s} />
            ))}
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- final CTA */}
      <section
        aria-labelledby="session-roadmap-final-cta-heading"
        className="session-section-anchor py-10 md:py-12"
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="mx-auto flex max-w-6xl flex-col items-center gap-4 rounded-3xl p-5 text-center sm:p-6 md:p-8"
            style={{ background: "linear-gradient(135deg, #DD0516 0%, #A60411 100%)" }}
          >
            <p className="inline-flex rounded-full border border-white/30 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">
              {reg.canRegister ? seatCountLabel(session) : "Closed"}
            </p>
            <div className="flex flex-col items-center gap-2">
              <h2
                id="session-roadmap-final-cta-heading"
                className="font-caveat text-[28px] font-semibold leading-tight text-white sm:text-[30px]"
              >
                Ask your questions before you apply.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
                {`${session.durationMinutes} minutes live with Q&A. Small group, real answers, no agencies.`}
              </p>
            </div>
            <p className="max-w-2xl text-sm leading-relaxed text-white/95 sm:text-base">
              <time dateTime={session.date ?? undefined}>
                {`${formatLongDate(session.date ?? "", tz)} · ${session.timeLabel}`}
                <span className="text-white/80">{` (Your time · ${tzCity})`}</span>
              </time>
            </p>
            {reg.canRegister ? (
              <a
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-3 text-base font-semibold text-primary no-underline transition-opacity hover:opacity-90"
                href={`/sessions/${slug}/register`}
              >
                Reserve your seat
              </a>
            ) : (
              <span className="inline-flex items-center justify-center rounded-xl bg-white/70 px-8 py-3 text-base font-semibold text-primary/80">
                Registration closed
              </span>
            )}
            <p className="text-sm text-white/90">
              <span className="font-semibold text-white">
                <span className="font-bold">৳</span>
                <span className="font-bold">{session.price}</span> BDT
              </span>
              <span className="text-white/50"> · </span>
              {"with "}
              <a
                className="font-semibold text-white underline decoration-white/80 underline-offset-2 transition hover:text-white/90"
                href={`/mentors/${session.mentorSlug}`}
              >
                {session.mentorName}
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------- sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-60 border-t border-gray-200 bg-white/95 px-4 py-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-text-primary">{stickyTitle(session)}</p>
            <p className="mt-0.5 truncate text-xs text-gray-500">
              <span className="text-xs font-semibold text-text-primary">
                <span className="font-bold">৳</span>
                <span className="font-bold">{session.price}</span> BDT
              </span>
              <span className="text-gray-400"> · </span>
              {reg.canRegister ? spotsLeftLabel(session) : "Registration closed"}
            </p>
          </div>
          {reg.canRegister ? (
            <a
              className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-primary px-4 text-sm font-semibold text-white no-underline transition hover:bg-primary/90"
              href={`/sessions/${slug}/register`}
            >
              Reserve seat
            </a>
          ) : (
            <span className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl bg-gray-200 px-4 text-sm font-semibold text-gray-600">
              Registration closed
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
