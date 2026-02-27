"use client"

import { useMemo, useState } from "react"
import { CheckCircle2, CreditCard, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const B2C_PRICE = 59
const B2B_PRICE = 39

export default function AssinaturasPage() {
  const [currentPlan, setCurrentPlan] = useState<"B2C" | "B2B">("B2C")
  const [credits, setCredits] = useState(320)
  const [pricePerCredit, setPricePerCredit] = useState(2)
  const [creditAmount, setCreditAmount] = useState(200)
  const [payments, setPayments] = useState(2)

  const purchaseValue = useMemo(
    () => Math.max(0, creditAmount) * Math.max(0, pricePerCredit),
    [creditAmount, pricePerCredit],
  )

  const buyCredits = () => {
    if (creditAmount <= 0) return
    setCredits((prev) => prev + creditAmount)
    setPayments((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Plano e Créditos</h1>
        <p className="text-sm text-muted-foreground">
          Gestão independente para aluno individual: troque de plano e compre créditos rapidamente.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Plano atual</CardTitle></CardHeader><CardContent className="text-xl font-bold">{currentPlan === "B2C" ? "Individual (B2C)" : "Institucional (B2B)"}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Valor mensal</CardTitle></CardHeader><CardContent className="text-2xl font-bold">R$ {currentPlan === "B2C" ? B2C_PRICE : B2B_PRICE}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Créditos disponíveis</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{credits}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pagamentos</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{payments}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Planos disponíveis</CardTitle></CardHeader>
        <CardContent className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-lg border border-border/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Plano Individual (B2C)</p>
              <Badge variant={currentPlan === "B2C" ? "secondary" : "outline"} className="text-[10px]">R$ 59/mês</Badge>
            </div>
            <p className="text-xs text-muted-foreground">Acesso à nuvem, laboratórios e Tutor IA.</p>
            <Button size="sm" variant={currentPlan === "B2C" ? "secondary" : "default"} className="mt-3 h-8 text-xs" onClick={() => setCurrentPlan("B2C")}>Selecionar B2C</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Comprar créditos</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          <div className="space-y-1"><Label>Quantidade</Label><Input type="number" value={creditAmount} onChange={(event) => setCreditAmount(Number(event.target.value))} /></div>
          <div className="space-y-1"><Label>Preço por crédito (R$)</Label><Input type="number" disabled value={pricePerCredit} onChange={(event) => setPricePerCredit(Number(event.target.value))} /></div>
          <div className="rounded border border-border/60 p-3 text-sm">Total da compra: <strong>R$ {purchaseValue}</strong></div>
          <div className="flex items-end"><Button className="h-9 w-full text-xs" onClick={buyCredits}><Wallet className="mr-1 h-3 w-3" />Comprar agora</Button></div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary"><CheckCircle2 className="mr-1 h-3 w-3" />Autogestão de créditos ativa</Badge>
        <Badge variant="outline"><CreditCard className="mr-1 h-3 w-3" />Pagamento independente habilitado</Badge>
      </div>
    </div>
  )
}
