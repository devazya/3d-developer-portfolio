'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { EMAIL } from '@/data/contact';

export default function EmailCopyPill() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      location.href = `mailto:${EMAIL}`; // clipboard blocked (e.g. insecure context)
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/60 backdrop-blur-md px-4 py-2 font-mono text-sm text-slate-300 hover:border-[#ff2a5f]/60 hover:text-white transition-colors"
    >
      {copied ? <Check className="w-4 h-4 text-emerald-400" aria-hidden /> : <Copy className="w-4 h-4" aria-hidden />}
      {EMAIL}
      <span role="status" className={copied ? 'text-emerald-400' : 'sr-only'}>
        {copied ? 'Copied!' : ''}
      </span>
    </button>
  );
}
