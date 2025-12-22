"use client"

import { Play, Pause, Settings } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface DashboardHeaderProps {
  isPlaying: boolean
  onPlayPause: () => void
}

export function DashboardHeader({ isPlaying, onPlayPause }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo badges */}
          <div className="flex items-center gap-3">
            {/* NEMSAS Logo */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <Image
                src="/images/nemsas-logo.png"
                alt="NEMSAS Logo"
                width={56}
                height={56}
                className="object-contain"
              />
            </div>

            {/* Federal Ministry of Health */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
              <Image
                src="/images/fmoh-logo.png"
                alt="Federal Ministry of Health"
                width={52}
                height={52}
                className="object-contain"
              />
            </div>

            {/* Title */}
            <div className="ml-4">
              <h1 className="text-xl font-bold text-[#FF0000] tracking-wide">
                GOMBE STATE EMERGENCY MEDICAL SERVICES & AMBULANCE SYSTEM (SEMSAS)
              </h1>
              <p className="text-xs text-black"> SAVING LIVES, SERVING COMMUNITIES</p>
            </div>

            {/* Gombe State Ministry of Health */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
              <Image
                src="/images/moh-gombe-logo.jpeg"
                alt="Gombe State Ministry of Health"
                width={52}
                height={52}
                className="object-contain"
              />
            </div>

            {/* World Bank */}
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white flex items-center justify-center border border-gray-200">
              <Image
                src="/images/worldbank-logo.jpeg"
                alt="World Bank"
                width={52}
                height={52}
                className="object-contain"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={onPlayPause}
              className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5 text-black" /> : <Play className="w-5 h-5 text-black ml-0.5" />}
            </button>
            <Link
              href="/admin"
              className="w-11 h-11 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-5 h-5 text-black" />
            </Link>
          </div>
        </div>
      </div>

      {/* Blue progress bar */}
      <div className="h-1 bg-[#0052A5]" />
    </header>
  )
}
