"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { GombeMap } from "../gombe-map"
import { MapPinned, Users, Target } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"

interface CensusSectionProps {
  data: DashboardData["census"]
}

export function CensusSection({ data }: CensusSectionProps) {
  const totalPopulation = data.byLGA.reduce((sum, lga) => sum + lga.population, 0)
  const avgCoverage = Math.round(data.byLGA.reduce((sum, lga) => sum + lga.coverage, 0) / data.byLGA.length)

  return (
    <SectionPanel
      title="Where We Serve"
      subtitle="Coverage across Gombe State"
      icon={MapPinned}
      illustration={
        <div className="text-center">
          <MapPinned className="w-16 h-16 text-[#0052A5] mx-auto mb-2" />
          <p className="text-xs text-gray-500">11 Local Government Areas</p>
        </div>
      }
    >
      <div className="flex flex-col h-full gap-4">
        {/* Summary stats */}
        <div className="flex justify-center gap-8">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0052A5]">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0052A5]">
                <AnimatedNumber value={Math.round((totalPopulation / 1000000) * 10) / 10} suffix="M" decimals={1} />
              </p>
              <p className="text-xs text-gray-500">People We Serve</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#00A86B]">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00A86B]">
                <AnimatedNumber value={avgCoverage} suffix="%" />
              </p>
              <p className="text-xs text-gray-500">Avg Coverage</p>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="flex-1 min-h-[280px]">
          <GombeMap data={data.byLGA} />
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#00A86B]" />
            <span className="text-xs text-gray-600">85%+ coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#FFB81C]" />
            <span className="text-xs text-gray-600">75-84%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#F97316]" />
            <span className="text-xs text-gray-600">65-74%</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-[#DC143C]" />
            <span className="text-xs text-gray-600">Below 65%</span>
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
