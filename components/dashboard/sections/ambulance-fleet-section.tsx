"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { AmbulanceIcon } from "../visual-icons"
import { Ambulance, CheckCircle2, Clock, Wrench } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface AmbulanceFleetSectionProps {
  data: DashboardData["ambulanceFleet"]
}

export function AmbulanceFleetSection({ data }: AmbulanceFleetSectionProps) {
  const available = data.byLocation.filter((l) => l.status === "available").length
  const onRoute = data.byLocation.filter((l) => l.status === "on-route").length
  const maintenance = data.byLocation.filter((l) => l.status === "maintenance").length

  const statusData = [
    { name: "Ready to Go", value: available, color: "#00A86B", icon: CheckCircle2 },
    { name: "On the Road", value: onRoute, color: "#FFB81C", icon: Clock },
    { name: "Being Fixed", value: maintenance, color: "#DC143C", icon: Wrench },
  ]

  const total = available + onRoute + maintenance

  return (
    <SectionPanel
      title="Ambulance Fleet"
      subtitle="Our emergency vehicles"
      icon={Ambulance}
      illustration={<AmbulanceIcon className="w-full h-28" />}
    >
      <div className="flex items-center justify-center gap-8 h-full">
        {/* Large visual donut */}
        <div className="relative w-72 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={3}
                dataKey="value"
                animationDuration={1200}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Ambulance className="w-10 h-10 text-[#0052A5] mb-1" />
            <p className="text-5xl font-bold text-gray-900">
              <AnimatedNumber value={data.total} />
            </p>
            <p className="text-sm text-gray-500 font-medium">Total</p>
          </div>
        </div>

        {/* Visual legend with icons */}
        <div className="space-y-4 w-56">
          {statusData.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.name}
                className="flex items-center gap-4 p-4 rounded-xl"
                style={{ backgroundColor: `${item.color}15` }}
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
        </div>
      </div>
    </SectionPanel>
  )
}
