import Header from "@/components/header/header";
import ContactUs from "@/components/home/contact-us";
import FeaturesSection from "@/components/home/features/features-section";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import Pricing from "@/components/home/pricing";
import GradientGrid from "@/components/ui/gradient-grid";

export default function page() {
  return (
    <div className="h-full">
      <Header />
      <GradientGrid itemCount={4} showGradient={true} />
      <Hero />
      <FeaturesSection />
      <Pricing />
      <ContactUs />
      <Footer />
    </div>
  );
}
