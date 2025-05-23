export interface Order {
  id: number;
  items: {
    product: {
      id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
  }[];
  subtotal: number;
  date: string;
}