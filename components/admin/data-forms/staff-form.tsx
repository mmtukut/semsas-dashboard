"use client"

import type React from "react"

import { useState } from "react"
import { Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/dashboard-data"

interface StaffFormProps {
  data: DashboardData["staff"]
  onSave: (data: DashboardData["staff"]) => void
}

export function StaffForm({ data, onSave }: StaffFormProps) {
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
        <CardTitle>Staff & Personnel</CardTitle>
        <CardDescription>Update emergency officers and medical staff numbers</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="desmajOfficers">DESMAJ Officers</Label>
              <Input
                id="desmajOfficers"
                type="number"
                value={formData.desmajOfficers}
                onChange={(e) => setFormData({ ...formData, desmajOfficers: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="totalMedicalPersonnel">Total Medical Personnel</Label>
              <Input
                id="totalMedicalPersonnel"
                type="number"
                value={formData.totalMedicalPersonnel}
                onChange={(e) => setFormData({ ...formData, totalMedicalPersonnel: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="onDuty">Currently On Duty</Label>
              <Input
                id="onDuty"
                type="number"
                value={formData.onDuty}
                onChange={(e) => setFormData({ ...formData, onDuty: Number(e.target.value) })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offDuty">Currently Off Duty</Label>
              <Input
                id="offDuty"
                type="number"
                value={formData.offDuty}
                onChange={(e) => setFormData({ ...formData, offDuty: Number(e.target.value) })}
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
