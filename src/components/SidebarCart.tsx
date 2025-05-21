import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import CheckoutModal from './CheckoutModal';

interface SidebarCartProps {
  open: boolean;
  onClose: () => void;
}

const SidebarCart: React.FC<SidebarCartProps> = ({ open, onClose }) => {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleCheckout = () => {
    setCheckoutOpen(true);
  };

  const handleCloseCheckout = () => {
    setCheckoutOpen(false);
    onClose();
  };

  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ maxWidth: 400 }}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-.55L21 7M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
            </svg>
            <span className="font-bold text-lg">Seu Carrinho</span>
            <span className="ml-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">{totalItems} itens</span>
          </div>
          <button onClick={onClose} className="text-2xl font-bold text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 pb-32">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 mt-16">Seu carrinho está vazio.</div>
          ) : (
            items.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 mb-6 border-b pb-4">
                <div className="w-20 h-20 flex items-center justify-center bg-white">
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain object-center rounded" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="font-semibold text-base truncate">{product.name}</div>
                    <div className="text-sm text-blue-700 font-bold">R$ {product.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <button className="border rounded px-2 py-1" onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}>-</button>
                    <span>{quantity}</span>
                    <button className="border rounded px-2 py-1" onClick={() => updateQuantity(product.id, quantity + 1)}>+</button>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <button className="text-red-500 hover:text-red-700" onClick={() => removeFromCart(product.id)}>
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <div className="text-xs text-gray-500 mt-2">Subtotal: R$ {(product.price * quantity).toFixed(2)}</div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-white border-t p-4">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Subtotal:</span>
            <span className="font-semibold">R$ {subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span className="font-bold text-lg">Total:</span>
            <span className="font-bold text-lg text-blue-900">R$ {subtotal.toFixed(2)}</span>
          </div>
          <button
            className="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded transition-colors text-lg"
            onClick={handleCheckout}
            disabled={items.length === 0}
          >
            Finalizar compra
          </button>
        </div>
      </div>
      <CheckoutModal open={checkoutOpen} onClose={handleCloseCheckout} />
    </>
  );
};

export default SidebarCart; 