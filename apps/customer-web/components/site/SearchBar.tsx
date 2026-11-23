"use client";

import type { FormEvent } from "react";

export type SearchBarProps = {
  id?: string;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  id = "marketplace-search",
  placeholder = "Search demo products",
  className = ""
}: SearchBarProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`order-3 w-full lg:order-none lg:mx-auto lg:max-w-xl ${className}`}
    >
      <label htmlFor={id} className="sr-only">
        Search the demonstration marketplace
      </label>
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-ink-500"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" strokeLinecap="round" />
        </svg>
        <input
          id={id}
          type="search"
          placeholder={placeholder}
          className="h-11 w-full rounded-2xl border border-ink-950/10 bg-surface-50 pl-11 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-4 focus:ring-brand-100"
        />
      </div>
    </form>
  );
}
