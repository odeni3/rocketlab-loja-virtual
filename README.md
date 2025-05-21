# Rocketlab Loja Virtual

Rocketlab é uma aplicação de e-commerce desenvolvida em React + TypeScript, com foco em experiência de compra moderna e responsiva. O projeto simula uma loja virtual, permitindo ao usuário navegar por produtos, visualizar detalhes, adicionar itens ao carrinho e simular uma compra.

## Funcionalidades

- Listagem de produtos em cards com imagem, nome, preço, desconto e botão de adicionar ao carrinho
- Página de detalhes do produto com descrição, preço antigo, desconto, seleção de quantidade e botão de adicionar ao carrinho
- Carrinho global com sidebar: visualize, altere quantidades, remova itens e veja o subtotal/total
- Badge de quantidade de itens no ícone do carrinho
- Navegação entre páginas usando React Router
- Layout responsivo e estilização moderna com TailwindCSS

## Tecnologias Utilizadas

- [React](https://react.dev/) (com Hooks)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router DOM](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/) (para build e dev server)

## Como rodar o projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/odeni3/rocketlab-loja-virtual.git
   cd rocketlab-loja-virtual
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   # ou
   yarn
   ```

3. **Rode o projeto em modo desenvolvimento:**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador:**

   O projeto estará disponível em [http://localhost:5173](http://localhost:5173) (ou porta indicada no terminal).

## Estrutura principal

- `src/pages/Home.tsx`: Página inicial com listagem de produtos
- `src/pages/ProductDetail.tsx`: Página de detalhes do produto
- `src/components/Header.tsx`: Header fixo com nome da loja e ícone do carrinho
- `src/components/SidebarCart.tsx`: Sidebar do carrinho
- `src/contexts/CartContext.tsx`: Contexto global do carrinho
- `src/mocks/productsmock.ts`: Mock de produtos

## Observações

- O projeto é apenas um protótipo, não possui backend e não realiza compras reais.
- O estado do carrinho é mantido apenas em memória (ao recarregar a página, o carrinho é limpo).

---

Desenvolvido por [Rocketlab](https://github.com/odeni3) 🚀
