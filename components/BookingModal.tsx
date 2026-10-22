'use client';

import { useEffect, useRef, useState } from 'react';
import Cal, { getCalApi } from '@calcom/embed-react';
import { CalendarClock, X } from 'lucide-react';
import { CAL_LINK } from '@/data/contact';

const BRAND = '#ff2a5f';

// "Book a Discovery Call" button that opens a native <dialog> with the Cal.com embed.
export default function BookingModal({ className = '' }: { className?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    getCalApi().then((cal) =>
      cal('ui', { theme: 'dark', cssVarsPerTheme: { dark: { 'cal-brand': BRAND }, light: { 'cal-brand': BRAND } }, hideEventTypeDetails: false }),
    );
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
        className={`inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff2a5f] hover:bg-[#ff4673] px-6 py-3 font-medium text-white shadow-lg shadow-[#ff2a5f]/25 transition-colors ${className}`}
      >
        <CalendarClock className="w-4 h-4" aria-hidden />
        Book a Discovery Call
      </button>

      <dialog
        ref={dialog}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        aria-label="Book a discovery call"
        className="m-auto w-[min(100%-2rem,56rem)] max-h-[90vh] rounded-2xl border border-[#ff2a5f]/30 bg-[#0d0e14] p-0 text-slate-100 shadow-2xl shadow-[#ff2a5f]/20 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3">
          <h2 className="font-semibold text-white">Book a Discovery Call</h2>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="rounded-full p-1.5 text-slate-400 hover:bg-[#ff2a5f] hover:text-white"
          >
            <X className="w-4 h-4" aria-hidden />
          </button>
        </div>
        {/* Mounted only while open so the Cal script loads on demand. */}
        {open && (
          <Cal
            calLink={CAL_LINK}
            config={{ layout: 'month_view', theme: 'dark' }}
            style={{ width: '100%', height: '75vh', overflow: 'auto' }}
          />
        )}
      </dialog>
    </>
  );
}
