"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { AmbulanceIcon } from "../visual-icons"
import { Ambulance } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from "recharts"

interface AmbulanceFleetSectionProps {
  data: DashboardData["ambulanceFleet"]
}

export function AmbulanceFleetSection({ data }: AmbulanceFleetSectionProps) {
  const chartData = data.byLGA.map((lga) => ({
    name: lga.shortName,
    fullName: lga.name,
    count: lga.count,
  }))

  // Color based on count
  const getBarColor = (count: number) => {
    if (count >= 10) return "#00A86B"
    if (count >= 4) return "#FFB81C"
    return "#DC143C"
  }

  return (
    <SectionPanel
      title="Ambulance Fleet"
      subtitle="Vehicles across all LGAs"
      icon={Ambulance}
      illustration={<AmbulanceIcon className="w-full h-28" />}
      titleColor="#DC143C"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Total ambulances */}
        <div className="flex justify-center">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-red-50 border-2 border-[#FF0000]">
            <div className="w-14 h-14 rounded-lg flex items-center justify-center bg-[#FF0000]">
              <Ambulance className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FF0000]">
                <AnimatedNumber value={data.total} />
              </p>
              <p className="text-sm text-black">Total Ambulances in Gombe State</p>
            </div>
          </div>
        </div>

        {/* Bar chart showing ambulances per LGA */}
        <div className="flex-1 bg-black/5 rounded-xl p-4">
          <p className="text-xs text-black uppercase tracking-wide font-semibold mb-2 text-center">
            Ambulances by Local Government Area
          </p>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ left: -15, right: 10, bottom: 5 }}>
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#000000" }}
                  axisLine={false}
                  tickLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 10, fill: "#000000" }} axisLine={false} tickLine={false} />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1200}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(entry.count)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#00A86B]" />
            <span className="text-xs text-black">10+ ambulances</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#FFB81C]" />
            <span className="text-xs text-black">4-9 ambulances</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#DC143C]" />
            <span className="text-xs text-black">1-3 ambulances</span>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
