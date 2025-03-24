"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, Loader2 } from "lucide-react"
import Link from "next/link"
import { UserRole } from "@/lib/auth"

// Create a base schema for common fields
const baseSignupSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Password must contain at least one number" }),
  confirmPassword: z.string(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
  marketingOptIn: z.boolean().optional(),
})

// Doctor-specific schema with license number
const doctorSignupSchema = baseSignupSchema.extend({
  licenseNumber: z.string().min(1, { message: "License number is required" }),
})

// Patient schema (same as base schema)
const patientSignupSchema = baseSignupSchema

// Password match refinement function
const passwordMatchRefinement = (schema: any) =>
  schema.refine((data: any) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

// Apply refinement to both schemas
const patientSchema = passwordMatchRefinement(patientSignupSchema)
const doctorSchema = passwordMatchRefinement(doctorSignupSchema)

// Union type for form values
type SignupFormValues = z.infer<typeof patientSchema> & { licenseNumber?: string }

interface SignupFormProps {
  userType: "patient" | "doctor"
}

export function SignupForm({ userType }: SignupFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Get referral code from URL if present
  const referralCode = searchParams?.get("ref") || ""

  // Choose the appropriate schema based on user type
  const formSchema = userType === "doctor" ? doctorSchema : patientSchema

  // Default form values
  const defaultValues: Partial<SignupFormValues> = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    marketingOptIn: false,
    ...(userType === "doctor" ? { licenseNumber: "" } : {}),
  }

  // Initialize form
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Form submission handler
  const onSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true)
    setError(null)

    try {
      // Prepare user data
      const userData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        role: userType === "patient" ? UserRole.PATIENT : UserRole.DOCTOR,
        marketingOptIn: data.marketingOptIn || false,
        referralCode,
        ...(userType === "doctor" ? { licenseNumber: data.licenseNumber } : {}),
      }

      console.log("Submitting registration data:", { ...userData, password: "[REDACTED]" })

      // Send registration request - use the absolute URL to avoid path issues
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })

      console.log("Registration response status:", response.status, response.statusText)

      // Check if the response is ok before trying to parse JSON
      if (!response.ok) {
        let errorMessage = `Registration failed: ${response.status}`
        try {
          const errorData = await response.json()
          errorMessage = errorData.message || errorMessage
          console.error("Error details:", errorData)
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError)
          // Try to get the response text
          try {
            const text = await response.text()
            console.error("Response text:", text)
          } catch (textError) {
            console.error("Could not get response text:", textError)
          }
        }
        throw new Error(errorMessage)
      }

      // Parse the successful response
      const responseData = await response.json()
      console.log("Registration successful:", responseData)

      // Registration successful
      setSuccess(true)

      // Redirect to appropriate dashboard after a delay
      setTimeout(() => {
        router.push(userType === "patient" ? "/patient/dashboard" : "/doctor/dashboard")
      }, 2000)
    } catch (err: any) {
      console.error("Registration error:", err)
      setError(err.message || "An error occurred during registration")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Sign up as a {userType === "patient" ? "patient" : "doctor"} to get started with MedSecOp
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-4 bg-green-50 border-green-200">
            <InfoIcon className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">Registration successful!</AlertTitle>
            <AlertDescription className="text-green-700">
              Your account has been created. Redirecting you to the dashboard...
            </AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      First Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="John" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Last Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" required {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john.doe@example.com" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {userType === "doctor" && (
              <FormField
                control={form.control}
                name="licenseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Medical License Number <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="ML12345678" required {...field} />
                    </FormControl>
                    <FormDescription>Enter your valid medical license number for verification</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" required {...field} />
                  </FormControl>
                  <FormDescription>
                    Must be at least 8 characters with uppercase, lowercase, and numbers
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" required {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="termsAccepted"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} required />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      I accept the{" "}
                      <Link href="/legal/terms-of-service" className="text-blue-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/legal/privacy-policy" className="text-blue-600 hover:underline">
                        Privacy Policy
                      </Link>
                      <span className="text-red-500"> *</span>
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="marketingOptIn"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>I would like to receive updates about new features and services</FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href={userType === "patient" ? "/auth/patient/login" : "/auth/doctor/login"}
            className="text-blue-600 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

