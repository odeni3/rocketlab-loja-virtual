# 🚀 Rocketlab Loja Virtual

Bem-vindo à Rocketlab Loja Virtual! Uma experiência de e-commerce moderna, inteligente e cheia de recursos interativos. Navegue, converse com a IA sobre produtos, mude a linguagem, ative o dark mode, verifique disponibilidade de entrega por CEP e aproveite uma interface pensada para encantar.

## ✨ Funcionalidades Detalhadas

### 🛍️ Catálogo de Produtos

- **Listagem Dinâmica:**

  - Visualização em grid responsivo de produtos
  - Paginação automática com 9 itens por página
  - Filtros inteligentes para encontrar produtos específicos
  - Animações suaves ao interagir com os cards

- **Cards de Produtos:**
  - Imagem do produto com zoom suave
  - Nome e descrição do produto
  - Preço atual e preço antigo (quando aplicável)
  - Badge de desconto com porcentagem
  - Botão de adicionar ao carrinho com feedback visual
  - Botão de chat com IA para cada produto

### 🚚 Cálculo de Frete

- **Verificação de Entrega:**
  - Cálculo de disponibilidade por CEP
  - Identificação automática da cidade de entrega
  - Suporte apenas para entregas nacionais
  - Feedback imediato sobre disponibilidade

### 🛒 Sistema de Carrinho

- **Carrinho Global:**

  - Sidebar deslizante com lista de produtos
  - Controle de quantidade para cada item
  - Remoção individual de produtos
  - Cálculo automático de subtotal e total
  - Persistência dos dados no localStorage
  - Atualização em tempo real do contador de itens

- **Recursos Especiais do Carrinho:**
  - Botão "Por que comprar?" que gera argumentos persuasivos via IA
  - Feedback visual ao adicionar/remover itens
  - Animações suaves nas interações
  - Suporte a múltiplos idiomas nos produtos

### 💬 Chat com IA

- **Chat por Produto:**
  - Mini-chat integrado em cada card de produto
  - Interface intuitiva e responsiva
  - Respostas personalizadas sobre o produto
  - Suporte a perguntas técnicas e recomendações
  - Integração com ChatGPT para respostas inteligentes

### 🌓 Sistema de Tema

- **Dark Mode:**
  - Alternância instantânea entre temas claro e escuro
  - Persistência da preferência do usuário
  - Transições suaves entre os temas
  - Cores otimizadas para cada modo
  - Adaptação automática de todos os componentes

### 📦 Gestão de Pedidos

- **Histórico de Compras:**
  - Lista completa de pedidos realizados
  - Detalhes de cada pedido (data, produtos, quantidades)
  - Cálculo de totais por pedido
  - Persistência dos dados no localStorage
  - Interface intuitiva para visualização

### 🌐 Internacionalização

- **Suporte a Múltiplos Idiomas:**
  - Interface disponível em português e inglês
  - Tradução automática de produtos
  - Persistência da preferência de idioma
  - Tradução dinâmica de todos os textos

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/) para navegação
- [TailwindCSS](https://tailwindcss.com/) para estilização moderna
- [Vite](https://vitejs.dev/) para build rápido
- [OpenAI API (ChatGPT)](https://platform.openai.com/) para chat inteligente
- [i18next](https://www.i18next.com/) para internacionalização
- [React Context API](https://react.dev/learn/passing-data-deeply-with-context) para gerenciamento de estado

## 🚦 Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/odeni3/rocketlab-loja-virtual.git
   cd rocketlab-loja-virtual
   ```

2. **Instale as dependências do frontend:**

   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente do frontend:**

   - Crie um arquivo `.env` na pasta gpt_api
   - Adicione sua chave da API OpenAI:
     ```
     OPENAI_API_KEY="sua_chave_aqui" (exatamente assim)
     ```

4. **Configure e rode o backend da API de IA:**

   ```bash
   cd gpt_api
   npm install
   npm run dev
   ```

   O servidor da API rodará em http://localhost:5001

5. **Em um novo terminal, rode o frontend:**

   ```bash
   cd ..  # Volte para a raiz do projeto
   npm run dev
   ```

6. **Acesse no navegador:**
   [http://localhost:5173](http://localhost:5173)

## 🗂️ Estrutura do Projeto (front)

```
src/
├── components/          # Componentes reutilizáveis
├── contexts/           # Contextos React
├── hooks/             # Hooks personalizados
├── pages/             # Páginas da aplicação
├── types/             # Definições de tipos TypeScript
├── locales/           # Arquivos de tradução
├── mocks/             # Dados mockados
```

## 💡 Dicas de Uso

1. **Explorando Produtos:**

   - Use os filtros para encontrar produtos específicos
   - Clique no ícone de chat para conversar com a IA sobre o produto
   - Experimente o dark mode para uma experiência visual diferente

2. **Gerenciando o Carrinho:**

   - Adicione produtos e ajuste as quantidades
   - Use o botão "Por que comprar?" para receber argumentos persuasivos
   - Finalize pedidos e acompanhe seu histórico

3. **Interagindo com a IA:**
   - Faça perguntas específicas sobre produtos
   - Peça recomendações baseadas em seus interesses
   - Solicite informações técnicas detalhadas

---

Rocketlab Loja Virtual — Uma experiência de e-commerce moderna, inteligente e encantadora! 🚀
