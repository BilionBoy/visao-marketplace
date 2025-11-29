"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  FileText,
  Send,
  DollarSign,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { mockUsers, mockSolicitations, mockProposals, mockServiceOrders } from "@/lib/mockData"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from "recharts"

export default function AdminDashboard() {
  const router = useRouter()

  const producers = mockUsers.filter((u) => u.role === "producer")
  const suppliers = mockUsers.filter((u) => u.role === "supplier")
  const totalValue = mockServiceOrders.reduce((acc, o) => acc + o.value, 0)
  const openSolicitations = mockSolicitations.filter((s) => s.status === "open" || s.status === "in_review").length
  const pendingProposals = mockProposals.filter((p) => p.status === "pending").length

  const stats = [
    {
      title: "Total Usuários",
      value: mockUsers.length,
      icon: Users,
      color: "text-primary",
      bgColor: "bg-primary/10",
      description: `${producers.length} produtores • ${suppliers.length} fornecedores`,
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Solicitações Ativas",
      value: openSolicitations,
      icon: FileText,
      color: "text-secondary",
      bgColor: "bg-secondary/10",
      description: "Aguardando propostas",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Propostas Pendentes",
      value: pendingProposals,
      icon: Send,
      color: "text-accent",
      bgColor: "bg-accent/10",
      description: "Aguardando decisão",
      trend: "+15%",
      trendUp: true,
    },
    {
      title: "Volume Total",
      value: `R$ ${(totalValue / 1000).toFixed(0)}K`,
      icon: DollarSign,
      color: "text-chart-5",
      bgColor: "bg-chart-5/10",
      description: "Contratos ativos",
      trend: "+24%",
      trendUp: true,
    },
  ]

  const monthlyActivity = [
    { month: "Jul", solicitacoes: 8, propostas: 15, contratos: 3, volume: 120 },
    { month: "Ago", solicitacoes: 12, propostas: 22, contratos: 5, volume: 180 },
    { month: "Set", solicitacoes: 10, propostas: 18, contratos: 4, volume: 150 },
    { month: "Out", solicitacoes: 15, propostas: 28, contratos: 7, volume: 250 },
    { month: "Nov", solicitacoes: 4, propostas: 11, contratos: 1, volume: 80 },
    { month: "Dez", solicitacoes: 6, propostas: 14, contratos: 2, volume: 100 },
  ]

  const categoryDistribution = [
    { name: "Pulverização", value: 35, fill: "hsl(var(--chart-1))" },
    { name: "Manutenção", value: 28, fill: "hsl(var(--chart-2))" },
    { name: "Grãos", value: 22, fill: "hsl(var(--chart-3))" },
    { name: "Irrigação", value: 15, fill: "hsl(var(--chart-4))" },
  ]

  const statusData = [
    { name: "Abertas", value: 3, fill: "hsl(var(--primary))" },
    { name: "Em Análise", value: 1, fill: "hsl(var(--secondary))" },
    { name: "Fechadas", value: 5, fill: "hsl(var(--muted))" },
    { name: "Concluídas", value: 8, fill: "hsl(var(--chart-5))" },
  ]

  return (
    <AdminLayout onLogout={() => router.push("/")}>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-balance">Dashboard Administrativo</h2>
          <p className="text-sm text-muted-foreground">Visão completa da plataforma em tempo real</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((stat) => (
            <Card
              key={stat.title}
              className="overflow-hidden border-l-4"
              style={{ borderLeftColor: `hsl(var(--${stat.color.replace("text-", "")}))` }}
            >
              <CardHeader className="pb-2 px-4 pt-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardDescription className="text-xs font-medium">{stat.title}</CardDescription>
                    <div className="text-2xl font-bold mt-1">{stat.value}</div>
                  </div>
                  <div className={`${stat.bgColor} p-2 rounded-lg`}>
                    <stat.icon className={`w-4 h-4 ${stat.color}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                  <div className="flex items-center gap-1">
                    {stat.trendUp ? (
                      <TrendingUp className="w-3 h-3 text-chart-5" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-destructive" />
                    )}
                    <span className={`text-xs font-bold ${stat.trendUp ? "text-chart-5" : "text-destructive"}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Atividade Mensal</CardTitle>
                  <CardDescription className="text-xs">Solicitações, propostas e volume financeiro</CardDescription>
                </div>
                <Badge variant="outline" className="text-xs">
                  Últimos 6 meses
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="h-[280px] px-4 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyActivity}>
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="hsl(var(--chart-5))"
                    fillOpacity={1}
                    fill="url(#colorVolume)"
                    name="Volume (R$ mil)"
                  />
                  <Line
                    type="monotone"
                    dataKey="solicitacoes"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="Solicitações"
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="propostas"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    name="Propostas"
                    dot={{ r: 3 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <CardTitle className="text-base">Por Categoria</CardTitle>
              <CardDescription className="text-xs">Distribuição de demandas</CardDescription>
            </CardHeader>
            <CardContent className="h-[280px] px-4 pb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={70}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Solicitações Recentes</CardTitle>
                  <CardDescription className="text-xs">Últimas demandas cadastradas</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/solicitations")}
                  className="h-7 text-xs"
                >
                  Ver todas
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2">
                {mockSolicitations.slice(0, 5).map((sol) => (
                  <div
                    key={sol.id}
                    className="flex items-center gap-3 p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                    onClick={() => router.push(`/admin/solicitations`)}
                  >
                    <img
                      src={sol.images[0] || "/placeholder.svg"}
                      alt={sol.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm truncate">{sol.title}</p>
                        {sol.status === "open" && (
                          <Badge
                            variant="outline"
                            className="text-[10px] h-4 px-1 bg-primary/10 text-primary border-primary/20"
                          >
                            Aberta
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <p className="text-xs text-muted-foreground">{sol.producerName}</p>
                        <span className="text-xs font-semibold">R$ {(sol.budget / 1000).toFixed(0)}K</span>
                        <span className="text-xs text-muted-foreground">{sol.proposalsCount} propostas</span>
                      </div>
                    </div>
                    <Eye className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 px-4 pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Propostas Recentes</CardTitle>
                  <CardDescription className="text-xs">Últimas ofertas enviadas</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push("/admin/proposals")}
                  className="h-7 text-xs"
                >
                  Ver todas
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="space-y-2">
                {mockProposals.slice(0, 5).map((prop) => (
                  <div
                    key={prop.id}
                    className="flex items-center justify-between p-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{prop.supplierCompany}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground">{prop.deliveryTime}</span>
                        <span className="text-xs font-semibold">R$ {(prop.price / 1000).toFixed(0)}K</span>
                      </div>
                    </div>
                    <div>
                      {prop.status === "accepted" && (
                        <Badge className="text-[10px] h-5 px-2 bg-chart-5/10 text-chart-5 border-chart-5/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Aceita
                        </Badge>
                      )}
                      {prop.status === "rejected" && (
                        <Badge
                          variant="outline"
                          className="text-[10px] h-5 px-2 bg-destructive/10 text-destructive border-destructive/20"
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Recusada
                        </Badge>
                      )}
                      {prop.status === "pending" && (
                        <Badge
                          variant="outline"
                          className="text-[10px] h-5 px-2 bg-secondary/10 text-secondary border-secondary/20"
                        >
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="pb-3 px-4 pt-4">
            <CardTitle className="text-base">Status das Solicitações</CardTitle>
            <CardDescription className="text-xs">Situação atual de todas as demandas</CardDescription>
          </CardHeader>
          <CardContent className="h-[200px] px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="category" dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis type="number" tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 12 }} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
