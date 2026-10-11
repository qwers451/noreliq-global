import type { Metadata } from "next";

import { Poster } from "@/components/ui/Poster";
import { about } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description: about.lead,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Poster
      label="01 / About"
      caps="A studio for websites"
      note="AI content and automation"
      lead={about.lead}
      cta={{ href: "/contacts", label: "Start a project" }}
    />
  );
}
