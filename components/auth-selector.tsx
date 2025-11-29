"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Warehouse, ShieldCheck } from "lucide-react"
import type { UserRole } from "@/lib/mockData"

interface AuthSelectorProps {
  onSelectRole: (role: UserRole) => void
}

export function AuthSelector({ onSelectRole }: AuthSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)

  const roles = [
    {
      role: "producer" as UserRole,
      title: "Produtor Rural",
      description: "Acesse o portal de solicitações e gerencie suas demandas do campo",
      icon: Leaf,
      badge: "PRODUTOR",
    },
    {
      role: "supplier" as UserRole,
      title: "Fornecedor",
      description: "Portal de oportunidades e envio de propostas comerciais",
      icon: Warehouse,
      badge: "FORNECEDOR",
    },
    {
      role: "admin" as UserRole,
      title: "Administrador",
      description: "Painel administrativo e controle operacional da plataforma",
      icon: ShieldCheck,
      badge: "ADMIN",
    },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center gap-3 mb-6">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-10 h-10 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-bold text-foreground tracking-tight">Visão Agro</h1>
              <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                Plataforma de Pregão Digital
              </p>
            </div>
          </div>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed">
            Sistema de licitações e orçamentações para o agronegócio brasileiro
          </p>
          <div className="mt-4 flex items-center justify-center gap-2">
            <Badge variant="outline" className="text-xs uppercase">
              Governo Digital
            </Badge>
            <Badge variant="outline" className="text-xs uppercase">
              Transparência
            </Badge>
            <Badge variant="outline" className="text-xs uppercase">
              Eficiência
            </Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map(({ role, title, description, icon: Icon, badge }) => (
            <Card
              key={role}
              className={`cursor-pointer transition-all hover:shadow-xl border-2 ${
                selectedRole === role
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setSelectedRole(role)}
            >
              <CardHeader className="space-y-4 pb-4">
                <div className="flex items-start justify-between">
                  <div
                    className={`w-14 h-14 rounded-lg flex items-center justify-center ${
                      selectedRole === role ? "bg-primary" : "bg-muted"
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${selectedRole === role ? "text-primary-foreground" : "text-foreground/70"}`}
                      strokeWidth={2.5}
                    />
                  </div>
                  <Badge variant="secondary" className="text-xs font-semibold uppercase tracking-wide">
                    {badge}
                  </Badge>
                </div>
                <div>
                  <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button
                  className="w-full font-semibold"
                  size="lg"
                  variant={selectedRole === role ? "default" : "outline"}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectRole(role)
                  }}
                >
                  Acessar Portal
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center space-y-2">
          <p className="text-sm text-muted-foreground">Sistema MVP em ambiente de demonstração</p>
          <p className="text-xs text-muted-foreground/70">
            Versão 1.0.0 | © 2025 Visão Agro - Todos os direitos reservados
          </p>
        </div>
      </div>
    </div>
  )
}
