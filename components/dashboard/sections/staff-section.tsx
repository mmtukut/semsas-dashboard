"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { MedicalTeamIcon } from "../visual-icons"
import { Users, Building2, Car } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface StaffSectionProps {
  data: DashboardData["staff"]
}

export function StaffSection({ data }: StaffSectionProps) {
  const pieData = [
    { name: "CEMTORS Offices", value: data.cemtorsOffices, color: "#0052A5", icon: Building2 },
    { name: "Volunteer Drivers", value: data.volunteerDrivers, color: "#00A86B", icon: Car },
  ]

  return (
    <SectionPanel
      title="Our Team"
      subtitle="Community responders"
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
            <Users className="w-8 h-8 text-[#0052A5] mb-1" />
            <p className="text-4xl font-bold text-black">
              <AnimatedNumber value={data.totalPersonnel} />
            </p>
            <p className="text-xs text-black">Total Team</p>
          </div>
        </div>

        {/* Staff breakdown */}
        <div className="space-y-4 w-64">
          {pieData.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <div
                  className="w-14 h-14 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-black">{item.name}</p>
                  <p className="text-3xl font-bold" style={{ color: item.color }}>
                    <AnimatedNumber value={item.value} />
                  </p>
                </div>
              </div>
            )
          })}

          {/* Explanation */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-black leading-relaxed">
              <strong>CEMTORS</strong> = Community Emergency Transport Organizers who coordinate emergency transport at
              community level
            </p>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
