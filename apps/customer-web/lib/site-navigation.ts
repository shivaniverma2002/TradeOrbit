export type SiteNavigationItem = {
  label: string;
  href: string;
};

export const siteNavigation: SiteNavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "#categories" },
  { label: "Deals", href: "#deals" },
  { label: "Become a Seller", href: "#become-a-seller" }
];

export const siteAuthLinks: SiteNavigationItem[] = [
  { label: "Login", href: "/login" },
  { label: "Create Account", href: "/register" }
];
