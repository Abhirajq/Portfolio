import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG, CONTACT, EXPERIENCE, RESEARCH } from "@/lib/constants";
import Footer from "@/components/layout/Footer";
import SiteBackdrop from "@/components/shared/SiteBackdrop";
import ThemeScript from "@/components/shared/ThemeScript";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  // Required for og:image, canonical and sitemap URLs to resolve absolutely.
  metadataBase: new URL(SITE_CONFIG.url),
  title: SITE_CONFIG.title,
  description: SITE_CONFIG.description,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "AI Engineer",
    "Machine Learning Engineer",
    "LLM Engineer",
    "PyTorch",
    "TensorFlow",
    "RAG",
    "Deep Learning",
    "Production AI",
    "Applied AI",
    "Machine Learning Portfolio",
    "Transformers",
    "Artificial Intelligence",
  ],
  authors: [{ name: SITE_CONFIG.name, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.name,
  openGraph: {
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    siteName: `${SITE_CONFIG.name} — Portfolio`,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  // Browser UI follows whichever theme the visitor resolved to.
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fafc" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a1a" },
  ],
  colorScheme: "light dark",
};

// Structured data — helps search engines associate the site with the person,
// their employer and their profiles. Every field below is drawn from constants.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  jobTitle: "AI/ML Engineer",
  description: SITE_CONFIG.description,
  email: `mailto:${CONTACT.social.email}`,
  worksFor: {
    "@type": "Organization",
    name: EXPERIENCE.company,
  },
  sameAs: [CONTACT.social.github, CONTACT.social.linkedin],
  knowsAbout: RESEARCH.interests,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-bg-primary text-text-primary antialiased">
        <ThemeScript />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-electric-blue focus:text-white focus:text-sm focus:font-semibold"
        >
          Skip to content
        </a>
        <SiteBackdrop />
        <main id="content">{children}</main>
        <Footer year={new Date().getFullYear()} />
        <script
          type="application/ld+json"
          // Serialised from a local literal, not user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
