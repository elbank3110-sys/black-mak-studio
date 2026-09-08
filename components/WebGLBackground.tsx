"use client";

import { useEffect, useRef } from "react";

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

// hash + value noise
float hash(vec2 p){ p = fract(p*vec2(123.34, 456.21)); p += dot(p, p+45.32); return fract(p.x*p.y); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i+vec2(1.0,0.0));
  float c = hash(i+vec2(0.0,1.0));
  float d = hash(i+vec2(1.0,1.0));
  vec2 u = f*f*(3.0-2.0*f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
float fbm(vec2 p){
  float v = 0.0; float amp = 0.5;
  for(int i=0;i<5;i++){ v += amp*noise(p); p *= 2.02; amp *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.045;

  float n = fbm(p*2.4 + vec2(t, -t*0.6));
  float n2 = fbm(p*1.3 - vec2(t*0.5, t*0.3) + n);
  float field = smoothstep(0.25, 0.9, n*0.6 + n2*0.4);

  // subtle light accent veins
  float vein = smoothstep(0.55, 0.62, n2) - smoothstep(0.62, 0.72, n2);
  vec3 base = vec3(0.027, 0.027, 0.031);

  vec3 col = mix(base, vec3(0.16, 0.16, 0.18), field * 0.5);
  col += vec3(0.9) * vein * 0.14;

  // subtle vignette
  float vig = smoothstep(1.2, 0.2, length(uv-0.5));
  col *= 0.55 + 0.45*vig;

  // grain
  float g = hash(gl_FragCoord.xy + u_time);
  col += (g-0.5)*0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function WebGLBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;

    // Performance: skip WebGL entirely on phones / touch devices.
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqCoarse = window.matchMedia("(pointer: coarse)");
    if (mqMobile.matches || mqCoarse.matches) return;

    const ctx =
      canvas.getContext("webgl", { antialias: false, alpha: false }) ||
      canvas.getContext("experimental-webgl");
    if (!ctx) return;
    const gl = ctx as WebGLRenderingContext;

    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    let raf = 0;
    const start = performance.now();
    function draw(now: number) {
      resize();
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function frame(now: number) {
      draw(now);
      raf = requestAnimationFrame(frame);
    }

    const isActive = () =>
      document.documentElement.getAttribute("data-theme") !== "light" &&
      !document.hidden;

    function sync() {
      cancelAnimationFrame(raf);
      raf = 0;
      if (isActive()) {
        if (reduce) draw(performance.now());
        else raf = requestAnimationFrame(frame);
      }
    }

    sync();

    const onVis = () => sync();
    const mo = new MutationObserver(() => sync());
    document.addEventListener("visibilitychange", onVis);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="webgl-bg pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
