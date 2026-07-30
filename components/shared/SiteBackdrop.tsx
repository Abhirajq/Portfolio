/**
 * Fixed atmospheric layer behind the whole page.
 *
 * Every section used to sit on one flat value, which reads as unfinished
 * however good the layout is. These are very soft, very large colour fields —
 * the eye shouldn't register them as shapes, only as the page not being one
 * dead value.
 *
 * Fixed rather than per-section so the browser composites the (expensive) blur
 * once instead of repainting it on every scroll frame.
 *
 * Strength comes from `--t-aurora`, which drops on the light theme: the same
 * wash that reads as depth on near-black reads as a printing smudge on white.
 */
const BLOBS = [
  {
    // Top-left, cool blue — anchors the hero
    accent: "var(--t-blue)",
    style: { top: "-18%", left: "-12%", width: "min(56vw, 820px)", height: "min(56vw, 820px)" },
  },
  {
    // Mid-right, violet — carries the eye through About/Projects
    accent: "var(--t-purple)",
    style: { top: "22%", right: "-16%", width: "min(60vw, 900px)", height: "min(60vw, 900px)" },
  },
  {
    // Lower-centre, cyan — keeps the fold below Skills from going inert
    accent: "var(--t-cyan)",
    style: { bottom: "-22%", left: "28%", width: "min(52vw, 760px)", height: "min(52vw, 760px)" },
  },
];

export default function SiteBackdrop() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden bg-bg-primary">
      {BLOBS.map((blob, i) => (
        <div
          key={i}
          className="aurora-blob"
          style={{
            ...blob.style,
            background: `radial-gradient(circle, color-mix(in srgb, ${blob.accent} var(--t-aurora), transparent) 0%, transparent 68%)`,
          }}
        />
      ))}
    </div>
  );
}
