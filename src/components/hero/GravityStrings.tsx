"use client";

import { useEffect, useRef } from "react";

export default function GravityStrings() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const audioContextRef = useRef<AudioContext | null>(null);

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
        const SPACING = width / STRING_COUNT;
        const MOUSE_RADIUS = 100;
        const DAMPING = 0.95;
        const STIFFNESS = 0.1;

        // Audio Setup
        // A Minor Pentatonic Scale Frequencies
        // A2, C3, D3, E3, G3, A3, C4, D4, E4, G4, A4...
        const frequencies = [
            110.00, 130.81, 146.83, 164.81, 196.00, // Low oct
            220.00, 261.63, 293.66, 329.63, 392.00, // Mid oct
            440.00, 523.25, 587.33, 659.25, 783.99, // High oct
        ];

        const initAudio = () => {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
        };

        const playStringSound = (index: number, velocity: number) => {
            if (!audioContextRef.current) return;

            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') ctx.resume();

            const osc = ctx.createOscillator();
            const gainNode = ctx.createGain();

            // Synth Character: Sawtooth for "Cyber Guitar" feel
            osc.type = 'sawtooth';

            // Map index to frequency (cycle through array if more strings than notes)
            const frequency = frequencies[index % frequencies.length];
            osc.frequency.setValueAtTime(frequency, ctx.currentTime);

            // Velocity affects volume and brightness
            // Clamp velocity impact
            const intensity = Math.min(Math.abs(velocity) * 0.1, 1);

            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(intensity * 0.1, ctx.currentTime + 0.01); // Attack
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5); // Decay (Pluck)

            // Filter for "Pluck" sound (Lowpass opens and closes)
            const filter = ctx.createBiquadFilter();
            filter.type = "lowpass";
            filter.frequency.setValueAtTime(frequency, ctx.currentTime);
            filter.frequency.exponentialRampToValueAtTime(frequency * 4, ctx.currentTime + 0.05);
            filter.frequency.exponentialRampToValueAtTime(frequency, ctx.currentTime + 0.5);

            osc.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 0.6);
        };

        // State
        const mouse = { x: -1000, y: -1000 };

        class String {
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
                // Calculate distance from mouse to string baseline
                const dx = mouse.x - this.targetX;
                const dy = mouse.y - this.y;
                const dist = Math.abs(dx);

                if (dist < MOUSE_RADIUS) {
                    // Mouse is pulling the string
                    const pull = mouse.x - this.targetX;
                    this.velX += (pull - (this.curX - this.targetX)) * 0.1;
                    this.y = mouse.y;

                    // Trigger sound on initial "hard" contact (pluck)
                    // Simple logic: If velocity spikes, play sound
                    if (!this.plucked && Math.abs(this.velX) > 0.5) {
                        playStringSound(this.index, this.velX);
                        this.plucked = true; // Debounce
                    }
                } else {
                    this.plucked = false; // Reset when mouse leaves
                }

                // Spring physics to return to center
                const displacement = this.targetX - this.curX;
                const acceleration = displacement * STIFFNESS;
                this.velX += acceleration;
                this.velX *= DAMPING;
                this.curX += this.velX;
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.moveTo(this.targetX, 0);
                ctx.quadraticCurveTo(this.curX, this.y, this.targetX, height);

                const velocityIntensity = Math.min(Math.abs(this.velX) * 2, 100);
                const alpha = 0.1 + (Math.abs(this.velX) / 20);

                if (Math.abs(this.velX) > 0.5) {
                    ctx.strokeStyle = `rgba(204, 255, 0, ${Math.min(alpha, 0.6)})`;
                    ctx.lineWidth = 2;
                } else {
                    ctx.strokeStyle = `rgba(255, 255, 255, 0.05)`;
                    ctx.lineWidth = 1;
                }

                ctx.stroke();
            }
        }

        const strings: String[] = [];
        for (let i = 1; i < STRING_COUNT; i++) {
            strings.push(new String(i * (width / STRING_COUNT), i));
        }

        const onMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Strict Bounds Check: only update if inside
            if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
                mouse.x = x;
                mouse.y = y;
                initAudio();
            } else {
                // Reset if outside
                mouse.x = -1000;
                mouse.y = -1000;
            }
        };

        const onResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            strings.length = 0;
            for (let i = 1; i < STRING_COUNT; i++) {
                strings.push(new String(i * (width / STRING_COUNT), i));
            }
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
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 z-0 pointer-events-none"
            style={{ width: '100%', height: '100%' }}
        />
    );
}
