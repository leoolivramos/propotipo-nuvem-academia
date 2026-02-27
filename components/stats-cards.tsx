"use client"

import { FolderOpen, CheckCircle2, Clock, Flame } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Project } from "@/lib/mock-data"

interface StatsCardsProps {
  projects: Project[]
}

export function StatsCards({ projects }: StatsCardsProps) {
  const active = projects.filter((p) => p.status === "active").length
  const finished = projects.filter((p) => p.status === "finished").length
  const total = projects.length

  const stats = [
    {
      label: "Projetos Ativos",
      value: active,
      icon: FolderOpen,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      label: "Finalizados",
      value: finished,
      icon: CheckCircle2,
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      label: "Total de Projetos",
      value: total,
      icon: Clock,
      color: "text-chart-3",
      bgColor: "bg-chart-3/10",
    },
    {
      label: "Sequencia Ativa",
      value: "12 dias",
      icon: Flame,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-border/50">
          <CardContent className="flex items-center gap-4 p-4">
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
