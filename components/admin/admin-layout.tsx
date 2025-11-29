"use client"

import type { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Users,
  FileText,
  BarChart3,
  LogOut,
  Settings,
  ShieldCheck,
  TrendingUp,
  Home,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface AdminLayoutProps {
  children: ReactNode
  onLogout: () => void
}

export function AdminLayout({ children, onLogout }: AdminLayoutProps) {
  const pathname = usePathname()

  const navigation = [
    {
      group: "Principal",
      items: [{ name: "Dashboard Executivo", href: "/admin", icon: LayoutDashboard }],
    },
    {
      group: "Gestão",
      items: [
        { name: "Gestão de Usuários", href: "/admin/users", icon: Users },
        { name: "Todas Solicitações", href: "/admin/solicitations", icon: FileText },
        { name: "Todas Propostas", href: "/admin/proposals", icon: TrendingUp },
      ],
    },
    {
      group: "Análise",
      items: [
        { name: "Relatórios Gerenciais", href: "/admin/reports", icon: BarChart3 },
        { name: "Configurações", href: "/admin/settings", icon: Settings },
      ],
    },
  ]

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      {/* Sidebar fixo na lateral esquerda */}
      <aside className="w-64 bg-card border-r border-border flex flex-col overflow-hidden">
        {/* Logo no sidebar */}
        <div className="h-16 border-b border-border flex items-center gap-3 px-4 shrink-0">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground leading-tight">Visão Agro</h1>
            <Badge className="text-[10px] uppercase font-semibold h-4 px-1.5">Admin</Badge>
          </div>
        </div>

        {/* Navegação */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-3">
          {navigation.map((section) => (
            <div key={section.group} className="space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide px-2 py-1">
                {section.group}
              </p>
              {section.items.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link key={item.name} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className={cn("w-full justify-start font-medium text-xs h-9", isActive && "shadow-sm")}
                    >
                      <item.icon className="w-4 h-4 mr-2" strokeWidth={2.5} />
                      <span className="truncate">{item.name}</span>
                    </Button>
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Botão de voltar no rodapé do sidebar */}
        <div className="p-3 border-t border-border shrink-0">
          <Link href="/">
            <Button variant="outline" size="sm" className="w-full justify-start font-medium text-xs h-9 bg-transparent">
              <Home className="w-4 h-4 mr-2" />
              Voltar ao Início
            </Button>
          </Link>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-end px-6 shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">Carlos Admin</p>
              <p className="text-xs text-muted-foreground">Administrador</p>
            </div>
            <Button variant="outline" size="sm" onClick={onLogout} className="font-semibold bg-transparent">
              <LogOut className="w-4 h-4 mr-1.5" />
              Sair
            </Button>
          </div>
        </header>

        {/* Conteúdo com scroll */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
