import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Mock components for admin dashboard
function UserManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>Manage users in the system</CardDescription>
      </CardHeader>
      <CardContent>
        <p>User management functionality will be implemented here.</p>
      </CardContent>
    </Card>
  )
}

function CaseManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Case Management</CardTitle>
        <CardDescription>Manage medical cases</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Case management functionality will be implemented here.</p>
      </CardContent>
    </Card>
  )
}

function SettingsManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Settings</CardTitle>
        <CardDescription>Configure system settings</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Settings management functionality will be implemented here.</p>
      </CardContent>
    </Card>
  )
}

export default async function AdminDashboard() {
  // Get the token from cookies
  const cookieStore = cookies()
  const token = cookieStore.get("session_token")?.value

  if (!token) {
    redirect("/auth/login?callbackUrl=/admin")
  }

  try {
    // Verify the JWT token
    const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || "your-secret-key-at-least-32-chars-long")

    const { payload } = await jwtVerify(token, JWT_SECRET)

    // Check if the token has expired
    const expires = new Date((payload.exp as number) * 1000)
    if (Date.now() > expires.getTime()) {
      redirect("/auth/login?callbackUrl=/admin")
    }

    // Check if the user is an admin
    if (payload.role !== "ADMIN") {
      redirect("/unauthorized")
    }

    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="cases">Case Management</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <UserManagement />
          </TabsContent>

          <TabsContent value="cases" className="space-y-4">
            <CaseManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <SettingsManagement />
          </TabsContent>
        </Tabs>
      </div>
    )
  } catch (error) {
    console.error("Error verifying token:", error)
    redirect("/auth/login?callbackUrl=/admin")
  }
}

