import type { Product } from '../types/Product';
import i18n from 'i18next';

const products: Product[] = [
  {
    id: '1',
    name: i18n.t('products:products.1.name'),
    price: 199.90,
    oldPrice: 249.90,
    discount: 20,
    description: i18n.t('products:products.1.description'),
    image: 'https://m.media-amazon.com/images/I/51olNZRjn+L._AC_UL320_.jpg',
    category: 'periféricos',
    rating: {
      average: 4.5,
      count: 128
    }
  },
  {
    id: '2',
    name: i18n.t('products:products.2.name'),
    price: 349.99,
    oldPrice: 399.99,
    discount: 13,
    description: i18n.t('products:products.2.description'),
    image: 'https://m.media-amazon.com/images/I/51WOvToYRFL._AC_UL320_.jpg',
    category: 'eletrônicos',
    rating: {
      average: 4.2,
      count: 95
    }
  },
  {
    id: '3',
    name: i18n.t('products:products.3.name'),
    price: 499.00,
    description: i18n.t('products:products.3.description'),
    image: 'https://m.media-amazon.com/images/I/61Aj10ec8KL._AC_UL320_.jpg',
    category: 'eletrônicos',
    rating: {
      average: 4.8,
      count: 156
    }
  },
  {
    id: '4',
    name: i18n.t('products:products.4.name'),
    price: 299.90,
    oldPrice: 349.90,
    discount: 14,
    description: i18n.t('products:products.4.description'),
    image: 'https://m.media-amazon.com/images/I/61dNq1QlZeL._AC_UL320_.jpg',
    category: 'periféricos',
    rating: {
      average: 4.0,
      count: 82
    }
  },
  {
    id: '5',
    name: i18n.t('products:products.5.name'),
    price: 159.90,
    description: i18n.t('products:products.5.description'),
    image: 'https://m.media-amazon.com/images/I/51VRu0zm1IL._AC_UL320_.jpg',
    category: 'periféricos',
    rating: {
      average: 4.6,
      count: 112
    }
  },
  {
    id: '6',
    name: i18n.t('products:products.6.name'),
    price: 399.90,
    oldPrice: 449.90,
    discount: 11,
    description: i18n.t('products:products.6.description'),
    image: 'https://m.media-amazon.com/images/I/51qYgtqNzYL._AC_UL320_.jpg',
    category: 'eletrônicos',
    rating: {
      average: 4.3,
      count: 78
    }
  },
  {
    id: '7',
    name: i18n.t('products:products.7.name'),
    price: 709.90,
    oldPrice: 899.90,
    discount: 18,
    description: i18n.t('products:products.7.description'),
    image: 'https://m.media-amazon.com/images/I/71UtHSuA+lL._AC_UL320_.jpg',
    category: 'cadeiras',
    rating: {
      average: 4.7,
      count: 203
    }
  },
  {
    id: '8',
    name: i18n.t('products:products.8.name'),
    price: 179.00,
    description: i18n.t('products:products.8.description'),
    image: 'https://m.media-amazon.com/images/I/51-x6hJw3rL._AC_UL320_.jpg',
    category: 'mídias',
    rating: {
      average: 4.1,
      count: 65
    }
  },
  {
    id: '9',
    name: i18n.t('products:products.9.name'),
    price: 499.90,
    oldPrice: 599.90,
    discount: 17,
    description: i18n.t('products:products.9.description'),
    image: 'https://m.media-amazon.com/images/I/51T-6cdhyaL._AC_UL320_.jpg',
    category: 'eletrônicos',
    rating: {
      average: 4.4,
      count: 91
    }
  },
  {
    id: '10',
    name: i18n.t('products:products.10.name'),
    price: 199.00,
    oldPrice: 299.00,
    discount: 17,
    description: i18n.t('products:products.10.description'),
    image: 'https://m.media-amazon.com/images/I/81eblL3Q6CL._AC_UL320_.jpg',
    category: 'mídias',
    rating: {
      average: 4.9,
      count: 178
    }
  },
  {
    id: '11',
    name: i18n.t('products:products.11.name'),
    price: 349.00,
    description: i18n.t('products:products.11.description'),
    image: 'https://m.media-amazon.com/images/I/71xoR4A6q-L._AC_UL320_.jpg',
    category: 'eletrônicos',
    rating: {
      average: 4.2,
      count: 87
    }
  },
  {
    id: '12',
    name: i18n.t('products:products.12.name'),
    price: 900.90,
    oldPrice: 999.90,
    discount: 17,
    description: i18n.t('products:products.12.description'),
    image: 'https://m.media-amazon.com/images/I/514CxlLuhvL._AC_UL320_.jpg',
    category: 'eletrônicos',
    rating: {
      average: 4.6,
      count: 142
    }
  }
];

export { products };
