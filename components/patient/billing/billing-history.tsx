"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Download, Filter, Calendar, FileText, Plus, CheckCircle } from "lucide-react"

// Sample billing data
const invoices = [
  {
    id: "INV-1234",
    date: "Mar 15, 2025",
    amount: 350,
    status: "Paid",
    description: "Second Opinion: Atrial Fibrillation (CASE-1234)",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "INV-1233",
    date: "Mar 14, 2025",
    amount: 350,
    status: "Pending",
    description: "Second Opinion: Chronic Migraine (CASE-1233)",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "INV-1232",
    date: "Mar 12, 2025",
    amount: 400,
    status: "Paid",
    description: "Second Opinion: Lower Back Pain (CASE-1232)",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "INV-1231",
    date: "Mar 10, 2025",
    amount: 300,
    status: "Paid",
    description: "Second Opinion: Skin Lesion (CASE-1231)",
    paymentMethod: "Visa ending in 4242",
  },
  {
    id: "INV-1230",
    date: "Mar 5, 2025",
    amount: 350,
    status: "Paid",
    description: "Second Opinion: Thyroid Nodule (CASE-1230)",
    paymentMethod: "Visa ending in 4242",
  },
]

export function BillingHistory() {
  const [selectedInvoice, setSelectedInvoice] = useState<(typeof invoices)[0] | null>(null)

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,850.00</div>
            <p className="text-xs text-muted-foreground">Across all consultations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">None</div>
            <Button size="sm" className="mt-2">
              <Plus className="h-4 w-4 mr-2" />
              Add Subscription
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$350.00</div>
            <Button size="sm" className="mt-2">
              Pay Now
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage your payment methods</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="cards">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="cards">Credit Cards</TabsTrigger>
              <TabsTrigger value="bank">Bank Accounts</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="space-y-4 pt-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md">
                    <CreditCard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Visa ending in 4242</p>
                    <p className="text-sm text-muted-foreground">Expires 04/2028</p>
                  </div>
                </div>
                <Badge>Default</Badge>
              </div>
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Payment Method
              </Button>
            </TabsContent>
            <TabsContent value="bank" className="space-y-4 pt-4">
              <div className="text-center py-8">
                <p className="text-muted-foreground">No bank accounts added yet</p>
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Bank Account
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>View your past invoices and payments</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id} className="cursor-pointer" onClick={() => setSelectedInvoice(invoice)}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.description}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          invoice.status === "Paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                        }`}
                      >
                        {invoice.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">${invoice.amount.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {selectedInvoice && (
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Invoice Details: {selectedInvoice.id}</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-semibold mb-1">Invoice Date</h3>
                <p>{selectedInvoice.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold mb-1">Status</h3>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    selectedInvoice.status === "Paid"
                      ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                  }`}
                >
                  {selectedInvoice.status}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Description</h3>
              <p>{selectedInvoice.description}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold mb-1">Payment Method</h3>
              <p>{selectedInvoice.paymentMethod}</p>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Amount</span>
                <span className="font-semibold">${selectedInvoice.amount.toFixed(2)}</span>
              </div>
            </div>

            {selectedInvoice.status === "Pending" && (
              <Button className="w-full">
                <CheckCircle className="h-4 w-4 mr-2" />
                Pay Now
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}

