import type { Product } from './Product';
import type { ReactNode } from 'react';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextProps {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

export interface CartProviderProps {
  children: ReactNode;
} 