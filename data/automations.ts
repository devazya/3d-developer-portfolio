export type Automation = {
  readonly title: string;
  readonly summary: string;
  readonly tags: readonly string[];
  readonly repoUrl?: string;
  /** Code exists but the repo isn't public: shows a non-clickable lock badge. */
  readonly privateRepo?: boolean;
};

export const automations: readonly Automation[] = [
  {
    title: 'NSE Market Data & Excel Automation Engine',
    tags: ['Python', 'Requests', 'OpenPyXL', 'Pandas'],
    summary: 'Turns live option chain and open-interest data into formatted Excel reports automatically, so traders skip the manual copy-paste.',
    privateRepo: true,
  },
  {
    title: 'E-Commerce Catalog Scraper & Telegram Bot',
    tags: ['Python', 'Supabase', 'Telegram API'],
    summary: 'Scrapes e-commerce catalogs, removes duplicate products, and sends price-drop alerts to Telegram.',
    repoUrl: 'https://github.com/devazya/telegram-bot',
  },
  {
    title: 'B2B Lead Scraping & Automated Prospecting Pipeline',
    tags: ['Python', 'Playwright', 'Asyncio', 'PostgreSQL'],
    summary: 'Finds potential clients across multiple sources and logs personalized outreach automatically, so prospecting runs without manual searching.',
    privateRepo: true,
  },
  {
    title: 'WhatsApp Automated Client Outreach & Notification Engine',
    tags: ['Make.com', 'Twilio WhatsApp API', 'Webhooks'],
    summary: 'Automates order notifications, support replies and lead follow-ups on WhatsApp, built with Make.com scenarios and the Twilio WhatsApp API.',
  },
  {
    title: 'Instagram Comment-to-DM Lead Engagement Bot',
    tags: ['Java 17', 'Spring Boot 3', 'Meta Graph API', 'Webhooks'],
    summary: 'Replies instantly to every Instagram comment containing a trigger keyword (e.g. "LINK") with a private DM via the Meta Graph API, so no lead waits for a manual reply.',
    repoUrl: 'https://github.com/devazya/instagram-bot',
  },
  {
    title: 'IPO Engine — Rule-Based IPO Screening & Telegram Alerts',
    tags: ['Python 3', 'Pydantic', 'requests', 'BeautifulSoup', 'Tkinter', 'pytest', 'mypy (strict)', 'Telegram Bot API', 'Windows Task Scheduler'],
    summary: 'Finds open Indian mainboard IPOs, scores them from live subscription, GMP and anchor data, and sends a Telegram alert only when one meets the apply rule, while capping how much capital is tied up. Backtested on 21 real 2026 IPOs (small sample; thresholds tuned on the same data). 76 automated tests, strict mypy. A screening tool, not investment advice.',
    privateRepo: true,
  },
];
