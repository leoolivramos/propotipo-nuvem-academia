import { BarChart3, Cpu, FlaskConical, GraduationCap, Power, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  mockInstitutionSubscription,
  mockInstitutionalStudents,
  mockManagedClasses,
  mockManagedLabs,
  mockProfessorAccounts,
} from "@/lib/mock-data"

export default function ProfessorDashboardPage() {
  const activeLabs = mockManagedLabs.filter((lab) => lab.status === "active").length
  const activeTeachers = mockProfessorAccounts.filter((teacher) => teacher.status === "active").length
  const avgProgress = Math.round(
    mockInstitutionalStudents.reduce((sum, student) => sum + student.progress, 0) /
      mockInstitutionalStudents.length,
  )
  const criticalStudents = mockInstitutionalStudents.filter((student) => student.status === "critical").length
  const idleStudents = mockInstitutionalStudents.filter((student) => student.status === "idle").length
  const advancedStudents = mockInstitutionalStudents.filter((student) => student.status === "advanced").length
  const creditsRemaining = mockInstitutionSubscription.creditsTotal - mockInstitutionSubscription.creditsUsed

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard Institucional</h1>
        <p className="text-sm text-muted-foreground">
          Métricas gerais de professores, turmas, laboratórios e desempenho dos alunos.
        </p>
      </div>

      <Card className="border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base">Assinatura e Créditos</CardTitle>
          <Badge variant="secondary" className="text-[10px]">{mockInstitutionSubscription.plan}</Badge>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Créditos restantes</p>
            <p className="text-xl font-bold text-foreground">{creditsRemaining}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Licenças ativas</p>
            <p className="text-xl font-bold text-foreground">{mockInstitutionSubscription.activeLicenses}/{mockInstitutionSubscription.totalLicenses}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Ciclo</p>
            <p className="text-xl font-bold text-foreground capitalize">{mockInstitutionSubscription.cycle}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Monitoramento pedagógico em tempo real</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Alunos ociosos</p>
            <p className="text-xl font-bold text-foreground">{idleStudents}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Dificuldade crítica</p>
            <p className="text-xl font-bold text-foreground">{criticalStudents}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Avanço acelerado</p>
            <p className="text-xl font-bold text-foreground">{advancedStudents}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Infraestrutura e orquestração</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Cpu className="h-3.5 w-3.5" />Fatiamento de GPU</p>
            <p className="text-sm font-medium text-foreground">12 partições ativas para laboratórios de IA</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground flex items-center gap-1"><Power className="h-3.5 w-3.5" />Desligamento automático</p>
            <p className="text-sm font-medium text-foreground">5 ambientes pausados por inatividade hoje</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Professores Ativos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{activeTeachers}</span>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Turmas</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{mockManagedClasses.length}</span>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Laboratórios Ativos</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <FlaskConical className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{activeLabs}</span>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Média de Progresso</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{avgProgress}%</span>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Resumo de Turmas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockManagedClasses.map((classroom) => (
            <div key={classroom.id} className="flex flex-col gap-2 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">{classroom.name}</p>
                <p className="text-xs text-muted-foreground">{classroom.module} · Próxima aula: {classroom.nextClass}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">{classroom.students} alunos</Badge>
                <Badge variant="outline" className="text-[10px]">Lab vinculado</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
