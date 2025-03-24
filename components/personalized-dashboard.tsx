"use client"

import { useEffect, useState } from "react"
import { useRegion } from "@/contexts/region-context"
import { UserRole } from "@/lib/auth"
import { getRoleContent, getRegionContent, type FeatureFlags, getFeatureFlags } from "@/lib/personalization"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { InfoIcon, BookOpenIcon, ArrowRightIcon, BellIcon, Settings2Icon } from "lucide-react"
import Link from "next/link"

interface PersonalizedDashboardProps {
  userId: string
  userRole: UserRole
  userName?: string
}

export function PersonalizedDashboard({ userId, userRole, userName }: PersonalizedDashboardProps) {
  const { currentRegion } = useRegion()
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags | null>(null)

  // Get personalized content based on role and region
  const roleContent = getRoleContent(userRole)
  const regionContent = getRegionContent(currentRegion)

  // Fetch feature flags
  useEffect(() => {
    const loadFeatureFlags = async () => {
      const flags = await getFeatureFlags(userId, userRole, currentRegion.code)
      setFeatureFlags(flags)
    }

    loadFeatureFlags()
  }, [userId, userRole, currentRegion.code])

  // Personalized greeting with user's name if available
  const greeting = userName ? `Hello, ${userName}! ${roleContent.welcomeMessage}` : roleContent.welcomeMessage

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">{roleContent.dashboardTitle}</CardTitle>
          <CardDescription className="text-base">{greeting}</CardDescription>
        </CardHeader>
        <CardContent>
          <Alert className="bg-muted">
            <InfoIcon className="h-4 w-4" />
            <AlertTitle>Region: {currentRegion.name}</AlertTitle>
            <AlertDescription>{regionContent.legalDisclaimer}</AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks for your role</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
            {roleContent.featuredActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto flex flex-col items-center justify-center p-4 gap-2"
              >
                <span>{action}</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personalized content tabs */}
      <Tabs defaultValue="tips">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tips">Tips & Advice</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="region">Regional Info</TabsTrigger>
        </TabsList>

        <TabsContent value="tips" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>
                Tips for{" "}
                {userRole === UserRole.PATIENT
                  ? "Patients"
                  : userRole === UserRole.DOCTOR
                    ? "Specialists"
                    : "Administrators"}
              </CardTitle>
              <CardDescription>Helpful advice for using the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {roleContent.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="mt-1 bg-primary rounded-full p-1 text-primary-foreground">
                      <InfoIcon className="h-3 w-3" />
                    </div>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Helpful Resources</CardTitle>
              <CardDescription>Guides and information to help you</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {roleContent.resources.map((resource, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4">
                      <CardTitle className="text-base">{resource.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0">
                      <Link href={resource.url} passHref>
                        <Button variant="ghost" size="sm" className="gap-1">
                          <BookOpenIcon className="h-4 w-4" />
                          Read More
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="region" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentRegion.name} Information</CardTitle>
              <CardDescription>Region-specific details and services</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Available Specialties</h4>
                <div className="flex flex-wrap gap-2">
                  {regionContent.availableSpecialties.map((specialty, index) => (
                    <span key={index} className="bg-muted px-2 py-1 rounded-md text-sm">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Service Pricing</h4>
                <p>Base price: {currentRegion.formatPrice(currentRegion.basePrice)}</p>
                <p>Second opinion: {currentRegion.formatPrice(currentRegion.baseServicePricing.secondOpinion)}</p>
                <p>
                  Video consultation: {currentRegion.formatPrice(currentRegion.baseServicePricing.videoConsultation)}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Support Contact</h4>
                <p>{regionContent.supportContact}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feature availability based on flags */}
      {featureFlags && (
        <Card>
          <CardHeader>
            <CardTitle>Available Features</CardTitle>
            <CardDescription>Features available in your region and role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {Object.entries(featureFlags).map(([key, enabled]) => (
                <div
                  key={key}
                  className={`flex items-center gap-2 p-2 rounded ${enabled ? "text-green-600" : "text-muted-foreground line-through"}`}
                >
                  <div className={`h-2 w-2 rounded-full ${enabled ? "bg-green-600" : "bg-muted-foreground"}`} />
                  <span>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex justify-between w-full">
              <Button variant="outline" size="sm" className="gap-1">
                <BellIcon className="h-4 w-4" />
                Notification Preferences
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings2Icon className="h-4 w-4" />
                Customize Dashboard
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

