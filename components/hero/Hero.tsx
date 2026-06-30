"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Download, ArrowRight } from "lucide-react";
import dynamic from "next/dynamic";
import { HERO } from "@/lib/constants";

const ThreeScene = dynamic(() => import("./ThreeScene"), {
  ssr: false,
});

// ============================================
// LOADING SCREEN
// ============================================
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Skip loading on repeat visits
    if (sessionStorage.getItem("portfolio-loaded")) {
      onComplete();
      return;
    }

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => {
        if (prev >= HERO.loadingMessages.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 400);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    const timeout = setTimeout(() => {
      sessionStorage.setItem("portfolio-loaded", "true");
      onComplete();
    }, 2500);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(timeout);
    };
  }, [onComplete]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] bg-bg-primary flex flex-col items-center justify-center"
    >
      {/* Neural dot grid background */}
      <div className="absolute inset-0 opacity-20">
        {mounted && Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-electric-blue"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-electric-blue to-ai-purple flex items-center justify-center text-2xl font-bold font-[family-name:var(--font-heading)] mb-8"
      >
        AG
      </motion.div>

      {/* Loading message */}
      <AnimatePresence mode="wait">
        <motion.p
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-sm text-text-secondary font-[family-name:var(--font-code)] mb-8"
        >
          {HERO.loadingMessages[messageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-electric-blue to-ai-purple rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </motion.div>
  );
}

// ============================================
// TYPING ANIMATION
// ============================================
function TypingText() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = HERO.typingTexts[textIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting && displayed.length < currentText.length) {
      timeout = setTimeout(() => {
        setDisplayed(currentText.slice(0, displayed.length + 1));
      }, 60);
    } else if (!isDeleting && displayed.length === currentText.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1));
      }, 30);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setTextIndex((prev) => (prev + 1) % HERO.typingTexts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, textIndex]);

  return (
    <span className="font-[family-name:var(--font-code)] text-electric-blue">
      {displayed}
      <span className="inline-block w-[2px] h-5 ml-1 bg-electric-blue align-middle" style={{ animation: "cursor-blink 1s step-end infinite" }} />
    </span>
  );
}

// ============================================
// FLOATING TECH BADGES
// ============================================
function FloatingBadges() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const positions = [
    { x: -35, y: -30 }, { x: 30, y: -35 },
    { x: -40, y: 0 }, { x: 38, y: 5 },
    { x: -30, y: 30 }, { x: 35, y: 28 },
    { x: -15, y: -40 }, { x: 20, y: 35 },
    { x: -42, y: 15 }, { x: 42, y: -15 },
  ];

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none hidden md:block">
      {HERO.techBadges.map((badge, i) => {
        const pos = positions[i % positions.length];
        return (
          <motion.div
            key={badge}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-1/2"
            style={{
              x: `calc(${pos.x}vw - 50%)`,
              y: `calc(${pos.y}vh - 50%)`,
            }}
          >
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
              className="px-3 py-1.5 text-xs font-medium glass rounded-full text-text-secondary border border-white/10 whitespace-nowrap"
            >
              {badge}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
}

// ============================================
// HERO SECTION
// ============================================
export default function Hero() {
  const [loaded, setLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setLoaded(true);
    setTimeout(() => setShowContent(true), 100);
  }, []);

  // Check sessionStorage on mount
  useEffect(() => {
    if (sessionStorage.getItem("portfolio-loaded")) {
      setLoaded(true);
      setShowContent(true);
    }
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric-blue/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-ai-purple/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neural-cyan/3 rounded-full blur-[150px]" />
      </div>

      {/* Loading Screen */}
      <AnimatePresence>
        {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}
      </AnimatePresence>

      {/* Three.js Background Constellation */}
      {showContent && <ThreeScene />}

      {/* Floating Badges */}
      {showContent && <FloatingBadges />}

      {/* Main Hero Content */}
      {showContent && (
        <div className="section-container relative z-10 text-center py-20">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold font-[family-name:var(--font-heading)] tracking-tight"
          >
            <span className="gradient-text">{HERO.name}</span>
          </motion.h1>

          {/* Title Stack */}
          <div className="mt-6 space-y-1">
            {["AI / ML ENGINEER", "LLM ENGINEER", "Applied AI Researcher"].map((title, i) => (
              <motion.p
                key={title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-heading)] ${
                  i === 0 ? "text-text-primary font-semibold" : "text-text-secondary font-normal"
                }`}
              >
                {title}
              </motion.p>
            ))}
          </div>

          {/* Typing Animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-6 h-7 flex items-center justify-center text-sm"
          >
            <TypingText />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="mt-6 text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed"
          >
            {HERO.description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA */}
            <a
              href={HERO.cta.primary.href}
              className="group relative px-8 py-3.5 rounded-full font-medium text-sm overflow-hidden transition-all duration-300 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-ai-purple rounded-full" />
              <div className="absolute inset-[1px] bg-bg-primary rounded-full" />
              <div className="absolute inset-[1px] bg-gradient-to-r from-electric-blue/20 to-ai-purple/20 rounded-full group-hover:from-electric-blue/30 group-hover:to-ai-purple/30 transition-all" />
              <span className="relative flex items-center gap-2">
                {HERO.cta.primary.label}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href={HERO.cta.secondary.href}
              className="group px-8 py-3.5 rounded-full font-medium text-sm text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary hover:bg-white/5 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                <Download size={16} />
                {HERO.cta.secondary.label}
              </span>
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            {[
              { label: "GitHub", href: "https://github.com/abhirajgovind", icon: (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              )},
              { label: "LinkedIn", href: "https://linkedin.com/in/abhirajgovind", icon: (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              )},
              { label: "Email", href: "mailto:abhiraj@example.com", icon: (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              )},
            ].map(({ label, href, icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="p-3 rounded-full bg-white/5 border border-white/5 text-text-muted hover:text-text-primary hover:bg-white/10 hover:border-white/10 hover:scale-110 transition-all duration-300"
              >
                {icon}
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 0.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-text-muted tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown size={20} className="text-text-muted" />
            </motion.div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
