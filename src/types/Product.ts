export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    oldPrice?: number;
    discount?: number;
    category: string;
    rating: {
        average: number;
        count: number;
    };
}
  