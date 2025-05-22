import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { products } from '../mocks/productsmock';
import type { Product } from '../types/Product';

export const useTranslatedProducts = () => {
  const { i18n } = useTranslation();
  const [translatedProducts, setTranslatedProducts] = useState<Product[]>(products);

  useEffect(() => {
    const updateProducts = () => {
      const updatedProducts = products.map(product => ({
        ...product,
        name: i18n.t(`products:products.${product.id}.name`),
        description: i18n.t(`products:products.${product.id}.description`)
      }));
      setTranslatedProducts(updatedProducts);
    };

    updateProducts();
    i18n.on('languageChanged', updateProducts);

    return () => {
      i18n.off('languageChanged', updateProducts);
    };
  }, [i18n]);

  return translatedProducts;
}; 