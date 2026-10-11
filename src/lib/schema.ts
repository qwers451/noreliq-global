import { nav } from "@/content/nav";
import type { Project } from "@/content/projects";
import type { ServiceCategory } from "@/content/services";
import { site } from "@/content/site";
import { fileUrl, pageUrl } from "@/lib/url";

/**
 * Разметка schema.org. Только данные, которые уже есть на сайте: никаких
 * новых формулировок — поисковики сверяют разметку с видимым текстом.
 */

const ORG_ID = `${pageUrl("/")}#organization`;
const WEBSITE_ID = `${pageUrl("/")}#website`;

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        // Organization, а не LocalBusiness: адреса и региона у
        // международной версии нет, студия работает удалённо.
        "@type": "Organization",
        "@id": ORG_ID,
        name: site.name,
        url: pageUrl("/"),
        logo: fileUrl("/icon.png"),
        image: fileUrl("/og.png"),
        description: site.description,
        email: site.email,
        foundingDate: String(site.foundedYear),
        sameAs: site.socials.map((social) => social.href),
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: pageUrl("/"),
        name: site.name,
        inLanguage: "en",
        publisher: { "@id": ORG_ID },
      },
    ],
  };
}

/** Услуги без цен: на международной версии стоимость обсуждается отдельно. */
export function servicesSchema(services: ServiceCategory[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.summary,
        provider: { "@id": ORG_ID },
      },
    })),
  };
}

const projectsLabel = nav.find((item) => item.href === "/projects")?.label ?? "Work";

export function projectSchema(project: Project) {
  const url = pageUrl(`/projects/${project.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `${url}#work`,
        name: project.title,
        headline: project.subtitle ?? project.title,
        description: project.summary,
        url,
        image: fileUrl(project.cover),
        dateCreated: project.year,
        keywords: project.tags.join(", "),
        creator: { "@id": ORG_ID },
        ...(project.url ? { sameAs: project.url } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: pageUrl("/") },
          { "@type": "ListItem", position: 2, name: projectsLabel, item: pageUrl("/projects") },
          { "@type": "ListItem", position: 3, name: project.title, item: url },
        ],
      },
    ],
  };
}
