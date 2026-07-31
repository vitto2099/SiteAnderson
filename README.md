# 🏢 Website Imobiliário - Anderson Kunicki Corretor Imobiliário

Aplicação web moderna, responsiva e de alto padrão desenvolvida em **React 18** com **Vite**, projetada sob medida para a imobiliária **Anderson Kunicki - Corretor Imobiliário** (CRECI-SC 60173 F) em Itaiópolis - SC.

![Visual Identity](510202027_30090792963900878_3408129173499351369_n.jpg)

---

## 🎨 Identidade Visual & Design

O design system do projeto foi construído respeitando as cores e a marca oficial do corretor:
- **Azul Marinho Imperial** (`#07172C` / `#0B2545`): Transmite solidez, segurança e credibilidade imobiliária.
- **Vermelho Imobiliário** (`#C81D25`): Destaca botões de ação (CTA), badges de venda e marcações importantes.
- **Dourado Champagne** (`#D4AF37`): Identifica imóveis marcados em destaque.
- **Tipografia**: Google Fonts (*Outfit* para títulos nobres e *Inter* para textos técnicos).

---

## ✨ Funcionalidades Principais

1. **🏠 Catálogo de Imóveis Reativo**:
   - Busca em tempo real por palavras-chave (bairro, rua, características).
   - Filtros por finalidade (*Venda* ou *Aluguel*), tipo de imóvel (*Casa, Terreno, Sítio, Apartamento, Comercial*), quantidade mínima de dormitórios e preço máximo.
   - Cards com visualização de m², banheiros, vagas de garagem e preço formatado em Reais (R$).

2. **🔍 Modal de Detalhes Completo**:
   - Galeria de imagens com seletores miniatura.
   - Lista completa de diferenciais e comodidades (Suíte, Churrasqueira, Portão Eletrônico, etc.).
   - Botão direto para o WhatsApp preenchendo o imóvel e referência exata de interesse.

3. **🧮 Simulador de Financiamento Imobiliário**:
   - Cálculo automático da estimativa da parcela mensal (Sistema PRICE).
   - Ajuste dinâmico do valor do imóvel, porcentagem de entrada, taxa de juros anual e prazo em anos.
   - Envio da simulação realizada direto para o WhatsApp do corretor.

4. **🛡️ Painel de Gestão de Anúncios (Admin)**:
   - Dashboard com contadores em tempo real (Total de Imóveis, Em Destaque, À Venda, Para Alugar).
   - **Criar Novo Anúncio**: Formulário modal com campos completos e preview.
   - **Editar & Excluir**: Atualização imediata dos dados com persistência em `LocalStorage`.
   - **Alternar Destaque**: Marcar imóveis especiais para a vitrine principal.
   - **Restaurar Padrões**: Botão de restauração rápida para dados de exemplo da região de Itaiópolis.

5. **💬 Widget Flutuante do WhatsApp**:
   - Popover interativo no canto inferior direito para contato direto e captação de leads em qualquer página.

6. **📍 Localização & Seção Institucional**:
   - Informações completas sobre o corretor Anderson Kunicki (CRECI-SC 60173 F).
   - Integração com Google Maps interativo da sede na **Rua Francisco Mielzkovski, 173 - Itaiópolis - SC**.
   - Links diretos para E-mail e Facebook oficial.

---

## 🛠️ Tecnologias Utilizadas

- **React 18** (Componentização reativa e estado local)
- **Vite 5** (Bundler ultrarrápido para desenvolvimento e build)
- **Lucide React** (Ícones vetoriais modernos)
- **Vanilla CSS3** (Design system customizado sem dependência de UI kit genérico)
- **LocalStorage API** (Persistência dos anúncios cadastrados)

---

## 📁 Estrutura de Arquivos

```text
SiteAnderson/
├── 510202027_30090792963900878_3408129173499351369_n.jpg  # Logo Oficial
├── index.html                                             # Entry HTML
├── package.json                                           # Dependências React & Scripts
├── vite.config.js                                         # Configuração do Vite
├── README.md                                              # Documentação
└── src/
    ├── main.jsx                                           # Ponto de entrada React
    ├── App.jsx                                            # Componente Raiz
    ├── index.css                                          # Design System & Estilos
    ├── data/
    │   └── properties.js                                  # Imóveis de Exemplo Iniciais
    └── components/
        ├── Header.jsx                                     # Cabeçalho & Navegação
        ├── Hero.jsx                                       # Banner de Abertura & Busca Rápida
        ├── PropertyCard.jsx                               # Card do Imóvel
        ├── PropertyFilters.jsx                            # Filtros e Abas de Busca
        ├── PropertyModal.jsx                              # Modal de Detalhes & Galeria
        ├── FinancingCalculator.jsx                        # Calculadora de Financiamento
        ├── AdminDashboard.jsx                             # Painel de Controle de Anúncios
        ├── PropertyFormModal.jsx                          # Modal de Criação / Edição
        ├── AboutContact.jsx                               # Sobre, Contato & Google Maps
        ├── WhatsAppWidget.jsx                             # Widget Flutuante WhatsApp
        └── Footer.jsx                                     # Rodapé Institucional
```

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos
Possuir o **Node.js** (versão 18 ou superior) instalado em sua máquina.

### Passo a Passo

1. **Instalar as dependências**:
   ```bash
   npm install
   ```

2. **Iniciar o servidor de desenvolvimento**:
   ```bash
   npm run dev
   ```

3. **Acessar a aplicação**:
   Abra o navegador no endereço indicado (por padrão `http://localhost:3000`).

4. **Gerar Build de Produção**:
   ```bash
   npm run build
   ```

---

## 📞 Informações de Contato do Corretor

- **Corretor**: Anderson Kunicki
- **CRECI**: CRECI-SC 60173 F
- **Endereço**: Rua Francisco Mielzkovski, 173 - Itaiópolis - SC, 89340-000, Brasil
- **E-mail**: [andersonkunicki@gmail.com](mailto:andersonkunicki@gmail.com)
- **Facebook**: [facebook.com/anderson.kunicki.9](https://www.facebook.com/anderson.kunicki.9)
