"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import GlitchText from "./ui/GlitchText";

const experience = [
    {
        year: "2024",
        title: "CO_FOUNDER",
        company: "MOODRIP",
        description: "Leading a custom clothing platform focused on student fashion, branding, and premium visuals.",
    },
    {
        year: "2024",
        title: "EVENT_MANAGER",
        company: "DROPOUT_HACKS",
        description: "Organizing and managing technical hackathon events for the developer community.",
    },
    {
        year: "2023",
        title: "UI/UX_DESIGNER",
        company: "FREELANCE",
        description: "Crafting digital experiences and interfaces for web and mobile applications.",
    },
    {
        year: "PRESENT",
        title: "STUDENT",
        company: "RCC_INSTITUTE_OF_IT",
        description: "Pursuing B.Tech while building scalable systems and exploring 3D web design.",
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
