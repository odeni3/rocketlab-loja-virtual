import React, { useEffect, useState } from 'react';

interface Order {
  id: number;
  items: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  subtotal: number;
  date: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Histórico de Pedidos</h1>
      {orders.length === 0 ? (
        <div className="text-gray-500">Nenhum pedido realizado ainda.</div>
      ) : (
        <div className="space-y-8">
          {orders.map(order => (
            <div key={order.id} className="border rounded-lg p-4 bg-white shadow">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Pedido #{order.id}</span>
                <span className="text-sm text-gray-500">{order.date}</span>
              </div>
              <div className="divide-y">
                {order.items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex items-center gap-4 py-2">
                    <div className="w-12 h-12 flex items-center justify-center bg-white">
                      <img src={product.image} alt={product.name} className="w-full h-full object-contain object-center rounded" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-xs text-gray-500">x{quantity}</div>
                    </div>
                    <div className="font-semibold">R$ {(product.price * quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-2">
                <span className="font-bold text-blue-900">Total: R$ {order.subtotal.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders; 