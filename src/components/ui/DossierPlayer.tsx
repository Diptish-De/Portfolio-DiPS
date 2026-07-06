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
        title: "CHILL_SYNAPSE_01",
        artist: "LOFI_SYSTEM",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
        title: "NEON_DREAM_02",
        artist: "CYBER_BEATS",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "MATRIX_RAIN_03",
        artist: "AMPLITUDE",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

export default function DossierPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
    const [coffeeFuel, setCoffeeFuel] = useState(99);
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

    // Auto-update track when source changes
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

    // Handle track ending -> auto skip
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        const handleEnded = () => nextTrack();
        audio.addEventListener("ended", handleEnded);
        return () => audio.removeEventListener("ended", handleEnded);
    }, [currentTrackIdx]);

    // Decrement coffee slowly for fun
    useEffect(() => {
        const interval = setInterval(() => {
            setCoffeeFuel(prev => (prev > 10 ? prev - 1 : 99)); // refill to 99 if empty
        }, 120000); // every 2 mins
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed top-8 right-8 z-[150] font-mono select-none">
            <audio ref={audioRef} preload="auto" />
            
            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-silver/10 hover:border-acid/30 px-4 py-3 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300">
                {/* Rotating Vinyl Disc */}
                <div className="relative w-8 h-8 flex items-center justify-center">
                    <div 
                        className={`w-8 h-8 rounded-full border border-silver/20 flex items-center justify-center transition-transform duration-1000 ${
                            isPlaying ? "animate-spin" : ""
                        }`}
                        style={{ animationDuration: "4s" }}
                    >
                        {/* Concentric rings on vinyl */}
                        <div className="absolute inset-1 rounded-full border border-silver/10" />
                        <div className="absolute inset-2 rounded-full border border-silver/5" />
                        <Disc className="w-4 h-4 text-silver/60" />
                        {/* Center spacer */}
                        <div className="w-1.5 h-1.5 rounded-full bg-acid absolute" />
                    </div>
                </div>

                {/* Track Details */}
                <div className="space-y-0.5 min-w-[120px] max-w-[150px]">
                    <div className="text-[8px] text-silver/40 uppercase tracking-widest font-bold">
                        SYSTEM_AUDIO
                    </div>
                    <div className="text-[10px] text-white font-bold truncate tracking-wide">
                        {activeTrack.title}
                    </div>
                    <div className="text-[8px] text-acid uppercase tracking-wider truncate">
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

                {/* Coffee fuel readout */}
                <div 
                    onClick={() => setCoffeeFuel(99)} // click to refill
                    className="flex items-center gap-1.5 text-silver/40 hover:text-acid transition-colors cursor-pointer"
                    title="Coffee Fuel (Click to Refill)"
                >
                    <Coffee className={`w-3.5 h-3.5 ${coffeeFuel > 80 ? "text-acid animate-pulse" : ""}`} />
                    <span className="text-[9px] font-bold">{coffeeFuel}%</span>
                </div>
            </div>
        </div>
    );
}
