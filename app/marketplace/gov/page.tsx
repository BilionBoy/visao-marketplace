"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockMarketplaceProducts, strategicPoints } from "@/lib/marketplaceData"
import {
  ShieldCheck,
  MapPin,
  Package,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  Activity,
  FileText,
  Download,
  Eye,
  Settings,
  BarChart3,
} from "lucide-react"
import Link from "next/link"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const salesData = [
  { month: "Jan", value: 4200000, transactions: 342 },
  { month: "Fev", value: 5100000, transactions: 398 },
  { month: "Mar", value: 4800000, transactions: 376 },
  { month: "Abr", value: 6200000, transactions: 445 },
  { month: "Mai", value: 7500000, transactions: 512 },
  { month: "Jun", value: 8400000, transactions: 589 },
]

const categoryData = [
  { name: "Grãos", products: 3420, value: 12500000 },
  { name: "Maquinário", products: 234, value: 45800000 },
  { name: "Insumos", products: 1890, value: 8900000 },
  { name: "Frutas", products: 2340, value: 6700000 },
  { name: "Pecuária", products: 567, value: 15300000 },
]

export default function GovernmentPanelPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const totalProducts = mockMarketplaceProducts.length
  const totalSellers = new Set(mockMarketplaceProducts.map((p) => p.seller.id)).size
  const verifiedSellers = mockMarketplaceProducts.filter((p) => p.seller.verified).length
  const activePoints = strategicPoints.filter((sp) => sp.status === "active").length

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar Governamental */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-border px-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-foreground">Painel Gov</h1>
              <p className="text-xs text-muted-foreground">Marketplace Agro</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 overflow-y-auto p-3">
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Visão Geral
            </div>
            <Link
              href="/marketplace/gov"
              className="flex items-center gap-3 rounded-lg bg-primary/10 px-3 py-2 text-sm font-medium text-primary"
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/marketplace/gov/points"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted"
            >
              <MapPin className="h-4 w-4" />
              Pontos Estratégicos
            </Link>

            <div className="mb-2 mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Fiscalização
            </div>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
              <Package className="h-4 w-4" />
              Produtos
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
              <Users className="h-4 w-4" />
              Vendedores
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
              <AlertTriangle className="h-4 w-4" />
              Denúncias
            </button>

            <div className="mb-2 mt-4 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Relatórios
            </div>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
              <FileText className="h-4 w-4" />
              Transações
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
              <Activity className="h-4 w-4" />
              Auditoria
            </button>
          </nav>

          {/* Footer */}
          <div className="border-t border-border p-3">
            <Link href="/marketplace">
              <Button variant="outline" size="sm" className="w-full bg-transparent">
                Voltar ao Marketplace
              </Button>
            </Link>
          </div>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <div className="ml-64 flex-1">
        {/* Header */}
        <header className="sticky top-0 z-30 border-b border-border bg-card">
          <div className="flex h-14 items-center justify-between px-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Dashboard Executivo</h2>
              <p className="text-xs text-muted-foreground">Visão geral do Marketplace Agro</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-green-600 text-white">
                <Activity className="mr-1 h-3 w-3" />
                Sistema Operacional
              </Badge>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* Conteúdo */}
        <main className="p-6">
          {/* KPIs Principais */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-l-4 border-l-chart-1 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Produtos Ativos</p>
                  <p className="text-2xl font-bold text-foreground">{totalProducts.toLocaleString()}</p>
                  <p className="mt-1 text-xs text-green-600">+12.5% vs mês anterior</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-1/10">
                  <Package className="h-6 w-6 text-chart-1" />
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-l-chart-2 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Vendedores Verificados</p>
                  <p className="text-2xl font-bold text-foreground">{totalSellers}</p>
                  <p className="mt-1 text-xs text-green-600">+8.3% vs mês anterior</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/10">
                  <Users className="h-6 w-6 text-chart-2" />
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-l-chart-3 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Volume Transações</p>
                  <p className="text-2xl font-bold text-foreground">R$ 8.4M</p>
                  <p className="mt-1 text-xs text-green-600">+23.7% vs mês anterior</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
                  <DollarSign className="h-6 w-6 text-chart-3" />
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-l-chart-4 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Pontos Estratégicos</p>
                  <p className="text-2xl font-bold text-foreground">{activePoints}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{strategicPoints.length} cadastrados</p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/10">
                  <MapPin className="h-6 w-6 text-chart-4" />
                </div>
              </div>
            </Card>
          </div>

          {/* Gráficos */}
          <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Evolução de Transações */}
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Evolução de Transações</h3>
                  <p className="text-xs text-muted-foreground">Últimos 6 meses</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="oklch(0.35 0.08 155)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="oklch(0.35 0.08 155)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.005 85)" />
                  <XAxis dataKey="month" stroke="oklch(0.48 0.01 85)" style={{ fontSize: 12 }} />
                  <YAxis stroke="oklch(0.48 0.01 85)" style={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.005 85)",
                      borderRadius: 8,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="oklch(0.35 0.08 155)"
                    strokeWidth={2}
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Card>

            {/* Distribuição por Categoria */}
            <Card className="p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Distribuição por Categoria</h3>
                  <p className="text-xs text-muted-foreground">Volume de produtos</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={categoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.9 0.005 85)" />
                  <XAxis dataKey="name" stroke="oklch(0.48 0.01 85)" style={{ fontSize: 12 }} />
                  <YAxis stroke="oklch(0.48 0.01 85)" style={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "oklch(1 0 0)",
                      border: "1px solid oklch(0.9 0.005 85)",
                      borderRadius: 8,
                    }}
                  />
                  <Bar dataKey="products" fill="oklch(0.35 0.08 155)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Tabs de Gestão */}
          <Tabs defaultValue="points" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="points">Pontos Estratégicos ({strategicPoints.length})</TabsTrigger>
              <TabsTrigger value="alerts">Alertas (3)</TabsTrigger>
              <TabsTrigger value="recent">Atividades Recentes</TabsTrigger>
            </TabsList>

            <TabsContent value="points">
              <Card className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-foreground">Pontos Estratégicos Cadastrados</h3>
                  <Button size="sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Novo Ponto
                  </Button>
                </div>

                <div className="space-y-3">
                  {strategicPoints.map((point) => (
                    <Link key={point.id} href={`/marketplace/gov/points/${point.id}`}>
                      <div className="group flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:border-primary hover:bg-primary/5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full ${
                              point.type === "distribution"
                                ? "bg-chart-1/10 text-chart-1"
                                : point.type === "collection"
                                  ? "bg-chart-2/10 text-chart-2"
                                  : "bg-chart-3/10 text-chart-3"
                            }`}
                          >
                            <MapPin className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-foreground group-hover:text-primary">
                                {point.name}
                              </p>
                              <Badge
                                variant="secondary"
                                className={
                                  point.status === "active"
                                    ? "bg-green-600 text-white"
                                    : point.status === "maintenance"
                                      ? "bg-yellow-600 text-white"
                                      : "bg-red-600 text-white"
                                }
                              >
                                {point.status === "active"
                                  ? "Ativo"
                                  : point.status === "maintenance"
                                    ? "Manutenção"
                                    : "Inativo"}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">{point.location}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-6">
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Produtos Manipulados</p>
                            <p className="text-sm font-semibold text-foreground">
                              {point.productsHandled.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs text-muted-foreground">Última Inspeção</p>
                            <p className="text-sm font-semibold text-foreground">
                              {new Date(point.lastInspection).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="alerts">
              <Card className="p-4">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Alertas do Sistema</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Ponto estratégico em manutenção</p>
                      <p className="text-xs text-muted-foreground">
                        Centro de Distribuição Norte MT está em manutenção preventiva
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Há 2 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Inspeção programada</p>
                      <p className="text-xs text-muted-foreground">
                        15 pontos estratégicos com inspeção agendada esta semana
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Há 5 horas</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-3">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Novo vendedor verificado</p>
                      <p className="text-xs text-muted-foreground">
                        3 novos vendedores foram verificados e aprovados hoje
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">Há 1 dia</p>
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="recent">
              <Card className="p-4">
                <h3 className="mb-4 text-sm font-semibold text-foreground">Atividades Recentes</h3>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center gap-3 border-b border-border pb-3 last:border-0">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">Novo produto cadastrado no marketplace</p>
                        <p className="text-xs text-muted-foreground">Fazenda Santa Maria - Soja Premium</p>
                      </div>
                      <span className="text-xs text-muted-foreground">Há {i}h</span>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
