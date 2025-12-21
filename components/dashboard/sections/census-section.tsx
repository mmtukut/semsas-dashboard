"use client"

import { SectionPanel } from "../section-panel"
import { AnimatedNumber } from "../animated-number"
import { MapPinned, Users, Ambulance } from "lucide-react"
import type { DashboardData } from "@/lib/dashboard-data"

interface CensusSectionProps {
  data: DashboardData["census"]
}

export function CensusSection({ data }: CensusSectionProps) {
  const totalAmbulances = data.byLGA.reduce((sum, lga) => sum + lga.ambulances, 0)
  const avgAmbulancesPerLGA = Math.round(totalAmbulances / data.byLGA.length)

  return (
    <SectionPanel
      title="Where We Serve"
      subtitle="Ambulances across Gombe State"
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
              <Ambulance className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0052A5]">
                <AnimatedNumber value={totalAmbulances} />
              </p>
              <p className="text-xs text-gray-500">Total Ambulances</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#00A86B]">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-[#00A86B]">
                <AnimatedNumber value={avgAmbulancesPerLGA} />
              </p>
              <p className="text-xs text-gray-500">Avg per LGA</p>
            </div>
          </div>
        </div>

        {/* LGA Table */}
        <div className="flex-1 bg-gray-50 rounded-xl p-4 overflow-auto">
          <div className="grid grid-cols-2 gap-3">
            {data.byLGA.map((lga) => (
              <div
                key={lga.name}
                className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-semibold text-gray-900">{lga.name}</p>
                  <p className="text-xs text-gray-500">LGA</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-[#0052A5]">{lga.ambulances}</p>
                  <p className="text-xs text-gray-500">ambulances</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionPanel>
  )
}
