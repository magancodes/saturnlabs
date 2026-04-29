"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Loader2 } from "lucide-react";
import { Navbar } from "@/components/ui/navbar";
import dynamic from "next/dynamic";
import { Sample } from "@/lib/samples";

const Footer = dynamic(
  () => import("@/components/ui/footer").then(m => ({ default: m.Footer })),
  { ssr: false }
);

function StreamVideo({ src }: { src: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="w-full h-auto max-h-screen object-contain"
      />
    </div>
  );
}

export default function SampleDetailClient({ sample }: { sample: Sample }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-gilroy selection:bg-white/10 items-center overflow-x-hidden">
      <Navbar />
      
      {/* Spacer for fixed Nav - Responsive */}
      <div className="h-32 md:h-64" />

      <main className="flex-1 w-full max-w-[1400px] flex flex-col items-center px-4 md:px-12 lg:px-16 relative z-10">
        {/* Back Link & Header Section - Centered */}
        <section 
          className="w-full flex flex-col items-center text-center"
          style={{ marginBottom: '80px' }}
        >
          <Link
            href="/samples"
            className="group inline-flex items-center gap-4 text-[12px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-all mb-16"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 group-hover:border-white/30 transition-all">
              <ArrowLeft className="h-3 w-3" />
            </div>
            Back to library
          </Link>
          
          <div className="flex flex-col items-center gap-12">
            <div className="space-y-10">
              <h1 
                className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-tight reveal text-center"
              >
                {sample.title}
              </h1>
              <p 
                className="text-lg md:text-xl text-white/40 leading-relaxed max-w-2xl font-light reveal text-center mx-auto"
                style={{ marginTop: '48px' }}
              >
                Multimodal egocentric and exocentric streams with high-bandwidth tactile force sensing. Tightly synced 1080p 60fps.
              </p>
            </div>
            
            {sample.rrdUrl && (
              <a
                href={`https://rerun.io/viewer?url=${encodeURIComponent(sample.rrdUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-4 bg-white text-black font-bold h-16 px-10 rounded-xl hover:bg-zinc-100 transition-all text-base shadow-2xl"
              >
                <ExternalLink className="h-5 w-5" />
                Launch Visualizer
              </a>
            )}
          </div>
        </section>

        {/* Bento Grid Section - WRIST & TACTILE GROUPED IN ONE ROW */}
        <section className="w-full pb-32">
          <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8 md:gap-12 items-start">
            {sample.streams.map((item, index) => {
              const title = item.title.toLowerCase();
              const isHero = title.includes("egocentric") || title.includes("exocentric");
              const isPeripheral = title.includes("wrist") || title.includes("tactile");
              
              let spanClasses = "md:col-span-6 lg:col-span-12";

              if (isHero) {
                spanClasses = "md:col-span-6 lg:col-span-12";
              } else if (isPeripheral) {
                // Group wrist and tactile into one row
                const peripheralCount = sample.streams.filter(s => 
                  s.title.toLowerCase().includes("wrist") || s.title.toLowerCase().includes("tactile")
                ).length;
                
                if (peripheralCount === 1) spanClasses = "md:col-span-6 lg:col-span-12";
                else if (peripheralCount === 2) spanClasses = "md:col-span-3 lg:col-span-6";
                else spanClasses = "md:col-span-2 lg:col-span-4"; // 3+ items share the row
              }
              
              return (
                <div
                  key={index}
                  className={`flex flex-col overflow-hidden rounded-[24px] border border-white/5 bg-[#0a0a0a] transition-all hover:border-white/20 group relative shadow-2xl ${spanClasses}`}
                >
                  {/* Stream Label Overlay - Fully Transparent Backdrop */}
                  <div className="absolute top-8 left-8 z-20">
                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_15px_rgba(34,197,94,0.6)]" />
                      <h3 className="text-[14px] uppercase tracking-[0.4em] text-white font-gilroy font-bold whitespace-nowrap drop-shadow-[0_2px_8px_rgba(0,0,0,1)]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="relative w-full h-full flex items-center justify-center">
                    <StreamVideo src={item.video} />
                  </div>
                </div>
              );
            })}
            
            {!sample.rrdUrl && (
              <div className="md:col-span-6 lg:col-span-12 flex items-center justify-center p-20 border border-dashed border-white/10 rounded-[24px] bg-white/[0.01] mt-8 h-40">
                <p className="font-mono text-white/20 uppercase tracking-[0.4em] text-[10px] font-bold text-center">
                  Rerun RRD Visualization coming soon
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Footer Spacer */}
        <div style={{ height: '200px' }} />
      </main>

      <Footer />
    </div>
  );
}
