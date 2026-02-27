"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import {
  ArrowLeft,
  Play,
  Square,
  Upload,
  ExternalLink,
  Package,
  Clock,
  Globe,
  Server,
  Layout,
  BarChart3,
  Brain,
  Loader2,
  Check,
  Copy,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { SimulatedTerminal } from "@/components/simulated-terminal"
import {
  mockProjects,
  mockTerminalLines,
  mockDeployLogs,
} from "@/lib/mock-data"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const iconMap: Record<string, React.ElementType> = {
  server: Server,
  layout: Layout,
  "bar-chart": BarChart3,
  globe: Globe,
  brain: Brain,
}

const dependencies = [
  { name: "express", version: "4.19.2", type: "production" },
  { name: "vue", version: "3.4.21", type: "production" },
  { name: "vite", version: "5.4.1", type: "dev" },
  { name: "tailwindcss", version: "3.4.7", type: "dev" },
  { name: "axios", version: "1.7.2", type: "production" },
  { name: "cors", version: "2.8.5", type: "production" },
  { name: "dotenv", version: "16.4.5", type: "production" },
  { name: "eslint", version: "9.8.0", type: "dev" },
  { name: "typescript", version: "5.5.4", type: "dev" },
  { name: "nodemon", version: "3.1.4", type: "dev" },
]

export default function ProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [isRunning, setIsRunning] = useState(true)
  const [deployOpen, setDeployOpen] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [deployDone, setDeployDone] = useState(false)
  const [copied, setCopied] = useState(false)

  const project =
    mockProjects.find((p) => p.id === params.id) || mockProjects[3]
  const Icon = iconMap[project.icon] || Server

  const handleDeploy = () => {
    setDeployOpen(true)
    setDeployProgress(0)
    setDeployDone(false)

    const interval = setInterval(() => {
      setDeployProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setDeployDone(true)
          return 100
        }
        return prev + 1.5
      })
    }, 100)
  }

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://${project.id}.nuvemacademia.app`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/dashboard")}
            className="mt-0.5 shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
              <Icon className="h-6 w-6 text-foreground/70" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-foreground">
                  {project.name}
                </h1>
                <Badge
                  variant={
                    project.status === "active" ? "default" : "secondary"
                  }
                >
                  {project.status === "active" ? "Ativo" : "Finalizado"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {project.template} &middot; Criado em {project.createdAt}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? (
              <>
                <Square className="mr-2 h-3.5 w-3.5" />
                Parar
              </>
            ) : (
              <>
                <Play className="mr-2 h-3.5 w-3.5" />
                Iniciar
              </>
            )}
          </Button>
          <Button size="sm" onClick={handleDeploy}>
            <Upload className="mr-2 h-3.5 w-3.5" />
            Hospedar Projeto
          </Button>
        </div>
      </div>

      {/* Project Info Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Ultimo Acesso</p>
              <p className="text-sm font-medium text-foreground">
                {project.lastAccess}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <Package className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Dependencias</p>
              <p className="text-sm font-medium text-foreground">
                {dependencies.length} pacotes
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-border/50">
          <CardContent className="flex items-center gap-3 p-4">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Preview</p>
              <p className="text-sm font-medium text-primary">
                localhost:5173
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="terminal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="terminal">Terminal</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencias</TabsTrigger>
        </TabsList>

        <TabsContent value="terminal">
          <SimulatedTerminal
            lines={mockTerminalLines}
            title={`${project.name} - bash`}
            autoPlay={isRunning}
            speed={300}
          />
        </TabsContent>

        <TabsContent value="dependencies">
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-base">
                <span>Acervo de Bibliotecas</span>
                <Badge variant="outline" className="font-normal">
                  {dependencies.length} instaladas
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {dependencies.map((dep) => (
                  <div
                    key={dep.name}
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    <div className="flex items-center gap-2">
                      <Package className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="font-mono font-medium text-foreground">
                        {dep.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          dep.type === "production" ? "default" : "secondary"
                        }
                        className="text-[10px]"
                      >
                        {dep.type === "production" ? "prod" : "dev"}
                      </Badge>
                      <span className="font-mono text-xs text-muted-foreground">
                        v{dep.version}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Deploy Dialog */}
      <Dialog open={deployOpen} onOpenChange={setDeployOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-foreground">
              <Upload className="h-5 w-5 text-primary" />
              Hospedar Projeto
            </DialogTitle>
            <DialogDescription>
              Enviando {project.name} para hospedagem temporaria na nuvem.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <Progress value={deployProgress} className="h-2" />

            {deployDone ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Check className="h-4 w-4" />
                  <span className="font-medium">
                    Deploy concluido com sucesso!
                  </span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Seu projeto esta disponivel em:
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 rounded-md bg-muted px-3 py-2 font-mono text-sm text-foreground">
                      https://{project.id}.nuvemacademia.app
                    </code>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleCopyUrl}
                      className="shrink-0"
                    >
                      {copied ? (
                        <Check className="h-4 w-4 text-primary" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Hospedagem temporaria valida por 72 horas.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <SimulatedTerminal
                  lines={mockDeployLogs}
                  title="deploy"
                  autoPlay
                  speed={600}
                />
                <p className="text-center text-xs text-muted-foreground">
                  {Math.round(deployProgress)}% concluido
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
