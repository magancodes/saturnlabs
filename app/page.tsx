"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { ShaderAnimation } from "@/components/ui/shader-animation";
import { BentoGrid } from "@/components/ui/bento-grid";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Footer } from "@/components/ui/footer";
import { WebGLShader } from "@/components/ui/web-gl-shader";
import ShaderBackground from "@/components/ui/shader-background";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Narrative Pinned Sequence
    const narrativeSection = document.querySelector("#narrative-section");
    const texts = gsap.utils.toArray<HTMLElement>(".narrative-text");
    
    if (narrativeSection && texts.length > 0) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: narrativeSection,
          start: "top top",
          end: "+=180%", // Faster sequence
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        }
      });

      texts.forEach((text, i) => {
        // Initially hide all
        gsap.set(text, { opacity: 0, y: 30 });
        
        tl.to(text, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out"
        })
        .to(text, {
          opacity: 0,
          y: -30,
          duration: 1,
          ease: "power2.in"
        }, "+=0.5"); // Pause briefly
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-[#050505]">
      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Shader — only behind hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-black/65 z-[1]"></div>
        </div>

      {/* ═══════════════════ HEADER ═══════════════════ */}
      <header
        className="relative z-20 flex justify-between items-center"
        style={{ padding: "40px 50px" }}
      >
        {/* Logo */}
        <div className="flex items-center gap-4 shrink-0">
          <Image src="/logo.svg" alt="Saturn Labs Logo" width={51} height={58} style={{ width: "36px", height: "auto" }} />
          <span style={{ fontSize: "24px" }} className="font-gilroy font-normal tracking-tight text-white">Saturn Labs</span>
        </div>

        {/* Nav — centered, hidden on mobile */}
        <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2" style={{ gap: "72px" }}>
          <a href="#" className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "16px" }}>home</a>
          <a href="#" className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "16px" }}>data</a>
          <a href="#" className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "16px" }}>research</a>
        </nav>

        {/* Right side: Connect button (desktop) + Hamburger (mobile) */}
        <div className="flex items-center gap-6">
          {/* Connect button — hidden on mobile */}
          <a
            href="#"
            className="hidden lg:inline-flex bg-white text-black font-gilroy font-semibold items-center hover:opacity-90 active:scale-95 transition-all whitespace-nowrap"
            style={{ padding: "16px 32px", borderRadius: "8px", fontSize: "15px", gap: "16px" }}
          >
            connect with us
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>

          {/* Hamburger — visible on mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] relative z-50"
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-[2px] bg-white transition-all duration-300 origin-center"
              style={{
                transform: menuOpen ? "rotate(45deg) translate(0, 4px)" : "none",
              }}
            />
            <span
              className="block w-6 h-[2px] bg-white transition-all duration-300"
              style={{
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-[2px] bg-white transition-all duration-300 origin-center"
              style={{
                transform: menuOpen ? "rotate(-45deg) translate(0, -4px)" : "none",
              }}
            />
          </button>
        </div>
      </header>

      {/* ═══════════════════ MOBILE MENU OVERLAY ═══════════════════ */}
      <div
        className="fixed inset-0 z-30 flex flex-col items-center justify-center transition-all duration-500 lg:hidden"
        style={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          background: "rgba(0, 0, 0, 0.95)",
          backdropFilter: "blur(20px)",
        }}
      >
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-10 right-12 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-opacity"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-12">
          <a href="#" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>home</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>data</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>research</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="bg-white text-black font-gilroy font-semibold inline-flex items-center hover:opacity-90 transition-all mt-4" style={{ padding: "16px 32px", borderRadius: "8px", fontSize: "16px", gap: "12px" }}>connect with us</a>
        </nav>
      </div>

      {/* ═══════════════════ HERO CONTENT ═══════════════════ */}
      <main
        className="relative z-10 flex flex-col justify-end"
        style={{ minHeight: "calc(100vh - 120px)", paddingBottom: "100px", paddingLeft: "50px", paddingRight: "50px" }}
      >
        <div>
          {/* Backed by badge */}
          <div className="flex items-center gap-3 mb-8 blur-in" style={{ animationDelay: "0s" }}>
            <span className="font-mono text-white/60 uppercase tracking-[0.2em]" style={{ fontSize: "11px" }}>Backed by</span>
            <Image src="/images/EF.png" alt="Entrepreneurs First" width={160} height={36} className="rounded-sm" style={{ height: "24px", width: "auto" }} />
          </div>

          <h1
            className="font-gilroy font-normal text-white blur-in"
            style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "16px", animationDelay: "0.15s" }}
          >
            <EncryptedText text="Human Data for a" encryptedClassName="text-white/30" />
            <br />
            <span className="font-rhymes italic font-thin">
              <EncryptedText text="Physical World" encryptedClassName="text-white/30" />
            </span>
          </h1>

          <p
            className="text-white/50 font-gilroy font-light blur-in"
            style={{ fontSize: "clamp(16px, 2.5vw, 18px)", maxWidth: "600px", lineHeight: 1.6, marginBottom: "24px", animationDelay: "0.3s" }}
          >
            Multimodal human data, purpose-built for robots and embodied systems.
          </p>

          <div className="blur-in" style={{ animationDelay: "0.6s" }}>
            <a href="#" className="bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] font-gilroy font-medium text-white inline-flex items-center hover:bg-white/10 hover:border-white/30 hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)] transition-all duration-300 group" style={{ padding: "18px 40px", borderRadius: "12px", fontSize: "15px", gap: "20px" }}>
              check samples
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </main>
      </div>

      {/* ═══════════════════ BENTO VIDEO GRID ═══════════════════ */}
      <BentoGrid />

      {/* ═══════════════════ NARRATIVE SECTION (PINNED) ═══════════════════ */}
      <section id="narrative-section" className="relative z-10 w-full min-h-screen bg-[#0a0a0a] overflow-hidden flex flex-col items-center justify-between py-24 md:py-32">
        <div className="flex-1 w-full flex items-center justify-center relative">
          <div className="relative w-full max-w-5xl mx-auto px-16 md:px-24 text-center h-[300px] md:h-[200px]">
            <div className="narrative-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full font-gilroy font-light text-white text-[19px] md:text-[23px] tracking-tight leading-relaxed opacity-0">
               Saturn Labs turns human motion into the force that trains the world&apos;s most ambitious robots.
            </div>
            <div className="narrative-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full font-gilroy font-light text-white text-[19px] md:text-[23px] tracking-tight leading-relaxed opacity-0">
              A robot is only as good as its data, and beneath every breakthrough in Physical AI, there&apos;s a symphony of real world human action powering that learning.
            </div>
            <div className="narrative-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full font-gilroy font-light text-white text-[19px] md:text-[23px] tracking-tight leading-relaxed opacity-0">
              Saturn Labs captures that action, building the multimodal datasets that teach robots how to move, manipulate, and navigate the physical world with precision.
            </div>
          </div>
        </div>

        {/* Full-bleed Transition Shader at bottom */}
        <div className="w-full h-[70vh] relative -mt-32 overflow-hidden items-end flex">
          <div className="absolute inset-0 z-0">
            <ShaderBackground />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-[#0a0a0a] pointer-events-none z-10" />
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </div>
  );
}
