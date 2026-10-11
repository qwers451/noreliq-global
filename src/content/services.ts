export type ServiceCategory = {
  id: string;
  /** Порядковый номер — маленький моноширинный индекс перед кодом. */
  index: string;
  /** Короткий код в духе "PLATFORMS" — используется как лейбл. */
  code: string;
  title: string;
  /** Одна строка — для карточки на главной. */
  summary: string;
  /** Один-два абзаца — для страницы услуг. */
  description: string[];
  /**
   * Пакеты услуги. Цен на международной версии нет: стоимость
   * обсуждается в переписке, поэтому здесь только названия.
   */
  tiers: string[];
  footnote?: string;
};

export const services: ServiceCategory[] = [
  {
    id: "platforms",
    index: "01",
    code: "PLATFORMS",
    title: "Web platforms and integrations",
    summary: "Websites and web services with integrations, payments and analytics.",
    description: [
      "We design and build websites and web platforms around the business problem: not a template, but a custom product with its own logic and integrations with CRMs, payment providers and internal systems. Structure, UX/UI, responsive layout, CMS, forms, analytics and SEO basics are all part of the work.",
      "What you get: a product ready to launch, solid on every device, with analytics and the integrations you need in place, and content you can update yourself.",
    ],
    tiers: ["Noreliq Landing", "Noreliq Business", "Noreliq Commerce", "Website support"],
  },
  {
    id: "ai-content",
    index: "02",
    code: "AI CONTENT",
    title: "AI video and creative",
    summary: "Ads and creative made with generative tools, for any platform.",
    description: [
      "We produce ad content with generative tools: short videos, product videos, visual creative, banners and social content. We handle the idea, script, visuals, voice-over, music, captions and editing.",
      "Formats: Reels, Shorts, TikTok, ads, websites and presentations. One piece is adapted to different platforms and aspect ratios.",
    ],
    tiers: ["AI video, 10–20 s", "Ad spot, 20–45 s", "Pack of 5 videos", "Monthly content"],
  },
  {
    id: "telegram",
    index: "03",
    code: "TELEGRAM",
    title: "Bots and Mini Apps",
    summary: "Telegram bots and Mini Apps, from simple logic to a full interface.",
    description: [
      "We build your brand's presence inside Telegram: from a simple bot for orders, bookings and support to a Mini App with a full interface, catalogue and payments right in the messenger. Where it helps, we add an AI assistant and CRM integrations.",
      "What you get: a working bot or Mini App, payments and notifications connected, and a guide to running it.",
    ],
    tiers: ["Telegram bot", "Telegram Mini App", "Bot / Mini App with CRM and AI assistant", "Support and development"],
  },
  {
    id: "ai-automation",
    index: "04",
    code: "AI AUTOMATION",
    title: "AI assistants and automation",
    summary: "AI assistants and automation for leads, sales and support.",
    description: [
      "We put AI tools to work on a business's repetitive tasks: assistants for websites and Telegram trained on your knowledge base, lead qualification, answers to common questions and handing the conversation over to a manager.",
      "We automate the processes around them: CRM, leads, email, documents, notifications, reports, n8n and API integrations. A typical chain: lead → AI analysis → CRM → personal reply → task for a manager → follow-up.",
    ],
    tiers: ["AI Assistant Start", "AI Sales: assistant + CRM", "End-to-end automation", "Support and development"],
    footnote: "Third-party APIs, servers, telephony and other external services are billed separately.",
  },
  {
    id: "ai-visibility",
    index: "05",
    code: "AI VISIBILITY",
    title: "Visibility in AI search",
    summary: "We help brands show up in answers from AI assistants and AI search.",
    description: [
      "We help brands become more visible in answers from AI assistants and AI search: we check how AI services describe the company and its competitors, which sources they rely on, and for which queries the brand appears or is missing.",
      "We work on site structure, FAQs, entities and schema markup, expert content, sources and regular monitoring of target queries, to raise the quality and likelihood of brand mentions.",
    ],
    tiers: ["AI Visibility Audit", "GEO Start", "Extended support"],
    footnote:
      "We don't promise a specific position in AI answers: we offer systematic work on visibility and measurable growth in mentions.",
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
};

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "Intro",
    description:
      "We discuss the task, format and timeline: a website, a series of AI videos, a bot or process automation. We agree on the goal we'll measure the result against.",
  },
  {
    index: "02",
    title: "Research",
    description:
      "We gather context: audience, competitors and how things work today. Then we shape the structure and hypotheses for the chosen format.",
  },
  {
    index: "03",
    title: "Concept",
    description:
      "An interface prototype, a video script, bot logic or a campaign structure, depending on the task. Key decisions are agreed before production starts.",
  },
  {
    index: "04",
    title: "Production",
    description:
      "We build the interface, make the video and visuals, set up the assistant or bot. You see progress on demo builds, not only the final result at the very end.",
  },
  {
    index: "05",
    title: "Launch",
    description:
      "We test, connect analytics and the integrations you need, and hand over access and documentation to your team.",
  },
  {
    index: "06",
    title: "Growth",
    description:
      "We watch the metrics, fine-tune and ship updates after launch, as a one-off or as ongoing support.",
  },
];
