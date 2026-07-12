"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlitchText from "./ui/GlitchText";
import CyberButton from "./ui/CyberButton";
import { ArrowUpRight } from "lucide-react";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    link?: string;
}

const projects: Project[] = [
    {
        id: "01",
        title: "MOODRIP",
        category: "E-COMMERCE / FASHION",
        description: "Custom clothing platform for students with premium branding and visuals.",
        link: "https://moodrip.com",
    },
    {
        id: "02",
        title: "DROPOUT_HACKS",
        category: "COMMUNITY / EVENTS",
        description: "Hackathon platform for the rebellious developer community.",
        link: "https://github.com/supratim1609/dropout_hacks",
    },
    {
        id: "03",
        title: "PORTFOLIO_DIPS",
        category: "WEB / PORTFOLIO",
        description: "This KPR-inspired portfolio with immersive scroll effects.",
        link: "https://github.com/Diptish-De/Portfolio-DiPS",
    },
    {
        id: "04",
        title: "VACTRACKER",
        category: "HEALTH / SYSTEM",
        description: "Vaccination tracking system for managing health records.",
    },
];

export default function ProjectsSection() {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-[#050505] border-y border-silver/10">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">

                {/* Section Header */}
                <div className="absolute top-10 left-10 z-10 p-4 bg-black/80 backdrop-blur-md border border-silver/20">
                    <h2 className="text-acid font-mono text-xs tracking-[0.3em]">PROJECT_DATABASE</h2>
                </div>

                <motion.div style={{ x }} className="flex gap-16 px-16">
                    {/* Intro Card */}
                    <div className="flex-shrink-0 w-[400px] h-[500px] flex items-center justify-center">
                        <h3 className="text-6xl md:text-8xl font-black font-space text-transparent stroke-white" style={{ WebkitTextStroke: "1px #333" }}>
                            WORK
                        </h3>
                    </div>

                    {projects.map((project) => (
                        <a
                            key={project.id}
                            href={project.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative flex-shrink-0 w-[400px] md:w-[600px] h-[500px] bg-black border border-silver/20 flex flex-col justify-between p-8 hover:border-acid/50 transition-colors duration-300"
                        >
                            {/* Card Header */}
                            <div className="flex justify-between items-start">
                                <span className="font-mono text-4xl text-silver/20 font-bold group-hover:text-acid transition-colors">{project.id}</span>
                                <ArrowUpRight className="w-6 h-6 text-silver/50 group-hover:text-acid group-hover:rotate-45 transition-all duration-300" />
                            </div>

                            {/* Card Content */}
                            <div className="space-y-4">
                                <div className="inline-block px-2 py-1 border border-acid/30 text-acid text-[10px] font-mono tracking-widest uppercase">
                                    {project.category}
                                </div>
                                <GlitchText text={project.title} size="lg" />
                                <p className="text-silver/60 font-mono text-sm max-w-sm">
                                    {project.description}
                                </p>
                            </div>

                            {/* Hover Overlay Effect */}
                            <div className="absolute inset-0 bg-acid/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-acid opacity-0 group-hover:opacity-100 transition-opacity" />
                        </a>
                    ))}

                    {/* Outro Card */}
                    <div className="flex-shrink-0 w-[400px] h-[500px] flex flex-col items-center justify-center gap-6">
                        <span className="text-silver/50 font-mono text-sm">END OF RECORD</span>
                        <CyberButton variant="outline">View_All_Archives</CyberButton>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
