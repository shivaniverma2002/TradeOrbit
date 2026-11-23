export type LoadingStateProps = {
  label?: string;
  className?: string;
};

export default function LoadingState({ label = "Loading", className = "" }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex items-center justify-center gap-3 rounded-2xl border border-ink-950/5 bg-white px-4 py-6 text-sm text-ink-500 ${className}`}
    >
      <span
        className="size-4 animate-spin rounded-full border-2 border-brand-100 border-t-brand-600"
        aria-hidden="true"
      />
      {label}
    </div>
  );
}
