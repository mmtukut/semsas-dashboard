"use client"

import type React from "react"

import { useState } from "react"
import { Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/dashboard-data"

interface AmbulanceFormProps {
  data: DashboardData["ambulanceFleet"]
  onSave: (data: DashboardData["ambulanceFleet"]) => void
}

export function AmbulanceForm({ data, onSave }: AmbulanceFormProps) {
  const [formData, setFormData] = useState(data)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    onSave(formData)
    setIsSaving(false)
  }

  const updateLocation = (index: number, field: string, value: string | number) => {
    const newLocations = [...formData.byLocation]
    newLocations[index] = { ...newLocations[index], [field]: value }
    setFormData({ ...formData, byLocation: newLocations })
  }

  const addLocation = () => {
    setFormData({
      ...formData,
      byLocation: [...formData.byLocation, { name: "New Location", count: 0, status: "available" as const }],
    })
  }

  const removeLocation = (index: number) => {
    const newLocations = formData.byLocation.filter((_, i) => i !== index)
    setFormData({ ...formData, byLocation: newLocations })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ambulance Fleet</CardTitle>
        <CardDescription>Manage ambulance count and status by location</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="totalAmbulances">Total Ambulances</Label>
            <Input
              id="totalAmbulances"
              type="number"
              value={formData.total}
              onChange={(e) => setFormData({ ...formData, total: Number(e.target.value) })}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Ambulances by Location</Label>
              <Button type="button" variant="outline" size="sm" onClick={addLocation}>
                <Plus className="w-4 h-4 mr-1" />
                Add Location
              </Button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto">
              {formData.byLocation.map((loc, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                  <Input
                    value={loc.name}
                    onChange={(e) => updateLocation(index, "name", e.target.value)}
                    placeholder="Location name"
                    className="flex-1"
                  />
                  <Input
                    type="number"
                    value={loc.count}
                    onChange={(e) => updateLocation(index, "count", Number(e.target.value))}
                    className="w-20"
                    placeholder="Count"
                  />
                  <Select value={loc.status} onValueChange={(value) => updateLocation(index, "status", value)}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="on-route">On Route</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLocation(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
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
