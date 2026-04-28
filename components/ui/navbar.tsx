"use client";

import { useState } from "react";
import Image from "next/image";
import { useCal } from "@/hooks/use-cal";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { handleCalClick } = useCal();

  return (
    <>
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
    </>
  );
}
