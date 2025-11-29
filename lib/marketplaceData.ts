export interface MarketplaceProduct {
  id: string
  title: string
  description: string
  price: number
  unit: string
  category: string
  subcategory: string
  images: string[]
  seller: {
    id: string
    name: string
    type: "producer" | "supplier"
    location: string
    rating: number
    totalSales: number
    verified: boolean
    avatar?: string
  }
  quantity: number
  minOrder: number
  location: string
  certifications: string[]
  disponibility: "in-stock" | "pre-order" | "out-of-stock"
  createdAt: string
  views: number
  favorites: number
  strategicPoint?: string
}

export interface StrategicPoint {
  id: string
  name: string
  type: "collection" | "distribution" | "inspection"
  location: string
  address: string
  coordinates: { lat: number; lng: number }
  manager: string
  contact: string
  workingHours: string
  status: "active" | "inactive" | "maintenance"
  productsHandled: number
  lastInspection: string
}

export const categories = [
  {
    id: "graos",
    name: "Grãos e Cereais",
    icon: "🌾",
    subcategories: ["Soja", "Milho", "Trigo", "Arroz", "Feijão"],
  },
  {
    id: "frutas",
    name: "Frutas",
    icon: "🍊",
    subcategories: ["Cítricos", "Tropicais", "Berries", "Melões"],
  },
  {
    id: "vegetais",
    name: "Vegetais e Hortaliças",
    icon: "🥬",
    subcategories: ["Folhosos", "Raízes", "Legumes", "Tubérculos"],
  },
  {
    id: "pecuaria",
    name: "Pecuária",
    icon: "🐄",
    subcategories: ["Bovinos", "Suínos", "Aves", "Ovinos"],
  },
  {
    id: "insumos",
    name: "Insumos Agrícolas",
    icon: "🧪",
    subcategories: ["Fertilizantes", "Defensivos", "Sementes", "Rações"],
  },
  {
    id: "maquinario",
    name: "Maquinário",
    icon: "🚜",
    subcategories: ["Tratores", "Colheitadeiras", "Implementos", "Peças"],
  },
  {
    id: "organicos",
    name: "Orgânicos",
    icon: "🌱",
    subcategories: ["Certificados", "Em Transição", "Naturais"],
  },
  {
    id: "processados",
    name: "Produtos Processados",
    icon: "📦",
    subcategories: ["Óleos", "Farinhas", "Conservas", "Laticínios"],
  },
]

export const mockMarketplaceProducts: MarketplaceProduct[] = [
  {
    id: "MP001",
    title: "Soja Transgênica Premium - Safra 2024",
    description:
      "Soja transgênica de alta qualidade, safra 2024. Livre de impurezas, grãos uniformes, ideal para exportação. Certificação de qualidade emitida pelo MAPA.",
    price: 145.0,
    unit: "saca 60kg",
    category: "graos",
    subcategory: "Soja",
    images: ["/soja-graos-saco.jpg", "/plantacao-soja.jpg", "/colheita-soja.jpg"],
    seller: {
      id: "S001",
      name: "Fazenda Santa Maria",
      type: "producer",
      location: "Sorriso, MT",
      rating: 4.9,
      totalSales: 1250,
      verified: true,
    },
    quantity: 5000,
    minOrder: 100,
    location: "Sorriso, MT",
    certifications: ["MAPA", "Orgânico Brasil", "GlobalGAP"],
    disponibility: "in-stock",
    createdAt: "2024-01-15",
    views: 3420,
    favorites: 156,
    strategicPoint: "SP001",
  },
  {
    id: "MP002",
    title: "Milho Híbrido para Silagem",
    description:
      "Milho híbrido especialmente desenvolvido para silagem de alta qualidade. Excelente digestibilidade e valor nutricional para gado leiteiro.",
    price: 85.0,
    unit: "saca 60kg",
    category: "graos",
    subcategory: "Milho",
    images: ["/milho-graos.jpg", "/plantacao-milho.jpg"],
    seller: {
      id: "S002",
      name: "Agropecuária Boa Vista",
      type: "producer",
      location: "Rio Verde, GO",
      rating: 4.7,
      totalSales: 850,
      verified: true,
    },
    quantity: 3000,
    minOrder: 50,
    location: "Rio Verde, GO",
    certifications: ["MAPA", "ISO 9001"],
    disponibility: "in-stock",
    createdAt: "2024-01-18",
    views: 2100,
    favorites: 89,
    strategicPoint: "SP002",
  },
  {
    id: "MP003",
    title: "Trator John Deere 6155J - 2020",
    description:
      "Trator John Deere 6155J, ano 2020, apenas 800 horas de uso. Motor PowerTech de 155 cv, transmissão AutoQuad Plus, ar condicionado, GPS. Revisões em dia.",
    price: 385000.0,
    unit: "unidade",
    category: "maquinario",
    subcategory: "Tratores",
    images: ["/trator-john-deere-verde.jpg", "/trator-cabine.jpg", "/trator-campo.jpg"],
    seller: {
      id: "S003",
      name: "AgroMáquinas Centro-Oeste",
      type: "supplier",
      location: "Cuiabá, MT",
      rating: 4.8,
      totalSales: 156,
      verified: true,
    },
    quantity: 1,
    minOrder: 1,
    location: "Cuiabá, MT",
    certifications: ["Concessionária Autorizada", "Garantia de Fábrica"],
    disponibility: "in-stock",
    createdAt: "2024-01-10",
    views: 5600,
    favorites: 234,
  },
  {
    id: "MP004",
    title: "Fertilizante NPK 20-05-20 - Alta Eficiência",
    description:
      "Fertilizante mineral misto NPK formulação 20-05-20, ideal para soja e milho. Alta solubilidade, liberação controlada, aumenta produtividade em até 30%.",
    price: 2850.0,
    unit: "tonelada",
    category: "insumos",
    subcategory: "Fertilizantes",
    images: ["/fertilizante-sacaria.jpg", "/adubo-graos.jpg"],
    seller: {
      id: "S004",
      name: "FertilAgro Indústria",
      type: "supplier",
      location: "Catalão, GO",
      rating: 4.6,
      totalSales: 2340,
      verified: true,
    },
    quantity: 500,
    minOrder: 10,
    location: "Catalão, GO",
    certifications: ["MAPA", "ISO 9001", "ISO 14001"],
    disponibility: "in-stock",
    createdAt: "2024-01-20",
    views: 1890,
    favorites: 67,
    strategicPoint: "SP003",
  },
  {
    id: "MP005",
    title: "Laranja Pera Rio - Primeira Qualidade",
    description:
      "Laranja Pera Rio selecionada, calibre 40/50, colheita recente. Fruta doce, suculenta, perfeita para mesa e indústria. Entrega em caixas de 40,8 kg.",
    price: 95.0,
    unit: "cx 40,8kg",
    category: "frutas",
    subcategory: "Cítricos",
    images: ["/laranja-caixa.jpg", "/pomar-laranja.jpg", "/laranja-arvore.jpg"],
    seller: {
      id: "S005",
      name: "Citrus Paraíso",
      type: "producer",
      location: "Bebedouro, SP",
      rating: 4.9,
      totalSales: 3200,
      verified: true,
    },
    quantity: 8000,
    minOrder: 50,
    location: "Bebedouro, SP",
    certifications: ["PIF", "GlobalGAP", "Produção Integrada"],
    disponibility: "in-stock",
    createdAt: "2024-01-22",
    views: 4100,
    favorites: 178,
    strategicPoint: "SP004",
  },
  {
    id: "MP006",
    title: "Gado Nelore - Lote 50 Cabeças",
    description:
      "Lote de 50 cabeças de gado Nelore, machos castrados, idade 24-30 meses, peso médio 480kg. Vacinação completa, rastreabilidade individual (SISBOV).",
    price: 7500.0,
    unit: "cabeça",
    category: "pecuaria",
    subcategory: "Bovinos",
    images: ["/gado-nelore-pasto.jpg", "/boi-branco.jpg", "/placeholder.svg?height=400&width=600"],
    seller: {
      id: "S006",
      name: "Pecuária Três Irmãos",
      type: "producer",
      location: "Campo Grande, MS",
      rating: 4.8,
      totalSales: 420,
      verified: true,
    },
    quantity: 50,
    minOrder: 5,
    location: "Campo Grande, MS",
    certifications: ["SISBOV", "Carne Angus Certificada", "BPA"],
    disponibility: "in-stock",
    createdAt: "2024-01-12",
    views: 2800,
    favorites: 92,
  },
  {
    id: "MP007",
    title: "Alface Crespa Orgânica - Hidropônica",
    description:
      "Alface crespa orgânica cultivada em sistema hidropônico. Folhas tenras, crocantes, sem agrotóxicos. Colheita diária, entrega em até 24h após colheita.",
    price: 4.5,
    unit: "maço 250g",
    category: "vegetais",
    subcategory: "Folhosos",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    seller: {
      id: "S007",
      name: "Hidro Verde Orgânicos",
      type: "producer",
      location: "Holambra, SP",
      rating: 5.0,
      totalSales: 5600,
      verified: true,
    },
    quantity: 2000,
    minOrder: 50,
    location: "Holambra, SP",
    certifications: ["Orgânico Brasil", "IBD", "Ecocert"],
    disponibility: "in-stock",
    createdAt: "2024-01-25",
    views: 1560,
    favorites: 203,
  },
  {
    id: "MP008",
    title: "Colheitadeira Case IH Axial-Flow 8250",
    description:
      "Colheitadeira Case IH Axial-Flow 8250, 2019, 1200 horas. Plataforma draper de 45 pés, piloto automático, monitor de produtividade. Único dono.",
    price: 1850000.0,
    unit: "unidade",
    category: "maquinario",
    subcategory: "Colheitadeiras",
    images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
    seller: {
      id: "S008",
      name: "Máquinas Agrícolas Pioneira",
      type: "supplier",
      location: "Uberlândia, MG",
      rating: 4.7,
      totalSales: 89,
      verified: true,
    },
    quantity: 1,
    minOrder: 1,
    location: "Uberlândia, MG",
    certifications: ["Concessionária Autorizada", "Revisão Completa"],
    disponibility: "in-stock",
    createdAt: "2024-01-08",
    views: 8900,
    favorites: 412,
  },
]

export const strategicPoints: StrategicPoint[] = [
  {
    id: "SP001",
    name: "Centro de Distribuição Norte MT",
    type: "distribution",
    location: "Sorriso, MT",
    address: "Rod. MT-242, Km 15 - Distrito Industrial",
    coordinates: { lat: -12.5434, lng: -55.7147 },
    manager: "Carlos Alberto Santos",
    contact: "(66) 3545-2100",
    workingHours: "Segunda a Sexta: 7h às 18h | Sábado: 7h às 12h",
    status: "active",
    productsHandled: 12450,
    lastInspection: "2024-01-20",
  },
  {
    id: "SP002",
    name: "Posto de Coleta Rio Verde",
    type: "collection",
    location: "Rio Verde, GO",
    address: "Av. Presidente Vargas, 2850 - Setor Industrial",
    coordinates: { lat: -17.7939, lng: -50.9186 },
    manager: "Marina Oliveira Silva",
    contact: "(64) 3621-3400",
    workingHours: "Segunda a Sexta: 6h às 18h",
    status: "active",
    productsHandled: 8930,
    lastInspection: "2024-01-18",
  },
  {
    id: "SP003",
    name: "Centro de Inspeção Catalão",
    type: "inspection",
    location: "Catalão, GO",
    address: "Rua Industrial, 450 - Distrito Agroindustrial",
    coordinates: { lat: -18.1656, lng: -47.9479 },
    manager: "Dr. Roberto Farias",
    contact: "(64) 3441-5200",
    workingHours: "Segunda a Sexta: 8h às 17h",
    status: "active",
    productsHandled: 5620,
    lastInspection: "2024-01-22",
  },
  {
    id: "SP004",
    name: "Hub de Exportação Bebedouro",
    type: "distribution",
    location: "Bebedouro, SP",
    address: "Rod. Fábio Ferraz Sampaio, Km 8",
    coordinates: { lat: -20.9492, lng: -48.4783 },
    manager: "Luciana Costa",
    contact: "(17) 3342-8800",
    workingHours: "24 horas (operação contínua)",
    status: "active",
    productsHandled: 18750,
    lastInspection: "2024-01-19",
  },
  {
    id: "SP005",
    name: "Centro Logístico Campo Grande",
    type: "distribution",
    location: "Campo Grande, MS",
    address: "BR-163, Km 502 - Zona Rural",
    coordinates: { lat: -20.4486, lng: -54.6295 },
    manager: "José Henrique Almeida",
    contact: "(67) 3326-4500",
    workingHours: "Segunda a Sábado: 6h às 20h",
    status: "active",
    productsHandled: 9840,
    lastInspection: "2024-01-21",
  },
]
