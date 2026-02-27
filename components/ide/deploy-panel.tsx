"use client"

import { useState, useEffect } from "react"
import { Rocket, ExternalLink, CheckCircle2, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface DeployStep {
  label: string
  duration: number
}

const deploySteps: DeployStep[] = [
  { label: "Compactando arquivos do projeto...", duration: 800 },
  { label: "Enviando build (2.4 MB)...", duration: 1200 },
  { label: "Construindo imagem Docker...", duration: 2000 },
  { label: "Camadas em cache reutilizadas (3/5)", duration: 600 },
  { label: "Imagem construida com sucesso!", duration: 400 },
  { label: "Provisionando container na nuvem...", duration: 1500 },
  { label: "Rodando health checks...", duration: 800 },
  { label: "Health check: OK", duration: 400 },
  { label: "Configurando DNS temporario...", duration: 600 },
  { label: "Deploy concluido!", duration: 300 },
]

export function DeployPanel() {
  const [isDeploying, setIsDeploying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [logs, setLogs] = useState<string[]>([])
  const [deployUrl, setDeployUrl] = useState<string | null>(null)
  const [showPanel, setShowPanel] = useState(false)

  useEffect(() => {
    if (!isDeploying || currentStep >= deploySteps.length) return

    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, deploySteps[currentStep].label])
      setCurrentStep((prev) => prev + 1)

      if (currentStep === deploySteps.length - 1) {
        setIsDeploying(false)
        setDeployUrl("https://nuvem-app-a3f2.nuvemacademia.app")
      }
    }, deploySteps[currentStep].duration)

    return () => clearTimeout(timer)
  }, [isDeploying, currentStep])

  const startDeploy = () => {
    setIsDeploying(true)
    setCurrentStep(0)
    setLogs([])
    setDeployUrl(null)
    setShowPanel(true)
  }

  const progress = (currentStep / deploySteps.length) * 100

  return (
    <>
      <Button
        onClick={startDeploy}
        disabled={isDeploying}
        className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        size="sm"
      >
        {isDeploying ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Rocket className="h-4 w-4" />
        )}
        Hospedar / Deploy
      </Button>

      {showPanel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="mx-4 w-full max-w-lg rounded-xl border border-border bg-card shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground">
                    Deploy para Nuvem
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    nuvem-app-a3f2
                  </p>
                </div>
              </div>
              {!isDeploying && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground"
                  onClick={() => setShowPanel(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Progress */}
            <div className="px-5 py-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-mono text-primary">
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Logs */}
            <div className="mx-5 mb-4 h-48 overflow-y-auto rounded-lg bg-sidebar p-3 font-mono text-xs">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={cn(
                    "leading-6",
                    log.includes("sucesso") || log.includes("OK") || log.includes("concluido")
                      ? "text-primary"
                      : "text-sidebar-foreground/80"
                  )}
                >
                  <span className="text-muted-foreground">
                    [{String(i + 1).padStart(2, "0")}]
                  </span>{" "}
                  {log}
                </div>
              ))}
              {isDeploying && (
                <div className="mt-1 flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Processando...
                </div>
              )}
            </div>

            {/* Deploy URL */}
            {deployUrl && (
              <div className="mx-5 mb-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                <div className="mb-2 flex items-center gap-2 text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  <span className="text-sm font-semibold">
                    Publicado com sucesso!
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-sidebar px-3 py-1.5 text-xs text-foreground">
                    {deployUrl}
                  </code>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary hover:text-primary/80"
                    onClick={() => window.open(deployUrl, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="border-t border-border px-5 py-3">
              <p className="text-[10px] text-muted-foreground">
                Ambiente temporario valido por 72 horas. Powered by NuvemAcademia Cloud.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
