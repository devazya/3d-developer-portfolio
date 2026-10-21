import { CodeXml, Mail } from 'lucide-react';
import VerticalDock from './VerticalDock';

const socials = [
  { href: 'https://github.com/devazya', label: 'GitHub', Icon: CodeXml },
  { href: 'mailto:divyanshudevazya@gmail.com', label: 'Email', Icon: Mail },
];

export default function Navbar() {
  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 py-4">
        <a href="#home" className="text-lg font-bold tracking-tight text-white">
          divyanshu devajya<span className="text-red-500">.</span>
        </a>
        <div className="flex gap-2">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-slate-400 hover:text-white hover:border-red-500/60 transition-colors"
            >
              <Icon className="w-4 h-4" aria-hidden />
            </a>
          ))}
        </div>
      </header>
      <VerticalDock />
    </>
  );
}
