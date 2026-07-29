"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Check,
  Copy,
  ChevronDown,
  ArrowRight,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { contactFormSchema, type ContactFormValues } from "@/lib/schemas";
import SectionHeader from "@/components/shared/SectionHeader";
import GlowCard from "@/components/shared/GlowCard";
import { GithubIcon, LinkedinIcon } from "@/components/shared/BrandIcons";

const inputClasses =
  "w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-sm text-text-primary placeholder:text-text-faint focus:border-electric-blue focus:outline-none transition-colors";

const labelClasses =
  "block text-xxs font-bold uppercase tracking-wider text-text-muted mb-2 font-[family-name:var(--font-heading)]";

export default function Contact() {
  const [isCopied, setIsCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(
          payload.error ?? "Something went wrong. Please email me directly.",
        );
        return;
      }

      setFormSubmitted(true);
      reset();
    } catch {
      setSubmitError(
        "Couldn't reach the server. Please check your connection or email me directly.",
      );
    }
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.social.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      // Clipboard can be blocked by permissions; the mailto link below still works.
    }
  };

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
                <span className="text-xxs text-text-muted uppercase tracking-wider font-[family-name:var(--font-code)]">
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
                type="button"
                onClick={handleCopyEmail}
                aria-label={`Copy email address ${CONTACT.social.email}`}
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
                  <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">
                    GitHub
                  </span>
                </a>

                <a
                  href={CONTACT.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
                >
                  <LinkedinIcon size={14} />
                  <span className="text-xs font-semibold font-[family-name:var(--font-heading)]">
                    LinkedIn
                  </span>
                </a>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-3">
              {CONTACT.faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx;

                return (
                  <div key={idx} className="border border-white/5 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      aria-expanded={isOpen}
                      className="w-full flex items-center justify-between p-4 bg-white/[0.01] hover:bg-white/[0.03] transition-colors text-left gap-4"
                    >
                      <span className="text-xs font-semibold text-text-primary font-[family-name:var(--font-heading)]">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="shrink-0"
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
                    noValidate
                  >
                    {/* Honeypot — hidden from humans, tempting to bots. */}
                    <div className="absolute w-px h-px -m-px overflow-hidden [clip:rect(0,0,0,0)]" aria-hidden="true">
                      <label htmlFor="website">Website</label>
                      <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...register("website")}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className={labelClasses}>
                          Name
                        </label>
                        <input
                          id="name"
                          {...register("name")}
                          type="text"
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          className={inputClasses}
                        />
                        {errors.name && (
                          <p role="alert" className="text-xxs text-soft-orange mt-1">
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="company" className={labelClasses}>
                          Company (Optional)
                        </label>
                        <input
                          id="company"
                          {...register("company")}
                          type="text"
                          autoComplete="organization"
                          className={inputClasses}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClasses}>
                        Email Address
                      </label>
                      <input
                        id="email"
                        {...register("email")}
                        type="email"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        className={inputClasses}
                      />
                      {errors.email && (
                        <p role="alert" className="text-xxs text-soft-orange mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="subject" className={labelClasses}>
                        Subject
                      </label>
                      <input
                        id="subject"
                        {...register("subject")}
                        type="text"
                        aria-invalid={!!errors.subject}
                        className={inputClasses}
                      />
                      {errors.subject && (
                        <p role="alert" className="text-xxs text-soft-orange mt-1">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="message" className={labelClasses}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        {...register("message")}
                        rows={4}
                        aria-invalid={!!errors.message}
                        className={`${inputClasses} resize-none`}
                      />
                      {errors.message && (
                        <p role="alert" className="text-xxs text-soft-orange mt-1">
                          {errors.message.message}
                        </p>
                      )}
                    </div>

                    {submitError && (
                      <div
                        role="alert"
                        className="flex items-start gap-3 p-4 rounded-xl bg-soft-orange/10 border border-soft-orange/30"
                      >
                        <AlertTriangle size={16} className="text-soft-orange shrink-0 mt-0.5" />
                        <div className="text-xs text-text-secondary leading-relaxed">
                          <p>{submitError}</p>
                          <a
                            href={`mailto:${CONTACT.social.email}`}
                            className="inline-block mt-1 font-semibold text-soft-orange hover:underline"
                          >
                            {CONTACT.social.email}
                          </a>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full group relative py-3.5 rounded-xl font-medium text-sm overflow-hidden flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-electric-blue to-ai-purple rounded-xl" />
                      <span className="relative flex items-center gap-2 text-white">
                        {isSubmitting ? (
                          <>
                            <Loader2 size={14} className="animate-spin" />
                            Sending…
                          </>
                        ) : (
                          <>
                            Let&apos;s Build Something Intelligent
                            <ArrowRight
                              size={14}
                              className="group-hover:translate-x-1 transition-transform"
                            />
                          </>
                        )}
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
                      Message Sent
                    </h3>
                    <p className="text-xs text-text-secondary max-w-sm mx-auto leading-relaxed">
                      Thanks for reaching out — your message landed in my inbox and I&apos;ll get
                      back to you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2 text-xs font-semibold rounded-full border border-white/10 text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
                    >
                      Send another message
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
