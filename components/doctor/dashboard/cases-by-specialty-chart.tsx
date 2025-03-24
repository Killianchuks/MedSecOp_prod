"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"

const data = [
  { specialty: "Cardiology", completed: 32, pending: 5 },
  { specialty: "Oncology", completed: 27, pending: 3 },
  { specialty: "Neurology", completed: 18, pending: 2 },
  { specialty: "Orthopedics", completed: 23, pending: 4 },
  { specialty: "Gastroenterology", completed: 15, pending: 1 },
  { specialty: "Dermatology", completed: 12, pending: 2 },
  { specialty: "Endocrinology", completed: 9, pending: 1 },
]

export function CasesBySpecialtyChart() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Cases by Specialty</CardTitle>
        <CardDescription>Distribution of cases across medical specialties</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ChartContainer
          config={{
            completed: {
              label: "Completed",
              color: "hsl(var(--chart-1))",
            },
            pending: {
              label: "Pending",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="specialty" tickLine={false} axisLine={false} padding={{ left: 10, right: 10 }} />
              <YAxis tickLine={false} axisLine={false} tickMargin={10} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="completed" fill="var(--color-completed)" radius={[4, 4, 0, 0]} barSize={20} />
              <Bar dataKey="pending" fill="var(--color-pending)" radius={[4, 4, 0, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

