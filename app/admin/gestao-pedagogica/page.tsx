import { GraduationCap, Eye, FlaskConical, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockInstitutionalStudents, mockManagedLabs } from "@/lib/mock-data"

export default function AdminGestaoPedagogicaPage() {
  const idle = mockInstitutionalStudents.filter((student) => student.status === "idle").length
  const critical = mockInstitutionalStudents.filter((student) => student.status === "critical").length
  const advanced = mockInstitutionalStudents.filter((student) => student.status === "advanced").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Gestão pedagógica</h1>
        <p className="text-sm text-muted-foreground">Painel para monitoramento docente em tempo real, laboratórios customizados e relatórios de desempenho.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alunos ociosos</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{idle}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Dificuldade crítica</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{critical}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Avançando rápido</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{advanced}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Labs customizados</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{mockManagedLabs.length}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Fluxos pedagógicos críticos</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3 text-sm">
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Eye className="h-3.5 w-3.5" />Monitoramento em tempo real</p><p className="text-muted-foreground">Uso, progresso e sinais de engajamento por turma.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><FlaskConical className="h-3.5 w-3.5" />Imagem base distribuída</p><p className="text-muted-foreground">Padronização de ambiente por laboratório.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><FileText className="h-3.5 w-3.5" />Relatórios analíticos</p><p className="text-muted-foreground">Detecção de ociosidade, risco e evolução acelerada.</p></div>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5" />As regras pedagógicas alimentam priorização de tutoria e intervenção docente.</p>
    </div>
  )
}
