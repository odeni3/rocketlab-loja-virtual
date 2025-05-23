export interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
}

export interface Order {
  id: number;
  items: Array<{
    product: {
      id: string;
      name: string;
      price: number;
    };
    quantity: number;
  }>;
  subtotal: number;
  date: string;
} 