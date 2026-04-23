"use client";

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";

export function ContactSection() {
  return (
    <section className="relative z-10 w-full min-h-screen bg-[#050505] flex items-center justify-center overflow-hidden">
      <Card className="w-full min-h-screen bg-black/[0.96] relative overflow-hidden border-none rounded-none flex flex-col items-center justify-center p-6 md:p-12">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />

        {/* Spline 3D Scene - Full Background */}
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen pointer-events-none md:pointer-events-auto">
          <SplineScene
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Foreground Content */}
        <div className="relative z-10 w-full max-w-2xl flex flex-col items-center mt-12 md:mt-0 pointer-events-none">
          
          <h2 className="text-5xl md:text-7xl font-gilroy font-normal text-white mb-12 text-center tracking-tight">
            Get in <span className="font-rhymes italic font-thin text-white/90">Touch.</span>
          </h2>

          {/* Glassmorphic Contact Form */}
          <form className="w-full flex flex-col gap-8 pointer-events-auto">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-white uppercase text-[11px] font-mono font-bold tracking-widest ml-1">
                NAME *
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-white/[0.02] backdrop-blur-[30px] border border-white/10 rounded-[14px] px-6 py-5 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all font-gilroy font-normal"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-white uppercase text-[11px] font-mono font-bold tracking-widest ml-1">
                EMAIL *
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-white/[0.02] backdrop-blur-[30px] border border-white/10 rounded-[14px] px-6 py-5 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all font-gilroy font-normal"
                placeholder="you@company.com"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-white uppercase text-[11px] font-mono font-bold tracking-widest ml-1">
                MESSAGE *
              </label>
              <textarea
                id="message"
                rows={5}
                className="w-full bg-white/[0.02] backdrop-blur-[30px] border border-white/10 rounded-[14px] px-6 py-5 text-white text-lg placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/[0.05] transition-all font-gilroy resize-none font-normal"
                placeholder="What can we help with?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="mt-6 w-full bg-white/[0.03] backdrop-blur-[40px] border border-white/[0.06] text-white/60 font-mono text-[11px] uppercase tracking-[0.2em] px-6 py-[22px] rounded-[14px] hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
}
