import { useState } from 'react';
import axios from 'axios';
import type { Product } from '../types/Product';
import { useTranslation } from 'react-i18next';

interface ProductChatProps {
  product: Product;
  onClose: () => void;
}

export default function ProductChat({ product, onClose }: ProductChatProps) {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    {
      role: 'system',
      content: `${t('chat.systemPrompt')}: ${product.name} - ${product.description || ''} - ${t('product.price')}: R$ ${product.price}`,
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
        'http://localhost:5001/api/chat',
        { messages: newMessages }
      );
      const aiMessage = response.data.choices[0].message;
      setMessages([...newMessages, aiMessage]);
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: t('chat.error') }]);
    }
    setLoading(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 dark:bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl dark:shadow-black w-full max-w-md p-6 relative flex flex-col">
        <button className="absolute top-2 right-2 text-gray-500 dark:text-gray-300" onClick={onClose}>✕</button>
        <h4 className="text-lg font-bold mb-2 text-blue-700 dark:text-blue-300">
          {t('chat.title')}: <span className="text-blue-700 dark:text-blue-200">{product.name}</span>
        </h4>
        <div className="flex-1 overflow-y-auto mb-4 max-h-60 border rounded p-2 bg-gray-50 dark:bg-gray-800">
          {messages.slice(1).map((msg, i) => (
            <div key={i} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-3 py-1 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
                {msg.content}
              </span>
            </div>
          ))}
          {loading && <div className="text-gray-400 dark:text-gray-300">{t('chat.thinking')}</div>}
        </div>
        <form
          className="flex gap-2"
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className="flex-1 border rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-700"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t('chat.placeholder')}
            disabled={loading}
          />
          <button
            className="bg-blue-700 dark:bg-blue-800 text-white px-4 py-1 rounded disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {t('chat.send')}
          </button>
        </form>
      </div>
    </div>
  );
} 

