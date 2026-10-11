import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { Poster } from "@/components/ui/Poster";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: `Get in touch with ${site.name}: ${site.email} or Telegram.`,
  path: "/contacts",
});

export default function ContactsPage() {
  return (
    <>
      <Poster
        caps="Tell us what you want to launch"
        note="we'll reply with a format and a price range"
        label="04 / Contact"
      />

      {/* Контакты выведены отдельным блоком внутри того же экрана:
          у референса под заголовком идёт такой же центрированный столбик. */}
      <section className="container-x -mt-[26svh] pb-24 text-center">
        <Reveal className="flex flex-col items-center gap-1" immediate delay={0.3}>
          <a href={`mailto:${site.email}`} className="link-mask tap-target font-code">
            {site.email}
          </a>
        </Reveal>

        <Reveal className="mt-8 flex flex-wrap items-center justify-center gap-5" delay={0.36} immediate>
          {site.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="mono-label link-mask tap-target"
            >
              {social.label}
            </a>
          ))}
        </Reveal>
      </section>
    </>
  );
}
