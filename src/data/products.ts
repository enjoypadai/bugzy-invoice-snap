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

// Fetch products from external API
let cachedProducts: Product[] = [];

const fetchProducts = async (): Promise<Product[]> => {
  if (cachedProducts.length > 0) {
    return cachedProducts;
  }
  
  try {
    const response = await fetch('https://enjoypadai.com/bugzy/products.json');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    const data = await response.json();
    cachedProducts = data as Product[];
    return cachedProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const getProducts = async (): Promise<Product[]> => {
  return await fetchProducts();
};

// For backward compatibility, initialize products as empty array
export const products: Product[] = [];