import GlitchText from "./ui/GlitchText";
import CyberButton from "./ui/CyberButton";

export default function Footer() {
    return (
        <footer className="relative py-12 sm:py-20 bg-background border-t border-silver/10 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col items-center text-center gap-12 relative z-10">

                {/* Call to Action */}
                <div className="space-y-6">
                    <p className="text-acid font-mono text-sm tracking-widest">TRANSMISSION_OPEN</p>
                    <h2 className="text-5xl md:text-7xl font-space font-bold">
                        READY TO <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--color-silver)" }}>COLLABORATE?</span>
                    </h2>
                    <a href="mailto:dediptish10@gmail.com">
                        <CyberButton className="mt-8">Initialize_Comms</CyberButton>
                    </a>
                </div>

                {/* Footer Links grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 w-full max-w-4xl mt-12 text-left font-mono text-sm">
                    <div className="space-y-4">
                        <h4 className="text-silver/40">SOCIALS</h4>
                        <ul className="space-y-2 text-silver/80">
                            <li><a href="https://github.com/Diptish-De" target="_blank" rel="noopener noreferrer" className="hover:text-acid transition-colors">GITHUB</a></li>
                            <li><a href="https://linkedin.com/in/diptish-de" target="_blank" rel="noopener noreferrer" className="hover:text-acid transition-colors">LINKEDIN</a></li>
                            <li><a href="https://instagram.com/diptish.verse" target="_blank" rel="noopener noreferrer" className="hover:text-acid transition-colors">INSTAGRAM</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-silver/40">CONTACT</h4>
                        <ul className="space-y-2 text-silver/80">
                            <li><a href="mailto:dediptish10@gmail.com" className="hover:text-acid transition-colors">EMAIL</a></li>
                            <li><a href="https://moodrip.com" target="_blank" rel="noopener noreferrer" className="hover:text-acid transition-colors">MOODRIP</a></li>
                        </ul>
                    </div>
                    <div className="space-y-4 col-span-2">
                        <h4 className="text-silver/40">DIGITAL_SIGNATURE</h4>
                        <p className="text-silver/60">
                            I build fast, ship often, and help others do the same.
                            <br />© 2024 Diptish De.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent mt-12" />
                <div className="w-full flex justify-between font-mono text-[10px] text-silver/30">
                    <span>ID: DIPS-2024</span>
                    <span>SECURE_CONNECTION</span>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background" />
        </footer>
    );
}
