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
  const laborTotal = data.laborComplications.reduce((sum, cat) => sum + cat.count, 0)
  const pregnancyTotal = data.pregnancyComplications.reduce((sum, cat) => sum + cat.count, 0)
  const grandTotal = laborTotal + pregnancyTotal

  const laborChartData = data.laborComplications.map((cat) => ({
    ...cat,
    percentage: Math.round((cat.count / laborTotal) * 100),
  }))

  const pregnancyChartData = data.pregnancyComplications.map((cat) => ({
    ...cat,
    percentage: Math.round((cat.count / pregnancyTotal) * 100),
  }))

  const emergencyIcons: Record<string, React.FC<{ className?: string }>> = {
    Bleeding: BleedingIcon,
    "Prolonged Labor": PregnantIcon,
    Convulsions: ConvulsionIcon,
    "Convulsions (Eclampsia)": ConvulsionIcon,
    "Other Complications": TraumaIcon,
    "Other Pregnancy Issues": TraumaIcon,
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
      <div className="grid grid-cols-2 gap-8 h-full p-8">
        {/* Labor Complications Section */}
        <div className="flex flex-col items-center">
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-bold text-[#DC143C] mb-1">Labor Complications</h3>
            <p className="text-3xl font-bold text-gray-800">{laborTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-500">{Math.round((laborTotal / grandTotal) * 100)}% of all emergencies</p>
          </div>

          {/* Donut Chart for Labor */}
          <div className="relative w-56 h-56 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={laborChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="count"
                  animationDuration={1200}
                >
                  {laborChartData.map((entry, index) => (
                    <Cell key={`labor-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend for Labor */}
          <div className="space-y-2 w-full">
            {laborChartData.map((item) => {
              const IconComponent = emergencyIcons[item.name] || TraumaIcon

              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}10`, borderLeft: `4px solid ${item.color}` }}
                >
                  <IconComponent className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.count.toLocaleString()} cases</p>
                  </div>
                  <p className="text-lg font-bold flex-shrink-0" style={{ color: item.color }}>
                    {item.percentage}%
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pregnancy Complications Section */}
        <div className="flex flex-col items-center border-l-2 border-gray-200 pl-8">
          <div className="mb-4 text-center">
            <h3 className="text-2xl font-bold text-[#0052A5] mb-1">Pregnancy Complications</h3>
            <p className="text-3xl font-bold text-gray-800">{pregnancyTotal.toLocaleString()}</p>
            <p className="text-sm text-gray-500">
              {Math.round((pregnancyTotal / grandTotal) * 100)}% of all emergencies
            </p>
          </div>

          {/* Donut Chart for Pregnancy */}
          <div className="relative w-56 h-56 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pregnancyChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={2}
                  dataKey="count"
                  animationDuration={1200}
                >
                  {pregnancyChartData.map((entry, index) => (
                    <Cell key={`pregnancy-cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend for Pregnancy */}
          <div className="space-y-2 w-full">
            {pregnancyChartData.map((item) => {
              const IconComponent = emergencyIcons[item.name] || TraumaIcon

              return (
                <div
                  key={item.name}
                  className="flex items-center gap-2 p-2 rounded-lg"
                  style={{ backgroundColor: `${item.color}10`, borderLeft: `4px solid ${item.color}` }}
                >
                  <IconComponent className="w-8 h-8 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-700 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.count.toLocaleString()} cases</p>
                  </div>
                  <p className="text-lg font-bold flex-shrink-0" style={{ color: item.color }}>
                    {item.percentage}%
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
