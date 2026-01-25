"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlitchTextProps {
    text: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export default function GlitchText({ text, className, size = "md" }: GlitchTextProps) {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-xl",
        lg: "text-4xl md:text-5xl font-bold",
        xl: "text-6xl md:text-8xl font-black tracking-tighter",
    };

    return (
        <motion.div
            className={cn("relative inline-block group cursor-default", className)}
            whileHover="hover"
            initial="initial"
        >
            {/* Main Text */}
            <motion.span
                className={cn(
                    "relative z-10 block",
                    sizeClasses[size],
                    "text-foreground transition-colors duration-300"
                )}
                variants={{
                    initial: { letterSpacing: "0em" },
                    hover: { letterSpacing: "0.05em", color: "#CCFF00" }
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {text}
            </motion.span>

            {/* Underline Effect */}
            <motion.div
                className="absolute bottom-0 left-0 h-[3px] bg-acid origin-left"
                variants={{
                    initial: { scaleX: 0 },
                    hover: { scaleX: 1 }
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* Subtle glow on hover */}
            <motion.span
                className={cn(
                    "absolute inset-0 -z-10 blur-xl opacity-0",
                    sizeClasses[size],
                    "text-acid"
                )}
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 0.3 }
                }}
                aria-hidden="true"
            >
                {text}
            </motion.span>
        </motion.div>
    );
}
