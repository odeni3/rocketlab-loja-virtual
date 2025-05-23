import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import type { FilterState, ProductFiltersProps } from '../types/Filter';

const ProductFilters = ({ products, onFilterChange }: ProductFiltersProps) => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<FilterState>({
    searchName: '',
    minPrice: '',
    maxPrice: '',
    onlyDiscounted: false,
    sortBy: 'price',
    sortOrder: 'asc'
  });

  useEffect(() => {
    let filtered = [...products];

    // Aplicar filtro de nome
    if (filters.searchName) {
      const searchTerm = filters.searchName.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm)
      );
    }

    // Aplicar filtro de preço
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice);
      if (!isNaN(minPrice)) {
        filtered = filtered.filter(product => product.price >= minPrice);
      }
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice);
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(product => product.price <= maxPrice);
      }
    }

    // Aplicar filtro de desconto
    if (filters.onlyDiscounted) {
      filtered = filtered.filter(product => (product.discount ?? 0) > 0);
    }

    // Aplicar ordenação
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'discount':
          comparison = (a.discount || 0) - (b.discount || 0);
          break;
      }
      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

    onFilterChange(filtered);
  }, [filters, products, onFilterChange]);

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: string) => {
    // Permitir apenas números e ponto decimal
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFilters(prev => ({ ...prev, [field]: value }));
    }
  };

  return (
    <div className="w-64 space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('filters.title')}</h3>
      
      {/* Campo de Pesquisa */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {t('filters.searchName')}
        </label>
        <input
          type="text"
          value={filters.searchName}
          onChange={(e) => setFilters(prev => ({ ...prev, searchName: e.target.value }))}
          placeholder={t('filters.searchNamePlaceholder')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {/* Filtros de Preço */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('filters.minPrice')}
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={filters.minPrice}
            onChange={(e) => handlePriceChange('minPrice', e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('filters.maxPrice')}
          </label>
          <input
            type="text"
            inputMode="decimal"
            value={filters.maxPrice}
            onChange={(e) => handlePriceChange('maxPrice', e.target.value)}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      {/* Filtro de Desconto */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="onlyDiscounted"
          checked={filters.onlyDiscounted}
          onChange={(e) => setFilters(prev => ({ ...prev, onlyDiscounted: e.target.checked }))}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="onlyDiscounted" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          {t('filters.onlyDiscounted')}
        </label>
      </div>

      {/* Ordenação */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('filters.sortBy')}
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as FilterState['sortBy'] }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="price">{t('filters.sortByPrice')}</option>
            <option value="name">{t('filters.sortByName')}</option>
            <option value="discount">{t('filters.sortByDiscount')}</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {t('filters.sortOrder')}
          </label>
          <select
            value={filters.sortOrder}
            onChange={(e) => setFilters(prev => ({ ...prev, sortOrder: e.target.value as FilterState['sortOrder'] }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="asc">{t('filters.ascending')}</option>
            <option value="desc">{t('filters.descending')}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters; 