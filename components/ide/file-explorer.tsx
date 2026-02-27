"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  ChevronRight,
  ChevronDown,
  File,
  Folder,
  FolderOpen,
} from "lucide-react"

interface FileNode {
  name: string
  type: "file" | "folder"
  children?: FileNode[]
  language?: string
}

const fileTree: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          { name: "Header.vue", type: "file", language: "vue" },
          { name: "Sidebar.vue", type: "file", language: "vue" },
          { name: "Card.vue", type: "file", language: "vue" },
        ],
      },
      {
        name: "views",
        type: "folder",
        children: [
          { name: "Home.vue", type: "file", language: "vue" },
          { name: "About.vue", type: "file", language: "vue" },
        ],
      },
      { name: "App.vue", type: "file", language: "vue" },
      { name: "main.js", type: "file", language: "javascript" },
      { name: "router.js", type: "file", language: "javascript" },
      { name: "store.js", type: "file", language: "javascript" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "index.html", type: "file", language: "html" },
      { name: "favicon.ico", type: "file" },
    ],
  },
  { name: "package.json", type: "file", language: "json" },
  { name: "vite.config.js", type: "file", language: "javascript" },
  { name: ".env", type: "file" },
  { name: "README.md", type: "file", language: "markdown" },
]

function getFileColor(name: string): string {
  if (name.endsWith(".vue")) return "text-emerald-400"
  if (name.endsWith(".js")) return "text-yellow-400"
  if (name.endsWith(".ts")) return "text-blue-400"
  if (name.endsWith(".html")) return "text-orange-400"
  if (name.endsWith(".json")) return "text-yellow-300"
  if (name.endsWith(".md")) return "text-muted-foreground"
  if (name.endsWith(".env")) return "text-muted-foreground/60"
  return "text-muted-foreground"
}

function FileTreeItem({
  node,
  depth,
  selectedFile,
  onSelect,
}: {
  node: FileNode
  depth: number
  selectedFile: string
  onSelect: (name: string) => void
}) {
  const [isOpen, setIsOpen] = useState(depth < 1)

  if (node.type === "folder") {
    return (
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex w-full items-center gap-1 px-2 py-1 text-xs hover:bg-muted/40 transition-colors"
          style={{ paddingLeft: `${depth * 12 + 8}px` }}
        >
          {isOpen ? (
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          )}
          {isOpen ? (
            <FolderOpen className="h-3.5 w-3.5 shrink-0 text-primary/80" />
          ) : (
            <Folder className="h-3.5 w-3.5 shrink-0 text-primary/60" />
          )}
          <span className="truncate text-sidebar-foreground/90">{node.name}</span>
        </button>
        {isOpen && node.children && (
          <div>
            {node.children.map((child) => (
              <FileTreeItem
                key={child.name}
                node={child}
                depth={depth + 1}
                selectedFile={selectedFile}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => onSelect(node.name)}
      className={cn(
        "flex w-full items-center gap-1 px-2 py-1 text-xs transition-colors",
        selectedFile === node.name
          ? "bg-primary/10 text-primary"
          : "hover:bg-muted/40 text-sidebar-foreground/80"
      )}
      style={{ paddingLeft: `${depth * 12 + 20}px` }}
    >
      <File className={cn("h-3.5 w-3.5 shrink-0", getFileColor(node.name))} />
      <span className={cn("truncate", getFileColor(node.name))}>{node.name}</span>
    </button>
  )
}

export function FileExplorer({
  selectedFile,
  onSelectFile,
}: {
  selectedFile: string
  onSelectFile: (name: string) => void
}) {
  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="border-b border-sidebar-border px-3 py-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/50">
          Explorer
        </span>
      </div>
      <div className="flex-1 overflow-y-auto py-1">
        {fileTree.map((node) => (
          <FileTreeItem
            key={node.name}
            node={node}
            depth={0}
            selectedFile={selectedFile}
            onSelect={onSelectFile}
          />
        ))}
      </div>
    </div>
  )
}
