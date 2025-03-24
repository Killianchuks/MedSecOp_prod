import { Footer } from "@/components/footer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FileSearch, Eye, ClipboardList, AlertCircle } from "lucide-react"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"

export default function MedicalRecordsReviewPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <main className="min-h-screen">
        <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Medical Records Review</h1>
              <p className="mt-4 text-xl text-gray-600">
                Comprehensive analysis of your medical history by expert specialists
              </p>
            </div>
          </div>
        </div>

        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 mb-8">
                MedSecOp's Medical Records Review service provides a thorough analysis of your complete medical history
                by specialists who can identify patterns, potential issues, or areas that may require further attention.
                This service is particularly valuable for patients with complex medical histories or multiple
                conditions.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">Benefits of a Medical Records Review</h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <FileSearch className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Assessment</h3>
                  <p className="text-gray-700">
                    Get a holistic review of your entire medical history by specialists who can see the big picture.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <Eye className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Identify Patterns</h3>
                  <p className="text-gray-700">
                    Discover connections between symptoms, conditions, and treatments that may not be obvious.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <AlertCircle className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gap Analysis</h3>
                  <p className="text-gray-700">
                    Identify missing tests, evaluations, or treatments that could benefit your care.
                  </p>
                </div>

                <div className="flex flex-col items-center text-center p-6 bg-gray-50 rounded-lg">
                  <ClipboardList className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Organized Summary</h3>
                  <p className="text-gray-700">
                    Receive a clear, chronological summary of your medical history for future reference.
                  </p>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">What We Review</h2>

              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Medical History</h3>
                    <p className="text-gray-700">
                      Comprehensive review of your past and current medical conditions, surgeries, and hospitalizations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Medication History</h3>
                    <p className="text-gray-700">
                      Analysis of past and current medications, including effectiveness, side effects, and potential
                      interactions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Test Results</h3>
                    <p className="text-gray-700">
                      Evaluation of laboratory tests, imaging studies, and other diagnostic procedures.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Treatment History</h3>
                    <p className="text-gray-700">
                      Review of past treatments, their effectiveness, and potential alternatives.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-primary font-bold text-xl">•</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">Family Medical History</h3>
                    <p className="text-gray-700">
                      Assessment of hereditary factors that may influence your health and treatment options.
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
                      Create an account and complete our secure online form with details about your medical history.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Medical Records</h3>
                    <p className="text-gray-700">
                      Share your complete medical records, including doctor's notes, test results, and imaging studies
                      through our secure platform.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Specialist Review</h3>
                    <p className="text-gray-700">
                      A specialist thoroughly reviews your complete medical history, looking for patterns, gaps, and
                      areas of concern.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Comprehensive Report</h3>
                    <p className="text-gray-700">
                      Within 3-5 business days, you'll receive a detailed report with the specialist's assessment,
                      identified patterns or concerns, and recommendations for further evaluation or treatment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Optional Follow-Up</h3>
                    <p className="text-gray-700">
                      If you have questions about the report, you can schedule a follow-up consultation with the
                      specialist to discuss the findings and recommendations.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button size="lg" className="text-base px-8 py-6" asChild>
                  <Link href="/auth/patient/signup">Request Records Review</Link>
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

