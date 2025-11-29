"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, TrendingUp, Users, DollarSign } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations, mockProposals, mockServiceOrders, mockUsers } from "@/lib/mockData"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from "recharts"
import { useState } from "react"

export default function AdminReportsPage() {
  const router = useRouter()
  const [period, setPeriod] = useState("6months")

  const totalSolicitations = mockSolicitations.length
  const totalProposals = mockProposals.length
  const totalContracts = mockServiceOrders.length
  const totalValue = mockServiceOrders.reduce((acc, o) => acc + o.value, 0)
  const avgProposalsPerSolicitation = totalProposals / totalSolicitations
  const conversionRate = (totalContracts / totalProposals) * 100

  const monthlyRevenue = [
    { month: "Jul", receita: 85000, custos: 45000, lucro: 40000 },
    { month: "Ago", receita: 125000, custos: 65000, lucro: 60000 },
    { month: "Set", receita: 98000, custos: 52000, lucro: 46000 },
    { month: "Out", receita: 165000, custos: 88000, lucro: 77000 },
    { month: "Nov", receita: 42000, custos: 28000, lucro: 14000 },
    { month: "Dez", receita: 0, custos: 0, lucro: 0 },
  ]

  const supplierPerformance = [
    { name: "AgroServiços Ltda", propostas: 8, aceitas: 3, taxa: 37.5 },
    { name: "TecnoAgro", propostas: 6, aceitas: 2, taxa: 33.3 },
    { name: "AeroAgro", propostas: 5, aceitas: 1, taxa: 20.0 },
    { name: "RuralTech", propostas: 4, aceitas: 1, taxa: 25.0 },
  ]

  const categoryPerformance = [
    { categoria: "Pulverização", solicitacoes: 8, valor: 250000 },
    { categoria: "Manutenção", solicitacoes: 6, valor: 180000 },
    { categoria: "Irrigação", solicitacoes: 4, valor: 280000 },
    { categoria: "Grãos", solicitacoes: 3, valor: 180000 },
  ]

  return (
    <AdminLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Relatórios e Analytics</h2>
            <p className="text-muted-foreground">Análises detalhadas da plataforma</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30days">Últimos 30 dias</SelectItem>
                <SelectItem value="3months">Últimos 3 meses</SelectItem>
                <SelectItem value="6months">Últimos 6 meses</SelectItem>
                <SelectItem value="1year">Último ano</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar PDF
            </Button>
          </div>
        </div>

        {/* KPIs Principais */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Taxa de Conversão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{conversionRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Propostas → Contratos</p>
                </div>
                <TrendingUp className="w-8 h-8 text-chart-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Média de Propostas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{avgProposalsPerSolicitation.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Por solicitação</p>
                </div>
                <FileText className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Ticket Médio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">
                    R$ {(totalValue / totalContracts).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Por contrato</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Receita e Lucro */}
        <Card>
          <CardHeader>
            <CardTitle>Análise Financeira</CardTitle>
            <CardDescription>Receita, custos e lucro mensal</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyRevenue}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorLucro" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="receita"
                  stroke="hsl(var(--primary))"
                  fillOpacity={1}
                  fill="url(#colorReceita)"
                  name="Receita"
                />
                <Area
                  type="monotone"
                  dataKey="lucro"
                  stroke="hsl(var(--chart-5))"
                  fillOpacity={1}
                  fill="url(#colorLucro)"
                  name="Lucro"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Performance */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Categoria</CardTitle>
              <CardDescription>Solicitações e valor total por categoria</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="categoria" />
                  <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--primary))" />
                  <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--secondary))" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="solicitacoes"
                    fill="hsl(var(--primary))"
                    name="Solicitações"
                    radius={[8, 8, 0, 0]}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="valor"
                    fill="hsl(var(--secondary))"
                    name="Valor (R$)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ranking de Fornecedores</CardTitle>
              <CardDescription>Taxa de aceitação de propostas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supplierPerformance.map((supplier, idx) => (
                  <div key={supplier.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-muted-foreground">#{idx + 1}</span>
                        <div>
                          <p className="font-medium">{supplier.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {supplier.aceitas} aceitas de {supplier.propostas} propostas
                          </p>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-chart-5">{supplier.taxa.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-chart-5 h-2 rounded-full transition-all"
                        style={{ width: `${supplier.taxa}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estatísticas Detalhadas */}
        <Card>
          <CardHeader>
            <CardTitle>Estatísticas Detalhadas</CardTitle>
            <CardDescription>Métricas completas do período selecionado</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">Total de Solicitações</span>
                </div>
                <p className="text-2xl font-bold">{totalSolicitations}</p>
                <p className="text-xs text-muted-foreground">
                  {mockSolicitations.filter((s) => s.status === "open").length} abertas,{" "}
                  {mockSolicitations.filter((s) => s.status === "in_review").length} em análise
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm">Total de Propostas</span>
                </div>
                <p className="text-2xl font-bold">{totalProposals}</p>
                <p className="text-xs text-muted-foreground">
                  {mockProposals.filter((p) => p.status === "pending").length} pendentes,{" "}
                  {mockProposals.filter((p) => p.status === "accepted").length} aceitas
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Usuários Ativos</span>
                </div>
                <p className="text-2xl font-bold">{mockUsers.length}</p>
                <p className="text-xs text-muted-foreground">
                  {mockUsers.filter((u) => u.role === "producer").length} produtores,{" "}
                  {mockUsers.filter((u) => u.role === "supplier").length} fornecedores
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="w-4 h-4" />
                  <span className="text-sm">Volume Total</span>
                </div>
                <p className="text-2xl font-bold">R$ {totalValue.toLocaleString("pt-BR")}</p>
                <p className="text-xs text-muted-foreground">Em {totalContracts} contratos ativos</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
