import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface OriginStep {
    phase: string;
    title: string;
    description: string;
    status: string;
    tag: string;
    logs: string[];
}

function DecryptText({ text, startTrigger = false }: { text: string; startTrigger?: boolean }) {
    const [displayText, setDisplayText] = useState("");
    
    useEffect(() => {
        if (!startTrigger) return;
        
        let iteration = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789%@#$&*[]{}<>";
        const target = text;
        let interval: NodeJS.Timeout;
        
        interval = setInterval(() => {
            setDisplayText(
                target
                    .split("")
                    .map((char, index) => {
                        if (char === " ") return " ";
                        if (index < iteration) {
                            return target[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );
            
            if (iteration >= target.length) {
                clearInterval(interval);
            }
            
            iteration += 1 / 2; // Scramble speed
        }, 25);
        
        return () => clearInterval(interval);
    }, [text, startTrigger]);

    return <span>{displayText || text}</span>;
}

function LogConsole({ logs, isActive }: { logs: string[]; isActive: boolean }) {
    const [visibleLines, setVisibleLines] = useState<string[]>([]);
    
    useEffect(() => {
        if (!isActive) {
            setVisibleLines([]);
            return;
        }
        
        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < logs.length) {
                setVisibleLines(prev => [...prev, logs[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
            }
        }, 300);
        
        return () => clearInterval(interval);
    }, [logs, isActive]);
    
    if (!isActive) return null;
    
    return (
        <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 p-3 bg-black/95 border border-acid/20 rounded font-mono text-[9px] sm:text-[10px] text-acid/80 leading-normal overflow-hidden select-none text-left"
        >
            <div className="flex items-center justify-between border-b border-acid/20 pb-1.5 mb-1.5 text-acid/40">
                <span>SYSTEM_LOG // CONSOLE_OUTPUT</span>
                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-ping" />
            </div>
            <div className="space-y-1 max-h-[120px] overflow-y-auto">
                {visibleLines.map((line, i) => (
                    <div key={i} className="flex gap-1.5 items-start">
                        <span className="opacity-40">&gt;</span>
                        <span>{line}</span>
                    </div>
                ))}
                {visibleLines.length < logs.length && (
                    <div className="flex items-center gap-1">
                        <span className="opacity-40">&gt;</span>
                        <span className="w-1 h-3 bg-acid/60 animate-pulse" />
                    </div>
                )}
            </div>
        </motion.div>
    );
}

const steps: OriginStep[] = [
    {
        phase: "01 // THE SPARK",
        title: "ADOBE ILLUSTRATOR",
        description: "I started with vector design. Creating assets made me deeply curious about how digital interfaces behave and interact with humans.",
        status: "EVOLUTION // STAGE_1",
        tag: "VECTOR_DESIGN",
        logs: [
            "[SYS] INITIALIZING VECTOR ENGINE...",
            "[OK] LOADED SVG_RENDERER",
            "[OK] EXPORTED: hero_v1.svg, logo_v2.ai",
            "[INFO] HUMAN INTERACTION PROTOCOLS LOADED"
        ]
    },
    {
        phase: "02 // TRANSITION",
        title: "CURIOSITY INTO CODE",
        description: "Designing static screens wasn't enough. I wanted to bring them to life, which naturally pulled me into the world of software development.",
        status: "COMPILATION // STAGE_2",
        tag: "ENGINEERING",
        logs: [
            "[SYS] COMPILING SOFTWARE ENV...",
            "[OK] NPM INSTALL SUCCESS // REACT v19.0",
            "[OK] WEBPACK COMPILATION SUCCESS: 1420ms",
            "[INFO] SHIFTING FROM DESIGN TO DYNAMIC LOGIC"
        ]
    },
    {
        phase: "03 // ACCELERATION",
        title: "CODE INTO STARTUPS",
        description: "Building systems introduced me to the thrill of creating real products. I discovered the startup environment, where speed and utility rule.",
        status: "VELOCITY // STAGE_3",
        tag: "CTO_BUILD",
        logs: [
            "[SYS] CONNECTING TO EXIMARG / BLUEBLOOD...",
            "[OK] DOCKER STACK DEPLOYED SUCCESS",
            "[OK] KUBERNETES AUTOSCALER: ACTIVE [3 NODES]",
            "[SUCCESS] MONETIZATION SYSTEMS ACTIVE"
        ]
    },
    {
        phase: "04 // SYNTHESIS",
        title: "THE SWEET SPOT",
        description: "Now I spend most of my time somewhere between Figma wireframes, VS Code files, and whiteboards full of architecture ideas.",
        status: "OPTIMIZED // SYNTHESIS",
        tag: "FULLSTACK",
        logs: [
            "[SYS] SYNTHESIZING ARCHITECTURE...",
            "[OK] FIGMA WIREFRAMES SYNCED TO VSCODE",
            "[OK] WHITEBOARD ARCHITECTURE COMPILED",
            "[STATUS] PROFILE DECRYPTED // ALL SYSTEMS OK"
        ]
    }
];

function TimelineCard({ step, isEven }: { step: OriginStep; isEven: boolean }) {
    const [inView, setInView] = useState(false);
    const [showLogs, setShowLogs] = useState(false);

    return (
        <div className={`flex flex-col md:flex-row gap-8 items-start relative ${
            isEven ? "md:flex-row-reverse" : ""
        }`}>
            {/* Center Node with glowing rings */}
            <div className="absolute left-6 md:left-1/2 top-6 md:top-1.5 -translate-x-1/2 z-20 flex items-center justify-center w-6 h-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, rotate: 45 }}
                    whileInView={{ scale: [1, 2.2], opacity: [0.5, 0], rotate: 45 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
                    className="absolute w-3 h-3 border border-acid bg-transparent"
                />
                <motion.div
                    initial={{ scale: 0.7, rotate: 45, backgroundColor: "#050505", borderColor: "rgba(255,255,255,0.2)" }}
                    whileInView={{ scale: 1, rotate: 45, backgroundColor: "#D7FF2F", borderColor: "#D7FF2F" }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-3 h-3 border-2 shadow-[0_0_10px_rgba(215,255,47,0.5)]"
                />
            </div>

            {/* Side Panel Content */}
            <motion.div 
                initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                onViewportEnter={() => setInView(true)}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 w-full pl-12 md:pl-0 md:text-left"
            >
                <div className={`group p-5 sm:p-8 bg-[#0a0a0a]/80 backdrop-blur-md border border-silver/10 hover:border-acid/40 transition-all duration-500 max-w-md relative overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.5)] ${
                    isEven ? "md:ml-auto md:text-right" : "md:mr-auto"
                }`}>
                    {/* Cyber Corner Marks */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-acid/30 group-hover:border-acid transition-colors duration-300" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-acid/30 group-hover:border-acid transition-colors duration-300" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-acid/30 group-hover:border-acid transition-colors duration-300" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-acid/30 group-hover:border-acid transition-colors duration-300" />

                    {/* Scanning laser sweep line on hover */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                            style={{
                                background: "linear-gradient(to bottom, transparent, rgba(215,255,47,0.15) 50%, transparent)"
                            }}
                            className="absolute left-0 right-0 h-8 -top-8 bg-acid/15"
                            animate={{
                                top: ["-20%", "120%"]
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 2,
                                ease: "linear"
                            }}
                        />
                    </div>

                    {/* Header Info */}
                    <div className={`flex items-center gap-3 mb-2 flex-wrap ${isEven ? "justify-end" : "justify-start"}`}>
                        <span className="font-mono text-acid text-xs tracking-wider block">
                            <DecryptText text={step.phase} startTrigger={inView} />
                        </span>
                        <span className="font-mono text-[9px] bg-white/5 border border-white/10 text-silver/60 px-1.5 py-0.5 rounded uppercase tracking-wider">{step.tag}</span>
                    </div>

                    <h3 className="font-space text-xl font-bold uppercase text-white mb-3 tracking-wide">
                        <DecryptText text={step.title} startTrigger={inView} />
                    </h3>
                    <p className="font-mono text-silver/60 text-xs md:text-sm leading-relaxed mb-4">
                        <DecryptText text={step.description} startTrigger={inView} />
                    </p>

                    {/* interactive Decrypt Logs button */}
                    <div className={`flex ${isEven ? "justify-end" : "justify-start"} mb-4`}>
                        <button
                            onClick={() => setShowLogs(!showLogs)}
                            className="text-[9px] font-mono text-acid/60 hover:text-acid border border-acid/20 hover:border-acid/60 px-2.5 py-1 bg-acid/5 hover:bg-acid/15 transition-all duration-200 uppercase tracking-widest cursor-pointer shadow-[0_0_10px_rgba(215,255,47,0.05)] hover:shadow-[0_0_15px_rgba(215,255,47,0.2)]"
                        >
                            {showLogs ? "[ CLOSE_CONSOLE ]" : "[ DECRYPT_LOG_CONSOLE ]"}
                        </button>
                    </div>

                    {/* Simulated terminal console */}
                    <LogConsole logs={step.logs} isActive={showLogs} />

                    {/* Status Bar */}
                    <div className="border-t border-silver/5 pt-3 flex items-center justify-between font-mono text-[9px] text-silver/40 mt-4">
                        <span>{step.status}</span>
                        <span className="flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-acid animate-pulse" />
                            <span>SYSTEM_ACTIVE</span>
                        </span>
                    </div>
                </div>
            </motion.div>

            {/* Placeholder spacer */}
            <div className="hidden md:block flex-1" />
        </div>
    );
}

export default function OriginSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section ref={containerRef} className="relative py-16 sm:py-32 bg-[#050505] overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl relative">
                {/* Header */}
                <div className="mb-12 sm:mb-24 flex flex-col gap-2 md:items-center md:text-center">
                    <span className="text-acid font-mono text-xs tracking-[0.3em]">[ DOSSIER_ORIGIN ]</span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-space font-black tracking-tight uppercase text-white">
                        THE ORIGIN STORY
                    </h2>
                </div>

                {/* Vertical Line */}
                <div className="absolute left-6 md:left-1/2 top-[120px] sm:top-[220px] bottom-10 w-px bg-silver/10 -translate-x-1/2">
                    <motion.div
                        style={{ scaleY }}
                        className="w-full bg-acid origin-top h-full shadow-[0_0_10px_#D7FF2F]"
                    />
                </div>

                {/* Timeline Grid */}
                <div className="space-y-12 sm:space-y-24 relative z-10">
                    {steps.map((step, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <TimelineCard key={idx} step={step} isEven={isEven} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
