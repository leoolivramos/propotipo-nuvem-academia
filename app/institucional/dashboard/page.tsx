import Link from "next/link"
import { BookOpen, Plus, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ActivityCalendar } from "@/components/activity-calendar"
import { mockActivity, mockInstitutionalClasses, mockUser } from "@/lib/mock-data"

const totalLabs = mockInstitutionalClasses.reduce(
  (total, classroom) => total + classroom.labs.length,
  0,
)

export default function InstitutionalDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Bem-vinda, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas turmas e laboratórios institucionais em um só lugar.
          </p>
        </div>
        <Button asChild>
          <Link href="/institucional/turmas">
            <Plus className="mr-2 h-4 w-4" />
            Ver Turmas
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Turmas Ativas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">{mockInstitutionalClasses.length}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Laboratórios Vinculados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-2xl font-bold text-foreground">{totalLabs}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 sm:col-span-2 lg:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Próxima Aula</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm font-semibold text-foreground">{mockInstitutionalClasses[0]?.name}</p>
            <p className="text-xs text-muted-foreground">{mockInstitutionalClasses[0]?.nextSession}</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">Calendário de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityCalendar data={mockActivity} />
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-foreground">Resumo das Turmas</CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/institucional/turmas" className="text-primary">
              Abrir Turmas
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {mockInstitutionalClasses.map((classroom) => (
            <div
              key={classroom.id}
              className="flex flex-col gap-3 rounded-lg border border-border/60 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">{classroom.name}</p>
                <p className="text-xs text-muted-foreground">
                  {classroom.institution} · {classroom.teacher} · {classroom.period}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  {classroom.activeLabs} labs ativos
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {classroom.labs.length} no total
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
