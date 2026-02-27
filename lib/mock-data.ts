export interface Project {
  id: string
  name: string
  template: string
  status: "active" | "finished" | "provisioning"
  createdAt: string
  lastAccess: string
  language: string
  icon: string
}

export interface Template {
  id: string
  name: string
  description: string
  icon: string
  tags: string[]
  color: string
}

export interface ActivityDay {
  date: string
  count: number
}

export interface LoginAccessUser {
  id: string
  profile: "Aluno Individual" | "Aluno Institucional" | "Professor/Instituição" | "Administrador do Sistema"
  email: string
  password: string
}

export interface IdeNotification {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: "deploy" | "terminal" | "collab" | "system"
}

export interface IdeSetting {
  id: string
  label: string
  description: string
  enabled: boolean
}

export interface InstitutionalLab {
  id: string
  name: string
  area: string
  teacher: string
  status: "active" | "scheduled"
}

export interface InstitutionalClass {
  id: string
  name: string
  institution: string
  teacher: string
  period: string
  nextSession: string
  activeLabs: number
  labs: InstitutionalLab[]
}

export interface ProfessorAccount {
  id: string
  name: string
  email: string
  specialty: string
  role: "Professor" | "Coordenador" | "Administrador Institucional"
  status: "active" | "pending"
  classes: number
}

export interface ManagedLab {
  id: string
  name: string
  category: string
  status: "active" | "draft"
  linkedClassIds: string[]
  baseImage: string
  updatedAt: string
}

export interface ManagedClass {
  id: string
  name: string
  module: string
  students: number
  laboratoryId: string
  nextClass: string
}

export interface InstitutionalStudent {
  id: string
  name: string
  email: string
  progress: number
  status: "critical" | "idle" | "on-track" | "advanced"
  lastActive: string
}

export interface InstitutionSubscription {
  plan: string
  cycle: string
  creditsTotal: number
  creditsUsed: number
  activeLicenses: number
  totalLicenses: number
}

export interface BaseImageTemplate {
  id: string
  name: string
  image: string
  stack: string
}

export const mockUser = {
  name: "Karla Souza",
  email: "karla.souza@email.com",
  avatar: "KS",
  plan: "Estudante Pro",
}

export const mockLoginUsers: LoginAccessUser[] = [
  {
    id: "login-b2c",
    profile: "Aluno Individual",
    email: "aluno.individual@nuvemacademia.app",
    password: "12345678",
  },
  {
    id: "login-b2b",
    profile: "Aluno Institucional",
    email: "aluno.institucional@nuvemacademia.app",
    password: "12345678",
  },
  {
    id: "login-prof",
    profile: "Professor/Instituição",
    email: "professor.instituicao@nuvemacademia.app",
    password: "12345678",
  },
  {
    id: "login-admin",
    profile: "Administrador do Sistema",
    email: "admin@nuvemacademia.app",
    password: "12345678",
  },
]

export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "API REST com Express",
    template: "Node.js / Express",
    status: "active",
    createdAt: "2026-01-15",
    lastAccess: "2026-02-24",
    language: "JavaScript",
    icon: "server",
  },
  {
    id: "proj-2",
    name: "Dashboard React",
    template: "React / Vite",
    status: "active",
    createdAt: "2026-01-20",
    lastAccess: "2026-02-23",
    language: "TypeScript",
    icon: "layout",
  },
  {
    id: "proj-3",
    name: "Analise de Dados COVID",
    template: "Python / Jupyter",
    status: "finished",
    createdAt: "2025-12-01",
    lastAccess: "2026-01-10",
    language: "Python",
    icon: "bar-chart",
  },
  {
    id: "proj-4",
    name: "App Full-Stack Vue",
    template: "Node.js / Vue.js",
    status: "active",
    createdAt: "2026-02-01",
    lastAccess: "2026-02-25",
    language: "JavaScript",
    icon: "globe",
  },
  {
    id: "proj-5",
    name: "Machine Learning Basics",
    template: "Python / Jupyter",
    status: "finished",
    createdAt: "2025-11-10",
    lastAccess: "2025-12-20",
    language: "Python",
    icon: "brain",
  },
  {
    id: "proj-6",
    name: "API de Pagamentos",
    template: "Node.js / Express",
    status: "active",
    createdAt: "2026-02-05",
    lastAccess: "2026-02-26",
    language: "TypeScript",
    icon: "credit-card",
  },
  {
    id: "proj-7",
    name: "Portal de Cursos",
    template: "React / Vite",
    status: "provisioning",
    createdAt: "2026-02-26",
    lastAccess: "2026-02-26",
    language: "TypeScript",
    icon: "book-open",
  },
  {
    id: "proj-8",
    name: "Worker em Go para Filas",
    template: "Go / Gin",
    status: "active",
    createdAt: "2026-01-28",
    lastAccess: "2026-02-22",
    language: "Go",
    icon: "zap",
  },
  {
    id: "proj-9",
    name: "Microservico de Auth",
    template: "Java / Spring Boot",
    status: "finished",
    createdAt: "2025-10-18",
    lastAccess: "2026-01-08",
    language: "Java",
    icon: "shield",
  },
  {
    id: "proj-10",
    name: "Lab de NLP",
    template: "Python / Jupyter",
    status: "active",
    createdAt: "2026-02-10",
    lastAccess: "2026-02-27",
    language: "Python",
    icon: "sparkles",
  },
]

export const mockTemplates: Template[] = [
  {
    id: "tpl-1",
    name: "Python / Jupyter",
    description: "Notebook com Python, pandas, scikit-learn e visualizacao de dados pre-configurados para estudos e experimentos.",
    icon: "brain",
    tags: ["Data Science", "Python", "Notebook"],
    color: "chart-1",
  },
  {
    id: "tpl-2",
    name: "Node.js / Vue.js",
    description: "Ambiente web completo com Node.js, Vue 3, Vite e TailwindCSS. Ideal para aplicacoes full-stack modernas.",
    icon: "globe",
    tags: ["Web", "Node.js", "Vue"],
    color: "chart-2",
  },
  {
    id: "tpl-3",
    name: "React / Vite",
    description: "Projeto React com Vite, TypeScript e ESLint configurados. Perfeito para aplicacoes front-end rapidas.",
    icon: "layout",
    tags: ["Front-end", "React", "TypeScript"],
    color: "chart-3",
  },
  {
    id: "tpl-4",
    name: "Node.js / Express",
    description: "Servidor API REST com Express.js, middleware de seguranca, e banco de dados SQLite pre-configurado.",
    icon: "server",
    tags: ["Back-end", "API", "Express"],
    color: "chart-4",
  },
  {
    id: "tpl-5",
    name: "Java / Spring Boot",
    description: "Aplicacao Java com Spring Boot, Maven e banco de dados H2. Pronto para microservicos.",
    icon: "coffee",
    tags: ["Java", "Spring", "API"],
    color: "chart-5",
  },
  {
    id: "tpl-6",
    name: "Go / Gin",
    description: "Servidor HTTP performatico com Go e framework Gin. Ideal para APIs de alta performance.",
    icon: "zap",
    tags: ["Go", "API", "Performance"],
    color: "chart-1",
  },
  {
    id: "tpl-7",
    name: "Next.js / Prisma",
    description: "Aplicacao full-stack com Next.js App Router, Prisma ORM e PostgreSQL para projetos modernos e escalaveis.",
    icon: "database",
    tags: ["Full-stack", "Next.js", "Prisma"],
    color: "chart-2",
  },
  {
    id: "tpl-8",
    name: "Rust / Axum",
    description: "API em Rust com Axum e Tokio, pronta para workloads de alta concorrencia e baixa latencia.",
    icon: "cpu",
    tags: ["Rust", "Back-end", "Performance"],
    color: "chart-3",
  },
  {
    id: "tpl-9",
    name: "Django / DRF",
    description: "Backend com Django e Django REST Framework, autenticacao pronta e estrutura para APIs robustas.",
    icon: "shield",
    tags: ["Python", "Django", "API"],
    color: "chart-4",
  },
  {
    id: "tpl-10",
    name: "PHP / Laravel",
    description: "Projeto Laravel com autentificacao, migrations e filas configuradas para acelerar desenvolvimento web.",
    icon: "layers",
    tags: ["PHP", "Laravel", "Web"],
    color: "chart-5",
  },
]

// Deterministic pseudo-random number generator (seeded)
function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

// Generate activity data for the last ~6 months (deterministic to avoid hydration mismatch)
function generateActivityData(): ActivityDay[] {
  const days: ActivityDay[] = []
  const today = new Date(2026, 1, 27) // Feb 27, 2026
  const startDate = new Date(2025, 8, 1) // Sep 1, 2025
  const random = seededRandom(42)

  for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
    const dayOfWeek = d.getDay()
    let count = 0

    // Simulate realistic activity patterns
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Weekends - less activity
      count = random() > 0.6 ? Math.floor(random() * 3) : 0
    } else {
      // Weekdays - more activity
      count = random() > 0.2 ? Math.floor(random() * 6) + 1 : 0
    }

    // Some holiday breaks
    const month = d.getMonth()
    const day = d.getDate()
    if (month === 11 && day >= 20 && day <= 31) count = 0 // Christmas break
    if (month === 0 && day <= 5) count = 0 // New year break

    days.push({
      date: d.toISOString().split("T")[0],
      count,
    })
  }

  return days
}

export const mockActivity: ActivityDay[] = generateActivityData()

export const mockTerminalLines = [
  { text: "$ docker pull nuvemacademia/node-vue:latest", type: "command" as const },
  { text: "latest: Pulling from nuvemacademia/node-vue", type: "output" as const },
  { text: "a3ed95caeb02: Pull complete", type: "output" as const },
  { text: "6d3b1f08db12: Pull complete", type: "output" as const },
  { text: "Digest: sha256:4f8b2c...a9e1", type: "output" as const },
  { text: "Status: Downloaded newer image", type: "success" as const },
  { text: "$ npm install", type: "command" as const },
  { text: "added 847 packages in 12s", type: "success" as const },
  { text: "$ npm run dev", type: "command" as const },
  { text: "VITE v5.4.1 ready in 312 ms", type: "success" as const },
  { text: "  -> Local:   http://localhost:5173/", type: "output" as const },
  { text: "  -> Network: http://172.18.0.2:5173/", type: "output" as const },
  { text: "$ npm run test -- --watch=false", type: "command" as const },
  { text: "PASS src/services/auth.test.ts", type: "success" as const },
  { text: "PASS src/routes/projects.test.ts", type: "success" as const },
  { text: "Test Suites: 2 passed, 2 total", type: "success" as const },
  { text: "$ docker compose up -d", type: "command" as const },
  { text: "Container db         Started", type: "output" as const },
  { text: "Container api        Started", type: "output" as const },
  { text: "Container web        Started", type: "success" as const },
]

export const mockDeployLogs = [
  { text: "Iniciando deploy para nuvem...", type: "output" as const },
  { text: "Compactando arquivos do projeto...", type: "output" as const },
  { text: "Enviando build (2.4 MB)...", type: "output" as const },
  { text: "Construindo imagem Docker...", type: "output" as const },
  { text: "Camadas em cache reutilizadas (3/5)", type: "output" as const },
  { text: "Imagem construida com sucesso!", type: "success" as const },
  { text: "Provisionando container...", type: "output" as const },
  { text: "Health check: OK", type: "success" as const },
  { text: "Aplicando migracoes do banco...", type: "output" as const },
  { text: "Migracoes aplicadas (4/4)", type: "success" as const },
  { text: "Executando smoke tests...", type: "output" as const },
  { text: "Smoke tests aprovados", type: "success" as const },
  { text: "Deploy concluido!", type: "success" as const },
  { text: "URL: https://proj-4.nuvemacademia.app", type: "success" as const },
]

export const mockIdeNotifications: IdeNotification[] = [
  {
    id: "not-1",
    title: "Deploy finalizado",
    description: "O projeto App Full-Stack Vue foi publicado com sucesso.",
    time: "há 3 min",
    read: false,
    type: "deploy",
  },
  {
    id: "not-2",
    title: "Build sem erros",
    description: "Pipeline de CI completou com 24 checks aprovados.",
    time: "há 18 min",
    read: false,
    type: "system",
  },
  {
    id: "not-3",
    title: "Novo comentário no PR",
    description: "Karla sugeriu renomear o endpoint /health para /status.",
    time: "há 1 h",
    read: true,
    type: "collab",
  },
  {
    id: "not-4",
    title: "Terminal concluído",
    description: "Comando npm run test finalizado com sucesso.",
    time: "há 2 h",
    read: true,
    type: "terminal",
  },
  {
    id: "not-5",
    title: "Atualização de extensão",
    description: "Volar foi atualizado para a versão 2.1.0.",
    time: "ontem",
    read: true,
    type: "system",
  },
]

export const mockIdeSettings: IdeSetting[] = [
  {
    id: "setting-1",
    label: "Auto Save",
    description: "Salva automaticamente os arquivos após edições.",
    enabled: true,
  },
  {
    id: "setting-2",
    label: "Format on Save",
    description: "Aplica formatter ao salvar arquivos.",
    enabled: true,
  },
  {
    id: "setting-3",
    label: "Minimap",
    description: "Exibe minimapa lateral do código.",
    enabled: false,
  },
  {
    id: "setting-4",
    label: "Lint em tempo real",
    description: "Mostra avisos de lint enquanto digita.",
    enabled: true,
  },
  {
    id: "setting-5",
    label: "Dicas inline",
    description: "Mostra sugestões contextuais no editor.",
    enabled: false,
  },
]

export const mockInstitutionalClasses: InstitutionalClass[] = [
  {
    id: "turma-1",
    name: "Turma ADS 3º Semestre",
    institution: "Instituto Nova Tecnologia",
    teacher: "Prof. Amanda Costa",
    period: "Noite",
    nextSession: "2026-03-02 19:30",
    activeLabs: 2,
    labs: [
      {
        id: "lab-1",
        name: "Laboratório de APIs REST",
        area: "Back-end",
        teacher: "Prof. Amanda Costa",
        status: "active",
      },
      {
        id: "lab-2",
        name: "Laboratório de Testes Automatizados",
        area: "Qualidade",
        teacher: "Prof. Amanda Costa",
        status: "scheduled",
      },
    ],
  },
  {
    id: "turma-2",
    name: "Turma Ciencia de Dados I",
    institution: "Instituto Nova Tecnologia",
    teacher: "Prof. Lucas Vieira",
    period: "Manhã",
    nextSession: "2026-03-01 08:00",
    activeLabs: 3,
    labs: [
      {
        id: "lab-3",
        name: "Laboratório de Pandas e ETL",
        area: "Data Engineering",
        teacher: "Prof. Lucas Vieira",
        status: "active",
      },
      {
        id: "lab-4",
        name: "Laboratório de Regressão Linear",
        area: "Machine Learning",
        teacher: "Prof. Lucas Vieira",
        status: "active",
      },
      {
        id: "lab-5",
        name: "Laboratório de Visualização",
        area: "Data Viz",
        teacher: "Prof. Lucas Vieira",
        status: "scheduled",
      },
    ],
  },
  {
    id: "turma-3",
    name: "Turma IA Aplicada",
    institution: "Centro Universitário Horizonte",
    teacher: "Profa. Renata Lima",
    period: "Tarde",
    nextSession: "2026-03-03 14:00",
    activeLabs: 1,
    labs: [
      {
        id: "lab-6",
        name: "Laboratório de Redes Neurais",
        area: "Deep Learning",
        teacher: "Profa. Renata Lima",
        status: "active",
      },
    ],
  },
]

export const mockProfessorAccounts: ProfessorAccount[] = [
  {
    id: "prof-1",
    name: "Amanda Costa",
    email: "amanda.costa@instituto.edu.br",
    specialty: "Back-end",
    role: "Coordenador",
    status: "active",
    classes: 3,
  },
  {
    id: "prof-2",
    name: "Lucas Vieira",
    email: "lucas.vieira@instituto.edu.br",
    specialty: "Ciência de Dados",
    role: "Professor",
    status: "active",
    classes: 2,
  },
  {
    id: "prof-3",
    name: "Renata Lima",
    email: "renata.lima@horizonte.edu.br",
    specialty: "Inteligência Artificial",
    role: "Professor",
    status: "pending",
    classes: 1,
  },
]

export const mockManagedClasses: ManagedClass[] = [
  {
    id: "class-1",
    name: "ADS - APIs REST",
    module: "Módulo 3",
    students: 28,
    laboratoryId: "managed-lab-1",
    nextClass: "2026-03-02 19:30",
  },
  {
    id: "class-2",
    name: "Dados - ETL com Python",
    module: "Módulo 2",
    students: 24,
    laboratoryId: "managed-lab-2",
    nextClass: "2026-03-01 08:00",
  },
  {
    id: "class-3",
    name: "IA - Redes Neurais",
    module: "Módulo 4",
    students: 19,
    laboratoryId: "managed-lab-3",
    nextClass: "2026-03-03 14:00",
  },
]

export const mockManagedLabs: ManagedLab[] = [
  {
    id: "managed-lab-1",
    name: "Lab de APIs e Microsserviços",
    category: "Back-end",
    status: "active",
    linkedClassIds: ["class-1"],
    baseImage: "nuvemacademia/base-node18:v2",
    updatedAt: "2026-02-26",
  },
  {
    id: "managed-lab-2",
    name: "Lab de ETL e Visualização",
    category: "Dados",
    status: "active",
    linkedClassIds: ["class-2"],
    baseImage: "nuvemacademia/base-python311:v4",
    updatedAt: "2026-02-25",
  },
  {
    id: "managed-lab-3",
    name: "Lab de Deep Learning",
    category: "IA",
    status: "draft",
    linkedClassIds: ["class-3"],
    baseImage: "nuvemacademia/base-pytorch-cuda:v3",
    updatedAt: "2026-02-24",
  },
]

export const mockInstitutionalStudents: InstitutionalStudent[] = [
  {
    id: "student-1",
    name: "Bruno Alves",
    email: "bruno.alves@aluno.edu.br",
    progress: 72,
    status: "on-track",
    lastActive: "2026-02-27",
  },
  {
    id: "student-2",
    name: "Carla Mendes",
    email: "carla.mendes@aluno.edu.br",
    progress: 88,
    status: "advanced",
    lastActive: "2026-02-27",
  },
  {
    id: "student-3",
    name: "Diego Rocha",
    email: "diego.rocha@aluno.edu.br",
    progress: 64,
    status: "on-track",
    lastActive: "2026-02-25",
  },
  {
    id: "student-4",
    name: "Fernanda Nunes",
    email: "fernanda.nunes@aluno.edu.br",
    progress: 91,
    status: "advanced",
    lastActive: "2026-02-27",
  },
  {
    id: "student-5",
    name: "Gustavo Lima",
    email: "gustavo.lima@aluno.edu.br",
    progress: 53,
    status: "critical",
    lastActive: "2026-02-20",
  },
  {
    id: "student-6",
    name: "Helena Prado",
    email: "helena.prado@aluno.edu.br",
    progress: 79,
    status: "idle",
    lastActive: "2026-02-18",
  },
]

export const mockInstitutionSubscription: InstitutionSubscription = {
  plan: "Edu Pro Institucional",
  cycle: "mensal",
  creditsTotal: 12000,
  creditsUsed: 7640,
  activeLicenses: 86,
  totalLicenses: 120,
}

export const mockBaseImageCatalog: BaseImageTemplate[] = [
  {
    id: "base-img-1",
    name: "Node.js 18 + pnpm",
    image: "nuvemacademia/base-node18:v2",
    stack: "Back-end",
  },
  {
    id: "base-img-2",
    name: "Python 3.11 + Data Stack",
    image: "nuvemacademia/base-python311:v4",
    stack: "Dados",
  },
  {
    id: "base-img-3",
    name: "PyTorch + CUDA",
    image: "nuvemacademia/base-pytorch-cuda:v3",
    stack: "IA",
  },
  {
    id: "base-img-4",
    name: "Java 21 + Spring",
    image: "nuvemacademia/base-java21-spring:v1",
    stack: "Enterprise",
  },
]
