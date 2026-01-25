"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import CyberButton from "./ui/CyberButton";
import MagneticWrapper from "./ui/MagneticWrapper";
import { Github, Linkedin, Instagram } from "lucide-react";

export default function AboutSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const scrollToProjects = () => {
        const projectsSection = document.querySelector('section[class*="h-[300vh]"]');
        if (projectsSection) {
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

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
                        I'm a Full Stack Developer and UI/UX Designer obsessed with how apps look, feel, and perform.
                    </p>

                    {/* Fun Fact Quote */}
                    <blockquote className="border-l-2 border-acid pl-4 italic text-silver/60 font-mono text-sm">
                        "If it looks boring, it's a bug. Even if the console is clean."
                    </blockquote>

                    {/* Stats Panel */}
                    <div className="p-6 border border-silver/20 bg-black/40 backdrop-blur-sm">
                        <ul className="space-y-4 font-mono text-sm text-silver/70">
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>PROJECTS</span>
                                <span className="text-acid">10+</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>HACKATHONS</span>
                                <span className="text-white">5+ PARTICIPATED</span>
                            </li>
                            <li className="flex justify-between border-b border-white/10 pb-2">
                                <span>STACK</span>
                                <span className="text-white">NEXT.JS + TAILWIND</span>
                            </li>
                            <li className="flex justify-between">
                                <span>COFFEE/DAY</span>
                                <span className="text-acid">∞</span>
                            </li>
                        </ul>
                    </div>

                    <div onClick={scrollToProjects}>
                        <CyberButton variant="outline">View_My_Work</CyberButton>
                    </div>
                </motion.div>

                {/* Visual Side - Moves Down (Parallax) */}
                <motion.div style={{ y: y2, opacity }} className="flex-1 relative aspect-square w-full max-w-md">
                    {/* Social Icons - Above the frame */}
                    <div className="absolute -top-16 left-0 z-10 flex gap-6 animate-scan pause-on-hover">
                        {[
                            { Icon: Github, href: "https://github.com/Diptish-De" },
                            { Icon: Linkedin, href: "https://linkedin.com/in/diptish-de" },
                            { Icon: Instagram, href: "https://instagram.com/diptish.verse" }
                        ].map(({ Icon, href }, i) => (
                            <MagneticWrapper key={i}>
                                <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="relative group block p-3 bg-black/80 border border-silver/20 hover:border-acid transition-all duration-300 overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-acid/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    <Icon className="w-5 h-5 text-silver group-hover:text-acid relative z-10 transition-colors" />
                                    {/* Glitch lines */}
                                    <div className="absolute top-0 left-0 w-full h-[1px] bg-acid/50 -translate-x-full group-hover:animate-glitch-pass" />
                                </a>
                            </MagneticWrapper>
                        ))}
                    </div>

                    {/* Profile Image with Cyber Frame */}
                    <div className="absolute inset-0 border-2 border-acid/30 rotate-3 transition-transform duration-700 hover:rotate-6"></div>
                    <div className="absolute inset-0 border-2 border-cyan/30 -rotate-3 transition-transform duration-700 hover:-rotate-6"></div>

                    <div className="absolute inset-4 overflow-hidden">
                        <img
                            src="/profile.png"
                            alt="Diptish De"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    </div>

                    <div className="absolute bottom-4 right-4 flex flex-col items-end z-10">
                        <span className="w-16 h-1 bg-acid mb-2"></span>
                        <span className="text-[10px] font-mono text-acid">IDENTITY_VERIFIED</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
