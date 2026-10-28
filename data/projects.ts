export type Project = {
  readonly title: string;
  readonly oneLiner: string;
  readonly impact: string;
  readonly tags: readonly string[];
  readonly demoUrl?: string;
  readonly repoUrl?: string;
  /** Code exists but the repo isn't public: shows a non-clickable lock badge. */
  readonly privateRepo?: boolean;
};

export const projects: readonly Project[] = [
  {
    title: 'CodeGrindr — AI Mock Interview & Coding Practice Platform',
    oneLiner: 'Helps developers prepare for coding interviews: they solve problems in an in-browser Monaco editor and get instant AI feedback on their code.',
    impact: "Tracks progress across 300+ algorithmic problems and reviews each solution with Groq's Llama 3.3 model.",
    tags: ['React.js', 'Supabase', 'Groq API (Llama 3.3)', 'Monaco Editor', 'Tailwind CSS'],
    demoUrl: 'https://codegrindr.vercel.app',
    privateRepo: true,
  },
  {
    title: 'CareSync AI — AI-First CRM for Healthcare Field Reps',
    oneLiner: 'AI-powered CRM that lets pharmaceutical field representatives log and manage healthcare professional (HCP) interactions through a structured form or a natural-language chat.',
    impact: 'Built a LangGraph agent with 5 CRM tools on FastAPI and PostgreSQL, so reps can log an interaction just by describing it in chat instead of filling in forms.',
    tags: ['React 18', 'Redux Toolkit', 'FastAPI', 'LangGraph', 'LangChain', 'Groq API', 'PostgreSQL'],
    repoUrl: 'https://github.com/devazya/hcp-crm',
  },
  {
    title: 'White-Label Multi-Tenant Food Delivery App',
    oneLiner: 'Lets a delivery business run its own branded app: customers order and track deliveries live, while rider and admin interfaces handle fulfilment and vendors.',
    impact: 'Geospatial vendor search with MongoDB indexes and live rider location over WebSockets.',
    tags: ['Flutter', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'JWT'],
    privateRepo: true,
  },
  {
    title: 'Multi-Vendor Hyperlocal Marketplace Backend (NestJS)',
    oneLiner: 'Backend for a multi-vendor local marketplace: customers find nearby stores, vendors manage their catalogs, and orders are processed in real time.',
    impact: "Modular NestJS services with Redis caching and multi-tenant isolation, so each store's data stays separate.",
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'WebSockets'],
    privateRepo: true,
  },
  {
    title: 'Stock Trading Simulator & Portfolio Analytics Dashboard',
    oneLiner: 'Lets users practise trading without real money: place simulated orders and track portfolio performance on a live dashboard.',
    impact: 'A transactional ledger keeps balances consistent with every simulated trade.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Chart.js', 'JWT'],
    privateRepo: true,
  },
  {
    title: 'Enterprise REST API Backend (NestJS)',
    oneLiner: 'A ready-to-extend API foundation for business apps, with authentication, rate limiting and documented endpoints built in.',
    impact: 'Modular NestJS architecture with dependency injection, JWT auth, rate-limiting guards and Swagger docs.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Swagger', 'Docker'],
    privateRepo: true,
  },
];
