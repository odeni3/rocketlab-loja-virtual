import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState } from 'react';
import Footer from '../components/Footer';
import ProductChat from '../components/ProductChat';
import type { Product } from '../types/Product';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedProducts';

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = useState<{ [id: string]: boolean }>({});
    const [chatProduct, setChatProduct] = useState<Product | null>(null);
    const products = useTranslatedProducts();

    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{t('home.featuredProducts')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <div
                key={product.id}
                className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl shadow-md dark:shadow-lg overflow-hidden flex flex-col cursor-pointer 
            hover:shadow-xl hover:-translate-y-1 transform transition-transform transition-shadow duration-300 relative"
                onClick={e => {
                  if ((e.target as HTMLElement).closest('button')) return;
                  navigate(`/produto/${product.id}`);
                }}
              >
                <button
                  className="absolute top-3 right-3 bg-white dark:bg-gray-700/80 rounded-full p-2 shadow hover:bg-blue-100 dark:hover:bg-gray-600 transition z-10"
                  onClick={e => {
                    e.stopPropagation();
                    setChatProduct(product);
                  }}
                  title={t('product.askAI')}
                >
                  💬
                </button>
                <div className="w-full h-48 flex items-center justify-center bg-white">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain object-center"
                  />
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">{product.name}</h3>
                  <div className="mb-4">
                    <span className="text-xl font-bold text-blue-700 dark:text-blue-300 mr-2">R$ {product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                      <span className="text-gray-400 dark:text-gray-500 line-through mr-2">R$ {product.oldPrice.toFixed(2)}</span>
                    )}
                    {product.discount && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 text-xs font-semibold px-2 py-1 rounded">-{product.discount}%</span>
                    )}
                  </div>
                  <button
                    className={`mt-auto font-semibold py-2 px-4 rounded transition-colors border ${added[product.id] ? 'bg-white dark:bg-gray-900 text-blue-700 dark:text-blue-300 border-blue-700 dark:border-blue-300' : 'bg-blue-700 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-900 text-white border-transparent'}`}
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product, 1);
                      setAdded((prev) => ({ ...prev, [product.id]: true }));
                    }}
                  >
                    {added[product.id] ? t('product.addAgain') : t('product.addToCart')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer />
        {chatProduct && (
          <ProductChat product={chatProduct} onClose={() => setChatProduct(null)} />
        )}
      </>
    );
};

export default Home;