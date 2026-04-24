"use client";
import React, { useEffect, useRef } from "react";

const SHADER_SRC = `#version 300 es
precision highp float;

out vec4 fragColor;
in vec2 v_uv;

uniform vec3  iResolution;
uniform float iTime;
uniform int   iFrame;
uniform vec4  iMouse;

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
    vec2  r  = iResolution.xy;
    float t  = iTime;
    vec3  FC = vec3(fragCoord, t);
    vec4  o  = vec4(0.0);

    for (float i, z, d, f; i++ < 6e1; o += vec4(3., 1., d, z / f) / z) {
        vec3 v = vec3(0., -2., 7.);
        vec3 p = z * normalize(FC.rgb * 2. - r.xyx) + v;
        vec3 a = p;
        a.y *= .3;
        for (d = 1.; d++ < 9.; )
            a -= .1 * sin((a.zxy + t * v + d) * d) * p.y / d;

        z += d = min(
                max(-p.y, length(a) - 2.),
                f = .2 + abs(length(a.xz - cos(a.zx * 6.)) + max(p.y / .1, - .6))
            ) / 8.;
    }
    o = tanh(o * o.a / 1e3);

    float luma = dot(o.rgb, vec3(0.299, 0.587, 0.114));
    fragColor = vec4(o.rgb, smoothstep(0.0, 0.22, luma));
}

void main(){
  mainImage(fragColor, gl_FragCoord.xy);
}
`;

const VERT_SRC = `#version 300 es
precision highp float;
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

function safeCompile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  const ok = gl.getShaderParameter(sh, gl.COMPILE_STATUS);
  const log = gl.getShaderInfoLog(sh) || "";
  return { shader: ok ? sh : null, log };
}
function safeLink(gl: WebGL2RenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  const ok = gl.getProgramParameter(prog, gl.LINK_STATUS);
  const log = gl.getProgramInfoLog(prog) || "";
  return { program: ok ? prog : null, log };
}
function drawError(gl: WebGL2RenderingContext, msg: string) {
  console.error(msg);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  gl.clearColor(0.2, 0.0, 0.0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

export function ShaderCanvas({
  fragSource,
  pixelRatio,
}: {
  fragSource: string;
  pixelRatio?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0, l: 0, r: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const glRaw = canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!glRaw) return;
    const gl: WebGL2RenderingContext = glRaw;

    let disposed = false;

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const { shader: vs, log: vsLog } = safeCompile(gl, gl.VERTEX_SHADER, VERT_SRC);
    if (!vs) { drawError(gl, `Vertex compile error:\n${vsLog}`); return cleanup; }
    const { shader: fs, log: fsLog } = safeCompile(gl, gl.FRAGMENT_SHADER, fragSource);
    if (!fs) { drawError(gl, `Fragment compile error:\n${fsLog}`); gl.deleteShader(vs); return cleanup; }
    const { program, log: linkLog } = safeLink(gl, vs, fs);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!program) { drawError(gl, `Program link error:\n${linkLog}`); return cleanup; }

    const uResolution = gl.getUniformLocation(program, "iResolution");
    const uTime = gl.getUniformLocation(program, "iTime");
    const uFrame = gl.getUniformLocation(program, "iFrame");
    const uMouse = gl.getUniformLocation(program, "iMouse");

    const getDpr = () => Math.max(1, Math.min(1.5, pixelRatio ?? window.devicePixelRatio ?? 1));

    let resizeScheduled = false;
    function applySize() {
      resizeScheduled = false;
      if (disposed) return;
      const dpr = getDpr();
      const cssW = Math.max(1, canvas.clientWidth | 0);
      const cssH = Math.max(1, canvas.clientHeight | 0);
      const w = Math.max(1, Math.floor(cssW * dpr));
      const h = Math.max(1, Math.floor(cssH * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }
    function scheduleSize() {
      if (resizeScheduled) return;
      resizeScheduled = true;
      requestAnimationFrame(applySize);
    }
    const ro = new ResizeObserver(scheduleSize);
    ro.observe(canvas);
    scheduleSize();

    function onMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      mouseRef.current.y = Math.max(0, Math.min(rect.height - (e.clientY - rect.top), rect.height));
    }
    function onDown(e: MouseEvent) { if (e.button === 0) mouseRef.current.l = 1; if (e.button === 2) mouseRef.current.r = 1; }
    function onUp(e: MouseEvent)   { if (e.button === 0) mouseRef.current.l = 0; if (e.button === 2) mouseRef.current.r = 0; }
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup", onUp);
    canvas.addEventListener("contextmenu", (e) => e.preventDefault());

    function onContextLost(ev: Event) { ev.preventDefault(); if (rafRef.current) cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    function onContextRestored() { scheduleSize(); startRef.current = performance.now(); frameRef.current = 0; if (!rafRef.current) rafRef.current = requestAnimationFrame(tick); }
    canvas.addEventListener("webglcontextlost", onContextLost);
    canvas.addEventListener("webglcontextrestored", onContextRestored);

    startRef.current = performance.now();
    frameRef.current = 0;

    function tick(now: number) {
      if (disposed) return;
      if (gl.isContextLost()) { rafRef.current = requestAnimationFrame(tick); return; }

      const t = (now - startRef.current) / 1000;
      frameRef.current += 1;

      try {
        gl.useProgram(program);
        if (resizeScheduled) applySize();
        const dpr = getDpr();
        const w = canvas.width, h = canvas.height;

        uResolution && gl.uniform3f(uResolution, w, h, dpr);
        uTime && gl.uniform1f(uTime, t);
        uFrame && gl.uniform1i(uFrame, frameRef.current);
        if (uMouse) {
          const m = mouseRef.current;
          gl.uniform4f(uMouse, m.x * dpr, m.y * dpr, m.l, m.r);
        }

        gl.bindVertexArray(vao);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      } catch (err) {
        drawError(gl, (err as Error)?.message ?? String(err));
      }

      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);

    function cleanup() {
      disposed = true;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mouseup", onUp);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      canvas.removeEventListener("webglcontextrestored", onContextRestored);
      ro.disconnect();
      try { gl.deleteBuffer(vbo); } catch {}
      try { gl.deleteVertexArray(vao); } catch {}
      try { gl.getExtension("WEBGL_lose_context")?.loseContext(); } catch {}
    }

    return cleanup;
  }, [fragSource, pixelRatio]);

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}

export function LaunchSection() {
  return (
    <section
      className="relative overflow-hidden bg-[#050505] min-h-[70vh] lg:min-h-screen"
    >
      {/* Separator line from section above */}
      <div className="absolute inset-x-0 top-0 z-30 border-t border-white/[0.09]" />

      {/* Fire shader — full bg on mobile, left column on desktop */}
      <div className="absolute top-0 bottom-0 left-0 right-0 lg:right-auto lg:w-[52%]">
        <ShaderCanvas fragSource={SHADER_SRC} />
      </div>

      {/* Mobile dim overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 lg:hidden"
        style={{ background: "rgba(5,5,5,0.45)" }}
      />

      <div className="relative z-20 flex items-center min-h-[70vh] lg:min-h-screen">

        {/* Desktop */}
        <div className="hidden lg:block" style={{ marginLeft: "50%", paddingRight: "64px" }}>
          <h2
            className="font-gilroy font-semibold text-white"
            style={{ fontSize: "3.25rem", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "20px" }}
          >
            Ready to fast-track your
            <br />
            <span className="font-rhymes italic font-light">robots</span>
            {" "}into{" "}
            <span className="font-rhymes italic font-light">production</span>?
          </h2>
          <p
            className="font-gilroy font-light text-white/50"
            style={{ fontSize: "15px", lineHeight: 1.65, marginBottom: "36px" }}
          >
            The gap between prototype and production is data. Let&apos;s close it.
          </p>
          <a
            href="#"
            className="font-gilroy font-semibold text-white inline-flex items-center gap-3 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            style={{ fontSize: "14px", padding: "14px 28px", borderRadius: "8px", letterSpacing: "0.01em" }}
          >
            connect with us
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </a>
        </div>

        {/* Mobile */}
        <div className="lg:hidden w-full text-center" style={{ padding: "0 28px" }}>
          <h2
            className="font-gilroy font-semibold text-white"
            style={{ fontSize: "2.4rem", lineHeight: 1.1, letterSpacing: "-0.025em", marginBottom: "20px" }}
          >
            Ready to fast-track your
            <br />
            <span className="font-rhymes italic font-light">robots</span>
            {" "}into{" "}
            <span className="font-rhymes italic font-light">production</span>?
          </h2>
          <p
            className="font-gilroy font-light text-white/50"
            style={{ fontSize: "14px", lineHeight: 1.65, marginBottom: "36px" }}
          >
            The gap between prototype and production is data. Let&apos;s close it.
          </p>
          <div className="flex justify-center">
            <a
              href="#"
              className="font-gilroy font-semibold text-white inline-flex items-center gap-3 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
              style={{ fontSize: "14px", padding: "14px 28px", borderRadius: "8px", letterSpacing: "0.01em" }}
            >
              connect with us
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Right edge chevron */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none">
        <span className="text-white/25 font-gilroy" style={{ fontSize: "28px", lineHeight: 1 }}>›</span>
      </div>
    </section>
  );
}

export default function Component() {
  return (
    <div style={{ position: "fixed", inset: 0, width: "100vw", height: "100dvh", background: "black", overflow: "hidden" }}>
      <ShaderCanvas fragSource={SHADER_SRC} />
    </div>
  );
}
