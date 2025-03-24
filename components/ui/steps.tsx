import * as React from "react"
import { cn } from "@/lib/utils"

interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function Steps({ className, children, ...props }: StepsProps) {
  const childrenArray = React.Children.toArray(children)
  const steps = childrenArray.map((step, index) => {
    return React.cloneElement(step as React.ReactElement, {
      stepNumber: index + 1,
      isLastStep: index === childrenArray.length - 1,
    })
  })

  return (
    <div className={cn("space-y-0", className)} {...props}>
      {steps}
    </div>
  )
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  stepNumber?: number
  isLastStep?: boolean
}

export function Step({ className, stepNumber, isLastStep = false, children, ...props }: StepProps) {
  return (
    <div className={cn("relative", className)} {...props}>
      <div className="flex items-start">
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-primary bg-background z-10 relative">
          <span className="text-sm font-medium">{stepNumber}</span>
        </div>
        <div className="ml-4 pb-8 w-full">{children}</div>
      </div>
      {!isLastStep && <div className="absolute top-0 left-4 -ml-px h-full w-0.5 bg-primary/20" aria-hidden="true" />}
    </div>
  )
}

