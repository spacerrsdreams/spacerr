import { FEATURE_DETAILS } from "@/components/shared/pricing/pricing-data";

export default function FeaturesDetails() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURE_DETAILS.map((feature, index) => (
        <div
          key={index}
          className="rounded-lg bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg"
        >
          <div className="mb-4 flex gap-2">
            <feature.icon className="size-6 text-yellow-400" />
            <h3 className="text-lg font-semibold">{feature.name}</h3>
          </div>
          <p className="text-gray-600">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}
