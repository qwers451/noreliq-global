import type { Metadata } from "next";

import { Poster } from "@/components/ui/Poster";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Poster
      label="Error 404"
      caps="This page doesn't exist"
      note="check the address"
      lead="The link may be out of date. Head back home or take a look at our work."
      cta={{ href: "/", label: "Back to home" }}
    />
  );
}
