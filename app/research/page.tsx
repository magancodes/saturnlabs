"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { Navbar } from "@/components/ui/navbar";
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
  const ref = React.useRef(null);
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
  const { handleCalClick } = useCal();

  return (
    <div className="bg-[#050505] min-h-screen text-white font-gilroy selection:bg-white/10">
      <Navbar />
      
      <main className="flex-1 pt-48 pb-32">

      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0 z-0 pointer-events-none bg-muted/20">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, black 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
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
              className="h-px bg-border"
              style={{ width: "40px" }}
            />
            <span
              className="font-mono text-muted-foreground uppercase tracking-[0.3em]"
              style={{ fontSize: "10px" }}
            >
              Research & Collaboration
            </span>
          </motion.div>

          <motion.h1
            className="font-gilroy font-semibold text-foreground"
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
            <span className="font-rhymes italic font-thin text-foreground">Data.</span>
            <br />
            Deeper{" "}
            <span className="font-rhymes italic font-thin text-foreground">Questions.</span>
            <br />
            Smarter{" "}
            <span className="font-rhymes italic font-thin text-foreground">Robots.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="font-gilroy font-light text-muted-foreground"
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
              className="inline-flex items-center gap-3 font-gilroy font-light text-muted-foreground hover:text-foreground transition-colors"
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
            className="font-mono text-muted-foreground uppercase tracking-[0.35em]"
            style={{ fontSize: "10px" }}
          >
            01 — Our Approach
          </span>
          <div className="flex-1 h-px bg-border max-w-[200px]" />
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <Reveal className="lg:col-span-4" delay={0.08}>
            <h2
              className="font-gilroy font-semibold text-foreground"
              style={{
                fontSize: "clamp(1.8rem, 3.2vw, 2.6rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.025em",
              }}
            >
              Our{" "}
              <span className="font-rhymes italic font-thin text-foreground">Approach</span>
            </h2>
            <div
              className="w-8 h-px bg-border mt-6"
            />
          </Reveal>

          <Reveal className="lg:col-span-8" delay={0.18}>
            <p
              className="font-gilroy font-light text-muted-foreground"
              style={{
                fontSize: "clamp(15px, 1.7vw, 17px)",
                lineHeight: 1.9,
                maxWidth: "640px",
              }}
            >
              <span className="text-foreground">
                <EncryptedText
                  text="We believe the most impactful breakthroughs in physical AI come through open collaboration."
                  encryptedClassName="text-muted-foreground/20"
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
          <div className="w-full h-px bg-border" />
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
            className="font-mono text-muted-foreground uppercase tracking-[0.35em]"
            style={{ fontSize: "10px" }}
          >
            02 — Collaboration
          </span>
          <div className="flex-1 h-px bg-border max-w-[200px]" />
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
                className="font-gilroy font-light text-muted-foreground"
                style={{
                  fontSize: "clamp(15px, 1.7vw, 17px)",
                  lineHeight: 1.9,
                  maxWidth: "640px",
                }}
              >
                <span className="text-foreground">
                  <EncryptedText
                    text="We're actively seeking explorers, researchers, engineers and advisors who are experimenting at the cutting edge of physical AI."
                    encryptedClassName="text-muted-foreground/20"
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
                className="inline-flex items-center gap-4 font-gilroy font-semibold text-foreground border border-border hover:border-primary/30 hover:bg-muted transition-all duration-300"
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

        </main>
      {/* ═══ FOOTER ═══ */}
      <Footer />
    </div>
  );
}
