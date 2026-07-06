import GridBackground from "@/components/GridBackground";
import CyberButton from "@/components/ui/CyberButton";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import ExperienceSection from "@/components/ExperienceSection";
import Footer from "@/components/Footer";
import GravityStrings from "@/components/hero/GravityStrings";
import ExplodingText from "@/components/hero/ExplodingText";
import LiquidDistortion from "@/components/hero/LiquidDistortion"; // Import
import SystemEntryOverlay from "@/components/hero/SystemEntryOverlay";
import { ArrowRight, Terminal } from "lucide-react";

export default function Home() {
    return (
        <>
            <SystemEntryOverlay />
            <GridBackground />
            <LiquidDistortion />

            {/* Apply liquid-hero class to main or specific elements */}
            <main className="relative min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 overflow-hidden liquid-hero">
                <GravityStrings />

                {/* Top Left Status */}
                <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-xs text-silver/60">
                    <span className="w-2 h-2 rounded-full bg-acid animate-pulse shadow-[0_0_8px_#CCFF00]" />
                    <span>SYSTEM ONLINE</span>
                    <span className="text-acid">::</span>
                    <span>V 2.0.4</span>
                </div>

                <div className="z-10 flex flex-col items-center text-center gap-8 max-w-4xl">
                    <div className="space-y-2">
                        <h2 className="font-mono text-acid text-sm tracking-[0.2em] uppercase mb-4">
                            Full Stack Dev & UI/UX Designer
                        </h2>
                        <div className="flex flex-col gap-0 leading-[0.9] text-center items-center">
                            <ExplodingText text="DIPTISH" size="xl" className="font-space tracking-tighter" />
                            <ExplodingText text="DE" size="xl" className="font-space tracking-tighter" />
                        </div>
                    </div>

                    <p className="text-silver/80 max-w-lg font-mono text-sm sm:text-base leading-relaxed border-l-2 border-acid/50 pl-4 text-left backdrop-blur-sm bg-black/20 p-4">
                        I build scalable web apps & craft digital experiences.
                        <br />
                        <span className="text-acid">{">"}</span> Co-Founder @Moodrip | RCCIIT
                    </p>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <CyberButton>
                            <span className="flex items-center gap-2">
                                Start_Sequence <ArrowRight className="w-4 h-4" />
                            </span>
                        </CyberButton>
                        <CyberButton variant="outline">
                            <span className="flex items-center gap-2">
                                <Terminal className="w-4 h-4" /> View_Protocols
                            </span>
                        </CyberButton>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-10 right-10 font-mono text-[10px] text-silver/40 flex flex-col items-end gap-1">
                    <span>COORDS: 24.34.11</span>
                    <span>MEM: 54% T-4</span>
                    <span className="mt-4 animate-bounce text-acid">SCROLL FOR DATA ▼</span>
                </div>
            </main>

            <AboutSection />
            <SkillsSection />
            <ExperienceSection />
            <ProjectsSection />
            <Footer />
        </>
    );
}
