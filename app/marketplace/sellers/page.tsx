"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { mockMarketplaceProducts } from "@/lib/marketplaceData"
import { Search, Star, ShieldCheck, Store, MapPin, Package, TrendingUp, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Extrair vendedores únicos
  const uniqueSellers = Array.from(new Map(mockMarketplaceProducts.map((p) => [p.seller.id, p.seller])).values())

  // Calcular estatísticas por vendedor
  const sellersWithStats = uniqueSellers.map((seller) => {
    const sellerProducts = mockMarketplaceProducts.filter((p) => p.seller.id === seller.id)
    return {
      ...seller,
      productCount: sellerProducts.length,
      totalViews: sellerProducts.reduce((sum, p) => sum + p.views, 0),
      categories: [...new Set(sellerProducts.map((p) => p.category))],
    }
  })

  const filteredSellers = sellersWithStats.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || seller.type === filterType
    return matchesSearch && matchesType
  })

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="mb-2 text-2xl font-bold text-foreground">Vendedores Verificados</h1>
          <p className="text-sm text-muted-foreground">
            Produtores e fornecedores certificados pela plataforma governamental
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-6 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar vendedores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Tipos</SelectItem>
              <SelectItem value="producer">Produtores</SelectItem>
              <SelectItem value="supplier">Fornecedores</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Grid de Vendedores */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSellers.map((seller) => (
            <Link key={seller.id} href={`/marketplace/sellers/${seller.id}`}>
              <Card className="group h-full p-4 transition-all hover:shadow-lg">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      <Store className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary">
                          {seller.name}
                        </h3>
                        {seller.verified && <ShieldCheck className="h-4 w-4 text-primary" />}
                      </div>
                      <Badge variant="secondary" className="text-xs capitalize">
                        {seller.type === "producer" ? "Produtor" : "Fornecedor"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="mb-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{seller.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-foreground">{seller.rating}</span>
                    <span className="text-muted-foreground">({seller.totalSales} vendas)</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-border pt-4">
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <p className="mt-1 text-center text-lg font-bold text-foreground">{seller.productCount}</p>
                    <p className="text-center text-xs text-muted-foreground">Produtos</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <TrendingUp className="h-4 w-4 text-chart-3" />
                    </div>
                    <p className="mt-1 text-center text-lg font-bold text-foreground">
                      {(seller.totalViews / 1000).toFixed(1)}k
                    </p>
                    <p className="text-center text-xs text-muted-foreground">Views</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Store className="h-4 w-4 text-chart-2" />
                    </div>
                    <p className="mt-1 text-center text-lg font-bold text-foreground">{seller.categories.length}</p>
                    <p className="text-center text-xs text-muted-foreground">Categorias</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
