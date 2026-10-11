export type ProjectBlock =
  | { type: "text"; title?: string; body: string }
  /**
   * contain — снимок интерфейса: показывается целиком, в своей пропорции
   * и без параллакса, поэтому нужны исходные размеры файла.
   */
  | {
      type: "image";
      src: string;
      alt: string;
      wide?: boolean;
      contain?: boolean;
      width?: number;
      height?: number;
    }
  /** Ряд экранов приложения: показываются целиком, без кадрирования. */
  | { type: "screens"; items: { src: string; caption: string }[] }
  /**
   * Снимки десктопного интерфейса по двое в ряд. Показывать их во всю
   * ширину незачем: страница растягивается, а мелкий текст всё равно
   * не читается — важнее общий вид экрана.
   */
  | {
      type: "shots";
      items: { src: string; alt: string; width: number; height: number }[];
    }
  | { type: "quote"; body: string; author: string }
  | { type: "stats"; items: { value: string; label: string }[] };

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  /** Короткая строка под названием — она идёт курсивом в ленте работ. */
  subtitle?: string;
  /** Публичный адрес проекта, если сайт открыт. */
  url?: string;
  tags: string[];
  /** Знак-иконка проекта: превью для соцсетей и разметки. */
  cover: string;
  /** Экран продукта 16:10 для ленты работ и главной (scripts/project-previews.mjs). */
  preview: string;
  summary: string;
  blocks: ProjectBlock[];
};

/** Контент работ. Меняется здесь, вёрстка страниц не трогается.
    Порядок массива задаёт и ленту работ, и цикл «следующий проект». */
export const projects: Project[] = [
  {
    slug: "m-des",
    title: "M-Des",
    client: "M-Des",
    year: "2026",
    role: "Design and development",
    url: "https://m-des.ru/en/",
    subtitle: "interior design studio",
    tags: ["Website", "Interiors", "Multilingual"],
    cover: "/projects/m-des/cover.webp",
    preview: "/projects/m-des/preview.webp",
    summary:
      "A showcase for a bespoke interior design studio: its philosophy, a portfolio of concepts, services and pricing, in English and Russian.",
    blocks: [
      {
        type: "text",
        title: "The brief",
        body:
          "Margarita Davidenko's studio designs private interiors, where clients decide on how a space feels rather than on a list of services. So the site works as a showcase of the studio's hand: full-screen renders, short copy and one clear next step, a message to the studio. The services, portfolio and pricing pages keep the same voice, and the whole site is available in English and Russian.",
      },
      {
        type: "shots",
        items: [
          {
            src: "/projects/m-des/home.webp",
            alt: "M-Des home page: a full-screen interior render",
            width: 2000,
            height: 1250,
          },
          {
            src: "/projects/m-des/portfolio.webp",
            alt: "Portfolio: the studio's concepts in a single grid",
            width: 2000,
            height: 1250,
          },
          {
            src: "/projects/m-des/uslugi.webp",
            alt: "Services: what an interior design project includes",
            width: 2000,
            height: 1250,
          },
          {
            src: "/projects/m-des/prices.webp",
            alt: "Pricing: design fees per square metre",
            width: 2000,
            height: 1250,
          },
          {
            src: "/projects/m-des/contacts.webp",
            alt: "Contacts: Telegram, Instagram and WhatsApp in one list",
            width: 2000,
            height: 1250,
          },
          {
            src: "/projects/m-des/mobile.webp",
            alt: "Mobile version of the home page",
            width: 1170,
            height: 1992,
          },
        ],
      },
    ],
  },
  {
    slug: "meet-up",
    title: "Meet Up",
    client: "Meet Up",
    year: "2025",
    role: "Design and development",
    subtitle: "a map of friends and restaurants",
    tags: ["Web app", "Booking", "Maps"],
    cover: "/projects/meet-up/cover.webp",
    preview: "/projects/meet-up/preview.webp",
    summary:
      "Meet Up helps you decide where to meet and eat: places nearby, friends' recommendations, menus, directions, table booking and pre-ordering.",
    blocks: [
      {
        type: "text",
        title: "The brief",
        body:
          "Choosing a restaurant usually splits into several steps: find a place on the map, check reviews, send options to friends, call to book. The task was to bring that whole path into a single mobile web flow.",
      },
      {
        type: "screens",
        items: [
          { src: "/projects/meet-up/map.webp", caption: "Map, curated lists and filters" },
          { src: "/projects/meet-up/search-dish.webp", caption: "Search by dish, not just by name" },
          { src: "/projects/meet-up/route.webp", caption: "Directions in Yandex Maps or 2GIS" },
        ],
      },
      {
        type: "text",
        title: "The social layer",
        body:
          "The core idea is recommendations from people you know. The map shows places your friends have been, with their ratings and comments, so you can pick a restaurant without wading through reviews from strangers.",
      },
      {
        type: "text",
        title: "Booking and pre-ordering",
        body:
          "Once a place is chosen, the next step is right there: date, time, number of guests and a table. The menu shows ingredients, nutrition facts and allergens, and dishes can be added to a pre-order.",
      },
      {
        type: "screens",
        items: [
          { src: "/projects/meet-up/menu.webp", caption: "Restaurant menu" },
          { src: "/projects/meet-up/dish.webp", caption: "Dish details: nutrition and allergens" },
          { src: "/projects/meet-up/booking.webp", caption: "Booking confirmation and table choice" },
        ],
      },
      {
        type: "text",
        title: "Development",
        body:
          "The project went from user flows and mockups to a working mobile web app: map, gestures, bottom sheets and states, with nothing to install.",
      },
      {
        type: "stats",
        items: [
          { value: "4", label: "sections in the navigation" },
          { value: "2", label: "flows: booking and pre-order" },
        ],
      },
    ],
  },
  {
    slug: "devcontest",
    title: "DevContest",
    client: "DevContest",
    year: "2026",
    role: "Design and development",
    subtitle: "contests with AI review",
    tags: ["Platform", "AI", "Microservices"],
    cover: "/projects/devcontest/cover.webp",
    preview: "/projects/devcontest/preview.webp",
    summary:
      "A platform for contest-based freelancing: a client launches a contest, participants submit solutions, AI helps check each one against the brief, and the prize fund stays in escrow until a winner is chosen.",
    blocks: [
      {
        type: "text",
        title: "The brief",
        body:
          "In classic freelancing, clients often pick a contractor before they see any result. DevContest flips that: participants submit solutions first, then the client compares them against clear criteria and picks a winner.",
      },
      {
        type: "image",
        src: "/projects/devcontest/contests.webp",
        width: 2000,
        height: 1250,
        contain: true,
        alt: "Contest list with filters by status, type and prize fund",
        wide: true,
      },
      {
        type: "text",
        title: "How it works",
        body:
          "The client creates a contest with a description, requirements, stages and a prize fund. Participants upload their solutions, and an AI review shows how well each one matches the brief. The final call stays with the client.",
      },
      {
        type: "image",
        src: "/projects/devcontest/solution.webp",
        width: 2000,
        height: 1250,
        contain: true,
        alt: "Solution page with an AI score for every requirement in the brief",
        wide: true,
      },
      {
        type: "text",
        title: "Payments",
        body:
          "The prize fund is reserved before the contest starts. Participants can see that payment is guaranteed, and payouts go to the winners once every stage is closed.",
      },
      {
        type: "text",
        title: "Architecture",
        body:
          "The product is built as a set of independent services: auth, contests, AI review and payments. Each part can be improved, tested and scaled on its own, without rewriting the whole product.",
      },
      {
        type: "shots",
        items: [
          {
            src: "/projects/devcontest/wallet.webp",
            alt: "Wallet: balance, top-ups and transaction history",
            width: 2000,
            height: 1250,
          },
          {
            src: "/projects/devcontest/create.webp",
            alt: "Creating a contest: stages and prize split",
            width: 2000,
            height: 1250,
          },
        ],
      },
      {
        type: "stats",
        items: [
          { value: "4", label: "microservices behind a gateway" },
          { value: "17", label: "interface screens" },
          { value: "3", label: "roles: client, participant, admin" },
        ],
      },
    ],
  },
  {
    slug: "court-01",
    title: "Court 01",
    client: "COURT 01",
    year: "2026",
    role: "Design and development",
    subtitle: "book a table in a minute",
    tags: ["Web app", "Booking", "Member area"],
    cover: "/projects/court-01/cover.webp",
    preview: "/projects/court-01/preview.webp",
    summary:
      "A booking service for a table tennis club: a floor plan with tables, a live availability grid, coach sessions and hours deducted from the club membership.",
    blocks: [
      {
        type: "text",
        title: "The brief",
        body:
          "A premium club took bookings through an administrator in a messenger: table availability lived in someone's head, coaches were arranged separately and memberships were counted by hand. The club needed a service where members see free slots and book a table in a minute, so the front desk stops being a bottleneck.",
      },
      {
        type: "shots",
        items: [
          {
            src: "/projects/court-01/dashboard.webp",
            alt: "Member dashboard: next booking, hours balance, table availability",
            width: 2000,
            height: 2759,
          },
          {
            src: "/projects/court-01/booking.webp",
            alt: "Booking a table on the floor plan, with extras and a price breakdown",
            width: 2000,
            height: 2798,
          },
        ],
      },
      {
        type: "text",
        title: "Booking comes first",
        body:
          "Tables are picked on a floor plan rather than from a list: you can see zones, surfaces, equipment and which tables are taken. Extras such as a racket set, a robot feeder or water are added right in the booking, and the price updates with the member discount. The dashboard shows the next session, remaining hours and tables free tonight.",
      },
      {
        type: "shots",
        items: [
          {
            src: "/projects/court-01/schedule.webp",
            alt: "Daily table availability grid with club events",
            width: 2000,
            height: 2192,
          },
          {
            src: "/projects/court-01/coaches.webp",
            alt: "Coach directory with filters and a session builder",
            width: 2000,
            height: 2634,
          },
        ],
      },
      {
        type: "text",
        title: "Schedule and coaches",
        body:
          "Staff work in a timeline: six tables, 30-minute slots, club tournaments and maintenance windows on one screen. Coaches live in a directory filtered by format, level and playing style, each showing their next free slot and hourly rate, and a session is booked the same way as a table.",
      },
      {
        type: "stats",
        items: [
          { value: "6", label: "tables in the live grid" },
          { value: "30", label: "minutes, the shortest slot" },
          { value: "4", label: "core screens" },
        ],
      },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
