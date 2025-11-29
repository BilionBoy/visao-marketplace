"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Eye, Clock, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations } from "@/lib/mockData"
import { useState } from "react"

export default function AdminSolicitationsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredSolicitations = mockSolicitations.filter(
    (sol) =>
      sol.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sol.producerName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { label: "Aberta", class: "bg-primary/10 text-primary" },
      in_review: { label: "Em Análise", class: "bg-secondary/10 text-secondary" },
      closed: { label: "Fechada", class: "bg-muted text-muted-foreground" },
      completed: { label: "Concluída", class: "bg-chart-5/10 text-chart-5" },
    }
    return badges[status as keyof typeof badges] || badges.open
  }

  return (
    <AdminLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Gerenciar Solicitações</h2>
          <p className="text-muted-foreground">Monitore todas as solicitações da plataforma</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold">{mockSolicitations.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Abertas</p>
              <p className="text-3xl font-bold text-primary">
                {mockSolicitations.filter((s) => s.status === "open").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Em Análise</p>
              <p className="text-3xl font-bold text-secondary">
                {mockSolicitations.filter((s) => s.status === "in_review").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Valor Total</p>
              <p className="text-3xl font-bold text-accent">
                R$ {mockSolicitations.reduce((acc, s) => acc + s.budget, 0).toLocaleString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar solicitações..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {filteredSolicitations.map((sol) => {
            const statusBadge = getStatusBadge(sol.status)
            return (
              <Card key={sol.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{sol.title}</CardTitle>
                        <Badge className={statusBadge.class}>{statusBadge.label}</Badge>
                        <Badge variant="outline">{sol.category}</Badge>
                      </div>
                      <CardDescription className="flex items-center gap-2">
                        <User className="w-3 h-3" />
                        {sol.producerName}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">R$ {sol.budget.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-muted-foreground">{sol.proposalsCount} propostas</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{sol.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Prazo: {new Date(sol.deadline).toLocaleDateString("pt-BR")}
                      </span>
                      <span>Criado em: {new Date(sol.createdAt).toLocaleDateString("pt-BR")}</span>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
