"use client"

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface TerminalLine {
  text: string
  type: "command" | "output" | "success" | "error" | "prompt"
}

const initialHistory: TerminalLine[] = [
  { text: "nuvem@workspace:~/projeto$ npm run dev", type: "command" },
  { text: "", type: "output" },
  { text: "  VITE v5.4.1  ready in 312 ms", type: "success" },
  { text: "", type: "output" },
  { text: "  -> Local:   http://localhost:5173/", type: "output" },
  { text: "  -> Network: http://172.18.0.2:5173/", type: "output" },
  { text: "  -> press h + enter to show help", type: "output" },
  { text: "", type: "output" },
]

const responses: Record<string, TerminalLine[]> = {
  ls: [
    { text: "node_modules/  public/  src/  .env  package.json  README.md  vite.config.js", type: "output" },
  ],
  "ls -la": [
    { text: "total 84", type: "output" },
    { text: "drwxr-xr-x  6 nuvem nuvem  4096 Feb 25 14:30 .", type: "output" },
    { text: "drwxr-xr-x  3 nuvem nuvem  4096 Feb 25 14:20 ..", type: "output" },
    { text: "-rw-r--r--  1 nuvem nuvem   243 Feb 25 14:20 .env", type: "output" },
    { text: "drwxr-xr-x 47 nuvem nuvem  4096 Feb 25 14:25 node_modules", type: "output" },
    { text: "-rw-r--r--  1 nuvem nuvem   412 Feb 25 14:20 package.json", type: "output" },
    { text: "drwxr-xr-x  2 nuvem nuvem  4096 Feb 25 14:20 public", type: "output" },
    { text: "drwxr-xr-x  4 nuvem nuvem  4096 Feb 25 14:28 src", type: "output" },
    { text: "-rw-r--r--  1 nuvem nuvem   178 Feb 25 14:20 vite.config.js", type: "output" },
  ],
  pwd: [
    { text: "/home/nuvem/projeto", type: "output" },
  ],
  whoami: [
    { text: "nuvem", type: "output" },
  ],
  "node -v": [
    { text: "v20.11.0", type: "success" },
  ],
  "npm -v": [
    { text: "10.2.4", type: "success" },
  ],
  clear: [],
  help: [
    { text: "Comandos disponiveis neste ambiente:", type: "output" },
    { text: "  ls, cd, pwd, whoami, cat, node, npm, git", type: "output" },
    { text: "  clear - limpar terminal", type: "output" },
    { text: "  help  - mostrar esta ajuda", type: "output" },
  ],
  "git status": [
    { text: "On branch main", type: "output" },
    { text: "Your branch is up to date with 'origin/main'.", type: "output" },
    { text: "", type: "output" },
    { text: "Changes not staged for commit:", type: "output" },
    { text: '  modified:   src/App.vue', type: "error" },
    { text: '  modified:   src/components/Header.vue', type: "error" },
    { text: "", type: "output" },
    { text: "no changes added to commit", type: "output" },
  ],
  "cat .env": [
    { text: "VITE_API_URL=http://localhost:3000/api", type: "output" },
    { text: "VITE_APP_TITLE=NuvemApp", type: "output" },
    { text: "NODE_ENV=development", type: "output" },
  ],
  "npm test": [
    { text: "PASS  src/__tests__/App.spec.js", type: "success" },
    { text: "PASS  src/__tests__/Header.spec.js", type: "success" },
    { text: "", type: "output" },
    { text: "Test Suites: 2 passed, 2 total", type: "success" },
    { text: "Tests:       5 passed, 5 total", type: "success" },
    { text: "Time:        1.234s", type: "output" },
  ],
}

export function IdeTerminal() {
  const [history, setHistory] = useState<TerminalLine[]>(initialHistory)
  const [input, setInput] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim()
    if (!trimmed) return

    const newLines: TerminalLine[] = [
      { text: `nuvem@workspace:~/projeto$ ${trimmed}`, type: "command" },
    ]

    if (trimmed === "clear") {
      setHistory([])
      setInput("")
      return
    }

    const response = responses[trimmed]
    if (response) {
      newLines.push(...response)
    } else {
      newLines.push({ text: `bash: ${trimmed.split(" ")[0]}: comando simulado`, type: "error" })
    }

    setHistory((prev) => [...prev, ...newLines])
    setInput("")
  }

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "command":
        return "text-foreground font-medium"
      case "success":
        return "text-primary"
      case "error":
        return "text-rose-400"
      case "prompt":
        return "text-primary"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div
      className="flex h-full flex-col bg-sidebar font-mono text-xs"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-3 py-2"
      >
        {history.map((line, i) => (
          <div key={i} className={cn("leading-5", getLineColor(line.type))}>
            {line.text || "\u00A0"}
          </div>
        ))}
        <div className="flex items-center leading-5">
          <span className="text-primary">{"nuvem@workspace:~/projeto$ "}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand(input)
            }}
            className="flex-1 bg-transparent text-foreground outline-none caret-primary"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  )
}
