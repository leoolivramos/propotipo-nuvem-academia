import { Cpu, Power, Server, SplitSquareHorizontal } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminInfraestruturaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Orquestração e infraestrutura</h1>
        <p className="text-sm text-muted-foreground">Monitoramento de fatiamento de GPU, auto-scaling e desligamento automático de ambientes ociosos.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Partições GPU ativas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">12</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Ambientes pausados auto</CardTitle></CardHeader><CardContent className="text-2xl font-bold">23</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Nodos de cluster</CardTitle></CardHeader><CardContent className="text-2xl font-bold">9</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Uso médio CPU</CardTitle></CardHeader><CardContent className="text-2xl font-bold">61%</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Políticas ativas</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><SplitSquareHorizontal className="h-3.5 w-3.5" />Fatiamento de GPU</p><p className="text-muted-foreground">Distribuição lógica para múltiplos alunos simultâneos.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Power className="h-3.5 w-3.5" />Desligamento automático</p><p className="text-muted-foreground">Pausa por inatividade para liberar CPU/Memória.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Server className="h-3.5 w-3.5" />Orquestração</p><p className="text-muted-foreground">Escalonamento por fila de provisionamento.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Cpu className="h-3.5 w-3.5" />Observabilidade</p><p className="text-muted-foreground">Telemetria de VRAM, CPU e memória.</p></div>
        </CardContent>
      </Card>

      <Badge variant="outline">Meta SLO: provisionamento inicial em até 12 segundos em horário de pico.</Badge>
    </div>
  )
}
