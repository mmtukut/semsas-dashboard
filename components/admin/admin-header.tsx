"use client"

import Link from "next/link"
import { LayoutDashboard, LogOut, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminHeaderProps {
  onLogout: () => void
}

export function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-[#2C3E50] text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold leading-tight">NEMSAS Admin</h1>
                <p className="text-xs text-white/70">Dashboard Management</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" className="text-white hover:bg-white/10 gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span className="hidden sm:inline">View Dashboard</span>
              </Button>
            </Link>
            <Button variant="ghost" onClick={onLogout} className="text-white hover:bg-white/10 gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
