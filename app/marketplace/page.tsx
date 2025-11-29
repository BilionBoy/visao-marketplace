"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockMarketplaceProducts, categories } from "@/lib/marketplaceData";
import { MarketplaceFilters } from "@/components/marketplace-filters";
import {
  Search,
  MapPin,
  Star,
  Heart,
  Eye,
  ShieldCheck,
  TrendingUp,
  Package,
  Users,
  ArrowRight,
  Store,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [filters, setFilters] = useState<any>({});

  const filteredProducts = mockMarketplaceProducts.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    // Filtros avançados
    const matchesPrice =
      !filters.priceRange ||
      (product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]);
    const matchesCategories =
      !filters.categories ||
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);
    const matchesVerified = !filters.verifiedOnly || product.seller.verified;
    const matchesStrategicPoint =
      !filters.withStrategicPoint || product.strategicPoint;
    const matchesLocation =
      !filters.location ||
      product.location.toLowerCase().includes(filters.location.toLowerCase());

    return (
      matchesSearch &&
      matchesCategory &&
      matchesPrice &&
      matchesCategories &&
      matchesVerified &&
      matchesStrategicPoint &&
      matchesLocation
    );
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header Público */}
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Store className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">
                  Marketplace Agro
                </h1>
                <p className="text-xs text-muted-foreground">
                  Plataforma Oficial do Governo
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-6 md:flex">
              <Link
                href="/marketplace"
                className="text-sm font-medium text-foreground hover:text-primary"
              >
                Produtos
              </Link>
              <Link
                href="/marketplace/sellers"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Vendedores
              </Link>
              <Link
                href="/marketplace/points"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Pontos Estratégicos
              </Link>
              <Link
                href="/marketplace/publish"
                className="text-sm font-medium text-muted-foreground hover:text-primary"
              >
                Publicar Produto
              </Link>
            </nav>

            <div className="flex items-center gap-2">
              <Link href="/marketplace/gov">
                <Button
                  size="sm"
                  variant="outline"
                  className="hidden md:flex bg-transparent"
                >
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Painel Gov
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="flex flex-col gap-3 border-t border-border py-4 md:hidden">
              <Link
                href="/marketplace"
                className="text-sm font-medium text-foreground"
              >
                Produtos
              </Link>
              <Link
                href="/marketplace/sellers"
                className="text-sm font-medium text-muted-foreground"
              >
                Vendedores
              </Link>
              <Link
                href="/marketplace/points"
                className="text-sm font-medium text-muted-foreground"
              >
                Pontos Estratégicos
              </Link>
              <Link
                href="/marketplace/publish"
                className="text-sm font-medium text-muted-foreground"
              >
                Publicar Produto
              </Link>
              <Link
                href="/marketplace/gov"
                className="text-sm font-medium text-muted-foreground"
              >
                Painel Governamental
              </Link>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section com Estatísticas */}
      <section className="border-b border-border bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6 text-center">
            <h2 className="mb-2 text-3xl font-bold text-foreground">
              Marketplace do Agronegócio
            </h2>
            <p className="text-muted-foreground">
              Plataforma oficial com controle governamental para comercialização
              transparente
            </p>
          </div>

          {/* Estatísticas Rápidas */}
          <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            <Card className="border-l-4 border-l-chart-1 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Produtos Ativos
                  </p>
                  <p className="text-xl font-bold text-foreground">12.458</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-1/10">
                  <Package className="h-5 w-5 text-chart-1" />
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-l-chart-2 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">Vendedores</p>
                  <p className="text-xl font-bold text-foreground">3.247</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-2/10">
                  <Users className="h-5 w-5 text-chart-2" />
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-l-chart-3 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Transações Hoje
                  </p>
                  <p className="text-xl font-bold text-foreground">R$ 8.4M</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-3/10">
                  <TrendingUp className="h-5 w-5 text-chart-3" />
                </div>
              </div>
            </Card>

            <Card className="border-l-4 border-l-chart-4 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Pontos Estratégicos
                  </p>
                  <p className="text-xl font-bold text-foreground">127</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-chart-4/10">
                  <MapPin className="h-5 w-5 text-chart-4" />
                </div>
              </div>
            </Card>
          </div>

          {/* Busca e Filtros */}
          <div className="flex flex-col gap-3 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar produtos, categorias ou vendedores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas Categorias</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <MarketplaceFilters onApplyFilters={setFilters} />
          </div>
        </div>
      </section>

      {/* Categorias Destaque */}
      <section className="border-b border-border bg-card py-6">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              Categorias Principais
            </h3>
            <Button variant="ghost" size="sm">
              Ver Todas
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-8">
            {categories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer p-3 text-center transition-all hover:border-primary hover:shadow-md"
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="mb-2 text-3xl">{category.icon}</div>
                <p className="text-xs font-medium text-foreground">
                  {category.name}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Listagem de Produtos */}
      <section className="py-6">
        <div className="container mx-auto px-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">
              {filteredProducts.length} Produtos Disponíveis
            </h3>
            <Select defaultValue="recent">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Mais Recentes</SelectItem>
                <SelectItem value="price-low">Menor Preço</SelectItem>
                <SelectItem value="price-high">Maior Preço</SelectItem>
                <SelectItem value="popular">Mais Populares</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/marketplace/products/${product.id}`}
              >
                <Card className="group overflow-hidden transition-all hover:shadow-lg">
                  <div className="relative h-48 overflow-hidden bg-muted">
                    <Image
                      src={product.images[0] || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute right-2 top-2 flex gap-2">
                      {product.seller.verified && (
                        <Badge className="bg-primary/90 text-xs">
                          <ShieldCheck className="mr-1 h-3 w-3" />
                          Verificado
                        </Badge>
                      )}
                      {product.strategicPoint && (
                        <Badge
                          variant="secondary"
                          className="bg-chart-4/90 text-xs text-white"
                        >
                          Gov
                        </Badge>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="mb-2 line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
                      {product.title}
                    </h4>

                    <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Store className="h-3 w-3" />
                        <span className="line-clamp-1">
                          {product.seller.name}
                        </span>
                      </div>
                      {product.seller.verified && (
                        <div className="flex items-center gap-1 text-primary">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{product.seller.rating}</span>
                        </div>
                      )}
                    </div>

                    <div className="mb-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{product.location}</span>
                    </div>

                    <div className="mb-3 border-t border-border pt-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-primary">
                          R${" "}
                          {product.price.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                          })}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          / {product.unit}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Mín: {product.minOrder} {product.unit}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-border pt-3">
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{product.views}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{product.favorites}</span>
                        </div>
                      </div>
                      <Button size="sm" variant="ghost" className="h-7 text-xs">
                        Ver Detalhes
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Marketplace Agro
              </h4>
              <p className="text-xs text-muted-foreground">
                Plataforma oficial do governo para comercialização transparente
                e segura do agronegócio brasileiro.
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Links Rápidos
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>
                  <Link href="/marketplace/sellers">Vendedores</Link>
                </li>
                <li>
                  <Link href="/marketplace/points">Pontos Estratégicos</Link>
                </li>
                <li>
                  <Link href="/marketplace/publish">Publicar Produto</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Suporte
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>Central de Ajuda</li>
                <li>Fale Conosco</li>
                <li>Denúncias</li>
              </ul>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold text-foreground">
                Governo
              </h4>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li>Ministério da Agricultura</li>
                <li>Transparência</li>
                <li>Legislação</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            <p>
              © 2025 Governo Federal - Marketplace Agro. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
