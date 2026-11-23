export type LoginFieldErrors = {
  identifier?: string;
  password?: string;
};

export type RegisterFormValues = {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
};

export type RegisterFieldErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

function validateEmailShape(value: string): string | undefined {
  const email = value.trim();

  if (!email) {
    return "Enter your email address.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }

  return undefined;
}

function validatePhoneShape(value: string): string | undefined {
  const phone = value.trim();

  if (!phone) {
    return "Enter your phone number.";
  }

  if (!/^\+?[\d\s().-]+$/.test(phone)) {
    return "Enter a valid phone number.";
  }

  const digits = phone.replace(/\D/g, "");

  if (digits.length < MIN_PHONE_DIGITS || digits.length > MAX_PHONE_DIGITS) {
    return `Enter a phone number with ${MIN_PHONE_DIGITS} to ${MAX_PHONE_DIGITS} digits.`;
  }

  return undefined;
}

function validateIdentifierShape(identifier: string): string | undefined {
  const value = identifier.trim();

  if (!value) {
    return "Enter your email address or phone number.";
  }

  if (value.includes("@")) {
    if (!EMAIL_PATTERN.test(value)) {
      return "Enter a valid email address.";
    }

    return undefined;
  }

  return validatePhoneShape(value);
}

export function validateLoginForm(identifier: string, password: string): LoginFieldErrors {
  const errors: LoginFieldErrors = {};
  const identifierError = validateIdentifierShape(identifier);

  if (identifierError) {
    errors.identifier = identifierError;
  }

  if (!password) {
    errors.password = "Enter your password.";
  }

  return errors;
}

export function validateRegisterForm(values: RegisterFormValues): RegisterFieldErrors {
  const errors: RegisterFieldErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Enter your full name.";
  }

  const emailError = validateEmailShape(values.email);

  if (emailError) {
    errors.email = emailError;
  }

  const phoneError = validatePhoneShape(values.phone);

  if (phoneError) {
    errors.phone = phoneError;
  }

  if (!values.password) {
    errors.password = "Enter a password.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirm your password.";
  } else if (values.password && values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (!values.termsAccepted) {
    errors.terms = "Accept the terms to continue.";
  }

  return errors;
}
