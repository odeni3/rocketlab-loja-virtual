import React, { useState } from 'react';
import SidebarCart from './SidebarCart';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <>
      <header className="backdrop-blur-md bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-blue-600/80 shadow-2xl border-b border-blue-900/30 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shadow-lg">
            🚀
          </span>
          <h1 className="text-2xl font-extrabold tracking-wider text-white drop-shadow-lg select-none">Rocketlab Loja Virtual</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/pedidos"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold shadow transition-all duration-200"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            Meus Pedidos
          </Link>
          <button
            className="relative bg-white/10 hover:bg-blue-700 border-none cursor-pointer p-3 rounded-full flex items-center transition-all duration-200 shadow-lg"
            aria-label="Carrinho"
            onClick={() => setCartOpen(true)}
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-white">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A1 1 0 007.5 17h9a1 1 0 00.9-.55L21 7M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow animate-bounce">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>
      <SidebarCart open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};

export default Header;
