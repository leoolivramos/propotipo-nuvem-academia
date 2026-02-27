"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import {
  Cloud,
  ArrowLeft,
  Plus,
  BookOpen,
  FlaskConical,
  Play,
  Download,
  Save,
  RotateCcw,
  Rocket,
  CheckCircle2,
  Loader2,
  PanelRightClose,
  PanelRightOpen,
  FileSpreadsheet,
  Table2,
  BarChart3,
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
import { NotebookCell } from "@/components/lab/notebook-cell"

// --- Quick Import Actions ---
interface QuickAction {
  id: string
  label: string
  code: string
  icon: typeof Table2
}

const quickActions: QuickAction[] = [
  {
    id: "pandas",
    label: "Importar Pandas",
    code: "import pandas as pd\nprint(f'Pandas {pd.__version__} carregado!')",
    icon: Table2,
  },
  {
    id: "numpy",
    label: "Importar NumPy",
    code: "import numpy as np\nprint(f'NumPy {np.__version__} carregado!')",
    icon: BarChart3,
  },
  {
    id: "csv",
    label: "Carregar Dataset (CSV)",
    code: `df = pd.read_csv('/data/student_performance.csv')\nprint(f"Dataset: {df.shape[0]} linhas, {df.shape[1]} colunas")\ndf.head()`,
    icon: FileSpreadsheet,
  },
]

// --- Notebook Cells ---
const notebookCells = [
  {
    cellNumber: 1,
    code: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, confusion_matrix

print("Bibliotecas carregadas com sucesso!")
print(f"NumPy: {np.__version__}")
print(f"Pandas: {pd.__version__}")`,
    output: {
      type: "text" as const,
      content: `Bibliotecas carregadas com sucesso!
NumPy: 1.26.4
Pandas: 2.2.1`,
    },
    executionTime: "0.84s",
  },
  {
    cellNumber: 2,
    code: `# Carregar dataset de exemplo
df = pd.read_csv('/data/student_performance.csv')
print(f"Dataset: {df.shape[0]} amostras, {df.shape[1]} features")
print(f"Colunas: {list(df.columns)}")
df.head()`,
    output: {
      type: "table" as const,
      headers: ["nome", "horas_estudo", "nota_anterior", "faltas", "aprovado"],
      rows: [
        ["Alice", "8.5", "7.2", "2", "1"],
        ["Bruno", "3.2", "5.1", "12", "0"],
        ["Carla", "6.7", "8.0", "1", "1"],
        ["Diego", "4.1", "6.3", "8", "0"],
        ["Elena", "9.0", "9.1", "0", "1"],
      ],
    },
    executionTime: "0.12s",
  },
  {
    cellNumber: 3,
    code: `# Pre-processar e dividir dados
X = df[['horas_estudo', 'nota_anterior', 'faltas']]
y = df['aprovado']

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print(f"Treino: {X_train.shape[0]} amostras")
print(f"Teste:  {X_test.shape[0]} amostras")`,
    output: {
      type: "text" as const,
      content: `Treino: 800 amostras
Teste:  200 amostras`,
    },
    executionTime: "0.05s",
  },
  {
    cellNumber: 4,
    code: `# Treinar modelo Random Forest
model = RandomForestClassifier(
    n_estimators=100,
    max_depth=10,
    random_state=42
)
model.fit(X_train, y_train)

# Avaliar modelo
y_pred = model.predict(X_test)
acc = accuracy_score(y_test, y_pred)
print(f"Acuracia: {acc:.2%}")

# Importancia das features
for feat, imp in zip(X.columns, model.feature_importances_):
    print(f"  {feat}: {imp:.3f}")`,
    output: {
      type: "text" as const,
      content: `Acuracia: 92.50%
  horas_estudo: 0.412
  nota_anterior: 0.351
  faltas: 0.237`,
    },
    executionTime: "2.31s",
  },
  {
    cellNumber: 5,
    code: `# Comparar modelos
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier

models_compare = {
    'Linear Reg.': LogisticRegression(),
    'Random Forest': model,
    'SVM': SVC(),
    'Neural Net': MLPClassifier(max_iter=500),
    'XGBoost': RandomForestClassifier(n_estimators=200),
}

results = {}
for name, m in models_compare.items():
    if name != 'Random Forest':
        m.fit(X_train, y_train)
    results[name] = accuracy_score(y_test, m.predict(X_test))

# Plotar comparacao
plt.bar(results.keys(), results.values())
plt.title('Comparacao de Modelos')
plt.ylabel('Acuracia')
plt.show()`,
    output: {
      type: "chart" as const,
      label: "Comparacao de Modelos - Acuracia (%)",
    },
    executionTime: "8.47s",
  },
  {
    cellNumber: 6,
    code: `# Matriz de confusao do melhor modelo
cm = confusion_matrix(y_test, y_pred)
plt.figure(figsize=(6, 5))
plt.imshow(cm, interpolation='nearest', cmap='Greens')
plt.title('Matriz de Confusao - Random Forest')
plt.colorbar()
plt.xlabel('Classe Predita')
plt.ylabel('Classe Real')
plt.show()

print("Modelo treinado com sucesso!")
print("Pronto para deploy.")`,
    output: {
      type: "image" as const,
      label: "Matriz de Confusao - Random Forest",
    },
    executionTime: "0.34s",
  },
]

const deploySteps = [
  "Salvando notebook (.ipynb)...",
  "Empacotando dependencias (requirements.txt)...",
  "Construindo imagem Docker com Python 3.12...",
  "Enviando artefatos para cloud (18.7 MB)...",
  "Provisionando container via K3s...",
  "Inicializando Jupyter Server...",
  "Verificando health check do endpoint...",
  "Configurando SSL e dominio...",
  "Deploy concluido com sucesso!",
]

export default function LabDataSciencePage() {
  const [showVars, setShowVars] = useState(true)
  const [kernelStatus, setKernelStatus] = useState<"idle" | "restarting" | "busy">("idle")
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [showDeploy, setShowDeploy] = useState(false)
  const [deployProgress, setDeployProgress] = useState(0)
  const [deployStep, setDeployStep] = useState(0)
  const [deployDone, setDeployDone] = useState(false)
  const [quickImported, setQuickImported] = useState<Record<string, boolean>>({})
  const [quickImporting, setQuickImporting] = useState<string | null>(null)

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

  const handleQuickAction = useCallback((id: string) => {
    setQuickImporting(id)
    setTimeout(() => {
      setQuickImported((prev) => ({ ...prev, [id]: true }))
      setQuickImporting(null)
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
            <FlaskConical className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-sidebar-foreground">
              Lab. de Ciencia de Dados
            </span>
          </div>
          <Badge variant="secondary" className="ml-1 hidden h-5 text-[10px] md:inline-flex">
            <BookOpen className="mr-1 h-3 w-3" />
            student_performance.ipynb
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
              <TooltipContent>Salvar notebook (Ctrl+S)</TooltipContent>
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
                    {kernelStatus === "restarting" ? "Reiniciando..." : "Reiniciar Kernel"}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Reiniciar o kernel Python</TooltipContent>
            </Tooltip>

            {/* Run All */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 gap-1.5 text-xs text-primary hover:text-primary/80"
                >
                  <Play className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Executar Tudo</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Executar todas as celulas</TooltipContent>
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
              <TooltipContent>Publicar notebook na nuvem</TooltipContent>
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
              <TooltipContent>Exportar Notebook (.ipynb)</TooltipContent>
            </Tooltip>

            {/* Toggle vars panel */}
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowVars(!showVars)}
                >
                  {showVars ? (
                    <PanelRightClose className="h-3.5 w-3.5" />
                  ) : (
                    <PanelRightOpen className="h-3.5 w-3.5" />
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {showVars ? "Ocultar painel lateral" : "Mostrar painel lateral"}
              </TooltipContent>
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

      {/* Quick Actions Bar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-border bg-muted/30 px-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          Atalhos:
        </span>
        {quickActions.map((action) => {
          const isImported = quickImported[action.id]
          const isImporting = quickImporting === action.id
          return (
            <Button
              key={action.id}
              variant={isImported ? "outline" : "secondary"}
              size="sm"
              className="h-7 gap-1.5 text-[11px]"
              disabled={isImported || !!isImporting}
              onClick={() => handleQuickAction(action.id)}
            >
              {isImporting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : isImported ? (
                <CheckCircle2 className="h-3 w-3 text-primary" />
              ) : (
                <action.icon className="h-3 w-3" />
              )}
              {isImporting ? "Carregando..." : isImported ? `${action.label} (OK)` : action.label}
            </Button>
          )
        })}
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Notebook Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Notebook Title */}
            <div className="mb-6">
              <h1 className="text-lg font-bold text-foreground text-balance">
                Predicao de Desempenho Estudantil
              </h1>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Utilizando Machine Learning para prever aprovacao de alunos com base em dados de comportamento academico.
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">Python 3.12</Badge>
                <Badge variant="secondary" className="text-[10px]">Scikit-Learn</Badge>
                <Badge variant="secondary" className="text-[10px]">Pandas</Badge>
                <Badge variant="secondary" className="text-[10px]">NumPy</Badge>
                <span className="text-[10px] text-muted-foreground">
                  Ultima execucao: 25 fev 2026, 14:32
                </span>
              </div>
            </div>

            {/* Cells */}
            <div className="space-y-4">
              {notebookCells.map((cell, i) => (
                <NotebookCell
                  key={cell.cellNumber}
                  {...cell}
                  autoRun
                  autoRunDelay={i * 1800}
                />
              ))}

              {/* Add cell button */}
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border/50 py-3 text-xs text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary">
                <Plus className="h-4 w-4" />
                Adicionar Celula
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Variables Explorer */}
        {showVars && (
          <aside className="w-72 shrink-0 overflow-y-auto border-l border-border bg-muted/10 p-4 lg:w-80">
            {/* Variables Panel */}
            <div className="rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h3 className="text-xs font-bold text-card-foreground">
                  Explorador de Variaveis
                </h3>
                <p className="text-[10px] text-muted-foreground">
                  Variaveis em memoria no kernel
                </p>
              </div>
              <div className="divide-y divide-border/50">
                {[
                  { name: "df", type: "DataFrame", shape: "(1000, 5)", size: "39.2 KB" },
                  { name: "X_train", type: "DataFrame", shape: "(800, 3)", size: "18.8 KB" },
                  { name: "X_test", type: "DataFrame", shape: "(200, 3)", size: "4.7 KB" },
                  { name: "y_train", type: "Series", shape: "(800,)", size: "6.3 KB" },
                  { name: "y_test", type: "Series", shape: "(200,)", size: "1.6 KB" },
                  { name: "model", type: "RandomForest", shape: "n_estimators=100", size: "8.1 MB" },
                  { name: "acc", type: "float", shape: "-", size: "0.925" },
                  { name: "results", type: "dict", shape: "5 items", size: "0.4 KB" },
                ].map((v) => (
                  <div key={v.name} className="flex items-center justify-between px-4 py-2.5">
                    <div className="min-w-0">
                      <code className="font-mono text-xs font-semibold text-primary">{v.name}</code>
                      <p className="text-[10px] text-muted-foreground">{v.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-[10px] text-foreground">{v.shape}</p>
                      <p className="text-[10px] text-muted-foreground">{v.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dataset Info */}
            <div className="mt-4 rounded-lg border border-border bg-card">
              <div className="border-b border-border px-4 py-3">
                <h3 className="text-xs font-bold text-card-foreground">
                  Dataset Ativo
                </h3>
              </div>
              <div className="space-y-2 px-4 py-3">
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Arquivo</span>
                  <span className="font-mono text-foreground">student_performance.csv</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Linhas</span>
                  <span className="font-mono text-foreground">1,000</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Colunas</span>
                  <span className="font-mono text-foreground">5</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Tamanho</span>
                  <span className="font-mono text-foreground">39.2 KB</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-muted-foreground">Formato</span>
                  <span className="font-mono text-foreground">CSV (UTF-8)</span>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Status Bar */}
      <footer className="flex h-7 shrink-0 items-center justify-between border-t border-primary/20 bg-sidebar px-3 text-[10px]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-primary">
            <FlaskConical className="h-3 w-3" /> Jupyter Kernel
          </span>
          <span className="text-muted-foreground">Python 3.12.2</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">6 celulas</span>
          <span className="text-muted-foreground">|</span>
          {kernelStatus === "restarting" ? (
            <span className="flex items-center gap-1 text-chart-4">
              <Loader2 className="h-2.5 w-2.5 animate-spin" />
              Reiniciando Kernel...
            </span>
          ) : (
            <span className="flex items-center gap-1 text-primary">
              <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Kernel Ativo
            </span>
          )}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          <span className="text-muted-foreground">Docker: nuvemacademia/python-jupyter</span>
          <span className="text-muted-foreground">|</span>
          <span className="text-muted-foreground">Container: Ativo</span>
        </div>
      </footer>

      {/* Deploy Modal */}
      <Dialog open={showDeploy} onOpenChange={setShowDeploy}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Hospedar Notebook na Nuvem
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progresso</span>
                <span className="font-mono font-bold text-primary">{deployProgress}%</span>
              </div>
              <Progress value={deployProgress} className="h-2.5 [&>div]:bg-primary" />
            </div>

            <div className="rounded-lg border border-border bg-sidebar p-3">
              <div className="space-y-1.5 font-mono text-xs">
                {deploySteps.slice(0, deployStep).map((step, i) => {
                  const isLast = i === deployStep - 1
                  const isFinal = i === deploySteps.length - 1
                  return (
                    <div
                      key={i}
                      className={
                        isFinal
                          ? "font-bold text-primary"
                          : isLast && !deployDone
                          ? "text-chart-4"
                          : "text-muted-foreground"
                      }
                    >
                      {isFinal ? (
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3 w-3" />
                          {step}
                        </span>
                      ) : (
                        <span>
                          {isLast && !deployDone ? (
                            <Loader2 className="mr-1.5 inline h-3 w-3 animate-spin" />
                          ) : (
                            <CheckCircle2 className="mr-1.5 inline h-3 w-3 text-primary" />
                          )}
                          {step}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {deployDone && (
              <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
                <p className="text-sm font-semibold text-foreground">
                  Notebook publicado com sucesso!
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Seu notebook esta acessivel no endereco:
                </p>
                <code className="mt-2 block rounded bg-sidebar px-3 py-2 font-mono text-xs text-primary">
                  https://lab-ds.nuvemacademia.app/nb/student-performance
                </code>
                <div className="mt-3 flex gap-2">
                  <Button size="sm" className="h-7 text-xs">
                    Abrir Notebook
                  </Button>
                  <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => setShowDeploy(false)}>
                    Fechar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
