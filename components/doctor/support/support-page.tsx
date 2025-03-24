"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Mail, Phone, MessageSquare, HelpCircle, FileText, CheckCircle } from "lucide-react"

// Sample FAQs
const faqs = [
  {
    question: "How do I accept a case?",
    answer:
      "To accept a case, navigate to the 'My Cases' page, click on any case with an 'Available' status, review the details, and click the 'Accept Case' button. You will have 48 hours to complete your review once accepted.",
  },
  {
    question: "What happens if I miss a case deadline?",
    answer:
      "Missing deadlines may affect your rating and future case assignments. If you anticipate missing a deadline, please contact support as soon as possible to discuss an extension or reassignment.",
  },
  {
    question: "How and when do I get paid?",
    answer:
      "Payments are processed within 3-5 business days after completing a case review. You can view your pending and processed payments in the 'Wallet' section. Payments are made via direct deposit to your registered bank account.",
  },
  {
    question: "How do I update my medical credentials?",
    answer:
      "You can update your credentials in the 'Settings' page under the 'Profile' tab. Any updates to your credentials will require verification by our team, which typically takes 2-3 business days.",
  },
  {
    question: "What file formats are accepted for medical documents?",
    answer:
      "We accept PDF, JPEG, PNG, and DICOM files for medical documents and images. For larger files or specialized formats, please contact support for assistance.",
  },
  {
    question: "How can I communicate with patients?",
    answer:
      "All communication with patients is handled through our secure messaging system. To maintain privacy and ethical standards, direct contact outside the platform is prohibited.",
  },
]

export function SupportPage() {
  const [isMessageSent, setIsMessageSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsMessageSent(true)
    }, 1000)
  }

  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-8 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>Get help from our support team</CardDescription>
          </CardHeader>
          {isMessageSent ? (
            <CardContent className="pt-6">
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Message Sent Successfully</h3>
                <p className="text-muted-foreground max-w-md">
                  Thank you for contacting us. Our support team will get back to you within 24 hours.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => setIsMessageSent(false)}>
                  Send Another Message
                </Button>
              </div>
            </CardContent>
          ) : (
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select required onValueChange={(value) => console.log(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="billing">Billing & Payments</SelectItem>
                      <SelectItem value="case">Case Question</SelectItem>
                      <SelectItem value="account">Account Management</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={6} placeholder="Describe your issue or question in detail..." required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="attachments">Attachments (Optional)</Label>
                  <Input id="attachments" type="file" />
                  <p className="text-xs text-muted-foreground">Max file size: 10MB. Supported formats: PDF, JPG, PNG</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Submit Request</Button>
              </CardFooter>
            </form>
          )}
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Find quick answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Support Channels</CardTitle>
            <CardDescription>Multiple ways to get assistance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Email Support</h3>
                <p className="text-sm text-muted-foreground">support@medsecop.com</p>
                <p className="text-xs text-muted-foreground mt-1">Response within 24 hours</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Phone Support</h3>
                <p className="text-sm text-muted-foreground">+1 (800) 123-4567</p>
                <p className="text-xs text-muted-foreground mt-1">Mon-Fri, 9am-5pm EST</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-primary/10">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Live Chat</h3>
                <p className="text-sm text-muted-foreground">Available in dashboard</p>
                <p className="text-xs text-muted-foreground mt-1">Response within minutes</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Help Resources</CardTitle>
            <CardDescription>Self-service information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>User Guide</span>
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span>Knowledge Base</span>
              </a>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <a href="#" className="flex items-center gap-2">
                <PlayCircle className="h-4 w-4" />
                <span>Video Tutorials</span>
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Import the missing PlayCircle icon
import { PlayCircle } from "lucide-react"

