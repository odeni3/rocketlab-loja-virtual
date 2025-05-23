import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../types/Product';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedProducts';
import type { CartItem, CartContextProps, CartProviderProps } from '../types/CartContext';

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart deve ser usado dentro do CartProvider');
  return ctx;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const { i18n } = useTranslation();
  const translatedProducts = useTranslatedProducts();
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Atualiza os produtos do carrinho quando o idioma mudar
  useEffect(() => {
    setItems(prevItems => 
      prevItems.map(item => {
        const translatedProduct = translatedProducts.find(p => p.id === item.product.id);
        if (translatedProduct) {
          return {
            ...item,
            product: {
              ...item.product,
              name: translatedProduct.name,
              description: translatedProduct.description
            }
          };
        }
        return item;
      })
    );
  }, [i18n.language, translatedProducts]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}; 