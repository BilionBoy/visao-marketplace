"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockProposals, mockSolicitations } from "@/lib/mockData"

export default function AdminProposalsPage() {
  const router = useRouter()

  return (
    <AdminLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Gerenciar Propostas</h2>
          <p className="text-muted-foreground">Monitore todas as propostas da plataforma</p>
        </div>

        <div className="grid sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold">{mockProposals.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Pendentes</p>
              <p className="text-3xl font-bold text-secondary">
                {mockProposals.filter((p) => p.status === "pending").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Aceitas</p>
              <p className="text-3xl font-bold text-chart-5">
                {mockProposals.filter((p) => p.status === "accepted").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Recusadas</p>
              <p className="text-3xl font-bold text-destructive">
                {mockProposals.filter((p) => p.status === "rejected").length}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          {mockProposals.map((prop) => {
            const sol = mockSolicitations.find((s) => s.id === prop.solicitationId)
            return (
              <Card key={prop.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{sol?.title}</CardTitle>
                      <CardDescription>
                        Proposta de: {prop.supplierCompany} • {new Date(prop.createdAt).toLocaleDateString("pt-BR")}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-secondary">R$ {prop.price.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-muted-foreground">{prop.deliveryTime}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{prop.description}</p>
                  <div className="flex items-center justify-between">
                    <div>
                      {prop.status === "pending" && (
                        <Badge variant="outline" className="bg-secondary/10 text-secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                      {prop.status === "accepted" && (
                        <Badge className="bg-chart-5 text-primary-foreground">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Aceita
                        </Badge>
                      )}
                      {prop.status === "rejected" && (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Recusada
                        </Badge>
                      )}
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
