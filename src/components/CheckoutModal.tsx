import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useTranslation } from 'react-i18next';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const { items, subtotal, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleConfirm = () => {
    // Salvar pedido no localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const newOrder = {
      id: Date.now(),
      items,
      subtotal,
      date: new Date().toLocaleString(),
    };
    localStorage.setItem('orders', JSON.stringify([newOrder, ...orders]));
    setSuccess(true);
    clearCart();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative">
        <button className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-700" onClick={onClose}>&times;</button>
        {!success ? (
          <>
            <h2 className="text-xl font-bold mb-4">{t('checkout.title')}</h2>
            <div className="mb-4 max-h-60 overflow-y-auto">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex justify-between items-center mb-2">
                  <span className="truncate max-w-[120px]">{product.name} <span className="text-xs text-gray-500">x{quantity}</span></span>
                  <span className="font-semibold">R$ {(product.price * quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>{t('cart.total')}:</span>
              <span className="text-blue-900">R$ {subtotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded transition-colors text-lg"
              onClick={handleConfirm}
            >
              {t('checkout.placeOrder')}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <svg width="56" height="56" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="mb-4 text-green-600"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            <h2 className="text-2xl font-bold text-green-700 mb-2">{t('checkout.success')}</h2>
            <p className="text-gray-600 mb-4">{t('checkout.orderSaved')}</p>
            <button className="bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-6 rounded" onClick={onClose}>{t('common.close')}</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal; 