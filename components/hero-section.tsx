import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-32 sm:px-6 lg:px-8 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            <span className="block text-primary">Expert Second Opinions</span>
            <span className="block mt-2">from Leading Specialists</span>
          </h1>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">
            Fast, Secure, and Affordable access to top doctors worldwide. Gain clarity on your diagnosis or treatment
            plan with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base px-8 py-6" asChild>
              <Link href="/auth/patient/signup">Get a Second Opinion</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-base px-8 py-6 bg-white/10 text-white border-white/20 hover:bg-white/20"
              asChild
            >
              <Link href="/auth/doctor/signup">Join Our Expert Network</Link>
            </Button>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">24/7</div>
                <div className="text-sm text-gray-300">Access</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">100+</div>
                <div className="text-sm text-gray-300">Specialists</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">48h</div>
                <div className="text-sm text-gray-300">Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl font-bold text-white">HIPAA</div>
                <div className="text-sm text-gray-300">Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  )
}

