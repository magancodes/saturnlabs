"use client";
import { useRef, useEffect } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";

const vertex = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uGlow;

float wave(vec2 uv, float freq, float amp, float phase, float speed) {
    return amp * sin(uv.x * freq + uTime * speed + phase);
}

void main() {
    vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;

    // Three layered waves with slight offsets
    float w1 = wave(uv, 2.5,  0.30, 0.0,  uSpeed * 0.8);
    float w2 = wave(uv, 4.0,  0.18, 1.3,  uSpeed * 1.1);
    float w3 = wave(uv, 6.5,  0.10, 2.8,  uSpeed * 0.6);
    float centerLine = w1 + w2 + w3;

    float dist = abs(uv.y - centerLine);

    // Sharp core + wide soft halo
    float core  = exp(-dist * dist * (uGlow * 3.0));
    float halo  = exp(-dist * dist * (uGlow * 0.4)) * 0.35;
    float total = core + halo;

    // Cool aurora palette: deep navy → teal → faint violet edge
    vec3 coreCol  = vec3(0.55, 0.85, 1.0);           // icy white-blue core
    vec3 midCol   = mix(vec3(0.05, 0.35, 0.75),       // blue
                        vec3(0.15, 0.65, 0.60),        // teal
                        0.5 + 0.5 * sin(uTime * 0.4 + uv.x * 0.8));
    vec3 edgeCol  = vec3(0.25, 0.10, 0.45);           // deep violet edge

    // Blend based on distance: core → mid → edge
    float t = smoothstep(0.0, 0.25, dist);
    vec3 waveCol = mix(coreCol, mix(midCol, edgeCol, smoothstep(0.12, 0.4, dist)), t);

    // Dark background
    vec3 bg = vec3(0.02, 0.02, 0.04);

    vec3 col = mix(bg, waveCol, clamp(total, 0.0, 1.0));

    gl_FragColor = vec4(col, 1.0);
}
`;

type Props = {
  speed?: number;
  glow?: number;
  resolutionScale?: number;
};

export default function AuroraWaves({
  speed = 1.0,
  glow = 15.0,
  resolutionScale = 1.0,
}: Props) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.5),
      canvas,
      // @ts-ignore — ogl forwards extra opts to WebGL context
      powerPreference: "low-power",
      antialias: false,
    });

    const gl = renderer.gl;
    const geometry = new Triangle(gl);

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2() },
        uSpeed: { value: speed },
        uGlow: { value: glow },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      renderer.setSize(w * resolutionScale, h * resolutionScale);
      (program.uniforms.uResolution.value as Vec2).set(w, h);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    resize();

    let frame = 0;
    const start = performance.now();

    const loop = () => {
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
      frame = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [speed, glow, resolutionScale]);

  return <canvas ref={ref} className="w-full h-full block" />;
}
