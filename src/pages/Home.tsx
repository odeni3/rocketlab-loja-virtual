import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import ProductChat from '../components/ProductChat';
import type { Product } from '../types/Product';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedProducts';
import ProductFilters from '../components/ProductFilters';

const ITEMS_PER_PAGE = 9;

const Home = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [added, setAdded] = useState<{ [id: string]: boolean }>({});
    const [chatProduct, setChatProduct] = useState<Product | null>(null);
    const products = useTranslatedProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [currentPage, setCurrentPage] = useState(1);

    // Resetar página quando os produtos filtrados mudarem
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredProducts]);

    // Calcular produtos paginados
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
      <>
        <Header />
        <main className="max-w-6xl mx-auto px-6 py-8 bg-white dark:bg-gray-900 transition-colors duration-300 min-h-screen">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{t('home.featuredProducts')}</h2>
          
          <div className="flex gap-8">
            <ProductFilters 
              products={products} 
              onFilterChange={setFilteredProducts}
            />

            <div className="flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {paginatedProducts.map(product => (
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

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2 mt-8">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-md bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors"
                  >
                    {t('pagination.previous')}
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === page
                          ? 'bg-blue-700 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      } transition-colors`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-md bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-800 transition-colors"
                  >
                    {t('pagination.next')}
                  </button>
                </div>
              )}
            </div>
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