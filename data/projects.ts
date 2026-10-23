export type Project = {
  readonly title: string;
  readonly oneLiner: string;
  readonly impact: string;
  readonly tags: readonly string[];
  readonly demoUrl?: string;
  readonly repoUrl?: string;
};

export const projects: readonly Project[] = [
  {
    title: 'CodeGrindr — AI Mock Interview & Coding Practice Platform',
    oneLiner: 'Built an end-to-end coding interview platform integrating an in-browser Monaco code execution editor with real-time AI feedback loops.',
    impact: 'Accelerated interview prep efficiency for 300+ tracked algorithmic problems; integrated Groq Llama-3.3 LLM API for low-latency (<400ms) code analysis.',
    tags: ['React.js', 'Supabase', 'Groq API (Llama 3.3)', 'Monaco Editor', 'Tailwind CSS'],
    demoUrl: 'https://codegrindr.vercel.app',
    repoUrl: 'https://github.com/devazya',
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
    oneLiner: 'Built a cross-platform Flutter food delivery app with real-time order tracking and vendor management, with dedicated client, rider, and admin interfaces.',
    impact: 'Built geospatial indexing on MongoDB to filter 500+ vendor menus in under 50ms and sustained live WebSocket location streams.',
    tags: ['Flutter', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'JWT'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'Multi-Vendor Hyperlocal Marketplace Backend (NestJS)',
    oneLiner: 'Microservices backend built with NestJS, TypeScript, and PostgreSQL for localized vendor discovery, catalog management, and real-time order processing.',
    impact: 'Architected clean dependency-injected microservices with Redis caching, supporting fast geospatial queries (<40ms) and multi-tenant store isolation.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'WebSockets'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'Stock Trading Simulator & Portfolio Analytics Dashboard',
    oneLiner: 'Real-time portfolio tracking dashboard with simulated order flow and a transactional ledger that keeps balances consistent.',
    impact: 'Designed PostgreSQL schemas and transactions that prevent race conditions during high-concurrency trade execution simulations.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Chart.js', 'JWT'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'Enterprise REST API Backend (NestJS)',
    oneLiner: 'Modular REST API backend built with NestJS, TypeScript, and PostgreSQL, with clean architecture, dependency injection, JWT authentication, and rate-limiting guards.',
    impact: 'Architected scalable microservices handling structured data pipelines with 99.9% uptime and <80ms response latencies under concurrent traffic.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Swagger', 'Docker'],
    repoUrl: 'https://github.com/devazya',
  },
];
