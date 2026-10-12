"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/mentors", label: "Talk to Abroadmates" },
  { href: "/sessions", label: "Group Sessions" },
  { href: "/our-story", label: "Our Manifesto" },
];

/**
 * Fixed floating header recovered from the production build:
 * logo pinned top-left, centered glass pill nav (desktop), menu button
 * (mobile) toggling a dropdown panel.
 */
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      {/* top gradient strip that fades in on scroll */}
      <div
        aria-hidden="true"
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-40 h-16 transition-[background-color,backdrop-filter] duration-500 ease-out lg:h-24",
          scrolled
            ? "bg-white/70 backdrop-blur-md"
            : "bg-transparent backdrop-blur-none",
        )}
      />

      {/* logo — pinned top-left */}
      <div className="fixed left-4 top-4 z-50 flex md:left-6 md:top-6">
        <Link href="/" className="inline-block no-underline">
          <div className="relative block aspect-[97/36] w-24 md:w-28">
            <Image
              src="/logos/logo.svg"
              alt="AbroadMates Logo"
              fill
              className="object-contain object-left"
            />
          </div>
        </Link>
      </div>

      {/* desktop nav — centered glass pill */}
      <nav className="fixed left-1/2 top-6 z-50 hidden -translate-x-1/2 rounded-xl border border-gray-200/60 bg-white/10 px-4 py-3 text-[13px] shadow-md shadow-gray-200/20 backdrop-blur-sm outline-none lg:flex lg:flex-nowrap lg:space-x-4 xl:space-x-8 xl:px-8 xl:py-3 xl:text-sm">
        {NAV_LINKS.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "whitespace-nowrap leading-none transition-colors duration-200 hover:text-primary",
                active
                  ? "font-semibold text-primary"
                  : "text-text-primary",
              )}
              aria-current={active ? "page" : undefined}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* desktop CTA slot — pinned top-right */}
      <div className="fixed right-4 top-4 z-50 hidden items-center gap-2 lg:right-6 lg:top-6 lg:flex">
        <Link
          href="/register/form?step=0"
          className="inline-flex h-10 w-44 items-center justify-center rounded-xl border border-black bg-secondary px-6 text-sm font-semibold text-black shadow-sm transition-all hover:-translate-y-0.5 hover:brightness-95 hover:shadow-md"
        >
          Start NOW
        </Link>
      </div>

      {/* mobile menu button */}
      <div className="fixed right-4 top-4 z-50 lg:hidden">
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-white/30 bg-white/20 p-2 text-black shadow-sm backdrop-blur-md transition-[background-color,border-color,backdrop-filter] duration-500 ease-out"
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {/* mobile menu panel */}
      {open && (
        <div className="fixed left-4 right-4 top-20 z-50 rounded-xl border border-gray-200/60 bg-white/95 p-4 shadow-lg backdrop-blur-md lg:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm transition-colors hover:bg-primary-light hover:text-primary",
                      active ? "font-semibold text-primary" : "text-text-primary",
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            <li>
              <Link
                href="/register/form?step=0"
                className="mt-2 block rounded-xl border border-black bg-secondary px-3 py-2 text-center text-sm font-semibold text-black shadow-sm"
              >
                Start NOW
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
