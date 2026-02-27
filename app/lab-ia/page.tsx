"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {
  Cloud,
  ArrowLeft,
  BrainCircuit,
  Play,
  Save,
  RotateCcw,
  Rocket,
  CheckCircle2,
  Loader2,
  Download,
  Upload,
  Terminal,
  BookOpen,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"
import { GpuPanel } from "@/components/lab/gpu-panel"
import { ModelCatalog } from "@/components/lab/model-catalog"

const deploySteps = [
  "Salvando checkpoint do modelo...",
  "Empacotando dependencias (requirements.txt)...",
  "Construindo imagem Docker com CUDA 12.4...",
  "Enviando artefatos para cloud (1.2 GB)...",
  "Provisionando container com GPU via K3s...",
  "Inicializando runtime PyTorch + CUDA...",
  "Verificando health check do endpoint...",
  "Configurando SSL e dominio...",
  "Deploy concluido com sucesso!",
]

const trainingLogs = [
  { epoch: 1, loss: 2.4521, acc: 0.32, lr: 0.001 },
  { epoch: 2, loss: 1.8734, acc: 0.48, lr: 0.001 },
  { epoch: 3, loss: 1.3201, acc: 0.61, lr: 0.0008 },
  { epoch: 4, loss: 0.9847, acc: 0.72, lr: 0.0006 },
  { epoch: 5, loss: 0.7123, acc: 0.79, lr: 0.0004 },
  { epoch: 6, loss: 0.5341, acc: 0.84, lr: 0.0003 },
  { epoch: 7, loss: 0.4012, acc: 0.88, lr: 0.0002 },
  { epoch: 8, loss: 0.3245, acc: 0.91, lr: 0.0001 },
  { epoch: 9, loss: 0.2678, acc: 0.93, lr: 0.00008 },
  { epoch: 10, loss: 0.2201, acc: 0.925, lr: 0.00005 },
]

export default function LabIAPage() {
  const [kernelStatus, setKernelStatus] = useState<"idle" | "restarting" | "busy">("idle")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [showDeploy, setShowDeploy] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [deployStep, setDeployStep] = useState(0)
  const [deployDone, setDeployDone] = useState(false)
  const [isTraining, setIsTraining] = useState(false)
  const [trainingEpoch, setTrainingEpoch] = useState(0)
  const [trainingComplete, setTrainingComplete] = useState(false)

  const handleSave = useCallback(() => {
    setSaveStatus("saving")
    setTimeout(() => {
      setSaveStatus("saved")
      setTimeout(() => setSaveStatus("idle"), 2000)
    }, 800)
  }, [])

  const handleRestartKernel = useCallback(() => {
    setKernelStatus("restarting")
    setTimeout(() => setKernelStatus("idle"), 2000)
  }, [])

  const handleDeploy = useCallback(() => {
    setShowDeploy(true)
    setDeployProgress(0)
    setDeployStep(0)
    setDeployDone(false)

    const totalSteps = deploySteps.length
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      setDeployStep(currentStep)
      setDeployProgress(Math.round((currentStep / totalSteps) * 100))

      if (currentStep >= totalSteps) {
        clearInterval(interval)
        setDeployDone(true)
      }
    }, 700)
  }, [])

  const handleStartTraining = useCallback(() => {
    setIsTraining(true)
    setTrainingEpoch(0)
    setTrainingComplete(false)

    let epoch = 0
    const interval = setInterval(() => {
      epoch++
      setTrainingEpoch(epoch)
      if (epoch >= trainingLogs.length) {
        clearInterval(interval)
        setIsTraining(false)
        setTrainingComplete(true)
      }
    }, 1200)
  }, [])

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Top Bar */}
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-border bg-sidebar px-4">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Cloud className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="hidden text-xs font-bold text-sidebar-foreground sm:inline">
              NuvemAcademia
            </span>
          </Link>
          <span className="hidden text-[10px] text-muted-foreground sm:inline">/</span>
          <div className="flex items-center gap-2">
            <BrainCircuit className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-sidebar-foreground">
              Lab. de Inteligencia Artificial
            </span>
          </div>
          <Badge variant="secondary" className="ml-1 hidden h-5 text-[10px] md:inline-flex">
            <BookOpen className="mr-1 h-3 w-3" />
            resnet_training.py
          </Badge>
        </div>

        <div className="flex items-center gap-1.5">
          <TooltipProvider delayDuration={0}>
            {/* Save */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  onClick={handleSave}
                  disabled={saveStatus === "saving"}
                >
                  {saveStatus === "saving" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : saveStatus === "saved" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {saveStatus === "saving" ? "Salvando..." : saveStatus === "saved" ? "Salvo" : "Salvar"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Salvar sessao (Ctrl+S)</TooltipContent>
            </Tooltip>

            {/* Restart Kernel */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                  onClick={handleRestartKernel}
                  disabled={kernelStatus === "restarting"}
                >
                  {kernelStatus === "restarting" ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <RotateCcw className="h-3.5 w-3.5" />
                  )}
                  <span className="hidden sm:inline">
                    {kernelStatus === "restarting" ? "Reiniciando..." : "Reiniciar Runtime"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reiniciar o runtime CUDA/PyTorch</TooltipContent>
            </Tooltip>

            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

            {/* Deploy */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  className="h-8 gap-1.5 text-xs font-semibold"
                  onClick={handleDeploy}
                >
                  <Rocket className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Hospedar / Deploy</span>
                  <span className="sm:hidden">Deploy</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Publicar modelo na nuvem</TooltipContent>
            </Tooltip>

            <div className="mx-1 hidden h-5 w-px bg-border sm:block" />

            {/* Export */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Exportar modelo (.pt / .h5)</TooltipContent>
            </Tooltip>

            {/* Back */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Link href="/dashboard">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voltar ao Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Training Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Page Title */}
            <div className="mb-6">
              <h1 className="text-lg font-bold text-foreground text-balance">
                Treinamento de Modelo - ResNet50
              </h1>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Transfer Learning para classificacao de imagens com GPU acelerada via Time-Slicing.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">PyTorch 2.3</Badge>
                <Badge variant="secondary" className="text-[10px]">CUDA 12.4</Badge>
                <Badge variant="secondary" className="text-[10px]">ResNet50</Badge>
                <Badge variant="secondary" className="text-[10px]">ImageNet</Badge>
              </div>
            </div>

            {/* Training Configuration */}
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h3 className="text-xs font-bold text-card-foreground">
                  Configuracao de Treinamento
                </h3>
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { label: "Epochs", value: "10" },
                  { label: "Batch Size", value: "32" },
                  { label: "Learning Rate", value: "0.001" },
                  { label: "Optimizer", value: "AdamW" },
                ].map((config) => (
                  <div key={config.label} className="rounded-md border border-border/50 bg-muted/20 p-3">
                    <p className="text-[10px] text-muted-foreground">{config.label}</p>
                    <p className="mt-0.5 font-mono text-sm font-semibold text-foreground">{config.value}</p>
                  </div>
                ))}
              </div>

              {/* Start Training Button */}
              <div className="border-t border-border px-4 py-3">
                <Button
                  onClick={handleStartTraining}
                  disabled={isTraining}
                  className="gap-2"
                >
                  {isTraining ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : trainingComplete ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Play className="h-4 w-4" />
                  )}
                  {isTraining
                    ? `Treinando... Epoch ${trainingEpoch}/${trainingLogs.length}`
                    : trainingComplete
                    ? "Treinamento Concluido"
                    : "Iniciar Treinamento"}
                </Button>
                {isTraining && (
                  <Progress
                    value={(trainingEpoch / trainingLogs.length) * 100}
                    className="mt-3 h-2"
                  />
                )}
              </div>
            </div>

            {/* Training Logs Table */}
            <div className="mb-6 rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-card-foreground">
                    Log de Treinamento
                  </h3>
                  {trainingComplete && (
                    <Badge className="gap-1 text-[10px]">
                      <Sparkles className="h-3 w-3" />
                      Melhor: Epoch 9 (93.0%)
                    </Badge>
                  )}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-border text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <th className="px-4 py-2.5">Epoch</th>
                      <th className="px-4 py-2.5">Loss</th>
                      <th className="px-4 py-2.5">Accuracy</th>
                      <th className="px-4 py-2.5">Learning Rate</th>
                      <th className="px-4 py-2.5">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {trainingLogs.slice(0, trainingComplete ? trainingLogs.length : trainingEpoch).map((log, idx) => (
                      <tr
                        key={log.epoch}
                        className="text-xs transition-colors hover:bg-muted/5"
                      >
                        <td className="px-4 py-2.5 font-mono font-medium text-foreground">
                          {log.epoch}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-foreground">
                          {log.loss.toFixed(4)}
                        </td>
                        <td className="px-4 py-2.5 font-mono font-semibold text-primary">
                          {(log.acc * 100).toFixed(1)}%
                        </td>
                        <td className="px-4 py-2.5 font-mono text-muted-foreground">
                          {log.lr}
                        </td>
                        <td className="px-4 py-2.5">
                          {idx < trainingEpoch || trainingComplete ? (
                            <Badge variant="outline" className="h-5 gap-1 text-[9px] text-primary border-primary/30">
                              <CheckCircle2 className="h-3 w-3" />
                              Concluido
                            </Badge>
                          ) : (
                            <Badge variant="secondary" className="h-5 text-[9px]">
                              Aguardando
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                    {!trainingComplete && trainingEpoch === 0 && (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-xs text-muted-foreground">
                          Clique em "Iniciar Treinamento" para comecar.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Terminal Output */}
            <div className="rounded-lg border border-border bg-card">
              <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                  Output do Terminal
                </span>
                <Badge variant="secondary" className="h-4 text-[9px]">
                  python3
                </Badge>
              </div>
              <div className="bg-sidebar p-4 font-mono text-[11px] leading-relaxed">
                <div className="space-y-1">
                  <p className="text-muted-foreground">
                    {'$'} python resnet_training.py
                  </p>
                  <p className="text-primary">
                    [INFO] Usando GPU: NVIDIA RTX A5000 (Time-Slicing 1/8)
                  </p>
                  <p className="text-primary">
                    [INFO] VRAM alocada: 4GB / 24GB
                  </p>
                  <p className="text-muted-foreground">
                    [INFO] Carregando dataset ImageNet (subset: 10k imagens)...
                  </p>
                  <p className="text-chart-2">
                    [OK] Dataset carregado em 3.2s
                  </p>
                  <p className="text-muted-foreground">
                    [INFO] Inicializando ResNet50 (pretrained=True)...
                  </p>
                  <p className="text-chart-2">
                    [OK] Modelo carregado, 25.6M parametros
                  </p>
                  {trainingComplete && (
                    <>
                      <p className="text-chart-2">
                        [OK] Treinamento concluido! Melhor accuracy: 93.0%
                      </p>
                      <p className="text-primary">
                        [INFO] Modelo salvo em /models/resnet50_finetuned.pt (98.3 MB)
                      </p>
                    </>
                  )}
                  {isTraining && (
                    <p className="text-chart-4 animate-pulse">
                      [TRAINING] Epoch {trainingEpoch}/{trainingLogs.length} em andamento...
                    </p>
                  )}
                  {!isTraining && !trainingComplete && (
                    <p className="text-muted-foreground/60">
                      Aguardando inicio do treinamento...
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Model Catalog */}
            <div className="mt-6">
              <ModelCatalog />
            </div>
          </div>
        </div>

        {/* Right Sidebar: GPU Monitor */}
        <aside className="hidden w-72 shrink-0 overflow-y-auto border-l border-border bg-muted/10 p-4 lg:block lg:w-80">
          <GpuPanel />

          {/* Training Summary (after training) */}
          {trainingComplete && (
            <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <h3 className="text-xs font-bold text-foreground">Resumo do Treinamento</h3>
              </div>
              <div className="mt-3 space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Melhor Accuracy</span>
                  <span className="font-mono font-bold text-primary">93.0%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loss Final</span>
                  <span className="font-mono font-medium text-foreground">0.2201</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Epochs</span>
                  <span className="font-mono font-medium text-foreground">10/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tempo Total</span>
                  <span className="font-mono font-medium text-foreground">~12s (simulado)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Modelo</span>
                  <span className="font-mono font-medium text-foreground">resnet50_finetuned.pt</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full gap-1.5 text-[10px] text-primary border-primary/30"
              >
                <Upload className="h-3 w-3" />
                Exportar Modelo Treinado
              </Button>
            </div>
          )}
        </aside>
      </div>

      {/* Status Bar */}
      <footer className="flex h-6 shrink-0 items-center justify-between border-t border-primary/30 bg-primary/10 px-3 text-[10px]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-primary">
            <BrainCircuit className="h-3 w-3" /> GPU Runtime
          </span>
          <span className="text-muted-foreground">Python 3.12</span>
          <span className="text-muted-foreground">
            {isTraining ? "Treinando..." : kernelStatus === "restarting" ? "Reiniciando..." : "Ocioso"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">resnet_training.py</span>
          <span className="text-primary">
            NVIDIA RTX A5000 (1/8 Slice)
          </span>
          <span className="text-muted-foreground">CUDA 12.4</span>
        </div>
      </footer>

      {/* Deploy Dialog */}
      <Dialog open={showDeploy} onOpenChange={setShowDeploy}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Rocket className="h-5 w-5 text-primary" />
              Deploy do Modelo
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Progress value={deployProgress} className="h-2" />

            <div className="space-y-2">
              {deploySteps.slice(0, deployStep).map((step, i) => (
                <div key={i} className="flex items-center gap-2 text-xs">
                  {i < deployStep - 1 || deployDone ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                  ) : (
                    <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-primary" />
                  )}
                  <span className={i < deployStep - 1 || deployDone ? "text-muted-foreground" : "text-foreground font-medium"}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {deployDone && (
              <div className="mt-4 rounded-md border border-primary/20 bg-primary/5 p-3">
                <p className="text-xs font-medium text-foreground">
                  Modelo publicado com sucesso!
                </p>
                <code className="mt-1 block rounded bg-muted px-2 py-1 font-mono text-[11px] text-primary">
                  https://ia-resnet50.nuvemacademia.app/predict
                </code>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  Endpoint ativo por 72 horas. GPU compartilhada via Time-Slicing.
                </p>
              </div>
            )}

            {!deployDone && (
              <p className="text-center text-xs text-muted-foreground">
                {deployProgress}% concluido
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
