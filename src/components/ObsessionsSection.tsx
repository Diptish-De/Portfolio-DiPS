"use client";

import { motion } from "framer-motion";

const obsessions = [
    "Interfaces that feel alive",
    "AI that removes boring work",
    "Building products people actually use",
    "Communities over audiences",
    "Shipping before perfection"
];

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
};

export default function ObsessionsSection() {
    return (
        <section className="relative py-16 sm:py-32 bg-background border-t border-silver/10 overflow-hidden">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <div className="mb-12 sm:mb-20 flex flex-col gap-2">
                    <span className="text-acid font-mono text-xs tracking-[0.3em]">[ SYSTEM_INTERESTS ]</span>
                    <h2 className="text-3xl md:text-5xl font-space font-black tracking-tight uppercase text-white">
                        CURRENT OBSESSIONS
                    </h2>
                </div>

                {/* List */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="space-y-6"
                >
                    {obsessions.map((obsession, idx) => (
                        <motion.div
                            key={idx}
                            variants={itemVariants}
                            className="flex items-center gap-6 py-4 border-b border-silver/5 hover:border-acid/20 transition-all duration-300 group"
                        >
                            <span className="font-mono text-acid text-lg transition-transform duration-300 group-hover:translate-x-2">
                                →
                            </span>
                            <span className="font-mono text-lg md:text-xl text-silver/80 group-hover:text-white transition-colors tracking-wide leading-snug">
                                {obsession}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
