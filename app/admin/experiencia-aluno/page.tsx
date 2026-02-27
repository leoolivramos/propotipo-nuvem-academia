import { Activity, BookOpen, CalendarDays, Package, PlayCircle } from "lucide-react"
import { ActivityCalendar } from "@/components/activity-calendar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockActivity, mockProjects, mockTemplates } from "@/lib/mock-data"

export default function AdminExperienciaAlunoPage() {
  const activeProjects = mockProjects.filter((project) => project.status === "active").length
  const pausedProjects = mockProjects.filter((project) => project.status === "finished").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Experiência do aluno</h1>
        <p className="text-sm text-muted-foreground">Visão de produtividade, calendário de atividade, templates, dependências e estado de ambientes.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Projetos ativos</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{activeProjects}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Projetos pausados/finalizados</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{pausedProjects}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Templates</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{mockTemplates.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Dependências populares</CardTitle></CardHeader><CardContent className="text-2xl font-bold">128</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Ações de ambiente/dia</CardTitle></CardHeader><CardContent className="text-2xl font-bold">412</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base flex items-center gap-2"><CalendarDays className="h-4 w-4 text-primary" />Calendário de atividade (heatmap)</CardTitle></CardHeader>
        <CardContent><ActivityCalendar data={mockActivity} /></CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Estado dos ambientes virtuais</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          <div className="rounded border border-border/60 p-3"><p className="font-medium">Iniciar</p><p className="text-muted-foreground">Operação saudável</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium">Pausar</p><p className="text-muted-foreground">Auto-save habilitado</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium">Retomar</p><p className="text-muted-foreground">Tempo médio 8s</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium">Excluir</p><p className="text-muted-foreground">Snapshot opcional</p></div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary"><BookOpen className="mr-1 h-3 w-3" />Catálogo de templates ativo</Badge>
        <Badge variant="outline"><Package className="mr-1 h-3 w-3" />Gestão simplificada de dependências</Badge>
        <Badge variant="outline"><PlayCircle className="mr-1 h-3 w-3" />Controle de ciclo de ambiente</Badge>
        <Badge variant="outline"><Activity className="mr-1 h-3 w-3" />Dashboard de produtividade</Badge>
      </div>
    </div>
  )
}
