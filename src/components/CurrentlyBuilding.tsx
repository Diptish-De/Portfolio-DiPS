"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

interface Venture {
    id: string;
    title: string;
    description: string;
    statusText: string;
    progress: number; // 0 to 10
    link: string;
}

const ventures: Venture[] = [
    {
        id: "01",
        title: "EXIMARG",
        description: "Making international trade less painful with AI.",
        statusText: "DEVELOPING",
        progress: 8,
        link: "https://eximarg.com"
    },
    {
        id: "02",
        title: "DropoutHacks",
        description: "A build festival for people who'd rather create than compete.",
        statusText: "ORGANIZING",
        progress: 7,
        link: "https://github.com/supratim1609/dropout_hacks"
    },
    {
        id: "03",
        title: "Moodrip",
        description: "A clothing brand inspired by Bengal, reimagined for Gen Z.",
        statusText: "OPERATIONAL",
        progress: 5,
        link: "https://moodrip.com"
    }
];

export default function CurrentlyBuilding() {
    const renderProgressBar = (progress: number) => {
        const totalBlocks = 10;
        const filledBlocks = Math.round(progress);
        const emptyBlocks = totalBlocks - filledBlocks;
        return (
            <span className="font-mono text-acid tracking-tighter">
                {"█".repeat(filledBlocks)}
                <span className="text-silver/20">{"░".repeat(emptyBlocks)}</span>
            </span>
        );
    };

    return (
        <section className="relative py-32 bg-background border-t border-silver/10 overflow-hidden">
            <div className="container mx-auto px-6 max-w-5xl">
                {/* Header */}
                <div className="mb-20 flex flex-col gap-2">
                    <span className="text-acid font-mono text-xs tracking-[0.3em]">[ MISSION_DATABASE ]</span>
                    <h2 className="text-4xl md:text-5xl font-space font-black tracking-tight uppercase text-white">
                        CURRENTLY BUILDING
                    </h2>
                </div>

                {/* Ventures List */}
                <div className="space-y-12">
                    {ventures.map((venture, idx) => (
                        <div key={venture.id} className="group">
                            {/* Horizontal Rule */}
                            {idx > 0 && <div className="w-full h-px bg-silver/10 mb-12" />}

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-4">
                                {/* Left Side: Index & Title & Description */}
                                <div className="flex-1 space-y-4">
                                    <div className="flex items-center gap-4">
                                        <span className="font-mono text-sm text-silver/30 font-bold group-hover:text-acid transition-colors">
                                            [{venture.id}]
                                        </span>
                                        <h3 className="font-space text-3xl md:text-4xl font-bold uppercase text-white group-hover:text-acid transition-colors">
                                            {venture.title}
                                        </h3>
                                    </div>
                                    <p className="text-silver/60 font-mono text-sm max-w-xl leading-relaxed">
                                        {venture.description}
                                    </p>
                                </div>

                                {/* Right Side: Progress Bar & Explore Button */}
                                <div className="flex flex-col md:items-end justify-center gap-6 min-w-[250px]">
                                    <div className="space-y-2 text-left md:text-right">
                                        <div className="font-mono text-[10px] text-silver/40 tracking-wider">
                                            SYS_STATUS // {venture.statusText}
                                        </div>
                                        <div className="text-lg md:text-xl font-bold">
                                            {renderProgressBar(venture.progress)}
                                        </div>
                                    </div>

                                    <a
                                        href={venture.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 font-mono text-xs text-silver/50 hover:text-acid transition-colors group-hover:underline"
                                    >
                                        Explore <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
