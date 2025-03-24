"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  RefreshCw,
  Server,
  Database,
  Lock,
  CreditCard,
  FileText,
  Layout,
  Users,
} from "lucide-react"
import { ComponentStatus } from "@/lib/system-check"

export default function SystemCheckPage() {
  const [systemResults, setSystemResults] = useState<any>(null)
  const [frontendResults, setFrontendResults] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Function to run system check
  const runSystemCheck = async () => {
    setLoading(true)
    setError(null)

    try {
      // Fetch system check results
      const systemResponse = await fetch("/api/system-check")
      if (!systemResponse.ok) {
        throw new Error("Failed to fetch system check results")
      }
      const systemData = await systemResponse.json()
      setSystemResults(systemData.results)

      // Fetch frontend check results
      const frontendResponse = await fetch("/api/frontend-check")
      if (!frontendResponse.ok) {
        throw new Error("Failed to fetch frontend check results")
      }
      const frontendData = await frontendResponse.json()
      setFrontendResults(frontendData)
    } catch (err: any) {
      setError(err.message || "An error occurred during the system check")
    } finally {
      setLoading(false)
    }
  }

  // Run check on initial load
  useEffect(() => {
    runSystemCheck()
  }, [])

  // Helper function to render status badge
  const renderStatusBadge = (status: ComponentStatus) => {
    switch (status) {
      case ComponentStatus.OPERATIONAL:
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-4 h-4 mr-1" /> Operational
          </Badge>
        )
      case ComponentStatus.DEGRADED:
        return (
          <Badge className="bg-yellow-500">
            <AlertTriangle className="w-4 h-4 mr-1" /> Degraded
          </Badge>
        )
      case ComponentStatus.DOWN:
        return (
          <Badge className="bg-red-500">
            <XCircle className="w-4 h-4 mr-1" /> Down
          </Badge>
        )
      default:
        return <Badge className="bg-gray-500">Unknown</Badge>
    }
  }

  // Helper function to render component icon
  const renderComponentIcon = (component: string) => {
    switch (component) {
      case "database":
        return <Database className="w-5 h-5 mr-2" />
      case "supabase":
      case "storage":
        return <Server className="w-5 h-5 mr-2" />
      case "authentication":
        return <Lock className="w-5 h-5 mr-2" />
      case "payment":
        return <CreditCard className="w-5 h-5 mr-2" />
      case "apiRoutes":
        return <FileText className="w-5 h-5 mr-2" />
      case "schema":
        return <Database className="w-5 h-5 mr-2" />
      default:
        return <Server className="w-5 h-5 mr-2" />
    }
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">System Health Check</h1>
        <Button onClick={runSystemCheck} disabled={loading} className="flex items-center">
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Running Check...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Run Check
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {systemResults && systemResults.overall && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              Overall System Status
              <div className="ml-4">{renderStatusBadge(systemResults.overall.status)}</div>
            </CardTitle>
            <CardDescription>
              Last checked: {new Date(systemResults.overall.timestamp).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{systemResults.overall.message}</p>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="backend">
        <TabsList className="mb-6">
          <TabsTrigger value="backend">Backend Components</TabsTrigger>
          <TabsTrigger value="frontend">Frontend Components</TabsTrigger>
          <TabsTrigger value="forms">Forms & Validation</TabsTrigger>
          <TabsTrigger value="flows">User Flows</TabsTrigger>
        </TabsList>

        <TabsContent value="backend">
          {systemResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(systemResults)
                .filter(([key]) => key !== "overall")
                .map(([key, value]: [string, any]) => (
                  <Card key={key}>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        {renderComponentIcon(key)}
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <div className="ml-auto">{renderStatusBadge(value.status)}</div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{value.message}</p>
                      {value.details && (
                        <div className="mt-4">
                          <Separator className="my-2" />
                          <h4 className="font-semibold mb-2">Details:</h4>
                          <pre className="bg-gray-100 dark:bg-gray-800 p-2 rounded text-xs overflow-auto">
                            {JSON.stringify(value.details, null, 2)}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>Loading backend components...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="frontend">
          {frontendResults ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Layout className="w-5 h-5 mr-2" />
                  Frontend Routes
                </CardTitle>
                <CardDescription>All expected routes in the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {frontendResults.routes.map((route: string) => (
                    <div key={route} className="flex items-center p-2 border rounded">
                      <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                      {route}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center py-10">
              <p>Loading frontend components...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="forms">
          {frontendResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(frontendResults.formValidations).map(([form, validations]: [string, any]) => (
                <Card key={form}>
                  <CardHeader>
                    <CardTitle className="capitalize">{form.replace(/-/g, " ")} Form</CardTitle>
                    <CardDescription>Validation requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {validations.map((validation: string) => (
                        <li key={validation} className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                          {validation}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>Loading form validations...</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="flows">
          {frontendResults ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(frontendResults.userFlows).map(([flow, steps]: [string, any]) => (
                <Card key={flow}>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      <Users className="w-5 h-5 mr-2 inline" />
                      {flow.replace(/-/g, " ")}
                    </CardTitle>
                    <CardDescription>User flow steps</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ol className="space-y-2 list-decimal list-inside">
                      {steps.map((step: string, index: number) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>Loading user flows...</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

