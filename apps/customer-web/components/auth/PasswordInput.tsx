import { forwardRef, useState } from "react";
import LoginInput from "./LoginInput";

type PasswordInputProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  name?: string;
  autoComplete?: string;
  placeholder?: string;
};

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  {
    id,
    label,
    value,
    onChange,
    error,
    disabled = false,
    name = "password",
    autoComplete = "current-password",
    placeholder = "Enter your password"
  },
  ref
) {
  const [visible, setVisible] = useState(false);

  return (
    <LoginInput
      ref={ref}
      id={id}
      label={label}
      name={name}
      type={visible ? "text" : "password"}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      error={error}
      disabled={disabled}
      autoComplete={autoComplete}
      required
      placeholder={placeholder}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((current) => !current)}
          disabled={disabled}
          aria-label={visible ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
          aria-pressed={visible}
          aria-controls={id}
          className="grid size-10 place-items-center rounded-xl text-ink-500 outline-none transition hover:bg-surface-100 hover:text-ink-700 focus-visible:ring-4 focus-visible:ring-brand-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {visible ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">
              <path d="M3 3l18 18" strokeLinecap="round" />
              <path d="M10.6 10.7a2 2 0 002.8 2.8" strokeLinecap="round" />
              <path d="M9.9 5.2A9.8 9.8 0 0112 5c5 0 9 4.5 9 7 0 1-.6 2.3-1.7 3.5M6.3 6.4C4 8 2.6 10.2 3 12c0 2.5 4 7 9 7 1.2 0 2.3-.2 3.3-.6" strokeLinecap="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="size-5" aria-hidden="true">
              <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" strokeLinejoin="round" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      }
    />
  );
});

export default PasswordInput;
