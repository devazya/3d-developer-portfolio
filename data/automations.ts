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
    repoUrl: 'https://github.com/devazya/telegram-bot',
  },
  {
    title: 'B2B Lead Scraping & Automated Prospecting Pipeline',
    tags: ['Python', 'Playwright', 'Asyncio', 'PostgreSQL'],
    summary: 'Automates multi-source client discovery and personalized outreach logging across high-ticket freelancing indices.',
    repoUrl: 'https://github.com/devazya',
  },
  {
    title: 'WhatsApp Automated Client Outreach & Notification Engine',
    tags: ['Make.com', 'Twilio WhatsApp API', 'Webhooks'],
    summary: 'WhatsApp automation built with Make.com scenarios and the Twilio WhatsApp API: sends real-time order notifications, runs automated support replies, and engages new leads. Increased lead response rates by 40% and eliminated manual messaging overhead.',
  },
  {
    title: 'Instagram Comment-to-DM Lead Engagement Bot',
    tags: ['Java 17', 'Spring Boot 3', 'Meta Graph API', 'Webhooks'],
    summary: 'Spring Boot service that listens for Instagram comments containing a trigger keyword (e.g. "LINK") and instantly sends each commenter a private-reply DM via the Meta Graph API, replacing manual DM outreach.',
    repoUrl: 'https://github.com/devazya/instagram-bot',
  },
  {
    title: 'IPO Engine — Rule-Based IPO Screening & Telegram Alerts',
    tags: ['Python 3', 'Pydantic', 'requests', 'BeautifulSoup', 'Tkinter', 'pytest', 'mypy (strict)', 'Telegram Bot API', 'Windows Task Scheduler'],
    summary: 'Scrapes Indian mainboard IPO subscription, GMP and anchor data, scores each IPO, models allotment odds across family PANs, enforces a rupee-capped capital pool, and alerts on Telegram. Small-sample backtest (19 Sep–Oct 2026 listings, thresholds tuned on the same data): flagged all 7 that listed 10%+ up, none of the 4 that listed below issue. 76 tests, strict mypy. A screening tool, not investment advice.',
  },
];
