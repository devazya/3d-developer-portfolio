'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight, CalendarClock } from 'lucide-react';
import SnapPortrait from '@/components/SnapPortrait';
import EmailCopyPill from '@/components/EmailCopyPill';
import { CAL_LINK } from '@/data/contact';

const stamp = 'MY PROJECTS • MY PROJECTS • ';

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden px-4 sm:px-8 lg:px-16 pt-24 pb-32 selection:bg-red-600 selection:text-white"
    >
      <div className="max-w-6xl mx-auto w-full grid gap-12 lg:grid-cols-2 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6">
            Transforming Ideas Into <span className="text-red-500">Digital Reality</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-400 max-w-xl leading-relaxed">
            Full-Stack Software Engineer & Automation Specialist. I build scalable web platforms, custom data scrapers, and high-performance backend pipelines for global clients.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3">
            <a
              href={`https://cal.com/${CAL_LINK}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff2a5f] hover:bg-[#ff4673] px-6 py-3 font-medium text-white shadow-lg shadow-[#ff2a5f]/25 transition-colors"
            >
              <CalendarClock className="w-4 h-4" aria-hidden />
              Book a Discovery Call
            </a>
            <EmailCopyPill />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto lg:mr-0 lg:ml-auto lg:translate-x-16 xl:translate-x-24 w-72 sm:w-96 lg:w-[30rem] aspect-square"
        >
          <div className="absolute inset-0 rounded-full bg-red-600/40 blur-[100px]" aria-hidden />
          <SnapPortrait src="/profile.png" alt="Divyanshu Devajya">
            <Constellation />
          </SnapPortrait>
        </motion.div>
      </div>

      <a
        href="#projects"
        aria-label="Scroll to projects"
        className="group absolute bottom-6 left-4 sm:left-8 h-28 w-28 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="absolute inset-0 animate-[spin_12s_linear_infinite] motion-reduce:animate-none" aria-hidden>
          <defs>
            <path id="stamp-circle" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
          </defs>
          <text className="fill-slate-400 text-[10.5px] tracking-[0.2em] font-semibold">
            <textPath href="#stamp-circle">{stamp}</textPath>
          </text>
        </svg>
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white transition-transform group-hover:scale-110">
          <ArrowDownRight className="w-5 h-5" aria-hidden />
        </span>
      </a>
    </section>
  );
}

// Nodes sit in the edge areas around the face/hair (roughly x 28-72, y 0-62 of the photo).
const nodes = [
  [6, 20], [18, 7], [22, 34], [7, 52], [81, 9], [94, 27], [79, 40], [93, 57],
  [12, 78], [30, 91], [72, 93], [89, 80],
];
const LINK = 32;

function Constellation() {
  const [t, setT] = useState(0);
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let id = 0;
    const tick = (ms: number) => {
      setT(ms / 1000);
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  const pts = nodes.map(([x, y], i) => [x + Math.sin(t * 0.5 + i * 1.7) * 3, y + Math.cos(t * 0.4 + i * 2.3) * 3]);

  return (
    <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full text-red-500 pointer-events-none" aria-hidden>
      <g stroke="currentColor" strokeWidth="0.25">
        {pts.flatMap(([x1, y1], i) =>
          pts.slice(i + 1).map(([x2, y2], j) => {
            const d = Math.hypot(x2 - x1, y2 - y1);
            return d < LINK ? (
              <line key={`${i}-${i + j + 1}`} x1={x1} y1={y1} x2={x2} y2={y2} strokeOpacity={(1 - d / LINK) * 0.8} />
            ) : null;
          }),
        )}
      </g>
      <g fill="currentColor">
        {pts.map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r={2.2} opacity={0.15 + 0.1 * Math.sin(t * 2 + i)} />
            <circle cx={cx} cy={cy} r={0.9} />
          </g>
        ))}
      </g>
    </svg>
  );
}
