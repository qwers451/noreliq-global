export type Principle = {
  index: string;
  title: string;
  description: string;
};

export type Stat = {
  value: string;
  label: string;
};

export const about = {
  /** Крупный вводный текст на странице «О нас». */
  lead:
    "Noreliq helps businesses launch websites, services, bots and AI tools. We get to the core of the task fast, propose a clear way of working and see the project through to the result.",
  body: [
    "We come from product teams and agencies, so we're equally calm about deadlines and details. Every project has one person responsible for the whole result, not just their own part.",
    "We work in the open: tasks, timelines and decisions are visible to the client throughout the project. If a hypothesis doesn't hold up, we say so right away and suggest an alternative.",
  ],
  principles: [
    {
      index: "01",
      title: "The problem comes first",
      description:
        "Before design and development, we agree on what should change: leads, sales, speed of work, content quality or brand visibility.",
    },
    {
      index: "02",
      title: "We show our work",
      description:
        "We work in stages, share interim versions and agree on decisions quickly.",
    },
    {
      index: "03",
      title: "No complexity for its own sake",
      description:
        "If a task can be solved more simply, we don't add extra entities, screens or technologies for show.",
    },
    {
      index: "04",
      title: "We leave things in order",
      description:
        "We hand over projects so they can be maintained: clear structure, access, documentation and logic you can follow.",
    },
  ] satisfies Principle[],
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Prisma",
    "GraphQL",
    "Tailwind CSS",
    "GSAP",
    "Three.js",
    "Framer Motion",
    "Figma",
    "OpenAI API",
    "LangChain",
    "Docker",
    "Kubernetes",
    "GitHub Actions",
    "Vercel",
    "Cloudflare",
    "Playwright",
    "Vitest",
    "Storybook",
    "Sentry",
    "Directus",
    "Stripe",
  ],
  stats: [
    { value: "6+", label: "years of practice" },
    { value: "40+", label: "projects shipped" },
    { value: "3", label: "people in the core team" },
    { value: "12", label: "client countries" },
  ] satisfies Stat[],
} as const;
