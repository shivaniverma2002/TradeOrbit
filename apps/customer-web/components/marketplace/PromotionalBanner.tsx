import Container from "@/components/common/Container";

export default function PromotionalBanner() {
  return (
    <section id="become-a-seller" className="py-16 lg:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 px-8 py-12 text-white shadow-panel sm:px-12">
          <div className="absolute -right-24 -top-24 size-80 rounded-full border border-white/15" aria-hidden="true" />
          <div className="absolute -bottom-32 right-32 size-72 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
              Seller onboarding
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              Your storefront could be the next discovery.
            </h2>
            <p className="mt-4 leading-7 text-white/75">
              Vendor onboarding is not implemented in this demonstration. This section shows where a
              seller acquisition message would appear.
            </p>
            <button
              type="button"
              disabled
              title="Seller onboarding is not implemented in this demonstration"
              className="mt-7 rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-brand-700 disabled:cursor-not-allowed disabled:opacity-80"
            >
              Become a Seller
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
