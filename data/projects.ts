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
    title: 'CareSync AI — Intelligent Healthcare CRM & Workflow Automation',
    oneLiner: 'Engineered an automated patient management and HCP CRM platform featuring interactive clinical data visualizations and real-time record synchronization.',
    impact: 'Automated manual patient intake & record sync, reducing administrative overhead by 65% and handling 10k+ concurrent telemetry records with zero state race conditions.',
    tags: ['React.js', 'JavaScript', 'REST APIs', 'WebSockets', 'Tailwind CSS', 'Node.js'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'CodeGrindr — AI-Powered Interview Prep & Execution Engine',
    oneLiner: 'Built an end-to-end coding interview platform integrating an in-browser Monaco code execution editor with real-time AI feedback loops.',
    impact: 'Accelerated interview prep efficiency for 300+ tracked algorithmic problems; integrated Groq Llama-3.3 LLM API for low-latency (<400ms) code analysis.',
    tags: ['React.js', 'Supabase', 'Groq API (Llama 3.3)', 'Monaco Editor', 'Tailwind CSS'],
    demoUrl: 'https://codegrindr.vercel.app',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'White-Label Multi-Tenant Food Delivery App',
    oneLiner: 'Built a cross-platform Flutter food delivery app with real-time order tracking and vendor management, with dedicated client, rider, and admin interfaces.',
    impact: 'Built geospatial indexing on MongoDB to filter 500+ vendor menus in under 50ms and sustained live WebSocket location streams.',
    tags: ['Flutter', 'Node.js', 'Express.js', 'MongoDB', 'WebSockets', 'JWT'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'Institutional Stock Trading & Portfolio Simulation Engine',
    oneLiner: 'Real-time portfolio tracking dashboard with order flow simulation and transactional ledger integrity.',
    impact: 'Optimized relational database schemas in PostgreSQL to handle zero race conditions during high-concurrency trade execution simulations.',
    tags: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Chart.js', 'JWT'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'NestJS Scalable Enterprise API & Microservice Engine',
    oneLiner: 'High-performance, modular REST API backend built with NestJS, TypeScript, and PostgreSQL. Implemented clean architecture, dependency injection, JWT authentication, and automated rate-limiting guards.',
    impact: 'Architected scalable microservices handling structured data pipelines with 99.9% uptime and <80ms response latencies under concurrent traffic.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Swagger', 'Docker'],
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'Multi-Vendor Hyperlocal E-Commerce Platform (NestJS Backend)',
    oneLiner: 'Production-grade microservices architecture built with NestJS, TypeScript, and PostgreSQL for localized vendor indexing, catalog management, and real-time order processing.',
    impact: 'Architected clean dependency-injected microservices with Redis caching, supporting fast geospatial queries (<40ms) and multi-tenant store isolation.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Prisma ORM', 'Redis', 'Docker', 'WebSockets'],
    repoUrl: 'https://github.com/devazya',
  },
];
