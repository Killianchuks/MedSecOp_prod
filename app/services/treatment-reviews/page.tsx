import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ClipboardCheck, FileText, Activity, Thermometer } from "lucide-react"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function TreatmentReviewsPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <main className="min-h-screen">
        <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Treatment Reviews</h1>
              <p className="mt-4 text-xl text-gray-600">
                Expert evaluation of your current treatment plan to ensure optimal care
              </p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                MedSecOp's Treatment Review service provides a comprehensive evaluation of your current treatment plan
                by specialists in your condition. Our experts assess the effectiveness of your treatment, identify
                potential improvements, and recommend alternatives when appropriate.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Get a Treatment Review?</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <ClipboardCheck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Optimize Your Care</h3>
                  <p className="text-gray-700">
                    Ensure your treatment plan is the most effective option for your specific condition and
                    circumstances.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <FileText className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Alternatives</h3>
                  <p className="text-gray-700">
                    Discover alternative treatment approaches that may be more effective or have fewer side effects.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Activity className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Assessment</h3>
                  <p className="text-gray-700">
                    Benefit from the knowledge of specialists who focus exclusively on your condition.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Thermometer className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Current</h3>
                  <p className="text-gray-700">
                    Learn about the latest treatment advances and research developments for your condition.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Review</h2>

              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Current Medications</h3>
                    <p className="text-gray-700">
                      Assessment of your medication regimen, including dosages, potential interactions, and side
                      effects.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Treatment Effectiveness</h3>
                    <p className="text-gray-700">
                      Evaluation of how well your current treatment is managing your condition based on your symptoms
                      and test results.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Alternative Approaches</h3>
                    <p className="text-gray-700">
                      Identification of other treatment options that may be more effective or better suited to your
                      preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Emerging Treatments</h3>
                    <p className="text-gray-700">
                      Information about new and experimental treatments that may be relevant to your condition.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Lifestyle Modifications</h3>
                    <p className="text-gray-700">
                      Recommendations for diet, exercise, and other lifestyle changes that may complement your medical
                      treatment.
                    </p>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Process</h2>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Your Request</h3>
                    <p className="text-gray-700">
                      Create an account and complete our secure online form with details about your condition and
                      current treatment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Treatment Details</h3>
                    <p className="text-gray-700">
                      Provide information about your current medications, treatments, and their effectiveness.
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
                      Share relevant medical records, test results, and treatment history through our secure platform.
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
                      A specialist in your condition thoroughly reviews your treatment plan and medical history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Detailed Recommendations</h3>
                    <p className="text-gray-700">
                      Within 48-72 hours, you'll receive a comprehensive report with the specialist's assessment of your
                      current treatment and recommendations for optimization.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="text-base px-8 py-6" asChild>
                  <Link href="/auth/patient/signup">Request Treatment Review</Link>
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

