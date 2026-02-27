"use client"

import { useState, useEffect } from "react"
import { Play, MoreHorizontal, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type CellOutput =
  | { type: "text"; content: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "chart"; label: string }
  | { type: "image"; label: string }

interface NotebookCellProps {
  cellNumber: number
  code: string
  output?: CellOutput
  executionTime?: string
  autoRun?: boolean
  autoRunDelay?: number
}

function TextOutput({ content }: { content: string }) {
  return (
    <pre className="whitespace-pre-wrap font-mono text-xs leading-6 text-foreground/90">
      {content}
    </pre>
  )
}

function TableOutput({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="px-3 py-2 text-left font-semibold text-muted-foreground">#</th>
            {headers.map((h, i) => (
              <th key={i} className="px-3 py-2 text-left font-semibold text-foreground">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border/50 hover:bg-muted/20">
              <td className="px-3 py-1.5 text-muted-foreground">{i}</td>
              {row.map((cell, j) => (
                <td key={j} className="px-3 py-1.5 font-mono text-foreground">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function ChartOutput({ label }: { label: string }) {
  // Simulated bar chart with CSS
  const bars = [
    { label: "Linear Reg.", value: 78, color: "bg-chart-1" },
    { label: "Random Forest", value: 92, color: "bg-chart-2" },
    { label: "SVM", value: 85, color: "bg-chart-3" },
    { label: "Neural Net", value: 96, color: "bg-primary" },
    { label: "XGBoost", value: 94, color: "bg-chart-5" },
  ]

  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <div className="space-y-2">
        {bars.map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-right text-[11px] text-muted-foreground">
              {bar.label}
            </span>
            <div className="flex-1">
              <div
                className={cn("h-5 rounded-sm transition-all duration-1000", bar.color)}
                style={{ width: `${bar.value}%`, opacity: 0.8 }}
              />
            </div>
            <span className="w-10 text-right font-mono text-[11px] text-foreground">
              {bar.value}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Pre-computed confusion matrix values (avoids hydration mismatch from Math.random)
const confusionMatrixData = [
  [92, 3, 1, 2],
  [4, 88, 5, 1],
  [2, 6, 91, 3],
  [1, 2, 4, 95],
]

function ImageOutput({ label }: { label: string }) {
  const maxVal = 95
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-foreground">{label}</p>
      <div className="grid grid-cols-4 gap-1 w-fit">
        {confusionMatrixData.flatMap((row, ri) =>
          row.map((val, ci) => {
            const isDiagonal = ri === ci
            const opacity = val / maxVal
            return (
              <div
                key={`${ri}-${ci}`}
                className="flex h-10 w-10 items-center justify-center rounded-sm font-mono text-[9px]"
                style={{
                  backgroundColor: isDiagonal
                    ? `oklch(0.65 0.2 160 / ${0.5 + opacity * 0.5})`
                    : `oklch(0.5 0.1 220 / ${opacity * 0.25})`,
                  color: isDiagonal ? "white" : "oklch(0.7 0.01 240)",
                }}
              >
                {val}
              </div>
            )
          })
        )}
      </div>
      <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
        <span>Eixo X: Classe Predita</span>
        <span>Eixo Y: Classe Real</span>
      </div>
    </div>
  )
}

export function NotebookCell({
  cellNumber,
  code,
  output,
  executionTime,
  autoRun = false,
  autoRunDelay = 0,
}: NotebookCellProps) {
  const [isRunning, setIsRunning] = useState(false)
  const [hasRun, setHasRun] = useState(false)

  useEffect(() => {
    if (autoRun && !hasRun) {
      const timer = setTimeout(() => {
        setIsRunning(true)
        const runTime = 800 + Math.random() * 1500
        setTimeout(() => {
          setIsRunning(false)
          setHasRun(true)
        }, runTime)
      }, autoRunDelay)
      return () => clearTimeout(timer)
    }
  }, [autoRun, autoRunDelay, hasRun])

  const runCell = () => {
    if (isRunning) return
    setIsRunning(true)
    const runTime = 600 + Math.random() * 1200
    setTimeout(() => {
      setIsRunning(false)
      setHasRun(true)
    }, runTime)
  }

  // Syntax highlight Python code
  const highlightCode = (line: string) => {
    return line
      .replace(/(import|from|as|def|return|class|if|else|for|in|print|with|try|except|raise)\b/g, '<kw>$1</kw>')
      .replace(/(#.*)/g, '<cm>$1</cm>')
      .replace(/('[^']*'|"[^"]*")/g, '<str>$1</str>')
      .replace(/\b(\d+\.?\d*)\b/g, '<num>$1</num>')
      .replace(/(np|pd|tf|torch|plt|sklearn|model|accuracy_score|train_test_split|confusion_matrix|classification_report)\b/g, '<lib>$1</lib>')
  }

  return (
    <div className={cn(
      "group rounded-lg border transition-colors",
      isRunning ? "border-primary/50 bg-primary/5" :
      hasRun ? "border-border bg-card" : "border-border/50 bg-card"
    )}>
      {/* Cell header */}
      <div className="flex items-center gap-2 border-b border-border/50 px-3 py-1.5">
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7 shrink-0",
            isRunning ? "text-primary" : "text-muted-foreground hover:text-primary"
          )}
          onClick={runCell}
          disabled={isRunning}
        >
          {isRunning ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        <span className="font-mono text-[10px] text-muted-foreground">
          In [{hasRun || isRunning ? cellNumber : " "}]:
        </span>
        {hasRun && executionTime && (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-primary">
            <CheckCircle2 className="h-3 w-3" />
            {executionTime}
          </span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto h-6 w-6 text-muted-foreground/50 opacity-0 transition-opacity group-hover:opacity-100"
        >
          <MoreHorizontal className="h-3.5 w-3.5" />
        </Button>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto bg-sidebar/50 px-4 py-3 font-mono text-[13px] leading-6">
        {code.split("\n").map((line, i) => (
          <div
            key={i}
            className="whitespace-pre"
            dangerouslySetInnerHTML={{
              __html: highlightCode(line)
                .replace(/<kw>/g, '<span class="text-rose-400 font-medium">')
                .replace(/<\/kw>/g, '</span>')
                .replace(/<cm>/g, '<span class="text-muted-foreground/60 italic">')
                .replace(/<\/cm>/g, '</span>')
                .replace(/<str>/g, '<span class="text-primary">')
                .replace(/<\/str>/g, '</span>')
                .replace(/<num>/g, '<span class="text-orange-300">')
                .replace(/<\/num>/g, '</span>')
                .replace(/<lib>/g, '<span class="text-sky-300">')
                .replace(/<\/lib>/g, '</span>')
            }}
          />
        ))}
      </div>

      {/* Output area */}
      {hasRun && output && (
        <div className="border-t border-border/50 px-4 py-3">
          <div className="mb-1 font-mono text-[10px] text-muted-foreground">
            Out [{cellNumber}]:
          </div>
          {output.type === "text" && <TextOutput content={output.content} />}
          {output.type === "table" && <TableOutput headers={output.headers} rows={output.rows} />}
          {output.type === "chart" && <ChartOutput label={output.label} />}
          {output.type === "image" && <ImageOutput label={output.label} />}
        </div>
      )}
    </div>
  )
}
