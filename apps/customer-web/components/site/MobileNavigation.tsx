"use client";

import { useState } from "react";
import Link from "next/link";
import {
  siteAuthLinks,
  siteNavigation,
  type SiteNavigationItem
} from "@/lib/site-navigation";

export type MobileNavigationProps = {
  items?: SiteNavigationItem[];
};

export default function MobileNavigation({ items = siteNavigation }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <nav aria-label="Mobile marketplace" className="relative order-2 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="mobile-marketplace-menu"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        className="flex h-11 items-center gap-2 rounded-2xl border border-ink-950/10 bg-white px-4 text-sm font-semibold text-ink-700 outline-none focus-visible:ring-4 focus-visible:ring-brand-100"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-5" aria-hidden="true">
          <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
        </svg>
        Menu
      </button>

      {open ? (
        <div
          id="mobile-marketplace-menu"
          className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-ink-950/5 bg-white p-3 shadow-panel"
        >
          <ul className="space-y-1">
            {items.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  className="block rounded-xl px-3 py-2 text-sm font-medium text-ink-700 transition hover:bg-surface-100 focus-visible:ring-4 focus-visible:ring-brand-100"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-2 grid grid-cols-2 gap-2 border-t border-ink-950/5 pt-3">
            {siteAuthLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={
                  link.label === "Create Account"
                    ? "rounded-xl bg-brand-600 px-3 py-2 text-center text-sm font-semibold text-white focus-visible:ring-4 focus-visible:ring-brand-100"
                    : "rounded-xl bg-surface-100 px-3 py-2 text-center text-sm font-semibold text-ink-700 focus-visible:ring-4 focus-visible:ring-brand-100"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </nav>
  );
}
