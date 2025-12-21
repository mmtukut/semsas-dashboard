"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { HeartPulseIcon } from "../visual-icons"
import type { DashboardData } from "@/lib/dashboard-data"
import { Heart, Users, Ambulance, Activity } from "lucide-react"

interface OverviewSectionProps {
  data: DashboardData["overview"]
}

export function OverviewSection({ data }: OverviewSectionProps) {
  const stats = [
    {
      label: "Emergency Calls",
      value: data.totalEmergencies,
      color: "#DC143C",
      bgColor: "bg-red-50",
      icon: Activity,
    },
    {
      label: "Lives Saved",
      value: data.livesSaved,
      color: "#00A86B",
      bgColor: "bg-green-50",
      icon: Heart,
    },
    {
      label: "Patients Moved",
      value: data.patientsTransported,
      color: "#FFB81C",
      bgColor: "bg-amber-50",
      icon: Users,
    },
    {
      label: "Total Ambulances",
      value: data.totalAmbulances,
      color: "#0052A5",
      bgColor: "bg-blue-50",
      icon: Ambulance,
    },
  ]

  return (
    <SectionPanel
      title="Monthly Overview"
      subtitle="What we did this month"
      icon={Activity}
      illustration={<HeartPulseIcon className="w-full h-32" />}
    >
      <div className="flex flex-col h-full justify-center">
        {/* Visual stat cards with icons */}
        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div
                key={stat.label}
                className={`${stat.bgColor} rounded-2xl p-6 flex items-center gap-4 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: stat.color }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-4xl font-bold" style={{ color: stat.color }}>
                    <AnimatedNumber value={stat.value} />
                  </p>
                  <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Status indicator */}
        <div className="mt-8 flex items-center justify-center gap-3 p-4 bg-green-50 rounded-xl border border-green-200">
          <div className="w-4 h-4 rounded-full bg-[#00A86B] animate-pulse" />
          <span className="text-base font-semibold text-green-700">All Systems Working</span>
        </div>
      </div>
    </SectionPanel>
  )
}
