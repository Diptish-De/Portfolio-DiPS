"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import GlitchText from "./ui/GlitchText";

interface ProjectCardProps {
    title: string;
    category: string;
    index: string;
    description: string;
    href: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    category,
    index,
    description,
    href,
}) => {
    return (
        <Link href={href} className="block group relative w-full h-72 kpr-border bg-[#0a0a0a] overflow-hidden">
            {/* Background Gradient / Image would go here */}
            <div className="absolute inset-0 bg-neutral-900/50 group-hover:bg-[#CCFF00]/10 transition-colors duration-300" />

            {/* Index Number */}
            <div className="absolute top-4 left-4 text-xs font-mono text-neutral-500 group-hover:text-[#CCFF00]">
                [{index}]
            </div>

            {/* Top Right Arrow */}
            <div className="absolute top-4 right-4 text-white group-hover:text-[#CCFF00] group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform">
                <ArrowUpRight size={24} />
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 border-t border-neutral-800 bg-[#0a0a0a]/90 backdrop-blur-sm group-hover:border-[#CCFF00]/50 transition-colors">
                <div className="text-xs font-mono text-[#00FFFF] mb-2 uppercase tracking-wider">
                    {category}
                </div>
                <h3 className="text-2xl font-bold uppercase text-white mb-2">
                    {/* <GlitchText text={title} size="md" /> */}
                    <span className="group-hover:text-[#CCFF00] transition-colors">{title}</span>
                </h3>
                <p className="text-sm text-neutral-400 line-clamp-2 group-hover:text-white transition-colors">
                    {description}
                </p>
            </div>

            {/* Decorative Corners */}
            <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-white/20" />
            <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-white/20" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-white/20" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-white/20" />
        </Link>
    );
};
