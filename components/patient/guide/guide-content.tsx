"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { FileText, Video, CheckCircle, HelpCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export function GuideContent() {
  const [activeTab, setActiveTab] = useState("overview")
  const searchParams = useSearchParams()

  // Handle URL hash for direct navigation to tabs
  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "")
      if (hash && ["overview", "process", "reports", "videos"].includes(hash)) {
        setActiveTab(hash)
      }
    }
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>Learn how to use MedSecOp for medical second opinions</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="process">Process</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
              <TabsTrigger value="videos">Video Guides</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4 pt-4">
              <div className="space-y-4" id="overview">
                <h3 className="text-lg font-medium">Welcome to MedSecOp</h3>
                <p>
                  MedSecOp connects you with leading medical specialists for expert second opinions on your diagnosis or
                  treatment plan. Our platform makes it easy to get the clarity you need from top doctors worldwide.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">Submit Your Case</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">
                        Upload your medical records and diagnostic images through our secure platform.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">Expert Review</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">A specialist in your condition reviews your case thoroughly.</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 rounded-full bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-base">Receive Opinion</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm">Get a comprehensive report with clear recommendations within 48 hours.</p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex justify-center mt-6">
                  <Button asChild>
                    <Link href="/patient/submit-opinion">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="process" className="space-y-4 pt-4">
              <div className="space-y-4" id="process">
                <h3 className="text-lg font-medium">The Second Opinion Process</h3>
                <ol className="space-y-6 relative border-l border-gray-200 pl-6 ml-3">
                  <li className="relative">
                    <div className="absolute -left-[25px] flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">
                      1
                    </div>
                    <h4 className="text-base font-medium">Submit Your Request</h4>
                    <p className="text-sm mt-1">
                      Fill out our secure online form with your medical information and upload relevant documents such
                      as test results, imaging studies, and medical records.
                    </p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[25px] flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">
                      2
                    </div>
                    <h4 className="text-base font-medium">Case Assignment</h4>
                    <p className="text-sm mt-1">
                      Our team reviews your submission and matches you with a specialist who has expertise in your
                      specific condition. You'll be notified once a specialist is assigned.
                    </p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[25px] flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">
                      3
                    </div>
                    <h4 className="text-base font-medium">Expert Review</h4>
                    <p className="text-sm mt-1">
                      The specialist thoroughly reviews your case, including all medical records and diagnostic images.
                      This typically takes 24-48 hours depending on complexity.
                    </p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[25px] flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">
                      4
                    </div>
                    <h4 className="text-base font-medium">Receive Your Opinion</h4>
                    <p className="text-sm mt-1">
                      You'll receive a comprehensive report with the specialist's assessment, diagnosis confirmation or
                      alternative possibilities, and treatment recommendations.
                    </p>
                  </li>
                  <li className="relative">
                    <div className="absolute -left-[25px] flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white">
                      5
                    </div>
                    <h4 className="text-base font-medium">Follow-up Support</h4>
                    <p className="text-sm mt-1">
                      If you have questions about the report, you can request a follow-up consultation with the
                      specialist to discuss the findings and recommendations.
                    </p>
                  </li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent value="reports" className="space-y-4 pt-4">
              <div className="space-y-4" id="reports">
                <h3 className="text-lg font-medium">Understanding Your Medical Reports</h3>
                <p>
                  Medical reports can be complex. This guide helps you understand the terminology, structure, and
                  implications of your second opinion reports.
                </p>

                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Report Structure</h4>
                    <p className="text-sm">Each second opinion report includes several key sections:</p>
                    <ul className="list-disc pl-5 mt-2 text-sm space-y-1">
                      <li>Executive Summary - A brief overview of the findings</li>
                      <li>Diagnosis Assessment - Confirmation or alternative diagnosis</li>
                      <li>Treatment Recommendations - Suggested treatment options</li>
                      <li>Supporting Evidence - Medical literature supporting the opinion</li>
                      <li>Next Steps - Recommended actions to take</li>
                    </ul>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Medical Terminology</h4>
                    <p className="text-sm">
                      Our reports include a glossary of medical terms used. You can also request clarification on any
                      terminology during your follow-up consultation.
                    </p>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Discussing With Your Primary Doctor</h4>
                    <p className="text-sm">
                      We provide guidance on how to discuss your second opinion with your primary healthcare provider,
                      including specific questions to ask and points to address.
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="videos" className="space-y-4 pt-4">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    <h4 className="font-medium">How to Submit a Case</h4>
                    <p className="text-sm text-muted-foreground mt-1">3:45 min</p>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    <h4 className="font-medium">Understanding Your Report</h4>
                    <p className="text-sm text-muted-foreground mt-1">4:20 min</p>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    <h4 className="font-medium">Preparing Medical Records</h4>
                    <p className="text-sm text-muted-foreground mt-1">5:10 min</p>
                  </div>
                </div>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center p-4">
                    <Video className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                    <h4 className="font-medium">Follow-up Consultations</h4>
                    <p className="text-sm text-muted-foreground mt-1">3:30 min</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
          <CardDescription>Common questions about using MedSecOp</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How long does it take to get a second opinion?</AccordionTrigger>
              <AccordionContent>
                Most second opinions are completed within 48 hours after a specialist is assigned to your case. For more
                complex cases or specialized fields, it may take up to 72 hours. You'll receive updates throughout the
                process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What medical records do I need to submit?</AccordionTrigger>
              <AccordionContent>
                You should submit all relevant medical records related to your condition, including doctor's notes, lab
                results, imaging studies (X-rays, MRIs, CT scans), pathology reports, and current medication list. The
                more information you provide, the more comprehensive the second opinion will be.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How much does a second opinion cost?</AccordionTrigger>
              <AccordionContent>
                The cost varies depending on the specialty and complexity of your case, typically ranging from $300 to
                $500. The exact price will be shown before you submit your request. Some health insurance plans may
                cover second opinions, and we can provide documentation for reimbursement.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Who are the specialists providing opinions?</AccordionTrigger>
              <AccordionContent>
                Our network includes board-certified specialists from leading medical institutions worldwide. All
                specialists are thoroughly vetted and have extensive experience in their fields. You can view the
                specialist's credentials once they're assigned to your case.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Is my medical information secure?</AccordionTrigger>
              <AccordionContent>
                Yes, we take your privacy seriously. MedSecOp is HIPAA compliant and uses enterprise-grade encryption to
                protect your medical information. Your data is only accessible to the specialist reviewing your case and
                our secure platform administrators.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Can I speak directly with the specialist?</AccordionTrigger>
              <AccordionContent>
                Yes, you can request a follow-up video or phone consultation with the specialist after receiving your
                written opinion. This allows you to ask questions and discuss the recommendations in detail. Follow-up
                consultations can be scheduled through your dashboard.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Need More Help?</CardTitle>
          <CardDescription>Additional resources and support options</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="/patient/support" className="flex flex-col items-start">
                <div className="flex items-center w-full">
                  <HelpCircle className="h-5 w-5 mr-2" />
                  <span className="font-medium">Contact Support</span>
                </div>
                <p className="text-sm text-muted-foreground text-left mt-2">
                  Get help from our support team with any questions or issues
                </p>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto p-4 justify-start" asChild>
              <Link href="#" className="flex flex-col items-start">
                <div className="flex items-center w-full">
                  <FileText className="h-5 w-5 mr-2" />
                  <span className="font-medium">Download User Guide</span>
                </div>
                <p className="text-sm text-muted-foreground text-left mt-2">
                  Comprehensive PDF guide with detailed instructions
                </p>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

