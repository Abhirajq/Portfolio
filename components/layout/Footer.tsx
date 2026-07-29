"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Heart } from "lucide-react";
import { FOOTER, SITE_CONFIG, CONTACT, NAV_LINKS } from "@/lib/constants";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";

interface FooterProps {
  /** Resolved on the server so SSR markup and hydration always agree. */
  year: number;
}

export default function Footer({ year }: FooterProps) {
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % FOOTER.quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const socials = [
    { Icon: GithubIcon, href: CONTACT.social.github, label: "GitHub", external: true },
    { Icon: LinkedinIcon, href: CONTACT.social.linkedin, label: "LinkedIn", external: true },
    { Icon: Mail, href: `mailto:${CONTACT.social.email}`, label: "Email", external: false },
  ];

  return (
    <footer className="relative border-t border-white/5">
      {/* Animated Neural Line */}
      <div className="absolute top-0 left-0 right-0 h-px overflow-hidden" aria-hidden="true">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-electric-blue to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{ width: "50%" }}
        />
      </div>

      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Left — Logo + Name */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric-blue to-ai-purple flex items-center justify-center text-sm font-bold text-white font-[family-name:var(--font-heading)]">
                AG
              </div>
              <span className="font-medium text-text-primary">{SITE_CONFIG.name}</span>
            </div>
            <p className="text-sm text-text-muted">AI / ML Engineer</p>
          </div>

          {/* Center — Navigation */}
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-4">
            {NAV_LINKS.slice(1).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-muted hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — Social Icons */}
          <div className="flex justify-center md:justify-end gap-3">
            {socials.map(({ Icon, href, label, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={label}
                className="p-2.5 rounded-full bg-white/5 border border-white/5 text-text-muted hover:text-text-primary hover:bg-white/10 hover:border-white/10 transition-all"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Rotating Quote */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <motion.p
            key={quoteIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm text-text-muted font-[family-name:var(--font-heading)] italic"
          >
            &quot;{FOOTER.quotes[quoteIndex]}&quot;
          </motion.p>
          <p className="mt-4 text-xs text-text-faint">
            © {year} {SITE_CONFIG.name}. Built with{" "}
            <Heart size={10} className="inline text-electric-blue" aria-label="love" /> and AI.
          </p>
        </div>
      </div>
    </footer>
  );
}
