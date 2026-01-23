"use client";

import { cn } from "@/lib/utils";

const languages = [
    "TYPESCRIPT", "PYTHON", "RUST", "GO", "SOLIDITY", "C++", "JAVASCRIPT", "SQL"
];
const frameworks = [
    "NEXT.JS", "REACT", "TAILWIND", "NODE.JS", "THREE.JS", "FRAMER_MOTION", "POSTGRES", "DOCKER"
];

export default function SkillsSection() {
    return (
        <section className="relative py-32 overflow-hidden bg-black border-y border-silver/10">
            <div className="absolute inset-0 bg-acid/5 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 mb-16 relative z-10">
                <span className="text-acid font-mono text-xs tracking-[0.3em]">[ SYSTEM_CAPABILITIES ]</span>
            </div>

            <div className="flex flex-col gap-8 rotate-[-2deg] scale-105">
                {/* Row 1: Left to Right */}
                <div className="flex overflow-hidden group">
                    <div className="flex animate-marquee whitespace-nowrap gap-8">
                        {[...languages, ...languages, ...languages].map((tech, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "font-space font-bold text-6xl md:text-8xl text-transparent transition-all duration-300 hover:text-acid cursor-crosshair",
                                    i % 2 === 0 ? "stroke-white" : "stroke-silver/50"
                                )}
                                style={{ WebkitTextStroke: "1px currentColor" }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Row 2: Right to Left */}
                <div className="flex overflow-hidden group">
                    <div className="flex animate-marquee-reverse whitespace-nowrap gap-8">
                        {[...frameworks, ...frameworks, ...frameworks].map((tech, i) => (
                            <span
                                key={i}
                                className={cn(
                                    "font-space font-bold text-6xl md:text-8xl text-transparent transition-all duration-300 hover:text-cyan cursor-crosshair",
                                    i % 2 !== 0 ? "stroke-white" : "stroke-silver/50"
                                )}
                                style={{ WebkitTextStroke: "1px currentColor" }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
