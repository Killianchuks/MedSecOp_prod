import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Video, Calendar, Globe } from "lucide-react"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"
import { Users } from "lucide-react"

export default function SpecialistConsultationsPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <main className="min-h-screen">
        <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Specialist Consultations</h1>
              <p className="mt-4 text-xl text-gray-600">
                Connect directly with leading medical specialists through secure video consultations
              </p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                MedSecOp's specialist consultation service connects you directly with leading medical experts through
                secure video consultations. Discuss your condition, ask questions, and receive personalized advice from
                specialists who might otherwise be inaccessible due to geographic or scheduling constraints.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of Virtual Specialist Consultations</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Video className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenient Access</h3>
                  <p className="text-gray-700">
                    Connect with specialists from the comfort of your home, eliminating travel time and expenses.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Calendar className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Flexible Scheduling</h3>
                  <p className="text-gray-700">
                    Book appointments at times that work for you, including evenings and weekends.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Specialists</h3>
                  <p className="text-gray-700">
                    Access to board-certified specialists from prestigious medical institutions.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Expertise</h3>
                  <p className="text-gray-700">
                    Connect with specialists worldwide, not just those in your geographic area.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Create an Account</h3>
                    <p className="text-gray-700">
                      Sign up on our platform and complete your medical profile with relevant health information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Request a Second Opinion with Consultation
                    </h3>
                    <p className="text-gray-700">
                      When submitting your second opinion request, select the option to include a video consultation.
                      You can either choose a stand-alone consultation or add a consultation to your written second
                      opinion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Medical Records</h3>
                    <p className="text-gray-700">
                      Share relevant medical records, test results, and imaging studies through our secure platform for
                      the specialist to review before your consultation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Specialist Review</h3>
                    <p className="text-gray-700">
                      A specialist will review your case and provide a written second opinion. If you requested a
                      consultation, you'll receive information on how to schedule your video appointment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Schedule & Attend Your Consultation</h3>
                    <p className="text-gray-700">
                      Choose a convenient time from the specialist's calendar and connect via our secure video platform
                      for your consultation. Discuss your case, ask questions, and get personalized advice.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What to Expect</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>30-60 minute video consultations with specialists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Discussion of your medical history and current condition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Review of your test results and imaging studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Expert assessment and recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Opportunity to ask questions and discuss concerns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Written summary of the consultation and recommendations</span>
                  </li>
                </ul>
              </div>

              <div className="text-center">
                <Button size="lg" className="text-base px-8 py-6" asChild>
                  <Link href="/auth/patient/signup">Schedule a Consultation</Link>
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

