"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/dashboard-data"

interface PerformanceFormProps {
  data: DashboardData["performance"]
  onSave: (data: DashboardData["performance"]) => void
}

export function PerformanceForm({ data, onSave }: PerformanceFormProps) {
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
        <CardTitle>Performance Metrics</CardTitle>
        <CardDescription>Update response times, survival rates, and satisfaction scores</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="responseTimeTarget">Response Time Target (minutes)</Label>
              <Input
                id="responseTimeTarget"
                type="number"
                value={formData.responseTimeTarget}
                onChange={(e) => setFormData({ ...formData, responseTimeTarget: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responseTimeActual">Actual Response Time (minutes)</Label>
              <Input
                id="responseTimeActual"
                type="number"
                value={formData.responseTimeActual}
                onChange={(e) => setFormData({ ...formData, responseTimeActual: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="survivalRate">Survival Rate (%)</Label>
              <Input
                id="survivalRate"
                type="number"
                step="0.1"
                value={formData.survivalRate}
                onChange={(e) => setFormData({ ...formData, survivalRate: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="satisfactionScore">Satisfaction Score (%)</Label>
              <Input
                id="satisfactionScore"
                type="number"
                value={formData.satisfactionScore}
                onChange={(e) => setFormData({ ...formData, satisfactionScore: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="coverageArea">Coverage Area (%)</Label>
              <Input
                id="coverageArea"
                type="number"
                value={formData.coverageArea}
                onChange={(e) => setFormData({ ...formData, coverageArea: Number(e.target.value) })}
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
