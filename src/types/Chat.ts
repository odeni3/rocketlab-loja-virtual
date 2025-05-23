import type { Product } from './Product';

export interface ProductChatProps {
  product: Product;
  onClose: () => void;
}

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  choices: Array<{
    message: ChatMessage;
  }>;
} 