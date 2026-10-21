'use client';

import type { MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, CodeXml, TrendingUp } from 'lucide-react';
import type { Project } from '@/data/projects';


const spring = { stiffness: 200, damping: 20 };

export function useTilt() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), spring);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { onMouseMove: onMove, onMouseLeave: onLeave, style: { rotateX, rotateY, transformPerspective: 1000 } };
}

export default function ProjectCard({ title, oneLiner, tags, impact, demoUrl, repoUrl }: Project) {
  const tilt = useTilt();

  return (
    <motion.article
      {...tilt}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', ...spring }}
      className="flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md p-6 hover:border-red-500/50 transition-colors"
    >
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 mb-4">{oneLiner}</p>

      <ul className="flex flex-wrap gap-2 mb-5" aria-label="Architecture">
        {tags.map((t) => (
          <li key={t} className="rounded-md bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs font-mono text-red-300">
            {t}
          </li>
        ))}
      </ul>

      <p className="flex gap-2 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-sm text-slate-200 mb-6 flex-1">
        <TrendingUp className="w-4 h-4 mt-0.5 shrink-0 text-red-400" aria-hidden />
        <span><span className="sr-only">Impact: </span>{impact}</span>
      </p>

      <div className="flex flex-wrap gap-3">
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 hover:bg-red-500 px-4 py-2 text-sm font-medium text-white"
          >
            Live Demo <ArrowUpRight className="w-4 h-4" aria-hidden />
          </a>
        )}
        {repoUrl && (
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 hover:border-slate-500 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white"
          >
            <CodeXml className="w-4 h-4" aria-hidden /> Source
          </a>
        )}
      </div>
    </motion.article>
  );
}
