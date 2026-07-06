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
        title: "NEON_DREAM_01",
        artist: "AUDIO_STREAM // DIPTISH_DE",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
        title: "MATRIX_RAIN_02",
        artist: "AMPLITUDE // SHIFT",
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

export default function DossierPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
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

    return (
        <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[150] font-mono select-none hidden sm:block">
            <audio ref={audioRef} preload="auto" />
            
            <div className="flex items-center gap-4 bg-[#0A0A0A] border border-silver/10 hover:border-acid/30 px-5 py-3.5 shadow-[0_0_20px_rgba(0,0,0,0.8)] transition-all duration-300">
                {/* Rotating Vinyl Disc */}
                <div className="relative w-9 h-9 flex items-center justify-center">
                    <div 
                        className={`w-9 h-9 rounded-full border border-silver/20 flex items-center justify-center transition-transform duration-1000 ${
                            isPlaying ? "animate-spin" : ""
                        }`}
                        style={{ 
                            animationDuration: "3.5s",
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
                    <div className="text-[7px] text-acid uppercase tracking-widest font-black flex items-center gap-1">
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
            </div>
        </div>
    );
}
