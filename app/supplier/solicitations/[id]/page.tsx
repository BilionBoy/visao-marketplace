"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, Clock, FileText, Calendar, Plus, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockSolicitations } from "@/lib/mockData"
import { useParams } from "next/navigation"

export default function SupplierSolicitationDetailPage() {
  const router = useRouter()
  const params = useParams()
  const solicitation = mockSolicitations.find((s) => s.id === params.id)

  if (!solicitation) {
    return (
      <SupplierLayout onLogout={() => router.push("/")}>
        <Card>
          <CardContent className="py-12 text-center">
            <p>Solicitação não encontrada</p>
            <Button onClick={() => router.push("/supplier/solicitations")} className="mt-4">
              Voltar
            </Button>
          </CardContent>
        </Card>
      </SupplierLayout>
    )
  }

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/supplier/solicitations")}>
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
                  <Badge className="bg-primary text-primary-foreground">Oportunidade Aberta</Badge>
                  <Badge variant="outline">{solicitation.type === "service" ? "Serviço" : "Produto"}</Badge>
                  <Badge variant="outline">{solicitation.category}</Badge>
                </div>
                <CardTitle className="text-3xl mb-2">{solicitation.title}</CardTitle>
                <CardDescription className="text-base flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Solicitado por: <span className="font-semibold">{solicitation.producerName}</span>
                </CardDescription>
              </div>
              <Button size="lg" onClick={() => router.push(`/supplier/solicitations/${solicitation.id}/propose`)}>
                <Plus className="w-5 h-5 mr-2" />
                Enviar Proposta
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Orçamento</p>
                  <p className="text-lg font-bold">R$ {solicitation.budget.toLocaleString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-secondary/5 rounded-lg border border-secondary/20">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prazo</p>
                  <p className="text-lg font-bold">{new Date(solicitation.deadline).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-accent/5 rounded-lg border border-accent/20">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Concorrência</p>
                  <p className="text-lg font-bold">{solicitation.proposalsCount} propostas</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Publicado</p>
                  <p className="text-lg font-bold">{new Date(solicitation.createdAt).toLocaleDateString("pt-BR")}</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2">Descrição Detalhada</h4>
                <p className="text-muted-foreground leading-relaxed">{solicitation.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-2">Centro de Custo</h4>
                <p className="text-muted-foreground">{solicitation.costCenterName}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-3">Fotos da Solicitação</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {solicitation.images.map((img, idx) => (
                    <div key={idx} className="relative group cursor-pointer">
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`Foto ${idx + 1}`}
                        className="w-full h-40 object-cover rounded-lg hover:shadow-xl transition-shadow"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <CardContent className="py-8 text-center">
            <h3 className="text-2xl font-bold mb-2">Interessado nesta oportunidade?</h3>
            <p className="text-muted-foreground mb-6">Envie sua proposta e tenha a chance de fechar este negócio</p>
            <Button size="lg" onClick={() => router.push(`/supplier/solicitations/${solicitation.id}/propose`)}>
              <Plus className="w-5 h-5 mr-2" />
              Enviar Minha Proposta
            </Button>
          </CardContent>
        </Card>
      </div>
    </SupplierLayout>
  )
}
