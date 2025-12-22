"use client"

import { useState } from "react"

interface LGAData {
  name: string
  coverage: number
  population: number
}

interface GombeMapProps {
  data: LGAData[]
  highlightLGA?: string
}

// Simplified Gombe State map with 11 LGAs
const lgaPositions: Record<string, { x: number; y: number; width: number; height: number }> = {
  Gombe: { x: 140, y: 140, width: 50, height: 45 },
  Akko: { x: 100, y: 180, width: 60, height: 55 },
  "Yamaltu Deba": { x: 170, y: 180, width: 55, height: 50 },
  Kwami: { x: 190, y: 120, width: 45, height: 40 },
  Funakaye: { x: 160, y: 60, width: 60, height: 50 },
  Nafada: { x: 220, y: 50, width: 50, height: 45 },
  Dukku: { x: 80, y: 80, width: 55, height: 50 },
  Balanga: { x: 230, y: 150, width: 50, height: 55 },
  Billiri: { x: 200, y: 210, width: 45, height: 40 },
  Kaltungo: { x: 250, y: 200, width: 45, height: 45 },
  Shomgom: { x: 280, y: 160, width: 40, height: 40 },
}

export function GombeMap({ data, highlightLGA }: GombeMapProps) {
  const [hoveredLGA, setHoveredLGA] = useState<string | null>(null)

  const getColor = (coverage: number) => {
    if (coverage >= 85) return "#00A86B"
    if (coverage >= 75) return "#FFB81C"
    if (coverage >= 65) return "#F97316"
    return "#DC143C"
  }

  const getLGACoverage = (name: string) => {
    const lga = data.find((d) => d.name === name)
    return lga?.coverage || 0
  }

  return (
    <div className="relative w-full h-full">
      <svg viewBox="0 0 350 280" className="w-full h-full">
        {/* Background */}
        <rect x="0" y="0" width="350" height="280" fill="#f8fafc" rx="8" />

        {/* LGA regions */}
        {Object.entries(lgaPositions).map(([name, pos]) => {
          const coverage = getLGACoverage(name)
          const isHovered = hoveredLGA === name
          const isHighlighted = highlightLGA === name

          return (
            <g key={name}>
              <rect
                x={pos.x}
                y={pos.y}
                width={pos.width}
                height={pos.height}
                fill={getColor(coverage)}
                stroke={isHovered || isHighlighted ? "#0052A5" : "#fff"}
                strokeWidth={isHovered || isHighlighted ? 3 : 1.5}
                rx="6"
                className="cursor-pointer transition-all duration-200"
                style={{
                  opacity: isHovered ? 1 : 0.85,
                  transform: isHovered ? "scale(1.05)" : "scale(1)",
                  transformOrigin: `${pos.x + pos.width / 2}px ${pos.y + pos.height / 2}px`,
                }}
                onMouseEnter={() => setHoveredLGA(name)}
                onMouseLeave={() => setHoveredLGA(null)}
              />
              <text
                x={pos.x + pos.width / 2}
                y={pos.y + pos.height / 2 - 4}
                textAnchor="middle"
                className="text-[8px] font-semibold fill-white pointer-events-none"
              >
                {name.split(" ")[0].substring(0, 6)}
              </text>
              <text
                x={pos.x + pos.width / 2}
                y={pos.y + pos.height / 2 + 8}
                textAnchor="middle"
                className="text-[7px] font-bold fill-white pointer-events-none"
              >
                {coverage}%
              </text>
            </g>
          )
        })}

        {/* Title */}
        <text x="175" y="268" textAnchor="middle" className="text-[10px] font-medium fill-black">
          Gombe State LGA Coverage Map
        </text>
      </svg>

      {/* Hover tooltip */}
      {hoveredLGA && (
        <div className="absolute top-2 right-2 bg-white rounded-lg shadow-lg p-3 border border-black z-10">
          <p className="font-bold text-black text-sm">{hoveredLGA}</p>
          <p className="text-xs text-black">Coverage: {getLGACoverage(hoveredLGA)}%</p>
          <p className="text-xs text-black">
            Pop: {data.find((d) => d.name === hoveredLGA)?.population.toLocaleString()}
          </p>
        </div>
      )}
    </div>
  )
}
