"use client";

import { useEffect, useRef, useState } from "react";

export default function GravityStrings() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);
    const isAudioReadyRef = useRef(false);
    const [audioActive, setAudioActive] = useState(false);

    // Unlock audio — MUST be called from a click/tap/keydown handler
    const unlockAudio = () => {
        if (isAudioReadyRef.current) return;

        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        audioContextRef.current.resume().then(() => {
            // Warm up audio pipeline with a silent tone to eliminate first-play latency
            if (audioContextRef.current) {
                try {
                    const warmup = audioContextRef.current.createOscillator();
                    const gain = audioContextRef.current.createGain();
                    gain.gain.value = 0;
                    warmup.connect(gain);
                    gain.connect(audioContextRef.current.destination);
                    warmup.start();
                    warmup.stop(audioContextRef.current.currentTime + 0.01);
                } catch (e) { /* ignore */ }
            }
            isAudioReadyRef.current = true;
            setAudioActive(true);
        }).catch(() => {
            // Will retry on next user gesture
        });
    };

    // Silently unlock audio on the user's first natural interaction
    useEffect(() => {
        const handler = () => unlockAudio();
        document.addEventListener('click', handler);
        document.addEventListener('keydown', handler);
        document.addEventListener('touchstart', handler);
        document.addEventListener('pointerdown', handler);
        document.addEventListener('scroll', handler, true);

        return () => {
            document.removeEventListener('click', handler);
            document.removeEventListener('keydown', handler);
            document.removeEventListener('touchstart', handler);
            document.removeEventListener('pointerdown', handler);
            document.removeEventListener('scroll', handler, true);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Canvas + String Physics + Audio Synth
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let width = window.innerWidth;
        let height = window.innerHeight;

        // String Physics Constants
        const STRING_COUNT = 15;
        const MOUSE_RADIUS = 100;
        const DAMPING = 0.95;
        const STIFFNESS = 0.1;

        // A Minor Pentatonic Scale Frequencies
        const frequencies = [
            110.00, 130.81, 146.83, 164.81, 196.00,
            220.00, 261.63, 293.66, 329.63, 392.00,
            440.00, 523.25, 587.33, 659.25, 783.99,
        ];

        // Pre-create AudioContext (will be in 'suspended' state until user gesture)
        if (!audioContextRef.current) {
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        }

        const playStringSound = (index: number, velocity: number) => {
            // Only play if audio has been unlocked by a user gesture
            if (!audioContextRef.current || !isAudioReadyRef.current) return;

            const actx = audioContextRef.current;

            const osc = actx.createOscillator();
            const gainNode = actx.createGain();

            // Synth Character: Sawtooth for "Cyber Guitar" feel
            osc.type = 'sawtooth';

            // Map index to frequency
            const frequency = frequencies[index % frequencies.length];
            osc.frequency.setValueAtTime(frequency, actx.currentTime);

            // Velocity affects volume and brightness
            const intensity = Math.min(Math.abs(velocity) * 0.1, 1);

            gainNode.gain.setValueAtTime(0, actx.currentTime);
            gainNode.gain.linearRampToValueAtTime(intensity * 0.1, actx.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, actx.currentTime + 0.5);

            // Filter for "Pluck" sound
            const filter = actx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(frequency, actx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(frequency * 4, actx.currentTime + 0.05);
            filter.frequency.exponentialRampToValueAtTime(frequency, actx.currentTime + 0.5);

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(actx.destination);

            osc.start();
            osc.stop(actx.currentTime + 0.6);
        };

        // Mouse state
        const mouse = { x: -1000, y: -1000 };

        class GuitarString {
            x: number;
            curX: number;
            velX: number;
            targetX: number;
            y: number;
            index: number;
            plucked: boolean;

            constructor(x: number, index: number) {
                this.x = x;
                this.targetX = x;
                this.curX = x;
                this.velX = 0;
                this.y = height / 2;
                this.index = index;
                this.plucked = false;
            }

            update() {
                const dx = mouse.x - this.targetX;
                const dist = Math.abs(dx);

                if (dist < MOUSE_RADIUS) {
                    const pull = mouse.x - this.targetX;
                    this.velX += (pull - (this.curX - this.targetX)) * 0.1;
                    this.y = mouse.y;

                    // Trigger sound on initial contact (pluck)
                    if (!this.plucked && Math.abs(this.velX) > 0.5) {
                        playStringSound(this.index, this.velX);
                        this.plucked = true;
                    }
                } else {
                    this.plucked = false;
                }

                // Spring physics to return to center
                const displacement = this.targetX - this.curX;
                const acceleration = displacement * STIFFNESS;
                this.velX += acceleration;
                this.velX *= DAMPING;
                this.curX += this.velX;
            }

            draw(drawCtx: CanvasRenderingContext2D) {
                drawCtx.beginPath();
                drawCtx.moveTo(this.targetX, 0);
                drawCtx.quadraticCurveTo(this.curX, this.y, this.targetX, height);

                const alpha = 0.1 + (Math.abs(this.velX) / 20);

                if (Math.abs(this.velX) > 0.5) {
                    drawCtx.strokeStyle = `rgba(204, 255, 0, ${Math.min(alpha, 0.6)})`;
                    drawCtx.lineWidth = 2;
                } else {
                    drawCtx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
                    drawCtx.lineWidth = 1;
                }

                drawCtx.stroke();
            }
        }

        let strings: GuitarString[] = [];
        const buildStrings = () => {
            strings = [];
            for (let i = 1; i < STRING_COUNT; i++) {
                strings.push(new GuitarString(i * (width / STRING_COUNT), i));
            }
        };

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                mouse.x = x;
                mouse.y = y;
            } else {
                mouse.x = -1000;
                mouse.y = -1000;
            }
        };

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            buildStrings();
        };

        window.addEventListener("resize", onResize);
        window.addEventListener("mousemove", onMouseMove);
        onResize();

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            strings.forEach(s => {
                s.update();
                s.draw(ctx);
            });
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener("resize", onResize);
            window.removeEventListener("mousemove", onMouseMove);
            cancelAnimationFrame(animationFrameId);
            if (audioContextRef.current) {
                audioContextRef.current.close();
                audioContextRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="absolute inset-0 z-0 pointer-events-none"
                style={{ width: '100%', height: '100%' }}
            />
            <div className="absolute bottom-10 left-10 font-mono text-[10px] select-none pointer-events-none flex flex-col gap-1">
                {audioActive ? (
                    <span className="text-acid flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse shadow-[0_0_8px_#CCFF00]" />
                        AUDIO_LINK: ONLINE
                    </span>
                ) : (
                    <span className="text-silver/40 flex items-center gap-2 animate-pulse">
                        <span className="w-1.5 h-1.5 rounded-full bg-silver/30" />
                        AUDIO_LINK: OFFLINE [CLICK ANYWHERE TO ACTIVATE]
                    </span>
                )}
            </div>
        </>
    );
}
