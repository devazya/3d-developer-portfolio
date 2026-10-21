import { ArrowUp } from 'lucide-react';

export default async function Footer() {
  'use cache'; // year is baked in at build/revalidation time
  return (
    <footer className="border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Divyanshu Devajya</p>
        <a href="#home" className="inline-flex items-center gap-1.5 hover:text-white transition-colors">
          Back to top <ArrowUp className="w-4 h-4" aria-hidden />
        </a>
      </div>
    </footer>
  );
}
