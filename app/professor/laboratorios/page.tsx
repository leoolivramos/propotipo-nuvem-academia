"use client"

import { useMemo, useState } from "react"
import { FlaskConical, Link2, Plus } from "lucide-react"
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
import {
  mockBaseImageCatalog,
  mockManagedClasses,
  mockManagedLabs,
  type BaseImageTemplate,
  type ManagedLab,
} from "@/lib/mock-data"
import { ProvisioningModal } from "@/components/provisioning-modal"

export default function LaboratoriosPage() {
  const [labs, setLabs] = useState<ManagedLab[]>(mockManagedLabs)
  const [baseImages, setBaseImages] = useState<BaseImageTemplate[]>(mockBaseImageCatalog)
  const [newLabName, setNewLabName] = useState("")
  const [newLabCategory, setNewLabCategory] = useState("")
  const [selectedBaseImageId, setSelectedBaseImageId] = useState(baseImages[0]?.id || "")
  const [newImageName, setNewImageName] = useState("")
  const [newImageStack, setNewImageStack] = useState("")
  const [newImageTag, setNewImageTag] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [pendingLab, setPendingLab] = useState<ManagedLab | null>(null)
  const [distributionOps, setDistributionOps] = useState(0)

  const totalLinkedClasses = useMemo(
    () => labs.reduce((sum, lab) => sum + lab.linkedClassIds.length, 0),
    [labs],
  )

  const totalStudentsCovered = useMemo(() => {
    const linkedClassIds = new Set(labs.flatMap((lab) => lab.linkedClassIds))
    return mockManagedClasses
      .filter((classroom) => linkedClassIds.has(classroom.id))
      .reduce((sum, classroom) => sum + classroom.students, 0)
  }, [labs])

  const handleCreateLab = () => {
    if (!newLabName.trim() || !newLabCategory.trim()) return

    const selectedBaseImage = baseImages.find((item) => item.id === selectedBaseImageId)
    if (!selectedBaseImage) return

    const newLab: ManagedLab = {
      id: `managed-lab-${Date.now()}`,
      name: newLabName.trim(),
      category: newLabCategory.trim(),
      status: "draft",
      linkedClassIds: [],
      baseImage: selectedBaseImage.image,
      updatedAt: "2026-02-27",
    }

    setPendingLab(newLab)
    setModalOpen(true)
  }

  const handleProvisionDone = () => {
    if (!pendingLab) return
    setLabs((prev) => [pendingLab, ...prev])
    setPendingLab(null)
    setNewLabName("")
    setNewLabCategory("")
    setSelectedBaseImageId(baseImages[0]?.id || "")
  }

  const handleCreateBaseImage = () => {
    if (!newImageName.trim() || !newImageStack.trim() || !newImageTag.trim()) return

    const newImage: BaseImageTemplate = {
      id: `base-img-${Date.now()}`,
      name: newImageName.trim(),
      stack: newImageStack.trim(),
      image: newImageTag.trim(),
    }

    setBaseImages((prev) => [newImage, ...prev])
    setSelectedBaseImageId(newImage.id)
    setNewImageName("")
    setNewImageStack("")
    setNewImageTag("")
  }

  const distributeBaseImage = (labId: string) => {
    setLabs((prev) =>
      prev.map((lab) =>
        lab.id === labId
          ? { ...lab, updatedAt: "2026-02-27" }
          : lab,
      ),
    )
    setDistributionOps((prev) => prev + 1)
  }

  const toggleClassLink = (labId: string, classId: string) => {
    setLabs((prev) =>
      prev.map((lab) => {
        if (lab.id !== labId) return lab
        const alreadyLinked = lab.linkedClassIds.includes(classId)
        return {
          ...lab,
          linkedClassIds: alreadyLinked
            ? lab.linkedClassIds.filter((id) => id !== classId)
            : [...lab.linkedClassIds, classId],
        }
      }),
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Laboratórios</h1>
        <p className="text-sm text-muted-foreground">
          Crie laboratórios, vincule ou remova turmas e acompanhe impacto em alunos atendidos.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total de Labs</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{labs.length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Labs Ativos</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{labs.filter((lab) => lab.status === "active").length}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Vínculos com Turmas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{totalLinkedClasses}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Alunos Cobertos</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{totalStudentsCovered}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Distribuições de Imagem</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{distributionOps}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Catálogo de Imagens</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{baseImages.length}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Criar Novo Laboratório</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-3">
          <div className="space-y-1"><Label>Nome</Label><Input value={newLabName} onChange={(event) => setNewLabName(event.target.value)} placeholder="Ex: Lab de Docker" /></div>
          <div className="space-y-1"><Label>Categoria</Label><Input value={newLabCategory} onChange={(event) => setNewLabCategory(event.target.value)} placeholder="Ex: DevOps" /></div>
          <div className="space-y-1">
            <Label>Catálogo de imagens base</Label>
            <Select value={selectedBaseImageId} onValueChange={setSelectedBaseImageId}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a imagem" />
              </SelectTrigger>
              <SelectContent>
                {baseImages.map((image) => (
                  <SelectItem key={image.id} value={image.id}>
                    {image.name} · {image.stack}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="sm:col-span-3 flex items-end"><Button onClick={handleCreateLab} className="h-9 text-xs"><Plus className="mr-1 h-3 w-3" />Criar laboratório</Button></div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Criar nova imagem base</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          <div className="space-y-1"><Label>Nome da imagem</Label><Input value={newImageName} onChange={(event) => setNewImageName(event.target.value)} placeholder="Ex: Node + Prisma" /></div>
          <div className="space-y-1"><Label>Stack</Label><Input value={newImageStack} onChange={(event) => setNewImageStack(event.target.value)} placeholder="Ex: Full-stack" /></div>
          <div className="space-y-1"><Label>Tag / repositório</Label><Input value={newImageTag} onChange={(event) => setNewImageTag(event.target.value)} placeholder="nuvemacademia/base-node-prisma:v1" /></div>
          <div className="flex items-end"><Button className="h-9 w-full text-xs" onClick={handleCreateBaseImage}>Adicionar ao catálogo</Button></div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {labs.map((lab) => (
          <Card key={lab.id} className="border-border/60">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle className="text-base">{lab.name}</CardTitle>
                <p className="text-xs text-muted-foreground">{lab.category} · Atualizado em {lab.updatedAt}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={lab.status === "active" ? "default" : "secondary"} className="text-[10px]">
                  {lab.status === "active" ? "Ativo" : "Rascunho"}
                </Badge>
                <Badge variant="outline" className="text-[10px]">{lab.linkedClassIds.length} turmas</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-2 text-xs text-muted-foreground">Imagem base: <span className="font-mono">{lab.baseImage}</span></p>
              <p className="mb-3 text-xs text-muted-foreground flex items-center gap-1"><Link2 className="h-3.5 w-3.5" />Adicionar ou remover turmas vinculadas:</p>
              <div className="flex flex-wrap gap-2">
                {mockManagedClasses.map((classroom) => {
                  const linked = lab.linkedClassIds.includes(classroom.id)
                  return (
                    <Button
                      key={classroom.id}
                      variant={linked ? "default" : "outline"}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleClassLink(lab.id, classroom.id)}
                    >
                      {linked ? "Remover" : "Adicionar"} {classroom.name}
                    </Button>
                  )
                })}
              </div>
              <div className="mt-3">
                <Button size="sm" className="h-7 text-xs" onClick={() => distributeBaseImage(lab.id)}>
                  Distribuir imagem base para turmas
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground flex items-center gap-2"><FlaskConical className="h-3.5 w-3.5" />As métricas acima são atualizadas conforme criação de laboratórios e vínculo de turmas.</p>

      <ProvisioningModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        templateName={pendingLab?.name || "Novo Laboratório"}
        redirectPath=""
        onDone={handleProvisionDone}
      />
    </div>
  )
}
