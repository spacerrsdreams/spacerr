import ContactUs from "@/components/home/contact-us";
import FeaturesSection from "@/components/home/features/features-section";
import Footer from "@/components/home/footer";
import Hero from "@/components/home/hero";
import Pricing from "@/components/home/pricing";
import Header from "@/components/shared/header/header";
import GradientGrid from "@/components/ui/gradient-grid";

export default function page() {
  return (
    <>
      <Header />
      <GradientGrid itemCount={4} showGradient={true} />
      <Hero />
      <FeaturesSection />
      <Pricing />
      <ContactUs />
      <Footer />
    </>
  );
}
