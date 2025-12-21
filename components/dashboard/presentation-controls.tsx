"use client"

import { Play, Pause, ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PresentationControlsProps {
  isPlaying: boolean
  currentSection: number
  totalSections: number
  onPlayPause: () => void
  onPrevious: () => void
  onNext: () => void
  onReset: () => void
  onSectionClick: (index: number) => void
  sectionNames: string[]
}

export function PresentationControls({
  isPlaying,
  currentSection,
  totalSections,
  onPlayPause,
  onPrevious,
  onNext,
  onReset,
  onSectionClick,
  sectionNames,
}: PresentationControlsProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Progress indicators */}
          <div className="flex-1 flex items-center gap-1.5 overflow-x-auto pb-1">
            {sectionNames.map((name, index) => (
              <button
                key={index}
                onClick={() => onSectionClick(index)}
                className={cn(
                  "flex-shrink-0 px-2.5 py-1 rounded-full text-xs font-medium transition-all",
                  index === currentSection
                    ? "bg-[#0052A5] text-white"
                    : index < currentSection
                      ? "bg-[#00A86B]/20 text-[#00A86B]"
                      : "bg-muted text-muted-foreground hover:bg-muted/80",
                )}
              >
                {name}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onPrevious}
              disabled={currentSection === 0}
              className="h-9 w-9 bg-transparent"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <Button
              onClick={onPlayPause}
              className={cn(
                "h-9 px-4 gap-2",
                isPlaying ? "bg-[#DC143C] hover:bg-[#DC143C]/90" : "bg-[#0052A5] hover:bg-[#0052A5]/90",
              )}
            >
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" />
                  <span className="text-sm">Pause</span>
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  <span className="text-sm">Play</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={onNext}
              disabled={currentSection === totalSections - 1}
              className="h-9 w-9 bg-transparent"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

            <Button variant="ghost" size="icon" onClick={onReset} className="h-9 w-9">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress text */}
          <div className="text-sm text-muted-foreground font-medium">
            {currentSection + 1} / {totalSections}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-2 h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-[#0052A5] transition-all duration-300"
            style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
