# Anderson Kunicki — Corretor Imobiliário (CRECI-SC 60173 F)

Aplicação web moderna, responsiva e de alto padrão desenvolvida em **React 18** com **Vite 5**, arquitetada sob o padrão **Clean Architecture / Modular Components**, projetada para a imobiliária **Anderson Kunicki - Corretor Imobiliário** em Itaiópolis - SC.

---

## Identidade Visual e Design System

O design do projeto utiliza um estilo corporativo, clean e refinado:
- **Azul Marinho Imperial** (`#071527` / `#0B2240`): Solidez, segurança e credibilidade imobiliária.
- **Vermelho Carmim Imobiliário** (`#C81D25`): Destaques, chamadas para ação (CTA) e elementos visuais nobres.
- **Dourado Champagne** (`#D4AF37`): Identificação de imóveis em destaque na vitrine.
- **Tipografia Nobre**: Google Fonts (*Outfit* para títulos e *Inter* para dados e leitura técnica).

---

## Funcionalidades

1. **Catálogo Reativo de Imóveis**:
   - Busca em tempo real por código, título, bairro e rua.
   - Filtros instantâneos por finalidade (*Venda* ou *Aluguel*), tipo (*Casa, Terreno, Sítio, Apartamento, Comercial*), dormitórios e preço máximo.
   - Cards com visualização de m², quartos, suítes, banheiros, vagas e preço formatado em Reais (R$).

2. **Modal de Detalhes Completo**:
   - Galeria com seletor de miniaturas.
   - Exibição de Tour Virtual em vídeo embutido (YouTube / Vimeo).
   - Dados detalhados de área construída, terreno, suítes, IPTU e condomínio.
   - Botão direto para o WhatsApp preenchendo o imóvel e referência exata de interesse.

3. **Painel de Gestão de Anúncios (Admin)**:
   - Autenticação com **Firebase Auth** ou criptografia **SHA-256**, rate-limiting e auto-logout por inatividade (30 min).
   - **Módulo de Troca de Senha** integrado diretamente no painel.
   - Métricas de carteira em tempo real (Total de Imóveis, Em Destaque, Venda/Aluguel, VGV Total).
   - **Upload de fotos locais** (Base64) e links externos com reordenação e definição de capa.
   - **Gerenciamento dinâmico de tags e comodidades**.
   - Ações em lote, duplicação rápida e exportação/importação de backups em formato JSON.

4. **Persistência em Nuvem (Firebase Firestore)**:
   - Sincronização em tempo real entre todos os dispositivos (celular, tablet, computador do escritório).
   - Modo de contingência e cache local resiliente a falhas de conexão.

5. **Widget Flutuante do WhatsApp**:
   - Popover interativo no canto inferior direito para contato direto e captação de leads com mensagens pré-configuradas.

6. **Conformidade com a LGPD**:
   - Página dedicada de Política de Privacidade e Proteção de Dados com canais de encarregado.

7. **Seção Institucional e Redes Sociais**:
   - Informações institucionais do corretor Anderson Kunicki (CRECI-SC 60173 F).
   - Links oficiais para WhatsApp, Instagram (`@kunickianderson`) e Facebook.
   - Google Maps interativo da sede na **Rua Francisco Mielzkovski, 173 - Itaiópolis - SC**.

---

## Estrutura de Arquivos Modular

```text
andersonkunicki/
├── public/
│   ├── .htaccess                     # Regras de segurança e cache Apache (Hostinger)
│   ├── favicon.svg                   # Favicon vetorial oficial
│   ├── manifest.json                 # Manifesto PWA
│   ├── robots.txt                    # Regras para motores de busca
│   ├── sitemap.xml                   # Mapa XML para indexação de motores de busca
│   └── anderson-kunicki.jpg          # Foto institucional do corretor
├── src/
│   ├── components/
│   │   ├── admin/                    # Área Administrativa
│   │   │   ├── AdminDashboard.jsx    # Painel de gestão e métricas
│   │   │   ├── AdminLogin.jsx        # Tela de login
│   │   │   ├── ChangePasswordModal.jsx # Modal de alteração de senha
│   │   │   └── PropertyFormModal.jsx # Formulário de cadastro/edição
│   │   ├── common/                   # Componentes Compartilhados
│   │   │   ├── Toast.jsx             # Notificações flutuantes animadas
│   │   │   └── WhatsAppIcon.jsx      # Ícone oficial vetorial do WhatsApp
│   │   ├── layout/                   # Estrutura e Navegação
│   │   │   ├── Header.jsx            # Cabeçalho com redes e menu responsivo
│   │   │   ├── Footer.jsx            # Rodapé institucional
│   │   │   └── WhatsAppWidget.jsx    # Widget flutuante de atendimento
│   │   ├── property/                 # Domínio de Imóveis
│   │   │   ├── PropertyCard.jsx      # Card minimalista de imóvel
│   │   │   ├── PropertyFilters.jsx   # Filtros e ordenação
│   │   │   └── PropertyModal.jsx     # Modal de detalhes, galeria e vídeo
│   │   └── sections/                 # Seções de Conteúdo
│   │       ├── AboutContact.jsx      # Sobre, contato e mapa
│   │       ├── Hero.jsx              # Banner de busca rápida
│   │       └── PrivacyPage.jsx       # Política de Privacidade (LGPD)
│   ├── config/
│   │   └── site.config.js            # Configurações de contato, redes e WhatsApp
│   ├── data/
│   │   └── properties.js             # Base inicial de imóveis
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useAuth.js                # Autenticação e sessão (Firebase / Local)
│   │   ├── useProperties.js          # Firestore Real-Time CRUD, filtros e backups
│   │   └── useToast.js               # Notificações temporizadas
│   ├── lib/
│   │   └── firebase.js               # Inicialização do Firebase Firestore & Auth
│   ├── utils/                        # Funções Utilitárias
│   │   ├── formatters.js             # Formatação de moeda, números e telefones
│   │   ├── security.js               # Criptografia SHA-256
│   │   └── video.js                  # Embed de YouTube/Vimeo
│   ├── App.jsx                       # Componente Raiz Desacoplado
│   ├── index.css                     # Design System Ultra-Clean
│   └── main.jsx                      # Ponto de entrada React
├── .env.example                      # Modelo de variáveis de ambiente
├── HOSTINGER_DEPLOY.md               # Guia passo a passo de deploy na Hostinger
├── index.html                        # HTML principal com meta tags SEO
├── package.json                      # Dependências e scripts
└── vite.config.js                    # Configurações do Vite
```

---

## Como Executar Localmente

### 1. Instalar as dependências:
```bash
npm install
```

### 2. Configurar o Firebase (Opcional para testes locais):
Copie o arquivo `.env.example` para `.env.local` e insira suas credenciais do Firebase Console.

### 3. Iniciar o servidor de desenvolvimento:
```bash
npm run dev
```

### 4. Gerar build de produção:
```bash
npm run build
```

---

## Deploy na Hostinger

Consulte o guia completo e detalhado em [HOSTINGER_DEPLOY.md](./HOSTINGER_DEPLOY.md).

---

## Acesso Administrativo

As credenciais de primeiro acesso são configuradas no momento da entrega do projeto. A senha pode ser alterada a qualquer momento através do botão **"Alterar Senha"** presente no cabeçalho do Painel Admin.
