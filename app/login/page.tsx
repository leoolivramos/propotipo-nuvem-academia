"use client"

import { FormEvent, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Cloud, Lock, Mail, UserRound } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockLoginUsers } from "@/lib/mock-data"

export default function LoginPage() {
  const router = useRouter()
  const [selectedProfileId, setSelectedProfileId] = useState(mockLoginUsers[0]?.id ?? "")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const selectedUser = useMemo(
    () => mockLoginUsers.find((user) => user.id === selectedProfileId),
    [selectedProfileId],
  )

  const handleFillCredentials = () => {
    if (!selectedUser) return
    setEmail(selectedUser.email)
    setPassword(selectedUser.password)
    setError("")
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedUser) return

    const isValid =
      email.trim().toLowerCase() === selectedUser.email.toLowerCase() &&
      password === selectedUser.password

    if (!isValid) {
      setError("Credenciais inválidas para o perfil selecionado.")
      return
    }

    setError("")
    const destination =
      selectedUser.profile === "Aluno Institucional"
        ? "/institucional/dashboard"
        : selectedUser.profile === "Professor/Instituição"
          ? "/professor/dashboard"
          : selectedUser.profile === "Administrador do Sistema"
            ? "/admin/dashboard"
          : "/dashboard"

    router.push(destination)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md border-border/60">
        <CardHeader className="space-y-4">
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Cloud className="h-5 w-5" />
          </div>
          <div className="text-center">
            <CardTitle className="text-xl">Acesso à Plataforma</CardTitle>
            <CardDescription>
              Entre com um dos perfis disponíveis para acessar o ambiente.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="profile">Perfil de acesso</Label>
              <Select value={selectedProfileId} onValueChange={setSelectedProfileId}>
                <SelectTrigger id="profile" className="w-full">
                  <SelectValue placeholder="Selecione o perfil" />
                </SelectTrigger>
                <SelectContent>
                  {mockLoginUsers.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.profile}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="seu.email@nuvemacademia.app"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="pl-9"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </p>
            )}

            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={handleFillCredentials} className="flex-1">
                Preencher teste
              </Button>
              <Button type="submit" className="flex-1">
                Entrar
              </Button>
            </div>
          </form>

          <div className="rounded-md border border-border/70 p-3">
            <p className="mb-2 text-xs font-medium text-foreground">Usuários disponíveis</p>
            <div className="space-y-2">
              {mockLoginUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between gap-2 text-xs">
                  <div className="flex min-w-0 items-center gap-2">
                    <UserRound className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="truncate text-muted-foreground">{user.profile}</span>
                  </div>
                  <Badge variant="outline" className="max-w-[45%] truncate text-[10px]">
                    {user.email}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Voltar para o <Link href="/dashboard" className="text-primary hover:underline">dashboard</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
