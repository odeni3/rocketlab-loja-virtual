# Rocketlab Loja Virtual

Rocketlab é uma aplicação de e-commerce desenvolvida em React + TypeScript, com foco em experiência de compra moderna, responsiva e visualmente agradável. O projeto simula uma loja virtual, permitindo ao usuário navegar por produtos, visualizar detalhes, adicionar itens ao carrinho, simular uma compra e acompanhar o histórico de pedidos.

## Funcionalidades

- **Listagem de produtos em cards:** Imagem, nome, preço, desconto e botão de adicionar ao carrinho.
- **Chat com IA em cada produto:** Cada card de produto possui um botão de chat que abre um mini-chat com inteligência artificial (ChatGPT). O usuário pode conversar em tempo real com a IA sobre aquele produto, tirar dúvidas, pedir recomendações e obter informações personalizadas.
- **Página de detalhes do produto:** Imagem, descrição, preço antigo, desconto, seleção de quantidade e botão de adicionar ao carrinho.
- **Carrinho global com sidebar:** Visualize, altere quantidades, remova itens e veja o subtotal/total. Imagens dos produtos redimensionadas e centralizadas.
- **Botão "POR QUE COMPRAR ESTES PRODUTOS?" no carrinho:** Na sidebar do carrinho, ao lado do número de itens, há um botão que, ao ser clicado, abre um popup onde a IA analisa os itens do carrinho e tenta convencer o usuário a finalizar a compra, utilizando técnicas de persuasão e argumentos personalizados.
- **Badge de quantidade de itens no ícone do carrinho.**
- **Histórico de pedidos:** Página dedicada mostrando todos os pedidos realizados, com imagens dos produtos.
- **Navegação entre páginas usando React Router.**
- **Layout responsivo e estilização moderna com TailwindCSS.**
- **Feedback visual aprimorado:** Cards com hover destacado e animação, botões com estados visuais claros.
- **Persistência de pedidos:** Os pedidos são salvos no localStorage e exibidos no histórico.

## Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [OpenAI API (ChatGPT)](https://platform.openai.com/) — para funcionalidades de chat inteligente

## Como rodar o projeto

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

   O projeto estará disponível em [http://localhost:5173](http://localhost:5173) (ou porta indicada no terminal).

## Estrutura principal

- `src/pages/Home.tsx`: Página inicial com listagem de produtos em cards. Cada card mostra imagem, nome, preço, desconto, botão de adicionar ao carrinho e botão de chat com IA.
- `src/pages/ProductDetail.tsx`: Página de detalhes do produto. Exibe imagem, descrição, preço antigo, desconto, quantidade e botão de adicionar ao carrinho.
- `src/components/Header.tsx`: Header fixo com nome da loja, ícone do carrinho (com badge de quantidade) e link para histórico de pedidos.
- `src/components/SidebarCart.tsx`: Sidebar do carrinho. Exibe itens adicionados, permite alterar quantidades, remover, mostra o total, botão de finalizar compra e botão "POR QUE COMPRAR ESTES PRODUTOS?" para interação com a IA.
- `src/pages/Orders.tsx`: Página de histórico de pedidos. Mostra todos os pedidos realizados, com data, produtos, quantidades e total de cada pedido.
- `src/contexts/CartContext.tsx`: Contexto global do carrinho, responsável por adicionar, remover, atualizar quantidade e limpar o carrinho.
- `src/mocks/productsmock.ts`: Mock de produtos.

---
