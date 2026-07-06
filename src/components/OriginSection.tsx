"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface OriginStep {
    phase: string;
    title: string;
    description: string;
}

const steps: OriginStep[] = [
    {
        phase: "01 // THE SPARK",
        title: "ADOBE ILLUSTRATOR",
        description: "I started with vector design. Creating assets made me deeply curious about how digital interfaces behave and interact with humans."
    },
    {
        phase: "02 // TRANSITION",
        title: "CURIOSITY INTO CODE",
        description: "Designing static screens wasn't enough. I wanted to bring them to life, which naturally pulled me into the world of software development."
    },
    {
        phase: "03 // ACCELERATION",
        title: "CODE INTO STARTUPS",
        description: "Building systems introduced me to the thrill of creating real products. I discovered the startup environment, where speed and utility rule."
    },
    {
        phase: "04 // SYNTHESIS",
        title: "THE SWEET SPOT",
        description: "Now I spend most of my time somewhere between Figma wireframes, VS Code files, and whiteboards full of architecture ideas."
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
                                {/* Center Node */}
                                <div className="absolute left-6 md:left-1/2 top-6 md:top-1.5 w-3 h-3 bg-[#050505] border-2 border-acid rotate-45 -translate-x-1/2 z-20" />

                                {/* Side Panel Content */}
                                <div className="flex-1 w-full pl-12 md:pl-0 md:text-left">
                                    <div className={`p-5 sm:p-8 bg-[#0a0a0a] border border-silver/10 hover:border-acid/30 transition-colors duration-500 max-w-md ${
                                        isEven ? "md:ml-auto md:text-right" : "md:mr-auto"
                                    }`}>
                                        <span className="font-mono text-acid text-xs tracking-wider block mb-2">{step.phase}</span>
                                        <h3 className="font-space text-xl font-bold uppercase text-white mb-3 tracking-wide">{step.title}</h3>
                                        <p className="font-mono text-silver/60 text-xs md:text-sm leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>

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
