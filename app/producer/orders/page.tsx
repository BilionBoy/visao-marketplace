"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, User, Eye } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockServiceOrders } from "@/lib/mockData"

export default function ProducerOrdersPage() {
  const router = useRouter()

  const getStatusBadge = (status: string) => {
    const badges = {
      scheduled: { label: "Agendado", class: "bg-secondary/10 text-secondary" },
      in_progress: { label: "Em Andamento", class: "bg-primary/10 text-primary" },
      completed: { label: "Concluído", class: "bg-chart-5/10 text-chart-5" },
      cancelled: { label: "Cancelado", class: "bg-destructive/10 text-destructive" },
    }
    return badges[status as keyof typeof badges] || badges.scheduled
  }

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Ordens de Serviço</h2>
          <p className="text-muted-foreground">Acompanhe o andamento dos seus contratos</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold">{mockServiceOrders.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Em Andamento</p>
              <p className="text-3xl font-bold text-primary">
                {mockServiceOrders.filter((o) => o.status === "in_progress").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Concluídos</p>
              <p className="text-3xl font-bold text-chart-5">
                {mockServiceOrders.filter((o) => o.status === "completed").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Valor Total</p>
              <p className="text-3xl font-bold text-secondary">
                R$ {mockServiceOrders.reduce((acc, o) => acc + o.value, 0).toLocaleString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {mockServiceOrders.map((order) => {
            const statusBadge = getStatusBadge(order.status)
            return (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{order.title}</CardTitle>
                        <Badge className={statusBadge.class}>{statusBadge.label}</Badge>
                      </div>
                      <CardDescription>OS #{order.id}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">R$ {order.value.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Início</p>
                        <p className="text-sm font-medium">{new Date(order.startDate).toLocaleDateString("pt-BR")}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Previsão</p>
                        <p className="text-sm font-medium">
                          {new Date(order.expectedEndDate).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">Fornecedor</p>
                        <p className="text-sm font-medium">ID: {order.supplierId}</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{order.notes}</p>
                  <Button size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </ProducerLayout>
  )
}
