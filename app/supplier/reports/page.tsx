"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, TrendingUp, DollarSign, Target, Award } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockProposals, mockServiceOrders } from "@/lib/mockData"
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

export default function SupplierReportsPage() {
  const router = useRouter()
  const [period, setPeriod] = useState("6months")

  const myProposals = mockProposals.filter((p) => p.supplierId === "2")
  const myContracts = mockServiceOrders.filter((o) => o.supplierId === "2")
  const acceptanceRate = (myProposals.filter((p) => p.status === "accepted").length / myProposals.length) * 100
  const totalRevenue = myContracts.reduce((acc, c) => acc + c.value, 0)

  const monthlyData = [
    { month: "Jul", propostas: 2, aceitas: 1, faturamento: 32000 },
    { month: "Ago", propostas: 3, aceitas: 1, faturamento: 42000 },
    { month: "Set", propostas: 2, aceitas: 0, faturamento: 0 },
    { month: "Out", propostas: 4, aceitas: 1, faturamento: 42000 },
    { month: "Nov", propostas: 3, aceitas: 0, faturamento: 0 },
    { month: "Dez", propostas: 0, aceitas: 0, faturamento: 0 },
  ]

  const categoryData = [
    { name: "Pulverização", value: 2, fill: "hsl(var(--chart-1))" },
    { name: "Manutenção", value: 3, fill: "hsl(var(--chart-2))" },
    { name: "Irrigação", value: 1, fill: "hsl(var(--chart-4))" },
  ]

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Relatórios de Performance</h2>
            <p className="text-muted-foreground">Analise seu desempenho na plataforma</p>
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
              <CardDescription className="text-xs">Taxa de Aceitação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{acceptanceRate.toFixed(1)}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Propostas aceitas</p>
                </div>
                <Target className="w-8 h-8 text-chart-5" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Faturamento Total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">R$ {totalRevenue.toLocaleString("pt-BR")}</p>
                  <p className="text-xs text-muted-foreground mt-1">Contratos fechados</p>
                </div>
                <DollarSign className="w-8 h-8 text-secondary" />
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
                    R${" "}
                    {myContracts.length > 0
                      ? (totalRevenue / myContracts.length).toLocaleString("pt-BR", { maximumFractionDigits: 0 })
                      : "0"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Por contrato</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription className="text-xs">Propostas Enviadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold">{myProposals.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">Total no período</p>
                </div>
                <Award className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Performance Mensal</CardTitle>
            <CardDescription>Propostas enviadas vs aceitas</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px]">
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
                  name="Propostas Enviadas"
                />
                <Line
                  type="monotone"
                  dataKey="aceitas"
                  stroke="hsl(var(--chart-5))"
                  strokeWidth={2}
                  name="Propostas Aceitas"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Faturamento Mensal</CardTitle>
              <CardDescription>Receita gerada por mês</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => `R$ ${Number(value).toLocaleString("pt-BR")}`} />
                  <Bar dataKey="faturamento" fill="hsl(var(--secondary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Categoria</CardTitle>
              <CardDescription>Suas propostas por tipo de serviço</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </SupplierLayout>
  )
}
