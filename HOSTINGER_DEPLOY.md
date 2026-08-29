# 🚀 Guia de Configuração e Deploy na Hostinger

Este documento contém o passo a passo completo para configurar o backend **Firebase** e realizar a publicação do site na **Hostinger**.

---

## 🏗️ Arquitetura da Solução

- **Frontend (Hostinger)**: Hospedagem estática ultrarrápida dos arquivos HTML, CSS, JavaScript compilados pelo Vite.
- **Backend (Firebase Free Tier)**:
  - **Cloud Firestore**: Banco de dados NoSQL em tempo real para cadastro, edição e exclusão de imóveis.
  - **Firebase Auth**: Autenticação segura do corretor com tokens criptografados.

---

## 1. Configurando o Firebase (Gratuito)

### Passo 1: Criar o Projeto no Firebase
1. Acesse [Firebase Console](https://console.firebase.google.com/) com sua conta Google.
2. Clique em **"Adicionar projeto"** (ou *Criar projeto*).
3. Nomeie como `anderson-kunicki-imoveis` e conclua a criação.

### Passo 2: Registrar a Aplicação Web
1. No painel do projeto, clique no ícone **Web (`</>`)**.
2. Dê o nome de `Site Anderson Kunicki` e clique em **"Registrar app"**.
3. Copie os valores do objeto `firebaseConfig`.

### Passo 3: Ativar o Cloud Firestore
1. No menu lateral, clique em **Compilação** → **Firestore Database**.
2. Clique em **"Criar banco de dados"**.
3. Escolha o local do servidor (ex: `southamerica-east1` em São Paulo ou `us-central1`).
4. Na aba **Regras**, configure as regras de leitura pública e escrita autenticada:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Qualquer visitante pode ler o catálogo de imóveis
    match /properties/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Passo 4: Ativar a Autenticação (Firebase Auth)
1. No menu lateral, clique em **Compilação** → **Authentication** → **Primeiros passos**.
2. Na aba **Provedores de login**, ative **Email/Senha**.
3. Na aba **Users (Usuários)**, clique em **"Adicionar usuário"**:
   - **Email**: `andersonkunicki@andersonkunicki.com.br` (ou o email pessoal do corretor)
   - **Senha**: defina a senha inicial acordada
4. Na aba **Configurações** → **Domínios autorizados**, adicione o domínio próprio contratado na Hostinger (ex: `andersonkunicki.com.br`).

---

## 2. Gerando o Build de Produção

1. Na raiz do projeto, crie ou edite o arquivo `.env.local` inserindo as credenciais obtidas no Passo 2:
```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=anderson-kunicki-imoveis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=anderson-kunicki-imoveis
VITE_FIREBASE_STORAGE_BUCKET=anderson-kunicki-imoveis.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
VITE_FIREBASE_APP_ID=1:1234567890:web:...
```

2. Execute o comando de build no terminal:
```bash
npm run build
```

3. Isso criará a pasta `dist/` contendo todos os arquivos otimizados e o arquivo `.htaccess` de segurança.

---

## 3. Publicando na Hostinger (Passo a Passo)

1. Acesse o painel da Hostinger (**hPanel**): [hostinger.com.br](https://hostinger.com.br).
2. Vá em **Sites** → selecione o site e clique em **Gerenciar**.
3. No menu lateral, acesse **Arquivos** → **Gerenciador de Arquivos**.
4. Abra a pasta `public_html/`.
5. Se houver arquivos padrão da Hostinger (como `default.php`), pode excluí-los.
6. Faça upload de **TODO o conteúdo de dentro da pasta `dist/`** diretamente para `public_html/` (não envie a pasta `dist` inteira, apenas o conteúdo interno: `index.html`, pasta `assets/`, `.htaccess`, etc.).
7. Pronto! Acesse seu domínio e o site estará no ar.

---

## 4. Atualizações Futuras

Sempre que fizer alterações no código do site:
1. Execute `npm run build`
2. Substitua os arquivos na pasta `public_html/` da Hostinger pelo novo conteúdo gerado em `dist/`.

> **Nota:** Como os dados dos imóveis ficam no Firebase, novas fotos e novos imóveis cadastrados pelo corretor através do Painel Admin entram no ar **instantaneamente sem precisar recompilar ou fazer upload de novos arquivos**.
