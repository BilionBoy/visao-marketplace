"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, DollarSign, TrendingDown, Clock } from "lucide-react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { useState } from "react"

export default function ProducerReportsPage() {
  const router = useRouter()
  const [period, setPeriod] = useState("6months")

  const avgProposalsPerSolicitation = mockProposals.length / mockSolicitations.length
  const totalInvestment = mockServiceOrders.reduce((acc, o) => acc + o.value, 0)
  const avgTicket = totalInvestment / mockServiceOrders.length

  const monthlyData = [
    { month: "Jul", solicitacoes: 2, propostas: 5, contratos: 1, gasto: 32000 },
    { month: "Ago", solicitacoes: 3, propostas: 8, contratos: 2, gasto: 84000 },
    { month: "Set", solicitacoes: 1, propostas: 3, contratos: 0, gasto: 0 },
    { month: "Out", solicitacoes: 2, propostas: 6, contratos: 1, gasto: 42000 },
    { month: "Nov", solicitacoes: 4, propostas: 11, contratos: 1, gasto: 42000 },
    { month: "Dez", solicitacoes: 0, propostas: 0, contratos: 0, gasto: 0 },
  ]

  const categorySpending = [
    { categoria: "Pulverização", valor: 32000, fill: "hsl(var(--chart-1))" },
    { categoria: "Manutenção", valor: 42000, fill: "hsl(var(--chart-2))" },
    { categoria: "Grãos", valor: 0, fill: "hsl(var(--chart-3))" },
    { categoria: "Irrigação", valor: 0, fill: "hsl(var(--chart-4))" },
  ]

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Relatórios Financeiros</h2>
            <p className="text-muted-foreground">Análise de gastos e investimentos</p>
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
              </SelectContent>
            </Select>
            <Button>
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Total Investido</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">R$ {totalInvestment.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Em contratos</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Média por Contrato</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">R$ {avgTicket.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Ticket médio</p>
                </div>
                <TrendingDown className="w-8 h-8 text-secondary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Propostas por Solicitação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{avgProposalsPerSolicitation.toFixed(1)}</p>
                  <p className="text-xs text-muted-foreground mt-1">Média recebida</p>
                </div>
                <FileText className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Tempo Médio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">2.5</p>
                  <p className="text-xs text-muted-foreground mt-1">Dias até contrato</p>
                </div>
                <Clock className="w-8 h-8 text-chart-5" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Atividade e Investimento</CardTitle>
            <CardDescription>Solicitações criadas e gastos mensais</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="solicitacoes"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Solicitações"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="propostas"
                  stroke="hsl(var(--secondary))"
                  strokeWidth={2}
                  name="Propostas Recebidas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gastos Mensais</CardTitle>
              <CardDescription>Investimento por mês</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                  <Bar dataKey="gasto" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Gastos por Categoria</CardTitle>
              <CardDescription>Distribuição de investimentos</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySpending.filter((c) => c.valor > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ categoria, percent }) => `${categoria} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="valor"
                  >
                    {categorySpending.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProducerLayout>
  )
}
