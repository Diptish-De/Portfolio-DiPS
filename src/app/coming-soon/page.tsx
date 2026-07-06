"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Terminal, ArrowLeft } from "lucide-react";
import GridBackground from "@/components/GridBackground";
import { Suspense } from "react";

function ComingSoonContent() {
    const searchParams = useSearchParams();
    const project = searchParams?.get("project") || "SECURE_ASSET";

    return (
        <main className="relative min-h-screen flex flex-col items-center justify-center p-8 overflow-hidden bg-background">
            {/* HUD Status */}
            <div className="absolute top-8 left-8 flex items-center gap-2 font-mono text-[10px] text-silver/40">
                <span className="w-1.5 h-1.5 rounded-full bg-acid animate-pulse shadow-[0_0_8px_#D7FF2F]" />
                <span>SYS_LINK: ACTIVE</span>
                <span className="text-acid">::</span>
                <span>DECRYPT_MODE</span>
            </div>

            <div className="z-10 flex flex-col items-center text-center max-w-md w-full space-y-8 p-8 border border-silver/10 bg-[#070707] shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
                {/* Visual Scanner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-acid" />
                <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-acid" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-acid" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-acid" />

                {/* Diagnostics */}
                <div className="font-mono text-[9px] text-silver/30 space-y-1 uppercase tracking-widest text-left w-full border-b border-silver/5 pb-4">
                    <div>RESOURCE: {project}</div>
                    <div>ACCESS: RESTRICTED</div>
                    <div>EST_DECRYPTION: IN_PROGRESS</div>
                </div>

                {/* Main coming soon block */}
                <div className="space-y-4 py-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border border-acid/20 text-acid font-mono text-[10px] tracking-widest uppercase">
                        <Terminal className="w-3.5 h-3.5 animate-pulse" />
                        ACCESS_PENDING
                    </div>
                    <h1 className="text-3xl font-space font-black tracking-tight text-white uppercase">
                        COMING SOON
                    </h1>
                    <p className="font-mono text-xs text-silver/50 max-w-xs mx-auto leading-relaxed">
                        This digital dossier section is currently undergoing deployment protocols. Check back soon.
                    </p>
                </div>

                {/* Return button */}
                <div className="w-full pt-4 border-t border-silver/5 flex justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 font-mono text-xs text-acid hover:text-white transition-colors cursor-pointer group"
                    >
                        <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                        RETURN_TO_HOME
                    </Link>
                </div>
            </div>

            {/* Background Accent Grid */}
            <div className="absolute top-10 left-10 w-4 h-4 border-l border-t border-silver/10" />
            <div className="absolute top-10 right-10 w-4 h-4 border-r border-t border-silver/10" />
            <div className="absolute bottom-10 left-10 w-4 h-4 border-l border-b border-silver/10" />
            <div className="absolute bottom-10 right-10 w-4 h-4 border-r border-b border-silver/10" />
        </main>
    );
}

export default function ComingSoon() {
    return (
        <>
            <GridBackground />
            <Suspense fallback={
                <div className="min-h-screen flex items-center justify-center font-mono text-xs text-silver/40">
                    INITIALIZING DECRYPTOR...
                </div>
            }>
                <ComingSoonContent />
            </Suspense>
        </>
    );
}
