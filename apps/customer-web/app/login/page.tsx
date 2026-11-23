import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import LoginForm from "@/components/auth/LoginForm";
import { getSafeInternalDestination } from "@/lib/safe-redirect";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const requestedDestination = Array.isArray(params.next) ? params.next[0] : params.next;

  return (
    <main className="min-h-dvh bg-surface-50">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
        <AuthBrandPanel />
        <section className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-white via-surface-50 to-brand-50/60 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="w-full max-w-[28rem] rounded-[2rem] border border-ink-950/5 bg-white/85 p-6 shadow-panel backdrop-blur-sm sm:p-8">
            <LoginForm returnTo={getSafeInternalDestination(requestedDestination)} />
          </div>
        </section>
      </div>
    </main>
  );
}
