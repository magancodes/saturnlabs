"use client";

import { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/ui/navbar";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { samples } from "@/lib/samples";

const Footer = dynamic(
  () => import("@/components/ui/footer").then(m => ({ default: m.Footer })),
  { ssr: false }
);

function SamplePreview({ src }: { src: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full overflow-hidden bg-white/5">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a] z-10">
          <Loader2 className="w-8 h-8 text-white/10 animate-spin" />
        </div>
      )}
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className={`h-full w-full object-cover transition-all duration-1000 ${isLoading ? 'opacity-0' : 'opacity-70 group-hover:opacity-100'}`}
        onLoadedData={() => setIsLoading(false)}
      />
    </div>
  );
}

export default function SamplesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-white font-gilroy selection:bg-white/10 items-center overflow-x-hidden scroll-smooth">
      <Navbar />
      
      {/* Visual Background Depth */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-gradient-to-b from-blue-500/5 to-transparent opacity-20" />
      </div>

      {/* Main Container - Tightened & Fast */}
      <main className="flex-1 w-full max-w-[1200px] flex flex-col items-center px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Dedicated Hero - 50vh height */}
        <section className="w-full h-[50vh] flex flex-col items-center justify-center text-center relative overflow-hidden">
          {/* Main Content */}
          <div className="max-w-5xl mx-auto flex flex-col items-center">
            {/* Subtext on top */}
            <p 
              className="font-rhymes italic font-thin text-white mb-8"
              style={{ fontSize: "16px" }}
            >
              multimodal data samples
            </p>
            
            <div className="flex flex-col gap-6">
              <h1 
                className="font-gilroy font-semibold text-white leading-tight tracking-tight"
                style={{ fontSize: "clamp(20px, 3vw, 32px)" }}
              >
                Egocentric Stereo RGB+Depth + Wrist Cams + Stereo Exocentric + Tactile
              </h1>
              
              <div className="flex flex-col gap-2">
                <p 
                  className="font-gilroy font-light text-white/80"
                  style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.5 }}
                >
                  All cameras at 1080p 60fps &gt;140deg FOV.
                </p>
                <p 
                  className="font-gilroy font-light text-white/80"
                  style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.5 }}
                >
                  &lt;5ms synced MCAP across all streams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Video Grid Section - Multimodal samples (excludes RGB 100-hour) */}
        <section className="w-full flex flex-col items-center" style={{ paddingBottom: "160px" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 w-full max-w-full justify-items-center">
            {samples.filter(s => s.id !== "rgb-100-hour").map((sample, idx) => (
              <div
                key={sample.id}
                className="group relative flex flex-col overflow-hidden transition-all duration-500 hover:-translate-y-2 reveal w-full md:max-w-none"
                style={{
                  animationDelay: `${0.1 + idx * 0.05}s`,
                  borderRadius: '16px',
                  border: sample.highlight ? '1px solid #00E89C' : '1px solid rgba(255, 255, 255, 0.05)',
                  backgroundColor: sample.highlight ? '#00E89C' : '#0a0a0a',
                  minWidth: "350px",
                  maxWidth: "100%"
                }}
              >
                {/* Background Video / Preview */}
                <div className="aspect-video relative overflow-hidden">
                  <SamplePreview src={sample.preview} />

                  {/* Internal Content - Compact and Clean */}
                  <div
                    className={`absolute inset-0 flex flex-col justify-end ${sample.highlight ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent'}`}
                    style={{ padding: '24px 24px' }}
                  >
                    <div className="flex flex-col">
                      <h3 className={`text-lg md:text-xl font-bold tracking-tight leading-tight drop-shadow-xl ${sample.highlight ? 'text-black' : 'text-white'}`} style={{ marginBottom: '16px' }}>
                        {sample.id === "lego-assembly" ? "Lego Assembly" : sample.title}
                      </h3>

                      <Link
                        href={sample.externalUrl || `/samples/${sample.id}`}
                        className="block w-full"
                        target={sample.externalUrl ? "_blank" : undefined}
                        rel={sample.externalUrl ? "noopener noreferrer" : undefined}
                      >
                        <button
                          className={`w-full font-bold text-xs transition-all active:scale-[0.98] shadow-2xl ${sample.highlight ? 'bg-black text-white hover:bg-black/80' : 'bg-white text-black hover:bg-zinc-100'}`}
                          style={{
                            height: '42px',
                            borderRadius: '8px'
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

        {/* ═══════════════════ RGB DATA SAMPLES ═══════════════════ */}
        <section className="w-full flex flex-col items-center" style={{ paddingBottom: "160px" }}>
          {/* Header */}
          <div className="flex flex-col items-center text-center max-w-5xl mx-auto" style={{ marginBottom: "64px", paddingLeft: "16px", paddingRight: "16px" }}>
            <p
              className="font-rhymes italic font-thin text-white"
              style={{ fontSize: "16px", marginBottom: "24px" }}
            >
              RGB data samples
            </p>
            <h2
              className="font-gilroy font-semibold text-white leading-tight tracking-tight"
              style={{ fontSize: "clamp(20px, 3vw, 32px)" }}
            >
              100+ hours of RGB egocentric footage captured across diverse real world environments
            </h2>
          </div>

          {/* Big video card */}
          <div
            className="group relative w-full overflow-hidden reveal"
            style={{
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              backgroundColor: "#0a0a0a",
              minWidth: "350px",
            }}
          >
            <div className="aspect-video relative overflow-hidden">
              <SamplePreview src="https://saturnlabsdevind.blob.core.windows.net/egoencoded/rubysissm@gmail.com/general/b31d2672_VID_20260407_062753.mp4?sv=2026-02-06&st=2026-05-06T13%3A36%3A32Z&se=2026-05-06T17%3A36%3A32Z&sr=b&sp=r&sig=xgZ5twazFZn6eThYuJAdAdE64aL%2BxHsyd8EzUS2dndY%3D&rsct=video%2Fmp4" />

              {/* Dark overlay for text/button visibility */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "rgba(0,0,0,0.35)" }}
              />

              {/* Bottom overlay with title + View Sample button */}
              <div
                className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/30 to-transparent"
                style={{ padding: "32px" }}
              >
                <h3
                  className="font-gilroy font-bold text-white tracking-tight leading-tight drop-shadow-xl"
                  style={{ fontSize: "clamp(18px, 2vw, 22px)", marginBottom: "20px" }}
                >
                  100 hour RGB sample
                </h3>
                <Link
                  href="https://data.saturnlabs.ai/share/9d1c27bc-b8c1-49cd-afd2-8225b8bde355"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <button
                    className="w-full font-bold text-sm bg-white text-black hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-2xl"
                    style={{
                      height: "52px",
                      borderRadius: "10px",
                    }}
                  >
                    View Sample
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ height: '80px' }} />
      </main>

      <Footer />
    </div>
  );
}
