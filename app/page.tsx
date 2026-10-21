import type { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TechStack from "@/components/TechStack";
import ProjectsSection from "@/components/ProjectsSection";
import AutomationsSection from "@/components/AutomationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VolcanoLavaBackground from "@/components/VolcanoLavaBackground";

function Panel({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 max-w-7xl rounded-3xl bg-slate-900/70 backdrop-blur-md border border-slate-800/80 mx-3 sm:mx-6 xl:mx-auto">
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <VolcanoLavaBackground />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Panel><TechStack /></Panel>
          <Panel><ProjectsSection /></Panel>
          <Panel><AutomationsSection /></Panel>
          <Panel><ContactSection /></Panel>
        </main>
        <Footer />
      </div>
    </>
  );
}
