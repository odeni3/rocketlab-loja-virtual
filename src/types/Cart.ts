export interface SidebarCartProps {
  open: boolean;
  onClose: () => void;
}

export interface CartItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
}

export interface ConvinceResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
} 