"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileSearch, Search, DollarSign, Clock, Eye, Users, Plus, TrendingUp, Target } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations } from "@/lib/mockData"
import { useState } from "react"

export default function SupplierSolicitationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const openSolicitations = mockSolicitations.filter((s) => s.status === "open")

  const filteredSolicitations = openSolicitations.filter((sol) => {
    const matchesSearch =
      sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = categoryFilter === "all" || sol.category === categoryFilter
    const matchesType = typeFilter === "all" || sol.type === typeFilter
    return matchesSearch && matchesCategory && matchesType
  })

  const categories = Array.from(new Set(openSolicitations.map((s) => s.category)))

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-balance">Oportunidades Abertas</h2>
          <p className="text-sm text-muted-foreground">Encontre solicitações e envie suas propostas</p>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar oportunidades..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Tipos</SelectItem>
                  <SelectItem value="service">Serviços</SelectItem>
                  <SelectItem value="product">Produtos</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Total Disponível</p>
                  <p className="text-2xl font-bold">{openSolicitations.length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-chart-5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Valor Total</p>
                  <p className="text-xl font-bold text-chart-5">
                    R${" "}
                    {(openSolicitations.reduce((acc, s) => acc + s.budget, 0) / 1000).toLocaleString("pt-BR", {
                      maximumFractionDigits: 0,
                    })}
                    k
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-chart-5/10 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-chart-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Média Orçamento</p>
                  <p className="text-xl font-bold text-secondary">
                    R${" "}
                    {(
                      openSolicitations.reduce((acc, s) => acc + s.budget, 0) /
                      openSolicitations.length /
                      1000
                    ).toLocaleString("pt-BR", { maximumFractionDigits: 0 })}
                    k
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-accent">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Concorrência Média</p>
                  <p className="text-2xl font-bold text-accent">
                    {(
                      openSolicitations.reduce((acc, s) => acc + s.proposalsCount, 0) / openSolicitations.length
                    ).toFixed(1)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solicitations List */}
        <div className="grid gap-3">
          {filteredSolicitations.map((sol) => (
            <Card key={sol.id} className="overflow-hidden hover:shadow-md transition-all">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Imagem */}
                  <div className="w-full sm:w-28 sm:flex-shrink-0">
                    <div className="w-full h-32 sm:h-28 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={sol.images[0] || "/placeholder.svg"}
                        alt={sol.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Conteúdo */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-balance">{sol.title}</h3>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                          {sol.category}
                        </span>
                        <span className="px-2.5 py-0.5 text-xs font-medium bg-secondary/10 text-secondary rounded-full border border-secondary/20">
                          {sol.type === "service" ? "Serviço" : "Produto"}
                        </span>
                        <span className="px-2 py-0.5 text-xs text-muted-foreground">Por: {sol.producerName}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{sol.description}</p>
                    <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <DollarSign className="w-3.5 h-3.5" />
                        <span className="font-semibold text-primary">R$ {sol.budget.toLocaleString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="w-3.5 h-3.5" />
                        <span>Prazo: {new Date(sol.deadline).toLocaleDateString("pt-BR")}</span>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        <span>{sol.proposalsCount} propostas</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm" onClick={() => router.push(`/supplier/solicitations/${sol.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => router.push(`/supplier/solicitations/${sol.id}/propose`)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Enviar Proposta
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSolicitations.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileSearch className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma oportunidade encontrada</h3>
              <p className="text-muted-foreground">Tente ajustar os filtros para encontrar mais solicitações</p>
            </CardContent>
          </Card>
        )}
      </div>
    </SupplierLayout>
  )
}
