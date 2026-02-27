"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Cloud, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProvisioningModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  templateName: string
  redirectPath?: string
  onDone?: () => void
}

export function ProvisioningModal({
  open,
  onOpenChange,
  templateName,
  redirectPath = "/ide",
  onDone,
}: ProvisioningModalProps) {
  const router = useRouter()
  const [phase, setPhase] = useState<"loading" | "done">("loading")

  useEffect(() => {
    if (!open) {
      setPhase("loading")
      return
    }

    // After 2 seconds, mark as done and optionally redirect
    const timer = setTimeout(() => {
      setPhase("done")
      const redirectTimer = setTimeout(() => {
        onDone?.()
        onOpenChange(false)
        if (redirectPath) {
          router.push(redirectPath)
        }
      }, 600)
      return () => clearTimeout(redirectTimer)
    }, 2000)

    return () => clearTimeout(timer)
  }, [open, onOpenChange, redirectPath, onDone, router])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background/95 backdrop-blur-sm">
      {/* Background grid effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col items-center gap-6">
        {/* Cloud icon with glow */}
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" style={{ animationDuration: "2s" }} />
          <div className={cn(
            "relative flex h-20 w-20 items-center justify-center rounded-2xl transition-colors duration-500",
            phase === "done" ? "bg-primary" : "bg-primary/10 border border-primary/30"
          )}>
            {phase === "done" ? (
              <Check className="h-10 w-10 text-primary-foreground" />
            ) : (
              <Cloud className="h-10 w-10 text-primary" />
            )}
          </div>
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground">
            {phase === "done" ? "Ambiente pronto!" : "Provisionando containers via K3s..."}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {phase === "done"
              ? `Redirecionando para a IDE com o template ${templateName}`
              : `Configurando o ambiente ${templateName} no cluster Kubernetes`}
          </p>
        </div>

        {/* Loading Spinner or success */}
        {phase === "loading" && (
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="font-mono text-xs text-muted-foreground">
              k3s: pulling image nuvemacademia/{templateName.toLowerCase().replace(/[\s\/]/g, "-")}:latest
            </span>
          </div>
        )}

        {/* Animated dots */}
        {phase === "loading" && (
          <div className="flex items-center gap-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-primary"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
