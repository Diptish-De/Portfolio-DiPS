"use client";

import { useState, useEffect } from "react";

export default function CaffeineMonitor() {
    const [coffeeFuel, setCoffeeFuel] = useState(99);
    const [caffeineBoost, setCaffeineBoost] = useState(false);
    const [boostTimeLeft, setBoostTimeLeft] = useState(0);

    // Trigger Caffeine Boost
    const triggerCaffeineBoost = () => {
        if (caffeineBoost) return;
        
        setCoffeeFuel(99); // Refill fuel instantly
        setCaffeineBoost(true);
        setBoostTimeLeft(8);
        
        // Temporarily double rotation speed/animation factors on the site
        document.documentElement.style.setProperty('--boost-multiplier', '0.4s');
    };

    // Boost timer countdown
    useEffect(() => {
        if (!caffeineBoost) return;
        
        const timer = setInterval(() => {
            setBoostTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setCaffeineBoost(false);
                    document.documentElement.style.setProperty('--boost-multiplier', '2.5s');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [caffeineBoost]);

    // Deplete coffee fuel (accelerated for interactive visibility)
    useEffect(() => {
        const interval = setInterval(() => {
            // Keep depleting down to 12% if boost is not running
            setCoffeeFuel(prev => {
                if (prev > 12) {
                    return prev - 1;
                }
                return 12;
            });
        }, 600); // 0.6s per percent -> depletes in about 50 seconds
        
        return () => clearInterval(interval);
    }, []);

    // Calculate dim overlay opacity (reaches up to 85% blackness at lowest fuel)
    const dimOpacity = Math.max(0, ((99 - coffeeFuel) / (99 - 12)) * 0.85);

    return (
        <>
            {/* Screen Dissolve Overlay */}
            <div 
                className="fixed inset-0 bg-black pointer-events-none z-[140] transition-opacity duration-1000 hidden sm:block"
                style={{ opacity: dimOpacity }}
            />

            {/* Float container with high z-index to stay fully lit on top of the black mask */}
            <div className="fixed top-16 left-4 sm:left-8 z-[190] font-mono select-none hidden sm:block">
                <div 
                    onClick={triggerCaffeineBoost}
                    className={`flex items-center gap-4 bg-[#0A0A0A] border px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300 cursor-pointer ${
                        caffeineBoost 
                            ? "border-acid shadow-[0_0_25px_rgba(215,255,47,0.25)] bg-acid/10" 
                            : coffeeFuel < 40
                            ? "border-red-500/50 animate-pulse shadow-[0_0_25px_rgba(239,68,68,0.25)] bg-red-950/10"
                            : "border-silver/10 hover:border-acid/40 hover:shadow-[0_0_15px_rgba(215,255,47,0.15)]"
                    }`}
                    title="Caffeine Station (Click to Brew)"
                >
                    {/* Visual Indicators */}
                    <div className="relative w-8 h-10 flex items-center justify-center">
                        {/* Steam rising particles */}
                        <div className="absolute top-0 left-2.5 flex gap-0.5 pointer-events-none opacity-60">
                            <span className="w-0.5 h-2 bg-silver/40 rounded-full block animate-steam-1" />
                            <span className="w-0.5 h-3 bg-silver/50 rounded-full block animate-steam-2" />
                            <span className="w-0.5 h-2 bg-silver/40 rounded-full block animate-steam-3" />
                        </div>

                        {/* Vector Coffee Mug */}
                        <svg 
                            className={`w-6 h-6 transition-transform duration-300 absolute bottom-1 ${
                                caffeineBoost 
                                    ? "scale-110 text-acid animate-bounce" 
                                    : coffeeFuel < 40 
                                    ? "text-red-400" 
                                    : "text-silver/60 group-hover:scale-105"
                            }`} 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2"
                        >
                            <path d="M17 8H6v7c0 2.2 1.8 4 4 4h3c2.2 0 4-1.8 4-4V8z" />
                            <path d="M17 10h2c1.7 0 3 1.3 3 3s-1.3 3-3 3h-2" />
                        </svg>
                    </div>

                    {/* Readout Info */}
                    <div className="space-y-0.5 min-w-[120px]">
                        <div className={`text-[7px] font-bold tracking-widest uppercase ${coffeeFuel < 40 ? "text-red-400" : "text-silver/40"}`}>
                            {coffeeFuel < 40 ? "CAFFEINE_CRITICAL" : "CAFFEINE_CELL"}
                        </div>
                        <div className={`text-[10px] font-bold tracking-wide transition-colors ${
                            caffeineBoost 
                                ? "text-acid" 
                                : coffeeFuel < 40 
                                ? "text-red-400 font-black animate-pulse" 
                                : "text-white"
                        }`}>
                            {caffeineBoost ? `BOOST_ACTIVE: ${boostTimeLeft}s` : coffeeFuel < 40 ? "WARNING: BREW NOW" : "FUEL_STATION // OK"}
                        </div>
                        <div className="text-[8px] text-silver/50 uppercase">
                            {caffeineBoost ? "OVERCLOCKING SYSTEM" : "CLICK MUG TO BREW"}
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-6 w-px bg-silver/10" />

                    {/* Large Percentage Readout */}
                    <div className="text-right min-w-[40px]">
                        <div className={`text-base font-black transition-all ${
                            caffeineBoost 
                                ? "text-acid animate-pulse scale-105" 
                                : coffeeFuel < 40 
                                ? "text-red-400 animate-pulse scale-105" 
                                : "text-white"
                        }`}>
                            {coffeeFuel}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Global style variables for steam */}
            <style jsx global>{`
                @keyframes steamMove1 {
                    0% { transform: translateY(0) scaleX(1); opacity: 0; }
                    30% { opacity: 0.6; }
                    80% { transform: translateY(-8px) scaleX(1.3); opacity: 0.2; }
                    100% { transform: translateY(-12px) scaleX(0.8); opacity: 0; }
                }
                @keyframes steamMove2 {
                    0% { transform: translateY(0) scaleX(1); opacity: 0; }
                    30% { opacity: 0.8; }
                    70% { transform: translateY(-10px) scaleX(1.5); opacity: 0.3; }
                    100% { transform: translateY(-15px) scaleX(0.7); opacity: 0; }
                }
                @keyframes steamMove3 {
                    0% { transform: translateY(0) scaleX(1); opacity: 0; }
                    30% { opacity: 0.5; }
                    70% { transform: translateY(-7px) scaleX(1.2); opacity: 0.2; }
                    100% { transform: translateY(-11px) scaleX(0.8); opacity: 0; }
                }
                .animate-steam-1 {
                    animation: steamMove1 2s infinite linear;
                }
                .animate-steam-2 {
                    animation: steamMove2 2.5s infinite linear 0.4s;
                }
                .animate-steam-3 {
                    animation: steamMove3 2.2s infinite linear 0.8s;
                }
            `}</style>
        </>
    );
}
