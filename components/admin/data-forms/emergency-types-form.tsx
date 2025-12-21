"use client"

import type React from "react"

import { useState } from "react"
import { Save, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardData } from "@/lib/dashboard-data"

interface EmergencyTypesFormProps {
  data: DashboardData["emergencyTypes"]
  onSave: (data: DashboardData["emergencyTypes"]) => void
}

const DEFAULT_COLORS = ["#DC143C", "#00A86B", "#FFB81C", "#0052A5", "#8B5CF6", "#64748B"]

export function EmergencyTypesForm({ data, onSave }: EmergencyTypesFormProps) {
  const [formData, setFormData] = useState(data)
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    onSave(formData)
    setIsSaving(false)
  }

  const updateCategory = (index: number, field: string, value: string | number) => {
    const newCategories = [...formData.categories]
    newCategories[index] = { ...newCategories[index], [field]: value }
    setFormData({ ...formData, categories: newCategories })
  }

  const addCategory = () => {
    const colorIndex = formData.categories.length % DEFAULT_COLORS.length
    setFormData({
      ...formData,
      categories: [...formData.categories, { name: "New Category", count: 0, color: DEFAULT_COLORS[colorIndex] }],
    })
  }

  const removeCategory = (index: number) => {
    const newCategories = formData.categories.filter((_, i) => i !== index)
    setFormData({ ...formData, categories: newCategories })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Emergency Types</CardTitle>
        <CardDescription>Manage emergency categories and their counts</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Emergency Categories</Label>
            <Button type="button" variant="outline" size="sm" onClick={addCategory}>
              <Plus className="w-4 h-4 mr-1" />
              Add Category
            </Button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {formData.categories.map((cat, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <div
                  className="w-6 h-6 rounded border-2 flex-shrink-0"
                  style={{ backgroundColor: cat.color, borderColor: cat.color }}
                />
                <Input
                  value={cat.name}
                  onChange={(e) => updateCategory(index, "name", e.target.value)}
                  placeholder="Category name"
                  className="flex-1"
                />
                <Input
                  type="number"
                  value={cat.count}
                  onChange={(e) => updateCategory(index, "count", Number(e.target.value))}
                  className="w-24"
                  placeholder="Count"
                />
                <Input
                  type="color"
                  value={cat.color}
                  onChange={(e) => updateCategory(index, "color", e.target.value)}
                  className="w-12 h-10 p-1 cursor-pointer"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCategory(index)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
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
