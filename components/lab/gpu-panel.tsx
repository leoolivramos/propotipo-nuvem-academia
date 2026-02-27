"use client"

import { useState, useEffect } from "react"
import { Cpu, Thermometer, Zap, HardDrive, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface GpuMetric {
  label: string
  value: number
  max: number
  unit: string
  icon: typeof Cpu
  color: string
}

export function GpuPanel() {
  const [metrics, setMetrics] = useState<GpuMetric[]>([
    { label: "VRAM em uso", value: 4.0, max: 24, unit: "GB", icon: HardDrive, color: "text-primary" },
    { label: "GPU Util.", value: 38, max: 100, unit: "%", icon: Cpu, color: "text-chart-2" },
    { label: "Temperatura", value: 52, max: 90, unit: "C", icon: Thermometer, color: "text-chart-5" },
    { label: "Energia", value: 78, max: 230, unit: "W", icon: Zap, color: "text-chart-4" },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((m) => ({
          ...m,
          value:
            m.label === "VRAM em uso"
              ? Math.round((m.value + (Math.random() - 0.45) * 0.4) * 10) / 10
              : m.label === "GPU Util."
              ? Math.min(100, Math.max(10, Math.round(m.value + (Math.random() - 0.45) * 6)))
              : m.label === "Temperatura"
              ? Math.min(85, Math.max(42, Math.round(m.value + (Math.random() - 0.5) * 2)))
              : Math.min(200, Math.max(55, Math.round(m.value + (Math.random() - 0.5) * 8))),
        }))
      )
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-lg border border-border bg-card">
      {/* GPU Header */}
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-bold text-card-foreground">
              Monitor de GPU
            </h3>
            <p className="text-[10px] text-muted-foreground">
              NVIDIA RTX A5000 (Time-Slicing)
            </p>
          </div>
        </div>

        {/* Allocation badge */}
        <div className="mt-3 flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-primary" />
          <span className="text-[11px] font-semibold text-primary">Ativo</span>
          <Badge variant="secondary" className="ml-auto h-5 text-[10px] font-mono">
            Alocacao: 1/8 GPU
          </Badge>
        </div>

        {/* VRAM highlight */}
        <div className="mt-3 rounded-md border border-primary/20 bg-primary/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HardDrive className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">VRAM em uso</span>
            </div>
            <span className="font-mono text-sm font-bold text-primary">
              {metrics[0].value.toFixed(1)} GB
            </span>
          </div>
          <Progress
            value={(metrics[0].value / 24) * 100}
            className="mt-2 h-2.5 [&>div]:bg-primary"
          />
          <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
            <span>0 GB</span>
            <span>24 GB (Total)</span>
          </div>
        </div>
      </div>

      {/* Other Metrics */}
      <div className="space-y-3 p-4">
        {metrics.slice(1).map((metric) => {
          const percentage = (metric.value / metric.max) * 100
          return (
            <div key={metric.label} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <metric.icon className={cn("h-3.5 w-3.5", metric.color)} />
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                </div>
                <span className="font-mono text-xs font-medium text-foreground">
                  {metric.value}
                  {metric.unit} / {metric.max}
                  {metric.unit}
                </span>
              </div>
              <Progress
                value={percentage}
                className={cn(
                  "h-1.5",
                  percentage > 80 ? "[&>div]:bg-destructive" : ""
                )}
              />
            </div>
          )
        })}
      </div>

      {/* Hardware Info */}
      <div className="border-t border-border px-4 py-3">
        <div className="flex items-center gap-2 mb-2">
          <Activity className="h-3 w-3 text-muted-foreground" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Hardware
          </span>
        </div>
        <div className="space-y-1.5 text-[11px]">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Placa</span>
            <span className="font-mono font-medium text-foreground">NVIDIA RTX A5000</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">VRAM Total</span>
            <span className="font-mono font-medium text-foreground">24 GB GDDR6</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">CUDA Version</span>
            <span className="font-mono font-medium text-foreground">12.4</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Driver</span>
            <span className="font-mono font-medium text-foreground">550.54.15</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Compute Cap.</span>
            <span className="font-mono font-medium text-foreground">8.6</span>
          </div>
        </div>
      </div>
    </div>
  )
}
