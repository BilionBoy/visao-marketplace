"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Search, DollarSign, Clock, Eye, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations } from "@/lib/mockData"
import { useState } from "react"

export default function SolicitationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")

  const filteredSolicitations = mockSolicitations.filter((sol) => {
    const matchesSearch =
      sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || sol.status === statusFilter
    const matchesType = typeFilter === "all" || sol.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { label: "Aberta", class: "bg-primary/10 text-primary border-primary/20" },
      in_review: { label: "Em Análise", class: "bg-secondary/10 text-secondary border-secondary/20" },
      closed: { label: "Fechada", class: "bg-muted text-muted-foreground border-muted" },
      completed: { label: "Concluída", class: "bg-chart-5/10 text-chart-5 border-chart-5/20" },
    }
    return badges[status as keyof typeof badges] || badges.open
  }

  const getTypeBadge = (type: string) => {
    return type === "service"
      ? { label: "Serviço", class: "bg-accent/10 text-accent border-accent/20" }
      : { label: "Produto", class: "bg-chart-3/10 text-chart-3 border-chart-3/20" }
  }

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-balance">Minhas Solicitações</h2>
            <p className="text-sm text-muted-foreground">Gerencie todas as suas solicitações de orçamento</p>
          </div>
          <Button onClick={() => router.push("/producer/solicitations/new")} className="w-full sm:w-auto">
            <Plus className="w-5 h-5 mr-2" />
            Nova Solicitação
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar solicitações..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="open">Abertas</SelectItem>
                  <SelectItem value="in_review">Em Análise</SelectItem>
                  <SelectItem value="closed">Fechadas</SelectItem>
                  <SelectItem value="completed">Concluídas</SelectItem>
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

        {/* Stats Summary */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Total</p>
                  <p className="text-2xl font-bold">{mockSolicitations.length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-chart-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Abertas</p>
                  <p className="text-2xl font-bold text-chart-1">
                    {mockSolicitations.filter((s) => s.status === "open").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-chart-1/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-chart-1" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Em Análise</p>
                  <p className="text-2xl font-bold text-secondary">
                    {mockSolicitations.filter((s) => s.status === "in_review").length}
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
                  <p className="text-xs font-medium text-muted-foreground mb-1">Propostas</p>
                  <p className="text-2xl font-bold text-accent">
                    {mockSolicitations.reduce((acc, s) => acc + s.proposalsCount, 0)}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Solicitations List */}
        <div className="grid gap-3">
          {filteredSolicitations.map((sol) => {
            const statusBadge = getStatusBadge(sol.status)
            const typeBadge = getTypeBadge(sol.type)

            return (
              <Card key={sol.id} className="overflow-hidden hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Imagem */}
                    <div className="w-full sm:w-24 sm:flex-shrink-0">
                      <div className="w-full h-32 sm:h-24 rounded-lg overflow-hidden bg-muted">
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
                          <span
                            className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusBadge.class}`}
                          >
                            {statusBadge.label}
                          </span>
                          <span className={`px-2.5 py-0.5 text-xs font-medium rounded-full border ${typeBadge.class}`}>
                            {typeBadge.label}
                          </span>
                          <span className="px-2.5 py-0.5 text-xs bg-muted rounded-full">{sol.category}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{sol.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs mb-3">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="w-3.5 h-3.5" />
                          <span className="font-semibold">R$ {sol.budget.toLocaleString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          <span>Prazo: {new Date(sol.deadline).toLocaleDateString("pt-BR")}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <FileText className="w-3.5 h-3.5" />
                          <span className="font-semibold">{sol.proposalsCount}</span> propostas
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Button size="sm" onClick={() => router.push(`/producer/solicitations/${sol.id}`)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                        {sol.proposalsCount > 0 && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => router.push(`/producer/proposals?solicitation=${sol.id}`)}
                          >
                            Ver {sol.proposalsCount} Propostas
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {filteredSolicitations.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Nenhuma solicitação encontrada</h3>
              <p className="text-muted-foreground mb-4">Tente ajustar os filtros ou criar uma nova solicitação</p>
              <Button onClick={() => router.push("/producer/solicitations/new")}>
                <Plus className="w-4 h-4 mr-2" />
                Nova Solicitação
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </ProducerLayout>
  )
}
