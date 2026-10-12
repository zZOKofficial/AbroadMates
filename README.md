# AbroadMates

**An AI-powered super app for study abroad.**

AbroadMates connects aspiring international students with current international students and alumni through personalized, one-on-one mentorship.

This repository contains the AbroadMates web application, built with Next.js 15 and the App Router.

**Copyright © 2026 AbroadMates. All rights reserved.**

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Data Layer](#data-layer)
- [Configuration](#configuration)
- [Environment Variables](#environment-variables)
- [Implementation Status](#implementation-status)
- [License](#license)

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15, App Router, React Server Components |
| UI | React 19, TypeScript 5.7 |
| Styling | Tailwind CSS v4, Radix UI primitives |
| Motion | Framer Motion |
| Icons & Flags | lucide-react, flag-icons |
| Forms & Validation | Controlled React forms, Zod schemas |
| Utilities | date-fns, react-toastify, clsx, tailwind-merge, class-variance-authority |
| Fonts | Poppins and Caveat via `next/font/google` |

## Getting Started

### Requirements

- Node.js 18 or later
- npm

### Installation

Clone the repository, navigate to the project directory, and install the dependencies:

```bash
npm install
```

### Development

Start the local development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production

Build the application for production:

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

The application UI can run without environment variables. Optional service integrations can be configured using the variables described in the [Environment Variables](#environment-variables) section.

## Project Structure

```text
app/
  (auth)/                 Authentication and registration routes
  (public)/               Public-facing pages
  legals/                 Legal and policy pages
  sessions/               Group sessions and registration
  services/[service]/     Study-abroad service pages
  become-an-abroadmate/   Mentor application page
  chat-with-founders/     Founders chat page
  contact/                Contact page
  our-story/              About page
  page.tsx                Homepage
  layout.tsx              Root layout, fonts, metadata and navigation
  globals.css             Global styles and theme tokens
  not-found.tsx           Custom 404 page

components/
  layout/                 Site header and footer
  home/                   Homepage sections
  services/               Mentor directory and mentor cards
  sessions/               Session cards and registration form
  auth/                   Authentication and registration components
  faq/                    FAQ components
  contact/                Contact form components
  become-an-abroadmate/   Mentor application components
  ui/                     Shared UI primitives

data/
  mentors.ts              Mentor profiles and related information
  sessions.ts             Group session content
  faq.ts                  Frequently asked questions
  scholarships.ts         Scholarship programs
  countries.ts            Study-abroad destinations
  services.ts             Service page definitions
  topics.ts               Topic descriptions and icon mappings
  _raw/                   Structured source data snapshots

lib/
  site.ts                 Site constants and navigation links
  cloudinary.ts           Cloudinary image URL helpers
  utils.ts                Shared utilities

public/
  favicon and logos
  SVG illustrations
  images/                 Mentor photos, hero images and other assets

ROUTE-NOTES.md            Route reference
.env.example              Environment variable template
next.config.ts            Next.js configuration
tsconfig.json             TypeScript configuration
```

## Routes

The application includes the following pages and route groups.

| Route | Description |
|---|---|
| `/` | Homepage with hero, statistics, scholarships, destinations, sessions, pricing, comparisons, team and FAQ preview |
| `/faq` | Frequently asked questions with 16 entries and accordion interactions |
| `/our-story` | About AbroadMates |
| `/contact` | Contact page and form interface |
| `/chat-with-founders` | Founders chat page |
| `/become-an-abroadmate` | Mentor application page |
| `/legals/terms-service` | Terms and conditions |
| `/legals/privacy-policy` | Privacy policy |
| `/legals/commerce-disclosure` | Commerce disclosure |
| `/legals/bengali` | Legal information in Bengali |
| `/login` | Login interface |
| `/register` | Registration entry point |
| `/register/form` | Registration form |
| `/register/mentor/sign-up` | Mentor registration interface |
| `/sessions` | Group sessions listing |
| `/sessions/[slug]` | Session details, learning outcomes, roadmap and testimonials |
| `/sessions/[slug]/register` | Session registration interface |
| `/services/[service]` | Study-abroad service pages with a shared mentor directory |
| Unmatched routes | Custom 404 page |

The session listing includes nine group sessions, and the service section contains six service pages.

## Data Layer

Application content is organized into structured TypeScript modules under `data/`.

| File | Contents |
|---|---|
| `mentors.ts` | 11 mentor profiles, including experience, pricing, topics and time zones |
| `sessions.ts` | Nine group sessions with summaries and structured content |
| `faq.ts` | 16 frequently asked questions with categories |
| `scholarships.ts` | 12 scholarship programs and mentor associations |
| `countries.ts` | 12 study-abroad destinations |
| `services.ts` | Six service page definitions |
| `topics.ts` | Topic descriptions and icon mappings |
| `data/_raw/` | Structured JSON data used by the application |

The data layer provides a consistent source of content for the homepage, service pages, mentor directory, session listings and related components.

### Mentor Images

Mentor photos and session cover images use Cloudinary public IDs. Image delivery URLs are generated through the following helpers in `lib/cloudinary.ts`:

- `cloudinaryUrl()`
- `cloudinaryAvatar()`
- `cloudinaryCover()`

Cloudinary image delivery is configured through the application's Next.js image settings.

## Configuration

### Next.js

`next.config.ts` configures Cloudinary as an allowed remote image source and defines URL rewrites for the application's supported route patterns.

### Styling and Theme

`app/globals.css` defines the Tailwind CSS v4 theme, including brand colors, radii and shadows.

| Token | Value |
|---|---|
| Primary | `#da1f26` |
| Secondary / Accent | `#f4a300` |
| Highlight | `#6c63ff` |

### Typography

- **Poppins:** Primary brand font, used throughout the interface.
- **Caveat:** Secondary font for handwritten-style accents.

Both fonts are configured through `next/font/google`.

### Metadata

Page metadata is configured through the Next.js App Router. Pages can define their own titles and metadata while sharing the root layout.

### TypeScript Aliases

The `@/*` path alias maps to the repository root, allowing application modules to use consistent absolute imports.

## Environment Variables

Copy `.env.example` to `.env.local` if you need to configure optional integrations.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary image delivery configuration |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID |
| `NEXT_PUBLIC_FACEBOOK_PIXEL_ID` | Meta Pixel configuration |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity project ID |
| `DATABASE_URL` | Database connection string for backend integration |
| `AUTH_SECRET` | Secret for authentication implementation |

The Cloudinary cloud name is configured as `dcrm3y8x2`. Analytics and backend variables are configuration points for their respective integrations; setting these values alone does not implement the associated functionality.

## Implementation Status

The application provides the main website experience, page layouts, shared components, structured content and interactive UI elements.

Some features currently provide the frontend interface without a complete backend integration. These include:

- **Authentication:** Login, registration, Google Sign-In and Turnstile integration.
- **Mentor discovery:** The directory uses the local dataset in `data/mentors.ts`. Dynamic API-based catalog retrieval is not currently implemented.
- **Mentor booking:** Live availability and calendar booking require backend integration. Booking slots display a fallback when availability is unavailable.
- **Session registration:** Registration interfaces are present; submission requires a functioning backend.
- **Contact forms:** The form interface is implemented; message delivery requires a configured service or API.
- **Analytics:** Google Analytics, Meta Pixel, Microsoft Clarity and Vercel Analytics require their respective integrations.

The current mentor dataset contains 11 profiles. Directory content and mentor associations are based on the records available in the application. Live availability, account management, form processing and other server-dependent behavior should be verified separately from the frontend.

## License

**Copyright © 2026 AbroadMates. All rights reserved.**

This repository and its contents are the property of AbroadMates. No license is granted to reproduce, distribute, modify or use the code, design assets or proprietary content without prior permission from the rights holder.