"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ClipboardList, Building, Clock, CheckCircle } from "lucide-react"

export function ImageTransferWorkflow() {
  const steps = [
    {
      icon: ClipboardList,
      title: "Submit Request",
      description: "Fill out the request form with details about the medical facility and imaging exam.",
    },
    {
      icon: Building,
      title: "Facility Review",
      description: "The healthcare facility reviews your request and prepares your images.",
    },
    {
      icon: Clock,
      title: "Processing",
      description: "Your images are securely transferred to your patient portal account.",
    },
    {
      icon: CheckCircle,
      title: "Access Images",
      description: "Once approved, you can view and download your medical images.",
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-3 rounded-full mb-3 relative z-10">
                <step.icon className="h-6 w-6 text-primary" />
              </div>
              <h4 className="font-medium mb-1">{step.title}</h4>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}

          {/* Connecting line between steps */}
          <div className="hidden md:block absolute top-7 left-[25%] right-[25%] h-0.5 bg-muted z-0" />
        </div>
      </CardContent>
    </Card>
  )
}

