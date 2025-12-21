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

export function EmergencyTypesSection({ data }: EmergencyTypesSectionProps) {
  // Combine both labor and pregnancy complications into categories
  const allCategories = [...data.laborComplications, ...data.pregnancyComplications]

  // Group similar categories together and sum their counts
  const groupedData = allCategories.reduce(
    (acc, item) => {
      const existing = acc.find((a) => a.name === item.name)
      if (existing) {
        existing.count += item.count
      } else {
        acc.push({ ...item })
      }
      return acc
    },
    [] as { name: string; count: number; color: string }[],
  )

  const total = groupedData.reduce((sum, cat) => sum + cat.count, 0)
  const chartData = groupedData.map((cat) => ({
    ...cat,
    percentage: Math.round((cat.count / total) * 100),
  }))

  // Map names to simple terms
  const simpleNames: Record<string, string> = {
    "Prolonged Labor": "Labor Issues",
    Bleeding: "Bleeding",
    Convulsions: "Convulsions",
    "Convulsions (Eclampsia)": "Convulsions",
    "Other Complications": "Other",
    "Other Pregnancy Issues": "Other",
  }

  const emergencyIcons: Record<string, React.FC<{ className?: string }>> = {
    Bleeding: BleedingIcon,
    "Prolonged Labor": PregnantIcon,
    "Labor Issues": PregnantIcon,
    Convulsions: ConvulsionIcon,
    "Convulsions (Eclampsia)": ConvulsionIcon,
    "Other Complications": TraumaIcon,
    "Other Pregnancy Issues": TraumaIcon,
    Other: TraumaIcon,
  }

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
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="count"
                animationDuration={1200}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Visual legend with icons and actual data */}
        <div className="space-y-3 w-64">
          {chartData.map((item) => {
            const IconComponent = emergencyIcons[item.name] || TraumaIcon
            const simpleName = simpleNames[item.name] || item.name

            return (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <IconComponent className="w-12 h-12" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">{simpleName}</p>
                  <p className="text-xs text-gray-500">{item.count.toLocaleString()} cases</p>
                </div>
                <p className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.percentage}%
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionPanel>
  )
}
