import Link from "next/link";
import { BUTTON_ACCENT } from "./button-classes";
import { CtaArrowIcon } from "./icons";

/**
 * "Meet the Mates Behind AbroadMates" team section — markup copied
 * verbatim from the reference DOM.
 *
 * NOTE: the 640w ("2x") variant of Sabihatun Nowrin's portrait
 * (`joinMate-1bead.png`) was not captured by the scraper, so her card
 * falls back to the 256w file for both src and srcSet.
 */

type Mate = {
  name: string;
  university: string;
  /** 256w ("1x") optimizer variant. */
  src1x: string;
  /** 640w ("2x") optimizer variant — `null` when not captured. */
  src2x: string | null;
  rotate: string;
};

const MATES: Mate[] = [
  {
    name: "Sabihatun Nowrin",
    university: "Macquarie University",
    src1x: "/images/join-mate/joinMate-15703.png",
    src2x: null,
    rotate: "sm:-rotate-6",
  },
  {
    name: "Sancharee Adhikary",
    university: "Edith Cowan University",
    src1x: "/images/join-mate/joinMate-3cf50.png",
    src2x: "/images/join-mate/joinMate-33012.png",
    rotate: "sm:rotate-6",
  },
  {
    name: "Tabib Wasit Khan",
    university: "Memorial University of Newfoundland",
    src1x: "/images/join-mate/joinMate-2c021.png",
    src2x: "/images/join-mate/joinMate-28ade.png",
    rotate: "sm:-rotate-3",
  },
  {
    name: "Sakib Khan",
    university: "University of Pécs",
    src1x: "/images/join-mate/joinMate-4740b.png",
    src2x: "/images/join-mate/joinMate-445d5.png",
    rotate: "sm:rotate-3",
  },
];

const CARD_BASE =
  "min-w-0 rounded-xl bg-white p-2 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:w-48 sm:p-4 sm:shadow-lg sm:hover:-translate-y-2";

export function TeamSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white px-4 py-10 sm:px-6 sm:py-14">
      <svg
        className="absolute top-1/2 left-0 z-0 hidden w-full -translate-y-1/2 sm:block"
        height={290}
        viewBox="0 0 800 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0 60C150 0 250 120 400 60C550 0 650 120 800 60  5"
          stroke="#da1f26"
          strokeWidth="3"
          fill="none"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <p className="text-sm text-gray-500 sm:text-base">
          Meet the Mates Behind AbroadMates
        </p>
        <h2 className="mx-auto mt-2 max-w-xl text-2xl leading-tight font-bold sm:text-4xl">
          Join Our{" "}
          <span className="text-primary">Super Squad</span> of{" "}
          <span className="relative inline-block">
            <span className="relative z-10">Abroadmates</span>
            <svg
              className="absolute bottom-0 left-0 h-[6px] w-full"
              viewBox="0 0 100 6"
              preserveAspectRatio="none"
            >
              <path
                d="M0 4 Q50 0 100 4"
                stroke="#da1f26"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:flex sm:flex-wrap sm:justify-center sm:gap-12 sm:px-4">
          {MATES.map((mate) => (
            <div key={mate.name} className={`${CARD_BASE} ${mate.rotate}`}>
              <img
                alt={mate.name}
                loading="lazy"
                width={200}
                height={200}
                decoding="async"
                className="aspect-square w-full rounded-lg object-cover"
                style={{ color: "transparent" }}
                srcSet={
                  mate.src2x
                    ? `${mate.src1x} 1x, ${mate.src2x} 2x`
                    : `${mate.src1x} 1x`
                }
                src={mate.src2x ?? mate.src1x}
              />
              <h3 className="mt-2 text-sm leading-tight font-semibold sm:mt-4 sm:text-lg">
                {mate.name}
              </h3>
              <p className="mt-1 text-xs leading-tight text-gray-500 sm:text-sm">
                {mate.university}
              </p>
            </div>
          ))}
        </div>

        <Link
          data-slot="button"
          href="/become-an-abroadmate"
          className={`${BUTTON_ACCENT} mt-8 sm:mt-16 md:mt-20`}
        >
          Become an AbroadMate
          <CtaArrowIcon />
        </Link>
      </div>
    </section>
  );
}
