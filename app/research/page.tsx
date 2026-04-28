"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EncryptedText } from "@/components/ui/encrypted-text";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCal } from "@/hooks/use-cal";

const Footer = dynamic(
  () => import("@/components/ui/footer").then(m => ({ default: m.Footer })),
  { ssr: false }
);

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const DOT_GRID = Array.from({ length: 5 }, (_, i) => i);

export default function Research() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleCalClick } = useCal();

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* ═══ FLOATING NAV ═══ */}
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
            <Image src="/logo.svg" alt="Saturn Labs" width={51} height={58} style={{ width: "28px", height: "auto" }} />
            <span className="font-gilroy font-normal tracking-tight text-white hidden sm:block" style={{ fontSize: "18px" }}>Saturn Labs</span>
          </a>

          {/* Nav links */}
          <nav className="hidden lg:flex items-center" style={{ gap: "8px" }}>
            {[
              { label: "home", href: "/" },
              { label: "data", href: "/#data" },
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
            <button
              onClick={handleCalClick}
              className="hidden lg:inline-flex bg-white text-black font-gilroy font-semibold items-center hover:bg-white/90 active:scale-95 transition-all whitespace-nowrap"
              style={{ padding: "9px 20px", borderRadius: "9px", fontSize: "13px", gap: "10px" }}
            >
              connect with us
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </button>

            {/* Hamburger — mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col justify-center items-center gap-[5px]"
              aria-label="Toggle menu"
              style={{ width: "40px", height: "40px", borderRadius: "10px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.11)" }}
            >
              <span className="block bg-white transition-all duration-300 origin-center" style={{ width: "16px", height: "1.5px", transform: menuOpen ? "rotate(45deg) translate(0, 3.5px)" : "none" }} />
              <span className="block bg-white transition-all duration-300" style={{ width: "16px", height: "1.5px", opacity: menuOpen ? 0 : 1 }} />
              <span className="block bg-white transition-all duration-300 origin-center" style={{ width: "16px", height: "1.5px", transform: menuOpen ? "rotate(-45deg) translate(0, -3.5px)" : "none" }} />
            </button>
          </div>
        </header>
      </div>

      {/* ═══ MOBILE MENU OVERLAY ═══ */}
      <div
        className="fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-500 lg:hidden"
        style={{ opacity: menuOpen ? 1 : 0, pointerEvents: menuOpen ? "auto" : "none", background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)" }}
      >
        <button onClick={() => setMenuOpen(false)} className="absolute top-10 right-12 w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-opacity" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <nav className="flex flex-col items-center gap-12">
          <a href="/" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>home</a>
          <a href="/#data" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>data</a>
          <a href="/research" onClick={() => setMenuOpen(false)} className="font-gilroy text-white/80 hover:text-white transition-opacity" style={{ fontSize: "28px" }}>research</a>
          <button 
            onClick={() => { setMenuOpen(false); handleCalClick(); }} 
            className="bg-white text-black font-gilroy font-semibold inline-flex items-center hover:opacity-90 transition-all mt-4" 
            style={{ padding: "16px 32px", borderRadius: "8px", fontSize: "16px", gap: "12px" }}
          >
            connect with us
          </button>
        </nav>
      </div>

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Grid background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* White grid */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px)
              `,
              backgroundSize: "72px 72px",
              maskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 75%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 12%, black 75%, transparent 100%)",
            }}
          />

          {/* Animated gradient orbs */}
          <motion.div
            className="absolute"
            style={{
              width: "1000px",
              height: "1000px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(100,60,255,0.07) 0%, transparent 68%)",
              top: "-300px",
              left: "-200px",
            }}
            animate={{ x: [0, 80, -30, 0], y: [0, -40, 60, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute"
            style={{
              width: "800px",
              height: "800px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(20,100,255,0.055) 0%, transparent 68%)",
              bottom: "-100px",
              right: "0px",
            }}
            animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute"
            style={{
              width: "600px",
              height: "600px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(180,80,255,0.04) 0%, transparent 68%)",
              top: "30%",
              right: "20%",
            }}
            animate={{ x: [0, 40, -20, 0], y: [0, -40, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Fades */}
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050505] to-transparent" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#050505] to-transparent" />
        </div>

        {/* Hero Content */}
        <div
          className="relative z-10 w-full"
          style={{ padding: "160px clamp(24px, 6vw, 90px) 100px" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex items-center gap-3 mb-12"
          >
            <div
              className="h-px bg-white/20"
              style={{ width: "40px" }}
            />
            <span
              className="font-mono text-white/30 uppercase tracking-[0.3em]"
              style={{ fontSize: "10px" }}
            >
              Research & Collaboration
            </span>
          </motion.div>

          <motion.h1
            className="font-gilroy font-semibold text-white"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(3rem, 7.5vw, 6rem)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: "860px",
            }}
          >
            Better{" "}
            <span className="font-rhymes italic font-thin">Data.</span>
            <br />
            Deeper{" "}
            <span className="font-rhymes italic font-thin">Questions.</span>
            <br />
            Smarter{" "}
            <span className="font-rhymes italic font-thin">Robots.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-gilroy font-light text-white/35"
            style={{
              fontSize: "clamp(15px, 1.8vw, 18px)",
              maxWidth: "460px",
              lineHeight: 1.75,
              marginTop: "36px",
            }}
          >
            Pushing the boundaries of physical AI through rigorous data
            methodology and open collaboration.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-12"
          >
            <a
              href="#collaborate"
              className="inline-flex items-center gap-3 font-gilroy font-light text-white/50 hover:text-white transition-colors"
              style={{ fontSize: "13px", letterSpacing: "0.05em" }}
            >
              <span className="uppercase tracking-[0.2em]">Scroll to explore</span>
              <motion.svg
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </motion.svg>
            </a>
          </motion.div>
        </div>

        {/* Dot grid decoration — top right */}
        <div className="absolute top-[160px] right-[clamp(24px,5vw,80px)] hidden lg:block">
          <div className="flex flex-col gap-[8px]">
            {DOT_GRID.map((i) => (
              <div key={i} className="flex gap-[8px]">
                {DOT_GRID.map((j) => (
                  <motion.div
                    key={j}
                    className="w-[3px] h-[3px] rounded-full bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.08, 0.3, 0.08] }}
                    transition={{
                      duration: 3.5,
                      delay: (i + j) * 0.18,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom grid row highlight */}
        <div
          className="absolute bottom-0 inset-x-0 h-px"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
      </section>


      {/* ═══ OUR APPROACH ═══ */}
      <section
        style={{
          padding:
            "clamp(80px, 12vw, 140px) clamp(24px, 6vw, 90px)",
        }}
      >
        <Reveal className="flex items-center gap-4 mb-20">
          <span
            className="font-mono text-white/20 uppercase tracking-[0.35em]"
            style={{ fontSize: "10px" }}
          >
            01 — Our Approach
          </span>
          <div className="flex-1 h-px bg-white/[0.06] max-w-[200px]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <Reveal className="lg:col-span-4" delay={0.08}>
            <h2
              className="font-gilroy font-semibold text-white"
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Our{" "}
              <span className="font-rhymes italic font-thin">Approach</span>
            </h2>
            <div
              className="w-8 h-px bg-white/20 mt-6"
            />
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.18}>
            <p
              className="font-gilroy font-light text-white/45"
              style={{
                fontSize: "clamp(15px, 1.7vw, 17px)",
                lineHeight: 1.9,
                maxWidth: "640px",
              }}
            >
              <span className="text-white/70">
                <EncryptedText
                  text="We believe the most impactful breakthroughs in physical AI come through open collaboration."
                  encryptedClassName="text-white/20"
                  revealDelayMs={7}
                  flipDelayMs={14}
                />
              </span>
              <br />
              <br />
              We&apos;re experimenting with novel data collection methodologies,
              evaluation frameworks, and sim-to-real transfer techniques. Whether
              you&apos;re exploring new sensor modalities, developing foundation
              models, researching manipulation strategies, or testing novel
              approaches to synthetic data generation, we&apos;re genuinely
              interested in what you&apos;re building.
            </p>
          </Reveal>
        </div>

        {/* Horizontal rule */}
        <Reveal className="mt-24" delay={0.05}>
          <div className="w-full h-px bg-white/[0.05]" />
        </Reveal>
      </section>

      {/* ═══ LET'S COLLABORATE ═══ */}
      <section
        id="collaborate"
        style={{
          padding:
            "0 clamp(24px, 6vw, 90px) clamp(80px, 12vw, 140px)",
        }}
      >
        <Reveal className="flex items-center gap-4 mb-20">
          <span
            className="font-mono text-white/20 uppercase tracking-[0.35em]"
            style={{ fontSize: "10px" }}
          >
            02 — Collaboration
          </span>
          <div className="flex-1 h-px bg-white/[0.06] max-w-[200px]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <Reveal className="lg:col-span-4" delay={0.08}>
            <h2
              className="font-gilroy font-semibold text-white"
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Let&apos;s{" "}
              <span className="font-rhymes italic font-thin">Collaborate</span>
            </h2>
            <div className="w-8 h-px bg-white/20 mt-6" />
          </Reveal>

          <div className="lg:col-span-8 flex flex-col gap-12">
            <Reveal delay={0.18}>
              <p
                className="font-gilroy font-light text-white/45"
                style={{
                  fontSize: "clamp(15px, 1.7vw, 17px)",
                  lineHeight: 1.9,
                  maxWidth: "640px",
                }}
              >
                <span className="text-white/70">
                  <EncryptedText
                    text="We're actively seeking explorers, researchers, engineers and advisors who are experimenting at the cutting edge of physical AI."
                    encryptedClassName="text-white/20"
                    revealDelayMs={7}
                    flipDelayMs={14}
                  />
                </span>
                <br />
                <br />
                Collaboration can take many forms — joint research projects, data
                sharing partnerships, technology integration, or exploring entirely
                new ideas together. If you&apos;re working on something exciting in
                this space and believe we could create something meaningful
                together, we&apos;d love to hear from you.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <button
                onClick={handleCalClick}
                className="inline-flex items-center gap-4 font-gilroy font-semibold text-white border border-white/[0.12] hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300"
                style={{
                  padding: "16px 28px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  width: "fit-content",
                  letterSpacing: "0.01em",
                }}
              >
                Interested in collaborating
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
