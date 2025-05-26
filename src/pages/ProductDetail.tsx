import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedProducts';
import { FaStar, FaShare, FaShieldAlt, FaUndo } from 'react-icons/fa';
import ShippingCalculator from '../components/ShippingCalculator';

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useTranslatedProducts();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(0);
  const [shippingInfo, setShippingInfo] = useState<{ cost: number; time: number } | null>(null);
  const { addToCart } = useCart();

  // Verifica e aplica o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = window.document.documentElement;
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Produtos relacionados (exemplo)
  const relatedProducts = products.filter(p => p.category === product?.category && p.id !== id).slice(0, 4);

  if (!product) {
    return <div className="p-8">{t('product.notFound')}</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setInCart((prev) => prev + quantity);
  };

  const handleRelatedProductClick = (productId: string) => {
    navigate(`/produto/${productId}`);
  };

  const handleCalculateShipping = async (cep: string) => {
    try {
      // Aqui você pode integrar com uma API real de cálculo de frete
      // Por enquanto, vamos simular um cálculo baseado no CEP
      const lastDigit = parseInt(cep[cep.length - 1]);
      const cost = lastDigit % 2 === 0 ? 0 : 15.90;
      const time = lastDigit % 3 + 2; // 2-4 dias úteis

      setShippingInfo({ cost, time });
    } catch (error) {
      console.error('Erro ao calcular frete:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        className="inline-block mb-6 px-4 py-2 rounded-lg bg-blue-700 dark:bg-blue-800 text-white font-semibold shadow hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors flex items-center"
        onClick={() => navigate('/')}
      >
        <span className="mr-2">&larr;</span> {t('product.backToProducts')}
      </button>

      {/* Informações principais do produto */}
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6 mb-8">
        {/* Galeria de imagens */}
        <div className="w-full md:w-1/2">
          <div className="h-80 flex items-center justify-center bg-white mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain object-center rounded-lg"
            />
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Avaliação */}
            <div className="flex items-center mb-4">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < Math.floor(product.rating.average) ? '#FCD34D' : '#D1D5DB'} />
                ))}
              </div>
              <span className="ml-2 text-gray-600">({product.rating.count} {t('product.reviews')})</span>
            </div>

            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-700 mr-3">R$ {product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through mr-2 text-lg">R$ {product.oldPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded">{product.discount}% OFF</span>
              )}
            </div>

            {/* Calculador de Frete */}
            <div className="mb-6">
              <ShippingCalculator onCalculate={handleCalculateShipping} />
              
              {shippingInfo && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  {shippingInfo.cost === 0 ? (
                    <p className="text-green-700 font-semibold">
                      {t('shipping.freeShipping')}
                    </p>
                  ) : (
                    <p className="text-gray-700">
                      {t('shipping.shippingCost', { cost: shippingInfo.cost.toFixed(2) })}
                    </p>
                  )}
                  <p className="text-gray-600 text-sm mt-1">
                    {t('shipping.deliveryTime', { time: shippingInfo.time })}
                  </p>
                </div>
              )}
            </div>

            <h2 className="font-semibold mb-1">{t('product.description')}</h2>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="flex items-center gap-2 mb-4">
              <span>{t('product.quantity')}:</span>
              <button
                className="border rounded px-2 py-1 text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >-</button>
              <span className="px-2">{quantity}</span>
              <button
                className="border rounded px-2 py-1 text-lg"
                onClick={() => setQuantity((q) => q + 1)}
              >+</button>
            </div>

            <div className="flex gap-4 mb-4">
              <button
                className="flex-1 bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 px-6 rounded transition-colors"
                onClick={handleAddToCart}
              >
                {t('product.addToCart')}
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-50">
                <FaShare color="#4B5563" />
              </button>
            </div>

            {inCart > 0 && (
              <div className="text-green-600 text-sm font-medium mt-2">
                {t('product.unitsInCart', { 
                  count: inCart,
                  text: inCart === 1 ? t('product.singleItem') : t('product.multipleItems')
                })}
              </div>
            )}

            {/* Informações de garantia e devolução */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <div className="mr-2">
                  <FaShieldAlt color="#2563EB" />
                </div>
                <span>{t('product.warranty')}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <div className="mr-2">
                  <FaUndo color="#2563EB" />
                </div>
                <span>{t('product.returnPolicy')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Produtos relacionados */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">{t('product.relatedProducts')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {relatedProducts.map((relatedProduct) => (
            <div
              key={relatedProduct.id}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleRelatedProductClick(relatedProduct.id)}
            >
              <img
                src={relatedProduct.image}
                alt={relatedProduct.name}
                className="w-full h-48 object-contain mb-4"
              />
              <h3 className="font-semibold mb-2">{relatedProduct.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.floor(relatedProduct.rating.average) ? '#FCD34D' : '#D1D5DB'} />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">({relatedProduct.rating.count})</span>
              </div>
              <p className="text-blue-700 font-bold">R$ {relatedProduct.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 