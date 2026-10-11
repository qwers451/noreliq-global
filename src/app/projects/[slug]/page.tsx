import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProjectFrames, type Frame } from "@/components/ui/ProjectFrames";
import { getNextProject, getProject, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";
import { projectSchema } from "@/lib/schema";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  // У многих кейсов клиент и есть продукт: «M-Des — M-Des» в заголовке ни к чему.
  // Регистр не учитываем: клиент записан как бренд («COURT 01»).
  const title =
    project.client.toLowerCase() === project.title.toLowerCase()
      ? project.title
      : `${project.title} — ${project.client}`;

  return pageMetadata({
    title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    // Своё превью: ссылка на кейс в мессенджере показывает его обложку.
    image: {
      url: `/projects/${project.slug}/og.jpg`,
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: `${project.title} project cover`,
    },
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  const next = getNextProject(project.slug);

  // Кейс держим коротким: описание сверху, под ним листаемые кадры.
  // Подробности живут в описании проекта, а не в простыне блоков.
  const intro = project.blocks.find((block) => block.type === "text");

  const meta: [string, string][] = [
    ["Client", project.client],
    ["Year", project.year],
    ["Role", project.role],
    ["Type", project.tags.slice(0, 2).join(" · ")],
  ];

  const frames: Frame[] = project.blocks.flatMap((block) => {
    if (block.type === "shots") return block.items;
    if (block.type === "screens") {
      return block.items.map((item) => ({
        src: item.src,
        alt: item.caption,
        width: 786,
        height: 1704,
      }));
    }
    if (block.type === "image" && block.width && block.height) {
      return [{ src: block.src, alt: block.alt, width: block.width, height: block.height }];
    }
    return [];
  });

  return (
    <>
      <JsonLd data={projectSchema(project)} />

      <section className="container-x pb-10 pt-[calc(var(--header-h)+8vh)] text-center">
        <Reveal immediate>
          <TransitionLink href="/projects" className="mono-label link-mask tap-target opacity-70">
            ← All work
          </TransitionLink>
        </Reveal>

        <h1 className="mt-4">
          <Reveal as="span" className="display-caps block text-display" immediate>
            {project.title}
          </Reveal>
          <Reveal
            as="span"
            className="display-note mt-4 block text-[length:clamp(0.9375rem,1.7vw,1.375rem)]"
            immediate
            delay={0.08}
          >
            {project.subtitle ?? project.role.toLowerCase()}
          </Reveal>
        </h1>

        {/* Мета подписана: раньше клиент, год и роль шли одной строкой
            без пояснений, и «COURT 01 2026» читалось как одно название. */}
        <Reveal
          as="dl"
          className="mx-auto mt-9 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-5 text-left sm:flex sm:flex-wrap sm:justify-center sm:gap-x-12"
          immediate
          delay={0.16}
        >
          {meta.map(([term, value]) => (
            <div key={term}>
              <dt className="mono-label text-[0.625rem] opacity-60">{term}</dt>
              <dd className="mt-1.5">{value}</dd>
            </div>
          ))}
          {project.url ? (
            <div>
              <dt className="mono-label text-[0.625rem] opacity-60">Live</dt>
              <dd className="mt-1.5">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="link-mask"
                >
                  {new URL(project.url).host} ↗
                </a>
              </dd>
            </div>
          ) : null}
        </Reveal>

        <Reveal as="p" className="poster-lead mt-10" immediate delay={0.24}>
          {intro?.type === "text" ? intro.body : project.summary}
        </Reveal>
      </section>

      {frames.length > 0 ? (
        <Reveal className="py-2">
          <ProjectFrames frames={frames} />
        </Reveal>
      ) : null}

      <section className="container-x section text-center" aria-labelledby="next-project">
        <Reveal as="p" className="mono-label opacity-60">
          Next project
        </Reveal>
        <h2 id="next-project" className="mt-4">
          <TransitionLink
            href={`/projects/${next.slug}`}
            className="link-mask display-caps text-display"
          >
            {next.title}
          </TransitionLink>
        </h2>
      </section>
    </>
  );
}
