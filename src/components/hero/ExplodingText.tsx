"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ExplodingTextProps {
    text: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export default function ExplodingText({ text, className, size = "md" }: ExplodingTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Font size mapping - responsive based on viewport
    const getResponsiveFontSize = (sizeKey: "sm" | "md" | "lg" | "xl") => {
        const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
        const isTablet = typeof window !== "undefined" && window.innerWidth < 1024;
        const fontSizeMap = {
            sm: isMobile ? 24 : 40,
            md: isMobile ? 36 : 60,
            lg: isMobile ? 48 : 80,
            xl: isMobile ? 55 : isTablet ? 80 : 120
        };
        return fontSizeMap[sizeKey];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        // We need a fixed size for the canvas to control density, but responsive is better.
        // Let's use parent container size.

        let width = 0;
        let height = 0;

        // Physics Constants
        const MOUSE_RADIUS = 100;
        const DISPERSION_FORCE = 30; // Explosive power
        const RETURN_SPEED = 0.08;
        const FRICTION = 0.90;

        const mouse = { x: -1000, y: -1000 };

        interface Particle {
            x: number;
            y: number;
            originX: number;
            originY: number;
            vx: number;
            vy: number;
            size: number;
            color: string;
        }

        const particles: Particle[] = [];

        const init = () => {
            // Measure parent
            const parent = canvas.parentElement;
            if (parent) {
                width = parent.clientWidth;
                height = parent.clientHeight || 200; // Fallback
            }
            canvas.width = width;
            canvas.height = height;

            // Draw Text to Canvas (Hidden)
            // We use a temporary context logic or just clear/draw/read on main
            ctx.fillStyle = "#ffffff";
            ctx.font = `900 ${getResponsiveFontSize(size)}px 'Space Grotesk', monospace`; // Try to match font
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, width / 2, height / 2);

            // Get Pixel Data
            const imageData = ctx.getImageData(0, 0, width, height);
            ctx.clearRect(0, 0, width, height); // Clear for animation

            particles.length = 0;

            const step = 3; // Better density for sharper display

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    const index = (y * width + x) * 4;
                    const alpha = imageData.data[index + 3];

                    if (alpha > 128) {
                        particles.push({
                            x: x,
                            y: y,
                            originX: x,
                            originY: y,
                            vx: 0,
                            vy: 0,
                            size: 2.5, // Sleek blocky pixel layout
                            color: "#e2e2e2" // Silver
                        });
                    }
                }
            }
        };

        const update = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach(p => {
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Explosion Logic
                if (dist < MOUSE_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const explosion = force * DISPERSION_FORCE;

                    p.vx -= Math.cos(angle) * explosion;
                    p.vy -= Math.sin(angle) * explosion;
                }

                // Return Logic
                const ox = p.originX - p.x;
                const oy = p.originY - p.y;

                p.vx += ox * RETURN_SPEED;
                p.vy += oy * RETURN_SPEED;

                // Physics
                p.vx *= FRICTION;
                p.vy *= FRICTION;
                p.x += p.vx;
                p.y += p.vy;

                // Reactive color based on displacement from origin
                const displacement = Math.sqrt(ox * ox + oy * oy);
                if (displacement > 2) {
                    p.color = "#D7FF2F"; // Acid green when active
                } else {
                    p.color = "#E5E7EB"; // Crisp off-white when resting
                }

                // Draw
                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);
            });

            animationFrameId = requestAnimationFrame(update);
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        // Handle Window Resize 
        const onResize = () => {
            init(); // Re-sample text
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouseMove);

        // Initial delay to ensure font loaded? 
        // Just run init immediately, if font not loaded it might be default.
        // Better to use document.fonts.ready if possible but simple init is mostly fine.
        document.fonts.ready.then(() => {
            init();
            update();
        });

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [text, size]);

    return (
        <div className={cn("relative w-full overflow-visible flex items-center justify-center", className)} style={{ height: getResponsiveFontSize(size) * 1.5 }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10"
            />
            {/* Invisible accessible text */}
            <span className="opacity-0 select-none pointer-events-none font-bold text-transparent" style={{ fontSize: getResponsiveFontSize(size) }}>
                {text}
            </span>
        </div>
    );
}
