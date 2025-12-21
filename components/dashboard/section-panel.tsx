"use client"

import type { ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

interface SectionPanelProps {
  title: string
  subtitle?: string
  icon: LucideIcon
  children: ReactNode
  illustration?: ReactNode
}

export function SectionPanel({ title, subtitle, icon: Icon, children, illustration }: SectionPanelProps) {
  return (
    <div className="flex gap-6 h-full">
      {/* Left Panel - Section Title with Visual */}
      <div className="w-[380px] flex-shrink-0">
        <div className="bg-white rounded-2xl border border-border p-8 h-full flex flex-col items-center justify-center relative overflow-hidden">
          {/* Decorative top-left corner */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-[#0052A5] rounded-tl-2xl" />

          {/* Illustration or Icon */}
          {illustration ? (
            <div className="mb-6 w-full max-w-[280px]">{illustration}</div>
          ) : (
            <div className="mb-8">
              <Icon className="w-20 h-20 text-[#0052A5] stroke-[1.5]" />
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2 text-balance">{title}</h2>

          {/* Subtitle */}
          {subtitle && <p className="text-sm text-gray-500 text-center mb-3">{subtitle}</p>}

          {/* Underline accent */}
          <div className="w-12 h-1 bg-[#FFB81C] rounded-full" />

          {/* Decorative bottom gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>
      </div>

      {/* Right Panel - Content */}
      <div className="flex-1">
        <div className="bg-white rounded-2xl border border-border p-8 h-full">{children}</div>
      </div>
    </div>
  )
}
