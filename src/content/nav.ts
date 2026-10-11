export type NavItem = {
  label: string;
  href: string;
  /** Порядковый номер в меню — выводится мелким моноширинным индексом. */
  index: string;
};

export const nav: NavItem[] = [
  { label: "About", href: "/about", index: "01" },
  { label: "Services", href: "/services", index: "02" },
  { label: "Work", href: "/projects", index: "03" },
  { label: "Contact", href: "/contacts", index: "04" },
];

export const homeHref = "/";
