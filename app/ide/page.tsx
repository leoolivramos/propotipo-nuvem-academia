"use client"

import { useState } from "react"
import Link from "next/link"
import {
  PanelLeftClose,
  PanelLeftOpen,
  Terminal,
  Cloud,
  ArrowLeft,
  GitBranch,
  Search,
  Settings,
  Bell,
  SquareTerminal,
  FileCode2,
  Package,
  CheckCircle2,
  MessageSquare,
  CircleAlert,
  Wrench,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { FileExplorer } from "@/components/ide/file-explorer"
import { CodeEditor } from "@/components/ide/code-editor"
import { IdeTerminal } from "@/components/ide/ide-terminal"
import { DeployPanel } from "@/components/ide/deploy-panel"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Switch } from "@/components/ui/switch"
import { mockIdeNotifications, mockIdeSettings } from "@/lib/mock-data"

const activityBarItems = [
  { icon: FileCode2, label: "Explorer", id: "explorer" },
  { icon: Search, label: "Buscar", id: "search" },
  { icon: GitBranch, label: "Controle de Versao", id: "git" },
  { icon: Package, label: "Extensoes", id: "extensions" },
]

export default function IdePage() {
  const [selectedFile, setSelectedFile] = useState("App.vue")
  const [showSidebar, setShowSidebar] = useState(true)
  const [showTerminal, setShowTerminal] = useState(true)
  const [activeTab, setActiveTab] = useState("explorer")
  const [openTabs, setOpenTabs] = useState(["App.vue"])
  const [showNotifications, setShowNotifications] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [notifications, setNotifications] = useState(mockIdeNotifications)
  const [settings, setSettings] = useState(mockIdeSettings)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const handleFileSelect = (name: string) => {
    setSelectedFile(name)
    if (!openTabs.includes(name)) {
      setOpenTabs((prev) => [...prev, name])
    }
  }

  const handleCloseTab = (name: string) => {
    const newTabs = openTabs.filter((t) => t !== name)
    setOpenTabs(newTabs)
    if (selectedFile === name) {
      setSelectedFile(newTabs[newTabs.length - 1] || "")
    }
  }

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const handleMarkAllRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    )
  }

  const handleToggleSetting = (settingId: string, checked: boolean) => {
    setSettings((prev) =>
      prev.map((setting) =>
        setting.id === settingId ? { ...setting, enabled: checked } : setting
      )
    )
  }

  const notificationMeta = {
    deploy: { icon: CheckCircle2, color: "text-primary" },
    terminal: { icon: Terminal, color: "text-muted-foreground" },
    collab: { icon: MessageSquare, color: "text-muted-foreground" },
    system: { icon: CircleAlert, color: "text-muted-foreground" },
  } as const

  return (
    <div className="flex h-screen flex-col bg-background overflow-hidden">
      {/* Top Title Bar */}
      <header className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-sidebar px-3">
        <div className="flex items-center gap-3">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Cloud className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-xs font-bold text-sidebar-foreground hidden sm:inline">
              NuvemAcademia
            </span>
          </Link>
          <span className="text-[10px] text-muted-foreground hidden sm:inline">
            /
          </span>
          <span className="text-xs text-sidebar-foreground hidden sm:inline">
            App Full-Stack Vue
          </span>
          <Badge variant="secondary" className="h-5 text-[10px] hidden md:inline-flex">
            <GitBranch className="mr-1 h-3 w-3" />
            main
          </Badge>
        </div>
        <div className="flex items-center gap-1">
          <DeployPanel />
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                    onClick={() => setShowNotifications(true)}
                    className="relative h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-3.5 w-3.5" />
                    {unreadCount > 0 && (
                      <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-semibold text-primary-foreground">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Notificações</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowSettings(true)}
                  className="h-7 w-7 text-muted-foreground hover:text-foreground"
                >
                  <Settings className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Configurações</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="h-7 gap-1 text-xs text-muted-foreground hover:text-foreground"
                >
                  <Link href="/dashboard">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Dashboard</span>
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voltar ao Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </header>

      {/* Main IDE Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-border bg-sidebar py-2">
          <TooltipProvider delayDuration={0}>
            {activityBarItems.map((item) => (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => {
                      if (activeTab === item.id) {
                        setShowSidebar(!showSidebar)
                      } else {
                        setActiveTab(item.id)
                        setShowSidebar(true)
                      }
                    }}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                      activeTab === item.id && showSidebar
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>

          <div className="mt-auto">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setShowTerminal(!showTerminal)}
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
                      showTerminal
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <SquareTerminal className="h-5 w-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">Terminal</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
            <SheetContent className="w-[360px] p-0 sm:max-w-[420px]">
              <SheetHeader className="border-b border-border">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <SheetTitle>Notificações</SheetTitle>
                    <SheetDescription>
                      Atualizações do projeto e da IDE em tempo real.
                    </SheetDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleMarkAllRead}
                    disabled={unreadCount === 0}
                    className="text-xs"
                  >
                    Marcar todas
                  </Button>
                </div>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-6rem)]">
                <div className="space-y-2 p-4">
                  {notifications.map((notification) => {
                    const meta = notificationMeta[notification.type]
                    const Icon = meta.icon
                    return (
                      <div
                        key={notification.id}
                        className={cn(
                          "rounded-md border border-border p-3",
                          notification.read ? "bg-background" : "bg-muted/30"
                        )}
                      >
                        <div className="flex items-start gap-2">
                          <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", meta.color)} />
                          <div className="min-w-0 flex-1">
                            <p className="text-xs font-medium text-foreground">
                              {notification.title}
                            </p>
                            <p className="mt-1 text-[11px] text-muted-foreground">
                              {notification.description}
                            </p>
                            <div className="mt-2 flex items-center justify-between gap-2">
                              <span className="text-[10px] text-muted-foreground">
                                {notification.time}
                              </span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="h-6 px-2 text-[10px]"
                                >
                                  Marcar lida
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          <Sheet open={showSettings} onOpenChange={setShowSettings}>
            <SheetContent className="w-[360px] p-0 sm:max-w-[420px]">
              <SheetHeader className="border-b border-border">
                <div className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <SheetTitle>Configurações</SheetTitle>
                    <SheetDescription>
                      Preferências da IDE para esta sessão.
                    </SheetDescription>
                  </div>
                </div>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-6rem)]">
                <div className="space-y-2 p-4">
                  {settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-start justify-between gap-3 rounded-md border border-border p-3"
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-foreground">
                          {setting.label}
                        </p>
                        <p className="mt-1 text-[11px] text-muted-foreground">
                          {setting.description}
                        </p>
                      </div>
                      <Switch
                        checked={setting.enabled}
                        onCheckedChange={(checked) =>
                          handleToggleSetting(setting.id, checked)
                        }
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>

        {/* Sidebar Panel */}
        {showSidebar && (
          <div className="w-56 shrink-0 border-r border-border lg:w-64">
            {activeTab === "explorer" && (
              <FileExplorer
                selectedFile={selectedFile}
                onSelectFile={handleFileSelect}
              />
            )}
            {activeTab === "search" && (
              <div className="flex h-full flex-col bg-sidebar p-3">
                <div className="border-b border-sidebar-border pb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    Buscar
                  </span>
                </div>
                <div className="mt-3">
                  <input
                    type="text"
                    placeholder="Buscar no projeto..."
                    className="w-full rounded-md border border-sidebar-border bg-sidebar px-3 py-1.5 text-xs text-sidebar-foreground placeholder:text-sidebar-foreground/40 focus:border-primary focus:outline-none"
                  />
                </div>
              </div>
            )}
            {activeTab === "git" && (
              <div className="flex h-full flex-col bg-sidebar p-3">
                <div className="border-b border-sidebar-border pb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    Controle de Versao
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-sidebar-foreground/80">
                    <GitBranch className="h-3.5 w-3.5 text-primary" />
                    <span>main</span>
                  </div>
                  <p className="text-[10px] text-sidebar-foreground/50">
                    2 alteracoes pendentes
                  </p>
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center gap-2 rounded px-2 py-1 text-xs text-yellow-400 hover:bg-muted/20">
                      <span className="font-mono">M</span>
                      <span>src/App.vue</span>
                    </div>
                    <div className="flex items-center gap-2 rounded px-2 py-1 text-xs text-yellow-400 hover:bg-muted/20">
                      <span className="font-mono">M</span>
                      <span>src/components/Header.vue</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "extensions" && (
              <div className="flex h-full flex-col bg-sidebar p-3">
                <div className="border-b border-sidebar-border pb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
                    Extensoes
                  </span>
                </div>
                <div className="mt-3 space-y-3">
                  {[
                    { name: "Volar", desc: "Vue Language Features", active: true },
                    { name: "ESLint", desc: "Linting JavaScript", active: true },
                    { name: "Prettier", desc: "Code Formatter", active: true },
                    { name: "GitLens", desc: "Git supercharged", active: false },
                  ].map((ext) => (
                    <div
                      key={ext.name}
                      className="flex items-center gap-2 rounded-md p-2 hover:bg-muted/20"
                    >
                      <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">
                        {ext.name[0]}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-medium text-sidebar-foreground">
                          {ext.name}
                        </p>
                        <p className="truncate text-[10px] text-sidebar-foreground/50">
                          {ext.desc}
                        </p>
                      </div>
                      <div
                        className={cn(
                          "ml-auto h-2 w-2 shrink-0 rounded-full",
                          ext.active ? "bg-primary" : "bg-muted-foreground/30"
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Editor + Terminal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="flex h-9 shrink-0 items-center border-b border-border bg-muted/30">
            {openTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFile(tab)}
                className={cn(
                  "group flex h-full items-center gap-2 border-r border-border px-4 text-xs transition-colors",
                  selectedFile === tab
                    ? "bg-background text-foreground border-t-2 border-t-primary"
                    : "bg-transparent text-muted-foreground hover:bg-muted/40"
                )}
              >
                <span className={cn(
                  tab.endsWith(".vue") ? "text-emerald-400" :
                  tab.endsWith(".js") ? "text-yellow-400" :
                  tab.endsWith(".json") ? "text-yellow-300" :
                  "text-muted-foreground",
                  "text-[10px]"
                )}>
                  {tab.endsWith(".vue") ? "V" : tab.endsWith(".js") ? "JS" : "{}"}
                </span>
                {tab}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCloseTab(tab)
                  }}
                  className="ml-1 hidden h-4 w-4 items-center justify-center rounded text-muted-foreground/50 hover:bg-muted hover:text-foreground group-hover:flex"
                >
                  x
                </button>
              </button>
            ))}
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden">
            <CodeEditor fileName={selectedFile} />
          </div>

          {/* Terminal */}
          {showTerminal && (
            <div className="flex shrink-0 flex-col border-t border-border" style={{ height: "35%" }}>
              <div className="flex h-8 items-center gap-3 border-b border-border bg-sidebar px-3">
                <Terminal className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-[10px] font-medium text-muted-foreground">
                  TERMINAL
                </span>
                <Badge variant="secondary" className="h-4 text-[9px]">
                  bash
                </Badge>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="ml-auto text-xs text-muted-foreground hover:text-foreground"
                >
                  x
                </button>
              </div>
              <div className="flex-1 overflow-hidden">
                <IdeTerminal />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <footer className="flex h-6 shrink-0 items-center justify-between border-t border-primary/30 bg-primary/10 px-3 text-[10px]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-primary">
            <GitBranch className="h-3 w-3" /> main
          </span>
          <span className="text-muted-foreground">UTF-8</span>
          <span className="text-muted-foreground">LF</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground">
            {selectedFile ? `${selectedFile}` : "Nenhum arquivo"}
          </span>
          <span className="text-primary">
            Docker: nuvemacademia/node-vue
          </span>
          <span className="text-muted-foreground">Node 20.11</span>
        </div>
      </footer>
    </div>
  )
}
