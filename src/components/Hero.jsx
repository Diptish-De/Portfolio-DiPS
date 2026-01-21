import { motion } from 'framer-motion';
import { useScramble } from '../hooks/useScramble';
import { ArrowDown } from 'lucide-react';

const Hero = () => {
    const headline = useScramble("THE BUILDER");

    return (
        <section id="hero" className="min-h-screen flex flex-col items-center justify-center p-4 bg-halftone">
            <div className="relative w-full max-w-4xl aspect-[3/4] md:aspect-video bg-primary border-8 border-black box-shadow-comic overflow-hidden flex flex-col">

                {/* Comic Header Bar */}
                <div className="bg-secondary border-b-8 border-black p-4 flex justify-between items-center">
                    <span className="font-comic text-2xl text-white tracking-widest drop-shadow-md">ISSUE #1</span>
                    <span className="font-mono text-sm font-bold bg-white px-2 py-1 border-2 border-black transform rotate-2">
                        PRICE: 1 FOLLOW
                    </span>
                </div>

                {/* Main Cover Art Area */}
                <div className="flex-grow relative flex items-center justify-center bg-background overflow-hidden">
                    {/* Background Noise/Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

                    {/* 3D Face Representation (Placeholder Circle for now) */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", bounce: 0.5 }}
                        className="w-64 h-64 rounded-full border-4 border-white flex items-center justify-center bg-black relative z-10"
                    >
                        <span className="font-comic text-white text-6xl animate-pulse">?</span>
                    </motion.div>

                    {/* Giant Title */}
                    <div className="absolute top-10 left-10 z-20">
                        <h1 className="font-comic text-8xl md:text-9xl text-white text-shadow-comic leading-none transform -rotate-3">
                            {headline}
                        </h1>
                    </div>

                    {/* Subtext */}
                    <div className="absolute bottom-10 right-10 max-w-sm bg-white border-4 border-black p-4 transform rotate-1 shadow-[8px_8px_0px_#000]">
                        <p className="font-mono text-black text-sm font-bold">
                    > DIPTISH DE initialized.<br />
                    > UI/UX | Frontend | Founder.<br />
                    > Mission: SHIP FAST.
                        </p>
                    </div>
                </div>

                {/* Footer Bar */}
                <div className="bg-white border-t-8 border-black p-4 flex justify-center">
                    <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <ArrowDown className="w-8 h-8 text-black" />
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default Hero;
