"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/dashboard-data"

interface OverviewFormProps {
  data: DashboardData["overview"]
  onSave: (data: DashboardData["overview"]) => void
}

export function OverviewForm({ data, onSave }: OverviewFormProps) {
  const [formData, setFormData] = useState(data)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    onSave(formData)
    setIsSaving(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overview Statistics</CardTitle>
        <CardDescription>Update the main dashboard overview metrics</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="totalEmergencies">Total Emergencies (This Month)</Label>
              <Input
                id="totalEmergencies"
                type="number"
                value={formData.totalEmergencies}
                onChange={(e) => setFormData({ ...formData, totalEmergencies: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activeAmbulances">Active Ambulances</Label>
              <Input
                id="activeAmbulances"
                type="number"
                value={formData.activeAmbulances}
                onChange={(e) => setFormData({ ...formData, activeAmbulances: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="avgResponseTime">Average Response Time</Label>
              <Input
                id="avgResponseTime"
                value={formData.avgResponseTime}
                onChange={(e) => setFormData({ ...formData, avgResponseTime: e.target.value })}
                placeholder="e.g., 12 mins"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="livesSaved">Lives Saved</Label>
              <Input
                id="livesSaved"
                type="number"
                value={formData.livesSaved}
                onChange={(e) => setFormData({ ...formData, livesSaved: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="patientsTransported">Patients Transported</Label>
              <Input
                id="patientsTransported"
                type="number"
                value={formData.patientsTransported}
                onChange={(e) => setFormData({ ...formData, patientsTransported: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyTrend">Emergency Trend (%)</Label>
              <Input
                id="emergencyTrend"
                type="number"
                step="0.1"
                value={formData.emergencyTrend}
                onChange={(e) => setFormData({ ...formData, emergencyTrend: Number(e.target.value) })}
                placeholder="Positive or negative percentage"
              />
            </div>
          </div>
          <Button type="submit" disabled={isSaving} className="bg-[#0052A5] hover:bg-[#003d7a]">
            <Save className="w-4 h-4 mr-2" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
