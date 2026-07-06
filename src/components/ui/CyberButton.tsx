"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface CyberButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    variant?: "primary" | "outline";
}

export default function CyberButton({
    children,
    className,
    variant = "primary",
    ...props
}: CyberButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={cn(
                "group relative px-8 py-3.5 font-mono text-sm font-bold uppercase tracking-widest transition-all duration-300 overflow-hidden",
                variant === "primary"
                    ? "bg-acid text-background hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(215,255,47,0.25)]"
                    : "border border-silver/30 text-silver hover:border-acid hover:text-acid hover:shadow-[0_0_25px_rgba(215,255,47,0.15)]",
                className
            )}
            {...props}
        >
            {/* Decorative corner accents that expand/glow on hover */}
            <span className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-current opacity-60 group-hover:scale-110 group-hover:text-acid transition-all duration-300" />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-current opacity-60 group-hover:scale-110 group-hover:text-acid transition-all duration-300" />
            
            {/* Outline expand effect */}
            <span className="absolute inset-0 border border-transparent group-hover:border-acid/20 scale-105 group-hover:scale-100 transition-all duration-500 pointer-events-none" />

            {/* Inner layout helper to make arrows slide automatically on hover */}
            <span className="flex items-center justify-center gap-2 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-out group-hover:[&>svg]:translate-x-1 relative z-10">
                {children}
            </span>
        </motion.button>
    );
}
