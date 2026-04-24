"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { BentoGrid } from "@/components/ui/bento-grid";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { Footer } from "@/components/ui/footer";
import { cn } from "@/lib/utils";

const ShaderAnimation = dynamic(
  () => import("@/components/ui/shader-animation").then(m => ({ default: m.ShaderAnimation })),
  { ssr: false }
);
const LaunchSection = dynamic(
  () => import("@/components/ui/launch").then(m => ({ default: m.LaunchSection })),
  { ssr: false }
);
const WebGLShader = dynamic(
  () => import("@/components/ui/web-gl-shader").then(m => ({ default: m.WebGLShader })),
  { ssr: false }
);
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [narrativeTriggered, setNarrativeTriggered] = useState([false, false, false]);

  useEffect(() => {
    const narrativeSection = document.querySelector("#narrative-section");
    const texts = gsap.utils.toArray<HTMLElement>(".narrative-text");

    if (narrativeSection && texts.length > 0) {
      // Trigger all EncryptedText animations as soon as section enters —
      // keeps React state updates out of the scrub timeline entirely
      ScrollTrigger.create({
        trigger: narrativeSection,
        start: "top 80%",
        once: true,
        onEnter: () => setNarrativeTriggered([true, true, true]),
      });

      texts.forEach((text) => gsap.set(text, { opacity: 0, y: 30 }));

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: narrativeSection,
          start: "top top",
          end: "+=160%",
          pin: true,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      texts.forEach((text) => {
        tl.to(text, { opacity: 1, y: 0, duration: 1, ease: "power2.out" })
          .to(text, { opacity: 0, y: -30, duration: 0.8, ease: "power2.in" }, "+=0.2");
      });

      // Small buffer so the last text fully exits before unpin
      tl.to({}, { duration: 0.3 });
    }

    // Refresh after fonts / images settle so pin height is accurate
    const timer = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(timer);
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
      <section id="narrative-section" className="relative z-10 w-full h-screen bg-[#050505] overflow-hidden">
        {/* Text — centered at ~44% from top */}
        <div className="absolute inset-x-0 top-[44%] -translate-y-1/2 z-20 w-full flex justify-center">
          <div className="relative w-full max-w-[320px] md:max-w-xl lg:max-w-2xl text-center">
            <div className="narrative-text absolute inset-0 flex items-center justify-center w-full font-gilroy font-light text-white text-[17px] md:text-[22px] lg:text-[26px] leading-[1.65] tracking-normal opacity-0 text-center">
              <EncryptedText text="Saturn Labs turns human motion into the force that trains the world's most ambitious robots." triggered={narrativeTriggered[0]} revealDelayMs={8} flipDelayMs={15} />
            </div>
            <div className="narrative-text absolute inset-0 flex items-center justify-center w-full font-gilroy font-light text-white text-[17px] md:text-[22px] lg:text-[26px] leading-[1.65] tracking-normal opacity-0 text-center">
              <EncryptedText text="A robot is only as good as its data, and beneath every breakthrough in Physical AI, there's a symphony of real world human action powering that learning." triggered={narrativeTriggered[1]} revealDelayMs={8} flipDelayMs={15} />
            </div>
            <div className="narrative-text absolute inset-0 flex items-center justify-center w-full font-gilroy font-light text-white text-[17px] md:text-[22px] lg:text-[26px] leading-[1.65] tracking-normal opacity-0 text-center">
              <EncryptedText text="Saturn Labs captures that action, building the multimodal datasets that teach robots how to move, manipulate, and navigate the physical world with precision." triggered={narrativeTriggered[2]} revealDelayMs={8} flipDelayMs={15} />
            </div>
            {/* Invisible spacer to hold height */}
            <div className="invisible font-gilroy font-light text-[17px] md:text-[22px] lg:text-[26px] leading-[1.65] text-center">
              Saturn Labs captures that action, building the multimodal datasets that teach robots how to move, manipulate, and navigate the physical world with precision.
            </div>
          </div>
        </div>

        {/* Shader — anchored flush to the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[75%] md:h-[70%] z-0 overflow-hidden">
          <WebGLShader />
          {/* Top fade */}
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#050505] to-transparent pointer-events-none z-10" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-10" />
        </div>
      </section>

      {/* ═══════════════════ DATASET CARDS ═══════════════════ */}
      <section
        className="relative w-full bg-[#050505]"
        style={{ padding: 'clamp(200px, 25vw, 10px) clamp(24px, 11vw, 160px)' }}
      >
        {/* Heading */}
        <h2
          className="font-gilroy font-normal text-white leading-tight"
          style={{ fontSize: 'clamp(20px, 3vw, 34px)', marginBottom: 'clamp(24px, 3.5vw, 48px)' }}
        >
          <EncryptedText text="Explore our" encryptedClassName="text-white/30" /> <span className="font-rhymes italic"><EncryptedText text="data" encryptedClassName="text-white/30" /></span>
        </h2>

        {/* Dataset rows — dividers full-width, content indented */}
        <div className="flex flex-col">
          {[
            { label: "Lego Assembly" },
            { label: "Cloth Folding" },
            { label: "Electronics Assembly" },
            { label: "RGB Human Data", subtitle: "100 hour sample", highlight: true },
          ].map((card) => (
            <div
              key={card.label}
              className={cn(
                "group border-t border-white/[0.09] transition-colors duration-300",
                card.highlight ? "bg-white/[0.03] hover:bg-white/[0.05]" : "hover:bg-white/[0.02]"
              )}
            >
              <div
                className="flex items-center justify-between"
                style={{ padding: 'clamp(24px, 3.2vw, 48px) clamp(12px, 2.2vw, 32px)' }}
              >
                <div className="flex flex-col gap-1">
                  <span
                    className="font-gilroy font-light text-white/90"
                    style={{ fontSize: 'clamp(12px, 1.2vw, 15px)' }}
                  >
                    {card.label}
                  </span>
                  {card.subtitle && (
                    <span className="font-gilroy font-light text-white/40" style={{ fontSize: '11px' }}>
                      {card.subtitle}
                    </span>
                  )}
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1e1e1e] rounded-[10px] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                  style={{ width: 'clamp(30px, 2.8vw, 40px)', height: 'clamp(30px, 2.8vw, 40px)' }}
                >
                  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 'clamp(10px, 1vw, 13px)', height: 'clamp(10px, 1vw, 13px)' }}>
                    <path d="M3 13L13 3M13 3H6M13 3V10" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
          <div className="border-t border-white/[0.09]" />
        </div>

        {/* Disclaimer below links */}
        <div className="flex justify-center" style={{ padding: '20px 0 8px' }}>
          <p
            className="font-gilroy font-light text-white/30 text-center"
            style={{ fontSize: 'clamp(11px, 1vw, 13px)', maxWidth: '500px', lineHeight: 1.8 }}
          >
            Opens Rerun visualizer in a new tab. It may be very slow on browsers due to very large MCAP size.
          </p>
        </div>
      </section>

      {/* ═══════════════════ LAUNCH CTA ═══════════════════ */}
      <LaunchSection />

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <Footer />
    </div>
  );
}
