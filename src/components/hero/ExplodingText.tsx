"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ExplodingTextProps {
    text: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

function calcFontSize(sizeKey: "sm" | "md" | "lg" | "xl", width: number) {
    const isMobile = width < 640;
    const isTablet = width < 1024;
    const map = {
        sm: isMobile ? 24 : 40,
        md: isMobile ? 36 : 60,
        lg: isMobile ? 48 : 80,
        xl: isMobile ? 50 : isTablet ? 80 : 120
    };
    return map[sizeKey];
}

export default function ExplodingText({ text, className, size = "md" }: ExplodingTextProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [fontSize, setFontSize] = useState(120); // SSR default

    // Sync font size to viewport on mount and resize
    useEffect(() => {
        const update = () => setFontSize(calcFontSize(size, window.innerWidth));
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, [size]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        const MOUSE_RADIUS = 100;
        const DISPERSION_FORCE = 30;
        const RETURN_SPEED = 0.08;
        const FRICTION = 0.90;

        const mouse = { x: -1000, y: -1000 };

        interface Particle {
            x: number; y: number;
            originX: number; originY: number;
            vx: number; vy: number;
            size: number; color: string;
        }

        const particles: Particle[] = [];

        const init = () => {
            const parent = canvas.parentElement;
            if (parent) {
                width = parent.clientWidth;
                height = parent.clientHeight || 200;
            }
            canvas.width = width;
            canvas.height = height;

            ctx.fillStyle = "#ffffff";
            ctx.font = `900 ${fontSize}px 'Space Grotesk', monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, width / 2, height / 2);

            const imageData = ctx.getImageData(0, 0, width, height);
            ctx.clearRect(0, 0, width, height);

            particles.length = 0;
            const step = 3;

            for (let y = 0; y < height; y += step) {
                for (let x = 0; x < width; x += step) {
                    const index = (y * width + x) * 4;
                    const alpha = imageData.data[index + 3];
                    if (alpha > 128) {
                        particles.push({
                            x, y, originX: x, originY: y,
                            vx: 0, vy: 0,
                            size: 2.5, color: "#e2e2e2"
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

                if (dist < MOUSE_RADIUS) {
                    const angle = Math.atan2(dy, dx);
                    const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
                    const explosion = force * DISPERSION_FORCE;
                    p.vx -= Math.cos(angle) * explosion;
                    p.vy -= Math.sin(angle) * explosion;
                }

                const ox = p.originX - p.x;
                const oy = p.originY - p.y;
                p.vx += ox * RETURN_SPEED;
                p.vy += oy * RETURN_SPEED;
                p.vx *= FRICTION;
                p.vy *= FRICTION;
                p.x += p.vx;
                p.y += p.vy;

                const displacement = Math.sqrt(ox * ox + oy * oy);
                p.color = displacement > 2 ? "#D7FF2F" : "#E5E7EB";

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

        // Also handle touch for mobile
        const onTouchMove = (e: TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            mouse.x = touch.clientX - rect.left;
            mouse.y = touch.clientY - rect.top;
        };

        const onTouchEnd = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const onResize = () => init();

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouseMove);
        canvas.addEventListener("touchmove", onTouchMove, { passive: true });
        canvas.addEventListener("touchend", onTouchEnd);

        document.fonts.ready.then(() => {
            init();
            update();
        });

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            canvas.removeEventListener("touchmove", onTouchMove);
            canvas.removeEventListener("touchend", onTouchEnd);
            cancelAnimationFrame(animationFrameId);
        };
    }, [text, size, fontSize]);

    return (
        <div className={cn("relative w-full overflow-visible flex items-center justify-center", className)} style={{ height: fontSize * 1.5 }}>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-10"
            />
            {/* Invisible accessible text */}
            <span className="opacity-0 select-none pointer-events-none font-bold text-transparent" style={{ fontSize }}>
                {text}
            </span>
        </div>
    );
}
