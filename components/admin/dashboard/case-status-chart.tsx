"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { name: "Jan", unassigned: 18, inProgress: 42, completed: 65 },
  { name: "Feb", unassigned: 15, inProgress: 38, completed: 58 },
  { name: "Mar", unassigned: 20, inProgress: 45, completed: 70 },
  { name: "Apr", unassigned: 22, inProgress: 48, completed: 72 },
  { name: "May", unassigned: 16, inProgress: 40, completed: 68 },
  { name: "Jun", unassigned: 19, inProgress: 46, completed: 75 },
]

export function CaseStatusChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Status Breakdown</CardTitle>
        <CardDescription>Monthly distribution of cases by status</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            unassigned: {
              label: "Unassigned",
              color: "hsl(var(--chart-1))",
            },
            inProgress: {
              label: "In Progress",
              color: "hsl(var(--chart-2))",
            },
            completed: {
              label: "Completed",
              color: "hsl(var(--chart-3))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="unassigned" fill="var(--color-unassigned)" radius={[4, 4, 0, 0]} barSize={8} />
              <Bar dataKey="inProgress" fill="var(--color-inProgress)" radius={[4, 4, 0, 0]} barSize={8} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

