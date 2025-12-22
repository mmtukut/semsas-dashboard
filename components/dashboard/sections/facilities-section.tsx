"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { HospitalIcon } from "../visual-icons"
import { Building2, Hospital, Stethoscope } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface FacilitiesSectionProps {
  data: DashboardData["facilities"]
}

export function FacilitiesSection({ data }: FacilitiesSectionProps) {
  const pieData = [
    { name: "MAMII Health Facilities", value: data.remonic, color: "#0052A5", icon: Hospital, desc: "Emergency Care" },
    { name: "CEmoNC Health Facilities", value: data.cemone, color: "#00A86B", icon: Stethoscope, desc: "Basic Care" },
  ]

  const total = data.remonic + data.cemone

  return (
    <SectionPanel
      title="Medical Facilities"
      subtitle="Healthcare centers in Gombe"
      icon={Building2}
      illustration={<HospitalIcon className="w-full h-28" />}
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
                paddingAngle={4}
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
            <Building2 className="w-8 h-8 text-[#0052A5] mb-1" />
            <p className="text-4xl font-bold text-black">
              <AnimatedNumber value={total} />
            </p>
            <p className="text-xs text-black">Total Facilities</p>
          </div>
        </div>

        {/* Facility breakdown with visual cards */}
        <div className="space-y-4 w-64">
          {pieData.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.name}
                className="p-5 rounded-xl border-l-4"
                style={{
                  backgroundColor: `${item.color}10`,
                  borderLeftColor: item.color,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: item.color }}
                  >
                    <IconComponent className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{item.name}</p>
                    <p className="text-xs text-black">{item.desc}</p>
                  </div>
                </div>
                <p className="text-3xl font-bold ml-13" style={{ color: item.color }}>
                  <AnimatedNumber value={item.value} />
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </SectionPanel>
  )
}
