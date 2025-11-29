"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Upload, X, Plus, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { mockCostCenters } from "@/lib/mockData"

export default function NewSolicitationPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    type: "",
    costCenter: "",
    title: "",
    category: "",
    description: "",
    budget: "",
    deadline: "",
    images: [] as string[],
  })

  const [uploadedImages, setUploadedImages] = useState<string[]>([])

  const handleImageUpload = () => {
    // Simulando upload de imagem
    const mockImages = [
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
      "/placeholder.svg?height=300&width=400",
    ]
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)]
    setUploadedImages([...uploadedImages, randomImage])
  }

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index))
  }

  const handleSubmit = () => {
    // Simular envio
    router.push("/producer/solicitations")
  }

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/producer/solicitations")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <div>
            <h2 className="text-3xl font-bold">Nova Solicitação</h2>
            <p className="text-muted-foreground">Crie uma nova solicitação de orçamento</p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              {[
                { num: 1, title: "Tipo" },
                { num: 2, title: "Centro de Custo" },
                { num: 3, title: "Detalhes" },
                { num: 4, title: "Fotos" },
              ].map((s, idx) => (
                <div key={s.num} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                        step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {step > s.num ? <CheckCircle className="w-5 h-5" /> : s.num}
                    </div>
                    <p className="text-xs mt-2 text-center">{s.title}</p>
                  </div>
                  {idx < 3 && (
                    <div className={`h-1 flex-1 mx-2 transition-colors ${step > s.num ? "bg-primary" : "bg-muted"}`} />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Step 1: Tipo */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Tipo de Solicitação</CardTitle>
              <CardDescription>O que você deseja solicitar?</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    formData.type === "service" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, type: "service" })}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Solicitar Serviço</h3>
                    <p className="text-sm text-muted-foreground">Preciso contratar um serviço ou mão de obra</p>
                  </CardContent>
                </Card>

                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    formData.type === "product" ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setFormData({ ...formData, type: "product" })}
                >
                  <CardContent className="pt-6 text-center">
                    <div className="w-16 h-16 bg-chart-3/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-chart-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                        />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">Vender Produto</h3>
                    <p className="text-sm text-muted-foreground">Quero vender produtos ou insumos</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!formData.type}>
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Centro de Custo */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Centro de Custo</CardTitle>
              <CardDescription>Selecione o centro de custo para esta solicitação</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Centro de Custo</Label>
                <Select
                  value={formData.costCenter}
                  onValueChange={(value) => setFormData({ ...formData, costCenter: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um centro de custo" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCostCenters.map((cc) => (
                      <SelectItem key={cc.id} value={cc.id}>
                        {cc.name} ({cc.code}) - R$ {cc.budget.toLocaleString("pt-BR")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Não encontrou?{" "}
                  <a href="/producer/cost-centers" className="text-primary hover:underline">
                    Criar novo centro de custo
                  </a>
                </p>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Voltar
                </Button>
                <Button onClick={() => setStep(3)} disabled={!formData.costCenter}>
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Detalhes */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Detalhes da Solicitação</CardTitle>
              <CardDescription>Descreva o que você precisa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Pulverização Aérea - 500 hectares"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Categoria *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.type === "service" ? (
                      <>
                        <SelectItem value="Pulverização">Pulverização</SelectItem>
                        <SelectItem value="Manutenção">Manutenção</SelectItem>
                        <SelectItem value="Irrigação">Irrigação</SelectItem>
                        <SelectItem value="Colheita">Colheita</SelectItem>
                        <SelectItem value="Transporte">Transporte</SelectItem>
                      </>
                    ) : (
                      <>
                        <SelectItem value="Grãos">Grãos</SelectItem>
                        <SelectItem value="Fertilizantes">Fertilizantes</SelectItem>
                        <SelectItem value="Defensivos">Defensivos</SelectItem>
                        <SelectItem value="Sementes">Sementes</SelectItem>
                        <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição Detalhada *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva em detalhes o que você precisa..."
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento Estimado (R$) *</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0,00"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline">Prazo Limite *</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Voltar
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={
                    !formData.title ||
                    !formData.category ||
                    !formData.description ||
                    !formData.budget ||
                    !formData.deadline
                  }
                >
                  Próximo
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Fotos */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Adicionar Fotos</CardTitle>
              <CardDescription>Adicione fotos para ilustrar sua solicitação (opcional mas recomendado)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {uploadedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`Upload ${idx + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(idx)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <button
                  onClick={handleImageUpload}
                  className="h-32 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center hover:bg-muted/50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">Adicionar Foto</span>
                </button>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Voltar
                </Button>
                <Button onClick={handleSubmit} size="lg">
                  <Plus className="w-5 h-5 mr-2" />
                  Criar Solicitação
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </ProducerLayout>
  )
}
