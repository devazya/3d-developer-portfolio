import { House, User, FolderKanban, Workflow, Mail } from 'lucide-react';

const links = [
  { href: '#home', label: 'Home', Icon: House },
  { href: '#tech-stack', label: 'Skills', Icon: User },
  { href: '#projects', label: 'Projects', Icon: FolderKanban },
  { href: '#automations', label: 'Automations', Icon: Workflow },
  { href: '#contact', label: 'Contact', Icon: Mail },
];

export default function VerticalDock() {
  return (
    <nav
      aria-label="Primary"
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md p-2 shadow-lg shadow-black/40"
    >
      {links.map(({ href, label, Icon }) => (
        <a
          key={href}
          href={href}
          aria-label={label}
          className="group relative flex h-10 w-10 items-center justify-center rounded-full text-slate-400 hover:text-white hover:bg-red-600 transition-colors focus-visible:outline-2 focus-visible:outline-red-500"
        >
          <Icon className="w-4 h-4" aria-hidden />
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-[#090a0f] border border-red-500/30 px-2 py-1 text-xs text-white opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
            {label}
          </span>
        </a>
      ))}
    </nav>
  );
}
