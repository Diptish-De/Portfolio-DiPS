"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Shield, Activity, GitFork, Cpu } from "lucide-react";

interface Venture {
    id: string;
    title: string;
    description: string;
    statusText: string;
    progress: number; // 0 to 10
    link: string;
    icon: React.ReactNode;
}

const ventures: Venture[] = [
    {
        id: "01",
        title: "EXIMARG",
        description: "Co-founder managing technical infrastructure, from configuring secure mail servers to building core web applications.",
        statusText: "CO-FOUNDER // TECH",
        progress: 3.1,
        link: "/coming-soon?project=eximarg",
        icon: <Cpu className="w-5 h-5 text-acid" />
    },
    {
        id: "02",
        title: "BlueBloodExports",
        description: "Directing technology and systems as CTO for premium global export operations.",
        statusText: "SCALING // CTO",
        progress: 8.8,
        link: "https://www.bluebloodexports.com/",
        icon: <Activity className="w-5 h-5 text-acid" />
    },
    {
        id: "03",
        title: "DropoutHacks",
        description: "A build festival for people who'd rather create than compete.",
        statusText: "ORGANIZING",
        progress: 7.0,
        link: "https://www.dropouthacks.tech/",
        icon: <GitFork className="w-5 h-5 text-acid" />
    },
    {
        id: "04",
        title: "Moodrip",
        description: "A clothing brand inspired by Bengal, reimagined for Gen Z.",
        statusText: "OPERATIONAL",
        progress: 5.0,
        link: "/coming-soon?project=moodrip",
        icon: <Shield className="w-5 h-5 text-acid" />
    }
];

export default function CurrentlyBuilding() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef
    });

    // Translate vertical scroll into horizontal movement
    // Slide left by 52% on desktop to reveal all cards in the flex row
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-52%"]);

    const renderProgressBar = (progress: number) => {
        const totalBlocks = 10;
        const filledBlocks = Math.round(progress);
        const emptyBlocks = totalBlocks - filledBlocks;
        return (
            <span className="font-mono text-acid tracking-tighter text-xs">
                {"█".repeat(filledBlocks)}
                <span className="text-silver/20">{"░".repeat(emptyBlocks)}</span>
            </span>
        );
    };

    return (
        <>
            {/* Desktop Viewport Sticky Pinned Horizontal Scroll Section */}
            <div ref={targetRef} className="hidden md:block relative h-[165vh] bg-[#030303] border-t border-silver/10">
                <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
                    {/* Background Tech Details */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

                    {/* Section Header */}
                    <div className="container mx-auto px-16 max-w-7xl mb-12 relative z-10 flex items-end justify-between select-none">
                        <div className="flex flex-col gap-2">
                            <span className="text-acid font-mono text-xs tracking-[0.3em]">// MISSION_DATABASE</span>
                            <h2 className="text-4xl md:text-5xl font-space font-black tracking-tight uppercase text-white">
                                CURRENTLY BUILDING
                            </h2>
                        </div>
                        <span className="font-mono text-[10px] text-silver/30 animate-pulse uppercase tracking-wider mb-2">
                            [ SCROLL DOWN TO HORIZONTALLY TRANSIT DATABASE ▼ ]
                        </span>
                    </div>

                    {/* Sliding Dossier Cards Container */}
                    <div className="relative flex items-center">
                        <motion.div style={{ x }} className="flex gap-8 px-16 w-max">
                            {ventures.map((venture) => (
                                <div
                                    key={venture.id}
                                    className="group w-[380px] h-[340px] bg-black/60 border border-silver/10 hover:border-acid/30 transition-all duration-300 p-8 flex flex-col justify-between relative shadow-[0_4px_30px_rgba(0,0,0,0.4)] backdrop-blur-sm"
                                >
                                    {/* Tech Corner Details */}
                                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-acid/40 group-hover:border-acid transition-colors" />
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-acid/40 group-hover:border-acid transition-colors" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-acid/40 group-hover:border-acid transition-colors" />
                                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-acid/40 group-hover:border-acid transition-colors" />

                                    {/* Card Header */}
                                    <div className="flex justify-between items-start select-none">
                                        <span className="font-mono text-xs text-silver/30 group-hover:text-acid transition-colors font-bold">
                                            [{venture.id}]
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-[9px] text-silver/40 tracking-wider">
                                                SYS_STATUS: {venture.statusText}
                                            </span>
                                            {venture.icon}
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="space-y-3">
                                        <h3 className="font-space text-2xl font-bold uppercase text-white group-hover:text-acid transition-colors">
                                            {venture.title}
                                        </h3>
                                        <p className="text-silver/50 font-mono text-xs leading-relaxed h-[60px] overflow-hidden">
                                            {venture.description}
                                        </p>
                                    </div>

                                    {/* Card Footer */}
                                    <div className="border-t border-silver/10 pt-4 mt-2 flex justify-between items-center">
                                        <div className="space-y-1">
                                            <span className="font-mono text-[8px] text-silver/40 block">COMPLETION_TRACK</span>
                                            {renderProgressBar(venture.progress)}
                                        </div>
                                        <a
                                            href={venture.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="h-8 w-8 rounded-full border border-silver/10 group-hover:border-acid group-hover:bg-acid/10 flex items-center justify-center text-silver/40 group-hover:text-acid transition-all duration-300"
                                        >
                                            <ArrowUpRight className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Mobile Viewport Scrollable Stack */}
            <section className="md:hidden py-16 sm:py-24 bg-[#030303] border-t border-silver/10 px-6">
                <div className="container mx-auto">
                    {/* Header */}
                    <div className="mb-12 flex flex-col gap-2 select-none">
                        <span className="text-acid font-mono text-xs tracking-[0.3em]">// MISSION_DATABASE</span>
                        <h2 className="text-3xl font-space font-black tracking-tight uppercase text-white">
                            CURRENTLY BUILDING
                        </h2>
                    </div>

                    {/* Horizontally Scrollable Swipe Carousel for Small Screens */}
                    <div className="flex gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory -mx-6 px-6">
                        {ventures.map((venture) => (
                            <div
                                key={venture.id}
                                className="group bg-black/60 border border-silver/10 p-6 flex flex-col justify-between relative shadow-lg shrink-0 w-[290px] h-[330px] snap-center"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <span className="font-mono text-xs text-silver/30 font-bold">
                                        [{venture.id}]
                                    </span>
                                    <span className="font-mono text-[9px] text-silver/40 tracking-wider">
                                        SYS_STATUS: {venture.statusText}
                                    </span>
                                </div>

                                <div className="space-y-2 mb-6">
                                    <h3 className="font-space text-lg font-bold uppercase text-white line-clamp-1">
                                        {venture.title}
                                    </h3>
                                    <p className="text-silver/50 font-mono text-xs leading-relaxed line-clamp-4">
                                        {venture.description}
                                    </p>
                                </div>

                                <div className="border-t border-silver/10 pt-4 flex justify-between items-center mt-auto">
                                    <div className="space-y-1">
                                        <span className="font-mono text-[8px] text-silver/40 block">COMPLETION_TRACK</span>
                                        {renderProgressBar(venture.progress)}
                                    </div>
                                    <a
                                        href={venture.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 font-mono text-xs text-acid"
                                    >
                                        Explore <ArrowUpRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
