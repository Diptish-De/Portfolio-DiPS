"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import GlitchText from "./ui/GlitchText";

const experience = [
    {
        year: "2024",
        title: "METAVERSE_ARCHITECT",
        company: "VOID_LABS",
        description: "Building decentralized virtual spaces and social protocols.",
    },
    {
        year: "2023",
        title: "FULL_STACK_DEV",
        company: "NEURAL_SYSTEMS",
        description: "Developed AI-driven interfaces for data visualization.",
    },
    {
        year: "2022",
        title: "FRONTEND_ENGINEER",
        company: "CYBER_CORP",
        description: "UI/UX implementation for high-traffic fintech applications.",
    },
];

export default function ExperienceSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    return (
        <section ref={containerRef} className="relative min-h-screen py-32 bg-background overflow-hidden">

            {/* Central Progress Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-silver/10 h-full">
                <motion.div
                    style={{ scaleY: scrollYProgress }}
                    className="absolute top-0 left-0 w-full bg-acid origin-top h-full shadow-[0_0_10px_#CCFF00]"
                />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="mb-24 text-center">
                    <h2 className="text-acid font-mono text-xs tracking-[0.3em] mb-4">[ CHRONICLES ]</h2>
                    <GlitchText text="EXPERIENCE_LOG" size="lg" />
                </div>

                <div className="flex flex-col gap-24">
                    {experience.map((item, index) => (
                        <div
                            key={index}
                            className={`relative flex items-center gap-12 md:gap-24 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                }`}
                        >
                            {/* Timeline Node */}
                            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-black border border-acid rotate-45 z-20">
                                <div className="absolute inset-0 bg-acid opacity-50 animate-pulse" />
                            </div>

                            {/* Content Card */}
                            <div className={`ml-16 md:ml-0 flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                <div className="inline-block p-6 border border-silver/10 bg-black/50 backdrop-blur-sm hover:border-acid/50 transition-colors duration-500 group">
                                    <span className="font-mono text-acid text-sm mb-2 block">{item.year}</span>
                                    <h3 className="font-space font-bold text-2xl text-white mb-1 group-hover:text-acid transition-colors">{item.title}</h3>
                                    <p className="font-mono text-silver/60 text-xs tracking-wider mb-4 uppercase">{item.company}</p>
                                    <p className="font-mono text-silver/50 text-sm max-w-sm leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {/* Empty Space for Grid Layout */}
                            <div className="hidden md:block flex-1" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
