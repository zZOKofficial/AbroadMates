import type { Metadata } from "next";
import { Caveat, Poppins } from "next/font/google";
import "flag-icons/css/flag-icons.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { SITE } from "@/lib/site";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

/**
 * Font setup recovered from the production build:
 *   --font-brand     → Poppins  (site default, html font-family, weights 100–900)
 *   --font-secondary → Caveat   (handwritten accents, weights 400–700)
 * The stylesheet also imports flag-icons and react-toastify, both used by the
 * original markup (`fi fi-xx` flag spans, toast notifications).
 */
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    // Reference: pages without their own title render exactly "Abroadmates";
    // pages with one render "<title> | AbroadMates" (capital M).
    default: "Abroadmates",
    template: "%s | AbroadMates",
  },
  description: SITE.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${caveat.variable}`}>
      <body className="min-h-screen antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
