"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", revenue: 32500, target: 30000 },
  { month: "Feb", revenue: 35800, target: 32000 },
  { month: "Mar", revenue: 38200, target: 34000 },
  { month: "Apr", revenue: 36500, target: 36000 },
  { month: "May", revenue: 40100, target: 38000 },
  { month: "Jun", revenue: 42850, target: 40000 },
]

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Analytics</CardTitle>
        <CardDescription>Monthly revenue vs target</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            revenue: {
              label: "Revenue",
              color: "hsl(var(--chart-1))",
            },
            target: {
              label: "Target",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
              <YAxis tickFormatter={(value) => `$${value / 1000}k`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="revenue"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                stroke="var(--color-revenue)"
              />
              <Line
                type="monotone"
                dataKey="target"
                strokeWidth={2}
                strokeDasharray="5 5"
                activeDot={{ r: 6, strokeWidth: 0 }}
                stroke="var(--color-target)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

