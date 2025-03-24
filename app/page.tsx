import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorks } from "@/components/how-it-works"
import { Testimonials } from "@/components/testimonials"
import { CTASection } from "@/components/cta-section"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function Home() {
  return (
    <>
      <ScrollToTopOnMount />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CTASection />
    </>
  )
}

