"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockMarketplaceProducts, strategicPoints } from "@/lib/marketplaceData"
import {
  ShieldCheck,
  Star,
  MapPin,
  Package,
  Truck,
  Phone,
  Calendar,
  Eye,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  Store,
  ArrowLeft,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockMarketplaceProducts.find((p) => p.id === params.id)
  const [selectedImage, setSelectedImage] = useState(0)

  if (!product) {
    notFound()
  }

  const strategicPoint = strategicPoints.find((sp) => sp.id === product.strategicPoint)

  return (
    <div className="min-h-screen bg-background">
      {/* Header Simplificado */}
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
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Coluna Principal - Imagens e Detalhes */}
          <div className="lg:col-span-2">
            {/* Galeria de Imagens */}
            <Card className="mb-6 overflow-hidden">
              <div className="relative aspect-video bg-muted">
                <Image
                  src={product.images[selectedImage] || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute left-4 top-4 flex gap-2">
                  {product.seller.verified && (
                    <Badge className="bg-primary">
                      <ShieldCheck className="mr-1 h-3 w-3" />
                      Vendedor Verificado
                    </Badge>
                  )}
                  {product.strategicPoint && (
                    <Badge className="bg-chart-4 text-white">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Ponto Estratégico Gov
                    </Badge>
                  )}
                </div>
                <Badge
                  className={`absolute right-4 top-4 ${
                    product.disponibility === "in-stock"
                      ? "bg-green-600"
                      : product.disponibility === "pre-order"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                  }`}
                >
                  {product.disponibility === "in-stock"
                    ? "Em Estoque"
                    : product.disponibility === "pre-order"
                      ? "Pré-Venda"
                      : "Esgotado"}
                </Badge>
              </div>

              {/* Miniaturas */}
              <div className="flex gap-2 border-t border-border p-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 overflow-hidden rounded border-2 ${
                      selectedImage === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.title} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </Card>

            {/* Tabs de Informações */}
            <Card>
              <Tabs defaultValue="description" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b">
                  <TabsTrigger value="description">Descrição</TabsTrigger>
                  <TabsTrigger value="specs">Especificações</TabsTrigger>
                  <TabsTrigger value="certifications">Certificações</TabsTrigger>
                  <TabsTrigger value="logistics">Logística</TabsTrigger>
                </TabsList>

                <TabsContent value="description" className="p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Sobre o Produto</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{product.description}</p>

                  <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Categoria</p>
                      <p className="text-sm font-semibold text-foreground">{product.subcategory}</p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Disponível</p>
                      <p className="text-sm font-semibold text-foreground">
                        {product.quantity} {product.unit}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Pedido Mínimo</p>
                      <p className="text-sm font-semibold text-foreground">
                        {product.minOrder} {product.unit}
                      </p>
                    </div>
                    <div className="rounded-lg bg-muted p-3">
                      <p className="text-xs text-muted-foreground">Localização</p>
                      <p className="text-sm font-semibold text-foreground">{product.location}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="specs" className="p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Especificações Técnicas</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b border-border py-2">
                      <span className="text-sm text-muted-foreground">Tipo</span>
                      <span className="text-sm font-medium text-foreground">{product.subcategory}</span>
                    </div>
                    <div className="flex justify-between border-b border-border py-2">
                      <span className="text-sm text-muted-foreground">Unidade de Venda</span>
                      <span className="text-sm font-medium text-foreground">{product.unit}</span>
                    </div>
                    <div className="flex justify-between border-b border-border py-2">
                      <span className="text-sm text-muted-foreground">Quantidade Total</span>
                      <span className="text-sm font-medium text-foreground">{product.quantity}</span>
                    </div>
                    <div className="flex justify-between border-b border-border py-2">
                      <span className="text-sm text-muted-foreground">Origem</span>
                      <span className="text-sm font-medium text-foreground">{product.location}</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="certifications" className="p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Certificações e Garantias</h3>
                  <div className="grid gap-3">
                    {product.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center gap-3 rounded-lg border border-border p-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <ShieldCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{cert}</p>
                          <p className="text-xs text-muted-foreground">Certificação válida e ativa</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="logistics" className="p-4">
                  <h3 className="mb-3 text-lg font-semibold text-foreground">Informações de Logística</h3>
                  {strategicPoint ? (
                    <div className="rounded-lg border border-border bg-primary/5 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h4 className="font-semibold text-foreground">{strategicPoint.name}</h4>
                      </div>
                      <p className="mb-2 text-sm text-muted-foreground">{strategicPoint.address}</p>
                      <div className="grid gap-2 text-sm">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{strategicPoint.contact}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">{strategicPoint.workingHours}</span>
                        </div>
                      </div>
                      <Badge className="mt-3 bg-green-600">Ponto Estratégico Ativo</Badge>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3 rounded-lg border border-border p-4">
                      <Truck className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground">Entrega Direta</p>
                        <p className="text-sm text-muted-foreground">
                          Produto entregue diretamente pelo vendedor. Frete e condições a combinar.
                        </p>
                      </div>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </Card>
          </div>

          {/* Sidebar - Preço e Vendedor */}
          <div className="lg:col-span-1">
            {/* Card de Preço */}
            <Card className="sticky top-20 mb-4 p-4">
              <div className="mb-4 border-b border-border pb-4">
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary">
                    R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {product.unit}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Pedido mínimo: {product.minOrder} {product.unit}
                </p>
              </div>

              <div className="mb-4 space-y-2">
                <Button className="w-full" size="lg">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Solicitar Orçamento
                </Button>
                <Button variant="outline" className="w-full bg-transparent" size="lg">
                  <Phone className="mr-2 h-4 w-4" />
                  Contatar Vendedor
                </Button>
              </div>

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  <span>
                    Disponível: {product.quantity} {product.unit}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Frete calculado no orçamento</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Transação protegida pelo governo</span>
                </div>
              </div>
            </Card>

            {/* Card do Vendedor */}
            <Card className="p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Informações do Vendedor</h3>

              <Link href={`/marketplace/sellers/${product.seller.id}`}>
                <div className="mb-4 flex items-center gap-3 rounded-lg border border-border p-3 transition-colors hover:border-primary hover:bg-primary/5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Store className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">{product.seller.name}</p>
                      {product.seller.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground capitalize">{product.seller.type}</p>
                  </div>
                </div>
              </Link>

              <div className="mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avaliação</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{product.seller.rating}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Vendas Realizadas</span>
                  <span className="font-semibold text-foreground">{product.seller.totalSales}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Localização</span>
                  <span className="font-semibold text-foreground">{product.seller.location}</span>
                </div>
              </div>

              <Button variant="outline" className="w-full bg-transparent" size="sm">
                Ver Perfil Completo
              </Button>
            </Card>

            {/* Estatísticas */}
            <Card className="mt-4 p-4">
              <h3 className="mb-3 text-sm font-semibold text-foreground">Estatísticas</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>Visualizações</span>
                  </div>
                  <span className="font-semibold text-foreground">{product.views}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    <span>Favoritos</span>
                  </div>
                  <span className="font-semibold text-foreground">{product.favorites}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Publicado em</span>
                  </div>
                  <span className="font-semibold text-foreground">
                    {new Date(product.createdAt).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </div>
            </Card>

            {/* Denúncia */}
            <Card className="mt-4 bg-destructive/5 p-4">
              <Button
                variant="ghost"
                size="sm"
                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <AlertCircle className="mr-2 h-4 w-4" />
                Denunciar Irregularidade
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
