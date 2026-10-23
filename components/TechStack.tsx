'use client';

import { motion } from 'framer-motion';
import { Server, MessagesSquare, Database, Bot, BrainCircuit, CalendarClock, Check, type LucideIcon } from 'lucide-react';
import EmailCopyPill from '@/components/EmailCopyPill';
import { CAL_LINK } from '@/data/contact';

const categories: readonly { title: string; icon: LucideIcon; items: readonly string[] }[] = [
  {
    title: 'Frameworks & Backend',
    icon: Server,
    items: ['NestJS', 'Next.js 16', 'Express.js', 'FastAPI', 'Node.js', 'React', 'Tailwind CSS', 'GraphQL'],
  },
  {
    title: 'AI & LLM Engineering',
    icon: BrainCircuit,
    items: ['Groq API (Llama 3.3)', 'OpenAI API', 'LangChain', 'Vector Databases (Pinecone/Supabase Vector)'],
  },
  {
    title: 'Messaging & APIs',
    icon: MessagesSquare,
    items: ['Meta Graph API (Instagram Webhooks)', 'WhatsApp Business API', 'Telegram Bot API', 'WebSockets', 'REST APIs'],
  },
  {
    title: 'Databases & Cloud',
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Supabase', 'Prisma ORM', 'Redis', 'Docker'],
  },
  {
    title: 'Automation & Scraping',
    icon: Bot,
    items: ['Python', 'Playwright', 'Scrapy', 'Selenium', 'Asyncio'],
  },
];

// Shown on the CTA card; keep these to commitments you actually honour.
const promises = ['Reply within 24 hours', 'Fixed-price quotes', 'Weekly progress demos'];

const spring = { type: 'spring', stiffness: 200, damping: 20 } as const;

export default function TechStack() {
  return (
    <section id="tech-stack" className="px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">Tech Stack</h2>
        <p className="text-slate-400 mb-12 max-w-2xl">
          The tools I ship production systems with, from data pipelines to polished frontends.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map(({ title, icon: Icon, items }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              whileHover={{ y: -6 }}
              transition={{ ...spring, delay: i * 0.08 }}
              className="group rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md p-6 transition-[border-color,box-shadow] duration-300 hover:border-red-500/50 hover:shadow-[0_0_40px_-10px] hover:shadow-red-500/40"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <h3 className="text-lg font-semibold text-white">{title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2">
                {items.map((item) => (
                  <motion.li
                    key={item}
                    whileHover={{ scale: 1.08 }}
                    transition={spring}
                    className="rounded-lg border border-slate-800 bg-[#090a0f]/60 px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:border-slate-600"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ ...spring, delay: categories.length * 0.08 }}
            className="flex flex-col rounded-2xl bg-gradient-to-br from-[#ff2a5f]/15 to-slate-900/60 border border-[#ff2a5f]/40 backdrop-blur-md p-6 shadow-[0_0_40px_-12px] shadow-[#ff2a5f]/50"
          >
            <h3 className="text-lg font-semibold text-white mb-2">Have a project in mind?</h3>
            <p className="text-sm text-slate-300 mb-4">Don&apos;t see your stack? I pick up new tools fast.</p>
            <ul className="space-y-2 mb-6 flex-1">
              {promises.map((p) => (
                <li key={p} className="flex items-center gap-2 text-sm text-slate-200">
                  <Check className="w-4 h-4 shrink-0 text-[#ff2a5f]" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`https://cal.com/${CAL_LINK}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-[#ff2a5f] hover:bg-[#ff4673] px-4 py-2 text-sm font-medium text-white transition-colors"
              >
                <CalendarClock className="w-4 h-4" aria-hidden />
                Book a Call
              </a>
              <EmailCopyPill />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
