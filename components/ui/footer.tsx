"use client";

import { useEffect, useRef } from "react";

export function Footer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    let animId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.offsetWidth;
        canvas.height = parent.offsetHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const mousePos = { x: 0.5, y: 0.5 };
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePos.x = (e.clientX - rect.left) / rect.width;
      mousePos.y = (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const vsSrc = `attribute vec2 aPosition; void main(){gl_Position=vec4(aPosition,0,1);}`;

    const fsSrc = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;
      uniform float uFlowSpeed;
      uniform float uColorIntensity;
      uniform float uNoiseLayers;
      uniform float uMouseInfluence;

      #define MARCH_STEPS 32

      float hash(vec2 p){
        p=fract(p*vec2(123.34,456.21));
        p+=dot(p,p+45.32);
        return fract(p.x*p.y);
      }

      float fbm(vec3 p){
        float f=0.;float amp=0.5;
        for(int i=0;i<8;i++){
          if(float(i)>=uNoiseLayers)break;
          f+=amp*hash(p.xy);
          p*=2.;amp*=0.5;
        }
        return f;
      }

      float map(vec3 p){
        vec3 q=p;
        q.z+=iTime*uFlowSpeed;
        vec2 mouse=(iMouse.xy/iResolution.xy-0.5)*2.;
        q.xy+=mouse*uMouseInfluence;
        float f=fbm(q*2.);
        f*=sin(p.y*2.+iTime)*0.5+0.5;
        return clamp(f,0.,1.);
      }

      void main(){
        vec2 uv=(gl_FragCoord.xy-0.5*iResolution.xy)/iResolution.y;
        vec3 ro=vec3(0,-1,0);
        vec3 rd=normalize(vec3(uv,1.));
        vec3 col=vec3(0);
        float t=0.;

        for(int i=0;i<MARCH_STEPS;i++){
          vec3 p=ro+rd*t;
          float density=map(p);
          if(density>0.){
            vec3 base=vec3(0.05,0.18,0.28);
            vec3 highlight=vec3(0.12,0.32,0.42);
            float hue=sin(iTime*0.3+p.y*1.5)*0.5+0.5;
            vec3 auroraColor=mix(base,highlight,hue);
            auroraColor+=vec3(0.04,0.02,0.12)*sin(iTime*0.7+p.x*2.)*0.5+0.5;
            col+=auroraColor*density*0.12*uColorIntensity;
          }
          t+=0.1;
        }

        col=pow(col,vec3(0.85));
        col*=0.9;
        gl_FragColor=vec4(col,1.);
      }
    `;

    function mkShader(type: number, src: string) {
      const s = gl!.createShader(type)!;
      gl!.shaderSource(s, src);
      gl!.compileShader(s);
      return s;
    }
    const prog = gl!.createProgram()!;
    gl!.attachShader(prog, mkShader(gl!.VERTEX_SHADER, vsSrc));
    gl!.attachShader(prog, mkShader(gl!.FRAGMENT_SHADER, fsSrc));
    gl!.linkProgram(prog);
    gl!.useProgram(prog);

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const buf = gl!.createBuffer();
    gl!.bindBuffer(gl!.ARRAY_BUFFER, buf);
    gl!.bufferData(gl!.ARRAY_BUFFER, verts, gl!.STATIC_DRAW);
    const ap = gl!.getAttribLocation(prog, "aPosition");
    gl!.enableVertexAttribArray(ap);
    gl!.vertexAttribPointer(ap, 2, gl!.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "iResolution");
    const uTime = gl.getUniformLocation(prog, "iTime");
    const uMouse = gl.getUniformLocation(prog, "iMouse");
    const uFlow = gl.getUniformLocation(prog, "uFlowSpeed");
    const uCI = gl.getUniformLocation(prog, "uColorIntensity");
    const uNL = gl.getUniformLocation(prog, "uNoiseLayers");
    const uMI = gl.getUniformLocation(prog, "uMouseInfluence");

    const t0 = performance.now();
    function draw(ts: number) {
      gl!.uniform2f(uRes, canvas!.width, canvas!.height);
      gl!.uniform1f(uTime, (ts - t0) / 1000);
      gl!.uniform2f(uMouse, mousePos.x * canvas!.width, (1 - mousePos.y) * canvas!.height);
      gl!.uniform1f(uFlow, 0.28);
      gl!.uniform1f(uCI, 1.1);
      gl!.uniform1f(uNL, 4.0);
      gl!.uniform1f(uMI, 0.18);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(draw);
    }
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <footer className="relative w-full min-h-[400px] overflow-hidden flex items-center justify-center">
      {/* Aurora Shader Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
      
      {/* Dark Overlay to calm the shader */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/50 z-1" />

      {/* Glass Content - Centered with original margins */}
      <div className="relative z-10 w-full mx-[8vw] md:mx-[12vw] border border-white/11 bg-black/18 backdrop-blur-[20px] saturate-[1.5]">
        <div className="flex flex-col gap-[64px]" style={{ padding: "60px 80px 48px" }}>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-[80px] items-start">
            <div className="md:col-span-8 flex flex-col items-start gap-[40px] md:gap-[52px]">
              <div className="flex items-center gap-[20px] md:gap-[28px]">
                <svg width="28" height="32" viewBox="0 0 51 58" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-90 shrink-0">
                  <path d="M25.4095 19.8857L33.5419 24.581V33.9714L25.4095 38.6667L17.2771 33.9714V24.581L25.4095 19.8857Z" fill="white"/>
                  <path d="M40.1351 20.7742V37.7771L25.4095 46.2791L10.6839 37.7771V20.7742L25.4095 12.2722L40.1351 20.7742Z" stroke="white" strokeWidth="2.12195"/>
                  <circle cx="48.0571" cy="16.019" r="2.76191" fill="white"/>
                  <circle cx="48.0571" cy="42.5333" r="2.76191" fill="white"/>
                  <circle cx="2.76191" cy="41.9809" r="2.76191" fill="white"/>
                  <circle cx="2.76191" cy="16.019" r="2.76191" fill="white"/>
                  <circle cx="25.4095" cy="2.76191" r="2.76191" fill="white"/>
                  <circle cx="25.4095" cy="55.2381" r="2.76191" fill="white"/>
                </svg>
                <span className="font-rhymes italic font-thin text-[38px] md:text-[54px] text-white/95 leading-none tracking-tight">Saturn Labs</span>
              </div>
              <p className="font-gilroy text-[13px] md:text-[15px] uppercase tracking-[0.2em] text-white/32 font-light leading-relaxed max-w-[400px]">Building the data infrastructure for Physical AI.</p>
              
              <div className="flex flex-col md:flex-row items-start md:items-center gap-[12px] md:gap-[16px]">
                <span className="font-gilroy text-[12px] md:text-[13px] uppercase tracking-[0.3em] text-white/36 font-light">Hiring — BLR & SF</span>
                <div className="hidden md:block w-[3px] h-[3px] rounded-full bg-white/22 shrink-0" />
                <a href="mailto:hiring@saturnlabs.ai" className="font-gilroy text-[12px] md:text-[13px] tracking-[0.08em] text-white/72 hover:text-white transition-colors border-b border-white/22 pb-[1px]">hiring@saturnlabs.ai</a>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col items-start md:items-end gap-[20px] md:gap-[24px] pt-[8px] md:pt-[12px]">
              <span className="font-gilroy text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/20 font-light">Company</span>
              <div className="flex flex-col items-start md:items-end gap-[12px] md:gap-[18px]">
                <a href="#" className="font-gilroy text-[14px] md:text-[15px] uppercase tracking-[0.25em] text-white/45 hover:text-white transition-colors font-light">LinkedIn</a>
                <a href="#" className="font-gilroy text-[14px] md:text-[15px] uppercase tracking-[0.25em] text-white/45 hover:text-white transition-colors font-light">Privacy Policy</a>
              </div>
            </div>
          </div>

          <div className="w-full h-px" style={{ backgroundColor: 'rgba(255,255,255,0.07)' }} />

          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="font-gilroy text-[13px] tracking-[0.15em] uppercase text-white/18 font-light">Silverlabs AI Inc, Delaware 19901.</div>
            <div className="font-gilroy text-[13px] tracking-[0.15em] uppercase text-white/18 font-light">Backed by <span className="text-white/38">Entrepreneurs First</span></div>
          </div>

        </div>
      </div>
    </footer>
  );
}
