export function getSafeInternalDestination(value: unknown, fallback = "/"): string {
  if (typeof value !== "string") {
    return fallback;
  }

  const candidate = value.trim();

  if (!candidate.startsWith("/") || candidate.startsWith("//") || candidate.includes("\\")) {
    return fallback;
  }

  try {
    const parsed = new URL(candidate, "http://tradeorbit.local");

    if (parsed.origin !== "http://tradeorbit.local") {
      return fallback;
    }

    if (parsed.pathname.replace(/\/+$/, "") === "/login") {
      return fallback;
    }

    return `${parsed.pathname}${parsed.search}${parsed.hash}`;
  } catch {
    return fallback;
  }
}
