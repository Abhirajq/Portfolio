"use client";

import { motion } from "framer-motion";
import { Download, Star } from "lucide-react";
import Image from "next/image";

interface HeroSectionProps {
  photoSrc: string;
}

export default function HeroSection({ photoSrc }: HeroSectionProps) {
  const techStack = [
    "PyTorch",
    "TensorFlow",
    "Docker",
    "LLMs",
    "RAG",
    "AWS",
  ];

  const features = [
    { icon: "🧠", label: "LLM Engineering" },
    { icon: "🔍", label: "RAG Systems" },
    { icon: "🎙️", label: "Audio ML" },
    { icon: "📄", label: "Research" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a1a] text-[#f0f4ff] flex flex-col justify-between overflow-hidden">
      {/* Fixed Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a1a]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Left: Logo & Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#7c3aed] flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-[#6366f1]/20">
              AG
            </div>
            <span className="text-sm font-semibold tracking-wide text-[#f0f4ff]">
              Abhiraj Govind
            </span>
          </a>

          {/* Center: Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-[#64748b]">
            {["Home", "About", "Experience", "Projects", "Skills", "Research", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-[#f0f4ff] transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right: Resume Button */}
          <a
            href="/resume.pdf"
            className="px-5 py-2.5 rounded-full bg-[#6366f1] text-white text-xs font-semibold flex items-center gap-2 hover:bg-[#7c3aed] shadow-lg shadow-[#6366f1]/25 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>
      </header>

      {/* Main Grid Content */}
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center flex-grow py-12">
        {/* Left Column Content */}
        <div className="lg:col-span-7 space-y-8 flex flex-col justify-center">
          {/* Pill Badge */}
          <div className="self-start">
            <span className="px-3.5 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full border border-white/10 bg-[#0d1117]/60 text-[#64748b] font-[family-name:var(--font-mono)]">
              AI / ML ENGINEER
            </span>
          </div>

          {/* 3-Line Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
            I Build <br />
            <span className="inline-block bg-gradient-to-r from-[#6366f1] via-[#7c3aed] to-[#38bdf8] bg-clip-text text-transparent animate-gradient-shift">
              Intelligent
            </span>{" "}
            <br />
            AI Systems.
          </h1>

          {/* Monospace Subtext */}
          <p className="text-xs sm:text-sm text-[#64748b] font-[family-name:var(--font-mono)] leading-relaxed">
            PyTorch · TensorFlow · LLMs · RAG — from research to production.
          </p>

          {/* Tech Stack Row */}
          <div className="flex flex-wrap gap-2 pt-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-1.5 text-[10px] font-semibold rounded-full border border-white/5 bg-[#0d1117]/80 text-[#64748b] hover:border-[#6366f1]/50 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:text-white transition-all duration-300 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 2x2 Feature Grid */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            {features.map((feat, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl border border-white/5 bg-[#0d1117]/50 backdrop-blur-md flex items-center gap-4 hover:border-white/10 hover:bg-[#0d1117]/70 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-[#6366f1]/10 flex items-center justify-center text-lg">
                  {feat.icon}
                </div>
                <span className="text-xs font-bold text-[#f0f4ff]">
                  {feat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column Profile Grid */}
        <div className="lg:col-span-5 relative flex items-center justify-center min-h-[480px]">
          {/* Purple Radial Glow */}
          <div className="absolute w-[280px] h-[280px] rounded-full bg-[#7c3aed]/25 blur-[70px] pointer-events-none z-0" />

          {/* Profile Photo */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="relative w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] z-10 flex items-center justify-center"
          >
            <div className="relative w-[280px] h-[280px] rounded-full overflow-hidden border border-[#6366f1]/20 shadow-2xl shadow-[#6366f1]/10 bg-gradient-to-b from-white/5 to-transparent">
              <Image
                src={photoSrc}
                alt="Abhiraj Govind"
                fill
                className="object-cover scale-105"
                priority
              />
            </div>

            {/* Floating Accuracy Card (Top-Right) */}
            <div className="absolute -top-4 -right-4 z-20 animate-float-subtle">
              <div className="p-4 rounded-2xl border border-white/10 bg-[#0d1117]/85 backdrop-blur-md shadow-xl flex flex-col gap-1 w-[150px]">
                <div className="text-2xl font-black text-[#6366f1] leading-none">91%</div>
                <div className="text-[10px] font-bold text-[#64748b]">CNN-LSTM Accuracy</div>
                <div className="flex gap-0.5 text-yellow-400 mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={10} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Code Terminal (Bottom-Left) */}
            <div className="absolute -bottom-6 -left-8 z-20 animate-float-subtle" style={{ animationDelay: "1.5s" }}>
              <div className="p-4 rounded-xl border border-white/10 bg-[#0d1117]/90 backdrop-blur-md shadow-xl font-[family-name:var(--font-mono)] w-[180px]">
                <div className="flex items-center gap-1.5 mb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="text-[10px] leading-relaxed">
                  <span className="text-[#6366f1]">train_model</span>(data) <br />
                  <span className="text-[#6366f1]">evaluate</span>(pipeline) <br />
                  <span className="text-[#6366f1]">deploy</span>(api)
                </div>
              </div>
            </div>

            {/* Floating </> Icon (Right Edge) */}
            <div className="absolute top-[40%] -right-6 z-20 animate-float-subtle" style={{ animationDelay: "0.75s" }}>
              <div className="w-10 h-10 rounded-xl bg-[#6366f1] text-white flex items-center justify-center shadow-lg shadow-[#6366f1]/30 font-bold text-sm">
                &lt;/&gt;
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <footer className="w-full border-t border-white/5 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left Avatar details */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#6366f1]/30 bg-[#0d1117]">
              <Image
                src={photoSrc}
                alt="Abhiraj Govind Avatar"
                fill
                className="object-cover scale-110"
              />
            </div>
            <div>
              <div className="text-xs font-extrabold text-white">Abhiraj Govind</div>
              <div className="text-[10px] text-[#64748b]">AI/ML Engineer</div>
            </div>
          </div>

          {/* Right Statistics */}
          <div className="flex items-center gap-8">
            {[
              { num: "6+", label: "Months Exp" },
              { num: "2", label: "Projects" },
              { num: "1", label: "Paper" },
            ].map((stat, idx) => (
              <div key={idx} className="text-right">
                <span className="text-sm font-black text-[#6366f1] mr-1.5 font-[family-name:var(--font-mono)]">
                  {stat.num}
                </span>
                <span className="text-[10px] text-[#64748b] tracking-wider uppercase font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
