// Mock data para o sistema Visão Agro

export type UserRole = "producer" | "supplier" | "admin"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  company?: string
  avatar?: string
}

export interface CostCenter {
  id: string
  producerId: string
  name: string
  code: string
  budget: number
  description: string
  createdAt: Date
}

export interface Solicitation {
  id: string
  producerId: string
  producerName: string
  costCenterId: string
  costCenterName: string
  type: "product" | "service"
  title: string
  description: string
  category: string
  budget: number
  deadline: Date
  images: string[]
  status: "open" | "in_review" | "closed" | "completed"
  proposalsCount: number
  createdAt: Date
}

export interface Proposal {
  id: string
  solicitationId: string
  supplierId: string
  supplierName: string
  supplierCompany: string
  price: number
  deliveryTime: string
  description: string
  technicalDetails: string
  paymentTerms: string
  warranty: string
  attachments: string[]
  status: "pending" | "accepted" | "rejected"
  createdAt: Date
}

export interface ServiceOrder {
  id: string
  solicitationId: string
  proposalId: string
  producerId: string
  supplierId: string
  title: string
  value: number
  status: "scheduled" | "in_progress" | "completed" | "cancelled"
  startDate: Date
  expectedEndDate: Date
  actualEndDate?: Date
  notes: string
  createdAt: Date
}

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao@fazendaboacolheita.com.br",
    role: "producer",
    company: "Fazenda Boa Colheita",
    avatar: "/diverse-farmers-harvest.png",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria@agroserviços.com.br",
    role: "supplier",
    company: "AgroServiços Ltda",
    avatar: "/confident-business-woman.png",
  },
  {
    id: "3",
    name: "Carlos Admin",
    email: "admin@visaoagro.com.br",
    role: "admin",
    company: "Visão Agro",
    avatar: "/admin-interface.png",
  },
]

// Mock Cost Centers
export const mockCostCenters: CostCenter[] = [
  {
    id: "cc1",
    producerId: "1",
    name: "Plantio de Soja 2025",
    code: "CC-2025-001",
    budget: 500000,
    description: "Centro de custo para plantio de soja safra 2025",
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "cc2",
    producerId: "1",
    name: "Manutenção de Máquinas",
    code: "CC-2025-002",
    budget: 150000,
    description: "Manutenção preventiva e corretiva de equipamentos",
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "cc3",
    producerId: "1",
    name: "Irrigação",
    code: "CC-2025-003",
    budget: 200000,
    description: "Sistema de irrigação e bombeamento",
    createdAt: new Date("2024-02-10"),
  },
]

// Mock Solicitations
export const mockSolicitations: Solicitation[] = [
  {
    id: "sol1",
    producerId: "1",
    producerName: "João Silva",
    costCenterId: "cc1",
    costCenterName: "Plantio de Soja 2025",
    type: "service",
    title: "Pulverização Aérea - 500 hectares",
    description:
      "Necessito de serviço de pulverização aérea para controle de pragas em 500 hectares de soja. Aplicação de defensivos fornecidos pela fazenda.",
    category: "Pulverização",
    budget: 35000,
    deadline: new Date("2025-01-15"),
    images: ["/soybean-field-aerial.png", "/crop-spraying-airplane.jpg", "/farm-field-landscape.jpg"],
    status: "open",
    proposalsCount: 3,
    createdAt: new Date("2024-11-20"),
  },
  {
    id: "sol2",
    producerId: "1",
    producerName: "João Silva",
    costCenterId: "cc2",
    costCenterName: "Manutenção de Máquinas",
    type: "service",
    title: "Revisão Completa de Colheitadeira John Deere",
    description:
      "Revisão completa de colheitadeira modelo S780, incluindo troca de filtros, óleo, correia e verificação geral do sistema hidráulico.",
    category: "Manutenção",
    budget: 45000,
    deadline: new Date("2024-12-31"),
    images: ["/john-deere-harvester.jpg", "/farm-machinery-maintenance.jpg"],
    status: "in_review",
    proposalsCount: 5,
    createdAt: new Date("2024-11-18"),
  },
  {
    id: "sol3",
    producerId: "1",
    producerName: "João Silva",
    costCenterId: "cc1",
    costCenterName: "Plantio de Soja 2025",
    type: "product",
    title: "Venda de 5000 sacas de Milho",
    description:
      "Disponível 5000 sacas de milho de primeira qualidade, safra 2024, armazenado em condições ideais. Pronto para entrega.",
    category: "Grãos",
    budget: 180000,
    deadline: new Date("2024-12-20"),
    images: ["/corn-harvest-grain.jpg", "/corn-silo-storage.jpg", "/quality-corn-grains.jpg"],
    status: "open",
    proposalsCount: 2,
    createdAt: new Date("2024-11-25"),
  },
  {
    id: "sol4",
    producerId: "1",
    producerName: "João Silva",
    costCenterId: "cc3",
    costCenterName: "Irrigação",
    type: "service",
    title: "Instalação de Sistema de Irrigação por Pivô Central",
    description:
      "Projeto completo de instalação de sistema de irrigação por pivô central para área de 120 hectares, incluindo fornecimento de equipamentos e instalação.",
    category: "Irrigação",
    budget: 280000,
    deadline: new Date("2025-02-01"),
    images: ["/center-pivot-irrigation.jpg", "/agricultural-field-irrigation.jpg"],
    status: "open",
    proposalsCount: 1,
    createdAt: new Date("2024-11-22"),
  },
]

// Mock Proposals
export const mockProposals: Proposal[] = [
  {
    id: "prop1",
    solicitationId: "sol1",
    supplierId: "2",
    supplierName: "Maria Santos",
    supplierCompany: "AgroServiços Ltda",
    price: 32000,
    deliveryTime: "5 dias úteis",
    description:
      "Proposta para pulverização aérea com aeronave Cessna AgTruck equipada com sistema de GPS e controle automático de aplicação.",
    technicalDetails:
      "Aeronave com capacidade de 1200 litros, vazão de 40L/ha, velocidade de 180km/h. Equipe técnica certificada pela ANAC.",
    paymentTerms: "50% antecipado e 50% após conclusão do serviço",
    warranty: "Garantia de qualidade na aplicação com relatório detalhado",
    attachments: [],
    status: "pending",
    createdAt: new Date("2024-11-21"),
  },
  {
    id: "prop2",
    solicitationId: "sol1",
    supplierId: "2",
    supplierName: "Pedro Costa",
    supplierCompany: "AeroAgro Pulverização",
    price: 30000,
    deliveryTime: "3 dias úteis",
    description: "Pulverização com drone de alta performance, tecnologia de ponta para aplicação precisa.",
    technicalDetails:
      "Frota de 5 drones DJI Agras T40, capacidade 40L cada, tecnologia RTK para precisão centimétrica.",
    paymentTerms: "30% antecipado, 70% após conclusão",
    warranty: "Garantia de uniformidade na aplicação",
    attachments: [],
    status: "pending",
    createdAt: new Date("2024-11-22"),
  },
  {
    id: "prop3",
    solicitationId: "sol2",
    supplierId: "2",
    supplierName: "Ricardo Mecânico",
    supplierCompany: "TecnoAgro Manutenção",
    price: 42000,
    deliveryTime: "7 dias úteis",
    description: "Revisão completa com peças originais John Deere e equipe técnica certificada.",
    technicalDetails:
      "Troca completa de filtros (ar, óleo, combustível), óleo hidráulico, correias, verificação de sistemas elétricos e eletrônicos.",
    paymentTerms: "40% antecipado, 60% na entrega",
    warranty: "Garantia de 6 meses para serviços e peças",
    attachments: [],
    status: "accepted",
    createdAt: new Date("2024-11-19"),
  },
]

// Mock Service Orders
export const mockServiceOrders: ServiceOrder[] = [
  {
    id: "so1",
    solicitationId: "sol2",
    proposalId: "prop3",
    producerId: "1",
    supplierId: "2",
    title: "Revisão Completa de Colheitadeira John Deere",
    value: 42000,
    status: "in_progress",
    startDate: new Date("2024-11-26"),
    expectedEndDate: new Date("2024-12-03"),
    notes: "Serviço iniciado conforme cronograma. Peças chegaram no prazo.",
    createdAt: new Date("2024-11-25"),
  },
]
