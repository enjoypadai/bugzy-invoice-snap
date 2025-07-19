export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'male' | 'female' | 'professional';
  type: 'shirt' | 'accessory';
  description: string;
  sizes?: string[];
  colors?: string[];
}

import productsData from './products.json';

export const products: Product[] = productsData as Product[];