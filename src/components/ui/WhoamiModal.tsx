"use client";

import { useEffect, useState, useRef } from "react";
import { X, Terminal } from "lucide-react";

interface WhoamiModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function WhoamiModal({ isOpen, onClose }: WhoamiModalProps) {
    const [history, setHistory] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const consoleEndRef = useRef<HTMLDivElement>(null);
    
    const dossierData = [
        "Initializing secure connection...",
        "Connection established. Access granted to Mainframe.",
        "--------------------------------------------------",
        "######    ####   ######    ##### ",
        "#     #    ##    #     #  #      ",
        "#     #    ##    ######    ##### ",
        "#     #    ##    #              #",
        "######    ####   #        #####  ",
        "--------------------------------------------------",
        "CODENAME         : DiPS",
        "REAL NAME        : Diptish De",
        "OCCUPATION       : Turning ideas into software.",
        "CURRENT FOCUS    : EXIMARG // DropoutHacks // AI Products",
        "STATUS           : Always Building.",
        "--------------------------------------------------",
        "Type 'exit' to close, or 'help' for command list."
    ];

    // Initialize/reset terminal logs
    useEffect(() => {
        if (!isOpen) {
            setHistory([]);
            return;
        }

        setHistory([]);
        let active = true;
        let currentLine = 0;

        const typeLine = () => {
            if (!active) return;
            if (currentLine < dossierData.length) {
                setHistory(prev => {
                    // Prevent duplicate appending
                    const lineToAdd = dossierData[currentLine];
                    if (prev[prev.length - 1] === lineToAdd) return prev;
                    return [...prev, lineToAdd];
                });
                currentLine++;
                setTimeout(typeLine, 60);
            } else {
                inputRef.current?.focus();
            }
        };

        typeLine();

        return () => {
            active = false;
        };
    }, [isOpen]);

    // Keep console scrolled to bottom
    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [history]);

    // Auto-focus input on modal click
    const handleContainerClick = () => {
        inputRef.current?.focus();
    };

    // Process Terminal Commands
    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const cmd = inputValue.trim().toLowerCase();
        if (!cmd) return;

        // Append user prompt to history
        const newHistory = [...history, `dips@mainframe:~$ ${inputValue}`];

        if (cmd === "exit") {
            onClose();
            setInputValue("");
            return;
        }

        if (cmd === "help") {
            newHistory.push(
                "Available commands:",
                "  help       - Display this instruction log",
                "  sysinfo    - Print system registry specs",
                "  clear      - Clear console logs",
                "  exit       - Shutdown terminal connection"
            );
        } else if (cmd === "sysinfo") {
            newHistory.push(
                "SYS_REGISTRY_METADATA:",
                `  USER_AGENT : ${navigator.userAgent.substring(0, 50)}...`,
                `  PLATFORM   : ${navigator.platform}`,
                "  SEC_TRIAL  : SYSTEM ACTIVE // OK"
            );
        } else if (cmd === "clear") {
            setHistory([]);
            setInputValue("");
            return;
        } else {
            newHistory.push(`Command not found: '${cmd}'. Type 'help' or 'exit'.`);
        }

        setHistory(newHistory);
        setInputValue("");
    };

    // Close on Escape
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4">
            <div 
                onClick={handleContainerClick}
                className="w-full max-w-lg bg-[#0A0A0A] border border-acid/30 shadow-[0_0_50px_rgba(215,255,47,0.1)] p-4 sm:p-6 font-mono text-[10px] sm:text-xs text-silver/80 relative cursor-text max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex justify-between items-center border-b border-silver/10 pb-3 mb-4 select-none">
                    <div className="flex items-center gap-2 text-acid">
                        <Terminal className="w-4 h-4" />
                        <span>dips_terminal://whoami</span>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="text-silver/40 hover:text-acid transition-colors cursor-pointer"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Console Output */}
                <div className="space-y-1.5 select-text">
                    {history.map((line, idx) => {
                        if (!line) return null;
                        
                        const isPrompt = line.startsWith("dips@mainframe:~$");
                        const isAcid = line.startsWith("Connection") || line.startsWith("Available") || line.startsWith("SYS_REGISTRY");
                        const isAscii = line.includes("█") || line.includes("#") || line.includes("|  _") || line.includes("|____") || line.includes("|_|");
                        const isWhite = line.startsWith("CODENAME") || line.startsWith("REAL NAME") || line.startsWith("OCCUPATION") || line.startsWith("CURRENT") || line.startsWith("STATUS");

                        if (isAscii) {
                            return (
                                <pre 
                                    key={idx} 
                                    className="font-mono text-[11px] sm:text-[13px] leading-[1.1] text-acid font-bold tracking-normal py-0 select-none whitespace-pre"
                                >
                                    {line}
                                </pre>
                            );
                        }

                        return (
                            <div 
                                key={idx} 
                                className={
                                    isPrompt
                                        ? "text-acid font-bold"
                                        : isWhite
                                        ? "text-white font-bold"
                                        : isAcid
                                        ? "text-acid font-bold"
                                        : "text-silver/60"
                                }
                            >
                                {line}
                            </div>
                        );
                    })}
                    
                    {/* Interactive Input Form */}
                    <form onSubmit={handleCommandSubmit} className="flex items-center gap-1.5 mt-2">
                        <span className="text-acid font-bold">dips@mainframe:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs p-0 focus:ring-0"
                            placeholder=""
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </form>
                    <div ref={consoleEndRef} />
                </div>
            </div>
        </div>
    );
}
