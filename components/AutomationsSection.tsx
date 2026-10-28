'use client';

import { motion } from 'framer-motion';
import { CodeXml, Lock, TerminalSquare } from 'lucide-react';
import { useTilt } from '@/components/ProjectCard';
import { automations, type Automation } from '@/data/automations';

const spring = { type: 'spring', stiffness: 200, damping: 20 } as const;

export default function AutomationsSection() {
  return (
    <section id="automations" className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Automations & Scrapers</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">Data engineering pipelines and bots that run while you sleep.</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {automations.map((a, i) => (
            <ScraperCard key={a.title} {...a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScraperCard({ title, tags, summary, repoUrl, privateRepo, i }: Automation & { i: number }) {
  const tilt = useTilt();
  return (
        <motion.article
          {...tilt}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ ...spring, delay: i * 0.08 }}
          className="flex flex-col rounded-2xl bg-[#090a0f]/80 border border-slate-800/80 backdrop-blur-md overflow-hidden font-mono transition-[border-color,box-shadow] duration-300 hover:border-red-500/50 hover:shadow-[0_0_40px_-10px] hover:shadow-red-500/40"
        >
          <div className="flex items-center gap-1.5 border-b border-slate-800/80 bg-slate-900/60 px-4 py-2.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
            <TerminalSquare className="ml-auto w-4 h-4 text-slate-500" />
          </div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="font-sans text-lg font-semibold text-white mb-3">
              <span className="text-red-400" aria-hidden>$ </span>
              {title}
            </h3>
            <p className="text-sm text-slate-400 mb-5 flex-1">{summary}</p>
            <ul className="flex flex-wrap gap-2" aria-label="Stack">
              {tags.map((t) => (
                <li key={t} className="rounded-md bg-red-500/10 border border-red-500/20 px-2 py-0.5 text-xs text-red-300">
                  {t}
                </li>
              ))}
            </ul>
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-lg border border-slate-700 hover:border-red-500/60 px-3 py-1.5 font-sans text-sm text-slate-300 hover:text-white"
              >
                <CodeXml className="w-4 h-4" aria-hidden /> Source
              </a>
            )}
            {privateRepo && (
              <span
                className="mt-5 inline-flex w-fit cursor-default select-none items-center gap-1.5 rounded-lg border border-slate-800 px-3 py-1.5 font-sans text-sm text-slate-500"
                title="Source code is in a private repository"
              >
                <Lock className="w-4 h-4" aria-hidden /> Private repo
              </span>
            )}
          </div>
        </motion.article>
  );
}
