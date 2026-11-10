"use client";

import { useEffect, useRef, useState } from "react";
import {
  FRAGMENT_SHADER,
  MAX_BLOBS,
  VERTEX_SHADER,
  blobFrame,
  type LiquidBlob,
  type RGBA,
} from "./liquid";

type LiquidCanvasProps = {
  blobs: LiquidBlob[];
  /** Blobs para pantallas táctiles (más ligeros). Por defecto, `blobs`. */
  mobileBlobs?: LiquidBlob[];
  /** Color de fondo (no premultiplicado). Transparente por defecto. */
  base?: RGBA;
  className?: string;
  /** "converge": las manchas llegan separadas y se juntan al empezar. */
  intro?: "none" | "converge";
  onReady?: () => void;
};

const INTRO_MS = 1600;
// Frame que se muestra fijo con "reducir movimiento".
const STILL_T = 2.5;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

// Canvas WebGL del líquido. Si WebGL no está disponible o el shader no compila,
// no renderiza nada y el respaldo CSS del contenedor queda a la vista.
const LiquidCanvas = ({
  blobs,
  mobileBlobs,
  base = [0, 0, 0, 0],
  className,
  intro = "none",
  onReady,
}: LiquidCanvasProps) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const [failed, setFailed] = useState(false);
  const onReadyRef = useRef(onReady);
  onReadyRef.current = onReady;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      powerPreference: "low-power",
    }) as WebGLRenderingContext | null;
    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    const prog = gl.createProgram();
    if (!vs || !fs || !prog) {
      setFailed(true);
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setFailed(true);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uBlob = gl.getUniformLocation(prog, "uBlob");
    const uCol = gl.getUniformLocation(prog, "uCol");
    const uCount = gl.getUniformLocation(prog, "uCount");
    const uBase = gl.getUniformLocation(prog, "uBase");

    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const list = (coarse && mobileBlobs ? mobileBlobs : blobs).slice(0, MAX_BLOBS);

    const cols = new Float32Array(MAX_BLOBS * 3);
    list.forEach((b, i) => cols.set(b.color, i * 3));
    gl.uniform3fv(uCol, cols);
    gl.uniform1i(uCount, list.length);
    gl.uniform4f(uBase, base[0], base[1], base[2], base[3]);

    // El líquido es suave: se puede renderizar a menor resolución y escalar.
    const scale = coarse ? 0.5 : Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
    let sized = false;
    const resize = () => {
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (!sized || canvas.width !== w || canvas.height !== h) {
        sized = true;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
      }
    };

    const frameBuf = new Float32Array(MAX_BLOBS * 3);
    let frames = 0;
    let ready = false;
    const draw = (t: number, spread: number) => {
      resize();
      gl.uniform3fv(uBlob, blobFrame(list, t, spread, frameBuf));
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frames++;
      if (frames % 10 === 0) canvas.dataset.frames = String(frames);
      if (!ready) {
        ready = true;
        canvas.dataset.frames = String(frames);
        onReadyRef.current?.();
      }
    };

    const easeOut = (x: number) => 1 - Math.pow(1 - x, 3);
    const spreadAt = (ms: number) =>
      intro === "converge" ? 1 + 0.8 * (1 - easeOut(Math.min(1, ms / INTRO_MS))) : 1;

    let raf = 0;
    let elapsed = 0; // ms de animación efectiva (no avanza en pausa)
    let last = 0;
    let onScreen = false;

    const tick = (now: number) => {
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      draw(elapsed / 1000, spreadAt(elapsed));
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (raf || reduced) return;
      last = 0;
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const sync = () => {
      if (onScreen && document.visibilityState === "visible") start();
      else stop();
    };

    if (reduced) draw(STILL_T, 1);

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { rootMargin: "100px" }
    );
    io.observe(canvas);
    document.addEventListener("visibilitychange", sync);

    const ro = new ResizeObserver(() => {
      if (reduced) draw(STILL_T, 1);
    });
    ro.observe(canvas);

    const onLost = (e: Event) => {
      e.preventDefault();
      stop();
      setFailed(true);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
    // Los blobs se definen como constantes de módulo en quien lo usa.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (failed) return null;
  return <canvas ref={ref} aria-hidden className={className} />;
};

export default LiquidCanvas;
