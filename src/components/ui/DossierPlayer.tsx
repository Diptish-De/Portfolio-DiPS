"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward, Coffee, Disc } from "lucide-react";

interface Track {
    title: string;
    url: string;
    artist: string;
}

const playlist: Track[] = [
    {
        title: "LOFI_STUDY_SESSION",
        artist: "SPOTIFY_STREAM // DIPTISH_DE",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "NEON_DREAM_02",
        artist: "CYBER_BEATS // SYNAPSE",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "MATRIX_RAIN_03",
        artist: "AMPLITUDE // SHIFT",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

export default function DossierPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
    const [coffeeFuel, setCoffeeFuel] = useState(99);
    const [caffeineBoost, setCaffeineBoost] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const activeTrack = playlist[currentTrackIdx];

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(err => {
                console.warn("Audio playback deferred pending interaction", err);
            });
        }
    };

    const nextTrack = () => {
        const nextIdx = (currentTrackIdx + 1) % playlist.length;
        setCurrentTrackIdx(nextIdx);
        setIsPlaying(false);
    };

    // Trigger Caffeine Boost (Fun easter egg!)
    const triggerCaffeineBoost = () => {
        setCoffeeFuel(99); // Refill
        setCaffeineBoost(true);
        
        // Temporarily double rotation speed/animation factors on the site
        document.documentElement.style.setProperty('--boost-multiplier', '0.4s');
        
        setTimeout(() => {
            setCaffeineBoost(false);
            document.documentElement.style.setProperty('--boost-multiplier', '2.5s');
        }, 8000);
    };

    useEffect(() => {
        if (!audioRef.current) return;
        audioRef.current.src = activeTrack.url;
        audioRef.current.load();
        if (isPlaying) {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => setIsPlaying(false));
        }
    }, [currentTrackIdx, activeTrack.url, isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleEnded = () => nextTrack();
        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, [currentTrackIdx]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCoffeeFuel(prev => (prev > 10 ? prev - 1 : 99));
        }, 60000); // deplete slowly
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-8 right-8 z-[150] font-mono select-none">
            <audio ref={audioRef} preload="auto" />
            
            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-silver/10 hover:border-acid/30 px-5 py-3.5 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300">
                {/* Spotify status branding */}
                <a 
                    href="https://open.spotify.com/playlist/2ZmCesOqCcmfjJP0UBLUZ4?si=7f81dfe8510e44ec" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute -top-3 right-4 bg-[#1DB954] text-black text-[7px] font-bold px-2 py-0.5 tracking-widest hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer"
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping" />
                    SPOTIFY_SYNC
                </a>

                {/* Rotating Vinyl Disc */}
                <div className="relative w-9 h-9 flex items-center justify-center">
                    <div 
                        className={`w-9 h-9 rounded-full border border-silver/20 flex items-center justify-center transition-transform duration-1000 ${
                            isPlaying ? "animate-spin" : ""
                        }`}
                        style={{ 
                            animationDuration: caffeineBoost ? "0.8s" : "3.5s",
                            animationTimingFunction: "linear",
                            animationIterationCount: "infinite"
                        }}
                    >
                        <div className="absolute inset-1 rounded-full border border-silver/15" />
                        <div className="absolute inset-2 rounded-full border border-silver/5" />
                        <Disc className="w-5 h-5 text-silver/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-acid absolute" />
                    </div>
                </div>

                {/* Track Details */}
                <div className="space-y-0.5 min-w-[130px] max-w-[160px]">
                    <div className="text-[7px] text-[#1DB954] uppercase tracking-widest font-black flex items-center gap-1">
                        <span>NOW_PLAYING</span>
                    </div>
                    <div className="text-[10px] text-white font-bold truncate tracking-wide">
                        {activeTrack.title}
                    </div>
                    <div className="text-[8px] text-silver/50 truncate">
                        {activeTrack.artist}
                    </div>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-silver/10" />

                {/* Audio Controls */}
                <div className="flex items-center gap-2">
                    <button 
                        onClick={togglePlay}
                        className="p-1.5 text-silver/50 hover:text-acid transition-colors cursor-pointer"
                    >
                        {isPlaying ? <Pause className="w-3.5 h-3.5 text-acid" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button 
                        onClick={nextTrack}
                        className="p-1.5 text-silver/50 hover:text-acid transition-colors cursor-pointer"
                    >
                        <SkipForward className="w-3.5 h-3.5" />
                    </button>
                </div>

                {/* Divider */}
                <div className="h-6 w-px bg-silver/10" />

                {/* Coffee Mug & Rising Evaporating Steam */}
                <div 
                    onClick={triggerCaffeineBoost}
                    className="flex items-center gap-2.5 text-silver/40 hover:text-acid transition-colors cursor-pointer relative group/coffee py-1"
                    title="Caffeine Boost! (Click to Brew)"
                >
                    {/* Steam Particles */}
                    <div className="absolute -top-3 left-1 flex gap-0.5 pointer-events-none opacity-60">
                        <span className={`w-0.5 h-2 bg-silver/40 rounded-full block ${isPlaying || caffeineBoost ? "animate-steam-1" : ""}`} />
                        <span className={`w-0.5 h-2.5 bg-silver/50 rounded-full block ${isPlaying || caffeineBoost ? "animate-steam-2" : ""}`} />
                        <span className={`w-0.5 h-2 bg-silver/40 rounded-full block ${isPlaying || caffeineBoost ? "animate-steam-3" : ""}`} />
                    </div>

                    {/* Custom Vector Coffee Mug */}
                    <svg className={`w-4 h-4 transition-transform duration-300 ${caffeineBoost ? "scale-125 text-acid animate-bounce" : "group-hover/coffee:scale-110"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {/* Cup Body */}
                        <path d="M17 8H6v7c0 2.2 1.8 4 4 4h3c2.2 0 4-1.8 4-4V8z" />
                        {/* Handle */}
                        <path d="M17 10h2c1.7 0 3 1.3 3 3s-1.3 3-3 3h-2" />
                    </svg>

                    <span className={`text-[9px] font-bold transition-all ${caffeineBoost ? "text-acid font-black text-xs scale-105" : ""}`}>
                        {caffeineBoost ? "BOOSTED!" : `${coffeeFuel}%`}
                    </span>
                </div>
            </div>
            
            {/* Embedded styles for steam animations */}
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
        </div>
    );
}
