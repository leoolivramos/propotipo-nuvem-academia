import { Download, FileText, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminRelatoriosPage() {
  const reports = [
    { name: "Relatório financeiro", range: "mensal", status: "pronto" },
    { name: "Relatório pedagógico", range: "semanal", status: "pronto" },
    { name: "Relatório de infraestrutura", range: "diário", status: "pronto" },
    { name: "Relatório de adoção IA", range: "mensal", status: "gerando" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Relatórios administrativos</h1>
        <p className="text-sm text-muted-foreground">Central de relatórios gerenciais para auditoria de produto, operação e ensino.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Relatórios disponíveis</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{reports.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Exportações hoje</CardTitle></CardHeader><CardContent className="text-2xl font-bold">18</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Tempo médio geração</CardTitle></CardHeader><CardContent className="text-2xl font-bold">14s</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Crescimento mensal</CardTitle></CardHeader><CardContent className="text-2xl font-bold">+12%</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Catálogo de relatórios</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div key={report.name} className="flex flex-col gap-2 rounded border border-border/60 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{report.name}</p>
                <p className="text-xs text-muted-foreground">Periodicidade: {report.range}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={report.status === "pronto" ? "secondary" : "outline"} className="text-[10px]">{report.status}</Badge>
                <Button size="sm" className="h-7 text-xs" disabled={report.status !== "pronto"}><Download className="mr-1 h-3 w-3" />Exportar</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary"><FileText className="mr-1 h-3 w-3" />Compliance-ready</Badge>
        <Badge variant="outline"><TrendingUp className="mr-1 h-3 w-3" />Séries históricas disponíveis</Badge>
      </div>
    </div>
  )
}
