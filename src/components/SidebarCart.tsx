import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CheckoutModal from './CheckoutModal';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import type { SidebarCartProps, ConvinceResponse } from '../types/Cart';

const SidebarCart: React.FC<SidebarCartProps> = ({ open, onClose }) => {
  const { t, i18n } = useTranslation();
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [convinceOpen, setConvinceOpen] = useState(false);
  const [convinceLoading, setConvinceLoading] = useState(false);
  const [convinceText, setConvinceText] = useState('');

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
    onClose();
  };

  const handleConvince = async () => {
    setConvinceOpen(true);
    setConvinceLoading(true);
    setConvinceText('');
    // Monta a lista de produtos do carrinho
    const productList = items.map(({ product, quantity }) => `- ${product.name} (x${quantity})`).join('\n');
    const isEnglish = i18n.language === 'en';
    const prompt = isEnglish 
      ? `You are a persuasive salesperson. Convince the customer to complete the purchase of the following cart items:\n${productList}`
      : `Você é um vendedor persuasivo. Convença o cliente a finalizar a compra dos seguintes itens do carrinho:\n${productList}`;
    
    try {
      const response = await axios.post<ConvinceResponse>('http://localhost:5001/api/chat', {
        messages: [
          { role: 'system', content: isEnglish ? 'You are a persuasive salesperson.' : 'Você é um vendedor persuasivo.' },
          { role: 'user', content: prompt }
        ]
      });
      setConvinceText(response.data.choices[0].message.content);
    } catch {
      setConvinceText(t('chat.error'));
    }
    setConvinceLoading(false);
  };

  const handleCloseConvince = () => {
    setConvinceOpen(false);
    setConvinceText('');
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl dark:shadow-black z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: 480 }}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-.55L21 7M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
            </svg>
            <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{t('cart.title')}</span>
            <span className="ml-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-xs font-semibold px-2 py-0.5 rounded">
              {totalItems} {t('cart.items', { count: totalItems })}
            </span>
            <button
              className={`ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-lg border shadow-sm transition-colors duration-200
                ${items.length === 0 ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 border-gray-300 dark:border-gray-700 cursor-not-allowed' : 'bg-gradient-to-r from-green-600 to-green-500 dark:from-green-800 dark:to-green-600 text-white hover:from-green-800 hover:to-green-600 dark:hover:from-green-900 dark:hover:to-green-800 border-green-900 dark:border-green-300 cursor-pointer'}`}
              style={{ minWidth: 80 }}
              onClick={items.length === 0 ? undefined : handleConvince}
              type="button"
              disabled={items.length === 0}
              title={items.length === 0 ? t('cart.emptyCartMessage') : t('cart.whyBuyMessage')}
            >
              {t('cart.whyBuy')}
            </button>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-32 bg-white dark:bg-gray-900">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">{t('cart.empty')}</div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 mb-6 border-b pb-4">
                <div className="w-20 h-20 flex items-center justify-center bg-white">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain object-center rounded" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-base truncate text-gray-900 dark:text-gray-100">{product.name}</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300 font-bold">R$ {product.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="border rounded px-2 py-1 text-gray-700 dark:text-blue-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}>-</button>
                    <span className="text-gray-900 dark:text-gray-100">{quantity}</span>
                    <button className="border rounded px-2 py-1 text-gray-700 dark:text-blue-200 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800" onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button className="text-red-500 hover:text-red-700 dark:text-red-300 dark:hover:text-red-400" onClick={() => removeFromCart(product.id)}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="text-xs text-gray-500 dark:text-gray-200 mt-2">{t('cart.subtotal')}: R$ {(product.price * quantity).toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold text-gray-900 dark:text-gray-100">{t('cart.subtotal')}:</span>
            <span className="font-semibold text-gray-900 dark:text-gray-100">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{t('cart.total')}:</span>
            <span className="font-bold text-lg text-blue-900 dark:text-blue-300">R$ {subtotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-blue-900 dark:bg-blue-800 hover:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold py-3 rounded transition-colors text-lg"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            {t('cart.checkout')}
          </button>
        </div>
      </div>
      <CheckoutModal open={checkoutOpen} onClose={handleCloseCheckout} />
      {convinceOpen && (
        <div className="fixed inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl dark:shadow-black w-full max-w-md p-6 relative flex flex-col">
            <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300" onClick={handleCloseConvince}>✕</button>
            <h4 className="text-lg font-bold mb-4 text-blue-700 dark:text-blue-300">{t('cart.whyBuyTitle')}</h4>
            <div className="flex-1 overflow-y-auto mb-4 max-h-60 border rounded p-2 bg-gray-50 dark:bg-gray-800">
              {convinceLoading ? (
                <div className="text-gray-400 dark:text-gray-300">{t('common.loading')}</div>
              ) : (
                <span className="text-gray-800 dark:text-gray-100 whitespace-pre-line">{convinceText}</span>
              )}
            </div>
            <button
              className="bg-blue-700 dark:bg-blue-800 text-white px-4 py-2 rounded mt-2 self-end"
              onClick={handleCloseConvince}
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SidebarCart; 