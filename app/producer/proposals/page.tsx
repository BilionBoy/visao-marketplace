"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, CheckCircle, XCircle, Clock } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockProposals, mockSolicitations } from "@/lib/mockData"

export default function ProducerProposalsPage() {
  const router = useRouter()

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold">Propostas Recebidas</h2>
          <p className="text-muted-foreground">Analise e gerencie as propostas dos fornecedores</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total Recebidas</p>
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
        </div>

        <div className="space-y-4">
          {mockProposals.map((proposal) => {
            const solicitation = mockSolicitations.find((s) => s.id === proposal.solicitationId)
            return (
              <Card key={proposal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{solicitation?.title}</CardTitle>
                      <CardDescription>Proposta de: {proposal.supplierCompany}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-primary">R$ {proposal.price.toLocaleString("pt-BR")}</p>
                      <p className="text-sm text-muted-foreground">{proposal.deliveryTime}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{proposal.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {proposal.status === "pending" && (
                        <Badge variant="outline" className="bg-secondary/10 text-secondary">
                          <Clock className="w-3 h-3 mr-1" />
                          Pendente
                        </Badge>
                      )}
                      {proposal.status === "accepted" && (
                        <Badge className="bg-chart-5 text-primary-foreground">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Aceita
                        </Badge>
                      )}
                      {proposal.status === "rejected" && (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Recusada
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver Detalhes
                      </Button>
                      {proposal.status === "pending" && (
                        <>
                          <Button size="sm">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aceitar
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="w-4 h-4 mr-2" />
                            Recusar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </ProducerLayout>
  )
}
