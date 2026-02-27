import Link from "next/link"
import { BookOpen, CalendarClock, GraduationCap, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { mockInstitutionalClasses } from "@/lib/mock-data"

export default function TurmasPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Turmas</h1>
        <p className="text-sm text-muted-foreground">
          Turmas vinculadas ao seu acesso institucional e seus laboratórios disponíveis.
        </p>
      </div>

      <div className="space-y-4">
        {mockInstitutionalClasses.map((classroom) => (
          <Card key={classroom.id} className="border-border/60">
            <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base font-semibold text-foreground">{classroom.name}</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">{classroom.institution}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">
                  <CalendarClock className="mr-1 h-3 w-3" />
                  {classroom.nextSession}
                </Badge>
                <Badge variant="outline" className="text-[10px]">
                  {classroom.period}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <UserRound className="h-3.5 w-3.5" />
                  {classroom.teacher}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="h-3.5 w-3.5" />
                  {classroom.labs.length} laboratórios
                </span>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {classroom.labs.map((lab) => (
                  <div key={lab.id} className="rounded-lg border border-border/60 p-3">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">{lab.name}</p>
                      <Badge variant={lab.status === "active" ? "default" : "secondary"} className="text-[10px]">
                        {lab.status === "active" ? "Ativo" : "Agendado"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {lab.area} · {lab.teacher}
                    </p>
                    <Button variant="default" size="sm" className="mt-3 h-7 text-xs px-3" asChild>
                      <Link href={lab.area === "Deep Learning" ? "/lab-ia" : "/lab"}>
                        Entrar no laboratório
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="rounded-lg border border-border/60 bg-card p-4">
        <p className="flex items-center gap-2 text-xs text-muted-foreground">
          <GraduationCap className="h-3.5 w-3.5" />
          O acesso aos laboratórios é gerenciado pela instituição/professor responsável por cada turma.
        </p>
      </div>
    </div>
  )
}
