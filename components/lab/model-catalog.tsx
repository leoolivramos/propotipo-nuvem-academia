"use client"

import { useState } from "react"
import { Download, CheckCircle2, Loader2, Flame, Brain, Box } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface CatalogItem {
  id: string
  name: string
  description: string
  action: string
  size: string
  tags: string[]
  colorClass: string
  badgeColor: string
}

const catalogItems: CatalogItem[] = [
  {
    id: "pytorch",
    name: "Importar PyTorch",
    description: "Framework de deep learning com autograd e suporte nativo a GPU. Ideal para pesquisa e prototipagem rapida.",
    action: "import torch",
    size: "2.1 GB",
    tags: ["Deep Learning", "GPU", "Autograd"],
    colorClass: "border-l-chart-5",
    badgeColor: "bg-chart-5/10 text-chart-5",
  },
  {
    id: "tensorflow",
    name: "Importar TensorFlow",
    description: "Plataforma completa de ML com Keras integrado. Otimizado para deploy em producao e dispositivos moveis.",
    action: "import tensorflow as tf",
    size: "1.8 GB",
    tags: ["ML", "Keras", "Producao"],
    colorClass: "border-l-chart-4",
    badgeColor: "bg-chart-4/10 text-chart-4",
  },
  {
    id: "sklearn",
    name: "Importar Scikit-Learn",
    description: "Biblioteca classica para Machine Learning tradicional. Classificacao, regressao, clustering e mais.",
    action: "import sklearn",
    size: "245 MB",
    tags: ["ML Classico", "Leve", "Educacional"],
    colorClass: "border-l-chart-3",
    badgeColor: "bg-chart-3/10 text-chart-3",
  },
  {
    id: "resnet50",
    name: "Carregar ResNet50",
    description: "Modelo de visao computacional pre-treinado (ImageNet). 25.6M parametros, ideal para transfer learning.",
    action: "models.resnet50(pretrained=True)",
    size: "98 MB",
    tags: ["CNN", "ImageNet", "Transfer Learning"],
    colorClass: "border-l-primary",
    badgeColor: "bg-primary/10 text-primary",
  },
  {
    id: "huggingface",
    name: "Importar Transformers",
    description: "Biblioteca de NLP com milhares de modelos pre-treinados. GPT, BERT, LLaMA e outros.",
    action: "from transformers import pipeline",
    size: "890 MB",
    tags: ["NLP", "LLMs", "Transformers"],
    colorClass: "border-l-chart-2",
    badgeColor: "bg-chart-2/10 text-chart-2",
  },
]

export function ModelCatalog() {
  const [installed, setInstalled] = useState<Record<string, boolean>>({
    sklearn: true,
  })
  const [installing, setInstalling] = useState<string | null>(null)

  const handleInstall = (id: string) => {
    setInstalling(id)
    setTimeout(() => {
      setInstalled((prev) => ({ ...prev, [id]: true }))
      setInstalling(null)
    }, 1500 + Math.random() * 2000)
  }

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-accent/10">
            <Brain className="h-4 w-4 text-accent" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-card-foreground">
              Catálogo de Modelos
            </h3>
            <p className="text-[10px] text-muted-foreground">
              Importe frameworks e modelos prontos
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-0 divide-y divide-border/50">
        {catalogItems.map((item) => {
          const isInstalled = installed[item.id]
          const isInstalling = installing === item.id

          return (
            <div
              key={item.id}
              className={cn(
                "border-l-2 px-4 py-3 transition-colors hover:bg-muted/5",
                item.colorClass
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-card-foreground">
                      {item.name}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  {/* Code snippet */}
                  <code className="mt-1.5 inline-block rounded bg-sidebar/80 px-2 py-0.5 font-mono text-[10px] text-primary">
                    {item.action}
                  </code>
                  <div className="mt-2 flex flex-wrap items-center gap-1">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="h-4 text-[9px]">
                        {tag}
                      </Badge>
                    ))}
                    <span className="ml-1 text-[9px] text-muted-foreground">
                      {item.size}
                    </span>
                  </div>
                </div>

                <Button
                  variant={isInstalled ? "outline" : "default"}
                  size="sm"
                  className={cn(
                    "h-7 shrink-0 text-[10px]",
                    isInstalled && "border-primary/30 text-primary"
                  )}
                  disabled={isInstalled || isInstalling}
                  onClick={() => handleInstall(item.id)}
                >
                  {isInstalling ? (
                    <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                  ) : isInstalled ? (
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                  ) : (
                    <Download className="mr-1 h-3 w-3" />
                  )}
                  {isInstalling ? "Carregando..." : isInstalled ? "Pronto" : "Importar"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
