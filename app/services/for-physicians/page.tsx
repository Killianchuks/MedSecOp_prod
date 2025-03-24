import { Footer } from "@/components/footer"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"
import { Button } from "@/components/ui/button"
import { Clock, DollarSign, Shield, Globe } from "lucide-react"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function ForPhysiciansPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <main className="min-h-screen">
        <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">For Physicians</h1>
              <p className="mt-4 text-xl text-gray-600">
                Join our network of specialists to provide expert opinions and expand your practice
              </p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                MedSecOp invites qualified physicians to join our network of specialists providing expert second
                opinions to patients worldwide. Our platform offers a flexible way to expand your practice, share your
                expertise, and help patients make informed healthcare decisions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits for Physicians</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Clock className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Schedule</h3>
                  <p className="text-gray-700">
                    Review cases on your own time, fitting seamlessly into your existing practice.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <DollarSign className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Competitive Compensation</h3>
                  <p className="text-gray-700">Earn additional income while helping patients access your expertise.</p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-700">
                    Extend your expertise to patients worldwide without geographic limitations.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Shield className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Professional Protection</h3>
                  <p className="text-gray-700">
                    Comprehensive liability coverage provided for all consultations on our platform.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works for Physicians</h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Apply to Join</h3>
                    <p className="text-gray-700">
                      Complete our online application with your credentials, specialties, and areas of expertise.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Credential Verification</h3>
                    <p className="text-gray-700">
                      Our team verifies your medical credentials, board certifications, and practice history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Platform Onboarding</h3>
                    <p className="text-gray-700">
                      Complete a brief orientation to learn how to use our secure platform for reviewing cases and
                      providing opinions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Set Your Availability</h3>
                    <p className="text-gray-700">
                      Indicate your availability and case volume preferences to receive appropriate case assignments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Review Cases</h3>
                    <p className="text-gray-700">
                      Review assigned cases through our secure platform, accessing all relevant medical records and
                      imaging studies.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    6
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Provide Expert Opinions</h3>
                    <p className="text-gray-700">
                      Submit your assessment, diagnosis, and treatment recommendations through our structured reporting
                      system.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Physician Requirements</h2>

              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Board certification in your specialty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Current medical license in good standing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Minimum of 5 years of practice experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Active clinical practice or academic appointment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Professional liability insurance (supplemental coverage provided by MedSecOp)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Excellent communication skills</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button size="lg" className="text-base px-8 py-6" asChild>
                  <ScrollToTopLink href="/auth/doctor/signup">Join Our Expert Network</ScrollToTopLink>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  )
}

