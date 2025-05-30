import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTranslatedProducts } from '../hooks/useTranslatedProducts';
import type { Order } from '../types/Order';

const Orders: React.FC = () => {
  const { t } = useTranslation();
  const translatedProducts = useTranslatedProducts();
  const [orders, setOrders] = useState<Order[]>([]);

  // Aplica o tema salvo no localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const root = window.document.documentElement;
    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      const parsedOrders = JSON.parse(saved);
      // Atualiza os nomes dos produtos com as traduções
      const updatedOrders = parsedOrders.map((order: Order) => ({
        ...order,
        items: order.items.map(item => {
          const translatedProduct = translatedProducts.find(p => p.id === item.product.id);
          if (translatedProduct) {
            return {
              ...item,
              product: {
                ...item.product,
                name: translatedProduct.name
              }
            };
          }
          return item;
        })
      }));
      setOrders(updatedOrders);
    }
  }, [translatedProducts]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300 rounded-2xl shadow-lg">
      <Link
        to="/"
        className="inline-block mb-4 px-4 py-2 rounded-lg bg-blue-700 dark:bg-blue-800 text-white font-semibold shadow hover:bg-blue-800 dark:hover:bg-blue-900 transition-colors"
      >
        ← {t('orders.backToHome')}
      </Link>
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">{t('orders.title')}</h1>
      {orders.length === 0 ? (
        <div className="text-gray-500 dark:text-gray-300">{t('orders.noOrders')}</div>
      ) : (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-white dark:bg-gray-800 shadow dark:shadow-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">{t('orders.orderNumber')} #{order.id}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">{order.date}</span>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {order.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 py-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-white">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain object-center rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">x{quantity}</div>
                    </div>
                    <div className="font-semibold text-gray-900 dark:text-blue-200">R$ {(product.price * quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <span className="font-bold text-blue-900 dark:text-blue-300">{t('orders.total')}: R$ {order.subtotal.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 