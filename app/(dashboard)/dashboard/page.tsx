"use client"

import Link from "next/link"
import { Plus, Wallet } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/stats-cards"
import { ActivityCalendar } from "@/components/activity-calendar"
import { ProjectList } from "@/components/project-list"
import { mockProjects, mockActivity, mockUser } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground text-balance">
            Bem-vinda, {mockUser.name.split(" ")[0]}
          </h1>
          <p className="text-sm text-muted-foreground">
            Poder para criar. Liberdade para aprender.
          </p>
        </div>
        <Button asChild>
          <Link href="/novo-ambiente">
            <Plus className="mr-2 h-4 w-4" />
            Novo Ambiente
          </Link>
        </Button>
      </div>

      <StatsCards projects={mockProjects} />

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-foreground">
            Plano e Créditos
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/assinaturas" className="text-primary">
              Gerenciar
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Compre créditos extras e altere seu plano de forma independente.
          </p>
          <Button asChild size="sm">
            <Link href="/assinaturas">
              <Wallet className="mr-2 h-4 w-4" />
              Comprar créditos
            </Link>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-foreground">
            Calendário de Atividades
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ActivityCalendar data={mockActivity} />
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-base font-semibold text-foreground">
            Seus Projetos
          </CardTitle>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/novo-ambiente" className="text-primary">
              Ver Todos
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ProjectList projects={mockProjects} />
        </CardContent>
      </Card>
    </div>
  )
}
