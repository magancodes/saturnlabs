"use client";
import { useRef, useEffect } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uGlow;

float wave(vec2 uv, float freq, float amp, float phase, float spd) {
  return amp * sin(uv.x * freq + uTime * spd + phase);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  float w = wave(uv, 2.5, 0.30, 0.0,  uSpeed * 0.8)
          + wave(uv, 4.0, 0.18, 1.3,  uSpeed * 1.1)
          + wave(uv, 6.5, 0.10, 2.8,  uSpeed * 0.6);

  float dist  = abs(uv.y - w);
  float core  = exp(-dist * dist * (uGlow * 3.0));
  float halo  = exp(-dist * dist * (uGlow * 0.4)) * 0.35;
  float total = clamp(core + halo, 0.0, 1.0);

  vec3 coreCol = vec3(0.55, 0.85, 1.0);
  vec3 midCol  = mix(vec3(0.05, 0.35, 0.75), vec3(0.15, 0.65, 0.60),
                     0.5 + 0.5 * sin(uTime * 0.4 + uv.x * 0.8));
  vec3 edgeCol = vec3(0.25, 0.10, 0.45);

  float t      = smoothstep(0.0, 0.25, dist);
  vec3 waveCol = mix(coreCol, mix(midCol, edgeCol, smoothstep(0.12, 0.4, dist)), t);
  vec3 col     = mix(vec3(0.02, 0.02, 0.04), waveCol, total);

  gl_FragColor = vec4(col, 1.0);
}
`;

function makeShader(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error("Aurora shader error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

type Props = { speed?: number; glow?: number; resolutionScale?: number };

export default function AuroraWaves({ speed = 1.0, glow = 15.0, resolutionScale = 1.0 }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const gl = canvas.getContext("webgl", {
      alpha: false, antialias: false, depth: false,
      stencil: false, powerPreference: "low-power",
    }) as WebGLRenderingContext | null;
    if (!gl) return;

    const vs = makeShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = makeShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error("Aurora link error:", gl.getProgramInfoLog(prog));
      return;
    }

    const buf = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes   = gl.getUniformLocation(prog, "uResolution");
    const uTime  = gl.getUniformLocation(prog, "uTime");
    const uSpd   = gl.getUniformLocation(prog, "uSpeed");
    const uGlw   = gl.getUniformLocation(prog, "uGlow");

    gl.useProgram(prog);
    gl.uniform1f(uSpd, speed);
    gl.uniform1f(uGlw, glow);

    const resize = () => {
      const cssW = parent.clientWidth, cssH = parent.clientHeight;
      const cap = Math.min(1, Math.min(1280 / Math.max(1, cssW), 720 / Math.max(1, cssH))) * resolutionScale;
      canvas.width  = Math.max(1, Math.round(cssW * cap));
      canvas.height = Math.max(1, Math.round(cssH * cap));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      gl.uniform2f(uRes, parent.clientWidth, parent.clientHeight);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      (gl.getExtension("WEBGL_lose_context") as any)?.loseContext();
    };
  }, [speed, glow, resolutionScale]);

  return <canvas ref={ref} style={{ width: "100%", height: "100%", display: "block" }} />;
}
