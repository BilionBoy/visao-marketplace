"use client"

import { ProducerLayout } from "@/components/producer/producer-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, DollarSign, Calendar, FileText, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockCostCenters } from "@/lib/mockData"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function CostCentersPage() {
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <ProducerLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Centros de Custo</h2>
            <p className="text-muted-foreground">Gerencie os centros de custo da sua fazenda</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Novo Centro de Custo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Criar Centro de Custo</DialogTitle>
                <DialogDescription>Adicione um novo centro de custo para organizar suas despesas</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Centro de Custo</Label>
                  <Input id="name" placeholder="Ex: Plantio de Soja 2025" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ex: CC-2025-004" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget">Orçamento (R$)</Label>
                  <Input id="budget" type="number" placeholder="0,00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Descrição</Label>
                  <Textarea id="description" placeholder="Descreva o propósito deste centro de custo..." rows={4} />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={() => setIsDialogOpen(false)}>Criar Centro de Custo</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total de Centros</p>
                  <p className="text-2xl font-bold">{mockCostCenters.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orçamento Total</p>
                  <p className="text-2xl font-bold">
                    R$ {mockCostCenters.reduce((acc, cc) => acc + cc.budget, 0).toLocaleString("pt-BR")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Média por Centro</p>
                  <p className="text-2xl font-bold">
                    R${" "}
                    {(mockCostCenters.reduce((acc, cc) => acc + cc.budget, 0) / mockCostCenters.length).toLocaleString(
                      "pt-BR",
                      { maximumFractionDigits: 0 },
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Centers List */}
        <div className="grid gap-4">
          {mockCostCenters.map((cc) => (
            <Card key={cc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl">{cc.name}</CardTitle>
                      <span className="px-3 py-1 text-xs font-medium bg-muted rounded-full">{cc.code}</span>
                    </div>
                    <CardDescription>{cc.description}</CardDescription>
                  </div>
                  <Button variant="outline" size="icon">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Orçamento</p>
                      <p className="font-semibold">R$ {cc.budget.toLocaleString("pt-BR")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Criado em</p>
                      <p className="font-semibold">{new Date(cc.createdAt).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Solicitações</p>
                      <p className="font-semibold">{mockCostCenters.filter((c) => c.id === cc.id).length}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProducerLayout>
  )
}
