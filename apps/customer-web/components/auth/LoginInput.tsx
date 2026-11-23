import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";

type LoginInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  trailing?: ReactNode;
};

const LoginInput = forwardRef<HTMLInputElement, LoginInputProps>(function LoginInput(
  { id, label, error, hint, trailing, className, ...inputProps },
  ref
) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-semibold text-ink-700">
        {label}
      </label>
      <div className="relative">
        <input
          {...inputProps}
          ref={ref}
          id={id}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-12 w-full rounded-2xl border bg-white px-4 text-[15px] text-ink-950 shadow-sm outline-none transition duration-200 placeholder:text-ink-500/70 focus:border-brand-500 focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-surface-100 ${
            error ? "border-rose-300 focus:border-rose-500 focus:ring-rose-100" : "border-ink-950/10"
          } ${trailing ? "pr-14" : ""} ${className ?? ""}`}
        />
        {trailing ? (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">{trailing}</div>
        ) : null}
      </div>
      {hint ? (
        <p id={hintId} className="text-xs leading-5 text-ink-500">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="text-xs font-medium leading-5 text-rose-700">
          {error}
        </p>
      ) : null}
    </div>
  );
});

export default LoginInput;
