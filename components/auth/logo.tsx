import Image from "next/image";
import Link from "next/link";
import * as React from "react";

// Rebuilt from the original site's shared Logo (chunk 5105, module 52815).
type LogoProps = {
  link?: boolean;
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
};

export function Logo({ link = true, variant = "light", size = "md" }: LogoProps) {
  const logo = {
    src: variant === "dark" ? "/logos/logo-white.svg" : "/logos/logo.svg",
    alt: "AbroadMates Logo",
    href: "/",
  };

  const content = (
    <div className="flex flex-col items-start gap-1 no-underline">
      <div
        className={`relative block aspect-[97/36] ${
          size === "sm" ? "w-20" : size === "lg" ? "w-32 md:w-40" : "w-24 md:w-28"
        }`}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          fill
          sizes="(max-width: 768px) 100px, 150px"
          className="object-contain object-left"
          priority
        />
      </div>
    </div>
  );

  return link ? (
    <Link href={logo.href} className="inline-block no-underline">
      {content}
    </Link>
  ) : (
    content
  );
}

export default Logo;
