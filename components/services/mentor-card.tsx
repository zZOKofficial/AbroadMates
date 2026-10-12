import Image from "next/image";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/auth/icon";
import { Flag } from "@/components/sessions/session-card";
import type { Mentor } from "@/data/mentors";
import { mentorCountry, scholarshipLineOf, universityLineOf } from "./format";

/**
 * Mentor card - ported from the original shared chunk (module 24088) with the
 * pieces it pulled in: module 2948 (profile image), 74438 (object-position),
 * 64767 (program chip), 53257/21338/51571 (text helpers, see ./format) and
 * 39287 (next-available-slot label).
 *
 * Rendered inside the card grid's `<Link>` (`embeddedInLink: true`), so the
 * whole card is the click target and the trailing pill is a plain span.
 * compact / meet-callback / add-callback variants from the original were only
 * used on other pages and are not reproduced here.
 */

const NO_SLOTS = "No slots available";
const IMAGE_SIZES =
  "(min-width: 1280px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw";

// 2948 (safeSrc) - only local paths and the site's own image hosts are allowed.
function safeSrc(src: string | null): string {
  const value = typeof src === "string" ? src.trim() : "";
  if (!value) return "/images/avatar-placeholder.svg";
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  try {
    const { protocol, hostname } = new URL(value);
    if (protocol !== "http:" && protocol !== "https:") {
      return "/images/avatar-placeholder.svg";
    }
    return hostname === "res.cloudinary.com" || hostname.endsWith(".googleusercontent.com")
      ? value
      : "/images/avatar-placeholder.svg";
  } catch {
    return "/images/avatar-placeholder.svg";
  }
}

// 2948 (ProfileImage)
function ProfileImage({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={safeSrc(src)}
      alt={alt}
      fill
      sizes={IMAGE_SIZES}
      className={cn("object-cover", className)}
    />
  );
}

// 64767 (ProgramChip)
function ProgramChip({ program }: { program: string }) {
  const value = program.trim();
  if (!value) return null;
  return (
    <span className="inline-flex shrink-0 items-center rounded-full bg-secondary font-semibold normal-case text-white shadow-sm px-2.5 py-0.5 text-xs">
      {value}
    </span>
  );
}

// 24088 (x) - the single-line university / scholarship rows.
function CardRow({
  primaryText,
  extraCount,
  tone,
  title,
}: {
  primaryText: string;
  extraCount: number;
  tone: "muted" | "primary";
  title?: string;
}) {
  return (
    <p
      title={title}
      className="mt-1 min-h-[1.35em] w-full overflow-hidden text-center font-normal leading-snug text-sm lg:text-[13px] lg:mt-0.5 line-clamp-1"
    >
      <span className={tone === "primary" ? "text-primary" : "text-gray-600"}>
        {primaryText || "\u00a0"}
      </span>
      {extraCount > 0 ? (
        <span className="whitespace-nowrap font-medium text-primary">
          {" "}
          +{extraCount}
        </span>
      ) : null}
    </p>
  );
}

export type MentorCardProps = {
  mentor: Mentor;
  /** Raw value from `/api/mentors/next-available-slots` (39287 TB). */
  nextAvailableSlot?: string | { label?: string } | null;
  nextAvailableSlotLoading?: boolean;
};

export default function MentorCard({
  mentor,
  nextAvailableSlot = null,
  nextAvailableSlotLoading = false,
}: MentorCardProps) {
  const name = mentor.name;
  const major = mentor.major?.trim() ?? "";
  const program = mentor.program ?? "";
  const photo = mentor.photo;

  // 39287: TB / vN
  const slotLabel = nextAvailableSlotLoading
    ? "Loading..."
    : typeof nextAvailableSlot === "string"
      ? nextAvailableSlot
      : (nextAvailableSlot?.label ?? NO_SLOTS);
  const noSlots = slotLabel === NO_SLOTS;

  const university = universityLineOf(mentor);
  const scholarship = scholarshipLineOf(mentor);
  const country = mentorCountry(mentor);

  return (
    <div className="group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-gray-light border-[#eaeaea] bg-white text-center shadow-md transition-colors duration-200 hover:border-primary hover:shadow-lg">
      <div className="shrink-0 bg-transparent p-4 pb-0 lg:p-2.5 lg:pb-0">
        <div className="relative w-full overflow-hidden rounded-2xl aspect-4/3 lg:aspect-square">
          <ProfileImage
            src={photo}
            alt={name}
            className="lg:hidden"
          />
          <ProfileImage
            src={photo}
            alt={name}
            className="hidden lg:block"
          />
          {country.iso ? (
            <span className="absolute top-2 right-2 flex flex-row items-center gap-0.5">
              <Flag
                iso={country.iso}
                label={country.label}
                className="h-4 w-6 rounded-sm"
              />
            </span>
          ) : null}
          {program ? (
            <div className="absolute bottom-3 left-3">
              <ProgramChip program={program} />
            </div>
          ) : null}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col text-center px-4 pt-3 lg:px-2.5 lg:pt-2">
        <h3
          title={name}
          className="font-brand w-full font-semibold normal-case text-text-primary line-clamp-1 min-h-[1.35em] overflow-hidden text-lg leading-snug lg:text-base"
        >
          {name}
        </h3>
        <p
          title={major || undefined}
          className={cn(
            "mt-0.5 w-full font-normal leading-snug text-gray-600 text-sm lg:text-[13px]",
            "line-clamp-1 min-h-[1.35em] overflow-hidden",
            major ? "" : "invisible",
          )}
        >
          {major || "\u00a0"}
        </p>

        <CardRow
          primaryText={university}
          extraCount={0}
          tone="muted"
          title={university || undefined}
        />
        <CardRow
          primaryText={scholarship}
          extraCount={0}
          tone="primary"
          title={scholarship || undefined}
        />

        <div className="flex-1 min-h-2" aria-hidden="true" />

        <div className="border-t border-gray-200 pt-3 pb-4 lg:pt-2.5 lg:pb-2.5 flex items-center gap-2">
          <div className="min-w-0 flex-1 text-left">
            <p className="text-[10px] font-normal leading-none text-gray-500">
              Next available
            </p>
            <p
              className={cn(
                "mt-0.5 truncate whitespace-nowrap text-sm leading-none lg:mt-1 font-normal lg:font-bold lg:text-xs",
                noSlots ? "text-primary" : "text-text-primary",
              )}
            >
              {noSlots ? "-" : slotLabel}
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-end overflow-visible">
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full whitespace-nowrap font-bold text-primary transition-colors group-hover:bg-primary group-hover:text-white min-h-10 px-2.5 py-1.5 text-base lg:text-sm">
              Meet
              <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-white transition-colors group-hover:bg-white group-hover:text-primary h-7 w-7">
                <Icon icon="mdi:arrow-right" className="h-4 w-4" aria-hidden={true} />
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
