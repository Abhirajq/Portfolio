import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Research from "@/components/research/Research";
import Contact from "@/components/contact/Contact";
import { getStats } from "@/lib/utils";

export default function Home() {
  // Resolved on the server and passed down, so the time-derived experience
  // figure is identical in the SSR markup and after hydration.
  const stats = getStats();

  return (
    <>
      <Navbar />

      {/* Hero */}
      <HeroSection photoSrc="/profile.jpg" stats={stats} />

      {/* About & Experience */}
      <About stats={stats} />

      {/* Projects */}
      <Projects />

      {/* Skills */}
      <Skills />

      {/* Research */}
      <Research />

      {/* Contact */}
      <Contact />
    </>
  );
}
