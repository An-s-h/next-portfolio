import Intro from "@/components/Intro";
import { Meteors } from "@/components/magicui/meteors";
import Image from "next/image";
import WorkExperience from "@/components/WorkExperience";
import Education from "@/components/Education";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { CustomDock } from "@/components/ui/CustomDock";


export default function Home() {
  return (
  <main className="flex min-h-screen flex-col md:gap-12 gap-8 md:p-24 p-10 relative overflow-hidden lg:w-7/12 sm:w-full mx-auto">
      <div className="fixed inset-0 pointer-events-none light-mode-fade-bottom dark:fade-bottom z-10 bg-white/10 dark:bg-black/10" />
      <CustomDock />
      <Intro />
      <Projects />
      <Skills />
      <Education />
      <Contact />
      <Meteors number={80} />
    </main>
  );
}
