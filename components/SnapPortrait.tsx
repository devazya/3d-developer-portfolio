'use client';

import { useEffect, useRef, type ReactNode } from 'react';

const STEP = 2; // sample every Nth pixel; ponytail: raise if low-end devices stutter
const PAD = 0.6; // canvas overhang (fraction of image size) so dust can drift out
const MASK_R = Math.hypot(0.5, 0.55);

type P = { x: number; y: number; r: number; g: number; b: number; a: number; delay: number; vx: number; vy: number; w: number };

// Photo that disintegrates into dust as the page scrolls down and reassembles on scroll up.
export default function SnapPortrait({ src, alt, children }: { src: string; alt: string; children?: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = wrap.current!, cv = canvas.current!, ctx = cv.getContext('2d')!;
    let parts: P[] = [], size = 0, off = 0, frame = 0, buf: ImageData | null = null;

    const build = () => {
      size = Math.round(el.clientWidth);
      off = Math.round(size * PAD);
      cv.width = cv.height = size + off * 2;
      buf = ctx.createImageData(cv.width, cv.height);
      const src = document.createElement('canvas');
      src.width = src.height = size;
      const sctx = src.getContext('2d')!;
      sctx.drawImage(img.current!, 0, 0, size, size);
      // Bake in the same radial fade as the CSS mask on the <img> (circle stops are
      // % of the distance from the centre to the farthest corner).
      const cx = size * 0.5, cy = size * 0.45;
      const fade = sctx.createRadialGradient(cx, cy, 0, cx, cy, size * MASK_R);
      fade.addColorStop(0.45, '#000');
      fade.addColorStop(0.72, 'transparent');
      sctx.globalCompositeOperation = 'destination-in';
      sctx.fillStyle = fade;
      sctx.fillRect(0, 0, size, size);
      const data = sctx.getImageData(0, 0, size, size).data;
      parts = [];
      for (let y = 0; y < size; y += STEP)
        for (let x = 0; x < size; x += STEP) {
          const i = (y * size + x) * 4;
          if (data[i + 3] < 2) continue;
          parts.push({
            x, y, r: data[i], g: data[i + 1], b: data[i + 2], a: data[i + 3],
            // Crumbles from the left edge across, with noise so it breaks up in clumps.
            delay: (x / size) * 0.55 + Math.random() * 0.3,
            vx: 80 + Math.random() * 220,
            vy: -(60 + Math.random() * 200),
            w: Math.random() * 6.28,
          });
        }
    };

    const draw = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, scrollY / (innerHeight * 0.7)));
      const snapped = p > 0.001;
      img.current!.style.opacity = snapped ? '0' : '1';
      cv.style.opacity = snapped ? '1' : '0';
      if (overlay.current) overlay.current.style.opacity = String(1 - Math.min(1, p * 2.5));
      if (!snapped || !buf) return;
      const out = buf.data, W = cv.width, H = cv.height;
      out.fill(0);
      for (const q of parts) {
        const t = Math.min(1, Math.max(0, (p - q.delay * 0.6) / 0.4));
        const e = t * t;
        const x = Math.round(q.x + off + q.vx * e + Math.sin(q.w + t * 8) * 6 * t);
        const y = Math.round(q.y + off + q.vy * e);
        const a = q.a * (1 - t);
        if (a < 2 || x < 0 || y < 0 || x >= W - 1 || y >= H - 1) continue;
        // Dust warms toward crimson as it drifts away.
        const r = q.r + (255 - q.r) * t * 0.6, g = q.g * (1 - t * 0.7), b = q.b * (1 - t * 0.5);
        for (let dy = 0; dy < STEP; dy++)
          for (let dx = 0; dx < STEP; dx++) {
            const i = ((y + dy) * W + x + dx) * 4;
            out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = a;
          }
      }
      ctx.putImageData(buf, 0, 0);
    };

    const schedule = () => { if (!frame) frame = requestAnimationFrame(draw); };
    const init = () => { build(); draw(); };
    const onResize = () => { init(); };

    if (img.current!.complete) init();
    else img.current!.addEventListener('load', init, { once: true });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', schedule);
      removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div ref={wrap} className="relative h-full w-full">
      <img
        ref={img}
        src={src}
        alt={alt}
        className="relative h-full w-full object-cover [mask-image:radial-gradient(circle_at_50%_45%,black_45%,transparent_72%)]"
      />
      <canvas
        ref={canvas}
        aria-hidden
        className="pointer-events-none absolute opacity-0"
        style={{ inset: `-${PAD * 100}%`, width: `${100 + PAD * 200}%`, height: `${100 + PAD * 200}%` }}
      />
      <div ref={overlay} className="absolute inset-0">{children}</div>
    </div>
  );
}
