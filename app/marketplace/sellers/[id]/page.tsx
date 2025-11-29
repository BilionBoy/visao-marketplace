"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockMarketplaceProducts } from "@/lib/marketplaceData"
import {
  ShieldCheck,
  Star,
  MapPin,
  Phone,
  Store,
  Package,
  TrendingUp,
  Calendar,
  ArrowLeft,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

export default function SellerProfilePage({ params }: { params: { id: string } }) {
  const sellerProducts = mockMarketplaceProducts.filter((p) => p.seller.id === params.id)

  if (sellerProducts.length === 0) {
    notFound()
  }

  const seller = sellerProducts[0].seller
  const stats = {
    totalProducts: sellerProducts.length,
    totalViews: sellerProducts.reduce((sum, p) => sum + p.views, 0),
    totalFavorites: sellerProducts.reduce((sum, p) => sum + p.favorites, 0),
    categories: [...new Set(sellerProducts.map((p) => p.category))],
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-14 items-center justify-between">
            <Link
              href="/marketplace/sellers"
              className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar aos Vendedores
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Header do Perfil */}
        <Card className="mb-6 p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Store className="h-12 w-12" />
            </div>

            <div className="flex-1">
              <div className="mb-2 flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">{seller.name}</h1>
                {seller.verified && (
                  <Badge className="bg-primary">
                    <ShieldCheck className="mr-1 h-3 w-3" />
                    Verificado
                  </Badge>
                )}
              </div>

              <div className="mb-4 flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{seller.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-foreground">{seller.rating}</span>
                  <span className="text-muted-foreground">({seller.totalSales} vendas)</span>
                </div>
                <Badge variant="secondary" className="capitalize">
                  {seller.type === "producer" ? "Produtor Rural" : "Fornecedor"}
                </Badge>
              </div>

              <div className="flex gap-3">
                <Button>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Enviar Mensagem
                </Button>
                <Button variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Contatar
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Estatísticas */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Card className="border-l-4 border-l-chart-1 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produtos</p>
                <p className="text-2xl font-bold text-foreground">{stats.totalProducts}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-1/10">
                <Package className="h-6 w-6 text-chart-1" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-chart-2 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Visualizações</p>
                <p className="text-2xl font-bold text-foreground">{(stats.totalViews / 1000).toFixed(1)}k</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/10">
                <TrendingUp className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-chart-3 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vendas</p>
                <p className="text-2xl font-bold text-foreground">{seller.totalSales}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
                <Star className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-chart-4 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Categorias</p>
                <p className="text-2xl font-bold text-foreground">{stats.categories.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-4/10">
                <Store className="h-6 w-6 text-chart-4" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" className="w-full">
          <TabsList>
            <TabsTrigger value="products">Produtos ({stats.totalProducts})</TabsTrigger>
            <TabsTrigger value="about">Sobre</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="mt-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {sellerProducts.map((product) => (
                <Link key={product.id} href={`/marketplace/products/${product.id}`}>
                  <Card className="group overflow-hidden transition-all hover:shadow-lg">
                    <div className="relative h-48 overflow-hidden bg-muted">
                      <Image
                        src={product.images[0] || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
                        {product.title}
                      </h4>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">
                          R$ {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                        <span className="text-xs text-muted-foreground">/ {product.unit}</span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="about" className="mt-4">
            <Card className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Sobre {seller.name}</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  {seller.type === "producer"
                    ? "Produtor rural certificado, dedicado à produção de alta qualidade seguindo as melhores práticas agrícolas e normas governamentais."
                    : "Fornecedor especializado em insumos e equipamentos para o agronegócio, com certificações e garantias oficiais."}
                </p>
                <div className="grid gap-3 border-t border-border pt-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Localização</p>
                      <p className="text-muted-foreground">{seller.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">Membro desde</p>
                      <p className="text-muted-foreground">Janeiro 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-4">
            <Card className="p-6">
              <div className="mb-6 text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <Star className="h-8 w-8 fill-yellow-400 text-yellow-400" />
                  <span className="text-4xl font-bold text-foreground">{seller.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">Baseado em {seller.totalSales} avaliações</p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">Excelente vendedor!</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Produtos de qualidade excepcional e entrega rápida. Recomendo!
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">João Silva - há 2 dias</p>
                </div>

                <div className="rounded-lg border border-border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-foreground">Muito bom</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Ótimo atendimento e produtos conforme anunciado.</p>
                  <p className="mt-2 text-xs text-muted-foreground">Maria Santos - há 1 semana</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
