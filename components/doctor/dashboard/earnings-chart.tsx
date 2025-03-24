"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { month: "Jan", earnings: 1200 },
  { month: "Feb", earnings: 1800 },
  { month: "Mar", earnings: 2200 },
  { month: "Apr", earnings: 1700 },
  { month: "May", earnings: 2500 },
  { month: "Jun", earnings: 3200 },
  { month: "Jul", earnings: 2800 },
  { month: "Aug", earnings: 3500 },
  { month: "Sep", earnings: 3800 },
  { month: "Oct", earnings: 4200 },
  { month: "Nov", earnings: 3900 },
  { month: "Dec", earnings: 4550 },
]

export function EarningsChart() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Earnings Overview</CardTitle>
        <CardDescription>Your earnings over the past 12 months</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            earnings: {
              label: "Earnings",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
              <YAxis tickFormatter={(value) => `$${value}`} tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line
                type="monotone"
                dataKey="earnings"
                strokeWidth={2}
                activeDot={{ r: 6, strokeWidth: 0 }}
                stroke="var(--color-earnings)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

