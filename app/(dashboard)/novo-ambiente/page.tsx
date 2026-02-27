"use client"

import { useState } from "react"
import {
  FlaskConical,
  Globe,
  Layout,
  Server,
  Coffee,
  Zap,
  Search,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ProvisioningModal } from "@/components/provisioning-modal"
import { mockTemplates } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const iconMap: Record<string, React.ElementType> = {
  "flask-conical": FlaskConical,
  globe: Globe,
  layout: Layout,
  server: Server,
  coffee: Coffee,
  zap: Zap,
}

export default function NewEnvironmentPage() {
  const [search, setSearch] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const filtered = mockTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const handleSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setModalOpen(true)
  }

  const selectedTemplateName =
    mockTemplates.find((t) => t.id === selectedTemplate)?.name || ""

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Novo Ambiente
        </h1>
        <p className="text-sm text-muted-foreground">
          Escolha um template pre-configurado e comece a programar em segundos.
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Template Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((template) => {
          const Icon = iconMap[template.icon] || Server
          return (
            <Card
              key={template.id}
              className={cn(
                "group cursor-pointer border-border/50 transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
                "active:scale-[0.98]"
              )}
              onClick={() => handleSelect(template.id)}
            >
              <CardContent className="flex flex-col gap-4 p-5">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-[10px] opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    One-Click
                  </Badge>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {template.name}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {template.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {template.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[10px] font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            Nenhum template encontrado para &ldquo;{search}&rdquo;
          </p>
        </div>
      )}

      {/* Provisioning Modal */}
      <ProvisioningModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        templateName={selectedTemplateName}
      />
    </div>
  )
}
