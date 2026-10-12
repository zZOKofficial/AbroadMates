import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dcrm3y8x2/image/upload/**",
      },
    ],
  },
  // Original site used root-level hyphenated URLs (see ROUTE-NOTES.md);
  // afterFiles rewrites map them onto the nested internal routes.
  async rewrites() {
    return [
      { source: "/scholarships-:slug", destination: "/scholarships/:slug" },
      { source: "/study-in-:slug", destination: "/study-in/:slug" },
      // Mentor profiles were at the site root (e.g. /md-ahnaf-farhan).
      // afterFiles: only fires when no static route matches, so
      // /mentors, /login, /our-story etc. are unaffected.
      { source: "/:slug", destination: "/mentors/:slug" },
    ];
  },
};

export default nextConfig;
