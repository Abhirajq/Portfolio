"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  // Scroll-spy: highlight whichever section is currently in view.
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.getElementById(link.href.slice(1)),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActiveSection(visible.target.id);
      },
      // Bias the detection band toward the upper viewport so the highlight
      // changes as a section's heading reaches reading position.
      { rootMargin: "-20% 0px -60% 0px", threshold: [0.1, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Close on Escape and lock background scroll while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-md border-b border-white/5">
      <nav
        aria-label="Primary"
        className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between gap-4"
      >
        {/* Logo & Name */}
        <a href="#home" className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-electric-blue to-ai-purple flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-electric-blue/20">
            AG
          </div>
          <span className="text-sm font-semibold tracking-wide text-text-primary">
            {SITE_CONFIG.name}
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6 text-xs font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative py-1 transition-colors ${
                    isActive
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-electric-blue"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={SITE_CONFIG.resume}
            download
            className="px-4 sm:px-5 py-2.5 rounded-full bg-electric-blue text-white text-xs font-semibold flex items-center gap-2 hover:bg-ai-purple shadow-lg shadow-electric-blue/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Download size={14} />
            <span className="hidden sm:inline">Download Resume</span>
            <span className="sm:hidden">Resume</span>
          </a>

          {/* Mobile toggle — below `md` there was previously no navigation at all. */}
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            className="md:hidden p-2 -mr-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-white/5 transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-t border-white/5 bg-bg-primary/95 backdrop-blur-md"
          >
            <ul className="px-6 py-2 flex flex-col">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block py-3 text-sm font-medium border-b border-white/5 last:border-b-0 transition-colors ${
                        isActive
                          ? "text-electric-blue"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
