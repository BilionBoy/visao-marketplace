"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { strategicPoints } from "@/lib/marketplaceData"
import { MapPin, Phone, ArrowLeft, Navigation, Clock, Package } from "lucide-react"
import Link from "next/link"

export default function StrategicPointsPage() {
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
          <h1 className="mb-2 text-2xl font-bold text-foreground">Pontos Estratégicos Governamentais</h1>
          <p className="text-sm text-muted-foreground">
            Centros de coleta, distribuição e inspeção oficiais para transações seguras
          </p>
        </div>

        {/* Estatísticas */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <Card className="border-l-4 border-l-chart-1 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Pontos</p>
                <p className="text-2xl font-bold text-foreground">{strategicPoints.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-1/10">
                <MapPin className="h-6 w-6 text-chart-1" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-chart-2 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pontos Ativos</p>
                <p className="text-2xl font-bold text-foreground">
                  {strategicPoints.filter((p) => p.status === "active").length}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-2/10">
                <Navigation className="h-6 w-6 text-chart-2" />
              </div>
            </div>
          </Card>

          <Card className="border-l-4 border-l-chart-3 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produtos Manipulados</p>
                <p className="text-2xl font-bold text-foreground">
                  {strategicPoints.reduce((sum, p) => sum + p.productsHandled, 0).toLocaleString()}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-chart-3/10">
                <Package className="h-6 w-6 text-chart-3" />
              </div>
            </div>
          </Card>
        </div>

        {/* Lista de Pontos */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {strategicPoints.map((point) => (
            <Card key={point.id} className="p-4">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-full ${
                      point.type === "distribution"
                        ? "bg-chart-1/10 text-chart-1"
                        : point.type === "collection"
                          ? "bg-chart-2/10 text-chart-2"
                          : "bg-chart-3/10 text-chart-3"
                    }`}
                  >
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-base font-semibold text-foreground">{point.name}</h3>
                    <Badge
                      variant="secondary"
                      className={
                        point.status === "active"
                          ? "bg-green-600 text-white"
                          : point.status === "maintenance"
                            ? "bg-yellow-600 text-white"
                            : "bg-red-600 text-white"
                      }
                    >
                      {point.status === "active"
                        ? "Operacional"
                        : point.status === "maintenance"
                          ? "Manutenção"
                          : "Inativo"}
                    </Badge>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {point.type === "distribution" ? "Distribuição" : point.type === "collection" ? "Coleta" : "Inspeção"}
                </Badge>
              </div>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">{point.location}</p>
                    <p className="text-muted-foreground">{point.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{point.contact}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{point.workingHours}</span>
                </div>
              </div>

              <div className="mb-4 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div className="rounded-lg bg-muted p-2">
                  <p className="text-xs text-muted-foreground">Responsável</p>
                  <p className="text-sm font-semibold text-foreground">{point.manager}</p>
                </div>
                <div className="rounded-lg bg-muted p-2">
                  <p className="text-xs text-muted-foreground">Última Inspeção</p>
                  <p className="text-sm font-semibold text-foreground">
                    {new Date(point.lastInspection).toLocaleDateString("pt-BR")}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">
                    {point.productsHandled.toLocaleString()} produtos manipulados
                  </span>
                </div>
                <Button variant="outline" size="sm">
                  <Navigation className="mr-2 h-4 w-4" />
                  Ver no Mapa
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
