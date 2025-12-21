"use client"

import { SectionPanel } from "../section-panel"
import { TrendUpIcon } from "../visual-icons"
import { TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface TrendsSectionProps {
  data: DashboardData["trends"]
}

export function TrendsSection({ data }: TrendsSectionProps) {
  const totalEmergencies = data.monthly.reduce((sum, m) => sum + m.emergencies, 0)
  const totalResponses = data.monthly.reduce((sum, m) => sum + m.responses, 0)

  return (
    <SectionPanel
      title="Year at a Glance"
      subtitle="How we did all year"
      icon={TrendingUp}
      illustration={<TrendUpIcon className="w-full h-28" />}
    >
      <div className="flex flex-col justify-center h-full gap-6">
        {/* Summary */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#DC143C]">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#DC143C]">{totalEmergencies.toLocaleString()}</p>
              <p className="text-xs text-gray-500">Total Emergencies</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#00A86B]">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00A86B]">{totalResponses.toLocaleString()}</p>
              <p className="text-xs text-gray-500">We Responded</p>
            </div>
          </div>
        </div>

        {/* Trend chart */}
        <div className="bg-gray-50 rounded-xl p-4 flex-1">
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.monthly} margin={{ left: -20, right: 10 }}>
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  verticalAlign="top"
                  height={36}
                  formatter={(value) => <span className="text-xs text-gray-600 font-medium">{value}</span>}
                />
                <Line
                  type="monotone"
                  dataKey="emergencies"
                  name="Emergencies"
                  stroke="#DC143C"
                  strokeWidth={3}
                  dot={{ fill: "#DC143C", r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1200}
                />
                <Line
                  type="monotone"
                  dataKey="responses"
                  name="We Responded"
                  stroke="#00A86B"
                  strokeWidth={3}
                  dot={{ fill: "#00A86B", r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={1200}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
