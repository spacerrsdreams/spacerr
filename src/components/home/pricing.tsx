import { PRICING_PLANS } from "@/constants";

import PricingCard from "@/components/pricing/pricing-card";

export default function Pricing() {
  return (
    <section id="pricing" className="relative isolate w-full bg-white px-4 py-0 sm:py-20 lg:px-4">
      <h2 className="pt-4 text-center text-lg font-bold text-neutral-800 md:text-4xl">
        Simple pricing for advanced people
      </h2>
      <p className="mx-auto mt-4 max-w-md text-center text-base text-neutral-600">
        Our pricing is designed for advanced people who need more features and more flexibility.
      </p>
      <div className="mx-auto mt-20 grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PRICING_PLANS.map((plan) => (
          <PricingCard key={plan.title} {...plan} isYearly={false} />
        ))}
      </div>
    </section>
  );
}
