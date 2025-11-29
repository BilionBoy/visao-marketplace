"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories } from "@/lib/marketplaceData"
import { SlidersHorizontal, X } from "lucide-react"

interface FiltersProps {
  onApplyFilters: (filters: any) => void
}

export function MarketplaceFilters({ onApplyFilters }: FiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [withStrategicPoint, setWithStrategicPoint] = useState(false)
  const [location, setLocation] = useState("")

  const handleApply = () => {
    onApplyFilters({
      priceRange,
      categories: selectedCategories,
      verifiedOnly,
      withStrategicPoint,
      location,
    })
  }

  const handleReset = () => {
    setPriceRange([0, 1000000])
    setSelectedCategories([])
    setVerifiedOnly(false)
    setWithStrategicPoint(false)
    setLocation("")
    onApplyFilters({})
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="default">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filtros Avançados
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filtros Avançados</SheetTitle>
          <SheetDescription>Refine sua busca para encontrar produtos específicos</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Faixa de Preço */}
          <div>
            <Label className="mb-3 block text-sm font-semibold">Faixa de Preço</Label>
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">R$ {priceRange[0].toLocaleString()}</span>
              <span className="text-muted-foreground">R$ {priceRange[1].toLocaleString()}</span>
            </div>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              min={0}
              max={2000000}
              step={10000}
              className="mb-2"
            />
          </div>

          {/* Localização */}
          <div>
            <Label htmlFor="location" className="mb-2 block text-sm font-semibold">
              Localização
            </Label>
            <Input
              id="location"
              placeholder="Ex: Sorriso, MT"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          {/* Categorias */}
          <div>
            <Label className="mb-3 block text-sm font-semibold">Categorias</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge
                  key={cat.id}
                  variant={selectedCategories.includes(cat.id) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => {
                    if (selectedCategories.includes(cat.id)) {
                      setSelectedCategories(selectedCategories.filter((c) => c !== cat.id))
                    } else {
                      setSelectedCategories([...selectedCategories, cat.id])
                    }
                  }}
                >
                  {cat.icon} {cat.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Opções Especiais */}
          <div>
            <Label className="mb-3 block text-sm font-semibold">Opções Especiais</Label>
            <div className="space-y-2">
              <Card
                className={`cursor-pointer p-3 transition-all ${verifiedOnly ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setVerifiedOnly(!verifiedOnly)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Apenas Vendedores Verificados</span>
                  <input type="checkbox" checked={verifiedOnly} readOnly className="h-4 w-4" />
                </div>
              </Card>

              <Card
                className={`cursor-pointer p-3 transition-all ${withStrategicPoint ? "border-primary bg-primary/5" : ""}`}
                onClick={() => setWithStrategicPoint(!withStrategicPoint)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Com Ponto Estratégico Gov</span>
                  <input type="checkbox" checked={withStrategicPoint} readOnly className="h-4 w-4" />
                </div>
              </Card>
            </div>
          </div>

          {/* Botões */}
          <div className="flex gap-2 border-t border-border pt-4">
            <Button variant="outline" className="flex-1 bg-transparent" onClick={handleReset}>
              <X className="mr-2 h-4 w-4" />
              Limpar
            </Button>
            <Button className="flex-1" onClick={handleApply}>
              Aplicar Filtros
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
