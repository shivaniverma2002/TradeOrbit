type GoogleSignInButtonProps = {
  onClick: () => void;
  label?: string;
  note?: string;
  noteId?: string;
};

export default function GoogleSignInButton({
  onClick,
  label = "Continue with Google",
  note = "Integration entry point only. Google sign-in is not connected yet.",
  noteId = "google-signin-note"
}: GoogleSignInButtonProps) {
  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={onClick}
        aria-describedby={noteId}
        className="flex h-12 w-full items-center justify-center gap-3 rounded-2xl border border-ink-950/10 bg-white text-sm font-semibold text-ink-900 shadow-sm outline-none transition duration-200 hover:border-ink-950/20 hover:bg-surface-50 focus-visible:ring-4 focus-visible:ring-brand-100"
      >
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
          <path fill="#4285F4" d="M21.6 12.23c0-.71-.06-1.4-.18-2.06H12v3.9h5.38a4.59 4.59 0 01-1.99 3.01v2.5h3.22c1.88-1.73 2.99-4.29 2.99-7.35z" />
          <path fill="#34A853" d="M12 22c2.7 0 4.96-.9 6.61-2.42l-3.22-2.5c-.9.6-2.04.96-3.39.96-2.6 0-4.8-1.76-5.59-4.12H3.1v2.58A10 10 0 0012 22z" />
          <path fill="#FBBC05" d="M6.41 13.92A6.01 6.01 0 016.1 12c0-.67.11-1.32.31-1.92V7.5H3.1A10 10 0 002 12c0 1.62.39 3.15 1.1 4.5l3.31-2.58z" />
          <path fill="#EA4335" d="M12 5.98c1.47 0 2.79.51 3.83 1.5l2.85-2.85A9.63 9.63 0 0012 2a10 10 0 00-8.9 5.5l3.31 2.58C7.2 7.74 9.4 5.98 12 5.98z" />
        </svg>
        {label}
      </button>
      <p id={noteId} className="text-center text-xs leading-5 text-ink-500">
        {note}
      </p>
    </div>
  );
}
