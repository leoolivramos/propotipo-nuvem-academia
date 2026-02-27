import { ExternalLink, Globe, Rocket, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockDeployLogs } from "@/lib/mock-data"

export default function AdminDeployPage() {
  const previewUrls = 42

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Hospedagem e Deploy</h1>
        <p className="text-sm text-muted-foreground">Gestão de preview temporário, geração de URLs públicas e segurança de compartilhamento.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Deploys no dia</CardTitle></CardHeader><CardContent className="text-2xl font-bold">31</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">URLs temporárias ativas</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{previewUrls}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">TTL médio</CardTitle></CardHeader><CardContent className="text-2xl font-bold">48h</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Falhas de health check</CardTitle></CardHeader><CardContent className="text-2xl font-bold">2</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Pipeline de deploy (amostra)</CardTitle></CardHeader>
        <CardContent className="space-y-2 text-sm">
          {mockDeployLogs.slice(0, 8).map((line, index) => (
            <p key={`${line.text}-${index}`} className="rounded border border-border/60 p-2">{line.text}</p>
          ))}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary"><Rocket className="mr-1 h-3 w-3" />Hospedagem preview habilitada</Badge>
        <Badge variant="outline"><Globe className="mr-1 h-3 w-3" />URLs públicas temporárias</Badge>
        <Badge variant="outline"><Shield className="mr-1 h-3 w-3" />Links assinados e seguros</Badge>
        <Badge variant="outline"><ExternalLink className="mr-1 h-3 w-3" />Compartilhamento com professor/colega</Badge>
      </div>
    </div>
  )
}
