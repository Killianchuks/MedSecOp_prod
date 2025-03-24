import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileText, Users, ClipboardCheck, FileSearch, UserCog } from "lucide-react"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function ServicesPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Our Services</h1>
            <p className="mt-4 text-xl text-gray-600">
              Comprehensive medical second opinion services for patients and physicians
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-12">
              <div id="second-opinions" className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="p-6 bg-blue-50 rounded-full">
                    <FileText className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Second Opinions</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Our core service provides expert second opinions on diagnoses and treatment plans from leading
                    specialists in their fields.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Review of your diagnosis by a specialist in your condition</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Comprehensive assessment of your current treatment plan</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Alternative treatment options when applicable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Detailed report with clear recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Optional follow-up consultation to discuss findings</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link href="/auth/patient/signup">Get a Second Opinion</Link>
                  </Button>
                </div>
              </div>

              <div id="specialist-consultations" className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="p-6 bg-blue-50 rounded-full">
                    <Users className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Specialist Consultations</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Connect directly with specialists for virtual consultations to discuss your condition, treatment
                    options, or medical concerns.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>One-on-one video consultations with specialists</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Discuss complex medical questions directly</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Get answers about potential treatment approaches</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Follow-up consultations available as needed</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link href="/auth/patient/signup">Schedule a Consultation</Link>
                  </Button>
                </div>
              </div>

              <div id="treatment-reviews" className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="p-6 bg-blue-50 rounded-full">
                    <ClipboardCheck className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Treatment Reviews</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Have your current treatment plan reviewed by specialists to ensure you're receiving the most
                    effective care for your condition.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Evaluation of your current treatment approach</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Assessment of treatment effectiveness and side effects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Recommendations for optimizing your treatment</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Information about alternative or emerging treatments</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link href="/auth/patient/signup">Request Treatment Review</Link>
                  </Button>
                </div>
              </div>

              <div id="medical-records-review" className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="p-6 bg-blue-50 rounded-full">
                    <FileSearch className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Medical Records Review</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Have your complete medical history reviewed by specialists to identify patterns, potential issues,
                    or areas that may require further attention.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Comprehensive review of your medical history</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Identification of potential gaps in care</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Assessment of test results and imaging studies</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Recommendations for additional testing if needed</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Summary report with actionable insights</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link href="/auth/patient/signup">Request Records Review</Link>
                  </Button>
                </div>
              </div>

              <div id="for-physicians" className="grid md:grid-cols-5 gap-6 items-start">
                <div className="md:col-span-2 flex justify-center md:justify-start">
                  <div className="p-6 bg-blue-50 rounded-full">
                    <UserCog className="h-16 w-16 text-primary" />
                  </div>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">For Physicians</h2>
                  <p className="text-lg text-gray-700 mb-4">
                    Join our network of specialists to provide expert opinions, expand your practice, and help patients
                    worldwide.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Flexible schedule - review cases on your own time</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Competitive compensation for your expertise</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Secure platform for reviewing patient records</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Opportunity to help patients beyond geographic limitations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">•</span>
                      <span>Professional liability coverage provided</span>
                    </li>
                  </ul>
                  <Button asChild>
                    <Link href="/auth/doctor/signup">Join Our Network</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-lg text-gray-700 mb-8">
              Take the first step toward getting expert medical advice for your condition.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base px-8 py-6" asChild>
                <Link href="/auth/patient/signup">Get a Second Opinion</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 py-6" asChild>
                <Link href="/auth/doctor/signup">Join Our Expert Network</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

