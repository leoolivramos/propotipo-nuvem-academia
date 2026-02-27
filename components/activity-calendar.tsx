"use client"

import { useMemo } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import type { ActivityDay } from "@/lib/mock-data"

interface ActivityCalendarProps {
  data: ActivityDay[]
}

const MONTHS = [
  "Set", "Out", "Nov", "Dez", "Jan", "Fev",
]

function getIntensity(count: number): string {
  if (count === 0) return "bg-muted"
  if (count <= 1) return "bg-primary/20"
  if (count <= 3) return "bg-primary/50"
  if (count <= 5) return "bg-primary/75"
  return "bg-primary"
}

export function ActivityCalendar({ data }: ActivityCalendarProps) {
  const weeks = useMemo(() => {
    const result: ActivityDay[][] = []
    let currentWeek: ActivityDay[] = []

    // Pad the first week if it doesn't start on Sunday
    if (data.length > 0) {
      const firstDay = new Date(data[0].date).getDay()
      for (let i = 0; i < firstDay; i++) {
        currentWeek.push({ date: "", count: -1 })
      }
    }

    data.forEach((day) => {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        result.push(currentWeek)
        currentWeek = []
      }
    })

    if (currentWeek.length > 0) {
      result.push(currentWeek)
    }

    return result
  }, [data])

  const totalContributions = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground">{totalContributions}</span>{" "}
          atividades nos ultimos 6 meses
        </p>
        <div className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
          <span>Menos</span>
          <div className="h-3 w-3 rounded-sm bg-muted" />
          <div className="h-3 w-3 rounded-sm bg-primary/20" />
          <div className="h-3 w-3 rounded-sm bg-primary/50" />
          <div className="h-3 w-3 rounded-sm bg-primary/75" />
          <div className="h-3 w-3 rounded-sm bg-primary" />
          <span>Mais</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Month labels */}
          <div className="mb-1 flex">
            <div className="w-6" />
            {MONTHS.map((month, i) => (
              <div
                key={`${month}-${i}`}
                className="flex-1 text-xs text-muted-foreground"
              >
                {month}
              </div>
            ))}
          </div>

          {/* Grid */}
          <div className="flex gap-[3px]">
            {/* Day labels */}
            <div className="flex w-6 flex-col gap-[3px] text-[10px] text-muted-foreground">
              <div className="h-3" />
              <div className="flex h-3 items-center">Seg</div>
              <div className="h-3" />
              <div className="flex h-3 items-center">Qua</div>
              <div className="h-3" />
              <div className="flex h-3 items-center">Sex</div>
              <div className="h-3" />
            </div>

            <TooltipProvider delayDuration={100}>
              <div className="flex gap-[3px]">
                {weeks.map((week, wi) => (
                  <div key={wi} className="flex flex-col gap-[3px]">
                    {week.map((day, di) => {
                      if (day.count === -1) {
                        return <div key={di} className="h-3 w-3" />
                      }
                      return (
                        <Tooltip key={di}>
                          <TooltipTrigger asChild>
                            <div
                              className={cn(
                                "h-3 w-3 rounded-sm transition-colors",
                                getIntensity(day.count)
                              )}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">
                              <span className="font-semibold">
                                {day.count} {day.count === 1 ? "atividade" : "atividades"}
                              </span>{" "}
                              em {day.date}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      )
                    })}
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  )
}
