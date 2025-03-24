"use client"

import { Badge } from "@/components/ui/badge"
import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FileText,
  Upload,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Video,
  Globe,
  CreditCard,
  Lock,
  AlertTriangle,
  Apple,
  ShoppingCartIcon as PaypalIcon,
  Shield,
} from "lucide-react"
import Link from "next/link"
import { useRegion, type RegionCode, regions } from "@/contexts/region-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { usePaymentProcessor } from "@/hooks/use-payment-processor"

export function SubmissionForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [includeConsultation, setIncludeConsultation] = useState(false)
  const [selectedUrgency, setSelectedUrgency] = useState("standard")
  const [selectedDoctorRegion, setSelectedDoctorRegion] = useState<RegionCode | null>(null)
  const [isPaymentComplete, setIsPaymentComplete] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "applepay">("card")
  const [paymentDetails, setPaymentDetails] = useState<{
    transactionId?: string
    paymentProvider?: string
    lastFour?: string
    timestamp?: string
  }>({})
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formValues, setFormValues] = useState({
    specialty: "",
    title: "",
    condition: "",
    symptoms: "",
    questions: "",
    paymentMethod: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    nameOnCard: "",
    billingAddress: "",
    city: "",
    zip: "",
    agreeToTerms: false,
    consentToShare: false,
  })
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: number; type: string }[]>([])

  // Add these state variables to the existing state declarations at the top of the component
  const [otherSpecialty, setOtherSpecialty] = useState("")
  const [otherLanguage, setOtherLanguage] = useState("")
  const [otherMedicalHistory, setOtherMedicalHistory] = useState("")
  const [showOtherSpecialty, setShowOtherSpecialty] = useState(false)
  const [showOtherLanguage, setShowOtherLanguage] = useState(false)
  const [showOtherMedicalHistory, setShowOtherMedicalHistory] = useState(false)

  const router = useRouter()
  // This would be a real payment processor hook in a production app
  const { processPayment, isAvailable } = usePaymentProcessor()

  // Get review options from URL parameters
  const searchParams = useSearchParams()
  const reviewOption = searchParams.get("reviewOption") || "single"
  const reviewCount = Number.parseInt(searchParams.get("reviewCount") || "1")

  const { currentRegion, availableRegions, formatPrice } = useRegion()

  // Check if Apple Pay is available on this device
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false)

  useEffect(() => {
    // In a real app, this would check if Apple Pay is available on the device
    // For this demo, we'll simulate it being available
    setIsApplePayAvailable(true)

    // In production, you would use something like:
    // if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
    //   setIsApplePayAvailable(true)
    // }
  }, [])

  const handleNextStep = () => {
    // Validate current step before proceeding
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, 5))
    }
  }

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  // Modify the validateCurrentStep function to validate the "Other" inputs
  const validateCurrentStep = () => {
    const errors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!formValues.specialty) errors.specialty = "Please select a specialty"
      if (formValues.specialty === "other" && !otherSpecialty) errors.otherSpecialty = "Please specify the specialty"
      if (!formValues.title) errors.title = "Please enter a case title"
    } else if (currentStep === 2) {
      if (!formValues.condition) errors.condition = "Please enter your primary condition"
      if (!formValues.symptoms) errors.symptoms = "Please describe your symptoms"
      if (!formValues.questions) errors.questions = "Please enter your questions for the specialist"
    } else if (currentStep === 3) {
      if (uploadedFiles.length === 0) errors.files = "Please upload at least one medical record"
    } else if (currentStep === 4) {
      if (!paymentMethod) errors.paymentMethod = "Please select a payment method"

      if (paymentMethod === "card") {
        if (!formValues.cardNumber) errors.cardNumber = "Please enter your card number"
        if (!formValues.cardExpiry) errors.cardExpiry = "Please enter the expiry date"
        if (!formValues.cardCvc) errors.cardCvc = "Please enter the CVC"
        if (!formValues.nameOnCard) errors.nameOnCard = "Please enter the name on the card"
        if (!formValues.billingAddress) errors.billingAddress = "Please enter your billing address"
        if (!formValues.city) errors.city = "Please enter your city"
        if (!formValues.zip) errors.zip = "Please enter your ZIP/postal code"
      }
    } else if (currentStep === 5) {
      if (!formValues.agreeToTerms) errors.agreeToTerms = "You must agree to the terms of service"
      if (!formValues.consentToShare) errors.consentToShare = "You must consent to share your medical information"
      if (!isPaymentComplete) errors.payment = "Payment must be completed before submission"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Modify the handleInputChange function to handle the "Other" selections
  const handleInputChange = (field: string, value: any) => {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Handle "Other" selections
    if (field === "specialty" && value === "other") {
      setShowOtherSpecialty(true)
    } else if (field === "specialty" && value !== "other") {
      setShowOtherSpecialty(false)
    }

    // Clear error for this field if it exists
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
      }))

      setUploadedFiles((prev) => [...prev, ...newFiles])

      // Clear file upload error if it exists
      if (formErrors.files) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.files
          return newErrors
        })
      }
    }
  }

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.name !== fileName))
  }

  const handlePayment = async () => {
    if (!validateCurrentStep()) {
      return
    }

    setIsProcessingPayment(true)

    try {
      // In a real app, this would call your payment processor API
      // For this demo, we'll simulate a successful payment after a delay

      // This is where you would integrate with a payment gateway like Stripe, PayPal, or Apple Pay
      // Example of how this would work in production:

      /*
      // 1. Create a payment intent on your server
      const { clientSecret } = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          amount: pricing.total,
          currency: currentRegion.currency,
          paymentMethod: paymentMethod
        })
      }).then(res => res.json());
      
      // 2. Confirm the payment with the selected payment method
      let paymentResult;
      
      if (paymentMethod === 'card') {
        paymentResult = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: formValues.nameOnCard,
              address: {
                line1: formValues.billingAddress,
                city: formValues.city,
                postal_code: formValues.zip
              }
            }
          }
        });
      } else if (paymentMethod === 'paypal') {
        // Handle PayPal payment flow
        paymentResult = await paypalInstance.tokenizePayment(data);
      } else if (paymentMethod === 'applepay') {
        // Handle Apple Pay payment flow
        paymentResult = await applePaySession.completePayment();
      }
      
      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }
      
      // 3. Verify the payment was successful
      const { success, transactionId } = await fetch('/api/verify-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentIntentId: paymentResult.paymentIntent.id })
      }).then(res => res.json());
      
      if (!success) {
        throw new Error('Payment verification failed');
      }
      */

      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Simulate successful payment
      const mockTransactionData = {
        transactionId: `TX-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        paymentProvider: paymentMethod === "card" ? "Credit Card" : paymentMethod === "paypal" ? "PayPal" : "Apple Pay",
        lastFour: paymentMethod === "card" ? "4242" : "",
        timestamp: new Date().toISOString(),
      }

      setPaymentDetails(mockTransactionData)
      setIsPaymentComplete(true)

      // Auto-advance to final review step
      setCurrentStep(5)
    } catch (error) {
      console.error("Payment failed:", error)
      setFormErrors({
        ...formErrors,
        payment: "Payment processing failed. Please try again.",
      })
    } finally {
      setIsProcessingPayment(false)
    }
  }

  // Update the handleSubmit function to include the "Other" values in the submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Final validation before submission
    if (!validateCurrentStep()) {
      return
    }

    // Ensure payment is complete
    if (!isPaymentComplete) {
      setFormErrors({
        ...formErrors,
        payment: "Payment must be completed before submission",
      })
      return
    }

    // In a real app, this would submit the form data to your backend
    // For this demo, we'll simulate a successful submission after a delay

    /*
    // Example of how this would work in production:
    try {
      const response = await fetch('/api/submit-second-opinion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientInfo: {
            // Patient info from auth context or form
          },
          caseDetails: {
            specialty: formValues.specialty === "other" ? otherSpecialty : formValues.specialty,
            title: formValues.title,
            condition: formValues.condition,
            symptoms: formValues.symptoms,
            questions: formValues.questions,
            // Other case details
          },
          reviewOptions: {
            reviewType: reviewOption,
            reviewCount: reviewCount,
            urgency: selectedUrgency,
            includeConsultation: includeConsultation,
            doctorRegion: selectedDoctorRegion,
            preferredLanguage: showOtherLanguage ? otherLanguage : null
          },
          medicalHistory: {
            other: showOtherMedicalHistory ? otherMedicalHistory : null,
            // Other medical history fields
          },
          paymentDetails: {
            transactionId: paymentDetails.transactionId,
            amount: pricing.total,
            currency: currentRegion.currency,
            paymentMethod: paymentMethod
          }
        })
      });
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Submission failed');
      }
      
      // Handle successful submission
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission failed:', error);
      // Handle submission error
    }
    */

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
    }, 1500)
  }

  // Calculate pricing based on region, options, and review count
  const calculatePricing = () => {
    // Use the selected doctor region or default to current region
    const region = selectedDoctorRegion ? regions[selectedDoctorRegion] : currentRegion

    // Base pricing for different review options
    const reviewPricing = {
      single: 299,
      multiple: {
        2: 499,
        3: 699,
        4: 899,
        5: 1099,
      },
    }

    // Get base price based on review option and count
    let basePrice = 0
    if (reviewOption === "single") {
      basePrice = reviewPricing.single
    } else {
      // Ensure reviewCount is within valid range (2-5)
      const count = Math.min(Math.max(reviewCount, 2), 5) as 2 | 3 | 4 | 5
      basePrice = reviewPricing.multiple[count]
    }

    // Apply regional pricing adjustment if needed
    if (selectedDoctorRegion && selectedDoctorRegion !== currentRegion.code) {
      // Add cross-border fee (10% for example)
      basePrice = basePrice * 1.1
    }

    const consultationPrice = includeConsultation ? region.baseServicePricing.videoConsultation : 0
    const urgencyFee =
      selectedUrgency === "expedited"
        ? region.baseServicePricing.expeditedFee
        : selectedUrgency === "urgent"
          ? region.baseServicePricing.urgentFee
          : 0

    return {
      basePrice,
      consultationPrice,
      urgencyFee,
      total: basePrice + consultationPrice + urgencyFee,
    }
  }

  const pricing = calculatePricing()

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB"
    else return (bytes / 1048576).toFixed(1) + " MB"
  }

  // Render the submitted state
  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center text-center py-10">
            <div className="rounded-full bg-green-100 p-4 mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Request Submitted Successfully</h2>
            <p className="text-muted-foreground max-w-md mb-6">
              Your second opinion request has been submitted. Our team will review your information and assign a
              specialist to your case.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg w-full max-w-md mb-6">
              <h3 className="text-sm font-semibold mb-2">Request Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Case ID:</span>
                  <span className="font-medium">CASE-1241</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Submitted:</span>
                  <span>Mar 19, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Expected Completion:</span>
                  <span>Mar 22, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Review Type:</span>
                  <span>{reviewOption === "single" ? "Single Specialist" : `${reviewCount} Specialists`}</span>
                </div>
                {selectedDoctorRegion && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor Region:</span>
                    <span>{regions[selectedDoctorRegion].name}</span>
                  </div>
                )}
                {includeConsultation && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Video Consultation:</span>
                    <span>To be scheduled after written opinion</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status:</span>
                  <span className="text-green-600 font-medium">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount:</span>
                  <span>{formatPrice(pricing.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Transaction ID:</span>
                  <span className="font-mono text-xs">{paymentDetails.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method:</span>
                  <span>{paymentDetails.paymentProvider}</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/patient/cases">View My Cases</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/patient/dashboard">Return to Dashboard</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm font-medium">Step {currentStep} of 5</div>
          <div className="text-sm text-muted-foreground">
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Medical Details"}
            {currentStep === 3 && "Upload Documents"}
            {currentStep === 4 && "Payment"}
            {currentStep === 5 && "Review & Submit"}
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / 5) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            {currentStep === 1 && "Basic Information"}
            {currentStep === 2 && "Medical Details"}
            {currentStep === 3 && "Upload Documents"}
            {currentStep === 4 && "Payment"}
            {currentStep === 5 && "Review & Submit"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Provide general information about your request"}
            {currentStep === 2 && "Tell us about your medical condition"}
            {currentStep === 3 && "Upload relevant medical records"}
            {currentStep === 4 && "Complete payment for your second opinion"}
            {currentStep === 5 && "Review your information before submitting"}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-700">Selected Review Package</h4>
                      <p className="text-sm text-blue-600">
                        {reviewOption === "single" ? "Single Specialist Review" : `${reviewCount} Specialist Reviews`} -
                        {formatPrice(pricing.basePrice)}
                      </p>
                      <p className="text-xs text-blue-600 mt-1">
                        You can change your review package in the final step if needed.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialty" className="flex items-center">
                    Medical Specialty <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select value={formValues.specialty} onValueChange={(value) => handleInputChange("specialty", value)}>
                    <SelectTrigger id="specialty" className={formErrors.specialty ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="neurology">Neurology</SelectItem>
                      <SelectItem value="oncology">Oncology</SelectItem>
                      <SelectItem value="orthopedics">Orthopedics</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="endocrinology">Endocrinology</SelectItem>
                      <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formErrors.specialty && <p className="text-sm text-red-500">{formErrors.specialty}</p>}

                  {showOtherSpecialty && (
                    <div className="mt-2">
                      <Label htmlFor="other-specialty" className="flex items-center">
                        Please specify specialty <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="other-specialty"
                        placeholder="Enter specialty"
                        value={otherSpecialty}
                        onChange={(e) => setOtherSpecialty(e.target.value)}
                        className={formErrors.otherSpecialty ? "border-red-500" : ""}
                      />
                      {formErrors.otherSpecialty && <p className="text-sm text-red-500">{formErrors.otherSpecialty}</p>}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doctor-region">Doctor Region Preference</Label>
                  <Select
                    value={selectedDoctorRegion || undefined}
                    onValueChange={(value) => setSelectedDoctorRegion(value as RegionCode)}
                  >
                    <SelectTrigger id="doctor-region">
                      <SelectValue placeholder="Select preferred region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No preference (your region: {currentRegion.name})</SelectItem>
                      {availableRegions.map((region) => (
                        <SelectItem key={region.code} value={region.code}>
                          {region.name} {region.code !== currentRegion.code && "(Cross-border)"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    You can only select regions that are available based on cross-border regulations for your current
                    region ({currentRegion.name})
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center">
                    Case Title <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Atrial Fibrillation Consultation"
                    value={formValues.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={formErrors.title ? "border-red-500" : ""}
                  />
                  {formErrors.title && <p className="text-sm text-red-500">{formErrors.title}</p>}
                  <p className="text-xs text-muted-foreground">A brief title for your second opinion request</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency Level</Label>
                  <RadioGroup defaultValue="standard" value={selectedUrgency} onValueChange={setSelectedUrgency}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard (48-72 hours)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="expedited" id="expedited" />
                      <Label htmlFor="expedited">Expedited (24-48 hours, +{formatPrice(pricing.urgencyFee)})</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="urgent" id="urgent" />
                      <Label htmlFor="urgent">Urgent (24 hours, +{formatPrice(pricing.urgencyFee)})</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="video-consultation"
                      checked={includeConsultation}
                      onCheckedChange={(checked) => setIncludeConsultation(checked as boolean)}
                    />
                    <div>
                      <Label htmlFor="video-consultation" className="text-base">
                        Include Video Consultation
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Schedule a follow-up video call with the specialist after receiving your written opinion
                      </p>
                    </div>
                  </div>
                </div>

                {includeConsultation && (
                  <div className="space-y-4 pl-6 mt-2">
                    <div className="flex gap-2 items-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Video className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        We'll match you with specialists who offer video consultations. Additional fees will apply based
                        on the specialist's hourly rate.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="preferred-language">Preferred Language</Label>
                      <Select
                        onValueChange={(value) => {
                          if (value === "other") {
                            setShowOtherLanguage(true)
                          } else {
                            setShowOtherLanguage(false)
                          }
                        }}
                      >
                        <SelectTrigger id="preferred-language">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="mandarin">Mandarin</SelectItem>
                          <SelectItem value="arabic">Arabic</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>

                      {showOtherLanguage && (
                        <div className="mt-2">
                          <Label htmlFor="other-language">Please specify language</Label>
                          <Input
                            id="other-language"
                            placeholder="Enter language"
                            value={otherLanguage}
                            onChange={(e) => setOtherLanguage(e.target.value)}
                          />
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="consultation-notes">Additional Notes for Consultation</Label>
                      <Textarea
                        id="consultation-notes"
                        placeholder="Specific topics or questions you'd like to discuss during the video consultation"
                        rows={2}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {currentStep === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="condition" className="flex items-center">
                    Primary Condition <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="condition"
                    placeholder="e.g., Atrial Fibrillation, Chronic Migraine"
                    value={formValues.condition}
                    onChange={(e) => handleInputChange("condition", e.target.value)}
                    className={formErrors.condition ? "border-red-500" : ""}
                  />
                  {formErrors.condition && <p className="text-sm text-red-500">{formErrors.condition}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="symptoms" className="flex items-center">
                    Symptoms <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms, including when they started and their severity"
                    rows={3}
                    value={formValues.symptoms}
                    onChange={(e) => handleInputChange("symptoms", e.target.value)}
                    className={formErrors.symptoms ? "border-red-500" : ""}
                  />
                  {formErrors.symptoms && <p className="text-sm text-red-500">{formErrors.symptoms}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="diagnosis">Current Diagnosis (if any)</Label>
                  <Input id="diagnosis" placeholder="e.g., Paroxysmal Atrial Fibrillation" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="treatments">Current Treatments</Label>
                  <Textarea
                    id="treatments"
                    placeholder="List any medications, therapies, or procedures you're currently undergoing"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="questions" className="flex items-center">
                    Specific Questions <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Textarea
                    id="questions"
                    placeholder="What specific questions do you have for the specialist?"
                    rows={3}
                    value={formValues.questions}
                    onChange={(e) => handleInputChange("questions", e.target.value)}
                    className={formErrors.questions ? "border-red-500" : ""}
                  />
                  {formErrors.questions && <p className="text-sm text-red-500">{formErrors.questions}</p>}
                  <p className="text-xs text-muted-foreground">
                    Being specific helps the specialist provide more targeted advice
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Medical History</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="diabetes" />
                      <Label htmlFor="diabetes" className="font-normal">
                        Diabetes
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hypertension" />
                      <Label htmlFor="hypertension" className="font-normal">
                        Hypertension
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="heart-disease" />
                      <Label htmlFor="heart-disease" className="font-normal">
                        Heart Disease
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cancer" />
                      <Label htmlFor="cancer" className="font-normal">
                        Cancer
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="other"
                        checked={showOtherMedicalHistory}
                        onCheckedChange={(checked) => setShowOtherMedicalHistory(checked as boolean)}
                      />
                      <Label htmlFor="other" className="font-normal">
                        Other
                      </Label>
                    </div>

                    {showOtherMedicalHistory && (
                      <div className="mt-2 pl-6">
                        <Label htmlFor="other-medical-history">Please specify condition</Label>
                        <Input
                          id="other-medical-history"
                          placeholder="Enter medical condition"
                          value={otherMedicalHistory}
                          onChange={(e) => setOtherMedicalHistory(e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700">Important Note</h4>
                        <p className="text-sm text-blue-600">
                          Please upload all relevant medical records to help the specialist provide the most accurate
                          opinion. This includes test results, imaging studies, and doctor's notes.
                        </p>
                      </div>
                    </div>
                  </div>

                  {formErrors.files && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>{formErrors.files}</AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="medical-records" className="flex items-center">
                      Medical Records <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center ${formErrors.files ? "border-red-500" : ""}`}
                    >
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <h4 className="font-medium">Upload Medical Records</h4>
                      <p className="text-sm text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
                      <Input id="medical-records" type="file" className="hidden" multiple onChange={handleFileUpload} />
                      <Button variant="outline" onClick={() => document.getElementById("medical-records")?.click()}>
                        Select Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Accepted formats: PDF, JPG, PNG, DICOM (max 50MB per file)
                      </p>
                    </div>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label>Uploaded Files</Label>
                      <div className="space-y-2 border rounded-md p-3">
                        {uploadedFiles.map((file, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between border-b last:border-b-0 pb-2 last:pb-0"
                          >
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {file.type.split("/")[1].toUpperCase()} • {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(file.name)}>
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="imaging-studies">Imaging Studies (if applicable)</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <h4 className="font-medium">Upload Imaging Studies</h4>
                      <p className="text-sm text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
                      <Input id="imaging-studies" type="file" className="hidden" multiple onChange={handleFileUpload} />
                      <Button variant="outline" onClick={() => document.getElementById("imaging-studies")?.click()}>
                        Select Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-4">
                        Accepted formats: DICOM, JPG, PNG, PDF (max 100MB per file)
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
                    <Textarea
                      id="additional-notes"
                      placeholder="Any additional information about the uploaded documents"
                      rows={3}
                    />
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3">
                      <Lock className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-700">Secure Payment</h4>
                        <p className="text-sm text-blue-600">
                          Your payment information is encrypted and secure. You will not be charged until you submit
                          your request.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Payment Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {reviewOption === "single" ? "Single Specialist Review" : `${reviewCount} Specialist Reviews`}
                        </span>
                        <span>{formatPrice(pricing.basePrice)}</span>
                      </div>

                      {selectedUrgency !== "standard" && (
                        <div className="flex justify-between text-sm">
                          <span>{selectedUrgency === "expedited" ? "Expedited" : "Urgent"} Fee</span>
                          <span>{formatPrice(pricing.urgencyFee)}</span>
                        </div>
                      )}

                      {includeConsultation && (
                        <div className="flex justify-between text-sm">
                          <span>Video Consultation (Est. 30 min)</span>
                          <span>{formatPrice(pricing.consultationPrice)}</span>
                        </div>
                      )}

                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(pricing.total)}</span>
                      </div>

                      {selectedDoctorRegion && selectedDoctorRegion !== currentRegion.code && (
                        <div className="text-xs text-muted-foreground mt-2">
                          * Cross-border pricing applies based on the selected doctor region
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="payment-method" className="flex items-center">
                      Payment Method <span className="text-red-500 ml-1">*</span>
                    </Label>
                    <Tabs
                      defaultValue="card"
                      value={paymentMethod}
                      onValueChange={(value) => setPaymentMethod(value as "card" | "paypal" | "applepay")}
                    >
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="card" className="flex items-center justify-center gap-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Card</span>
                        </TabsTrigger>
                        <TabsTrigger value="paypal" className="flex items-center justify-center gap-2">
                          <PaypalIcon className="h-4 w-4" />
                          <span>PayPal</span>
                        </TabsTrigger>
                        <TabsTrigger
                          value="applepay"
                          disabled={!isApplePayAvailable}
                          className="flex items-center justify-center gap-2"
                        >
                          <Apple className="h-4 w-4" />
                          <span>Apple Pay</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="card-number" className="flex items-center">
                            Card Number <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <div className="flex">
                            <Input
                              id="card-number"
                              placeholder="1234 5678 9012 3456"
                              className="flex-1"
                              value={formValues.cardNumber}
                              onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            />
                            <div className="flex items-center ml-2 space-x-1">
                              <CreditCard className="h-4 w-4 text-muted-foreground" />
                            </div>
                          </div>
                          {formErrors.cardNumber && <p className="text-sm text-red-500">{formErrors.cardNumber}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry" className="flex items-center">
                              Expiry Date <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="expiry"
                              placeholder="MM/YY"
                              value={formValues.cardExpiry}
                              onChange={(e) => handleInputChange("cardExpiry", e.target.value)}
                            />
                            {formErrors.cardExpiry && <p className="text-sm text-red-500">{formErrors.cardExpiry}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc" className="flex items-center">
                              CVC <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              value={formValues.cardCvc}
                              onChange={(e) => handleInputChange("cardCvc", e.target.value)}
                            />
                            {formErrors.cardCvc && <p className="text-sm text-red-500">{formErrors.cardCvc}</p>}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="name-on-card" className="flex items-center">
                            Name on Card <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="name-on-card"
                            placeholder="John Smith"
                            value={formValues.nameOnCard}
                            onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                          />
                          {formErrors.nameOnCard && <p className="text-sm text-red-500">{formErrors.nameOnCard}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billing-address" className="flex items-center">
                            Billing Address <span className="text-red-500 ml-1">*</span>
                          </Label>
                          <Input
                            id="billing-address"
                            placeholder="Street Address"
                            value={formValues.billingAddress}
                            onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                          />
                          {formErrors.billingAddress && (
                            <p className="text-sm text-red-500">{formErrors.billingAddress}</p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city" className="flex items-center">
                              City <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="city"
                              placeholder="City"
                              value={formValues.city}
                              onChange={(e) => handleInputChange("city", e.target.value)}
                            />
                            {formErrors.city && <p className="text-sm text-red-500">{formErrors.city}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zip" className="flex items-center">
                              ZIP/Postal Code <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                              id="zip"
                              placeholder="12345"
                              value={formValues.zip}
                              onChange={(e) => handleInputChange("zip", e.target.value)}
                            />
                            {formErrors.zip && <p className="text-sm text-red-500">{formErrors.zip}</p>}
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="paypal" className="pt-4">
                        <div className="text-center py-8">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                            <p className="text-sm text-blue-700">
                              You will be redirected to PayPal to complete your payment securely. After payment, you'll
                              return to this page to finalize your submission.
                            </p>
                          </div>
                          <Button className="w-full" onClick={handlePayment} disabled={isProcessingPayment}>
                            {isProcessingPayment ? (
                              <span className="flex items-center">Processing...</span>
                            ) : (
                              <span className="flex items-center">
                                <PaypalIcon className="mr-2 h-4 w-4" />
                                Continue with PayPal
                              </span>
                            )}
                          </Button>
                        </div>
                      </TabsContent>

                      <TabsContent value="applepay" className="pt-4">
                        <div className="text-center py-8">
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
                            <p className="text-sm text-blue-700">
                              Click the Apple Pay button below to complete your payment securely using your Apple Pay
                              wallet.
                            </p>
                          </div>
                          <Button
                            className="w-full bg-black hover:bg-black/90"
                            onClick={handlePayment}
                            disabled={isProcessingPayment}
                          >
                            {isProcessingPayment ? (
                              <span className="flex items-center">Processing...</span>
                            ) : (
                              <span className="flex items-center">
                                <Apple className="mr-2 h-4 w-4" />
                                Pay with Apple Pay
                              </span>
                            )}
                          </Button>
                          <p className="text-xs text-muted-foreground mt-4">
                            Apple Pay is only available on compatible Apple devices with Apple Pay set up.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>

                    {formErrors.paymentMethod && <p className="text-sm text-red-500">{formErrors.paymentMethod}</p>}
                  </div>

                  {paymentMethod === "card" && (
                    <Button
                      type="button"
                      className="w-full"
                      onClick={handlePayment}
                      disabled={isProcessingPayment || isPaymentComplete}
                    >
                      {isProcessingPayment ? (
                        <span className="flex items-center">Processing...</span>
                      ) : isPaymentComplete ? (
                        <span className="flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Payment Complete
                        </span>
                      ) : (
                        <span className="flex items-center">
                          <Lock className="mr-2 h-4 w-4" />
                          Pay {formatPrice(pricing.total)}
                        </span>
                      )}
                    </Button>
                  )}

                  {isPaymentComplete && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700">
                        Payment processed successfully. Please review your information before final submission.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium mb-2">How Payment Processing Works</h3>
                    <p className="text-sm text-muted-foreground">
                      Your payment is securely processed through our payment gateway. We use industry-standard
                      encryption to protect your financial information. Your card details are never stored on our
                      servers.
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Verified by Visa</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">SSL Encrypted</span>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className="space-y-4">
                  {!isPaymentComplete && (
                    <Alert variant="destructive">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>Payment must be completed before submitting your request.</AlertDescription>
                    </Alert>
                  )}

                  {isPaymentComplete && (
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-700 flex items-center justify-between">
                        <span>Payment complete via {paymentDetails.paymentProvider}</span>
                        <span className="text-xs font-mono">{paymentDetails.transactionId}</span>
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Request Summary</h3>
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="text-muted-foreground">Specialty:</div>
                        <div>
                          {formValues.specialty === "other"
                            ? `Other: ${otherSpecialty}`
                            : formValues.specialty || "Not specified"}
                        </div>

                        <div className="text-muted-foreground">Case Title:</div>
                        <div>{formValues.title || "Not specified"}</div>

                        <div className="text-muted-foreground">Urgency Level:</div>
                        <div>
                          {selectedUrgency === "standard" && "Standard (48-72 hours)"}
                          {selectedUrgency === "expedited" && "Expedited (24-48 hours)"}
                          {selectedUrgency === "urgent" && "Urgent (24 hours)"}
                        </div>

                        <div className="text-muted-foreground">Primary Condition:</div>
                        <div>{formValues.condition || "Not specified"}</div>

                        <div className="text-muted-foreground">Video Consultation:</div>
                        <div>{includeConsultation ? "Yes" : "No"}</div>

                        {includeConsultation && showOtherLanguage && otherLanguage && (
                          <>
                            <div className="text-muted-foreground">Preferred Language:</div>
                            <div>Other: {otherLanguage}</div>
                          </>
                        )}

                        <div className="text-muted-foreground">Review Type:</div>
                        <div>{reviewOption === "single" ? "Single Specialist" : `${reviewCount} Specialists`}</div>

                        {selectedDoctorRegion && (
                          <>
                            <div className="text-muted-foreground">Doctor Region:</div>
                            <div className="flex items-center gap-1">
                              <Globe className="h-3.5 w-3.5" />
                              {regions[selectedDoctorRegion].name}
                              {selectedDoctorRegion !== currentRegion.code && (
                                <Badge variant="outline" className="ml-1 text-xs">
                                  Cross-border
                                </Badge>
                              )}
                            </div>
                          </>
                        )}

                        {showOtherMedicalHistory && otherMedicalHistory && (
                          <>
                            <div className="text-muted-foreground">Other Medical History:</div>
                            <div>{otherMedicalHistory}</div>
                          </>
                        )}

                        <div className="text-muted-foreground">Payment Status:</div>
                        <div className={isPaymentComplete ? "text-green-600 font-medium" : "text-red-500"}>
                          {isPaymentComplete ? "Paid" : "Not Paid"}
                        </div>

                        {isPaymentComplete && (
                          <>
                            <div className="text-muted-foreground">Payment Method:</div>
                            <div>{paymentDetails.paymentProvider}</div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Uploaded Documents</h3>
                    <div className="space-y-2">
                      {uploadedFiles.length > 0 ? (
                        uploadedFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between border p-2 rounded-lg">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-primary" />
                              <div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {file.type.split("/")[1].toUpperCase()} • {formatFileSize(file.size)}
                                </p>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" onClick={() => handleRemoveFile(file.name)}>
                              Remove
                            </Button>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-red-500">
                          No files uploaded. Please go back and upload your medical records.
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Payment Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>
                          {reviewOption === "single" ? "Single Specialist Review" : `${reviewCount} Specialist Reviews`}
                        </span>
                        <span>{formatPrice(pricing.basePrice)}</span>
                      </div>

                      {selectedUrgency !== "standard" && (
                        <div className="flex justify-between text-sm">
                          <span>{selectedUrgency === "expedited" ? "Expedited" : "Urgent"} Fee</span>
                          <span>{formatPrice(pricing.urgencyFee)}</span>
                        </div>
                      )}

                      {includeConsultation && (
                        <div className="flex justify-between text-sm">
                          <span>Video Consultation (Est. 30 min)</span>
                          <span>{formatPrice(pricing.consultationPrice)}</span>
                        </div>
                      )}

                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total</span>
                        <span>{formatPrice(pricing.total)}</span>
                      </div>

                      {selectedDoctorRegion && selectedDoctorRegion !== currentRegion.code && (
                        <div className="text-xs text-muted-foreground mt-2">
                          * Cross-border pricing applies based on the selected doctor region
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formValues.agreeToTerms}
                      onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked === true)}
                      className={formErrors.agreeToTerms ? "border-red-500" : ""}
                    />
                    <Label
                      htmlFor="terms"
                      className={`font-normal text-sm ${formErrors.agreeToTerms ? "text-red-500" : ""}`}
                    >
                      I agree to the{" "}
                      <Link href="#" className="text-primary hover:underline">
                        terms of service
                      </Link>{" "}
                      and{" "}
                      <Link href="#" className="text-primary hover:underline">
                        privacy policy
                      </Link>{" "}
                      <span className="text-red-500 ml-1">*</span>
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consent"
                      checked={formValues.consentToShare}
                      onCheckedChange={(checked) => handleInputChange("consentToShare", checked === true)}
                      className={formErrors.consentToShare ? "border-red-500" : ""}
                    />
                    <Label
                      htmlFor="consent"
                      className={`font-normal text-sm ${formErrors.consentToShare ? "text-red-500" : ""}`}
                    >
                      I consent to sharing my medical information with the specialist for the purpose of obtaining a
                      second opinion <span className="text-red-500 ml-1">*</span>
                    </Label>
                  </div>

                  {formErrors.payment && <p className="text-sm text-red-500">{formErrors.payment}</p>}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            {currentStep > 1 ? (
              <Button type="button" variant="outline" onClick={handlePrevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            ) : (
              <Button type="button" variant="outline" asChild>
                <Link href="/patient/dashboard">Cancel</Link>
              </Button>
            )}

            {currentStep < 5 ? (
              <Button type="button" onClick={handleNextStep}>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={!isPaymentComplete}>
                Submit Request
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

