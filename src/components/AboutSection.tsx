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

// Highly Premium Minimal Progress Indicator
function MinimalProgressBar({ label, subtitle, progressVal }: { label: string; subtitle: string; progressVal: number }) {
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

    return (
        <div ref={elementRef} className="space-y-1.5 select-none font-mono text-xs">
            <div className="flex justify-between text-[9px] text-silver/40 tracking-wider">
                <span>{label} // {subtitle}</span>
                <span className="text-acid font-bold">{progressVal}%</span>
            </div>
            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${width}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-0 bottom-0 left-0 bg-acid shadow-[0_0_8px_#D7FF2F]"
                />
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

    // Editor-style line numbers array
    const lineNumbers = Array.from({ length: 22 }, (_, i) => String(i + 1).padStart(2, "0"));

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-background">
            <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-stretch gap-16 max-w-6xl mx-auto">

                {/* Left Side: Creative Editor Dossier Layout */}
                <motion.div style={{ y: y1, opacity }} className="flex-1 flex gap-6 relative">
                    
                    {/* Line Numbers Gutter (Highly creative, editor-like theme) */}
                    <div className="flex flex-col text-right font-mono text-[10px] text-silver/20 select-none space-y-4 pt-1 border-r border-silver/5 pr-4">
                        {lineNumbers.map(num => (
                            <span key={num} className={num === "02" || num === "08" || num === "15" ? "text-acid/40" : ""}>
                                {num}
                            </span>
                        ))}
                    </div>

                    {/* Content Column */}
                    <div className="flex-1 space-y-8">
                        {/* Header Panel */}
                        <div className="flex flex-col gap-2">
                            <span className="text-acid font-mono text-[10px] tracking-[0.3em] font-bold">
                                [ CLASSIFIED_DOSSIER // DE_DIPTISH ]
                            </span>
                            <h2 className="text-4xl md:text-5xl font-space font-black leading-[0.9] uppercase text-white tracking-tighter">
                                DIGITAL <span className="text-silver/30">ALCHEMIST</span>
                            </h2>
                        </div>

                        {/* Creative Interactive Terminal File */}
                        <div className="border border-silver/10 bg-[#070707] font-mono text-xs overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            {/* Terminal Tab Bar */}
                            <div className="flex justify-between items-center bg-black/60 px-4 py-2 border-b border-silver/10">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-acid" />
                                    <span className="text-silver/60 text-[9px] tracking-wider uppercase font-bold">philosophy.sys</span>
                                </div>
                                <span className="text-silver/30 text-[9px]">SZ: 2.14KB</span>
                            </div>
                            
                            {/* Terminal Content Panel */}
                            <div className="p-6 space-y-4 select-text bg-[#090909]/40 relative">
                                <div className="absolute top-2 right-2 text-[9px] text-silver/10 font-bold pointer-events-none select-none">
                                    SECTOR_0x4F
                                </div>
                                <div className="space-y-3 text-silver/70 leading-relaxed pl-4 border-l border-acid/20">
                                    <p className="hover:text-white transition-colors duration-300">
                                        <span className="text-acid/40 mr-2">&gt;</span>
                                        Design earns <span className="text-white font-bold">attention.</span>
                                    </p>
                                    <p className="hover:text-white transition-colors duration-300">
                                        <span className="text-acid/40 mr-2">&gt;</span>
                                        Engineering earns <span className="text-white font-bold">trust.</span>
                                    </p>
                                    <p className="hover:text-white transition-colors duration-300">
                                        <span className="text-acid/40 mr-2">&gt;</span>
                                        Shipping earns <span className="text-white font-bold">experience.</span>
                                    </p>
                                    <p className="text-acid hover:text-white transition-colors duration-300">
                                        <span className="text-acid/40 mr-2">&gt;</span>
                                        Repeat.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Segmented Hardware Diagnostic Bars */}
                        <div className="p-6 border border-silver/10 bg-[#070707] space-y-5 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                            <div className="flex justify-between items-center font-mono text-[9px] text-acid font-bold tracking-widest border-b border-silver/5 pb-2">
                                <span>SYSTEM_DIAGNOSTICS</span>
                                <span className="text-silver/30">MONITOR: ACTIVE</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                                <MinimalProgressBar label="BUILDING" subtitle="EXIMARG" progressVal={100} />
                                <MinimalProgressBar label="SCROLLING" subtitle="BLUEBLOOD" progressVal={90} />
                                <MinimalProgressBar label="HOSTING" subtitle="DROPOUTHACKS" progressVal={80} />
                                <MinimalProgressBar label="LEARNING" subtitle="PRODUCT THINKING" progressVal={90} />
                            </div>
                            <MinimalProgressBar label="SLEEP" subtitle="WORK IN PROGRESS" progressVal={20} />
                        </div>

                        {/* Creative Hardware Registers Stats Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs select-none">
                            {[
                                { reg: "REG_00", label: "Projects Built", val: <CountUp end={11} suffix="+" /> },
                                { reg: "REG_01", label: "Hackathons", val: <CountUp end={5} suffix="+" /> },
                                { reg: "REG_02", label: "Design Exp", val: <CountUp end={7} suffix=" Yrs" /> },
                                { reg: "REG_03", label: "Shipped", val: <span className="text-acid text-[10px] font-bold">GROWING</span> },
                                { reg: "REG_04", label: "Killed Ideas", val: "∞" }
                            ].map((item, idx) => (
                                <div key={idx} className="p-3 border border-silver/5 bg-black/20 hover:border-acid/20 transition-all duration-300 flex flex-col justify-between h-20">
                                    <div className="flex justify-between text-[8px] text-silver/20">
                                        <span>{item.reg}</span>
                                        <span>OK</span>
                                    </div>
                                    <div className="text-[10px] text-silver/50 tracking-tight">{item.label}</div>
                                    <div className="text-base font-bold text-white group-hover:text-acid">{item.val}</div>
                                </div>
                            ))}
                        </div>

                        <div onClick={scrollToDossier} className="pt-2">
                            <CyberButton variant="outline">ENTER DOSSIER →</CyberButton>
                        </div>
                    </div>
                </motion.div>

                {/* Visual Side */}
                <motion.div style={{ y: y2, opacity }} className="flex-1 relative aspect-square w-full max-w-md self-center">
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
