"use client";

import { useCallback, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

const THEME_EVENT = "themechange";

/**
 * The theme lives in the DOM (a `data-theme` attribute set before paint by
 * ThemeScript) and in the OS preference — both external stores. Reading them
 * with useSyncExternalStore rather than mirroring into useState avoids the
 * cascading render an effect-driven copy would cause.
 */
function subscribe(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  media.addEventListener("change", onChange);
  window.addEventListener(THEME_EVENT, onChange);
  return () => {
    media.removeEventListener("change", onChange);
    window.removeEventListener(THEME_EVENT, onChange);
  };
}

function getSnapshot(): Theme {
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "light" || attr === "dark") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

// The server cannot know the visitor's preference; the icons are swapped by
// CSS (see globals.css) so this only affects the accessible label.
const getServerSnapshot = (): Theme => "light";

export default function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next: Theme = getSnapshot() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* Storage blocked — the choice just won't persist across visits. */
    }
    window.dispatchEvent(new Event(THEME_EVENT));
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className="p-2 rounded-lg text-text-muted hover:text-text-primary hover:bg-tint-strong border border-transparent hover:border-line transition-colors"
    >
      {/* Both icons render; CSS shows the right one. Driving this from state
          would flash the wrong icon for a frame after hydration. */}
      <Moon size={17} className="icon-moon" aria-hidden="true" />
      <Sun size={17} className="icon-sun" aria-hidden="true" />
    </button>
  );
}
