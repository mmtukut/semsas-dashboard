"use client"

import type React from "react"

import { SectionPanel } from "../section-panel"
import { BleedingIcon, PregnantIcon, ConvulsionIcon, TraumaIcon } from "../visual-icons"
import { Stethoscope } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface EmergencyTypesSectionProps {
  data: DashboardData["emergencyTypes"]
}

// Custom icons for each emergency type
const emergencyIcons: Record<string, React.FC<{ className?: string }>> = {
  "Bleeding Emergencies": BleedingIcon,
  "Obstetric/Labor": PregnantIcon,
  "Convulsions/Seizures": ConvulsionIcon,
  "Trauma/Accidents": TraumaIcon,
}

const simpleNames: Record<string, string> = {
  "Bleeding Emergencies": "Bleeding",
  "Obstetric/Labor": "Pregnancy",
  "Convulsions/Seizures": "Convulsions",
  "Trauma/Accidents": "Accidents",
}

export function EmergencyTypesSection({ data }: EmergencyTypesSectionProps) {
  const total = data.categories.reduce((sum, cat) => sum + cat.count, 0)
  const topCategories = data.categories.slice(0, 4)

  return (
    <SectionPanel
      title="Types of Emergencies"
      subtitle="Why people call for help"
      icon={Stethoscope}
      illustration={
        <div className="grid grid-cols-2 gap-3">
          <BleedingIcon className="w-16 h-16" />
          <PregnantIcon className="w-16 h-16" />
          <ConvulsionIcon className="w-16 h-16" />
          <TraumaIcon className="w-16 h-16" />
        </div>
      }
    >
      <div className="flex items-center justify-center gap-8 h-full">
        {/* Donut Chart */}
        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={topCategories}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="count"
                animationDuration={1200}
              >
                {topCategories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Visual legend with icons */}
        <div className="space-y-3 w-64">
          {topCategories.map((item) => {
            const IconComponent = emergencyIcons[item.name] || BleedingIcon
            const simpleName = simpleNames[item.name] || item.name
            const percentage = Math.round((item.count / total) * 100)

            return (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <IconComponent className="w-12 h-12" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{simpleName}</p>
                </div>
                <p className="text-2xl font-bold" style={{ color: item.color }}>
                  {percentage}%
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionPanel>
  )
}
