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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MessageSquare, FileText, CheckCircle, Clock } from "lucide-react"
import Link from "next/link"

// Sample FAQs
const faqs = [
  {
    question: "How do I submit a second opinion request?",
    answer:
      "To submit a request, click on the 'Submit a Second Opinion' button in your dashboard sidebar. Fill out the form with your medical information and upload relevant documents. Once submitted, our team will review and assign a specialist to your case.",
  },
  {
    question: "What happens after I submit my request?",
    answer:
      "After submission, your case will be reviewed by our medical team and assigned to an appropriate specialist. You'll receive a notification when a specialist is assigned. The specialist will review your case and provide their opinion within 48 hours in most cases.",
  },
  {
    question: "How do I upload additional documents?",
    answer:
      "You can upload additional documents by going to 'My Cases', selecting the relevant case, and clicking on the 'Upload Documents' button. You can upload various file formats including PDFs, JPEGs, and DICOM files for medical imaging.",
  },
  {
    question: "Can I request a specific specialist?",
    answer:
      "While we don't currently support requesting specific specialists, we match you with experts based on your condition and medical needs. All our specialists are board-certified and have extensive experience in their fields.",
  },
  {
    question: "How do I schedule a follow-up consultation?",
    answer:
      "After receiving your second opinion, you can request a follow-up consultation by going to 'My Cases', selecting the completed case, and clicking on 'Request Follow-up'. You'll be able to choose between video or phone consultation and select an available time slot.",
  },
  {
    question: "What if I'm not satisfied with my second opinion?",
    answer:
      "If you're not satisfied with your second opinion, please contact our support team. We may arrange for another specialist to review your case at a reduced fee or no additional cost, depending on the circumstances.",
  },
]

// Sample support tickets
const supportTickets = [
  {
    id: "TKT-1234",
    subject: "Question about billing",
    status: "Open",
    date: "Mar 16, 2025",
    lastUpdate: "Mar 16, 2025",
  },
  {
    id: "TKT-1233",
    subject: "Need help uploading documents",
    status: "Closed",
    date: "Mar 10, 2025",
    lastUpdate: "Mar 12, 2025",
  },
]

export function SupportContent() {
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
            <CardTitle>Support Tickets</CardTitle>
            <CardDescription>View your existing support requests</CardDescription>
          </CardHeader>
          <CardContent>
            {supportTickets.length > 0 ? (
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{ticket.subject}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{ticket.id}</span>
                        <span>•</span>
                        <span>Created: {ticket.date}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          ticket.status === "Open"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-800/20 dark:text-blue-400"
                            : "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                        }`}
                      >
                        {ticket.status}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Last update: {ticket.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No support tickets yet</p>
              </div>
            )}
          </CardContent>
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
          <CardContent>
            <Tabs defaultValue="guide">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="guide">User Guide</TabsTrigger>
                <TabsTrigger value="videos">Video Tutorials</TabsTrigger>
              </TabsList>
              <TabsContent value="guide" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/patient/guide#overview" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Getting Started Guide</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/patient/guide#process" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Uploading Medical Records</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/patient/guide#reports" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Understanding Your Report</span>
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link href="/patient/billing" className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      <span>Billing & Payment Guide</span>
                    </Link>
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="videos" className="space-y-4 pt-4">
                <div className="space-y-4">
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                      <h4 className="font-medium">How to Submit a Case</h4>
                      <p className="text-sm text-muted-foreground mt-1">3:45 min</p>
                    </div>
                  </div>
                  <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center p-4">
                      <Video className="h-8 w-8 mx-auto text-muted-foreground/50 mb-2" />
                      <h4 className="font-medium">Navigating Your Dashboard</h4>
                      <p className="text-sm text-muted-foreground mt-1">2:30 min</p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// Import the missing Video icon
import { Video } from "lucide-react"

