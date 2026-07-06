"use client";

import { useEffect, useState } from "react";
import { X, Terminal } from "lucide-react";

interface WhoamiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WhoamiModal({ isOpen, onClose }: WhoamiModalProps) {
    const [typedLines, setTypedLines] = useState<string[]>([]);
    
    const dossierData = [
        "Initializing secure connection...",
        "Connection established. Access granted to Dossier.",
        "--------------------------------------------------",
        "NAME             : Diptish De",
        "OCCUPATION       : Turning ideas into software.",
        "CURRENT MISSION  : Build products worth remembering.",
        "CURRENT FOCUS    : EXIMARG // DropoutHacks // AI Products",
        "STATUS           : Always Building.",
        "--------------------------------------------------",
        "Type 'exit' or click [X] to return."
    ];

    useEffect(() => {
        if (!isOpen) {
            setTypedLines([]);
            return;
        }

        let currentLine = 0;
        const interval = setInterval(() => {
            if (currentLine < dossierData.length) {
                setTypedLines(prev => [...prev, dossierData[currentLine]]);
                currentLine++;
            } else {
                clearInterval(interval);
            }
        }, 120);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    // Handle Escape key to close
    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
            <div className="w-full max-w-lg bg-[#0A0A0A] border border-acid/30 shadow-[0_0_50px_rgba(215,255,47,0.1)] p-6 font-mono text-xs text-silver/80 relative">
                {/* Header */}
                <div className="flex justify-between items-center border-b border-silver/10 pb-3 mb-4">
                    <div className="flex items-center gap-2 text-acid">
                        <Terminal className="w-4 h-4" />
                        <span>dossier_terminal://whoami</span>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-silver/40 hover:text-acid transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Console Output */}
                <div className="space-y-2 min-h-[220px] select-text">
                    {typedLines.map((line, idx) => (
                        <div 
                            key={idx} 
                            className={
                                line.startsWith("NAME") || line.startsWith("OCCUPATION") || line.startsWith("CURRENT") || line.startsWith("STATUS")
                                    ? "text-white"
                                    : line.startsWith("Connection")
                                    ? "text-acid font-bold"
                                    : "text-silver/60"
                            }
                        >
                            {line}
                        </div>
                    ))}
                    <div className="w-2 h-4 bg-acid/80 inline-block animate-pulse ml-0.5" />
                </div>
            </div>
        </div>
    );
}
