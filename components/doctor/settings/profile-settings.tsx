"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

export function ProfileSettings() {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Dr. Profile" />
                  <AvatarFallback className="text-2xl">JS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="text-lg font-medium">Profile Photo</div>
                  <div className="text-sm text-muted-foreground">
                    This will be displayed on your profile and in reviews
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      Upload New Photo
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="Jane" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Smith" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="jane.smith@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Select defaultValue="cardiology" onValueChange={(value) => console.log(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                    <SelectItem value="gastroenterology">Gastroenterology</SelectItem>
                    <SelectItem value="dermatology">Dermatology</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  rows={5}
                  defaultValue="Board-certified cardiologist with over 15 years of experience specializing in interventional cardiology and heart failure management. Fellow of the American College of Cardiology and published researcher with a focus on preventive cardiology."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="credentials">Credentials & Certifications</Label>
                <Textarea
                  id="credentials"
                  rows={3}
                  defaultValue="MD, Stanford University School of Medicine
FACC - Fellow of the American College of Cardiology
Board Certified in Cardiovascular Disease
Board Certified in Interventional Cardiology"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="text-lg font-medium">Two-Factor Authentication</div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Text Message Authentication</div>
                    <div className="text-sm text-muted-foreground">Receive a code via SMS to verify your identity</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Authenticator App</div>
                    <div className="text-sm text-muted-foreground">
                      Use an authenticator app to generate verification codes
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="text-lg font-medium">Login Sessions</div>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">Current Session</div>
                      <div className="text-sm text-muted-foreground">MacBook Pro • San Francisco, CA</div>
                      <div className="text-xs text-muted-foreground mt-1">Last active: Just now</div>
                    </div>
                    <div className="text-sm text-green-600 font-medium">Active</div>
                  </div>
                </div>
                <div className="rounded-md border p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">iPhone 14 Pro</div>
                      <div className="text-sm text-muted-foreground">iOS 16 • San Francisco, CA</div>
                      <div className="text-xs text-muted-foreground mt-1">Last active: 2 hours ago</div>
                    </div>
                    <Button variant="outline" size="sm">
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Update Security Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="text-lg font-medium">Email Notifications</div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>New Case Assignments</div>
                    <div className="text-sm text-muted-foreground">Receive email notifications for new cases</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Case Deadlines & Reminders</div>
                    <div className="text-sm text-muted-foreground">Receive reminders about upcoming case deadlines</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Payment Confirmations</div>
                    <div className="text-sm text-muted-foreground">Receive notifications about payments</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Platform Updates & News</div>
                    <div className="text-sm text-muted-foreground">
                      Receive updates about MedSecOp features and news
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="text-lg font-medium">SMS Notifications</div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Urgent Cases</div>
                    <div className="text-sm text-muted-foreground">Receive text alerts for high-priority cases</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div>Deadline Reminders</div>
                    <div className="text-sm text-muted-foreground">
                      Receive text reminders for approaching deadlines
                    </div>
                  </div>
                  <Switch />
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <div className="text-lg font-medium">Notification Schedule</div>
                <div className="space-y-2">
                  <Label htmlFor="notificationTime">Daily Digest Time</Label>
                  <Select defaultValue="9am" onValueChange={(value) => console.log(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="6am">6:00 AM</SelectItem>
                      <SelectItem value="9am">9:00 AM</SelectItem>
                      <SelectItem value="12pm">12:00 PM</SelectItem>
                      <SelectItem value="5pm">5:00 PM</SelectItem>
                      <SelectItem value="8pm">8:00 PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

