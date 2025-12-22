"use client"

import { Phone } from "lucide-react"

interface DashboardFooterProps {
  currentSection: number
  totalSections: number
  onSectionClick: (index: number) => void
}

export function DashboardFooter({ currentSection, totalSections, onSectionClick }: DashboardFooterProps) {
  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white border-t border-border">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Emergency Hotline */}
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-[#DC143C]" />
            <span className="text-xs text-black uppercase tracking-wide">Emergency Hotline:</span>
            <span className="text-sm font-bold text-black">112</span>
          </div>

          {/* Navigation Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSections }).map((_, index) => (
              <button
                key={index}
                onClick={() => onSectionClick(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentSection ? "w-6 h-2 bg-[#0052A5]" : "w-2 h-2 bg-black hover:bg-black"
                }`}
              />
            ))}
          </div>

          {/* Status */}
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
              <span className="text-black">SYSTEM OPERATIONAL</span>
            </div>
            <span className="text-black">Last Updated: {currentTime}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
