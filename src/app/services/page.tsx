import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { TransitionLink } from "@/components/motion/TransitionLink";
import { JsonLd } from "@/components/seo/JsonLd";
import { Poster } from "@/components/ui/Poster";
import { services } from "@/content/services";
import { pageMetadata } from "@/lib/metadata";
import { servicesSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Web platforms, AI video, Telegram bots and Mini Apps, AI assistants and visibility in AI search. How Noreliq works.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={servicesSchema(services)} />

      <Poster label="02 / Services" caps="What we do" note="formats and packages" />

      {/* Список направлений строками: индекс, суть и пакеты в своих
          колонках — так их сравнивают взглядом сверху вниз, а не читают
          центрированную колонку. На телефоне колонки встают друг под друга.
          Цен на международной версии нет: стоимость обсуждается в переписке. */}
      <section className="container-x -mt-[22svh] pb-[var(--section-y)]">
        <div className="mx-auto max-w-6xl">
          {services.map((service, index) => (
            <Reveal
              key={service.id}
              as="article"
              className="grid gap-x-10 gap-y-4 border-t border-line py-8 md:grid-cols-[9rem_minmax(0,1fr)_minmax(0,18rem)] md:py-10"
              y={20}
              delay={index === 0 ? 0.3 : 0}
            >
              <p className="mono-label opacity-70 md:pt-2">
                {service.index} / {service.code}
              </p>

              <div>
                <h2 className="display-caps text-h2">{service.title}</h2>
                <p className="mt-3 max-w-[46ch] leading-relaxed opacity-80">{service.summary}</p>
              </div>

              <ul className="flex flex-col gap-1.5 md:pt-1.5">
                {service.tiers.map((tier) => (
                  <li key={tier} className="font-code opacity-85">
                    {tier}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}

          <Reveal className="mt-14 flex flex-col items-center gap-6 text-center" y={20}>
            <span aria-hidden="true" className="hairline" />
            <p className="poster-lead opacity-80">Pricing on request: tell us about the task and we&apos;ll send an estimate.</p>
            <TransitionLink href="/contacts" className="mono-label link-mask tap-target">
              Discuss your project
            </TransitionLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
