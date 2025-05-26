import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaTruck, FaSearch } from 'react-icons/fa';

interface ShippingCalculatorProps {
  onCalculate?: (cep: string, result: string) => void;
}

const ShippingCalculator: React.FC<ShippingCalculatorProps> = ({ onCalculate }) => {
  const { t } = useTranslation();
  const [cep, setCep] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState('');

  const checkCep = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        return { 
          valid: true,
          city: data.localidade
        };
      }
      return { valid: false };
    } catch {
      return { valid: false };
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setResult(null);
    try {
      const info = await checkCep(cep);
      if (!info.valid) {
        setError('CEP não encontrado ou inválido.');
        if (onCalculate) onCalculate(cep, 'error');
        return;
      }
      setResult(t('shipping.deliveryAvailable', { city: info.city }));
      if (onCalculate) onCalculate(cep, 'ok');
    } catch {
      setError('CEP não encontrado ou inválido.');
      if (onCalculate) onCalculate(cep, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.slice(0, 8); // Apenas CEPs brasileiros
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-blue-600 dark:text-blue-400">
          <FaTruck color="currentColor" />
        </span>
        <h3 className="font-semibold text-gray-900 dark:text-white">{t('shipping.calculate')}</h3>
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={cep}
          onChange={(e) => setCep(formatCep(e.target.value))}
          placeholder={t('shipping.cepPlaceholder')}
          className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
            focus:ring-2 focus:ring-blue-500 focus:border-transparent
            dark:bg-gray-700 dark:text-white"
          maxLength={8}
        />
        <button
          type="submit"
          disabled={cep.length !== 8 || isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
            disabled:bg-gray-400 disabled:cursor-not-allowed
            dark:bg-blue-700 dark:hover:bg-blue-800
            flex items-center gap-2 transition-colors"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="text-white dark:text-white">
              <FaSearch color="currentColor" />
            </span>
          )}
          {t('shipping.calculate')}
        </button>
      </form>
      {result && (
        <p className="mt-2 text-green-700 dark:text-green-400 text-sm">{result}</p>
      )}
      {error && (
        <p className="mt-2 text-red-600 dark:text-red-400 text-sm">{error}</p>
      )}
    </div>
  );
};

export default ShippingCalculator; 