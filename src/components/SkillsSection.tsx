"use client";

import { cn } from "@/lib/utils";

const languages = [
    "TYPESCRIPT", "JAVASCRIPT", "PYTHON", "JAVA", "C", "SQL"
];
const frameworks = [
    "NEXT.JS", "REACT", "TAILWIND", "NODE.JS", "POSTGRESQL", "FIREBASE", "FIGMA", "VERCEL"
];

function MarqueeRow({ items, reverse = false, colorClass = "hover:text-acid" }: { items: string[], reverse?: boolean, colorClass?: string }) {
    return (
        <div className="flex overflow-hidden">
            <div className={cn(
                "flex shrink-0 gap-8 py-4",
                reverse ? "animate-marquee-reverse" : "animate-marquee"
            )}>
                {items.map((tech, i) => (
                    <span
                        key={`a-${i}`}
                        className={cn(
                            "font-space font-bold text-6xl md:text-8xl px-4 text-white/10 transition-all duration-300 cursor-crosshair hover:scale-110 hover:skew-x-3",
                            colorClass
                        )}
                    >
                        {tech}
                    </span>
                ))}
            </div>
            {/* Duplicate for seamless loop */}
            <div className={cn(
                "flex shrink-0 gap-8 py-4",
                reverse ? "animate-marquee-reverse" : "animate-marquee"
            )}>
                {items.map((tech, i) => (
                    <span
                        key={`b-${i}`}
                        className={cn(
                            "font-space font-bold text-6xl md:text-8xl px-4 text-white/10 transition-all duration-300 cursor-crosshair hover:scale-110 hover:skew-x-3",
                            colorClass
                        )}
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default function SkillsSection() {
    return (
        <section className="relative py-16 sm:py-24 overflow-hidden bg-black border-y border-silver/10">
            <div className="absolute inset-0 bg-acid/5 mix-blend-overlay pointer-events-none" />

            <div className="container mx-auto px-6 mb-12 relative z-10">
                <span className="text-acid font-mono text-xs tracking-[0.3em]">[ SYSTEM_CAPABILITIES ]</span>
            </div>

            <div className="flex flex-col gap-4">
                <MarqueeRow items={languages} colorClass="hover:text-acid hover:drop-shadow-[0_0_20px_#CCFF00]" />
                <MarqueeRow items={frameworks} reverse colorClass="hover:text-cyan-400 hover:drop-shadow-[0_0_20px_#22D3EE]" />
            </div>
        </section>
    );
}
