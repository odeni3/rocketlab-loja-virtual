import { useState } from 'react';
import axios from 'axios';
import type { Product } from '../types/Product';

interface ProductChatProps {
  product: Product;
  onClose: () => void;
}

export default function ProductChat({ product, onClose }: ProductChatProps) {
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `Você é um assistente de vendas. Responda perguntas sobre o seguinte produto: ${product.name} - ${product.description || ''} - Preço: R$ ${product.price}`,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;
    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:5000/api/chat',
        { messages: newMessages }
      );
      const aiMessage = response.data.choices[0].message;
      setMessages([...newMessages, aiMessage]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: 'Erro ao conectar com a IA.' }]);
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative flex flex-col">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>✕</button>
        <h4 className="text-lg font-bold mb-2">🤖Pergunte ao Assistente Rocketlab sobre: <span className="text-blue-700">{product.name}</span></h4>
        <div className="flex-1 overflow-y-auto mb-4 max-h-60 border rounded p-2 bg-gray-50">
          {messages.slice(1).map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-1 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700'}`}>
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-gray-400">Pensando...</div>}
        </div>
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className="flex-1 border rounded px-2 py-1"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite sua pergunta..."
            disabled={loading}
          />
          <button
            className="bg-blue-700 text-white px-4 py-1 rounded disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
} 

