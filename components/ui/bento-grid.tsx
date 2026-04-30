"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { EncryptedText } from "@/components/ui/encrypted-text";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

function BentoVideo({ video, index }: { video: any, index: number }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="absolute inset-0 z-0 bg-[#0a0a0a]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="w-6 h-6 text-white/10 animate-spin" />
        </div>
      )}
      <video
        src={video.src}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className={cn(
          "h-full w-full transition-all duration-[1.2s] ease-in-out",
          (video.title === "Tactile Force Sensor" || video.title === "Stereo Exocentric" || video.title === "Stereo Egocentric") ? "object-contain" : "object-cover",
          video.title === "Point Cloud" && "scale-[1.8] rotate-90",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoadedData={() => setIsLoading(false)}
      />
    </div>
  );
}

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

  const videos = [
    { title: "Stereo Egocentric", tag: "01", cols: "col-span-6 md:col-span-12", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_head.mp4" },
    { title: "Point Cloud", tag: "02", cols: "col-span-3 md:col-span-6", src: "/point_cloud.webm" },
    { title: "Depth Maps", tag: "03", cols: "col-span-3 md:col-span-6", src: "/depth_cam.mp4" },
    { title: "Stereo Exocentric", tag: "04", cols: "col-span-6 md:col-span-12", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/6/scaled_output_6_camera_exo.mp4" },
    { title: "Wrist Camera", tag: "05", cols: "col-span-3 md:col-span-6", src: "https://zcszua0zjawijd0q.public.blob.vercel-storage.com/7/scaled_output_7_camera_wristright.mp4" },
    { title: "Tactile Force Sensor", tag: "06", cols: "col-span-3 md:col-span-6", src: "https://www.saturnlabs.ai/tactile.webm" },
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
                opacity: 1,
                transform: "translateY(0) scale(1)",
              }}
            >
              {/* Video Background */}
              <BentoVideo video={video} index={i} />

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

              {/* Label (Top Left) */}
              <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex flex-col gap-1 md:gap-2">
                <span className="font-mono text-white/30 text-[10px] md:text-[11px] tracking-[0.3em] uppercase">{video.tag}</span>
                <h3
                  className="font-gilroy font-bold text-white transition-colors duration-500"
                  style={{ fontSize: "clamp(18px, 2.5vw, 30px)", lineHeight: 1.1, letterSpacing: "-0.02em" }}
                >
                  {video.title}
                </h3>
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
          className="mt-32 md:mt-48 flex flex-col items-center text-center"
          style={{
            opacity: 1,
            transform: "translateY(0)",
            position: "relative",
            zIndex: 30,
            maxWidth: "1000px",
            margin: "120px auto 0",
          }}
        >
          <h2
            className="font-rhymes italic font-thin text-white/30 mb-20"
            style={{ fontSize: "clamp(22px, 2.5vw, 30px)", letterSpacing: "-0.01em" }}
          >
            Six synchronized streams.
          </h2>
          
          <div
            className="font-gilroy font-light text-white flex flex-col gap-8"
            style={{ fontSize: "clamp(24px, 4vw, 42px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}
          >
            <p>
              Egocentric Stereo RGB+Depth + Wrist Cams + Stereo Exocentric + Tactile
            </p>
            <p>
              All cameras at 1080p 60fps &gt;140deg FOV.
            </p>
            <p>
              Tightly synced MCAP with &lt;5ms latency across all streams.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
