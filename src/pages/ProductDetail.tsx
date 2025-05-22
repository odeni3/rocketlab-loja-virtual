import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedProducts';

const ProductDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const products = useTranslatedProducts();
  const product = products.find((p) => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(0);
  const { addToCart } = useCart();

  if (!product) {
    return <div className="p-8">{t('product.notFound')}</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setInCart((prev) => prev + quantity);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <button
        className="inline-block mb-6 px-4 py-2 rounded-lg bg-blue-700 dark:bg-blue-800 text-white font-semibold shadow hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors flex items-center"
        onClick={() => navigate(-1)}
      >
        <span className="mr-2">&larr;</span> {t('product.backToProducts')}
      </button>
      <div className="flex flex-col md:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
        <div className="w-full md:w-1/2 h-80 flex items-center justify-center bg-white">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain object-center rounded-lg"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <span className="text-2xl font-bold text-blue-700 mr-3">R$ {product.price.toFixed(2)}</span>
              {product.oldPrice && (
                <span className="text-gray-400 line-through mr-2 text-lg">R$ {product.oldPrice.toFixed(2)}</span>
              )}
              {product.discount && (
                <span className="bg-red-100 text-red-700 text-sm font-semibold px-2 py-1 rounded">{product.discount}% OFF</span>
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
            <button
              className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded transition-colors mb-2"
              onClick={handleAddToCart}
            >
              {t('product.addToCart')}
            </button>
            {inCart > 0 && (
              <div className="text-green-600 text-sm font-medium mt-2">
                {inCart} {t('product.unitsInCart', { count: inCart })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 