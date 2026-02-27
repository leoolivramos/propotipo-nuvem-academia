import { Database, FlaskConical, Gauge, UploadCloud } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminLabDadosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Laboratório de ciência de dados</h1>
        <p className="text-sm text-muted-foreground">Governança de Jupyter web, catálogo de modelos, datasets e monitoramento de GPU.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Sessões Jupyter</CardTitle></CardHeader><CardContent className="text-2xl font-bold">57</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Modelos one-click</CardTitle></CardHeader><CardContent className="text-2xl font-bold">24</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Datasets upload/dia</CardTitle></CardHeader><CardContent className="text-2xl font-bold">93</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Uso médio VRAM</CardTitle></CardHeader><CardContent className="text-2xl font-bold">68%</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Controles habilitados</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 text-sm">
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><FlaskConical className="h-3.5 w-3.5" />Interface Jupyter integrada</p><p className="text-muted-foreground">Kernel remoto sem setup local.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Database className="h-3.5 w-3.5" />Catálogo de modelos prontos</p><p className="text-muted-foreground">PyTorch/TensorFlow com importação rápida.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><UploadCloud className="h-3.5 w-3.5" />Gestão de datasets</p><p className="text-muted-foreground">Upload CSV e imagens para o container.</p></div>
          <div className="rounded border border-border/60 p-3"><p className="font-medium flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />Monitoramento de GPU</p><p className="text-muted-foreground">VRAM por sessão em tempo real.</p></div>
        </CardContent>
      </Card>

      <Badge variant="outline">Fatiamento de GPU aplicado aos laboratórios de IA/Data para concorrência controlada.</Badge>
    </div>
  )
}
