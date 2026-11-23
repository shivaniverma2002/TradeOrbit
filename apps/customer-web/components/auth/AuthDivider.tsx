export default function AuthDivider() {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-surface-200" />
      <span className="text-xs font-semibold tracking-[0.2em] text-ink-500">OR</span>
      <span className="h-px flex-1 bg-surface-200" />
    </div>
  );
}
