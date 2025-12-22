"use client"

interface LegendItemProps {
  color: string
  label: string
  value: string | number
  suffix?: string
}

export function LegendItem({ color, label, value, suffix = "%" }: LegendItemProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-black/10 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-sm text-black">{label}</span>
      </div>
      <span className="text-lg font-bold" style={{ color }}>
        {value}
        {suffix}
      </span>
    </div>
  )
}
