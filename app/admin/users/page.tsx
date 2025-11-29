"use client"

import { AdminLayout } from "@/components/admin/admin-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail, Building } from "lucide-react"
import { useRouter } from "next/navigation"
import { mockUsers } from "@/lib/mockData"
import { useState } from "react"

export default function AdminUsersPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.company?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadge = (role: string) => {
    const badges = {
      producer: { label: "Produtor", class: "bg-primary/10 text-primary" },
      supplier: { label: "Fornecedor", class: "bg-secondary/10 text-secondary" },
      admin: { label: "Admin", class: "bg-accent/10 text-accent" },
    }
    return badges[role as keyof typeof badges] || badges.producer
  }

  return (
    <AdminLayout onLogout={() => router.push("/")}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">Gerenciar Usuários</h2>
            <p className="text-muted-foreground">Gerencie produtores, fornecedores e administradores</p>
          </div>
          <Button>
            <UserPlus className="w-4 h-4 mr-2" />
            Adicionar Usuário
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Produtores</p>
              <p className="text-3xl font-bold text-primary">{mockUsers.filter((u) => u.role === "producer").length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Fornecedores</p>
              <p className="text-3xl font-bold text-secondary">
                {mockUsers.filter((u) => u.role === "supplier").length}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-1">Total</p>
              <p className="text-3xl font-bold text-accent">{mockUsers.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, email ou empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <div className="grid gap-4">
          {filteredUsers.map((user) => {
            const roleBadge = getRoleBadge(user.role)
            return (
              <Card key={user.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{user.name}</h3>
                        <Badge className={roleBadge.class}>{roleBadge.label}</Badge>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        {user.company && (
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {user.company}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        Ver Perfil
                      </Button>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </AdminLayout>
  )
}
