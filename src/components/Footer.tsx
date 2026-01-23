import GlitchText from "./ui/GlitchText";
import CyberButton from "./ui/CyberButton";

export default function Footer() {
    return (
        <footer className="relative py-20 bg-background border-t border-silver/10 overflow-hidden">
            <div className="container mx-auto px-6 flex flex-col items-center text-center gap-12 relative z-10">

                {/* Call to Action */}
                <div className="space-y-6">
                    <p className="text-acid font-mono text-sm tracking-widest">TRANSMISSION_OPEN</p>
                    <h2 className="text-5xl md:text-7xl font-space font-bold">
                        READY TO <br />
                        <span className="text-transparent" style={{ WebkitTextStroke: "1px var(--color-silver)" }}>COLLABORATE?</span>
                    </h2>
                    <CyberButton className="mt-8">Initialize_Comms</CyberButton>
                </div>

                {/* Footer Links grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-24 w-full max-w-4xl mt-12 text-left font-mono text-sm">
                    <div className="space-y-4">
                        <h4 className="text-silver/40">SOCIALS</h4>
                        <ul className="space-y-2 text-silver/80">
                            <li className="hover:text-acid cursor-pointer transition-colors">GITHUB</li>
                            <li className="hover:text-acid cursor-pointer transition-colors">LINKEDIN</li>
                            <li className="hover:text-acid cursor-pointer transition-colors">TWITTER</li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h4 className="text-silver/40">SYSTEM</h4>
                        <ul className="space-y-2 text-silver/80">
                            <li className="hover:text-acid cursor-pointer transition-colors">CHANGELOG</li>
                            <li className="hover:text-acid cursor-pointer transition-colors">DOCS</li>
                            <li className="hover:text-acid cursor-pointer transition-colors">STATUS</li>
                        </ul>
                    </div>
                    <div className="space-y-4 col-span-2">
                        <h4 className="text-silver/40">DIGITAL_SIGNATURE</h4>
                        <p className="text-silver/60">
                            Designed and built in the void. KPR Verse inspired aesthetic.
                            <br />© 2024 Diptish De.
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-silver/20 to-transparent mt-12" />
                <div className="w-full flex justify-between font-mono text-[10px] text-silver/30">
                    <span>ID: 808-101-332</span>
                    <span>SECURE_CONNECTION</span>
                </div>
            </div>

            {/* Background Decor */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 via-background to-background" />
        </footer>
    );
}
