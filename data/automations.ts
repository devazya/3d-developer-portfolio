export type Automation = {
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly repoUrl?: string;
};

export const automations: readonly Automation[] = [
  {
    title: 'NSE Market Data & Excel Automation Engine',
    tags: ['Python', 'Requests', 'OpenPyXL', 'Pandas'],
    summary: 'Extracts live option chain/OI data, automated workbook formatting, saving 15+ manual data engineering hours weekly.',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'E-Commerce Catalog Scraper & Telegram Bot',
    tags: ['Python', 'Supabase', 'Telegram API'],
    summary: 'Deduplicates product feeds and triggers real-time price arbitrage alerts to Telegram channels within 2 seconds of price changes.',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'B2B Lead Scraping & Automated Prospecting Pipeline',
    tags: ['Python', 'Playwright', 'Asyncio', 'PostgreSQL'],
    summary: 'Automates multi-source client discovery and personalized outreach logging across high-ticket freelancing indices.',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'WhatsApp Automated Client Outreach & Notification Engine',
    tags: ['Node.js', 'Express.js', 'Meta Cloud API', 'Webhooks', 'MongoDB'],
    summary: 'Production-grade WhatsApp bot for real-time order notifications, automated support flows, and lead engagement. Increased lead response rates by 40% and eliminated manual messaging overhead.',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'Instagram Auto-DM & Social Lead Engagement Engine',
    tags: ['Python', 'Playwright', 'Meta Graph API', 'Webhooks', 'Node.js', 'Asyncio'],
    summary: 'Meta Graph API / Playwright pipeline that listens to story mentions, keyword triggers, and inbound comments to send personalized DMs to prospects. Increased outbound conversion rates by 45% and replaced manual client DM outreach.',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'IPO Engine — Rule-Based IPO Screening & Telegram Alerts',
    tags: ['Python 3', 'Pydantic', 'requests', 'BeautifulSoup', 'Tkinter', 'pytest', 'mypy (strict)', 'Telegram Bot API', 'Windows Task Scheduler'],
    summary: 'Scrapes Indian mainboard IPO subscription, GMP and anchor data, scores each IPO, models allotment odds across family PANs, enforces a rupee-capped capital pool, and alerts on Telegram. Small-sample backtest (19 Sep–Oct 2026 listings, thresholds tuned on the same data): flagged all 7 that listed 10%+ up, none of the 4 that listed below issue. 76 tests, strict mypy. A screening tool, not investment advice.',
  },
];
