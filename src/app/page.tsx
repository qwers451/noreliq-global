import type { Metadata } from "next";

import { Poster } from "@/components/ui/Poster";
import { SelectedWork } from "@/components/ui/SelectedWork";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  description: site.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    // Плакат и строка работ делят первый экран: плакат тянется, строка
    // прижата к низу. На низком экране страница просто растёт.
    <div className="flex min-h-[100svh] flex-col">
      <Poster
        size="hero"
        label={site.tagline}
        caps="Noreliq"
        note="websites, services and AI tools"
        lead={site.intro}
        actions={[
          { href: "/contacts", label: "Start a project →", primary: true },
          { href: "/projects", label: "See our work" },
        ]}
        className="min-h-0 flex-1 pb-10"
      />
      <SelectedWork projects={projects} />
    </div>
  );
}
