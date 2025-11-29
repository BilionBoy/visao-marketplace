"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Calendar, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockServiceOrders } from "@/lib/mockData"

export default function SupplierContractsPage() {
  const router = useRouter()
  const myContracts = mockServiceOrders.filter((o) => o.supplierId === "2")

  const getStatusBadge = (status: string) => {
    const badges = {
      scheduled: { label: "Agendado", class: "bg-secondary/10 text-secondary" },
      in_progress: { label: "Em Execução", class: "bg-primary/10 text-primary" },
      completed: { label: "Concluído", class: "bg-chart-5/10 text-chart-5" },
      cancelled: { label: "Cancelado", class: "bg-destructive/10 text-destructive" },
    }
    return badges[status as keyof typeof badges] || badges.scheduled
  }

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Contratos Ativos</h2>
          <p className="text-muted-foreground">Gerencie seus contratos e ordens de serviço</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold">{myContracts.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Em Execução</p>
              <p className="text-3xl font-bold text-primary">
                {myContracts.filter((c) => c.status === "in_progress").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Concluídos</p>
              <p className="text-3xl font-bold text-chart-5">
                {myContracts.filter((c) => c.status === "completed").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Faturamento</p>
              <p className="text-3xl font-bold text-secondary">
                R$ {myContracts.reduce((acc, c) => acc + c.value, 0).toLocaleString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {myContracts.map((contract) => {
            const statusBadge = getStatusBadge(contract.status)
            return (
              <Card key={contract.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{contract.title}</CardTitle>
                        <Badge className={statusBadge.class}>{statusBadge.label}</Badge>
                      </div>
                      <CardDescription>Contrato #{contract.id}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary">R$ {contract.value.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Data de Início</p>
                        <p className="text-sm font-medium">
                          {new Date(contract.startDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Prazo Final</p>
                        <p className="text-sm font-medium">
                          {new Date(contract.expectedEndDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Progresso</p>
                        <p className="text-sm font-medium">
                          {contract.status === "completed" ? "100%" : contract.status === "in_progress" ? "45%" : "0%"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{contract.notes}</p>
                  <Button size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {myContracts.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Package className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhum contrato ativo</h3>
              <p className="text-muted-foreground mb-4">Envie propostas para começar a conquistar contratos</p>
              <Button onClick={() => router.push("/supplier/solicitations")}>Ver Oportunidades</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </SupplierLayout>
  )
}
