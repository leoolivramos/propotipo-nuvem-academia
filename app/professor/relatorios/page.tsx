"use client"

import { useMemo } from "react"
import { Download, FileText, LineChart, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  mockInstitutionalStudents,
  mockManagedClasses,
  mockManagedLabs,
  mockProfessorAccounts,
} from "@/lib/mock-data"

export default function RelatoriosPage() {
  const avgProgress = useMemo(() => {
    if (!mockInstitutionalStudents.length) return 0
    return Math.round(
      mockInstitutionalStudents.reduce((sum, student) => sum + student.progress, 0) /
        mockInstitutionalStudents.length,
    )
  }, [])

  const criticalStudents = mockInstitutionalStudents.filter((student) => student.status === "critical")
  const idleStudents = mockInstitutionalStudents.filter((student) => student.status === "idle")
  const advancedStudents = mockInstitutionalStudents.filter((student) => student.status === "advanced")

  const exportCsv = (name: string, rows: string[]) => {
    const csv = rows.join("\n")
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${name}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportStudents = () => {
    const rows = [
      "nome,email,progresso",
      ...mockInstitutionalStudents.map((student) => `${student.name},${student.email},${student.progress}`),
    ]
    exportCsv("relatorio-alunos", rows)
  }

  const exportClasses = () => {
    const rows = [
      "turma,modulo,alunos,proxima_aula",
      ...mockManagedClasses.map((classroom) => `${classroom.name},${classroom.module},${classroom.students},${classroom.nextClass}`),
    ]
    exportCsv("relatorio-turmas", rows)
  }

  const exportLabs = () => {
    const rows = [
      "laboratorio,categoria,status,turmas_vinculadas",
      ...mockManagedLabs.map((lab) => `${lab.name},${lab.category},${lab.status},${lab.linkedClassIds.length}`),
    ]
    exportCsv("relatorio-laboratorios", rows)
  }

  const exportPedagogicalAlert = () => {
    const rows = [
      "nome,email,progresso,status,ultima_atividade",
      ...[...criticalStudents, ...idleStudents].map(
        (student) => `${student.name},${student.email},${student.progress},${student.status},${student.lastActive}`,
      ),
    ]
    exportCsv("relatorio-alerta-pedagogico", rows)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Relatórios</h1>
        <p className="text-sm text-muted-foreground">
          Visualização e exportação de métricas úteis para acompanhamento pedagógico e operacional.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Professores</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{mockProfessorAccounts.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Turmas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{mockManagedClasses.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Laboratórios</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{mockManagedLabs.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Progresso Médio</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{avgProgress}%</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Segmentação de desempenho</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Dificuldade crítica</p>
            <p className="text-xl font-bold text-foreground">{criticalStudents.length}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Ociosos</p>
            <p className="text-xl font-bold text-foreground">{idleStudents.length}</p>
          </div>
          <div className="rounded-lg border border-border/60 p-3">
            <p className="text-xs text-muted-foreground">Avançando rápido</p>
            <p className="text-xl font-bold text-foreground">{advancedStudents.length}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="border-border/60">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-primary" />Relatório de Alunos</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">Lista de alunos e progresso individual para monitoramento de desempenho.</p>
            <Badge variant="secondary" className="text-[10px]">{mockInstitutionalStudents.length} registros</Badge>
            <Button size="sm" className="h-8 text-xs" onClick={exportStudents}><Download className="mr-1 h-3 w-3" />Exportar CSV</Button>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><LineChart className="h-4 w-4 text-primary" />Relatório de Turmas</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">Volume de alunos por turma e calendário de próximas aulas.</p>
            <Badge variant="secondary" className="text-[10px]">{mockManagedClasses.length} registros</Badge>
            <Button size="sm" className="h-8 text-xs" onClick={exportClasses}><Download className="mr-1 h-3 w-3" />Exportar CSV</Button>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />Relatório de Laboratórios</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <p className="text-xs text-muted-foreground">Situação dos laboratórios e quantidade de turmas vinculadas.</p>
            <Badge variant="secondary" className="text-[10px]">{mockManagedLabs.length} registros</Badge>
            <Button size="sm" className="h-8 text-xs" onClick={exportLabs}><Download className="mr-1 h-3 w-3" />Exportar CSV</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Alertas pedagógicos</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <p className="text-xs text-muted-foreground">Exporta alunos com baixa atividade e risco de dificuldade para ação proativa da coordenação.</p>
          <Button size="sm" className="h-8 text-xs" onClick={exportPedagogicalAlert}><Download className="mr-1 h-3 w-3" />Exportar alerta pedagógico</Button>
        </CardContent>
      </Card>
    </div>
  )
}
