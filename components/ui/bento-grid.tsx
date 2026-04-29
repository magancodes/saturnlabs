"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";

export function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let time = 0;
    let lastTs = 0;

    const chars = "·.+:*°·.+:*°·.";
    const fontSize = 14;
    const gap = 18;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.font = `${fontSize}px monospace`;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw);
      if (ts - lastTs < 1000 / 30) return; // cap at 30fps
      lastTs = ts;
      time += 0.003;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cols = Math.ceil(canvas.width / gap);
      const rows = Math.ceil(canvas.height / gap);

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gap;
          const y = row * gap;

          // Flowing wave pattern
          const wave = Math.sin(col * 0.15 + time * 2) * Math.cos(row * 0.1 + time) * 0.5 + 0.5 + 0.2;
          const charIdx = Math.floor((wave * chars.length + time * 3 + row * 0.5) % chars.length);
          const alpha = 0.04 + wave * 0.06;

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fillText(chars[charIdx], x, y);
        }
      }

    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}

export function BentoGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-idx"));
            setRevealed((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll("[data-idx]");
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const videos = [
    { title: "Stereo Egocentric", tag: "01", cols: "col-span-6 md:col-span-12", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_head.mp4" },
    { title: "Point Cloud", tag: "02", cols: "col-span-3 md:col-span-6", src: "/point_cloud.webm" },
    { title: "Depth Maps", tag: "03", cols: "col-span-3 md:col-span-6", src: "/depth_cam.mp4" },
    { title: "Stereo Exocentric", tag: "04", cols: "col-span-6 md:col-span-12", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_exo.mp4" },
    { title: "Wrist Camera", tag: "05", cols: "col-span-3 md:col-span-6", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled_output_7_camera_wristright.mp4" },
    { title: "Tactile Force Sensor", tag: "06", cols: "col-span-3 md:col-span-6", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_fsr_heatmap.mp4" },
  ];

  return (
    <section ref={sectionRef} className="relative z-20 bg-[#050505]">

      {/* Animated ASCII shader background */}
      <AsciiBackground />

      {/* Content wrapper */}
      <div className="relative z-10" style={{ padding: "40px 50px 220px" }}>

        {/* Bento Grid — 6 cols always to keep same layout on mobile */}
        <div className="grid grid-cols-6 md:grid-cols-12 gap-2 md:gap-3" style={{ marginTop: "-60px" }}>
          {videos.map((video, i) => (
            <div
              key={video.title}
              data-idx={i}
              className={`group relative overflow-hidden ${video.cols} border border-white/[0.06] bg-white/[0.015] hover:border-white/15 cursor-pointer backdrop-blur-[2px]`}
              style={{
                height: (video.title === "Stereo Exocentric" || video.title === "Stereo Egocentric") ? "clamp(240px, 40vw, 420px)" : "clamp(180px, 30vw, 320px)",
                opacity: revealed.has(i) ? 1 : 0,
                transform: revealed.has(i) ? "translateY(0) scale(1)" : "translateY(60px) scale(0.98)",
                transition: `opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.1}s`,
              }}
            >
              {/* Video Background */}
              <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className={cn(
                    "h-full w-full opacity-40 group-hover:opacity-75 transition-all duration-[1.2s] ease-in-out",
                    (video.title === "Tactile Force Sensor" || video.title === "Stereo Exocentric" || video.title === "Stereo Egocentric") ? "object-contain" : "object-cover",
                    video.title === "Point Cloud" && "scale-[1.8] rotate-90"
                  )}
                />
              </div>

              {/* Scan line hover */}
              <div
                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                style={{ background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)" }}
              />

              {/* Ambient glow */}
              <div
                className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{ background: `linear-gradient(${110 + i * 25}deg, rgba(255,255,255,0.04) 0%, transparent 60%)` }}
              />

              {/* Tag */}
              <div className="absolute top-0 left-0 z-20">
                <div
                  className="font-mono text-white/20 group-hover:text-white/50 transition-colors duration-500 border-r border-b border-white/[0.06] group-hover:border-white/10 flex items-center justify-center"
                  style={{ width: "36px", height: "36px", fontSize: "10px" }}
                >
                  {video.tag}
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-3 md:p-5 flex justify-between items-end">
                <h3
                  className="font-gilroy font-semibold text-white/80 group-hover:text-white transition-colors duration-500"
                  style={{ fontSize: "clamp(14px, 2.2vw, 20px)" }}
                >
                  {video.title}
                </h3>
                <svg
                  className="w-3 h-3 md:w-4 md:h-4 text-white/20 group-hover:text-white/60 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </div>

              {/* Edge accents */}
              <div className="absolute top-0 right-0 w-[1px] h-8 md:h-12 bg-white/[0.08] group-hover:bg-white/20 group-hover:h-16 md:group-hover:h-20 transition-all duration-700" />
              <div className="absolute bottom-0 left-0 w-8 md:w-12 h-[1px] bg-white/[0.08] group-hover:bg-white/20 group-hover:w-16 md:group-hover:w-20 transition-all duration-700" />
            </div>
          ))}
        </div>

        {/* Section header — now below the grid, centered */}
        <div
          data-idx={-1}
          className="mt-32 md:mt-48 flex flex-col items-center text-center transition-all duration-1000"
          style={{
            opacity: revealed.has(-1) ? 1 : 0,
            transform: revealed.has(-1) ? "translateY(0)" : "translateY(40px)",
            position: "relative",
            zIndex: 30,
            maxWidth: "900px",
            margin: "120px auto 0", // Centered horizontally with top margin
          }}
        >
          <p
            className="font-mono text-white/20 uppercase tracking-[0.4em] mb-12"
            style={{ fontSize: "11px", letterSpacing: "0.4em" }}
          >
            // Data Modalities
          </p>
          <h2
            className="font-gilroy font-normal text-white"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.8rem)", lineHeight: 1.2, marginBottom: "40px" }}
          >
            <EncryptedText text="Six" triggered={revealed.has(-1)} />{" "}
            <span className="font-rhymes italic font-thin"><EncryptedText text="synchronized" triggered={revealed.has(-1)} /></span>{" "}
            <EncryptedText text="streams." triggered={revealed.has(-1)} />
          </h2>
          <div
            className="font-gilroy font-bold text-white flex flex-col gap-5"
            style={{ fontSize: "clamp(18px, 3vw, 28px)", lineHeight: 1.3 }}
          >
            <p>Egocentric Stereo RGB+Depth + Wrist Cams + Stero Exocentric + Tactile</p>
            <p>All cameras at 1080p 60fps &gt;140deg FOV.</p>
            <p>Tightly synced MCA</p>
          </div>
        </div>
      </div>
    </section>
  );
}
