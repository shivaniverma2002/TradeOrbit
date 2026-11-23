import type { ReactNode } from "react";

export type SectionHeadingProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  badge?: string;
  children?: ReactNode;
};

export default function SectionHeading({
  title,
  eyebrow,
  description,
  badge,
  children
}: SectionHeadingProps) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink-950 sm:text-4xl">
          {title}
        </h2>
        {description ? (
          <p className="mt-3 max-w-2xl text-sm leading-6 text-ink-500 sm:text-base">
            {description}
          </p>
        ) : null}
        {children}
      </div>
      {badge ? (
        <span className="rounded-full bg-surface-100 px-3 py-1 text-xs font-semibold text-ink-700">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
