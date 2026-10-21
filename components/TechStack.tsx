'use client';

import { motion } from 'framer-motion';
import { Server, MessagesSquare, Database, Bot, BrainCircuit, type LucideIcon } from 'lucide-react';

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
        </div>
      </div>
    </section>
  );
}
