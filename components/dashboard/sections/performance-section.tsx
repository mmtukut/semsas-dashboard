"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { TrophyIcon } from "../visual-icons"
import { Award, Timer, Heart, ThumbsUp, MapPin } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"

interface PerformanceSectionProps {
  data: DashboardData["performance"]
}

export function PerformanceSection({ data }: PerformanceSectionProps) {
  const metrics = [
    {
      label: "Response Time",
      value: data.responseTimeActual,
      suffix: " min",
      target: `Target: ${data.responseTimeTarget} min`,
      color: "#0052A5",
      bgColor: "bg-blue-50",
      icon: Timer,
    },
    {
      label: "Lives Saved Rate",
      value: data.survivalRate,
      suffix: "%",
      color: "#00A86B",
      bgColor: "bg-green-50",
      icon: Heart,
    },
    {
      label: "Happy Patients",
      value: data.satisfactionScore,
      suffix: "%",
      color: "#FFB81C",
      bgColor: "bg-amber-50",
      icon: ThumbsUp,
    },
    {
      label: "Areas Covered",
      value: data.coverageArea,
      suffix: "%",
      color: "#DC143C",
      bgColor: "bg-red-50",
      icon: MapPin,
    },
  ]

  return (
    <SectionPanel
      title="How We Are Doing"
      subtitle="Our performance numbers"
      icon={Award}
      illustration={<TrophyIcon className="w-full h-28" />}
    >
      <div className="flex flex-col justify-center h-full">
        <div className="grid grid-cols-2 gap-5">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon
            return (
              <div
                key={metric.label}
                className={`${metric.bgColor} rounded-2xl p-5 animate-slide-up`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: metric.color }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <p className="text-sm font-medium text-black">{metric.label}</p>
                </div>
                <p className="text-4xl font-bold" style={{ color: metric.color }}>
                  <AnimatedNumber
                    value={metric.value}
                    suffix={metric.suffix}
                    decimals={metric.suffix === "%" && metric.value % 1 !== 0 ? 1 : 0}
                  />
                </p>
                {metric.target && <p className="text-xs text-black mt-1">{metric.target}</p>}
              </div>
            )
          })}
        </div>
      </div>
    </SectionPanel>
  )
}
