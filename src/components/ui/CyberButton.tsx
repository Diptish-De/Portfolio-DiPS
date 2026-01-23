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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                "relative px-8 py-3 font-mono text-sm font-bold uppercase tracking-wider kpr-clip-button transition-all duration-300",
                variant === "primary"
                    ? "bg-acid text-background hover:bg-white hover:text-black"
                    : "border border-silver text-silver hover:bg-silver hover:text-black",
                className
            )}
            {...props}
        >
            {/* Decorative corner accents */}
            <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-current opacity-50" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-current opacity-50" />

            {children}
        </motion.button>
    );
}
