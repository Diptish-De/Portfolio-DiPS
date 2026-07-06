"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CyberButton from "./ui/CyberButton";
import MagneticWrapper from "./ui/MagneticWrapper";
import { Github, Linkedin, Instagram } from "lucide-react";

// CountUp Component for premium stat counters
function CountUp({ end, suffix = "", duration = 1.5 }: { end: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const elementRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        let startTime: number | null = null;
        let animationFrameId: number;

        const handleScroll = () => {
            if (!elementRef.current) return;
            const rect = elementRef.current.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom >= 0;
            
            if (inView && count === 0) {
                const animateCount = (timestamp: number) => {
                    if (!startTime) startTime = timestamp;
                    const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
                    setCount(Math.floor(progress * end));
                    
                    if (progress < 1) {
                        animationFrameId = requestAnimationFrame(animateCount);
                    } else {
                        setCount(end);
                    }
                };
                animationFrameId = requestAnimationFrame(animateCount);
                window.removeEventListener("scroll", handleScroll);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
            cancelAnimationFrame(animationFrameId);
        };
    }, [end, duration, count]);

    return <span ref={elementRef}>{count}{suffix}</span>;
}

// Custom Progress Bar Component
function ProgressBar({ label, subtitle, progressVal }: { label: string; subtitle: string; progressVal: number }) {
    const [width, setWidth] = useState(0);
    const elementRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!elementRef.current) return;
            const rect = elementRef.current.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom >= 0;
            if (inView && width === 0) {
                setWidth(progressVal);
                window.removeEventListener("scroll", handleScroll);
            }
        };
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [progressVal, width]);

    const totalBlocks = 10;
    const filled = Math.round((width / 100) * totalBlocks);
    const empty = totalBlocks - filled;

    return (
        <div ref={elementRef} className="space-y-1 select-none">
            <div className="flex justify-between font-mono text-[9px] text-silver/40 tracking-wider">
                <span>{label}</span>
                <span>{subtitle}</span>
            </div>
            <div className="font-mono text-xs tracking-tighter">
                <span className="text-acid">{"█".repeat(filled)}</span>
                <span className="text-silver/10">{"░".repeat(empty)}</span>
            </div>
        </div>
    );
}

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const scrollToDossier = () => {
        const nextSection = document.querySelector('section[class*="py-32"]');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-background">
            <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">

                {/* Text Side */}
                <motion.div style={{ y: y1, opacity }} className="flex-1 space-y-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-acid font-mono text-sm tracking-widest">[ DOSSIER_LORE ]</span>
                        <h2 className="text-4xl md:text-6xl font-space font-black leading-[0.9] uppercase text-white">
                            DIGITAL <br />
                            <span className="text-silver/30">ALCHEMIST</span>
                        </h2>
                    </div>

                    {/* Terminal philosophy.sys file */}
                    <div className="p-6 border border-silver/10 bg-black/40 backdrop-blur-sm font-mono text-xs space-y-4 max-w-md select-text">
                        <div className="text-acid font-bold flex items-center justify-between">
                            <span>philosophy.sys</span>
                            <span className="text-silver/20 text-[9px]">READ_ONLY</span>
                        </div>
                        <div className="text-silver/20">----------------------------------</div>
                        <div className="space-y-3 text-silver/80 leading-relaxed">
                            <p>Design earns attention.</p>
                            <p>Engineering earns trust.</p>
                            <p>Shipping earns experience.</p>
                            <p className="text-acid">Repeat.</p>
                        </div>
                        <div className="text-silver/20">----------------------------------</div>
                    </div>

                    {/* Stats Widget (Animated progress bars) */}
                    <div className="p-6 border border-silver/10 bg-black/40 backdrop-blur-sm max-w-md space-y-5">
                        <div className="font-mono text-[10px] text-acid font-bold tracking-widest">
                            SYSTEM_STATUS
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <ProgressBar label="BUILDING" subtitle="EXIMARG" progressVal={100} />
                            <ProgressBar label="HOSTING" subtitle="DROPOUTHACKS" progressVal={80} />
                            <ProgressBar label="EXPERIMENTING" subtitle="AI WORKFLOWS" progressVal={70} />
                            <ProgressBar label="LEARNING" subtitle="PRODUCT THINKING" progressVal={90} />
                        </div>
                        <ProgressBar label="SLEEP" subtitle="WORK IN PROGRESS" progressVal={20} />
                    </div>

                    {/* Numeric stats with count-up */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-md pt-2 border-t border-silver/10 font-mono">
                        <div>
                            <div className="text-xs text-silver/40">Projects Built</div>
                            <div className="text-2xl font-bold text-acid">
                                <CountUp end={11} suffix="+" />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-silver/40">Hackathons</div>
                            <div className="text-2xl font-bold text-white">
                                <CountUp end={5} suffix="+" />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-silver/40">Design Exp</div>
                            <div className="text-2xl font-bold text-white">
                                <CountUp end={7} suffix=" Yrs" />
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-silver/40">Products Shipped</div>
                            <div className="text-sm font-bold text-acid mt-1">GROWING...</div>
                        </div>
                        <div>
                            <div className="text-xs text-silver/40">Ideas Killed</div>
                            <div className="text-2xl font-bold text-white">∞</div>
                        </div>
                    </div>

                    <div onClick={scrollToDossier} className="pt-4">
                        <CyberButton variant="outline">ENTER DOSSIER →</CyberButton>
                    </div>
                </motion.div>

                {/* Visual Side */}
                <motion.div style={{ y: y2, opacity }} className="flex-1 relative aspect-square w-full max-w-md">
                    {/* Social Icons + Live Label */}
                    <div className="absolute -top-20 left-0 z-10 flex flex-col md:flex-row gap-4 md:items-center">
                        <div className="flex gap-4">
                            {[
                                { Icon: Github, name: "GitHub", desc: "Where code lives.", href: "https://github.com/Diptish-De" },
                                { Icon: Linkedin, name: "LinkedIn", desc: "Where opportunities happen.", href: "https://linkedin.com/in/diptish-de" },
                                { Icon: Instagram, name: "Instagram", desc: "Where pixels escape.", href: "https://instagram.com/diptish.verse" }
                            ].map(({ Icon, name, desc, href }, i) => (
                                <MagneticWrapper key={i}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onMouseEnter={() => setHoveredSocial(`${name} // ${desc}`)}
                                        onMouseLeave={() => setHoveredSocial(null)}
                                        className="relative group block p-3 bg-black/80 border border-silver/20 hover:border-acid transition-all duration-300 overflow-hidden cursor-pointer"
                                    >
                                        <div className="absolute inset-0 bg-acid/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                        <Icon className="w-5 h-5 text-silver group-hover:text-acid relative z-10 transition-colors" />
                                    </a>
                                </MagneticWrapper>
                            ))}
                        </div>
                        {/* Interactive Status readout */}
                        <div className="font-mono text-[9px] tracking-widest text-acid/80 h-4 transition-all duration-300 uppercase">
                            {hoveredSocial ? hoveredSocial : "SYS_LINKS: READY"}
                        </div>
                    </div>

                    {/* Premium presentation: Floating image box with two offset frames */}
                    <motion.div 
                        animate={{ y: [0, -8, 0], rotate: [2, 3, 2] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative w-full h-full"
                    >
                        {/* Offset Frame 1 */}
                        <div className="absolute inset-0 border border-acid/20 rotate-3 transition-all duration-500 pointer-events-none" />
                        
                        {/* Offset Frame 2 */}
                        <div className="absolute inset-0 border border-cyan/15 -rotate-3 transition-all duration-500 pointer-events-none" />

                        {/* Core Image Container */}
                        <div className="absolute inset-4 overflow-hidden bg-black/40 border border-silver/10">
                            <img
                                src="/profile.png"
                                alt="Diptish De"
                                className="w-full h-full object-cover grayscale transition-all duration-500 group-hover:scale-105"
                            />
                            {/* Dark vignette overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                            {/* Scanline Sweep Animation */}
                            <motion.div 
                                animate={{ top: ["0%", "100%", "0%"] }} 
                                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-0.5 bg-acid/30 opacity-60 shadow-[0_0_8px_#D7FF2F] pointer-events-none"
                            />
                        </div>

                        {/* Labels */}
                        <div className="absolute bottom-6 right-6 flex flex-col items-end z-10 font-mono">
                            <span className="w-12 h-[2px] bg-acid mb-1.5 shadow-[0_0_8px_#D7FF2F]"></span>
                            <span className="text-[9px] text-acid tracking-[0.2em] font-bold">IDENTITY_VERIFIED</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
