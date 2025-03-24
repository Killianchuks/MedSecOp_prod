"use client"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { UserIcon, Stethoscope } from "lucide-react"

interface RoleSelectionModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function RoleSelectionModal({ open, onOpenChange }: RoleSelectionModalProps) {
  const router = useRouter()

  const handleRoleSelect = (role: "patient" | "doctor") => {
    onOpenChange(false)

    // Navigate to the appropriate signup page based on role
    if (role === "patient") {
      router.push("/auth/patient/signup")
    } else {
      router.push("/auth/doctor/signup")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Join MedSecOp</DialogTitle>
          <DialogDescription className="text-center">Select how you would like to use our platform</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-auto py-6 hover:bg-blue-50"
            onClick={() => handleRoleSelect("patient")}
          >
            <UserIcon className="h-10 w-10 mb-2 text-blue-600" />
            <span className="text-lg font-medium">I&apos;m a Patient</span>
            <p className="text-xs text-gray-500 mt-2 font-normal">Seeking medical second opinions</p>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-auto py-6 hover:bg-blue-50"
            onClick={() => handleRoleSelect("doctor")}
          >
            <Stethoscope className="h-10 w-10 mb-2 text-blue-600" />
            <span className="text-lg font-medium">I&apos;m a Physician</span>
            <p className="text-xs text-gray-500 mt-2 font-normal">Providing expert consultations</p>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

