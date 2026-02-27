import { Link2, Mail, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockManagedClasses, mockProfessorAccounts } from "@/lib/mock-data"

export default function AdminTurmasB2BPage() {
  const totalStudents = mockManagedClasses.reduce((sum, classroom) => sum + classroom.students, 0)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Controle de turmas B2B</h1>
        <p className="text-sm text-muted-foreground">Acompanhamento de turmas, convites e gestão de licenças em lote por instituição/professor.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Turmas ativas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{mockManagedClasses.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alunos vinculados</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{totalStudents}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Convites por e-mail</CardTitle></CardHeader><CardContent className="text-2xl font-bold">84</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Convites por link</CardTitle></CardHeader><CardContent className="text-2xl font-bold">37</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Resumo operacional</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockManagedClasses.map((classroom) => (
            <div key={classroom.id} className="flex flex-col gap-2 rounded border border-border/60 p-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{classroom.name}</p>
                <p className="text-xs text-muted-foreground">{classroom.module} · próxima aula {classroom.nextClass}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]"><Users className="mr-1 h-3 w-3" />{classroom.students} alunos</Badge>
                <Badge variant="outline" className="text-[10px]"><Mail className="mr-1 h-3 w-3" />Convite ativo</Badge>
                <Badge variant="outline" className="text-[10px]"><Link2 className="mr-1 h-3 w-3" />Link compartilhável</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Capacidade docente</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {mockProfessorAccounts.map((teacher) => (
            <div key={teacher.id} className="flex items-center justify-between rounded border border-border/60 p-3 text-sm">
              <span>{teacher.name}</span>
              <Badge variant="outline" className="text-[10px]">{teacher.classes} turmas</Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
