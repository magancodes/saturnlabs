"use client";

import { useEffect, useRef } from "react";

const FRAG_SRC = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 iRes;
uniform float iTime;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - iRes) / min(iRes.x, iRes.y);
  float t = iTime * 0.12; // Faster speed
  vec3 c = vec3(0.0);
  for (int j = 0; j < 3; j++)
    for (int i = 0; i < 5; i++) {
      float d = abs(fract(t - 0.015*float(j) + float(i)*0.012)*4.0 - length(uv) + mod(uv.x+uv.y, 0.15));
      c[j] += 0.0035 * float(i*i + 1) / max(d, 0.001);
    }
  fragColor = vec4(c, 1.0);
}`;

const VERT_SRC = `#version 300 es
layout(location=0) in vec2 p;
void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;

export function ShaderAnimation() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const mkShader = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src); gl.compileShader(s); return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VERT_SRC));
    gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FRAG_SRC));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const uRes  = gl.getUniformLocation(prog, "iRes");
    const uTime = gl.getUniformLocation(prog, "iTime");

    // Render at 1x — abstract background doesn't need retina resolution
    const dpr = 1;
    const t0 = performance.now();
    let raf = 0;
    let visible = true;

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth  * dpr));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w; canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);

    const tick = (ts: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (ts - t0) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      try { gl.deleteBuffer(buf); gl.deleteVertexArray(vao); } catch {}
    };
  }, []);

  return (
    <div className="w-full h-full" style={{ background: "#000", overflow: "hidden" }}>
      <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />
    </div>
  );
}
