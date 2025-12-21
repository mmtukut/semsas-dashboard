"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { MedicalTeamIcon } from "../visual-icons"
import { Users, UserCheck, UserX, Stethoscope } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface StaffSectionProps {
  data: DashboardData["staff"]
}

export function StaffSection({ data }: StaffSectionProps) {
  const pieData = [
    { name: "On Duty", value: data.onDuty, color: "#00A86B", icon: UserCheck },
    { name: "Off Duty", value: data.offDuty, color: "#94A3B8", icon: UserX },
  ]

  const total = data.onDuty + data.offDuty

  return (
    <SectionPanel
      title="Our Medical Team"
      subtitle="Emergency responders"
      icon={Users}
      illustration={<MedicalTeamIcon className="w-full h-28" />}
    >
      <div className="flex items-center justify-center gap-8 h-full">
        {/* Donut Chart */}
        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                animationDuration={1200}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Stethoscope className="w-8 h-8 text-[#0052A5] mb-1" />
            <p className="text-4xl font-bold text-gray-900">
              <AnimatedNumber value={data.desmajOfficers} />
            </p>
            <p className="text-xs text-gray-500">DESMAJ Officers</p>
          </div>
        </div>

        {/* Staff breakdown */}
        <div className="space-y-4 w-60">
          {pieData.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600">{item.name}</p>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>
                    {item.value}
                  </p>
                </div>
              </div>
            )
          })}

          {/* Total */}
          <div className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 border-2 border-[#0052A5]">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0052A5]">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">Total Staff</p>
              <p className="text-2xl font-bold text-[#0052A5]">
                <AnimatedNumber value={data.totalMedicalPersonnel} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
