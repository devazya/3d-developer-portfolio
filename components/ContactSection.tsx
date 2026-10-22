'use client';

import { motion } from 'framer-motion';
import { Mail, CodeXml, CalendarClock } from 'lucide-react';
import EmailCopyPill from '@/components/EmailCopyPill';
import { CAL_LINK, MAILTO } from '@/data/contact';

const spring = { type: 'spring', stiffness: 200, damping: 20 } as const;

const contacts = [
  { href: `https://cal.com/${CAL_LINK}`, label: 'Book a Call', icon: CalendarClock, primary: true },
  { href: MAILTO, label: 'Email Me', icon: Mail, primary: false },
  { href: 'https://github.com/devazya', label: 'GitHub', icon: CodeXml, primary: false },
];

export default function ContactSection() {
  return (
    <section id="contact" className="px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={spring}
        className="max-w-3xl mx-auto text-center rounded-3xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md p-8 sm:p-12"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300 mb-6">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
          Taking new projects
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
          Let&apos;s build something that pays for itself.
        </h2>
        <p className="text-slate-400 mb-8 max-w-xl mx-auto">
          Available for full-stack contracts, custom scrapers, and MVP builds. Fast turnaround, clear communication,
          and code your team can maintain.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          {contacts.map(({ href, label, icon: Icon, primary }) => (
            <motion.a
              key={label}
              href={href}
              {...(href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={spring}
              className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium ${
                primary
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/25'
                  : 'border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" aria-hidden />
              {label}
            </motion.a>
          ))}
        </div>
        <div className="mt-6">
          <EmailCopyPill />
        </div>
      </motion.div>
    </section>
  );
}
