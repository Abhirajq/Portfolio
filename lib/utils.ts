import { EXPERIENCE, PROJECTS, SKILLS } from "./constants";

// Simple classname merger
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Whole months elapsed since an ISO date, floored at 1. */
export function monthsSince(isoDate: string, now: Date = new Date()): number {
  const start = new Date(isoDate);
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  return Math.max(1, months);
}

export interface Stat {
  value: string;
  label: string;
}

/**
 * The headline numbers, derived from a single source of truth.
 *
 * Previously the hero claimed "2 Projects / 6+ Months" while About claimed
 * "3+ Major AI Projects / 2+ Years Building AI" — contradictions a careful
 * reader notices. Both sections now render from this one function.
 *
 * Called on the server (app/page.tsx) and passed down as props so the
 * time-dependent value is identical in the SSR markup and on the client.
 */
export function getStats(now: Date = new Date()): Stat[] {
  const months = monthsSince(EXPERIENCE.startDate, now);
  const technologies = new Set(
    SKILLS.categories.flatMap((category) => category.skills),
  ).size;

  return [
    { value: `${months}`, label: months === 1 ? "Month Applied AI" : "Months Applied AI" },
    { value: `${PROJECTS.length}`, label: "Production AI Projects" },
    { value: `${technologies}`, label: "Tools & Frameworks" },
    { value: "1", label: "Research Publication" },
  ];
}
