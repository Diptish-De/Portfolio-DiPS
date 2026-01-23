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
        lg: "text-4xl font-bold",
        xl: "text-6xl font-black tracking-tighter",
    };

    return (
        <div className={cn("relative inline-block group", className)}>
            <motion.span
                className={cn(
                    "relative z-10 block",
                    sizeClasses[size],
                    "text-foreground group-hover:text-acid transition-colors duration-200"
                )}
            >
                {text}
            </motion.span>
            <span
                aria-hidden="true"
                className={cn(
                    "absolute top-0 left-0 -z-10 block opacity-0 group-hover:opacity-100",
                    sizeClasses[size],
                    "text-acid translate-x-[2px] translate-y-[-2px]"
                )}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)" }}
            >
                {text}
            </span>
            <span
                aria-hidden="true"
                className={cn(
                    "absolute top-0 left-0 -z-10 block opacity-0 group-hover:opacity-100",
                    sizeClasses[size],
                    "text-cyan translate-x-[-2px] translate-y-[2px]"
                )}
                style={{ clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)" }}
            >
                {text}
            </span>
        </div>
    );
}
