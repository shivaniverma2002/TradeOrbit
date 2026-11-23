import type { ReactNode } from "react";

type AuthFormFeedbackProps = {
  tone: "error" | "info";
  title: string;
  message: string;
  children?: ReactNode;
};

export default function AuthFormFeedback({
  tone,
  title,
  message,
  children
}: AuthFormFeedbackProps) {
  const isError = tone === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      aria-live={isError ? "assertive" : "polite"}
      className={`rounded-2xl border px-4 py-3 text-sm ${
        isError
          ? "border-rose-200 bg-rose-50 text-rose-900"
          : "border-brand-200 bg-brand-50 text-brand-900"
      }`}
    >
      <p className="font-semibold">{title}</p>
      <p className="mt-1 leading-6">{message}</p>
      {children ? <div className="mt-2 text-sm font-semibold">{children}</div> : null}
    </div>
  );
}
