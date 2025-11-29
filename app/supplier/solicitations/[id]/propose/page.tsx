"use client"

import { SupplierLayout } from "@/components/supplier/supplier-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Send, Upload, X, FileText } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useState } from "react"
import { mockSolicitations } from "@/lib/mockData"

export default function SupplierProposePage() {
  const router = useRouter()
  const params = useParams()
  const solicitation = mockSolicitations.find((s) => s.id === params.id)

  const [attachments, setAttachments] = useState<string[]>([])
  const [formData, setFormData] = useState({
    price: "",
    deliveryTime: "",
    description: "",
    technicalDetails: "",
    paymentTerms: "",
    warranty: "",
  })

  const handleAddAttachment = () => {
    setAttachments([...attachments, "/placeholder.svg?height=200&width=300"])
  }

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    router.push("/supplier/proposals")
  }

  if (!solicitation) {
    return null
  }

  return (
    <SupplierLayout onLogout={() => router.push("/")}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push(`/supplier/solicitations/${solicitation.id}`)}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-3xl font-bold">Enviar Proposta</h2>
            <p className="text-muted-foreground">Solicitação: {solicitation.title}</p>
          </div>
        </div>

        {/* Solicitation Summary */}
        <Card className="bg-muted/30">
          <CardContent className="pt-6">
            <div className="grid sm:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Orçamento do Produtor</p>
                <p className="text-2xl font-bold text-primary">R$ {solicitation.budget.toLocaleString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Prazo Desejado</p>
                <p className="text-2xl font-bold">{new Date(solicitation.deadline).toLocaleDateString("pt-BR")}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Concorrência</p>
                <p className="text-2xl font-bold text-accent">{solicitation.proposalsCount} propostas</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Proposta Form */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes da Proposta</CardTitle>
            <CardDescription>Preencha os detalhes da sua proposta comercial</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Valor e Prazo */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Valor da Proposta (R$) *</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0,00"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="text-lg font-semibold"
                />
                <p className="text-xs text-muted-foreground">
                  Orçamento do produtor: R$ {solicitation.budget.toLocaleString("pt-BR")}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="deliveryTime">Prazo de Entrega *</Label>
                <Input
                  id="deliveryTime"
                  placeholder="Ex: 5 dias úteis"
                  value={formData.deliveryTime}
                  onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                />
              </div>
            </div>

            {/* Descrição */}
            <div className="space-y-2">
              <Label htmlFor="description">Descrição da Proposta *</Label>
              <Textarea
                id="description"
                placeholder="Descreva sua proposta de forma clara e objetiva..."
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Seja detalhado e destaque seus diferenciais</p>
            </div>

            {/* Detalhes Técnicos */}
            <div className="space-y-2">
              <Label htmlFor="technicalDetails">Detalhes Técnicos *</Label>
              <Textarea
                id="technicalDetails"
                placeholder="Equipamentos, metodologia, equipe técnica, certificações..."
                rows={6}
                value={formData.technicalDetails}
                onChange={(e) => setFormData({ ...formData, technicalDetails: e.target.value })}
              />
            </div>

            {/* Condições de Pagamento */}
            <div className="space-y-2">
              <Label htmlFor="paymentTerms">Condições de Pagamento *</Label>
              <Textarea
                id="paymentTerms"
                placeholder="Ex: 30% antecipado, 70% na conclusão"
                rows={3}
                value={formData.paymentTerms}
                onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              />
            </div>

            {/* Garantia */}
            <div className="space-y-2">
              <Label htmlFor="warranty">Garantia e Observações</Label>
              <Textarea
                id="warranty"
                placeholder="Informações sobre garantia, pós-venda, suporte..."
                rows={3}
                value={formData.warranty}
                onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Anexos */}
        <Card>
          <CardHeader>
            <CardTitle>Documentos e Anexos</CardTitle>
            <CardDescription>Adicione documentos, catálogos, certificados ou fotos (opcional)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {attachments.map((att, idx) => (
                <div key={idx} className="relative group">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeAttachment(idx)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}

              <button
                onClick={handleAddAttachment}
                className="h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:bg-muted/50 transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">Adicionar</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <Card className="bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg mb-1">Revisar e Enviar</h3>
                <p className="text-sm text-muted-foreground">
                  Certifique-se de que todos os dados estão corretos antes de enviar
                </p>
              </div>
              <Button size="lg" onClick={handleSubmit}>
                <Send className="w-5 h-5 mr-2" />
                Enviar Proposta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </SupplierLayout>
  )
}
