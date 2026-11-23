export type LoginCredentials = {
  identifier: string;
  password: string;
};

export type LoginFailureKind =
  | "unconfigured"
  | "network"
  | "invalid_credentials"
  | "email_unverified"
  | "mfa_required"
  | "rate_limited"
  | "service"
  | "generic";

export type LoginFailure = {
  kind: LoginFailureKind;
  code?: string;
};

export type LoginResult = { ok: true } | { ok: false; failure: LoginFailure };

export type RegisterCredentials = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  consentAccepted: boolean;
};

export type RegisterFailureKind = "unconfigured" | "network" | "service" | "generic";

export type RegisterFailure = {
  kind: RegisterFailureKind;
  code?: string;
};

export type RegisterResult = { ok: true } | { ok: false; failure: RegisterFailure };

type ApiErrorEnvelope = {
  error?: {
    code?: string;
  };
};

function buildApiEndpoint(apiUrl: string, path: string): string {
  const base = apiUrl.replace(/\/+$/, "");
  const suffix = path.replace(/^\/+/, "");

  if (base.endsWith("/api/v1")) {
    return `${base}/${suffix}`;
  }

  return `${base}/api/v1/${suffix}`;
}

function mapLoginFailure(status: number, code: string | undefined): LoginFailure {
  if (status === 429 || code === "AUTH_RATE_LIMITED") {
    return { kind: "rate_limited", code };
  }

  if (code === "AUTH_EMAIL_UNVERIFIED_RESTRICTED") {
    return { kind: "email_unverified", code };
  }

  if (code === "AUTH_MFA_REQUIRED" || code === "AUTH_MFA_ENROLLMENT_REQUIRED") {
    return { kind: "mfa_required", code };
  }

  if (
    status === 401 ||
    status === 403 ||
    code === "AUTH_INVALID_CREDENTIALS" ||
    code === "AUTH_ACCOUNT_DISABLED"
  ) {
    return { kind: "invalid_credentials", code };
  }

  if (status >= 500 || code === "INTERNAL_ERROR" || code === "DEPENDENCY_UNAVAILABLE") {
    return { kind: "service", code };
  }

  return { kind: "generic", code };
}

function mapRegisterFailure(status: number, code: string | undefined): RegisterFailure {
  if (status >= 500 || code === "INTERNAL_ERROR" || code === "DEPENDENCY_UNAVAILABLE") {
    return { kind: "service", code };
  }

  return { kind: "generic", code };
}

async function readErrorCode(response: Response): Promise<string | undefined> {
  try {
    const payload = (await response.json()) as ApiErrorEnvelope;
    return payload.error?.code;
  } catch {
    return undefined;
  }
}

export async function loginCustomer(credentials: LoginCredentials): Promise<LoginResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    return { ok: false, failure: { kind: "unconfigured" } };
  }

  let response: Response;

  // Public login has no session-bound CSRF token.
  // After login, state-changing requests must fetch /api/v1/auth/csrf and send X-CSRF-Token from memory.
  try {
    response = await fetch(buildApiEndpoint(apiUrl, "auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        identifier: credentials.identifier.trim(),
        password: credentials.password
      })
    });
  } catch {
    return { ok: false, failure: { kind: "network" } };
  }

  if (response.ok) {
    return { ok: true };
  }

  const code = await readErrorCode(response);

  return { ok: false, failure: mapLoginFailure(response.status, code) };
}

export async function registerCustomer(credentials: RegisterCredentials): Promise<RegisterResult> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!apiUrl) {
    return { ok: false, failure: { kind: "unconfigured" } };
  }

  let response: Response;

  try {
    response = await fetch(buildApiEndpoint(apiUrl, "auth/register"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      credentials: "include",
      body: JSON.stringify({
        firstName: credentials.firstName.trim(),
        lastName: credentials.lastName.trim(),
        email: credentials.email.trim(),
        phone: credentials.phone.trim(),
        password: credentials.password,
        confirmPassword: credentials.confirmPassword,
        consentAccepted: credentials.consentAccepted
      })
    });
  } catch {
    return { ok: false, failure: { kind: "network" } };
  }

  if (response.ok) {
    return { ok: true };
  }

  const code = await readErrorCode(response);

  return { ok: false, failure: mapRegisterFailure(response.status, code) };
}
