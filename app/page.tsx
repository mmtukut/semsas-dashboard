"use client"

import { useState, useEffect, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DashboardFooter } from "@/components/dashboard/footer"
import { OverviewSection } from "@/components/dashboard/sections/overview-section"
import { AmbulanceFleetSection } from "@/components/dashboard/sections/ambulance-fleet-section"
import { StaffSection } from "@/components/dashboard/sections/staff-section"
import { FacilitiesSection } from "@/components/dashboard/sections/facilities-section"
import { DispatchSection } from "@/components/dashboard/sections/dispatch-section"
import { TransportSection } from "@/components/dashboard/sections/transport-section"
import { EmergencyTypesSection } from "@/components/dashboard/sections/emergency-types-section"
import { PerformanceSection } from "@/components/dashboard/sections/performance-section"
import { CensusSection } from "@/components/dashboard/sections/census-section"
import { TrendsSection } from "@/components/dashboard/sections/trends-section"
import { defaultDashboardData } from "@/lib/dashboard-data"

const SECTION_DURATION = 48000 // 48 seconds per section

const sectionNames = [
  "Overview",
  "Fleet",
  "Staff",
  "Facilities",
  "Dispatch",
  "Transport",
  "Emergencies",
  "Performance",
  "Census",
  "Trends",
]

export default function Dashboard() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [data] = useState(defaultDashboardData)

  const totalSections = 10

  const goToNext = useCallback(() => {
    setCurrentSection((prev) => (prev + 1) % totalSections)
  }, [])

  const goToPrevious = useCallback(() => {
    setCurrentSection((prev) => (prev - 1 + totalSections) % totalSections)
  }, [])

  const reset = useCallback(() => {
    setCurrentSection(0)
    setIsPlaying(true)
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(goToNext, SECTION_DURATION)
    return () => clearInterval(interval)
  }, [isPlaying, goToNext])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === " ") {
        e.preventDefault()
        setIsPlaying((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNext, goToPrevious])

  const sections = [
    <OverviewSection key="overview" data={data.overview} />,
    <AmbulanceFleetSection key="fleet" data={data.ambulanceFleet} />,
    <StaffSection key="staff" data={data.staff} />,
    <FacilitiesSection key="facilities" data={data.facilities} />,
    <DispatchSection key="dispatch" data={data.dailyDispatch} />,
    <TransportSection key="transport" data={data.transport} />,
    <EmergencyTypesSection key="emergency" data={data.emergencyTypes} />,
    <PerformanceSection key="performance" data={data.performance} />,
    <CensusSection key="census" data={data.census} />,
    <TrendsSection key="trends" data={data.trends} />,
  ]

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex flex-col">
      <DashboardHeader isPlaying={isPlaying} onPlayPause={() => setIsPlaying((prev) => !prev)} />

      {/* Featured Section - Large */}
      <main className="flex-1 container mx-auto px-6 py-8 pb-24">
        <div className="h-[calc(100vh-200px)] animate-fade-in" key={currentSection}>
          {sections[currentSection]}
        </div>
      </main>

      <DashboardFooter
        currentSection={currentSection}
        totalSections={totalSections}
        onSectionClick={(index) => {
          setCurrentSection(index)
          setIsPlaying(false)
        }}
      />
    </div>
  )
}
