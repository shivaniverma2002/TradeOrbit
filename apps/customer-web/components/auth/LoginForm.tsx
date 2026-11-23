"use client";

import { type FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { type LoginFailure, loginCustomer } from "@/lib/auth-client";
import { validateLoginForm, type LoginFieldErrors } from "@/lib/auth-validation";
import AuthDivider from "./AuthDivider";
import AuthFormFeedback from "./AuthFormFeedback";
import BrandMark from "./BrandMark";
import GoogleSignInButton from "./GoogleSignInButton";
import LoginInput from "./LoginInput";
import PasswordInput from "./PasswordInput";

const isDevelopment = process.env.NODE_ENV === "development";

type LoginFormProps = {
  returnTo: string;
};

type Feedback = {
  tone: "error" | "info";
  title: string;
  message: string;
  showVerifyLink?: boolean;
};

function feedbackForFailure(failure: LoginFailure): Feedback {
  switch (failure.kind) {
    case "unconfigured":
      return {
        tone: "info",
        title: isDevelopment ? "Sign-in is not connected yet" : "Sign-in temporarily unavailable",
        message: isDevelopment
          ? "The login service is not configured. Set NEXT_PUBLIC_API_URL to the TradeOrbit API base URL before using this form."
          : "Please try again later."
      };
    case "network":
      return {
        tone: "error",
        title: "Connection unavailable",
        message: "We could not reach the sign-in service. Check your connection and try again."
      };
    case "rate_limited":
      return {
        tone: "error",
        title: "Too many attempts",
        message: "Please wait a moment before trying to sign in again."
      };
    case "email_unverified":
      return {
        tone: "info",
        title: "Email verification required",
        message: "Verify your email address before signing in to your TradeOrbit account.",
        showVerifyLink: true
      };
    case "mfa_required":
      return {
        tone: "info",
        title: "Additional verification required",
        message: "This account requires another verification step. Sign-in is not complete yet."
      };
    case "service":
      return {
        tone: "error",
        title: "Sign-in temporarily unavailable",
        message: "The sign-in service is temporarily unavailable. Please try again shortly."
      };
    case "invalid_credentials":
    case "generic":
    default:
      return {
        tone: "error",
        title: "We could not sign you in",
        message: "Check your details and try again."
      };
  }
}

export default function LoginForm({ returnTo }: LoginFormProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<LoginFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const identifierRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);
  const isSubmitting = status === "submitting";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    setFeedback(null);

    const errors = validateLoginForm(identifier, password);
    setFieldErrors(errors);

    if (errors.identifier) {
      identifierRef.current?.focus();
      return;
    }

    if (errors.password) {
      passwordRef.current?.focus();
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");

    try {
      const result = await loginCustomer({ identifier, password });

      if (result.ok) {
        window.location.assign(returnTo);
        return;
      }

      setFeedback(feedbackForFailure(result.failure));
    } catch {
      setFeedback({
        tone: "error",
        title: "We could not sign you in",
        message: "Check your details and try again."
      });
    } finally {
      isSubmittingRef.current = false;
      setStatus("idle");
    }
  }

  function handleGoogleNotice() {
    setFeedback({
      tone: "info",
      title: "Google sign-in is not connected yet",
      message:
        "The backend integration will be added later. Continue with your TradeOrbit email or phone number for now."
    });
  }

  return (
    <div className="w-full">
      <div className="mb-8 lg:hidden">
        <BrandMark compact />
      </div>

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
          Customer sign in
        </p>
        <h2 id="login-heading" className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
          Welcome back
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-500">
          Sign in to continue to your TradeOrbit account.
        </p>
      </header>

      <form noValidate onSubmit={handleSubmit} aria-labelledby="login-heading" className="space-y-5">
        {feedback ? (
          <AuthFormFeedback tone={feedback.tone} title={feedback.title} message={feedback.message}>
            {feedback.showVerifyLink ? <Link href="/verify-email">Go to email verification</Link> : null}
          </AuthFormFeedback>
        ) : null}

        <LoginInput
          ref={identifierRef}
          id="identifier"
          label="Email or phone number"
          name="identifier"
          type="text"
          value={identifier}
          onChange={(event) => {
            setIdentifier(event.target.value);
            setFieldErrors((current) => ({ ...current, identifier: undefined }));
            setFeedback(null);
          }}
          error={fieldErrors.identifier}
          hint="Use the email address or phone number linked to your account."
          placeholder="name@example.com or +10000000000"
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          disabled={isSubmitting}
          required
        />

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <Link
              href="/forgot-password"
              className="ml-auto text-sm font-semibold text-brand-600 outline-none transition hover:text-brand-700 focus-visible:rounded focus-visible:ring-4 focus-visible:ring-brand-100"
            >
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            ref={passwordRef}
            id="password"
            label="Password"
            value={password}
            onChange={(value) => {
              setPassword(value);
              setFieldErrors((current) => ({ ...current, password: undefined }));
              setFeedback(null);
            }}
            error={fieldErrors.password}
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-500 text-sm font-semibold text-white shadow-panel outline-none transition duration-200 hover:-translate-y-0.5 hover:shadow-control focus-visible:ring-4 focus-visible:ring-brand-100 motion-reduce:hover:translate-y-0 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-70"
        >
          {isSubmitting ? (
            <span
              className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
              aria-hidden="true"
            />
          ) : null}
          {isSubmitting ? "Signing in..." : "Sign in to TradeOrbit"}
        </button>
      </form>

      <div className="my-7">
        <AuthDivider />
      </div>

      <GoogleSignInButton onClick={handleGoogleNotice} />

      <p className="mt-8 text-center text-sm text-ink-500">
        New to TradeOrbit?{" "}
        <Link
          href="/register"
          className="font-semibold text-brand-600 outline-none transition hover:text-brand-700 focus-visible:rounded focus-visible:ring-4 focus-visible:ring-brand-100"
        >
          Create an account
        </Link>
      </p>

      <p className="mt-6 text-center text-xs leading-5 text-ink-500">
        By continuing, you acknowledge our{" "}
        <span aria-disabled="true" className="cursor-not-allowed underline decoration-dotted">
          Terms of Service
        </span>{" "}
        and{" "}
        <span aria-disabled="true" className="cursor-not-allowed underline decoration-dotted">
          Privacy Policy
        </span>
        . These pages are not available yet.
      </p>
    </div>
  );
}
