// Sample properties data for Anderson Kunicki - Corretor Imobiliário
const INITIAL_PROPERTIES = [
  {
    id: "prop-101",
    title: "Excelente Casa Residencial no Centro",
    type: "casa",
    purpose: "venda",
    price: 480000,
    area: 180,
    bedrooms: 3,
    bathrooms: 2,
    garages: 2,
    address: "Rua Francisco Mielzkovski",
    neighborhood: "Centro",
    city: "Itaiópolis - SC",
    description: "Bela residência com ótimo acabamento, terreno amplo totalmente murado, portão eletrônico, área de festas com churrasqueira a carvão, suíte master e excelente iluminação natural. Localização privilegiada no centro de Itaiópolis.",
    features: ["Suíte", "Churrasqueira", "Portão Eletrônico", "Quintal Amplo", "Vaga Coberta", "Área de Festas"],
    imageUrl: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    status: "ativo",
    createdAt: "2026-07-15"
  },
  {
    id: "prop-102",
    title: "Terreno Urbano Pronto para Construir",
    type: "terreno",
    purpose: "venda",
    price: 195000,
    area: 450,
    bedrooms: 0,
    bathrooms: 0,
    garages: 0,
    address: "Rua Alois Muelbauer",
    neighborhood: "Lucena",
    city: "Itaiópolis - SC",
    description: "Ótimo terreno plano medindo 15x30 metros em rua asfaltada, com infraestrutura completa de água, energia elétrica e saneamento. Próximo a escolas, supermercados e comércio em geral.",
    features: ["Rua Asfaltada", "Plano", "Rede de Esgoto", "Documentação OK", "Escriturado"],
    imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    status: "ativo",
    createdAt: "2026-07-20"
  },
  {
    id: "prop-103",
    title: "Chácara / Sítio com Nascente e Mata Nativa",
    type: "sitio",
    purpose: "venda",
    price: 650000,
    area: 25000,
    bedrooms: 2,
    bathrooms: 1,
    garages: 2,
    address: "Localidade de Moema",
    neighborhood: "Zona Rural",
    city: "Itaiópolis - SC",
    description: "Incrível propriedade rural de 2.5 hectares com casa aconchegante em madeira nobre, tanque de peixes, lago com nascente própria, pomar produtivo e energia trifásica. Ideal para lazer ou turismo rural.",
    features: ["Nascente Própria", "Tanque de Peixes", "Casa de Campo", "Pomar", "Energia Elétrica", "Área Verde"],
    imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: true,
    status: "ativo",
    createdAt: "2026-07-25"
  },
  {
    id: "prop-104",
    title: "Apartamento Moderno 2 Dormitórios",
    type: "apartamento",
    purpose: "aluguel",
    price: 1600,
    area: 75,
    bedrooms: 2,
    bathrooms: 1,
    garages: 1,
    address: "Av. Getúlio Vargas",
    neighborhood: "Centro",
    city: "Itaiópolis - SC",
    description: "Apartamento seminovo para locação com sacada e churrasqueira, cozinha sob medida, excelente ventilação e 1 vaga de garagem coberta. Condomínio tranquilo e seguro.",
    features: ["Sacada com Churrasqueira", "Cozinha Planejada", "Vaga Coberta", "Interfone"],
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    status: "ativo",
    createdAt: "2026-07-28"
  },
  {
    id: "prop-105",
    title: "Sala Comercial Próxima ao Comércio Central",
    type: "comercial",
    purpose: "aluguel",
    price: 2200,
    area: 90,
    bedrooms: 0,
    bathrooms: 2,
    garages: 1,
    address: "Rua Francisco Mielzkovski",
    neighborhood: "Centro",
    city: "Itaiópolis - SC",
    description: "Excelente ponto comercial com vitrine ampla para a rua, 2 lavabos, espaço para copa e fácil estacionamento para clientes. Perfeito para escritórios, clínicas ou lojas.",
    features: ["Vitrine de Vidro", "Acessibilidade", "2 Lavabos", "Centro Comercial"],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    featured: false,
    status: "ativo",
    createdAt: "2026-07-29"
  }
];
