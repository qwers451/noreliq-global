import Image from "next/image";

import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import type { Project } from "@/content/projects";

type Props = { projects: Project[] };

/**
 * Строка работ внизу первого экрана главной: плакат остаётся плакатом,
 * но посетитель сразу видит, что студия уже сделала. На десктопе — ряд
 * под тонкой линией, на телефоне — короткая лента, которую листают пальцем.
 *
 * Превью в той же пропорции 16:10, что и файл, — экран виден целиком.
 */
export function SelectedWork({ projects }: Props) {
  return (
    // Нижний отступ — под фиксированную строку подвала, иначе подписи
    // работ ложатся на «Est. 2026». Где подвал скрыт (телефон боком), хватает малого.
    <section
      aria-labelledby="selected-work"
      className="container-x pb-16 [@media(max-height:500px)]:pb-6"
    >
      <Reveal
        className="border-t border-line pt-5 md:grid md:grid-cols-[9rem_repeat(4,minmax(0,1fr))] md:items-center md:gap-6"
        immediate
        delay={0.32}
      >
        <h2 id="selected-work" className="mono-label opacity-70">
          Selected work
        </h2>

        <ul className="no-scrollbar -mx-[var(--gutter)] mt-4 flex gap-3 overflow-x-auto px-[var(--gutter)] md:contents">
          {projects.map((project) => (
            <li key={project.slug} className="w-[44vw] shrink-0 md:w-auto">
              <TransitionLink
                href={`/projects/${project.slug}`}
                className="group flex flex-col gap-2 md:flex-row md:items-center md:gap-4"
              >
                <span className="relative block aspect-[16/10] w-full shrink-0 overflow-hidden md:w-20">
                  <Image
                    src={project.preview}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 44vw, 80px"
                    className="object-cover transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-[1.06]"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[0.9375rem] font-extrabold tracking-[-0.01em]">
                    {project.title}
                  </span>
                  <span className="mono-label mt-0.5 block truncate text-[0.625rem] opacity-60">
                    {project.tags[0]} · {project.year}
                  </span>
                </span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
