"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import GlitchText from "./ui/GlitchText";
import CyberButton from "./ui/CyberButton";

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section ref={containerRef} className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
            <div className="container px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center gap-16 max-w-6xl mx-auto">

                {/* Text Side - Moves Up Faster */}
                <motion.div style={{ y: y1, opacity }} className="flex-1 space-y-8">
                    <div className="flex flex-col gap-2">
                        <span className="text-acid font-mono text-sm tracking-widest">[ LORE ]</span>
                        <h2 className="text-4xl md:text-6xl font-space font-bold leading-[0.9]">
                            DIGITAL <br />
                            <span className="text-silver/50">ALCHEMIST</span>
                        </h2>
                    </div>

                    <p className="text-silver/80 font-mono text-lg max-w-md leading-relaxed">
                        I craft digital experiences that blur the line between utility and art.
                        Born in the code, raised in the metaverse.
                    </p>

                    <div className="p-6 border border-silver/20 bg-black/40 backdrop-blur-sm">
                        <ul className="space-y-4 font-mono text-sm text-silver/70">
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>CLASS</span>
                                <span className="text-acid">CYBER_WEAVER</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>LEVEL</span>
                                <span className="text-white">FULL_STACK_DEV</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>ORIGIN</span>
                                <span className="text-white">EARTH_616</span>
                            </li>
                        </ul>
                    </div>

                    <CyberButton variant="outline">Execute_Protocol_01</CyberButton>
                </motion.div>

                {/* Visual Side - Moves Down (Parallax) */}
                <motion.div style={{ y: y2, opacity }} className="flex-1 relative aspect-square w-full max-w-md">
                    {/* Abstract Cyber Shape */}
                    <div className="absolute inset-0 border-2 border-acid/30 rotate-3 transition-transform duration-700 hover:rotate-6"></div>
                    <div className="absolute inset-0 border-2 border-cyan/30 -rotate-3 transition-transform duration-700 hover:-rotate-6 bg-black/50 backdrop-blur-sm"></div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <GlitchText text="404" size="xl" className="text-9xl opacity-10 pointer-events-none" />
                    </div>

                    <div className="absolute bottom-4 right-4 flex flex-col items-end">
                        <span className="w-16 h-1 bg-acid mb-2"></span>
                        <span className="text-[10px] font-mono text-acid">SYS_DIAGNOSTIC_RUNNING</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
