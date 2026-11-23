import type { Metadata } from "next";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create an Account | TradeOrbit",
  description: "Register for a TradeOrbit customer account."
};

export default function RegisterPage() {
  return (
    <main className="min-h-dvh bg-surface-50">
      <div className="grid min-h-dvh lg:grid-cols-[minmax(0,1.04fr)_minmax(0,0.96fr)]">
        <AuthBrandPanel
          title="Start your TradeOrbit journey with one secure account."
          description="Create a customer profile, then sign in to continue through the marketplace experience."
        />
        <section className="flex min-h-dvh items-center justify-center bg-gradient-to-b from-white via-surface-50 to-brand-50/60 px-5 py-10 sm:px-8 lg:px-12 lg:py-14">
          <div className="w-full max-w-[28rem] rounded-[2rem] border border-ink-950/5 bg-white/85 p-6 shadow-panel backdrop-blur-sm sm:p-8">
            <RegisterForm />
          </div>
        </section>
      </div>
    </main>
  );
}
