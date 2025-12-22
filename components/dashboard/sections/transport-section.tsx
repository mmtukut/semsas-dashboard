"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { PatientIcon } from "../visual-icons"
import { Truck, Baby, AlertTriangle, Car } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface TransportSectionProps {
  data: DashboardData["transport"]
}

export function TransportSection({ data }: TransportSectionProps) {
  const summaryData = [
    { name: "Safe Deliveries", value: data.totalDeliveries, color: "#00A86B", icon: Baby },
    { name: "Other Emergencies", value: data.totalOtherEmergencies, color: "#FFB81C", icon: AlertTriangle },
    { name: "Total (RESMAT)", value: data.resmatCases, color: "#DC143C", icon: Car },
  ]

  return (
    <SectionPanel
      title="RESMAT Patient Transport"
      subtitle="Emergency cases handled"
      icon={Truck}
      illustration={<PatientIcon className="w-full h-28" />}
      titleColor="#DC143C"
    >
      <div className="flex flex-col h-full gap-4">
        {/* Summary cards */}
        <div className="flex justify-center gap-4">
          {summaryData.map((item) => {
            const IconComponent = item.icon
            return (
              <div
                key={item.name}
                className="flex items-center gap-3 p-3 rounded-xl flex-1 max-w-[200px]"
                style={{ backgroundColor: `${item.color}15` }}
              >
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                  style={{ backgroundColor: item.color }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold" style={{ color: item.color }}>
                    <AnimatedNumber value={item.value} />
                  </p>
                  <p className="text-xs text-black leading-tight">{item.name}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Monthly breakdown chart */}
        <div className="flex-1 bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-black uppercase tracking-wide font-semibold mb-2 text-center">
            Monthly Labor & Delivery Cases (June - November 2025)
          </p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.monthlyData} margin={{ left: -15, right: 10 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={30}
                  formatter={(value) => <span className="text-xs text-black">{value}</span>}
                />
                <Bar
                  dataKey="deliveries"
                  name="Safe Deliveries"
                  fill="#00A86B"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1200}
                />
                <Bar
                  dataKey="otherEmergencies"
                  name="Other Cases"
                  fill="#FFB81C"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1200}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* RESMAT explanation */}
        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-black">
            <strong className="text-[#DC143C]">RESMAT</strong> = Rural Emergency Services and Maternal Transport
          </p>
        </div>
      </div>
    </SectionPanel>
  )
}
