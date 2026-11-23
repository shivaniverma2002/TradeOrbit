import Link from "next/link";
import {
  siteAuthLinks,
  siteNavigation,
  type SiteNavigationItem
} from "@/lib/site-navigation";

export type MainNavigationProps = {
  items?: SiteNavigationItem[];
};

export default function MainNavigation({ items = siteNavigation }: MainNavigationProps) {
  return (
    <nav
      aria-label="Marketplace"
      className="order-2 hidden flex-1 items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-ink-700 lg:flex lg:flex-none"
    >
      {items.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="outline-none transition hover:text-brand-600 focus-visible:rounded focus-visible:ring-4 focus-visible:ring-brand-100"
        >
          {item.label}
        </Link>
      ))}
      <div className="ml-3 flex items-center gap-2">
        {siteAuthLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className={
              link.label === "Create Account"
                ? "rounded-2xl bg-brand-600 px-4 py-2 font-semibold text-white shadow-control transition hover:bg-brand-700 focus-visible:ring-4 focus-visible:ring-brand-100"
                : "rounded-2xl px-4 py-2 font-semibold transition hover:bg-surface-100 focus-visible:ring-4 focus-visible:ring-brand-100"
            }
          >
            {link.label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
