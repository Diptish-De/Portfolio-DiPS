"use client";

import { motion } from "framer-motion";

export default function GridBackground() {
    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-background">
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `
            linear-gradient(to right, #333 1px, transparent 1px),
            linear-gradient(to bottom, #333 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)"
                }}
            ></div>

            {/* Moving grid line example */}
            <motion.div
                initial={{ top: "-100%" }}
                animate={{ top: "100%" }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-[2px] bg-acid opacity-20 shadow-[0_0_10px_#CCFF00]"
            />
        </div>
    );
}
