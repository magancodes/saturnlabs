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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = document.querySelector<HTMLElement>(".narrative-section");
    const panels = gsap.utils.toArray<HTMLElement>(".narrative-panel");
    if (!section || panels.length < 3) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    // Sequential: current exits fully before next enters — no overlap
    tl
      .to(panels[0], { opacity: 0, y: -80, duration: 1, ease: "none" })
      .fromTo(panels[1], { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: "none" })
      .to(panels[1], { opacity: 0, y: -80, duration: 1, ease: "none" })
      .fromTo(panels[2], { opacity: 0, y: 80 }, { opacity: 1, y: 0, duration: 1, ease: "none" });

    return () => { ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div className="bg-[#050505]">
      {/* ═══════════════════ FLOATING NAV ═══════════════════ */}
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none" style={{ padding: "18px 24px" }}>
        <header
          className="pointer-events-auto flex items-center justify-between w-full"
          style={{
            maxWidth: "860px",
            padding: "10px 12px 10px 20px",
            borderRadius: "16px",
            background: "rgba(12,12,12,0.72)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}
        >
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 shrink-0">
            <Image src="/logo.svg" alt="Saturn Labs Logo" width={51} height={58} style={{ width: "28px", height: "auto" }} />
            <span className="font-gilroy font-normal tracking-tight text-white hidden sm:block" style={{ fontSize: "18px" }}>Saturn Labs</span>
          </a>

          {/* Nav links — desktop */}
          <nav className="hidden lg:flex items-center" style={{ gap: "8px" }}>
            {[
              { label: "home", href: "/" },
              { label: "data", href: "#data" },
              { label: "research", href: "/research" },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="font-gilroy text-white/55 hover:text-white hover:bg-white/[0.06] transition-all duration-200"
                style={{ fontSize: "14px", padding: "7px 14px", borderRadius: "9px" }}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="hidden lg:inline-flex bg-white text-black font-gilroy font-semibold items-center hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap"
              style={{ padding: "9px 20px", borderRadius: "9px", fontSize: "13px", gap: "10px" }}
            >
              connect with us
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center gap-[5px]"
              aria-label="Toggle menu"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.11)",
              }}
            >
              <span className="block bg-white transition-all duration-300 origin-center" style={{ width: "16px", height: "1.5px", transform: menuOpen ? "rotate(45deg) translate(0, 3.5px)" : "none" }} />
              <span className="block bg-white transition-all duration-300" style={{ width: "16px", height: "1.5px", opacity: menuOpen ? 0 : 1 }} />
              <span className="block bg-white transition-all duration-300 origin-center" style={{ width: "16px", height: "1.5px", transform: menuOpen ? "rotate(-45deg) translate(0, -3.5px)" : "none" }} />
            </button>
          </div>
        </header>
      </div>

      {/* ═══════════════════ MOBILE MENU OVERLAY ═══════════════════ */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 lg:hidden"
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
          <a href="/" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>home</a>
          <a href="#data" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>data</a>
          <a href="/research" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>research</a>
          <a href="#" onClick={() => setMenuOpen(false)} className="bg-white text-black font-gilroy font-semibold inline-flex items-center hover:opacity-90 transition-all mt-4" style={{ padding: "16px 32px", borderRadius: "8px", fontSize: "16px", gap: "12px" }}>connect with us</a>
        </nav>
      </div>

      {/* ═══════════════════ HERO SECTION ═══════════════════ */}
      <div className="relative min-h-screen overflow-hidden">
        {/* Background Shader — only behind hero */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <ShaderAnimation />
          <div className="absolute inset-0 bg-black/65 z-[1]"></div>
        </div>

        {/* ═══════════════════ HERO CONTENT ═══════════════════ */}
        <main
          className="relative z-10 flex flex-col justify-end"
          style={{ minHeight: "100vh", paddingTop: "100px", paddingBottom: "100px", paddingLeft: "50px", paddingRight: "50px" }}
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

      {/* ═══════════════════ NARRATIVE SECTION ═══════════════════ */}
      <section className="narrative-section relative w-full bg-[#050505]" style={{ height: "300vh" }}>
        <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>
          {[
            "Saturn Labs turns human motion into the force that trains the world's most ambitious robots.",
            "A robot is only as good as its data, and beneath every breakthrough in Physical AI, there's a symphony of real world human action powering that learning.",
            "Saturn Labs captures that action, building the multimodal datasets that teach robots how to move, manipulate, and navigate the physical world with precision.",
          ].map((sentence, i) => (
            <div
              key={i}
              className="narrative-panel absolute inset-0 flex items-center justify-center"
              style={{ padding: "0 clamp(24px, 8vw, 120px)", opacity: i === 0 ? 1 : 0, transform: i === 0 ? "none" : "translateY(80px)" }}
            >
              <p className="font-gilroy font-light text-white text-center max-w-2xl"
                style={{ fontSize: "clamp(17px, 2.2vw, 26px)", lineHeight: 1.7 }}>
                {sentence}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ DATASET CARDS ═══════════════════ */}
      <section
        id="data"
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
