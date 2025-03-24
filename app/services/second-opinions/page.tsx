"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, Shield, FileText, Check } from "lucide-react"
import { ScrollToTopOnMount } from "@/components/scroll-to-top-on-mount"
import { ScrollToTopLink } from "@/components/scroll-to-top-link"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SecondOpinionsPage() {
  const [selectedOption, setSelectedOption] = useState("single")
  const [reviewCount, setReviewCount] = useState(2)

  const pricingOptions = {
    single: 299,
    multiple: {
      2: 499,
      3: 699,
      4: 899,
      5: 1099,
    },
  }

  const getPrice = () => {
    if (selectedOption === "single") {
      return pricingOptions.single
    } else {
      return pricingOptions.multiple[reviewCount as keyof typeof pricingOptions.multiple]
    }
  }

  return (
    <>
      <ScrollToTopOnMount />
      <div className="pt-24 pb-16 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">Medical Second Opinions</h1>
            <p className="mt-4 text-xl text-gray-600">
              Expert reviews of your diagnosis and treatment plan from leading specialists
            </p>
          </div>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-700 mb-8">
              When facing a serious diagnosis or complex medical condition, getting a second opinion can provide
              clarity, peace of mind, and potentially life-changing insights. MedSecOp connects you with leading
              specialists who review your case and provide expert recommendations.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Get a Second Opinion?</h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm Your Diagnosis</h3>
                  <p className="text-gray-700">
                    Ensure your diagnosis is accurate before proceeding with treatment. Studies show that up to 20% of
                    patients receive a different diagnosis upon second review.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Explore Treatment Options</h3>
                  <p className="text-gray-700">
                    Discover alternative treatment approaches that may be more effective or better suited to your
                    preferences and lifestyle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gain Peace of Mind</h3>
                  <p className="text-gray-700">
                    Feel confident in your healthcare decisions knowing they're based on multiple expert opinions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Access Specialist Expertise</h3>
                  <p className="text-gray-700">
                    Connect with specialists who may not be available in your geographic area or through your regular
                    healthcare providers.
                  </p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Second Opinion Process</h2>

            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Submit Your Request</h3>
                  <p className="text-gray-700">
                    Create an account and complete our secure online form with details about your condition and medical
                    history.
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
                    Upload relevant medical records, test results, and imaging studies through our secure platform.
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
                    A specialist in your condition thoroughly reviews your case, including all medical records and
                    diagnostic images.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Receive Your Opinion</h3>
                  <p className="text-gray-700">
                    Within 48-72 hours, you'll receive a comprehensive report with the specialist's assessment,
                    diagnosis confirmation or alternatives, and treatment recommendations.
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

            <div className="bg-gray-50 p-6 rounded-lg mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Features</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Turnaround</h3>
                    <p className="text-sm text-gray-700">Most opinions delivered within 48-72 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Secure & Confidential</h3>
                    <p className="text-sm text-gray-700">HIPAA-compliant platform protects your data</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Comprehensive Reports</h3>
                    <p className="text-sm text-gray-700">Detailed assessments with clear recommendations</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Expert Specialists</h3>
                    <p className="text-sm text-gray-700">Board-certified physicians from top institutions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Options Section */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Review Option</h2>

              <div className="space-y-6">
                <RadioGroup value={selectedOption} onValueChange={setSelectedOption} className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="single" id="single" className="mt-1" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="single" className="text-lg font-medium">
                        Single Specialist Review
                      </Label>
                      <p className="text-sm text-gray-500">
                        One comprehensive review by a leading specialist in your condition
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2">
                    <RadioGroupItem value="multiple" id="multiple" className="mt-1" />
                    <div className="grid gap-1.5">
                      <Label htmlFor="multiple" className="text-lg font-medium">
                        Multiple Specialist Reviews
                      </Label>
                      <p className="text-sm text-gray-500">
                        Get opinions from multiple specialists for more comprehensive insights
                      </p>
                    </div>
                  </div>
                </RadioGroup>

                {selectedOption === "multiple" && (
                  <div className="pl-6 mt-4">
                    <p className="text-sm font-medium mb-3">Select number of reviews:</p>
                    <div className="flex flex-wrap gap-3">
                      {[2, 3, 4, 5].map((count) => (
                        <Button
                          key={count}
                          type="button"
                          variant={reviewCount === count ? "default" : "outline"}
                          onClick={() => setReviewCount(count)}
                          className="w-16 h-16 rounded-full"
                        >
                          {count}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Card */}
            <Card className="mb-12 border-primary/20">
              <CardHeader className="bg-primary/5">
                <CardTitle className="text-xl">Your Selected Package</CardTitle>
                <CardDescription>
                  {selectedOption === "single" ? "Single Specialist Review" : `${reviewCount} Specialist Reviews`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-3xl font-bold">${getPrice()}</p>
                    <p className="text-sm text-gray-500">One-time payment</p>
                  </div>
                  <ul className="space-y-1">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">Comprehensive report</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm">48-72 hour turnaround</span>
                    </li>
                    {selectedOption === "multiple" && (
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-500" />
                        <span className="text-sm">Consensus summary</span>
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="bg-gray-50 flex justify-center">
                <Button size="lg" className="text-base px-8 py-6 w-full" asChild>
                  <ScrollToTopLink
                    href="/auth/patient/signup"
                    params={{
                      reviewOption: selectedOption,
                      reviewCount: selectedOption === "multiple" ? reviewCount.toString() : "1",
                    }}
                  >
                    Get Started Now
                  </ScrollToTopLink>
                </Button>
              </CardFooter>
            </Card>

            <div className="text-center">
              <p className="text-sm text-gray-500 mb-4">
                Have questions about our second opinion services?{" "}
                <Link href="/contact-us" className="text-primary hover:underline">
                  Contact us
                </Link>{" "}
                or call <span className="font-medium">1-800-MED-SECOP</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

