"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileSearch, Send, Package, TrendingUp, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations, mockProposals, mockServiceOrders } from "@/lib/mockData"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

export default function SupplierDashboard() {
  const router = useRouter()

  const myProposals = mockProposals.filter((p) => p.supplierId === "2")
  const openSolicitations = mockSolicitations.filter((s) => s.status === "open")
  const myContracts = mockServiceOrders.filter((o) => o.supplierId === "2")

  const stats = [
    {
      title: "Solicitações Disponíveis",
      value: openSolicitations.length,
      icon: FileSearch,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Oportunidades abertas",
    },
    {
      title: "Propostas Enviadas",
      value: myProposals.length,
      icon: Send,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Aguardando resposta",
    },
    {
      title: "Contratos Ativos",
      value: myContracts.length,
      icon: Package,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Em execução",
    },
    {
      title: "Faturamento Previsto",
      value: `R$ ${myContracts.reduce((acc, c) => acc + c.value, 0).toLocaleString("pt-BR")}`,
      icon: TrendingUp,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      description: "Contratos ativos",
    },
  ]

  const monthlyData = [
    { month: "Jul", propostas: 4, contratos: 1 },
    { month: "Ago", propostas: 6, contratos: 2 },
    { month: "Set", propostas: 5, contratos: 1 },
    { month: "Out", propostas: 8, contratos: 3 },
    { month: "Nov", propostas: 3, contratos: 1 },
    { month: "Dez", propostas: 7, contratos: 2 },
  ]

  const categoryData = [
    { name: "Pulverização", value: 2 },
    { name: "Manutenção", value: 3 },
    { name: "Irrigação", value: 1 },
    { name: "Colheita", value: 1 },
  ]

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-balance">Bem-vinda, Maria!</h2>
            <p className="text-muted-foreground">Encontre oportunidades e gerencie suas propostas</p>
          </div>
          <Button onClick={() => router.push("/supplier/solicitations")} size="lg">
            <FileSearch className="w-5 h-5 mr-2" />
            Ver Oportunidades
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription className="text-xs">{stat.title}</CardDescription>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Atividade Mensal</CardTitle>
              <CardDescription>Propostas enviadas vs contratos fechados</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="propostas"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Propostas"
                  />
                  <Line
                    type="monotone"
                    dataKey="contratos"
                    stroke="hsl(var(--chart-5))"
                    strokeWidth={2}
                    name="Contratos"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Propostas por Categoria</CardTitle>
              <CardDescription>Distribuição das suas propostas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Novas Oportunidades */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Novas Oportunidades</CardTitle>
                <CardDescription>Solicitações abertas que você pode participar</CardDescription>
              </div>
              <Button variant="outline" onClick={() => router.push("/supplier/solicitations")}>
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {openSolicitations.slice(0, 3).map((sol) => (
                <div
                  key={sol.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/supplier/solicitations/${sol.id}`)}
                >
                  <div className="flex gap-4 flex-1">
                    <img
                      src={sol.images[0] || "/placeholder.svg"}
                      alt={sol.title}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{sol.title}</h4>
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">
                          {sol.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-1">{sol.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span>Orçamento: R$ {sol.budget.toLocaleString("pt-BR")}</span>
                        <span>{sol.proposalsCount} propostas</span>
                        <span>Prazo: {new Date(sol.deadline).toLocaleDateString("pt-BR")}</span>
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => router.push(`/supplier/solicitations/${sol.id}/propose`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Enviar Proposta
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Minhas Propostas Recentes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Minhas Propostas Recentes</CardTitle>
                <CardDescription>Acompanhe o status das suas propostas</CardDescription>
              </div>
              <Button variant="outline" onClick={() => router.push("/supplier/proposals")}>
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myProposals.map((prop) => {
                const sol = mockSolicitations.find((s) => s.id === prop.solicitationId)
                return (
                  <div key={prop.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{sol?.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        Valor proposto: R$ {prop.price.toLocaleString("pt-BR")} • {prop.deliveryTime}
                      </p>
                    </div>
                    <div>
                      {prop.status === "accepted" && (
                        <span className="px-3 py-1 text-xs bg-chart-5/10 text-chart-5 rounded-full font-medium">
                          Aceita
                        </span>
                      )}
                      {prop.status === "pending" && (
                        <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full font-medium">
                          Em Análise
                        </span>
                      )}
                      {prop.status === "rejected" && (
                        <span className="px-3 py-1 text-xs bg-destructive/10 text-destructive rounded-full font-medium">
                          Recusada
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </SupplierLayout>
  )
}
