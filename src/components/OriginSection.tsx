"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface OriginStep {
    phase: string;
    title: string;
    description: string;
    status: string;
    tag: string;
}

const steps: OriginStep[] = [
    {
        phase: "01 // THE SPARK",
        title: "ADOBE ILLUSTRATOR",
        description: "I started with vector design. Creating assets made me deeply curious about how digital interfaces behave and interact with humans.",
        status: "EVOLUTION // STAGE_1",
        tag: "VECTOR_DESIGN"
    },
    {
        phase: "02 // TRANSITION",
        title: "CURIOSITY INTO CODE",
        description: "Designing static screens wasn't enough. I wanted to bring them to life, which naturally pulled me into the world of software development.",
        status: "COMPILATION // STAGE_2",
        tag: "ENGINEERING"
    },
    {
        phase: "03 // ACCELERATION",
        title: "CODE INTO STARTUPS",
        description: "Building systems introduced me to the thrill of creating real products. I discovered the startup environment, where speed and utility rule.",
        status: "VELOCITY // STAGE_3",
        tag: "CTO_BUILD"
    },
    {
        phase: "04 // SYNTHESIS",
        title: "THE SWEET SPOT",
        description: "Now I spend most of my time somewhere between Figma wireframes, VS Code files, and whiteboards full of architecture ideas.",
        status: "OPTIMIZED // SYNTHESIS",
        tag: "FULLSTACK"
    }
];

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
                            <div 
                                key={idx} 
                                className={`flex flex-col md:flex-row gap-8 items-start relative ${
                                    isEven ? "md:flex-row-reverse" : ""
                                }`}
                            >
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
                                            <span className="font-mono text-acid text-xs tracking-wider block">{step.phase}</span>
                                            <span className="font-mono text-[9px] bg-white/5 border border-white/10 text-silver/60 px-1.5 py-0.5 rounded uppercase tracking-wider">{step.tag}</span>
                                        </div>

                                        <h3 className="font-space text-xl font-bold uppercase text-white mb-3 tracking-wide">{step.title}</h3>
                                        <p className="font-mono text-silver/60 text-xs md:text-sm leading-relaxed mb-4">
                                            {step.description}
                                        </p>

                                        {/* Status Bar */}
                                        <div className={`border-t border-silver/5 pt-3 flex items-center justify-between font-mono text-[9px] text-silver/40`}>
                                            <span>{step.status}</span>
                                            <span className="flex items-center gap-1">
                                                <span className="w-1 h-1 rounded-full bg-acid animate-pulse" />
                                                <span>SYSTEM_ACTIVE</span>
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Placeholder spacer to maintain alignment */}
                                <div className="hidden md:block flex-1" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
