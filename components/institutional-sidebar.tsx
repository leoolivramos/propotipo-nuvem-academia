"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Cloud,
  Moon,
  Sun,
  LogOut,
  Code2,
  FlaskConical,
  BrainCircuit,
} from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { mockUser } from "@/lib/mock-data"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const navItems = [
  { href: "/institucional/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/institucional/turmas", label: "Turmas", icon: Users },
  { href: "/ide", label: "IDE Web", icon: Code2 },
  { href: "/lab", label: "Lab. Ciencia de Dados", icon: FlaskConical },
  { href: "/lab-ia", label: "Lab. Inteligencia Artificial", icon: BrainCircuit },
]

export function InstitutionalSidebar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-16 flex-col items-center bg-sidebar py-4 lg:w-64 lg:items-stretch lg:px-4">
      <Link href="/institucional/dashboard" className="flex items-center gap-3 px-2 py-2">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary">
          <Cloud className="h-5 w-5 text-primary-foreground" />
        </div>
        <div className="hidden lg:block">
          <h1 className="text-sm font-bold text-sidebar-foreground">NuvemAcademia</h1>
          <p className="text-[10px] text-sidebar-foreground/50">Aluno Institucional</p>
        </div>
      </Link>

      <Separator className="my-4 bg-sidebar-border" />

      <nav className="flex flex-1 flex-col gap-1">
        <TooltipProvider delayDuration={0}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-primary"
                        : "text-sidebar-foreground/70"
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" />
                    <span className="hidden lg:inline">{item.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" className="lg:hidden">
                  {item.label}
                </TooltipContent>
              </Tooltip>
            )
          })}
        </TooltipProvider>
      </nav>

      <Separator className="my-4 bg-sidebar-border" />

      <div className="flex flex-col items-center gap-2 lg:items-stretch">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground lg:w-full lg:justify-start lg:gap-3 lg:px-3"
              >
                <Sun className="h-5 w-5 shrink-0 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 shrink-0 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100 lg:relative" />
                <span className="hidden lg:inline text-sm font-medium">Alternar Tema</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="lg:hidden">
              Alternar Tema
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Separator className="my-2 bg-sidebar-border" />

        <div className="flex items-center gap-3 rounded-lg px-2 py-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            {mockUser.avatar}
          </div>
          <div className="hidden min-w-0 lg:block">
            <p className="truncate text-sm font-medium text-sidebar-foreground">{mockUser.name}</p>
            <p className="truncate text-[10px] text-sidebar-foreground/50">Aluno Institucional</p>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  asChild
                  className="ml-auto hidden h-7 w-7 text-sidebar-foreground/50 hover:text-sidebar-foreground lg:flex"
                >
                  <Link href="/login">
                    <LogOut className="h-4 w-4" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Sair</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </aside>
  )
}
