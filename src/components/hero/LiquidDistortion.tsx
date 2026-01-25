"use client";

import { useEffect, useRef } from "react";

export default function LiquidDistortion() {
    const filterRef = useRef<SVGFETurbulenceElement>(null);

    useEffect(() => {
        let animationFrameId: number;
        let time = 0;

        const animate = () => {
            time += 0.005;
            if (filterRef.current) {
                // Animate baseFrequency for a subtle flowing water effect
                // baseFrequency="0.01 0.02" -> varies slightly
                const freqX = 0.001 + Math.sin(time) * 0.0005;
                const freqY = 0.001 + Math.cos(time) * 0.0005;
                filterRef.current.setAttribute("baseFrequency", `${freqX} ${freqY}`);
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <>
            <svg className="fixed inset-0 pointer-events-none z-[9999] opacity-30 mix-blend-overlay w-0 h-0">
                <filter id="liquid-distortion">
                    <feTurbulence
                        ref={filterRef}
                        type="fractalNoise"
                        baseFrequency="0.001 0.001"
                        numOctaves="1"
                        result="warp"
                    />
                    <feDisplacementMap
                        xChannelSelector="R"
                        yChannelSelector="G"
                        scale="20"
                        in="SourceGraphic"
                        in2="warp"
                    />
                </filter>
            </svg>
            <style jsx global>{`
                /* Apply to the specific Hero elements or globally */
                .liquid-hero {
                    filter: url(#liquid-distortion);
                }
            `}</style>
        </>
    );
}
