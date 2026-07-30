/**
 * Runs before first paint to stamp `data-theme` on <html>.
 *
 * Without this the page renders in the default (light) theme for one frame and
 * then snaps to dark for visitors who chose it — the classic theme flash. It
 * has to be an inline, render-blocking script in <body> (Next hoists it into
 * the document); a `useEffect` in a client component runs too late.
 *
 * Stored preference wins; otherwise we leave the attribute off entirely so the
 * `prefers-color-scheme` media query in globals.css stays in charge.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      document.documentElement.setAttribute('data-theme', stored);
    }
  } catch (e) {
    /* Private mode or blocked storage — fall back to the OS preference. */
  }
})();
`;

export default function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
