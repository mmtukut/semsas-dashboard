"use client"

import { useState, useCallback } from "react"
import { AdminHeader } from "@/components/admin/admin-header"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { LoginForm } from "@/components/admin/login-form"
import { OverviewForm } from "@/components/admin/data-forms/overview-form"
import { AmbulanceForm } from "@/components/admin/data-forms/ambulance-form"
import { StaffForm } from "@/components/admin/data-forms/staff-form"
import { PerformanceForm } from "@/components/admin/data-forms/performance-form"
import { EmergencyTypesForm } from "@/components/admin/data-forms/emergency-types-form"
import { defaultDashboardData, type DashboardData } from "@/lib/dashboard-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [dashboardData, setDashboardData] = useState<DashboardData>(defaultDashboardData)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const { toast } = useToast()

  const handleLogin = () => {
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  const showSaveSuccess = (section: string) => {
    setSaveMessage(`${section} updated successfully!`)
    toast({
      title: "Changes Saved",
      description: `${section} data has been updated successfully.`,
    })
    setTimeout(() => setSaveMessage(null), 3000)
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(dashboardData, null, 2)
    const blob = new Blob([dataStr], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `nemsas-dashboard-data-${new Date().toISOString().split("T")[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast({
      title: "Data Exported",
      description: "Dashboard data has been downloaded as JSON.",
    })
  }

  const handleReset = () => {
    if (confirm("Are you sure you want to reset all data to defaults? This cannot be undone.")) {
      setDashboardData({ ...defaultDashboardData, lastUpdated: new Date().toISOString() })
      toast({
        title: "Data Reset",
        description: "All dashboard data has been reset to default values.",
      })
    }
  }

  const updateSection = useCallback(<K extends keyof DashboardData>(section: K, data: DashboardData[K]) => {
    setDashboardData((prev) => ({
      ...prev,
      [section]: data,
      lastUpdated: new Date().toISOString(),
    }))
    showSaveSuccess(section.charAt(0).toUpperCase() + section.slice(1))
  }, [])

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} />
  }

  const renderForm = () => {
    switch (activeSection) {
      case "overview":
        return <OverviewForm data={dashboardData.overview} onSave={(data) => updateSection("overview", data)} />
      case "ambulance":
        return (
          <AmbulanceForm data={dashboardData.ambulanceFleet} onSave={(data) => updateSection("ambulanceFleet", data)} />
        )
      case "staff":
        return <StaffForm data={dashboardData.staff} onSave={(data) => updateSection("staff", data)} />
      case "performance":
        return (
          <PerformanceForm data={dashboardData.performance} onSave={(data) => updateSection("performance", data)} />
        )
      case "emergency-types":
        return (
          <EmergencyTypesForm
            data={dashboardData.emergencyTypes}
            onSave={(data) => updateSection("emergencyTypes", data)}
          />
        )
      default:
        return (
          <Card>
            <CardHeader>
              <CardTitle className="capitalize">{activeSection.replace("-", " ")}</CardTitle>
              <CardDescription>
                This section is available for editing. Additional forms can be added as needed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Form for {activeSection} section coming soon. You can edit other sections in the meantime.
              </p>
            </CardContent>
          </Card>
        )
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onLogout={handleLogout} />

      <div className="flex">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onExport={handleExport}
          onReset={handleReset}
        />

        <main className="flex-1 p-6">
          {/* Success message */}
          {saveMessage && (
            <div className="mb-4 p-4 bg-[#00A86B]/10 border border-[#00A86B]/20 rounded-lg flex items-center gap-2 text-[#00A86B]">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">{saveMessage}</span>
            </div>
          )}

          {/* Last updated */}
          <div className="mb-6 text-sm text-muted-foreground">
            Last updated: {new Date(dashboardData.lastUpdated).toLocaleString()}
          </div>

          {renderForm()}
        </main>
      </div>

      <Toaster />
    </div>
  )
}
