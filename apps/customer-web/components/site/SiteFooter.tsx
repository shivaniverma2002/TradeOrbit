import Container from "@/components/common/Container";

const footerGroups = [
  {
    title: "TradeOrbit",
    items: ["About", "Help", "Contact"]
  },
  {
    title: "Policies",
    items: ["Privacy", "Terms"]
  }
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-ink-950/5 bg-white">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-lg font-semibold tracking-tight text-ink-950">
            Trade<span className="text-brand-600">Orbit</span>
          </p>
          <p className="mt-3 max-w-sm text-sm leading-6 text-ink-500">
            A demonstration marketplace interface showing how customers could discover products and
            sellers. No live inventory, prices, cart, or checkout are connected.
          </p>
        </div>
        {footerGroups.map((group) => (
          <div key={group.title}>
            <h2 className="text-sm font-semibold text-ink-950">{group.title}</h2>
            <ul className="mt-4 space-y-3 text-sm text-ink-500">
              {group.items.map((item) => (
                <li key={item}>
                  <span
                    aria-disabled="true"
                    title="Page not available yet"
                    className="cursor-not-allowed underline decoration-dotted"
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <div className="border-t border-ink-950/5">
        <Container className="py-6 text-center text-xs text-ink-500">
          Demonstration UI only. Legal and support pages are planned and not yet implemented.
        </Container>
      </div>
    </footer>
  );
}
