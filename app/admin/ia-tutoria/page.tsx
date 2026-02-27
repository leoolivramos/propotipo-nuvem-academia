import { Bot, Brain, Bug, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockInstitutionalStudents } from "@/lib/mock-data"

export default function AdminIaTutoriaPage() {
  const criticalStudents = mockInstitutionalStudents.filter((student) => student.status === "critical").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">IA de tutoria integrada</h1>
        <p className="text-sm text-muted-foreground">Monitoramento de tutor em tempo real, feedback automático e trilhas personalizadas.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Sugestões em tempo real</CardTitle></CardHeader><CardContent className="text-2xl font-bold">1.248</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Correções automáticas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">486</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Trilhas dinâmicas geradas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">112</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alunos em risco</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{criticalStudents}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Fluxos de tutoria</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Bot className="h-3.5 w-3.5" />Tutor de código</p><p className="text-muted-foreground">Assistente contextual por linguagem/erro.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Bug className="h-3.5 w-3.5" />Correção automática</p><p className="text-muted-foreground">Feedback explicativo após execução.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Brain className="h-3.5 w-3.5" />Trilhas dinâmicas</p><p className="text-muted-foreground">Recomendação por lacuna de aprendizagem.</p></div>
        </CardContent>
      </Card>

      <Badge variant="outline"><Sparkles className="mr-1 h-3 w-3" />Modelo de tutoria operando com coleta contínua de sinais de progresso.</Badge>
    </div>
  )
}
