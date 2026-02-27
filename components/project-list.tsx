"use client"

import { useState } from "react"
import {
  Server,
  Layout,
  BarChart3,
  Globe,
  Brain,
  ArrowRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProvisioningModal } from "@/components/provisioning-modal"
import type { Project } from "@/lib/mock-data"

const iconMap: Record<string, React.ElementType> = {
  server: Server,
  layout: Layout,
  "bar-chart": BarChart3,
  globe: Globe,
  brain: Brain,
}

interface ProjectListProps {
  projects: Project[]
}

export function ProjectList({ projects }: ProjectListProps) {
  const [provisioningOpen, setProvisioningOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setProvisioningOpen(true)
  }

  return (
    <>
      <div className="grid gap-3">
        {projects.map((project) => {
          const Icon = iconMap[project.icon] || Server
          return (
            <button
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="w-full text-left"
            >
              <Card className="group cursor-pointer border-border/50 transition-all hover:border-primary/30 hover:shadow-md hover:shadow-primary/5">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Icon className="h-5 w-5 text-foreground/70" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="truncate text-sm font-semibold text-foreground">
                        {project.name}
                      </h3>
                      <Badge
                        variant={
                          project.status === "active" ? "default" : "secondary"
                        }
                        className="shrink-0 text-[10px]"
                      >
                        {project.status === "active" ? "Ativo" : "Finalizado"}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {project.template} &middot; {project.language}
                    </p>
                  </div>
                  <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                    <span>Acesso: {project.lastAccess}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-primary" />
                  </div>
                </CardContent>
              </Card>
            </button>
          )
        })}
      </div>

      <ProvisioningModal
        open={provisioningOpen}
        onOpenChange={setProvisioningOpen}
        templateName={selectedProject?.template ?? ""}
      />
    </>
  )
}
