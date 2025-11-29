"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, DollarSign, Package, TrendingUp, Clock, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations, mockProposals, mockServiceOrders } from "@/lib/mockData"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function ProducerDashboard() {
  const router = useRouter()

  // Estatísticas
  const stats = [
    {
      title: "Solicitações Abertas",
      value: mockSolicitations.filter((s) => s.status === "open").length,
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: "Aguardando propostas",
    },
    {
      title: "Propostas Recebidas",
      value: mockProposals.filter((p) => p.status === "pending").length,
      icon: DollarSign,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Para análise",
    },
    {
      title: "Ordens em Andamento",
      value: mockServiceOrders.filter((o) => o.status === "in_progress").length,
      icon: Package,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Em execução",
    },
    {
      title: "Total Investido",
      value: `R$ ${mockServiceOrders.reduce((acc, o) => acc + o.value, 0).toLocaleString("pt-BR")}`,
      icon: TrendingUp,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      description: "Nos últimos 30 dias",
    },
  ]

  // Dados para gráfico de solicitações por categoria
  const chartData = [
    { name: "Pulverização", value: 1, fill: "hsl(var(--chart-1))" },
    { name: "Manutenção", value: 1, fill: "hsl(var(--chart-2))" },
    { name: "Grãos", value: 1, fill: "hsl(var(--chart-3))" },
    { name: "Irrigação", value: 1, fill: "hsl(var(--chart-4))" },
  ]

  // Dados para gráfico de status
  const statusData = [
    { name: "Abertas", value: 3, fill: "hsl(var(--chart-1))" },
    { name: "Em Análise", value: 1, fill: "hsl(var(--chart-3))" },
  ]

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-balance">Bem-vindo, João!</h2>
            <p className="text-muted-foreground">Gerencie suas solicitações e propostas</p>
          </div>
          <Button onClick={() => router.push("/producer/solicitations/new")} size="lg">
            <Plus className="w-5 h-5 mr-2" />
            Nova Solicitação
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
              <CardTitle>Solicitações por Categoria</CardTitle>
              <CardDescription>Distribuição das suas solicitações</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Status das Solicitações</CardTitle>
              <CardDescription>Situação atual das suas demandas</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Solicitations */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Solicitações Recentes</CardTitle>
                <CardDescription>Suas últimas solicitações cadastradas</CardDescription>
              </div>
              <Button variant="outline" onClick={() => router.push("/producer/solicitations")}>
                Ver Todas
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockSolicitations.slice(0, 3).map((sol) => (
                <div
                  key={sol.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => router.push(`/producer/solicitations/${sol.id}`)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{sol.title}</h4>
                      {sol.status === "open" && (
                        <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">Aberta</span>
                      )}
                      {sol.status === "in_review" && (
                        <span className="px-2 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                          Em Análise
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{sol.category}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3 h-3" />
                        R$ {sol.budget.toLocaleString("pt-BR")}
                      </span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {sol.proposalsCount} propostas
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(sol.deadline).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProducerLayout>
  )
}
