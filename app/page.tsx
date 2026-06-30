import HeroSection from "@/components/hero/HeroSection";
import About from "@/components/about/About";
import Projects from "@/components/projects/Projects";
import Skills from "@/components/skills/Skills";
import Research from "@/components/research/Research";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <HeroSection photoSrc="/profile.jpg" />

      {/* About & Experience */}
      <About />

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

