"use client"

import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface SectionCardProps {
  title: string
  icon: LucideIcon
  children: ReactNode
  className?: string
  isActive?: boolean
  image?: ReactNode
}

export function SectionCard({ title, icon: Icon, children, className, isActive = false, image }: SectionCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-500 h-full",
        isActive && "ring-2 ring-[#0052A5] shadow-xl",
        className,
      )}
    >
      <CardHeader className="pb-3 bg-gradient-to-r from-[#0052A5]/5 to-transparent">
        <CardTitle className="flex items-center gap-3 text-lg font-semibold text-[#2C3E50]">
          <div className="p-2 bg-[#0052A5] rounded-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex gap-6">
          {image && <div className="hidden lg:flex w-[30%] items-center justify-center">{image}</div>}
          <div className={cn("flex-1", image && "lg:w-[70%]")}>{children}</div>
        </div>
      </CardContent>
    </Card>
  )
}
