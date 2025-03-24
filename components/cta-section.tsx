import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">Ready to Get Expert Medical Advice?</h2>
          <p className="mt-4 text-xl text-white/80">Take control of your health journey with confidence</p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-base px-8 py-6" asChild>
              <Link href="/auth/patient/signup">Get a Second Opinion</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10 text-base px-8 py-6"
              asChild
            >
              <Link href="/auth/doctor/signup">Join Our Expert Network</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

