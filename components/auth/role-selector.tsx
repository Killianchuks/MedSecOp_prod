"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { UserRound, UserCog } from "lucide-react"
import Link from "next/link"

export function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<"patient" | "doctor" | null>(null)

  return (
    <div className="max-w-md w-full mx-auto">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Choose Your Role</CardTitle>
          <CardDescription>Select how you want to use MedSecOp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                selectedRole === "patient"
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedRole("patient")}
            >
              <UserRound className="h-10 w-10 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Patient</h3>
              <p className="text-sm text-gray-500">Get a second opinion</p>
            </div>
            <div
              className={`border rounded-lg p-4 text-center cursor-pointer transition-all ${
                selectedRole === "doctor"
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
              }`}
              onClick={() => setSelectedRole("doctor")}
            >
              <UserCog className="h-10 w-10 mx-auto mb-2 text-primary" />
              <h3 className="font-medium">Doctor</h3>
              <p className="text-sm text-gray-500">Provide expert opinions</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={!selectedRole} asChild>
            <Link href={selectedRole === "patient" ? "/auth/patient/login" : "/auth/doctor/login"}>Continue</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

