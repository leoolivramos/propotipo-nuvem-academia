"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TerminalLine {
  text: string
  type: "command" | "output" | "success" | "error"
}

interface SimulatedTerminalProps {
  lines: TerminalLine[]
  title?: string
  autoPlay?: boolean
  speed?: number
}

export function SimulatedTerminal({
  lines,
  title = "Terminal",
  autoPlay = true,
  speed = 400,
}: SimulatedTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<TerminalLine[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!autoPlay) {
      setVisibleLines(lines)
      return
    }

    if (currentIndex >= lines.length) return

    const timer = setTimeout(() => {
      setVisibleLines((prev) => [...prev, lines[currentIndex]])
      setCurrentIndex((prev) => prev + 1)
    }, speed + Math.random() * 300)

    return () => clearTimeout(timer)
  }, [currentIndex, lines, autoPlay, speed])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleLines])

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-foreground font-semibold"
      case "success":
        return "text-primary"
      case "error":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-sidebar">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-sidebar-border px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-destructive/70" />
          <div className="h-3 w-3 rounded-full bg-chart-4/70" />
          <div className="h-3 w-3 rounded-full bg-primary/70" />
        </div>
        <span className="ml-2 text-xs text-sidebar-foreground/50 font-mono">
          {title}
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="h-64 overflow-y-auto p-4 font-mono text-sm"
      >
        {visibleLines.map((line, i) => (
          <div
            key={i}
            className={cn("leading-6", getLineColor(line.type))}
          >
            {line.text}
          </div>
        ))}
        {currentIndex < lines.length && autoPlay && (
          <div className="inline-block h-4 w-2 animate-pulse bg-primary/80" />
        )}
      </div>
    </div>
  )
}
