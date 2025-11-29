"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Clock, CheckCircle, XCircle, Send, ThumbsUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockProposals, mockSolicitations } from "@/lib/mockData"

export default function SupplierProposalsPage() {
  const router = useRouter()
  const myProposals = mockProposals.filter((p) => p.supplierId === "2")

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Minhas Propostas</h2>
          <p className="text-sm text-muted-foreground">Acompanhe o status das propostas enviadas</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Total Enviadas</p>
                  <p className="text-2xl font-bold">{myProposals.length}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Send className="w-5 h-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-secondary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Pendentes</p>
                  <p className="text-2xl font-bold text-secondary">
                    {myProposals.filter((p) => p.status === "pending").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-chart-5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Aceitas</p>
                  <p className="text-2xl font-bold text-chart-5">
                    {myProposals.filter((p) => p.status === "accepted").length}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-chart-5/10 flex items-center justify-center">
                  <ThumbsUp className="w-5 h-5 text-chart-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-3">
          {myProposals.map((proposal) => {
            const solicitation = mockSolicitations.find((s) => s.id === proposal.solicitationId)
            return (
              <Card key={proposal.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 text-balance">{solicitation?.title}</h3>
                          <p className="text-xs text-muted-foreground">
                            Enviada em {new Date(proposal.createdAt).toLocaleDateString("pt-BR")}
                          </p>
                        </div>
                        <div className="text-left sm:text-right flex-shrink-0">
                          <p className="text-xl font-bold text-secondary">
                            R$ {proposal.price.toLocaleString("pt-BR")}
                          </p>
                          <p className="text-xs text-muted-foreground">{proposal.deliveryTime}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{proposal.description}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          {proposal.status === "pending" && (
                            <Badge variant="outline" className="bg-secondary/10 text-secondary border-secondary/20">
                              <Clock className="w-3 h-3 mr-1" />
                              Aguardando Resposta
                            </Badge>
                          )}
                          {proposal.status === "accepted" && (
                            <Badge className="bg-chart-5 text-primary-foreground border-0">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Proposta Aceita
                            </Badge>
                          )}
                          {proposal.status === "rejected" && (
                            <Badge variant="destructive">
                              <XCircle className="w-3 h-3 mr-1" />
                              Proposta Recusada
                            </Badge>
                          )}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => router.push(`/supplier/solicitations/${proposal.solicitationId}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Detalhes
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </SupplierLayout>
  )
}
