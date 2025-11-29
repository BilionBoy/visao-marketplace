"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, Clock, FileText, Calendar, Eye, CheckCircle, XCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations, mockProposals } from "@/lib/mockData"
import { useParams } from "next/navigation"

export default function SolicitationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const solicitation = mockSolicitations.find((s) => s.id === params.id)
  const proposals = mockProposals.filter((p) => p.solicitationId === params.id)

  if (!solicitation) {
    return (
      <ProducerLayout onLogout={() => router.push("/")}>
        <Card>
          <CardContent className="py-12 text-center">
            <p>Solicitação não encontrada</p>
            <Button onClick={() => router.push("/producer/solicitations")} className="mt-4">
              Voltar
            </Button>
          </CardContent>
        </Card>
      </ProducerLayout>
    )
  }

  const getStatusBadge = (status: string) => {
    const badges = {
      open: { label: "Aberta", class: "bg-primary text-primary-foreground" },
      in_review: { label: "Em Análise", class: "bg-secondary text-secondary-foreground" },
      closed: { label: "Fechada", class: "bg-muted text-muted-foreground" },
      completed: { label: "Concluída", class: "bg-chart-5 text-primary-foreground" },
    }
    return badges[status as keyof typeof badges] || badges.open
  }

  const statusBadge = getStatusBadge(solicitation.status)

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/producer/solicitations")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        {/* Main Info */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <Badge className={statusBadge.class}>{statusBadge.label}</Badge>
                  <Badge variant="outline">{solicitation.type === "service" ? "Serviço" : "Produto"}</Badge>
                  <Badge variant="outline">{solicitation.category}</Badge>
                </div>
                <CardTitle className="text-3xl mb-2">{solicitation.title}</CardTitle>
                <CardDescription className="text-base">{solicitation.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Orçamento</p>
                  <p className="font-semibold">R$ {solicitation.budget.toLocaleString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prazo</p>
                  <p className="font-semibold">{new Date(solicitation.deadline).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Propostas</p>
                  <p className="font-semibold">{solicitation.proposalsCount} recebidas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 bg-chart-5/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-chart-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Criado em</p>
                  <p className="font-semibold">{new Date(solicitation.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Centro de Custo</h4>
                <p className="text-sm text-muted-foreground">{solicitation.costCenterName}</p>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Fotos</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {solicitation.images.map((img, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Propostas */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Propostas Recebidas</CardTitle>
                <CardDescription>
                  {proposals.length} {proposals.length === 1 ? "proposta recebida" : "propostas recebidas"}
                </CardDescription>
              </div>
              {proposals.length > 0 && (
                <Button onClick={() => router.push(`/producer/proposals?solicitation=${solicitation.id}`)}>
                  Ver Todas as Propostas
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {proposals.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Nenhuma proposta ainda</h3>
                <p className="text-muted-foreground">Aguarde enquanto os fornecedores enviam suas propostas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {proposals.slice(0, 3).map((proposal) => (
                  <div
                    key={proposal.id}
                    className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{proposal.supplierCompany}</h4>
                        <p className="text-sm text-muted-foreground">{proposal.supplierName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">R$ {proposal.price.toLocaleString("pt-BR")}</p>
                        <p className="text-xs text-muted-foreground">{proposal.deliveryTime}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{proposal.description}</p>
                    <div className="flex items-center gap-2">
                      {proposal.status === "accepted" ? (
                        <Badge className="bg-chart-5 text-primary-foreground">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Aceita
                        </Badge>
                      ) : proposal.status === "rejected" ? (
                        <Badge variant="destructive">
                          <XCircle className="w-3 h-3 mr-1" />
                          Recusada
                        </Badge>
                      ) : (
                        <>
                          <Button size="sm" onClick={() => router.push(`/producer/proposals/${proposal.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          <Button size="sm" variant="outline">
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Aceitar
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </ProducerLayout>
  )
}
