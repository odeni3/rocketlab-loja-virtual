# 🚀 Rocketlab Loja Virtual

Bem-vindo à Rocketlab Loja Virtual! Aqui você encontra uma experiência de e-commerce moderna, inteligente e cheia de recursos interativos. Navegue, converse com a IA sobre produtos, ative o dark mode e aproveite uma interface pensada para encantar.

## ✨ Principais Funcionalidades

- **🌗 Dark Mode com um clique:**
  - Ative ou desative o modo escuro em toda a loja com um botão no topo. O visual se adapta automaticamente para proporcionar conforto visual em qualquer ambiente!

- **🛒 Carrinho global com sidebar inteligente:**
  - Veja, altere quantidades, remova itens e finalize sua compra de forma rápida. O carrinho aparece como uma sidebar moderna e responsiva.
  - **Botão "POR QUE COMPRAR ESTES PRODUTOS?"**: Peça para a IA te convencer a finalizar a compra dos itens do carrinho, com argumentos personalizados e persuasivos!

- **💬 Chat com IA em cada produto:**
  - Cada card de produto tem um botão de chat. Abra um mini-chat com inteligência artificial (ChatGPT) e tire dúvidas, peça recomendações ou converse sobre o item em tempo real.

- **🖼️ Visualização de produtos:**
  - Cards com imagem, nome, preço, desconto e botão de adicionar ao carrinho.
  - Página de detalhes com descrição, preço antigo, desconto, seleção de quantidade e botão de adicionar ao carrinho.

- **📦 Histórico de pedidos:**
  - Veja todos os pedidos realizados, com data, produtos, quantidades e total de cada compra.

- **🔄 Navegação fluida:**
  - Use o menu para acessar pedidos, voltar para a loja ou navegar entre páginas sem recarregar.

- **💡 Visual moderno e responsivo:**
  - Layout adaptado para qualquer tela, com animações, feedback visual e dark mode de verdade!

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/) para navegação
- [TailwindCSS](https://tailwindcss.com/) para estilização moderna e dark mode
- [Vite](https://vitejs.dev/) para build rápido
- [OpenAI API (ChatGPT)](https://platform.openai.com/) para chat inteligente

## 🚦 Como rodar o projeto

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/odeni3/rocketlab-loja-virtual.git
   cd rocketlab-loja-virtual
   ```
2. **Instale as dependências:**
   ```bash
   npm install
   ```
3. **Rode o projeto em modo desenvolvimento:**
   ```bash
   npm run dev
   ```
4. **Acesse no navegador:**
   [http://localhost:5173](http://localhost:5173)

## 🗂️ Estrutura do Projeto

- **src/pages/Home.tsx**: Página inicial com listagem de produtos, botão de chat IA em cada card.
- **src/pages/ProductDetail.tsx**: Detalhes do produto, seleção de quantidade, botão estilizado para voltar.
- **src/components/Header.tsx**: Topo fixo com nome da loja, botão de dark mode, carrinho e link para pedidos.
- **src/components/SidebarCart.tsx**: Sidebar do carrinho, botão de persuasão com IA, controles de quantidade e remoção.
- **src/pages/Orders.tsx**: Histórico de pedidos, botão estilizado para voltar à loja.
- **src/components/ProductChat.tsx**: Mini-chat com IA para cada produto.
- **src/components/Footer.tsx**: Rodapé responsivo.
- **src/contexts/CartContext.tsx**: Contexto global do carrinho.
- **src/mocks/productsmock.ts**: Mock de produtos.

## 💬 Experimente!
- Ative o dark mode e veja toda a loja se transformar.
- Clique no balão de chat em qualquer produto e converse com a IA.
- Adicione produtos ao carrinho e peça para a IA te convencer a comprar.
- Finalize pedidos e acompanhe seu histórico.

---

Rocketlab Loja Virtual — feita para inspirar, encantar e mostrar o futuro do e-commerce! 🚀
