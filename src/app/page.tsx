"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GridBackground from "@/components/GridBackground";
import CyberButton from "@/components/ui/CyberButton";
import AboutSection from "@/components/AboutSection";
import OriginSection from "@/components/OriginSection";
import CurrentlyBuilding from "@/components/CurrentlyBuilding";
import ObsessionsSection from "@/components/ObsessionsSection";
import SkillsSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import GravityStrings from "@/components/hero/GravityStrings";
import ExplodingText from "@/components/hero/ExplodingText";
import LiquidDistortion from "@/components/hero/LiquidDistortion";
import SystemEntryOverlay from "@/components/hero/SystemEntryOverlay";
import WhoamiModal from "@/components/ui/WhoamiModal";
import DossierPlayer from "@/components/ui/DossierPlayer";
import CaffeineMonitor from "@/components/ui/CaffeineMonitor";
import { ArrowRight, Terminal } from "lucide-react";

// Typewriter Animation Component for rotating titles
function TypewriterTitle({ words }: { words: string[] }) {
    const [currentWordIdx, setCurrentWordIdx] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const typingSpeed = 100;
    const deletingSpeed = 40;
    const pauseTime = 1600;

    useEffect(() => {
        let timer: NodeJS.Timeout;
        const activeWord = words[currentWordIdx];

        if (isDeleting) {
            timer = setTimeout(() => {
                setDisplayedText(activeWord.substring(0, displayedText.length - 1));
            }, deletingSpeed);
        } else {
            timer = setTimeout(() => {
                setDisplayedText(activeWord.substring(0, displayedText.length + 1));
            }, typingSpeed);
        }

        // Deleting transition trigger
        if (!isDeleting && displayedText === activeWord) {
            timer = setTimeout(() => setIsDeleting(true), pauseTime);
        }
        
        // Next word trigger
        if (isDeleting && displayedText === "") {
            setIsDeleting(false);
            setCurrentWordIdx((prev) => (prev + 1) % words.length);
        }

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, currentWordIdx, words]);

    return (
        <span className="font-mono text-acid text-xs sm:text-sm tracking-[0.25em] uppercase font-bold min-h-[1.5rem] flex items-center justify-center gap-1.5">
            <span className="opacity-40 select-none">[</span>
            <span>{displayedText}</span>
            <span className="w-1.5 h-3.5 bg-acid inline-block animate-pulse ml-0.5" />
            <span className="opacity-40 select-none">]</span>
        </span>
    );
}

export default function Home() {
    const titles = ["PRODUCT ENGINEER", "DESIGNER", "BUILDER"];
    const [whoamiOpen, setWhoamiOpen] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    // whoami Easter Egg Key Listener
    useEffect(() => {
        let buffer = "";
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
            
            buffer += e.key.toLowerCase();
            if (buffer.endsWith("whoami")) {
                setWhoamiOpen(true);
                buffer = "";
            }
            if (buffer.length > 15) {
                buffer = buffer.substring(1);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const scrollToDossier = () => {
        const loreSection = document.querySelector('section[class*="min-h-screen"]');
        if (loreSection) {
            loreSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <>
            <SystemEntryOverlay onEnter={() => setIsInitialized(true)} />
            {isInitialized && (
                <>
                    <DossierPlayer />
                    <CaffeineMonitor />
                </>
            )}
            <WhoamiModal isOpen={whoamiOpen} onClose={() => setWhoamiOpen(false)} />
            <GridBackground />
            <LiquidDistortion />

            {/* Main Interactive Dossier Container */}
            <main className="relative min-h-screen flex flex-col items-center justify-center p-8 sm:p-20 overflow-hidden liquid-hero">
                <GravityStrings />

                {/* Top Left System Info */}
                <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] text-silver/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse shadow-[0_0_8px_#D7FF2F]" />
                    <span>DiPS_MAINFRAME // SYS_ONLINE</span>
                    <span className="text-acid">::</span>
                    <span>DOSSIER_V2.5</span>
                </div>

                {/* Main Interactive Dossier Grid */}
                <div className="z-10 w-full max-w-7xl px-4 flex flex-col md:grid md:grid-cols-12 md:gap-8 md:items-center py-6 relative">
                    
                    {/* Left Lore Block (Column 1 - md:col-span-3) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="md:col-span-3 font-mono text-xs sm:text-sm text-silver/60 text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-acid/20 pl-4 md:pl-0 md:pr-6 py-4 md:py-2 space-y-2 select-text bg-black/10 md:bg-transparent p-4 md:p-0"
                    >
                        <span className="text-acid font-bold text-[9px] tracking-wider block mb-1">
                            // CORE_STATEMENT
                        </span>
                        <p className="leading-relaxed">
                            I design interfaces, engineer products, and build communities around ideas.
                        </p>
                    </motion.div>

                    {/* Center Title Block (Column 2 - md:col-span-6) */}
                    <div className="md:col-span-6 flex flex-col items-center text-center gap-6 py-6 md:py-0">
                        <div className="space-y-6 w-full">
                            <h2 className="font-mono text-silver/40 text-[10px] tracking-[0.3em] uppercase">
                                PROFILE // ONLINE
                            </h2>
                            <div className="flex flex-col gap-6 leading-[0.85] text-center items-center w-full">
                                <ExplodingText text="DIPTISH" size="xl" className="font-space tracking-tighter" />
                                
                                {/* Rotating Typewriter Title Element in between DIPTISH and DE */}
                                <div className="h-8 flex items-center justify-center py-6 select-none">
                                    <TypewriterTitle words={titles} />
                                </div>

                                <ExplodingText text="DE" size="xl" className="font-space tracking-tighter" />
                            </div>

                            {/* Highly Prominent Console Prompt Message */}
                            <div className="pt-6 pb-2 flex flex-col items-center select-none">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-acid/10 border border-acid/20 text-acid text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(215,255,47,0.04)]">
                                    <span className="w-1.5 h-1.5 rounded-full bg-acid animate-ping shadow-[0_0_8px_#D7FF2F]" />
                                    Console Alert: Type &quot;whoami&quot; anywhere to launch secure shell terminal
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Lore Block (Column 3 - md:col-span-3) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="md:col-span-3 font-mono text-xs sm:text-sm text-silver/60 text-left border-l-2 border-acid/20 pl-4 py-4 md:py-2 space-y-2 select-text bg-black/10 md:bg-transparent p-4 md:p-0"
                    >
                        <span className="text-acid font-bold text-[9px] tracking-wider block mb-1">
                            // ACTIVE_MISSIONS
                        </span>
                        <p className="leading-relaxed text-silver/50">
                            Currently building <span className="text-white font-bold">EXIMARG</span> & <span className="text-white font-bold">BlueBloodExports (CTO)</span>, organizing <span className="text-white font-bold">DropoutHacks</span>, and shipping whatever refuses to leave my head.
                        </p>
                    </motion.div>
                </div>

                {/* Primary Call to Action Button */}
                <div className="z-10 flex justify-center mt-6 select-none">
                    <div onClick={scrollToDossier}>
                        <CyberButton>
                            <span className="flex items-center gap-2">
                                ENTER DOSSIER <ArrowRight className="w-4 h-4" />
                            </span>
                        </CyberButton>
                    </div>
                </div>

                {/* Bottom Left / Right Details */}
                <div className="absolute bottom-10 right-10 font-mono text-[10px] text-silver/30 flex flex-col items-end gap-1 select-none">
                    <span>LOC: 22.5726° N, 88.3639° E</span>
                    <span>MEM: 62% ACCESS_OK</span>
                    <span className="mt-4 animate-bounce text-acid">SCROLL TO ACCESS_RECORDS ▼</span>
                </div>
            </main>

            <OriginSection />
            <AboutSection />
            <CurrentlyBuilding />
            <ObsessionsSection />
            <SkillsSection />
            <Footer />
        </>
    );
}
