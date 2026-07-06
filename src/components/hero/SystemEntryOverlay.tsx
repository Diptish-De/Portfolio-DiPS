"use client";

import { useState } from "react";
import { Terminal } from "lucide-react";

interface SystemEntryOverlayProps {
    onEnter?: () => void;
}

export default function SystemEntryOverlay({ onEnter }: SystemEntryOverlayProps) {
    const [status, setStatus] = useState("AWAITING_INPUT");
    const [isMounted, setIsMounted] = useState(true);
    const [isFading, setIsFading] = useState(false);

    const handleEnter = () => {
        setStatus("INITIALIZING_AUDIO_PIPELINE...");
        
        // Create/resume AudioContext on click to satisfy browser policy
        try {
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            const ctx = new AudioContextClass();
            ctx.resume();
        } catch (e) {
            console.warn("Audio Context initialization deferred", e);
        }

        if (onEnter) onEnter();

        setIsFading(true);
        setTimeout(() => {
            setIsMounted(false);
        }, 800); // Match transition duration
    };

    if (!isMounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] transition-all duration-700 ease-in-out ${
                isFading ? "opacity-0 pointer-events-none backdrop-blur-0" : "opacity-100"
            }`}
        >
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050505_80%)]" />

            <div className="z-10 flex flex-col items-center text-center max-w-md px-6 space-y-8">
                {/* Tech Terminal Diagnostics */}
                <div className="font-mono text-[10px] text-silver/40 space-y-1.5 uppercase tracking-widest">
                    <div>SYS_STATUS: ONLINE</div>
                    <div>SECURE_TUNNEL: ACTIVE</div>
                    <div>LINK_STATE: {status}</div>
                </div>

                {/* Big Cyber Button */}
                <button
                    onClick={handleEnter}
                    className="relative group cursor-pointer px-6 py-4 sm:px-10 sm:py-5 bg-[#0a0a0a] border border-acid/40 hover:border-acid text-acid hover:text-black font-mono text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.25em] uppercase transition-all duration-300 shadow-[0_0_30px_rgba(204,255,0,0.05)] hover:shadow-[0_0_40px_rgba(204,255,0,0.2)] overflow-hidden"
                >
                    {/* Hover slider background */}
                    <div className="absolute inset-0 bg-acid translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out z-0" />
                    
                    <span className="flex items-center gap-3 relative z-10 font-bold">
                        <Terminal className="w-4 h-4 animate-pulse" />
                        INITIALIZE_INTERFACE
                    </span>
                </button>

                <p className="font-mono text-[10px] text-silver/50 tracking-wider">
                    [ PRESS TO ENABLE IMMERSIVE AUDIO & STRINGS ]
                </p>
            </div>

            {/* Corner Bracket Accents */}
            <div className="absolute top-10 left-10 w-4 h-4 border-l border-t border-silver/20" />
            <div className="absolute top-10 right-10 w-4 h-4 border-r border-t border-silver/20" />
            <div className="absolute bottom-10 left-10 w-4 h-4 border-l border-b border-silver/20" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-r border-b border-silver/20" />
        </div>
    );
}
