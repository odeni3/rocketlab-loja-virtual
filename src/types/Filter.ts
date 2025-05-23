import type { Product } from './Product';

export interface FilterState {
  searchName: string;
  minPrice: string;
  maxPrice: string;
  onlyDiscounted: boolean;
  sortBy: 'price' | 'name' | 'discount';
  sortOrder: 'asc' | 'desc';
}

export interface ProductFiltersProps {
  products: Product[];
  onFilterChange: (filteredProducts: Product[]) => void;
} 