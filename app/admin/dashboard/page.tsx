import { Activity, BookOpen, Bot, Cpu, Rocket, ShieldCheck, Users, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  mockInstitutionSubscription,
  mockInstitutionalStudents,
  mockLoginUsers,
  mockManagedClasses,
  mockManagedLabs,
  mockProfessorAccounts,
  mockProjects,
} from "@/lib/mock-data"

export default function AdminDashboardPage() {
  const creditsRemaining = mockInstitutionSubscription.creditsTotal - mockInstitutionSubscription.creditsUsed
  const critical = mockInstitutionalStudents.filter((student) => student.status === "critical").length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Administrativo</h1>
        <p className="text-sm text-muted-foreground">Visão central de produto, operação e infraestrutura do ecossistema.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Perfis cadastrados</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-2xl font-bold"><ShieldCheck className="h-4 w-4 text-primary" />{mockLoginUsers.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Créditos restantes</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-2xl font-bold"><Wallet className="h-4 w-4 text-primary" />{creditsRemaining}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Ambientes ativos</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-2xl font-bold"><BookOpen className="h-4 w-4 text-primary" />{mockProjects.filter((p) => p.status === "active").length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Labs ativos</CardTitle></CardHeader><CardContent className="flex items-center gap-2 text-2xl font-bold"><Cpu className="h-4 w-4 text-primary" />{mockManagedLabs.filter((lab) => lab.status === "active").length}</CardContent></Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardHeader><CardTitle className="text-base">Saúde por domínio</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded border border-border/60 p-3 text-sm"><span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" />RBAC / Contas</span><Badge variant="secondary">Estável</Badge></div>
            <div className="flex items-center justify-between rounded border border-border/60 p-3 text-sm"><span className="flex items-center gap-2"><Rocket className="h-4 w-4 text-primary" />Deploy / Preview</span><Badge variant="secondary">Operando</Badge></div>
            <div className="flex items-center justify-between rounded border border-border/60 p-3 text-sm"><span className="flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />Tutoria IA</span><Badge variant="secondary">Operando</Badge></div>
            <div className="flex items-center justify-between rounded border border-border/60 p-3 text-sm"><span className="flex items-center gap-2"><Activity className="h-4 w-4 text-primary" />Pedagógico</span><Badge variant={critical > 0 ? "outline" : "secondary"}>{critical > 0 ? `${critical} críticos` : "Saudável"}</Badge></div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader><CardTitle className="text-base">Indicadores rápidos</CardTitle></CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="rounded border border-border/60 p-3">Professores ativos: <strong>{mockProfessorAccounts.filter((teacher) => teacher.status === "active").length}</strong></p>
            <p className="rounded border border-border/60 p-3">Turmas B2B: <strong>{mockManagedClasses.length}</strong></p>
            <p className="rounded border border-border/60 p-3">Licenças ativas: <strong>{mockInstitutionSubscription.activeLicenses}/{mockInstitutionSubscription.totalLicenses}</strong></p>
            <p className="rounded border border-border/60 p-3">Alunos com progresso avançado: <strong>{mockInstitutionalStudents.filter((student) => student.status === "advanced").length}</strong></p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
