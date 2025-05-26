import React, { useState, useEffect } from 'react';
import SidebarCart from './SidebarCart';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [cartOpen, setCartOpen] = useState(false);
  const { totalItems } = useCart();
  const [darkMode, setDarkMode] = useState(() => {
    // Verifica se existe um tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Se não houver tema salvo, verifica a preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const currentLanguage = i18n.language;

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'pt' ? 'en' : 'pt';
    i18n.changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Adiciona listener para mudanças no tema do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      // Só muda o tema se não houver um tema salvo no localStorage
      if (!localStorage.getItem('theme')) {
        setDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <>
      <header className="backdrop-blur-md bg-gradient-to-r from-blue-900/100 via-blue-800/85 to-blue-700/85 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 shadow-2xl border-b border-blue-900/30 dark:border-gray-800 px-8 py-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/10 shadow-lg">
            🚀
          </span>
          <h1 className="text-2xl font-extrabold tracking-wider text-white dark:text-gray-100 drop-shadow-lg select-none">{t('header.storeName')}</h1>
        </div>
        <div className="flex items-center gap-6">
          <Link
            to="/pedidos"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/15 hover:bg-white/30 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 text-white dark:text-gray-100 font-semibold shadow transition-all duration-200"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
            </svg>
            {t('header.orders')}
          </Link>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/15 hover:bg-white/30 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 text-white dark:text-gray-100 font-semibold shadow transition-all duration-200"
            title={currentLanguage === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            {currentLanguage === 'pt' ? (
              <>
                <span className="text-lg">🇧🇷</span>
                <span className="text-sm">PT</span>
              </>
            ) : (
              <>
                <span className="text-lg">🇺🇸</span>
                <span className="text-sm">EN</span>
              </>
            )}
          </button>
          <button
            className={`relative w-14 h-8 flex items-center rounded-full transition-colors duration-300 focus:outline-none
              ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label={t('header.toggleDarkMode')}
            type="button"
          >
            <span
              className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center transition-all duration-300
                ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}
            >
              {darkMode ? (
                // Ícone de lua
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-800">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
                </svg>
              ) : (
                // Ícone de sol
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-yellow-500">
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                </svg>
              )}
            </span>
          </button>
          <button
            className="relative bg-white/15 hover:bg-white/30 dark:bg-gray-700/60 dark:hover:bg-gray-600/80 border-none cursor-pointer p-3 rounded-full flex items-center transition-all duration-200 shadow-lg"
            aria-label={t('header.cart')}
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
