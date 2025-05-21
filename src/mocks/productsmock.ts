import type { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Fone de Ouvido Bluetooth',
    price: 199.90,
    oldPrice: 249.90,
    discount: 20,
    description: 'Fone de ouvido sem fio com cancelamento de ruído e bateria de longa duração.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    name: 'Smartwatch Fitness',
    price: 349.99,
    oldPrice: 399.99,
    discount: 13,
    description: 'Acompanhe seus treinos, batimentos cardíacos e notificações do celular.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    name: 'Câmera Instantânea',
    price: 499.00,
    description: 'Capture momentos especiais e revele fotos instantaneamente.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    name: 'Teclado Mecânico RGB',
    price: 299.90,
    oldPrice: 349.90,
    discount: 14,
    description: 'Teclado mecânico com iluminação RGB personalizável e switches de alta performance.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '5',
    name: 'Mouse Gamer',
    price: 159.90,
    description: 'Mouse ergonômico com alta precisão e botões programáveis.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
];
