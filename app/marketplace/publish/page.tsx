"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { categories, strategicPoints } from "@/lib/marketplaceData"
import {
  ArrowLeft,
  ArrowRight,
  Upload,
  X,
  CheckCircle,
  Package,
  FileText,
  MapPin,
  ImageIcon,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PublishProductPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    unit: "",
    quantity: "",
    minOrder: "",
    category: "",
    subcategory: "",
    location: "",
    strategicPoint: "",
    certifications: [] as string[],
    images: [] as string[],
  })

  const totalSteps = 4

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const handlePrevious = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleImageUpload = () => {
    const mockImages = ["/soja-graos-saco.jpg", "/plantacao-soja.jpg", "/colheita-soja.jpg"]
    setFormData({ ...formData, images: [...formData.images, mockImages[formData.images.length % 3]] })
  }

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index)
    setFormData({ ...formData, images: newImages })
  }

  const selectedCategory = categories.find((c) => c.id === formData.category)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/marketplace"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Marketplace
            </Link>
            <Badge variant="secondary">Publicar Novo Produto</Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                      s <= step
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    {s < step ? <CheckCircle className="h-5 w-5" /> : s}
                  </div>
                  <span className="mt-2 text-xs font-medium text-muted-foreground">
                    {s === 1 ? "Informações" : s === 2 ? "Detalhes" : s === 3 ? "Imagens" : "Revisão"}
                  </span>
                </div>
                {s < totalSteps && <div className={`h-0.5 flex-1 ${s < step ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Informações Básicas */}
        {step === 1 && (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Informações Básicas</h2>
                <p className="text-sm text-muted-foreground">Preencha os dados principais do seu produto</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Título do Produto *</Label>
                <Input
                  id="title"
                  placeholder="Ex: Soja Transgênica Premium - Safra 2024"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Descrição Completa *</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva detalhadamente seu produto, incluindo características, qualidade, certificações..."
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="category">Categoria *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(v) => setFormData({ ...formData, category: v, subcategory: "" })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.icon} {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subcategory">Subcategoria *</Label>
                  <Select
                    value={formData.subcategory}
                    onValueChange={(v) => setFormData({ ...formData, subcategory: v })}
                    disabled={!formData.category}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a subcategoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory?.subcategories.map((sub) => (
                        <SelectItem key={sub} value={sub}>
                          {sub}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Localização *</Label>
                <Input
                  id="location"
                  placeholder="Ex: Sorriso, MT"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>
            </div>
          </Card>
        )}

        {/* Step 2: Detalhes e Preço */}
        {step === 2 && (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Detalhes e Preço</h2>
                <p className="text-sm text-muted-foreground">Defina preço, quantidade e informações comerciais</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="price">Preço Unitário (R$) *</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="unit">Unidade de Venda *</Label>
                  <Select value={formData.unit} onValueChange={(v) => setFormData({ ...formData, unit: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a unidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="saca 60kg">Saca 60kg</SelectItem>
                      <SelectItem value="tonelada">Tonelada</SelectItem>
                      <SelectItem value="unidade">Unidade</SelectItem>
                      <SelectItem value="cx 40,8kg">Caixa 40,8kg</SelectItem>
                      <SelectItem value="maço 250g">Maço 250g</SelectItem>
                      <SelectItem value="kg">Quilograma</SelectItem>
                      <SelectItem value="litro">Litro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="quantity">Quantidade Disponível *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Ex: 5000"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="minOrder">Pedido Mínimo *</Label>
                  <Input
                    id="minOrder"
                    type="number"
                    placeholder="Ex: 100"
                    value={formData.minOrder}
                    onChange={(e) => setFormData({ ...formData, minOrder: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="strategicPoint">Ponto Estratégico (Opcional)</Label>
                <Select
                  value={formData.strategicPoint}
                  onValueChange={(v) => setFormData({ ...formData, strategicPoint: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Vincular a um ponto estratégico governamental" />
                  </SelectTrigger>
                  <SelectContent>
                    {strategicPoints.map((point) => (
                      <SelectItem key={point.id} value={point.id}>
                        {point.name} - {point.location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="mt-1 text-xs text-muted-foreground">
                  Vincular a um ponto estratégico aumenta a confiança dos compradores
                </p>
              </div>

              <div>
                <Label>Certificações</Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["MAPA", "Orgânico Brasil", "GlobalGAP", "ISO 9001", "ISO 14001", "SISBOV"].map((cert) => (
                    <Button
                      key={cert}
                      variant={formData.certifications.includes(cert) ? "default" : "outline"}
                      size="sm"
                      onClick={() => {
                        if (formData.certifications.includes(cert)) {
                          setFormData({
                            ...formData,
                            certifications: formData.certifications.filter((c) => c !== cert),
                          })
                        } else {
                          setFormData({
                            ...formData,
                            certifications: [...formData.certifications, cert],
                          })
                        }
                      }}
                    >
                      {cert}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Step 3: Upload de Imagens */}
        {step === 3 && (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <ImageIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Imagens do Produto</h2>
                <p className="text-sm text-muted-foreground">Adicione fotos de alta qualidade do seu produto</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Upload Area */}
              <div
                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-muted/50 p-8 transition-colors hover:border-primary hover:bg-primary/5"
                onClick={handleImageUpload}
              >
                <Upload className="mb-3 h-12 w-12 text-muted-foreground" />
                <p className="mb-1 text-sm font-medium text-foreground">Clique para adicionar imagens</p>
                <p className="text-xs text-muted-foreground">PNG, JPG até 5MB (máximo 10 imagens)</p>
              </div>

              {/* Image Grid */}
              {formData.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {formData.images.map((img, index) => (
                    <div
                      key={index}
                      className="group relative aspect-square overflow-hidden rounded-lg border border-border"
                    >
                      <Image
                        src={img || "/placeholder.svg"}
                        alt={`Produto ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button variant="destructive" size="sm" onClick={() => removeImage(index)}>
                          <X className="mr-2 h-4 w-4" />
                          Remover
                        </Button>
                      </div>
                      {index === 0 && <Badge className="absolute left-2 top-2 bg-primary">Principal</Badge>}
                    </div>
                  ))}
                </div>
              )}

              {formData.images.length === 0 && (
                <div className="flex items-start gap-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                  <AlertCircle className="h-5 w-5 text-yellow-600" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Adicione pelo menos 3 imagens</p>
                    <p className="text-xs text-muted-foreground">
                      Produtos com mais imagens têm 70% mais visualizações
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Step 4: Revisão */}
        {step === 4 && (
          <Card className="p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">Revisão Final</h2>
                <p className="text-sm text-muted-foreground">Confira todas as informações antes de publicar</p>
              </div>
            </div>

            <div className="space-y-6">
              {/* Preview do Produto */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Pré-visualização</h3>
                <Card className="overflow-hidden">
                  {formData.images.length > 0 && (
                    <div className="relative h-64 bg-muted">
                      <Image
                        src={formData.images[0] || "/placeholder.svg"}
                        alt={formData.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="mb-2 text-lg font-semibold text-foreground">
                      {formData.title || "Título do Produto"}
                    </h4>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-3">
                      {formData.description || "Descrição do produto"}
                    </p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-primary">
                        R$ {Number.parseFloat(formData.price || "0").toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground">/ {formData.unit || "unidade"}</span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Informações Detalhadas */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-foreground">Detalhes</h3>
                <div className="grid gap-3">
                  <div className="flex justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-muted-foreground">Categoria</span>
                    <span className="text-sm font-medium text-foreground">
                      {selectedCategory?.name || "-"} / {formData.subcategory || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-muted-foreground">Localização</span>
                    <span className="text-sm font-medium text-foreground">{formData.location || "-"}</span>
                  </div>
                  <div className="flex justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-muted-foreground">Quantidade Disponível</span>
                    <span className="text-sm font-medium text-foreground">
                      {formData.quantity || "0"} {formData.unit}
                    </span>
                  </div>
                  <div className="flex justify-between rounded-lg border border-border p-3">
                    <span className="text-sm text-muted-foreground">Pedido Mínimo</span>
                    <span className="text-sm font-medium text-foreground">
                      {formData.minOrder || "0"} {formData.unit}
                    </span>
                  </div>
                  {formData.strategicPoint && (
                    <div className="flex justify-between rounded-lg border border-border bg-primary/5 p-3">
                      <span className="text-sm text-muted-foreground">Ponto Estratégico</span>
                      <Badge className="bg-primary">
                        <MapPin className="mr-1 h-3 w-3" />
                        Vinculado
                      </Badge>
                    </div>
                  )}
                  {formData.certifications.length > 0 && (
                    <div className="rounded-lg border border-border p-3">
                      <span className="mb-2 block text-sm text-muted-foreground">Certificações</span>
                      <div className="flex flex-wrap gap-2">
                        {formData.certifications.map((cert) => (
                          <Badge key={cert} variant="secondary">
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Termo de Aceite */}
              <div className="rounded-lg border border-border bg-muted/50 p-4">
                <div className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" id="terms" />
                  <label htmlFor="terms" className="text-sm text-muted-foreground">
                    Declaro que as informações fornecidas são verdadeiras e estou ciente de que produtos com informações
                    falsas ou enganosas serão removidos e estarei sujeito às penalidades previstas em lei.
                  </label>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <Button variant="outline" onClick={handlePrevious} disabled={step === 1}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Anterior
          </Button>

          {step < totalSteps ? (
            <Button onClick={handleNext}>
              Próximo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button className="bg-green-600 hover:bg-green-700">
              <CheckCircle className="mr-2 h-4 w-4" />
              Publicar Produto
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
