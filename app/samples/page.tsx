"use client";

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import dynamic from "next/dynamic";
import { samples } from "@/lib/samples";

const Footer = dynamic(
  () => import("@/components/ui/footer").then(m => ({ default: m.Footer })),
  { ssr: false }
);

export default function SamplesPage() {
  const stats = [
    { label: "Continents", value: "4" },
    { label: "Data Samples", value: "150k+" },
    { label: "FPS Synced", value: "60" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-gilroy selection:bg-white/10 items-center overflow-x-hidden scroll-smooth">
      <Navbar />
      
      {/* Visual Background Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-gradient-to-b from-blue-500/5 to-transparent opacity-20" />
      </div>

      {/* Main Container - Tightened & Fast */}
      <main className="flex-1 w-full max-w-[1200px] flex flex-col items-center px-4 md:px-12 relative z-10">
        
        {/* Combined Hero & Narrative - Everything on one screen for fast access */}
        <section className="w-full flex flex-col items-center text-center pt-32 pb-20 md:pt-48 md:pb-24">
          {/* Main Title */}
          <div className="max-w-4xl mx-auto flex flex-col items-center mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1] reveal">
              Multimodal <br />
              <span className="font-rhymes italic font-thin text-white/70 block" style={{ marginTop: '8px' }}>Data Samples</span>
            </h1>
          </div>

        </section>

        {/* Video Grid Section - Starts quickly after the narrative */}
        <section className="w-full flex flex-col items-center pb-32">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full max-w-full justify-items-center">
            {samples.map((sample, idx) => (
              <div 
                key={sample.id} 
                className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 reveal w-full max-w-[340px]"
                style={{ 
                  animationDelay: `${0.1 + idx * 0.05}s`,
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: '#0a0a0a'
                }}
              >
                {/* Background Video / Preview */}
                <div className="aspect-[3/4.2] relative overflow-hidden bg-white/5">
                  <video
                    src={sample.preview}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="h-full w-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  
                  {/* Internal Content - Compact and Clean */}
                  <div 
                    className="absolute inset-0 flex flex-col justify-end"
                    style={{ padding: '48px 32px' }}
                  >
                    <div className="flex flex-col">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-tight drop-shadow-xl" style={{ marginBottom: '10px' }}>
                        {sample.id === "lego-assembly" ? "Lego Assembly" : sample.title}
                      </h3>
                      <p className="text-[13px] text-white/90 font-light leading-relaxed drop-shadow-lg" style={{ marginBottom: '28px' }}>
                        Full-stack multimodal data: Egocentric Stereo RGB+Depth, dual Wrist Cameras, Stereo Exocentric, and high-frequency Tactile Force Sensing.
                      </p>
                      
                      <Link href={`/samples/${sample.id}`} className="block w-full">
                        <button 
                          className="w-full bg-white text-black font-bold text-sm hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-2xl"
                          style={{ 
                            height: '56px',
                            borderRadius: '12px'
                          }}
                        >
                          View Sample
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={{ height: '80px' }} />
      </main>

      <Footer />
    </div>
  );
}
