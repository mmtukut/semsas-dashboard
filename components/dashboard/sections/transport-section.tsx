"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { PatientIcon } from "../visual-icons"
import { Truck, ThumbsUp, MinusCircle, AlertTriangle, Route } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface TransportSectionProps {
  data: DashboardData["transport"]
}

export function TransportSection({ data }: TransportSectionProps) {
  const outcomeData = [
    { name: "Good Recovery", value: data.patientOutcomes.positive, color: "#00A86B", icon: ThumbsUp },
    { name: "Stable", value: data.patientOutcomes.neutral, color: "#FFB81C", icon: MinusCircle },
    { name: "Serious", value: data.patientOutcomes.critical, color: "#DC143C", icon: AlertTriangle },
  ]

  return (
    <SectionPanel
      title="Patient Transport"
      subtitle="Moving patients to care"
      icon={Truck}
      illustration={<PatientIcon className="w-full h-28" />}
    >
      <div className="flex items-center justify-center gap-8 h-full">
        {/* Donut Chart */}
        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={outcomeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                animationDuration={1200}
              >
                {outcomeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Truck className="w-8 h-8 text-[#0052A5] mb-1" />
            <p className="text-4xl font-bold text-gray-900">
              <AnimatedNumber value={data.completedToday} />
            </p>
            <p className="text-xs text-gray-500">Moved Today</p>
          </div>
        </div>

        {/* Outcomes with icons */}
        <div className="space-y-3 w-60">
          <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Patient Outcomes</p>

          {outcomeData.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{item.name}</p>
                </div>
                <p className="text-xl font-bold" style={{ color: item.color }}>
                  {item.value}%
                </p>
              </div>
            )
          })}

          {/* Distance */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 mt-4">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#0052A5]">
              <Route className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Distance Covered</p>
            </div>
            <p className="text-xl font-bold text-[#0052A5]">
              <AnimatedNumber value={data.distanceCovered} suffix=" km" />
            </p>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
