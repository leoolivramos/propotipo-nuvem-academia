"use client"

import { useState } from "react"
import { Plus, ShieldCheck, UserCog } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockLoginUsers, type LoginAccessUser } from "@/lib/mock-data"

export default function AdminRbacPage() {
  const [users, setUsers] = useState<LoginAccessUser[]>(mockLoginUsers)
  const [form, setForm] = useState({
    email: "",
    password: "12345678",
    profile: "Aluno Individual" as LoginAccessUser["profile"],
  })

  const createUser = () => {
    if (!form.email.trim()) return
    const newUser: LoginAccessUser = {
      id: `login-${Date.now()}`,
      email: form.email.trim(),
      password: form.password,
      profile: form.profile,
    }
    setUsers((prev) => [newUser, ...prev])
    setForm({ email: "", password: "12345678", profile: "Aluno Individual" })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">RBAC e multi-perfil</h1>
        <p className="text-sm text-muted-foreground">Gerencie contas e níveis de acesso para B2C, B2B, Professor/Instituição e Admin.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Contas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{users.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Aluno Individual</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{users.filter((u) => u.profile === "Aluno Individual").length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Aluno Institucional</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{users.filter((u) => u.profile === "Aluno Institucional").length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Admins</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{users.filter((u) => u.profile === "Administrador do Sistema").length}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Cadastrar conta</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          <div className="space-y-1"><Label>Email</Label><Input value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} placeholder="usuario@nuvemacademia.app" /></div>
          <div className="space-y-1"><Label>Senha</Label><Input value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} /></div>
          <div className="space-y-1"><Label>Perfil</Label>
            <Select value={form.profile} onValueChange={(value: LoginAccessUser["profile"]) => setForm((prev) => ({ ...prev, profile: value }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Aluno Individual">Aluno Individual</SelectItem>
                <SelectItem value="Aluno Institucional">Aluno Institucional</SelectItem>
                <SelectItem value="Professor/Instituição">Professor/Instituição</SelectItem>
                <SelectItem value="Administrador do Sistema">Administrador do Sistema</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end"><Button className="h-9 w-full text-xs" onClick={createUser}><Plus className="mr-1 h-3 w-3" />Criar</Button></div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Contas e permissões</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col gap-2 rounded border border-border/60 p-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground">{user.email}</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">{user.profile}</Badge>
                <Badge variant="outline" className="text-[10px]"><ShieldCheck className="mr-1 h-3 w-3" />Escopo ativo</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <p className="flex items-center gap-2 text-xs text-muted-foreground"><UserCog className="h-3.5 w-3.5" />RBAC é aplicado por perfil no fluxo de login e navegação por módulo.</p>
    </div>
  )
}
