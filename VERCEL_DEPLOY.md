# 🚀 Guia de Publicação no Vercel (Passo a Passo)

O projeto está totalmente configurado e otimizado para deploy no Vercel. O comando de build (`npm run build`), o arquivo `vercel.json` e a pasta `public/` estão prontos.

---

## ⚡ Opção 1: Deploy Rápido via Terminal (Sem precisar de GitHub)

Você pode publicar em menos de 1 minuto diretamente pelo terminal:

1. Abra o terminal na pasta do projeto `c:\Users\Vitor\Downloads\SiteAnderson` e rode:
   ```bash
   npx vercel
   ```

2. Siga as instruções simples na tela:
   - **Set up and deploy?** Digite `y` e pressione Enter.
   - Aceite as opções padrão pressionando `Enter` até o final.

3. O Vercel irá gerar o seu **link público online** em segundos (exemplo: `https://site-anderson-kunicki.vercel.app`).

---

## 🌐 Opção 2: Deploy Conectado ao GitHub (Recomendado)

1. Envie a pasta do projeto para o seu **GitHub**.
2. Acesse o painel da Vercel: **[vercel.com/new](https://vercel.com/new)**.
3. Importe o repositório e clique no botão **Deploy**.
4. O Vercel detectará automaticamente as configurações do Vite (`dist/` e `npm run build`).

---

## 🔗 Links Úteis para Apresentar ao Cliente (Anderson Kunicki)

Quando mandar o link para o Anderson visualizar e dar o feedback:

- **Página Inicial & Catálogo de Imóveis**:
  `https://seu-link-vercel.app/#imoveis`
- **Painel Admin de Gestão (Edição de Anúncios e Upload de Fotos)**:
  `https://seu-link-vercel.app/#admin`
- **Simulador de Financiamento**:
  `https://seu-link-vercel.app/#simulador`
- **Sobre o Corretor & Mapa no Centro de Itaiópolis - SC**:
  `https://seu-link-vercel.app/#sobre`

---

## 💡 Dicas para a Demonstração com o Cliente

1. **Mostrar o Cadastro com Fotos Locais**: Mostre a ele como é fácil subir fotos do computador ou celular para criar anúncios.
2. **Mostrar a Reordenação de Fotos**: Mostre como mudar qual foto será a capa (`⭐ CAPA`).
3. **Simulação de Financiamento**: Mostre como o cliente dele poderá calcular a parcela do imóvel e enviar direto no WhatsApp.
