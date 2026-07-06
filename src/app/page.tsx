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
        <span className="font-mono text-acid text-xs sm:text-sm tracking-[0.25em] uppercase font-bold min-h-[1.5rem] flex items-center justify-center">
            {displayedText}
            <span className="w-1.5 h-3.5 bg-acid inline-block ml-1 animate-pulse" />
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

                <div className="z-10 flex flex-col items-center text-center gap-8 max-w-4xl">
                    <div className="space-y-4">
                        <h2 className="font-mono text-silver/40 text-[10px] tracking-[0.3em] uppercase">
                            PROFILE // ONLINE
                        </h2>
                        <div className="flex flex-col gap-0 leading-[0.85] text-center items-center">
                            <ExplodingText text="DIPTISH" size="xl" className="font-space tracking-tighter" />
                            <ExplodingText text="DE" size="xl" className="font-space tracking-tighter" />
                        </div>
                        
                        {/* Rotating Typewriter Title Element */}
                        <div className="h-6 flex items-center justify-center pt-2">
                            <TypewriterTitle words={titles} />
                        </div>
                    </div>

                    {/* Staggered Line Animation Description */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.2
                                }
                            }
                        }}
                        className="text-silver/80 max-w-md font-mono text-xs sm:text-sm leading-relaxed border-l border-acid/30 pl-6 text-left backdrop-blur-sm bg-black/30 p-6 space-y-4"
                    >
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                        >
                            I design interfaces, engineer products,  
                            and build communities around ideas.
                        </motion.p>
                        <motion.p
                            variants={{
                                hidden: { opacity: 0, x: -10 },
                                visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="text-silver/50"
                        >
                            Currently building <span className="text-white">EXIMARG</span> & <span className="text-white">BlueBloodExports (CTO)</span>,  
                            organizing <span className="text-white">DropoutHacks</span>,  
                            and shipping whatever refuses to leave my head.
                        </motion.p>
                    </motion.div>

                    <div className="flex flex-wrap gap-4 justify-center mt-2">
                        <div onClick={scrollToDossier}>
                            <CyberButton>
                                <span className="flex items-center gap-2">
                                    ENTER DOSSIER <ArrowRight className="w-4 h-4" />
                                </span>
                            </CyberButton>
                        </div>
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
