import Container from "@/components/common/Container";
import SectionHeading from "@/components/common/SectionHeading";
import { demoVendor } from "@/lib/demo-data";

export default function VendorSpotlight() {
  return (
    <section className="bg-surface-100 py-16 lg:py-20">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-ink-950/5 bg-white shadow-panel">
          <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:p-12">
            <div className="relative min-h-64 overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-brand-600 via-brand-500 to-indigo-500">
              <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
                <div className="size-36 rounded-full border border-white/25" />
                <div className="absolute size-24 rounded-full bg-white/15 backdrop-blur" />
                <span className="absolute text-4xl font-semibold text-white">C&amp;C</span>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Featured vendor"
                title={demoVendor.name}
                description={demoVendor.headline}
                badge="Demo data"
              >
                <p className="mt-2 text-sm leading-6 text-ink-500">{demoVendor.note}</p>
              </SectionHeading>
              <button
                type="button"
                disabled
                title="Vendor pages are not implemented in this demonstration"
                className="mt-6 rounded-2xl border border-ink-950/10 px-5 py-3 text-sm font-semibold text-ink-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                View demo storefront
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
