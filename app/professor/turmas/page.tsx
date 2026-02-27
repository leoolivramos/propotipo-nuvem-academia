"use client"

import { useMemo, useState } from "react"
import { FlaskConical, GraduationCap, MailPlus, Plus, UserPlus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  mockInstitutionSubscription,
  mockInstitutionalStudents,
  mockManagedClasses,
  mockManagedLabs,
  type ManagedClass,
  type ManagedLab,
} from "@/lib/mock-data"

export default function TurmasProfessorPage() {
  const [classes, setClasses] = useState<ManagedClass[]>(mockManagedClasses)
  const [labs, setLabs] = useState<ManagedLab[]>(mockManagedLabs)
  const [classLabLinks, setClassLabLinks] = useState<Record<string, string[]>>(() => {
    const initialLinks: Record<string, string[]> = {}
    mockManagedClasses.forEach((classroom) => {
      const linkedLabs = mockManagedLabs
        .filter((lab) => lab.linkedClassIds.includes(classroom.id))
        .map((lab) => lab.id)

      if (linkedLabs.length > 0) {
        initialLinks[classroom.id] = linkedLabs
      } else if (classroom.laboratoryId) {
        initialLinks[classroom.id] = [classroom.laboratoryId]
      }
    })
    return initialLinks
  })
  const [messagesSent, setMessagesSent] = useState(0)
  const [newClassName, setNewClassName] = useState("")
  const [newClassModule, setNewClassModule] = useState("")
  const [selectedClassId, setSelectedClassId] = useState<string>(mockManagedClasses[0]?.id ?? "")
  const [selectedLabByClass, setSelectedLabByClass] = useState<Record<string, string>>({})
  const [selectedStudentByClass, setSelectedStudentByClass] = useState<Record<string, string>>({})
  const [addedStudentsByClass, setAddedStudentsByClass] = useState<Record<string, string[]>>({})
  const [message, setMessage] = useState("")
  const [inviteEmail, setInviteEmail] = useState("")
  const [invitesSent, setInvitesSent] = useState(0)
  const [licensesPurchased, setLicensesPurchased] = useState(0)

  const totalStudents = useMemo(
    () => classes.reduce((sum, classroom) => sum + classroom.students, 0),
    [classes],
  )

  const linkedClassesCount = useMemo(() => {
    return classes.filter((classroom) => (classLabLinks[classroom.id] || []).length > 0).length
  }, [classes, classLabLinks])

  const totalClassLabLinks = useMemo(() => {
    return classes.reduce((total, classroom) => total + (classLabLinks[classroom.id] || []).length, 0)
  }, [classes, classLabLinks])

  const handleCreateClass = () => {
    if (!newClassName.trim() || !newClassModule.trim()) return
    const fallbackLab = labs[0]
    if (!fallbackLab) return

    const newClass: ManagedClass = {
      id: `class-${Date.now()}`,
      name: newClassName.trim(),
      module: newClassModule.trim(),
      students: 0,
      laboratoryId: fallbackLab.id,
      nextClass: "2026-03-05 19:00",
    }

    setClasses((prev) => [newClass, ...prev])
    setClassLabLinks((prev) => ({
      ...prev,
      [newClass.id]: [fallbackLab.id],
    }))
    setLabs((prev) =>
      prev.map((lab) =>
        lab.id === fallbackLab.id
          ? { ...lab, linkedClassIds: [...new Set([...lab.linkedClassIds, newClass.id])] }
          : lab,
      ),
    )
    setSelectedClassId(newClass.id)
    setNewClassName("")
    setNewClassModule("")
  }

  const addStudentToClass = (classId: string) => {
    const selectedStudentId = selectedStudentByClass[classId]
    if (!selectedStudentId) return

    const alreadyAdded = addedStudentsByClass[classId]?.includes(selectedStudentId)
    if (alreadyAdded) return

    setAddedStudentsByClass((prev) => ({
      ...prev,
      [classId]: [...(prev[classId] || []), selectedStudentId],
    }))

    setClasses((prev) =>
      prev.map((classroom) =>
        classroom.id === classId ? { ...classroom, students: classroom.students + 1 } : classroom,
      ),
    )

    setSelectedStudentByClass((prev) => ({
      ...prev,
      [classId]: "",
    }))
  }

  const removeStudentFromClass = (classId: string, studentId: string) => {
    const currentStudents = addedStudentsByClass[classId] || []
    const exists = currentStudents.includes(studentId)
    if (!exists) return

    setAddedStudentsByClass((prev) => ({
      ...prev,
      [classId]: (prev[classId] || []).filter((id) => id !== studentId),
    }))

    setClasses((prev) =>
      prev.map((classroom) =>
        classroom.id === classId
          ? { ...classroom, students: Math.max(0, classroom.students - 1) }
          : classroom,
      ),
    )
  }

  const handleSendMessage = () => {
    if (!selectedClassId || !message.trim()) return
    setMessagesSent((prev) => prev + 1)
    setMessage("")
  }

  const activeLicenses = mockInstitutionSubscription.activeLicenses + licensesPurchased
  const availableLicenses = Math.max(0, mockInstitutionSubscription.totalLicenses - activeLicenses)

  const handleInviteByEmail = () => {
    if (!inviteEmail.trim()) return
    setInvitesSent((prev) => prev + 1)
    setInviteEmail("")
  }

  const handleInviteByLink = async () => {
    const link = `https://nuvemacademia.app/invite/${selectedClassId || "turma"}-${Date.now()}`
    try {
      await navigator.clipboard.writeText(link)
    } catch {}
    setInvitesSent((prev) => prev + 1)
  }

  const handleBuyLicenses = () => {
    setLicensesPurchased((prev) => prev + 10)
  }

  const handleLinkLabToClass = (classId: string) => {
    const targetLabId = selectedLabByClass[classId]
    if (!targetLabId) return

    const alreadyLinked = (classLabLinks[classId] || []).includes(targetLabId)
    if (alreadyLinked) return

    setClassLabLinks((prev) => ({
      ...prev,
      [classId]: [...(prev[classId] || []), targetLabId],
    }))

    setClasses((prev) =>
      prev.map((classroom) =>
        classroom.id === classId && !classroom.laboratoryId
          ? { ...classroom, laboratoryId: targetLabId }
          : classroom,
      ),
    )

    setLabs((prev) =>
      prev.map((lab) => {
        if (lab.id === targetLabId) {
          return {
            ...lab,
            linkedClassIds: [...new Set([...lab.linkedClassIds, classId])],
          }
        }
        return lab
      }),
    )
  }

  const removeLabFromClass = (classId: string, labId: string) => {
    const updatedLinks = (classLabLinks[classId] || []).filter((id) => id !== labId)
    setClassLabLinks((prev) => ({
      ...prev,
      [classId]: updatedLinks,
    }))

    setLabs((prev) =>
      prev.map((lab) =>
        lab.id === labId
          ? { ...lab, linkedClassIds: lab.linkedClassIds.filter((id) => id !== classId) }
          : lab,
      ),
    )

    setClasses((prev) =>
      prev.map((classroom) => {
        if (classroom.id !== classId) return classroom
        return {
          ...classroom,
          laboratoryId: updatedLinks[0] || "",
        }
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Turmas</h1>
        <p className="text-sm text-muted-foreground">
          Crie turmas por módulo/disciplina, adicione alunos e envie mensagens para comunicação acadêmica.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-7">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Turmas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{classes.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alunos Vinculados</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{totalStudents}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Mensagens Enviadas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{messagesSent}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Média por Turma</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{classes.length ? Math.round(totalStudents / classes.length) : 0}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Convites Enviados</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{invitesSent}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Turmas com Lab</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{linkedClassesCount}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Vínculos Turma-Lab</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{totalClassLabLinks}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Licenças Disponíveis</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{availableLicenses}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Criar Turma</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1"><Label>Nome da turma</Label><Input value={newClassName} onChange={(event) => setNewClassName(event.target.value)} placeholder="Ex: Engenharia de Software" /></div>
          <div className="space-y-1"><Label>Módulo/Disciplina</Label><Input value={newClassModule} onChange={(event) => setNewClassModule(event.target.value)} placeholder="Ex: Módulo 5" /></div>
          <div className="flex items-end"><Button onClick={handleCreateClass} className="h-9 w-full text-xs"><Plus className="mr-1 h-3 w-3" />Criar turma</Button></div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Convidar alunos e gerenciar licenças (B2B)</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="space-y-1">
              <Label>Email do aluno</Label>
              <Input value={inviteEmail} onChange={(event) => setInviteEmail(event.target.value)} placeholder="aluno@instituicao.edu" />
            </div>
            <div className="space-y-1">
              <Label>Turma (ID)</Label>
              <Input value={selectedClassId} onChange={(event) => setSelectedClassId(event.target.value)} placeholder="class-1" />
            </div>
            <div className="flex items-end gap-2">
              <Button size="sm" className="h-9 text-xs" onClick={handleInviteByEmail}>Convidar por e-mail</Button>
              <Button variant="outline" size="sm" className="h-9 text-xs" onClick={handleInviteByLink}>Gerar link</Button>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="text-[10px]">Licenças ativas: {activeLicenses}</Badge>
            <Badge variant="outline" className="text-[10px]">Total contratado: {mockInstitutionSubscription.totalLicenses}</Badge>
            <Button variant="outline" size="sm" className="h-7 text-xs" onClick={handleBuyLicenses}>Comprar +10 licenças</Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {classes.map((classroom) => (
          <Card key={classroom.id} className="border-border/60">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">{classroom.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{classroom.module} · Próxima aula: {classroom.nextClass}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-[10px]">{classroom.students} alunos</Badge>
                <Badge variant="outline" className="text-[10px]">
                  Labs vinculados: {(classLabLinks[classroom.id] || []).length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select
                  value={selectedLabByClass[classroom.id] || ""}
                  onValueChange={(value) =>
                    setSelectedLabByClass((prev) => ({ ...prev, [classroom.id]: value }))
                  }
                >
                  <SelectTrigger className="w-full sm:w-[320px]">
                    <SelectValue placeholder="Selecione um laboratório" />
                  </SelectTrigger>
                  <SelectContent>
                    {labs.map((lab) => (
                      <SelectItem key={lab.id} value={lab.id}>
                        {lab.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs"
                  onClick={() => handleLinkLabToClass(classroom.id)}
                  disabled={!selectedLabByClass[classroom.id]}
                >
                  <FlaskConical className="mr-1 h-3 w-3" />Vincular laboratório
                </Button>
              </div>

              {(classLabLinks[classroom.id] || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(classLabLinks[classroom.id] || []).map((labId) => {
                    const linkedLab = labs.find((lab) => lab.id === labId)
                    if (!linkedLab) return null
                    return (
                      <Badge key={labId} variant="outline" className="text-[10px]">
                        {linkedLab.name}
                        <button
                          type="button"
                          className="ml-1 text-[10px] opacity-80 hover:opacity-100"
                          onClick={() => removeLabFromClass(classroom.id, labId)}
                        >
                          ×
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )}

              <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                <Select
                  value={selectedStudentByClass[classroom.id] || ""}
                  onValueChange={(value) =>
                    setSelectedStudentByClass((prev) => ({ ...prev, [classroom.id]: value }))
                  }
                >
                  <SelectTrigger className="w-full sm:w-[260px]">
                    <SelectValue placeholder="Selecione um aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockInstitutionalStudents.map((student) => {
                      const alreadyAdded = addedStudentsByClass[classroom.id]?.includes(student.id)
                      return (
                        <SelectItem key={student.id} value={student.id} disabled={alreadyAdded}>
                          {student.name}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  className="h-9 text-xs"
                  onClick={() => addStudentToClass(classroom.id)}
                  disabled={!selectedStudentByClass[classroom.id]}
                >
                  <UserPlus className="mr-1 h-3 w-3" />Adicionar aluno
                </Button>

                <Badge variant="outline" className="h-9 px-2 text-[10px]">
                  Base disponível: {mockInstitutionalStudents.length} alunos
                </Badge>
              </div>

              {(addedStudentsByClass[classroom.id] || []).length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {(addedStudentsByClass[classroom.id] || []).map((studentId) => {
                    const student = mockInstitutionalStudents.find((item) => item.id === studentId)
                    if (!student) return null
                    return (
                      <Badge key={studentId} variant="secondary" className="text-[10px]">
                        {student.name}
                        <button
                          type="button"
                          className="ml-1 text-[10px] opacity-80 hover:opacity-100"
                          onClick={() => removeStudentFromClass(classroom.id, studentId)}
                        >
                          ×
                        </button>
                      </Badge>
                    )
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Enviar mensagem para turma</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Turma destino (ID)</Label>
              <Input value={selectedClassId} onChange={(event) => setSelectedClassId(event.target.value)} placeholder="class-1" />
            </div>
            <div className="space-y-1">
              <Label>Mensagem</Label>
              <Textarea value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Comunicado para os alunos..." className="min-h-20" />
            </div>
          </div>
          <Button size="sm" className="h-8 text-xs" onClick={handleSendMessage}><MailPlus className="mr-1 h-3 w-3" />Enviar mensagem</Button>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground flex items-center gap-2"><GraduationCap className="h-3.5 w-3.5" />Métricas e totais atualizam automaticamente com criação de turma, vínculo de laboratório, adição de alunos e mensagens.</p>
    </div>
  )
}
