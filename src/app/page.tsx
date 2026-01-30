import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/features/landing/components/hero-section";
import { ProblemSolutionCarousel } from "@/features/landing/components/problem-solution-carousel";
import { HowItWorksSection } from "@/features/landing/components/how-it-works-section";
import { FeaturesSection } from "@/features/landing/components/features-section";
import { PricingSection } from "@/features/landing/components/pricing-section";
import { CTASection } from "@/features/landing/components/cta-section";

import { VideoSection } from "@/features/landing/components/video-section";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <VideoSection />
        <ProblemSolutionCarousel />
        <HowItWorksSection />
        <FeaturesSection />
        <PricingSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
