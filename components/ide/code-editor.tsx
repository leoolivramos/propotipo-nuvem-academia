"use client"

import { cn } from "@/lib/utils"

interface CodeLine {
  content: string
  indent: number
}

interface FileContent {
  language: string
  lines: CodeLine[]
}

const fileContents: Record<string, FileContent> = {
  "App.vue": {
    language: "vue",
    lines: [
      { content: '<template>', indent: 0 },
      { content: '  <div id="app">', indent: 0 },
      { content: '    <Header />', indent: 0 },
      { content: '    <main class="container">', indent: 0 },
      { content: '      <router-view />', indent: 0 },
      { content: '    </main>', indent: 0 },
      { content: '    <Sidebar :visible="showSidebar" />', indent: 0 },
      { content: '  </div>', indent: 0 },
      { content: '</template>', indent: 0 },
      { content: '', indent: 0 },
      { content: '<script setup>', indent: 0 },
      { content: "import { ref } from 'vue'", indent: 0 },
      { content: "import Header from './components/Header.vue'", indent: 0 },
      { content: "import Sidebar from './components/Sidebar.vue'", indent: 0 },
      { content: '', indent: 0 },
      { content: 'const showSidebar = ref(true)', indent: 0 },
      { content: '</script>', indent: 0 },
      { content: '', indent: 0 },
      { content: '<style scoped>', indent: 0 },
      { content: '#app {', indent: 0 },
      { content: '  font-family: Inter, sans-serif;', indent: 0 },
      { content: '  color: #e2e8f0;', indent: 0 },
      { content: '  background: #0f172a;', indent: 0 },
      { content: '  min-height: 100vh;', indent: 0 },
      { content: '}', indent: 0 },
      { content: '', indent: 0 },
      { content: '.container {', indent: 0 },
      { content: '  max-width: 1200px;', indent: 0 },
      { content: '  margin: 0 auto;', indent: 0 },
      { content: '  padding: 2rem;', indent: 0 },
      { content: '}', indent: 0 },
      { content: '</style>', indent: 0 },
    ],
  },
  "main.js": {
    language: "javascript",
    lines: [
      { content: "import { createApp } from 'vue'", indent: 0 },
      { content: "import App from './App.vue'", indent: 0 },
      { content: "import router from './router'", indent: 0 },
      { content: "import store from './store'", indent: 0 },
      { content: '', indent: 0 },
      { content: "import './assets/main.css'", indent: 0 },
      { content: '', indent: 0 },
      { content: 'const app = createApp(App)', indent: 0 },
      { content: '', indent: 0 },
      { content: 'app.use(router)', indent: 0 },
      { content: 'app.use(store)', indent: 0 },
      { content: '', indent: 0 },
      { content: "app.mount('#app')", indent: 0 },
    ],
  },
  "router.js": {
    language: "javascript",
    lines: [
      { content: "import { createRouter, createWebHistory } from 'vue-router'", indent: 0 },
      { content: "import Home from './views/Home.vue'", indent: 0 },
      { content: "import About from './views/About.vue'", indent: 0 },
      { content: '', indent: 0 },
      { content: 'const routes = [', indent: 0 },
      { content: "  { path: '/', name: 'Home', component: Home },", indent: 0 },
      { content: "  { path: '/about', name: 'About', component: About },", indent: 0 },
      { content: ']', indent: 0 },
      { content: '', indent: 0 },
      { content: 'const router = createRouter({', indent: 0 },
      { content: '  history: createWebHistory(),', indent: 0 },
      { content: '  routes,', indent: 0 },
      { content: '})', indent: 0 },
      { content: '', indent: 0 },
      { content: 'export default router', indent: 0 },
    ],
  },
  "Header.vue": {
    language: "vue",
    lines: [
      { content: '<template>', indent: 0 },
      { content: '  <header class="header">', indent: 0 },
      { content: '    <nav class="nav">', indent: 0 },
      { content: '      <div class="logo">', indent: 0 },
      { content: '        <CloudIcon />', indent: 0 },
      { content: '        <span>NuvemApp</span>', indent: 0 },
      { content: '      </div>', indent: 0 },
      { content: '      <ul class="nav-links">', indent: 0 },
      { content: '        <li><router-link to="/">Home</router-link></li>', indent: 0 },
      { content: '        <li><router-link to="/about">Sobre</router-link></li>', indent: 0 },
      { content: '      </ul>', indent: 0 },
      { content: '    </nav>', indent: 0 },
      { content: '  </header>', indent: 0 },
      { content: '</template>', indent: 0 },
      { content: '', indent: 0 },
      { content: '<script setup>', indent: 0 },
      { content: "import CloudIcon from './icons/CloudIcon.vue'", indent: 0 },
      { content: '</script>', indent: 0 },
      { content: '', indent: 0 },
      { content: '<style scoped>', indent: 0 },
      { content: '.header {', indent: 0 },
      { content: '  border-bottom: 1px solid #1e293b;', indent: 0 },
      { content: '  padding: 1rem 2rem;', indent: 0 },
      { content: '}', indent: 0 },
      { content: '.nav {', indent: 0 },
      { content: '  display: flex;', indent: 0 },
      { content: '  align-items: center;', indent: 0 },
      { content: '  justify-content: space-between;', indent: 0 },
      { content: '}', indent: 0 },
      { content: '</style>', indent: 0 },
    ],
  },
  "package.json": {
    language: "json",
    lines: [
      { content: '{', indent: 0 },
      { content: '  "name": "nuvem-app",', indent: 0 },
      { content: '  "private": true,', indent: 0 },
      { content: '  "version": "1.0.0",', indent: 0 },
      { content: '  "type": "module",', indent: 0 },
      { content: '  "scripts": {', indent: 0 },
      { content: '    "dev": "vite",', indent: 0 },
      { content: '    "build": "vite build",', indent: 0 },
      { content: '    "preview": "vite preview"', indent: 0 },
      { content: '  },', indent: 0 },
      { content: '  "dependencies": {', indent: 0 },
      { content: '    "vue": "^3.4.0",', indent: 0 },
      { content: '    "vue-router": "^4.3.0",', indent: 0 },
      { content: '    "vuex": "^4.1.0"', indent: 0 },
      { content: '  },', indent: 0 },
      { content: '  "devDependencies": {', indent: 0 },
      { content: '    "@vitejs/plugin-vue": "^5.0.0",', indent: 0 },
      { content: '    "vite": "^5.4.0"', indent: 0 },
      { content: '  }', indent: 0 },
      { content: '}', indent: 0 },
    ],
  },
}

function tokenize(line: string, language: string) {
  const tokens: { text: string; className: string }[] = []

  if (!line.trim()) {
    tokens.push({ text: " ", className: "" })
    return tokens
  }

  // Simple syntax highlighting
  const patterns: [RegExp, string][] = language === "json"
    ? [
        [/"[^"]*"\s*:/g, "text-sky-300"],       // keys
        [/"[^"]*"/g, "text-primary"],            // string values
        [/\b(true|false|null)\b/g, "text-orange-300"],
        [/\b\d+(\.\d+)?\b/g, "text-orange-300"],
        [/[{}[\],]/g, "text-muted-foreground"],
      ]
    : [
        // HTML/template tags
        [/<\/?[\w-]+/g, "text-rose-400"],
        [/\/?>|<\//g, "text-rose-400"],
        // Attributes
        [/\b(class|id|to|visible|name|path|component)\s*=/g, "text-sky-300"],
        // Keywords
        [/\b(import|from|export|default|const|let|var|return|function|new|if|else)\b/g, "text-rose-400"],
        // Strings
        [/'[^']*'|"[^"]*"/g, "text-primary"],
        // Vue specific
        [/\b(ref|computed|reactive|watch|onMounted|defineProps)\b/g, "text-yellow-300"],
        // Methods
        [/\.(use|mount|createApp|createRouter|createWebHistory)\b/g, "text-sky-300"],
        // Comments
        [/\/\/.*/g, "text-muted-foreground/60"],
        // CSS properties
        [/[\w-]+(?=\s*:)/g, "text-sky-300"],
        // CSS values with units
        [/:\s*[^;{}]+/g, "text-primary/80"],
        // Numbers
        [/\b\d+(\.\d+)?(px|rem|vh|vw|%)?\b/g, "text-orange-300"],
      ]

  // For simplicity, just do line-level coloring based on content
  const trimmed = line.trim()

  if (trimmed.startsWith("//") || trimmed.startsWith("/*")) {
    tokens.push({ text: line, className: "text-muted-foreground/50 italic" })
  } else if (trimmed.startsWith("<template>") || trimmed.startsWith("</template>") || trimmed.startsWith("<script") || trimmed.startsWith("</script>") || trimmed.startsWith("<style") || trimmed.startsWith("</style>")) {
    tokens.push({ text: line, className: "text-rose-400 font-semibold" })
  } else if (trimmed.startsWith("import ") || trimmed.startsWith("export ") || trimmed.startsWith("const ") || trimmed.startsWith("let ") || trimmed.startsWith("var ")) {
    // Split keyword from rest
    const match = trimmed.match(/^(import|export|const|let|var|default)\s/)
    if (match) {
      const keyword = match[1]
      const rest = line.replace(keyword, "")
      tokens.push({ text: keyword, className: "text-rose-400" })
      // Check for strings in rest
      const strParts = rest.split(/((?:'[^']*')|(?:"[^"]*"))/g)
      strParts.forEach((part) => {
        if (part.startsWith("'") || part.startsWith('"')) {
          tokens.push({ text: part, className: "text-primary" })
        } else if (part.includes("from")) {
          tokens.push({ text: part.replace("from", ""), className: "text-foreground" })
          tokens.push({ text: "from", className: "text-rose-400" })
        } else {
          tokens.push({ text: part, className: "text-foreground" })
        }
      })
    } else {
      tokens.push({ text: line, className: "text-foreground" })
    }
  } else if (trimmed.startsWith("<") && !trimmed.startsWith("</")) {
    tokens.push({ text: line, className: "text-sky-300" })
  } else if (trimmed.startsWith("</")) {
    tokens.push({ text: line, className: "text-sky-300" })
  } else if (language === "json") {
    if (trimmed.match(/"[^"]*"\s*:/)) {
      const parts = line.split(/("[^"]*"\s*:)/g)
      parts.forEach((part) => {
        if (part.match(/"[^"]*"\s*:/)) {
          tokens.push({ text: part, className: "text-sky-300" })
        } else if (part.match(/"[^"]*"/)) {
          tokens.push({ text: part, className: "text-primary" })
        } else {
          tokens.push({ text: part, className: "text-foreground" })
        }
      })
    } else {
      tokens.push({ text: line, className: "text-foreground" })
    }
  } else if (trimmed.includes(":") && !trimmed.includes("//") && (language === "vue" || trimmed.match(/^\s*[\w-]+\s*:/))) {
    const colonIdx = trimmed.indexOf(":")
    const prop = trimmed.slice(0, colonIdx)
    const val = trimmed.slice(colonIdx)
    const leadingSpace = line.match(/^(\s*)/)?.[1] || ""
    tokens.push({ text: leadingSpace + prop, className: "text-sky-300" })
    tokens.push({ text: val, className: "text-orange-300" })
  } else {
    tokens.push({ text: line, className: "text-foreground" })
  }

  return tokens
}

export function CodeEditor({ fileName }: { fileName: string }) {
  const file = fileContents[fileName]

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center bg-background text-muted-foreground">
        <div className="text-center">
          <p className="text-sm">Selecione um arquivo para editar</p>
          <p className="mt-1 text-xs text-muted-foreground/60">
            Use o Explorer na barra lateral
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-background">
      {/* Editor content */}
      <div className="flex-1 overflow-auto">
        <table className="w-full border-collapse font-mono text-[13px] leading-6">
          <tbody>
            {file.lines.map((line, i) => {
              const tokens = tokenize(line.content, file.language)
              return (
                <tr key={i} className="hover:bg-muted/20">
                  <td className="select-none border-r border-border/30 px-4 text-right text-muted-foreground/40 w-12">
                    {i + 1}
                  </td>
                  <td className="px-4 whitespace-pre">
                    {tokens.map((token, j) => (
                      <span key={j} className={cn(token.className)}>
                        {token.text}
                      </span>
                    ))}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
