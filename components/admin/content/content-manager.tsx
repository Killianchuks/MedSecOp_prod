"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, MoreHorizontal, FileText, Calendar, Plus, Eye, Edit, Trash, Mail } from "lucide-react"

// Sample FAQ data
const faqs = [
  {
    id: "FAQ-1001",
    question: "How long does it take to get a second opinion?",
    category: "General",
    lastUpdated: "Mar 10, 2025",
    status: "Published",
  },
  {
    id: "FAQ-1002",
    question: "What medical records do I need to submit?",
    category: "Patients",
    lastUpdated: "Mar 12, 2025",
    status: "Published",
  },
  {
    id: "FAQ-1003",
    question: "How much does a second opinion cost?",
    category: "Billing",
    lastUpdated: "Mar 15, 2025",
    status: "Published",
  },
  {
    id: "FAQ-1004",
    question: "Who are the specialists providing opinions?",
    category: "Doctors",
    lastUpdated: "Mar 8, 2025",
    status: "Published",
  },
  {
    id: "FAQ-1005",
    question: "Is my medical information secure?",
    category: "Security",
    lastUpdated: "Mar 5, 2025",
    status: "Published",
  },
  {
    id: "FAQ-1006",
    question: "How do I become a specialist on the platform?",
    category: "Doctors",
    lastUpdated: "Mar 18, 2025",
    status: "Draft",
  },
]

// Sample email templates
const emailTemplates = [
  {
    id: "EMAIL-1001",
    name: "Welcome Email - Patient",
    subject: "Welcome to MedSecOp!",
    lastUpdated: "Jan 15, 2025",
    status: "Active",
  },
  {
    id: "EMAIL-1002",
    name: "Welcome Email - Doctor",
    subject: "Welcome to the MedSecOp Expert Network",
    lastUpdated: "Jan 15, 2025",
    status: "Active",
  },
  {
    id: "EMAIL-1003",
    name: "Case Submission Confirmation",
    subject: "Your Second Opinion Request Has Been Received",
    lastUpdated: "Feb 10, 2025",
    status: "Active",
  },
  {
    id: "EMAIL-1004",
    name: "Doctor Assignment Notification",
    subject: "A Specialist Has Been Assigned to Your Case",
    lastUpdated: "Feb 12, 2025",
    status: "Active",
  },
  {
    id: "EMAIL-1005",
    name: "Opinion Ready Notification",
    subject: "Your Second Opinion is Ready",
    lastUpdated: "Feb 15, 2025",
    status: "Active",
  },
  {
    id: "EMAIL-1006",
    name: "Payment Receipt",
    subject: "Receipt for Your MedSecOp Payment",
    lastUpdated: "Mar 5, 2025",
    status: "Active",
  },
]

// Sample guides
const guides = [
  {
    id: "GUIDE-1001",
    title: "Getting Started with MedSecOp",
    category: "General",
    lastUpdated: "Jan 20, 2025",
    status: "Published",
  },
  {
    id: "GUIDE-1002",
    title: "How to Submit a Second Opinion Request",
    category: "Patients",
    lastUpdated: "Feb 5, 2025",
    status: "Published",
  },
  {
    id: "GUIDE-1003",
    title: "Understanding Your Second Opinion Report",
    category: "Patients",
    lastUpdated: "Feb 10, 2025",
    status: "Published",
  },
  {
    id: "GUIDE-1004",
    title: "Reviewing Cases as a Specialist",
    category: "Doctors",
    lastUpdated: "Feb 15, 2025",
    status: "Published",
  },
  {
    id: "GUIDE-1005",
    title: "Managing Your Doctor Profile",
    category: "Doctors",
    lastUpdated: "Mar 1, 2025",
    status: "Published",
  },
  {
    id: "GUIDE-1006",
    title: "Billing and Payment Guide",
    category: "Billing",
    lastUpdated: "Mar 10, 2025",
    status: "Draft",
  },
]

export function ContentManager() {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>Manage FAQs, guides, and email templates</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="faqs">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="faqs">FAQs</TabsTrigger>
              <TabsTrigger value="guides">Guides</TabsTrigger>
              <TabsTrigger value="emails">Email Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="faqs">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add FAQ
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {faqs.map((faq) => (
                      <TableRow key={faq.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{faq.question}</div>
                            <div className="text-sm text-muted-foreground">{faq.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{faq.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{faq.lastUpdated}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={faq.status === "Published" ? "outline" : "secondary"}>{faq.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {faq.status === "Draft" ? (
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Unpublish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search guides..." className="pl-8" />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Guide
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {guides.map((guide) => (
                      <TableRow key={guide.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{guide.title}</div>
                            <div className="text-sm text-muted-foreground">{guide.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{guide.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{guide.lastUpdated}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={guide.status === "Published" ? "outline" : "secondary"}>{guide.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              {guide.status === "Draft" ? (
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Publish
                                </DropdownMenuItem>
                              ) : (
                                <DropdownMenuItem>
                                  <FileText className="h-4 w-4 mr-2" />
                                  Unpublish
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="emails">
              <div className="flex justify-between items-center mb-4">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search email templates..." className="pl-8" />
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Template
                </Button>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {emailTemplates.map((template) => (
                      <TableRow key={template.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">{template.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{template.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                            <span>{template.lastUpdated}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={template.status === "Active" ? "outline" : "secondary"}>
                            {template.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Mail className="h-4 w-4 mr-2" />
                                Send Test
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

