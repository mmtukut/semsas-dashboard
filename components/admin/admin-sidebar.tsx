"use client"

import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Ambulance,
  Users,
  Building2,
  Radio,
  Truck,
  AlertTriangle,
  Award,
  MapPinned,
  TrendingUp,
  Download,
  RotateCcw,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "ambulance", label: "Ambulance Fleet", icon: Ambulance },
  { id: "staff", label: "Staff", icon: Users },
  { id: "facilities", label: "Facilities", icon: Building2 },
  { id: "dispatch", label: "Dispatch", icon: Radio },
  { id: "transport", label: "Transport", icon: Truck },
  { id: "emergency-types", label: "Emergency Types", icon: AlertTriangle },
  { id: "performance", label: "Performance", icon: Award },
  { id: "census", label: "Census", icon: MapPinned },
  { id: "trends", label: "Trends", icon: TrendingUp },
]

interface AdminSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  onExport: () => void
  onReset: () => void
}

export function AdminSidebar({ activeSection, onSectionChange, onExport, onReset }: AdminSidebarProps) {
  return (
    <aside className="w-64 bg-card border-r border-border min-h-[calc(100vh-4rem)] p-4">
      <nav className="space-y-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Data Sections</p>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left",
              activeSection === section.id ? "bg-[#0052A5] text-white" : "text-foreground hover:bg-muted",
            )}
          >
            <section.icon className="w-4 h-4" />
            {section.label}
          </button>
        ))}
      </nav>

      <div className="mt-8 pt-6 border-t border-border space-y-2">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-3">Actions</p>
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" onClick={onExport}>
          <Download className="w-4 h-4" />
          Export Data
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
          onClick={onReset}
        >
          <RotateCcw className="w-4 h-4" />
          Reset to Default
        </Button>
      </div>
    </aside>
  )
}
