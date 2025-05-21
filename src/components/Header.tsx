import React, { useState } from 'react';
import SidebarCart from './SidebarCart';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="flex items-center justify-between px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-600 text-white shadow-md">
        <h1 className="m-0 text-2xl font-bold tracking-wide">Rocketlab</h1>
        <button
          className="bg-transparent border-none cursor-pointer p-2 flex items-center relative hover:text-blue-200 transition-colors"
          aria-label="Carrinho"
          onClick={() => setCartOpen(true)}
        >
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-.55L21 7M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
          </svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
              {totalItems}
            </span>
          )}
        </button>
      </header>
      <SidebarCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
