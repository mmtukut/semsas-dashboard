"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { EmergencyCallIcon } from "../visual-icons"
import { Phone, CheckCircle, Clock, PhoneCall } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { AreaChart, Area, XAxis, ResponsiveContainer } from "recharts"

interface DispatchSectionProps {
  data: DashboardData["dailyDispatch"]
}

export function DispatchSection({ data }: DispatchSectionProps) {
  const stats = [
    {
      label: "Calls Today",
      value: data.callsReceived,
      color: "#0052A5",
      bgColor: "bg-blue-50",
      icon: PhoneCall,
    },
    {
      label: "People Helped",
      value: data.successfulInterventions,
      color: "#00A86B",
      bgColor: "bg-green-50",
      icon: CheckCircle,
    },
  ]

  return (
    <SectionPanel
      title="Emergency Calls"
      subtitle="Daily dispatch center"
      icon={Phone}
      illustration={<EmergencyCallIcon className="w-full h-28" />}
      titleColor="#DC143C"
    >
      <div className="flex flex-col justify-center h-full gap-6">
        {/* Stats with icons */}
        <div className="flex items-center justify-center gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className={`${stat.bgColor} rounded-2xl p-6 flex items-center gap-4 flex-1 max-w-xs`}
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.color }}
                >
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: stat.color }}>
                    <AnimatedNumber value={stat.value} />
                  </p>
                  <p className="text-sm text-black">{stat.label}</p>
                </div>
              </div>
            )
          })}

          {/* Response time */}
          <div className="bg-amber-50 rounded-2xl p-6 flex items-center gap-4 flex-1 max-w-xs">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#FFB81C]">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-4xl font-bold text-[#FFB81C]">{data.avgResponseTime}</p>
              <p className="text-sm text-black">Avg Response</p>
            </div>
          </div>
        </div>

        {/* Call trend chart */}
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-xs text-black mb-2 font-medium">Calls Throughout the Day</p>
          <div className="h-28">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.trends}>
                <defs>
                  <linearGradient id="callsGradientVisual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0052A5" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0052A5" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <Area
                  type="monotone"
                  dataKey="calls"
                  stroke="#0052A5"
                  fill="url(#callsGradientVisual)"
                  strokeWidth={3}
                  animationDuration={1200}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
