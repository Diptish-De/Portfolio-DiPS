"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export default function CustomCursor() {
    const [isHovered, setIsHovered] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16); // Center the 32px cursor
            cursorY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Attach listeners to interactive elements
        const attachListeners = () => {
            const interactiveElements = document.querySelectorAll("a, button, input, textarea, .hover-trigger");
            interactiveElements.forEach((el) => {
                el.addEventListener("mouseenter", handleMouseEnter);
                el.addEventListener("mouseleave", handleMouseLeave);
            });
        };

        window.addEventListener("mousemove", moveCursor);
        attachListeners();

        // Re-attach listeners when DOM changes (simple observer for this scale)
        const observer = new MutationObserver(attachListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            observer.disconnect();
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Main Aim Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                }}
            >
                <div
                    className={cn(
                        "w-8 h-8 flex items-center justify-center transition-all duration-200",
                        isHovered ? "scale-150" : "scale-100"
                    )}
                >
                    {/* Center Dot */}
                    <div className={cn(
                        "absolute w-1 h-1 bg-acid rounded-full transition-all duration-200",
                        isHovered ? "bg-transparent border border-acid w-full h-full rounded-none" : ""
                    )} />

                    {/* Crosshair Lines (Only visible when NOT hovered) */}
                    {!isHovered && (
                        <>
                            <div className="absolute w-full h-[1px] bg-acid/30" />
                            <div className="absolute h-full w-[1px] bg-acid/30" />
                        </>
                    )}

                    {/* Brackets (Visible ONLY when hovered) */}
                    {isHovered && (
                        <>
                            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-acid" />
                            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-acid" />
                            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-acid" />
                            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-acid" />
                        </>
                    )}
                </div>
            </motion.div>
        </>
    );
}
