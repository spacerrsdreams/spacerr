import Header from "@/components/header/header";
import FeaturesSection from "@/components/home/features/features-section";
import Hero from "@/components/home/hero";
import GradientGrid from "@/components/ui/gradient-grid";

export default function page() {
  return (
    <div className="h-full">
      <Header />
      <GradientGrid itemCount={4} showGradient={true} />
      <Hero />
      <FeaturesSection />
      <div className="h-96" />
    </div>
  );
}
