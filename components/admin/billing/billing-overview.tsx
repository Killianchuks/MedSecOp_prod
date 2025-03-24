"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  Filter,
  Download,
  DollarSign,
  TrendingUp,
  CreditCard,
  Calendar,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

// Sample revenue data
const revenueData = [
  { month: "Jan", revenue: 32500, payouts: 24375 },
  { month: "Feb", revenue: 35800, payouts: 26850 },
  { month: "Mar", revenue: 38200, payouts: 28650 },
  { month: "Apr", revenue: 36500, payouts: 27375 },
  { month: "May", revenue: 40100, payouts: 30075 },
  { month: "Jun", revenue: 42850, payouts: 32137 },
]

// Sample transactions
const transactions = [
  {
    id: "TXN-1234",
    date: "Mar 19, 2025",
    description: "Payment for Case #1241",
    amount: 350,
    type: "Revenue",
    status: "Completed",
    patient: "Sarah Johnson",
  },
  {
    id: "TXN-1233",
    date: "Mar 19, 2025",
    description: "Payout to Dr. Jane Smith",
    amount: 262.5,
    type: "Payout",
    status: "Pending",
    doctor: "Dr. Jane Smith",
  },
  {
    id: "TXN-1232",
    date: "Mar 16, 2025",
    description: "Payment for Case #1240",
    amount: 350,
    type: "Revenue",
    status: "Completed",
    patient: "Jennifer Adams",
  },
  {
    id: "TXN-1231",
    date: "Mar 16, 2025",
    description: "Payout to Dr. Jane Smith",
    amount: 262.5,
    type: "Payout",
    status: "Completed",
    doctor: "Dr. Jane Smith",
  },
  {
    id: "TXN-1230",
    date: "Mar 15, 2025",
    description: "Payment for Case #1239",
    amount: 450,
    type: "Revenue",
    status: "Completed",
    patient: "Thomas Walker",
  },
  {
    id: "TXN-1229",
    date: "Mar 14, 2025",
    description: "Payment for Case #1238",
    amount: 350,
    type: "Revenue",
    status: "Completed",
    patient: "Michael Brown",
  },
  {
    id: "TXN-1228",
    date: "Mar 14, 2025",
    description: "Payout to Dr. Jane Smith",
    amount: 262.5,
    type: "Payout",
    status: "Completed",
    doctor: "Dr. Jane Smith",
  },
]

export function BillingOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$42,850</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Doctor Payouts (MTD)</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$32,137</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+6.8% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Profit (MTD)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$10,713</div>
            <div className="flex items-center text-xs text-green-500 mt-1">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              <span>+15.2% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Revenue Analytics</CardTitle>
          <CardDescription>Monthly revenue and doctor payouts</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <ChartContainer
            config={{
              revenue: {
                label: "Revenue",
                color: "hsl(var(--chart-1))",
              },
              payouts: {
                label: "Doctor Payouts",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="payouts" fill="var(--color-payouts)" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>View all financial transactions</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-full sm:w-auto max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search transactions..." className="pl-8 w-full sm:w-[260px]" />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="all">All Transactions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue</TabsTrigger>
              <TabsTrigger value="payouts">Payouts</TabsTrigger>
            </TabsList>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{transaction.date}</span>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.patient ? transaction.patient : transaction.doctor}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.status === "Completed" ? "outline" : "secondary"}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          {transaction.type === "Revenue" ? (
                            <ArrowDownLeft className="h-4 w-4 mr-1 text-green-600" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4 mr-1 text-amber-600" />
                          )}
                          <span className={transaction.type === "Revenue" ? "text-green-600" : "text-amber-600"}>
                            ${transaction.amount.toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

