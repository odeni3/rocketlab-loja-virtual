import Header from '../components/Header';
import { products } from '../mocks/productsmock';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = useState<{ [id: string]: boolean }>({});
    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8">
          <h2 className="text-2xl font-bold mb-6">Produtos em destaque</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white border border-gray-300 rounded-xl shadow-md overflow-hidden flex flex-col cursor-pointer 
            hover:shadow-xl hover:-translate-y-1 transform transition-transform transition-shadow duration-300"
                onClick={e => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  navigate(`/produto/${product.id}`);
                }}
              >
                <div className="w-full h-48 flex items-center justify-center bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <div className="mb-4">
                    <span className="text-xl font-bold text-blue-700 mr-2">R$ {product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 line-through mr-2">R$ {product.oldPrice.toFixed(2)}</span>
                    )}
                    {product.discount && (
                      <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">-{product.discount}%</span>
                    )}
                  </div>
                  <button
                    className={`mt-auto font-semibold py-2 px-4 rounded transition-colors border ${added[product.id] ? 'bg-white text-blue-700 border-blue-700' : 'bg-blue-700 hover:bg-blue-800 text-white border-transparent'}`}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product, 1);
                      setAdded((prev) => ({ ...prev, [product.id]: true }));
                    }}
                  >
                    {added[product.id] ? 'Adicionar novamente ao carrinho' : 'Adicionar ao carrinho'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </>
    );
};

export default Home;