# Abhiraj Govind — AI/ML Engineering Portfolio

Personal portfolio built with Next.js 16 (App Router), React 19, Tailwind CSS v4,
Framer Motion and Recharts.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values below
npm run dev
```

Open http://localhost:3000.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL used by `sitemap.xml`, `robots.txt` and Open Graph tags. Defaults to `https://abhirajgovind.dev`. |
| `RESEND_API_KEY` | For the contact form | API key from [resend.com](https://resend.com). Without it the form returns an honest error and offers a `mailto:` fallback — it never fakes a successful send. |
| `CONTACT_TO_EMAIL` | Optional | Inbox that receives form submissions. Defaults to the address in `lib/constants.ts`. |
| `CONTACT_FROM_EMAIL` | Optional | Sender identity. Must stay `onboarding@resend.dev` until you verify a domain with Resend. |

## Content

Almost all copy lives in [`lib/constants.ts`](lib/constants.ts) — edit there rather
than in components.

Fields left as empty strings (`""`) are intentionally wired but unrendered, so
nothing half-finished ships. Fill them in as the underlying work lands:

- `PROJECTS[].links.github` / `.demo` / `.writeup` — project CTA buttons
- `PROJECTS[].evidence` — the baseline/dataset caption under each metric grid
- `RESEARCH.publication.authors` / `.venue` / `.url` — byline and "Read the paper"
- `EXPERIENCE.achievements[].metric` — quantified impact figures

Headline statistics (months of experience, project count, tool count) are derived
in [`lib/utils.ts`](lib/utils.ts) from `EXPERIENCE.startDate`, `PROJECTS` and
`SKILLS`, and computed on the server so the hero and About section can never
disagree with each other.

## Structure

```
app/
  api/contact/route.ts   contact form handler (Resend REST, honeypot, rate limit)
  opengraph-image.tsx    generated 1200x630 social card
  robots.ts, sitemap.ts  SEO routes derived from SITE_CONFIG
components/
  layout/Navbar.tsx      fixed nav with scroll-spy + mobile menu
  hero, about, projects, skills, research, contact
  shared/                GlowCard, SectionHeader, BrandIcons
lib/
  constants.ts           all site content
  schemas.ts             contact form validation, shared client + server
  utils.ts               derived stats
```

## Scripts

```bash
npm run dev     # development server
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Deploy

Deploys to [Vercel](https://vercel.com) with no extra configuration. Set the
environment variables above in the project settings for both Preview and
Production.
