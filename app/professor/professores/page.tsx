"use client"

import { useMemo, useState } from "react"
import { Pencil, Trash2, UserPlus, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockProfessorAccounts, type ProfessorAccount } from "@/lib/mock-data"

export default function ProfessoresPage() {
  const [teachers, setTeachers] = useState<ProfessorAccount[]>(mockProfessorAccounts)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ name: "", email: "", specialty: "", role: "Professor" as ProfessorAccount["role"] })
  const [createForm, setCreateForm] = useState({ name: "", email: "", specialty: "", role: "Professor" as ProfessorAccount["role"] })

  const activeCount = teachers.filter((teacher) => teacher.status === "active").length
  const pendingCount = teachers.filter((teacher) => teacher.status === "pending").length
  const coordinatorsCount = teachers.filter((teacher) => teacher.role === "Coordenador").length
  const avgClasses = useMemo(() => {
    if (!teachers.length) return 0
    return (teachers.reduce((sum, teacher) => sum + teacher.classes, 0) / teachers.length).toFixed(1)
  }, [teachers])

  const handleDelete = (id: string) => {
    setTeachers((prev) => prev.filter((teacher) => teacher.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setForm({ name: "", email: "", specialty: "", role: "Professor" })
    }
  }

  const handleEditStart = (teacher: ProfessorAccount) => {
    setEditingId(teacher.id)
    setForm({ name: teacher.name, email: teacher.email, specialty: teacher.specialty, role: teacher.role })
  }

  const handleCreateTeacher = () => {
    if (!createForm.name.trim() || !createForm.email.trim() || !createForm.specialty.trim()) return

    const newTeacher: ProfessorAccount = {
      id: `prof-${Date.now()}`,
      name: createForm.name.trim(),
      email: createForm.email.trim(),
      specialty: createForm.specialty.trim(),
      role: createForm.role,
      status: "pending",
      classes: 0,
    }

    setTeachers((prev) => [newTeacher, ...prev])
    setCreateForm({ name: "", email: "", specialty: "", role: "Professor" })
  }

  const handleSaveEdit = () => {
    if (!editingId) return
    setTeachers((prev) =>
      prev.map((teacher) =>
        teacher.id === editingId
          ? {
              ...teacher,
              name: form.name || teacher.name,
              email: form.email || teacher.email,
              specialty: form.specialty || teacher.specialty,
              role: form.role,
            }
          : teacher,
      ),
    )
    setEditingId(null)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Professores</h1>
        <p className="text-sm text-muted-foreground">
          Gestão de contas de professor com edição, remoção e indicadores operacionais.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{teachers.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Ativos</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{activeCount}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pendentes</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{pendingCount}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Coordenadores</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{coordinatorsCount}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Média de Turmas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{avgClasses}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Cadastrar Professor (RBAC)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          <div className="space-y-1"><Label>Nome</Label><Input value={createForm.name} onChange={(event) => setCreateForm((prev) => ({ ...prev, name: event.target.value }))} /></div>
          <div className="space-y-1"><Label>Email</Label><Input value={createForm.email} onChange={(event) => setCreateForm((prev) => ({ ...prev, email: event.target.value }))} /></div>
          <div className="space-y-1"><Label>Especialidade</Label><Input value={createForm.specialty} onChange={(event) => setCreateForm((prev) => ({ ...prev, specialty: event.target.value }))} /></div>
          <div className="space-y-1"><Label>Perfil de acesso</Label>
            <Select value={createForm.role} onValueChange={(value: ProfessorAccount["role"]) => setCreateForm((prev) => ({ ...prev, role: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Professor">Professor</SelectItem>
                <SelectItem value="Coordenador">Coordenador</SelectItem>
                <SelectItem value="Administrador Institucional">Administrador Institucional</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-4">
            <Button size="sm" className="h-8 text-xs" onClick={handleCreateTeacher}><UserPlus className="mr-1 h-3 w-3" />Cadastrar conta</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle className="text-base">Lista de Professores</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {teachers.map((teacher) => (
            <div key={teacher.id} className="rounded-lg border border-border/60 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{teacher.name}</p>
                  <p className="text-xs text-muted-foreground">{teacher.email} · {teacher.specialty} · {teacher.role}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={teacher.status === "active" ? "default" : "secondary"} className="text-[10px]">
                    {teacher.status === "active" ? "Ativo" : "Pendente"}
                  </Badge>
                  <Badge variant="outline" className="text-[10px]">{teacher.classes} turmas</Badge>
                </div>
              </div>

              <div className="mt-3 flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleEditStart(teacher)}>
                  <Pencil className="mr-1 h-3 w-3" /> Editar
                </Button>
                <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => handleDelete(teacher.id)}>
                  <Trash2 className="mr-1 h-3 w-3" /> Apagar
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {editingId && (
        <Card className="border-border/60">
          <CardHeader>
            <CardTitle className="text-base">Editar Professor</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1"><Label>Nome</Label><Input value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} /></div>
            <div className="space-y-1"><Label>Email</Label><Input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} /></div>
            <div className="space-y-1"><Label>Especialidade</Label><Input value={form.specialty} onChange={(event) => setForm((prev) => ({ ...prev, specialty: event.target.value }))} /></div>
            <div className="space-y-1 sm:col-span-3"><Label>Perfil de acesso (RBAC)</Label>
              <Select value={form.role} onValueChange={(value: ProfessorAccount["role"]) => setForm((prev) => ({ ...prev, role: value }))}>
                <SelectTrigger className="w-full sm:w-[280px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Coordenador">Coordenador</SelectItem>
                  <SelectItem value="Administrador Institucional">Administrador Institucional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-3 flex gap-2">
              <Button size="sm" className="h-8 text-xs" onClick={handleSaveEdit}><UserPlus className="mr-1 h-3 w-3" />Salvar alterações</Button>
              <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => setEditingId(null)}>Cancelar</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <p className="text-xs text-muted-foreground flex items-center gap-2"><Users className="h-3.5 w-3.5" />Ações de editar/apagar são simuladas e refletem nas métricas em tempo real.</p>
    </div>
  )
}
