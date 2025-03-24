"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DownloadCloud, ArrowUpRight, ArrowDownLeft, Filter, CreditCard, DollarSign } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Sample transaction data
const transactions = [
  {
    id: "TXN-1234",
    date: "Mar 16, 2025",
    amount: 450,
    status: "Completed",
    type: "Payment",
    description: "Case review: Jennifer Adams (CASE-1240)",
    method: "Direct Deposit",
  },
  {
    id: "TXN-1233",
    date: "Mar 14, 2025",
    amount: 350,
    status: "Completed",
    type: "Payment",
    description: "Case review: David Wilson (CASE-1232)",
    method: "Direct Deposit",
  },
  {
    id: "TXN-1232",
    date: "Mar 12, 2025",
    amount: 550,
    status: "Completed",
    type: "Payment",
    description: "Case review: Michael Brown (CASE-1233)",
    method: "Direct Deposit",
  },
  {
    id: "TXN-1231",
    date: "Mar 10, 2025",
    amount: 500,
    status: "Pending",
    type: "Payment",
    description: "Case review: Sarah Johnson (CASE-1234)",
    method: "Direct Deposit",
  },
  {
    id: "TXN-1230",
    date: "Mar 8, 2025",
    amount: 450,
    status: "Completed",
    type: "Payment",
    description: "Case review: Emily Davis (CASE-1231)",
    method: "Direct Deposit",
  },
  {
    id: "TXN-1229",
    date: "Mar 5, 2025",
    amount: 350,
    status: "Completed",
    type: "Payment",
    description: "Case review: Robert Miller (CASE-1230)",
    method: "Direct Deposit",
  },
  {
    id: "TXN-1228",
    date: "Mar 2, 2025",
    amount: 1500,
    status: "Completed",
    type: "Withdrawal",
    description: "Withdrawal to bank account",
    method: "ACH Transfer",
  },
]

export function PaymentHistory() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.00</div>
            <div className="flex items-center justify-between mt-2">
              <Button className="w-full" size="sm">
                Withdraw Funds
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$500.00</div>
            <p className="text-xs text-muted-foreground mt-2">Expected within 3-5 business days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Month's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,650.00</div>
            <p className="text-xs text-muted-foreground mt-2">+15.3% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>Manage how you receive payments</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bank">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bank">Bank Account</TabsTrigger>
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
            </TabsList>
            <TabsContent value="bank" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="accountName">Account Holder Name</Label>
                <Input id="accountName" defaultValue="Dr. Jane Smith" />
              </div>
              <div className="grid gap-4 grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input id="accountNumber" defaultValue="••••••••1234" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="routingNumber">Routing Number</Label>
                  <Input id="routingNumber" defaultValue="••••••0123" type="password" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank Name</Label>
                <Input id="bankName" defaultValue="National Bank" />
              </div>
              <Button>Update Bank Information</Button>
            </TabsContent>
            <TabsContent value="paypal" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="paypalEmail">PayPal Email</Label>
                <Input id="paypalEmail" type="email" placeholder="your-email@example.com" />
              </div>
              <Button>Link PayPal Account</Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all your earnings and withdrawals</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <DownloadCloud className="h-4 w-4 mr-2" />
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
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>
                      <div
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400"
                        }`}
                      >
                        {transaction.status}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end">
                        {transaction.type === "Payment" ? (
                          <ArrowDownLeft className="h-4 w-4 mr-1 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4 mr-1 text-red-600" />
                        )}
                        <span className={transaction.type === "Payment" ? "text-green-600" : "text-red-600"}>
                          ${transaction.amount.toFixed(2)}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Import the missing Clock icon
import { Clock } from "lucide-react"

