export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export const site = {
  name: "Noreliq",
  tagline: "Digital & AI studio",
  /** Короткое позиционирование — используется в hero и SEO-описании. */
  intro:
    "We design and launch websites, web services, bots and AI tools around real business problems.",
  description:
    "Noreliq is a digital & AI studio. We design interfaces and build websites and web services with AI features around business goals.",
  /** Переопределяется NEXT_PUBLIC_SITE_URL (его выставляет workflow). */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://qwers451.github.io/noreliq-global",
  email: "order@noreliq.ru",
  foundedYear: 2026,
  socials: [
    { label: "Telegram", href: "https://t.me/noreliq_dev", handle: "@noreliq_dev" },
  ] satisfies SocialLink[],
} as const;

export type Site = typeof site;
