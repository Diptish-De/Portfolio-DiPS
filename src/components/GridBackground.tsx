import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function GridBackground() {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });
    const [hasMoved, setHasMoved] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX, y: e.clientY });
            if (!hasMoved) setHasMoved(true);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [hasMoved]);

    const maskStyle = hasMoved
        ? `radial-gradient(550px circle at ${mouse.x}px ${mouse.y}px, black 25%, transparent 100%)`
        : `linear-gradient(to bottom, black 40%, transparent 100%)`;

    return (
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#030303]">
            {/* Drifting Volumetric Spotlight Orb 1 (Acid Green) */}
            <motion.div
                animate={{
                    x: [0, 100, -70, 0],
                    y: [0, -120, 80, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-[380px] h-[380px] rounded-full bg-[#D7FF2F]/8 opacity-[0.14] filter blur-[100px]"
            />

            {/* Drifting Volumetric Spotlight Orb 2 (Cyan) */}
            <motion.div
                animate={{
                    x: [0, -120, 90, 0],
                    y: [0, 100, -100, 0],
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-cyan-500/5 opacity-[0.12] filter blur-[120px]"
            />

            {/* Interactive Flashlight-Masked Tech Grid */}
            <div
                className="absolute inset-0 opacity-[0.25] transition-opacity duration-300"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #333 1px, transparent 1px),
                        linear-gradient(to bottom, #333 1px, transparent 1px)
                    `,
                    backgroundSize: "45px 45px",
                    maskImage: maskStyle,
                    WebkitMaskImage: maskStyle
                }}
            />

            {/* Moving scanning grid line */}
            <motion.div
                initial={{ top: "-100%" }}
                animate={{ top: "100%" }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute left-0 right-0 h-[1.5px] bg-[#D7FF2F] opacity-15 shadow-[0_0_8px_#D7FF2F]"
            />
        </div>
    );
}
