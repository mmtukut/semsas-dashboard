"use client"

import { AnimatedNumber } from "./animated-number"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface KPICardProps {
  title: string
  value: number
  suffix?: string
  prefix?: string
  trend?: number
  icon: LucideIcon
  color?: "blue" | "green" | "red" | "amber"
}

const colorClasses = {
  blue: "bg-[#0052A5]/10 text-[#0052A5]",
  green: "bg-[#00A86B]/10 text-[#00A86B]",
  red: "bg-[#DC143C]/10 text-[#DC143C]",
  amber: "bg-[#FFB81C]/10 text-[#FFB81C]",
}

const iconBgClasses = {
  blue: "bg-[#0052A5]",
  green: "bg-[#00A86B]",
  red: "bg-[#DC143C]",
  amber: "bg-[#FFB81C]",
}

export function KPICard({ title, value, suffix, prefix, trend, icon: Icon, color = "blue" }: KPICardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border border-border/50 bg-card transition-all hover:shadow-md",
        "animate-slide-in-up",
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn("p-2.5 rounded-lg", iconBgClasses[color])}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
              trend > 0
                ? "bg-[#00A86B]/10 text-[#00A86B]"
                : trend < 0
                  ? "bg-[#DC143C]/10 text-[#DC143C]"
                  : "bg-gray-100 text-black",
            )}
          >
            {trend > 0 ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : trend < 0 ? (
              <TrendingDown className="w-3.5 h-3.5" />
            ) : (
              <Minus className="w-3.5 h-3.5" />
            )}
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-[#2C3E50]">
          <AnimatedNumber value={value} prefix={prefix} suffix={suffix} />
        </p>
        <p className="text-sm text-black font-medium">{title}</p>
      </div>
    </div>
  )
}
