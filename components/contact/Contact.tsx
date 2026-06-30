"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Check,
  Copy,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

// Brand SVG for GitHub
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
import { CONTACT } from "@/lib/constants";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";

// ============================================
// FORM SCHEMAS (Zod validation)
// ============================================
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  subject: z.string().min(4, "Subject must be at least 4 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isCopied, setIsCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted data:", data);
    setFormSubmitted(true);
    reset();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT.social.email);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const faqs = [
    {
      q: "What roles are you looking for?",
      a: "I am actively seeking AI Engineer, Machine Learning Engineer, LLM Engineer, Applied AI, or Research Engineer roles.",
    },
    {
      q: "Which AI domains interest you most?",
      a: "Large Language Models (post-training, prompt engineering, RAG pipelines), Audio Deepfake detection, and adversarial robustness/AI Safety.",
    },
    {
      q: "Are you open to relocation?",
      a: "Yes, I am open to Remote, Hybrid, and onsite relocation based on the opportunity.",
    },
  ];

  return (
    <section id="contact" className="py-20 relative bg-bg-secondary/10">
      <div className="section-container relative z-10">
        <SectionHeader
          label="Contact"
          title={CONTACT.heading}
          subtitle="Let's build the future of artificial intelligence together."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-start">
          {/* Left Column — Availability & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                {CONTACT.message}
              </p>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                {CONTACT.submessage}
              </p>
            </div>

            {/* Availability status card */}
            <div className="glass rounded-[24px] p-6 md:p-8 border border-white/5 space-y-4 relative overflow-hidden">
              <div className="absolute top-4 right-4 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald"></span>
              </div>

              <div>
                <span className="text-[10px] text-text-muted uppercase tracking-wider font-[family-name:var(--font-code)]">
                  Availability Status
                </span>
                <h4 className="text-sm font-bold text-text-primary mt-1 font-[family-name:var(--font-heading)]">
                  Currently Open To
                </h4>
              </div>

              <div className="flex flex-wrap gap-2">
                {CONTACT.availability.map((role) => (
                  <span
                    key={role}
                    className="px-2.5 py-1 text-xxs font-medium rounded-full bg-emerald/5 border border-emerald/20 text-emerald"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Clipboard and Link buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-between p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 rounded-xl transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-electric-blue" />
                  <span className="text-xs font-semibold font-[family-name:var(--font-code)] text-text-secondary">
                    {CONTACT.social.email}
                  </span>
                </div>
                {isCopied ? (
                  <Check size={14} className="text-emerald" />
                ) : (
                  <Copy size={14} className="text-text-muted" />
                )}
              </button>

              <div className="flex gap-4">
                <a
                  href={CONTACT.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                >
                  <GithubIcon size={14} />
                  <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">GitHub</span>
                </a>

                <a
                  href={CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                >
                  {/* LinkedIn SVG */}
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">LinkedIn</span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;

                return (
                  <div key={idx} className="border border-white/5 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between p-4 bg-white/[0.01] hover:bg-white/[0.03] transition-colors text-left"
                    >
                      <span className="text-xs font-semibold text-text-primary font-[family-name:var(--font-heading)]">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={14} className="text-text-muted" />
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                      className="overflow-hidden bg-white/[0.005]"
                    >
                      <p className="p-4 border-t border-white/5 text-xs text-text-muted leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column — Contact Form */}
          <div className="lg:col-span-7">
            <GlowCard hover={false} glowColor="blue">
              <AnimatePresence mode="wait">
                {!formSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-2 font-[family-name:var(--font-heading)]">
                          Name
                        </label>
                        <input
                          {...register("name")}
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:border-electric-blue focus:outline-none transition-colors"
                        />
                        {errors.name && (
                          <p className="text-xxs text-soft-orange mt-1">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-2 font-[family-name:var(--font-heading)]">
                          Company (Optional)
                        </label>
                        <input
                          {...register("company")}
                          type="text"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:border-electric-blue focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-2 font-[family-name:var(--font-heading)]">
                        Email Address
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:border-electric-blue focus:outline-none transition-colors"
                      />
                      {errors.email && (
                        <p className="text-xxs text-soft-orange mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-2 font-[family-name:var(--font-heading)]">
                        Subject
                      </label>
                      <input
                        {...register("subject")}
                        type="text"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:border-electric-blue focus:outline-none transition-colors"
                      />
                      {errors.subject && (
                        <p className="text-xxs text-soft-orange mt-1">{errors.subject.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xxs font-bold uppercase tracking-wider text-text-muted mb-2 font-[family-name:var(--font-heading)]">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary focus:border-electric-blue focus:outline-none transition-colors resize-none"
                      />
                      {errors.message && (
                        <p className="text-xxs text-soft-orange mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative py-3.5 rounded-xl font-medium text-sm overflow-hidden flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-ai-purple rounded-xl" />
                      <span className="relative flex items-center gap-2">
                        {isSubmitting ? "Sending Pipeline..." : "Let's Build Something Intelligent"}
                        {!isSubmitting && <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />}
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full bg-emerald/10 border border-emerald/30 text-emerald flex items-center justify-center mx-auto mb-4">
                      <Check size={20} />
                    </div>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-heading)] text-text-primary">
                      Transmission Successful
                    </h3>
                    <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                      Your query has been serialized and injected into my message pipeline. I will respond to you shortly.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2 text-xs font-semibold rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                    >
                      Send another query
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlowCard>
          </div>
        </div>
      </div>
    </section>
  );
}
