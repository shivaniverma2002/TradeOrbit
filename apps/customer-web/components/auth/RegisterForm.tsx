"use client";

import { type FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { type RegisterFailure, registerCustomer } from "@/lib/auth-client";
import {
  validateRegisterForm,
  type RegisterFieldErrors,
  type RegisterFormValues
} from "@/lib/auth-validation";
import AuthDivider from "./AuthDivider";
import AuthFormFeedback from "./AuthFormFeedback";
import BrandMark from "./BrandMark";
import GoogleSignInButton from "./GoogleSignInButton";
import LoginInput from "./LoginInput";
import PasswordInput from "./PasswordInput";

const isDevelopment = process.env.NODE_ENV === "development";

type Feedback = {
  tone: "error" | "info";
  title: string;
  message: string;
};

function feedbackForFailure(failure: RegisterFailure): Feedback {
  switch (failure.kind) {
    case "unconfigured":
      return {
        tone: "info",
        title: isDevelopment ? "Registration is not connected yet" : "Registration temporarily unavailable",
        message: isDevelopment
          ? "The registration service is not configured. Set NEXT_PUBLIC_API_URL to the TradeOrbit API base URL before using this form."
          : "Please try again later."
      };
    case "network":
      return {
        tone: "error",
        title: "Connection unavailable",
        message: "We could not reach the registration service. Check your connection and try again."
      };
    case "service":
      return {
        tone: "error",
        title: "Registration temporarily unavailable",
        message: "The registration service is temporarily unavailable. Please try again shortly."
      };
    case "generic":
    default:
      return {
        tone: "error",
        title: "We could not submit your details",
        message: "Check your information and try again."
      };
  }
}

export default function RegisterForm() {
  const [values, setValues] = useState<RegisterFormValues>({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false
  });
  const [fieldErrors, setFieldErrors] = useState<RegisterFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting">("idle");
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  const fullNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const isSubmittingRef = useRef(false);
  const isSubmitting = status === "submitting";

  function updateField<K extends keyof RegisterFormValues>(field: K, value: RegisterFormValues[K]) {
    setValues((current) => ({ ...current, [field]: value }));
    setFieldErrors((current) => ({
      ...current,
      [field === "termsAccepted" ? "terms" : field]: undefined
    }));
    setFeedback(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmittingRef.current) {
      return;
    }

    setFeedback(null);

    const errors = validateRegisterForm(values);
    setFieldErrors(errors);

    if (errors.fullName) {
      fullNameRef.current?.focus();
      return;
    }

    if (errors.email) {
      emailRef.current?.focus();
      return;
    }

    if (errors.phone) {
      phoneRef.current?.focus();
      return;
    }

    if (errors.password) {
      passwordRef.current?.focus();
      return;
    }

    if (errors.confirmPassword) {
      confirmPasswordRef.current?.focus();
      return;
    }

    if (errors.terms) {
      termsRef.current?.focus();
      return;
    }

    isSubmittingRef.current = true;
    setStatus("submitting");

    try {
      const nameParts = values.fullName.trim().split(/\s+/);
      const result = await registerCustomer({
        firstName: nameParts[0] ?? "",
        lastName: nameParts.slice(1).join(" "),
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        consentAccepted: values.termsAccepted
      });

      if (result.ok) {
        setFeedback({
          tone: "info",
          title: "Details submitted",
          message:
            "The account remains pending email verification. This demonstration does not complete verification or sign you in."
        });
        return;
      }

      setFeedback(feedbackForFailure(result.failure));
    } catch {
      setFeedback({
        tone: "error",
        title: "We could not submit your details",
        message: "Check your information and try again."
      });
    } finally {
      isSubmittingRef.current = false;
      setStatus("idle");
    }
  }

  function handleGoogleNotice() {
    setFeedback({
      tone: "info",
      title: "Google registration is not connected yet",
      message:
        "The backend integration will be added later. Continue with your TradeOrbit email and phone number for now."
    });
  }

  return (
    <div className="w-full">
      <div className="mb-8 lg:hidden">
        <BrandMark compact />
      </div>

      <header className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-600">
          Customer registration
        </p>
        <h2 id="register-heading" className="mt-3 text-3xl font-semibold tracking-tight text-ink-950">
          Create your account
        </h2>
        <p className="mt-2 text-sm leading-6 text-ink-500">
          Register to start using your TradeOrbit customer account.
        </p>
      </header>

      <form noValidate onSubmit={handleSubmit} aria-labelledby="register-heading" className="space-y-5">
        {feedback ? (
          <AuthFormFeedback tone={feedback.tone} title={feedback.title} message={feedback.message} />
        ) : null}

        <LoginInput
          ref={fullNameRef}
          id="fullName"
          label="Full name"
          name="fullName"
          type="text"
          value={values.fullName}
          onChange={(event) => updateField("fullName", event.target.value)}
          error={fieldErrors.fullName}
          autoComplete="name"
          placeholder="Your full name"
          disabled={isSubmitting}
          required
        />

        <LoginInput
          ref={emailRef}
          id="register-email"
          label="Email address"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => updateField("email", event.target.value)}
          error={fieldErrors.email}
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          placeholder="name@example.com"
          disabled={isSubmitting}
          required
        />

        <LoginInput
          ref={phoneRef}
          id="register-phone"
          label="Phone number"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          error={fieldErrors.phone}
          autoComplete="tel"
          placeholder="+10000000000"
          disabled={isSubmitting}
          required
        />

        <PasswordInput
          ref={passwordRef}
          id="register-password"
          label="Password"
          name="password"
          value={values.password}
          onChange={(value) => updateField("password", value)}
          error={fieldErrors.password}
          autoComplete="new-password"
          placeholder="Choose a password"
          disabled={isSubmitting}
        />

        <PasswordInput
          ref={confirmPasswordRef}
          id="confirm-password"
          label="Confirm password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={(value) => updateField("confirmPassword", value)}
          error={fieldErrors.confirmPassword}
          autoComplete="new-password"
          placeholder="Re-enter your password"
          disabled={isSubmitting}
        />

        <div className="space-y-2">
          <label htmlFor="terms" className="flex items-start gap-3 text-sm leading-6 text-ink-700">
            <input
              ref={termsRef}
              id="terms"
              name="terms"
              type="checkbox"
              checked={values.termsAccepted}
              onChange={(event) => updateField("termsAccepted", event.target.checked)}
              aria-invalid={fieldErrors.terms ? true : undefined}
              aria-describedby={fieldErrors.terms ? "terms-error" : undefined}
              disabled={isSubmitting}
              className="mt-1 size-4 rounded border-ink-950/20 text-brand-600 focus:ring-brand-100"
            />
            <span>
              I acknowledge the{" "}
              <span aria-disabled="true" className="cursor-not-allowed underline decoration-dotted">
                Terms of Service
              </span>{" "}
              and{" "}
              <span aria-disabled="true" className="cursor-not-allowed underline decoration-dotted">
                Privacy Policy
              </span>
              . These pages are not available yet.
            </span>
          </label>
          {fieldErrors.terms ? (
            <p id="terms-error" className="text-xs font-medium leading-5 text-rose-700">
              {fieldErrors.terms}
            </p>
          ) : null}
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
          {isSubmitting ? "Submitting..." : "Create account"}
        </button>
      </form>

      <div className="my-7">
        <AuthDivider />
      </div>

      <GoogleSignInButton
        onClick={handleGoogleNotice}
        label="Sign up with Google"
        note="Integration entry point only. Google registration is not connected yet."
        noteId="google-register-note"
      />

      <p className="mt-8 text-center text-sm text-ink-500">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-semibold text-brand-600 outline-none transition hover:text-brand-700 focus-visible:rounded focus-visible:ring-4 focus-visible:ring-brand-100"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
