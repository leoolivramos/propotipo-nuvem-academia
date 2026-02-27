"use client"

import { useState } from "react"
import { CreditCard, Plus, Receipt, Wallet } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { mockInstitutionSubscription } from "@/lib/mock-data"

export default function AdminAssinaturasPage() {
  const [creditsTotal, setCreditsTotal] = useState(mockInstitutionSubscription.creditsTotal)
  const [creditsUsed] = useState(mockInstitutionSubscription.creditsUsed)
  const [pricePerCredit, setPricePerCredit] = useState(2)
  const [purchaseAmount, setPurchaseAmount] = useState(500)
  const [payments, setPayments] = useState(3)

  const creditsRemaining = creditsTotal - creditsUsed
  const projectedRevenue = purchaseAmount * pricePerCredit

  const processCreditPurchase = () => {
    if (purchaseAmount <= 0) return
    setCreditsTotal((prev) => prev + purchaseAmount)
    setPayments((prev) => prev + 1)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Assinaturas e créditos</h1>
        <p className="text-sm text-muted-foreground">Módulo administrativo para processamento de assinatura, crédito e receita projetada.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Plano</CardTitle></CardHeader><CardContent className="text-sm font-medium">{mockInstitutionSubscription.plan}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Créditos totais</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{creditsTotal}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Créditos restantes</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{creditsRemaining}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Pagamentos processados</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{payments}</CardContent></Card>
        <Card className="border-border/60"><CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Preço/Crédito</CardTitle></CardHeader><CardContent className="text-2xl font-bold">R$ {pricePerCredit}</CardContent></Card>
      </div>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Processar venda de créditos</CardTitle></CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-4">
          <div className="space-y-1"><Label>Qtd. créditos</Label><Input type="number" value={purchaseAmount} onChange={(event) => setPurchaseAmount(Number(event.target.value))} /></div>
          <div className="space-y-1"><Label>Preço por crédito (R$)</Label><Input type="number" value={pricePerCredit} onChange={(event) => setPricePerCredit(Number(event.target.value))} /></div>
          <div className="rounded border border-border/60 p-3 text-sm">Receita projetada: <strong>R$ {projectedRevenue}</strong></div>
          <div className="flex items-end"><Button className="h-9 w-full text-xs" onClick={processCreditPurchase}><Plus className="mr-1 h-3 w-3" />Processar venda</Button></div>
        </CardContent>
      </Card>

      <Card className="border-border/60">
        <CardHeader><CardTitle className="text-base">Licenças e ciclo</CardTitle></CardHeader>
        <CardContent className="flex flex-wrap items-center gap-2 text-sm">
          <Badge variant="secondary"><Wallet className="mr-1 h-3 w-3" />Ciclo {mockInstitutionSubscription.cycle}</Badge>
          <Badge variant="outline"><CreditCard className="mr-1 h-3 w-3" />{mockInstitutionSubscription.activeLicenses}/{mockInstitutionSubscription.totalLicenses} licenças ativas</Badge>
          <Badge variant="outline"><Receipt className="mr-1 h-3 w-3" />Conciliação automática habilitada</Badge>
        </CardContent>
      </Card>
    </div>
  )
}
