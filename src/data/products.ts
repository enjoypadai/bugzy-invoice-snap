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

export const products: Product[] = [
  // Male Shirts
  {
    id: 'ms1',
    name: 'Classic Cotton Shirt - Blue',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1602810319428-019690571b5b?w=500',
    category: 'male',
    type: 'shirt',
    description: 'Premium cotton shirt perfect for casual wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'White', 'Black']
  },
  {
    id: 'ms2',
    name: 'Formal White Shirt',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
    category: 'male',
    type: 'shirt',
    description: 'Crisp white formal shirt for office wear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Light Pink']
  },
  {
    id: 'ms3',
    name: 'Casual Checkered Shirt',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
    category: 'male',
    type: 'shirt',
    description: 'Trendy checkered pattern casual shirt',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Red Check', 'Blue Check', 'Green Check']
  },

  // Female Shirts
  {
    id: 'fs1',
    name: 'Elegant Silk Blouse',
    price: 1899,
    image: 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=500',
    category: 'female',
    type: 'shirt',
    description: 'Luxurious silk blouse for special occasions',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Cream', 'Rose Gold', 'Navy Blue']
  },
  {
    id: 'fs2',
    name: 'Cotton Casual Top',
    price: 999,
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=500',
    category: 'female',
    type: 'shirt',
    description: 'Comfortable cotton top for everyday wear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'White', 'Lavender']
  },
  {
    id: 'fs3',
    name: 'Designer Kurti',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500',
    category: 'female',
    type: 'shirt',
    description: 'Traditional kurti with modern design',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Yellow', 'Orange', 'Green']
  },

  // Professional
  {
    id: 'ps1',
    name: 'Executive Dress Shirt',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1594938268127-ad5a5ff2b6b4?w=500',
    category: 'professional',
    type: 'shirt',
    description: 'Premium executive shirt for boardroom meetings',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Light Blue', 'Light Gray']
  },
  {
    id: 'ps2',
    name: 'Corporate Blazer Shirt',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500',
    category: 'professional',
    type: 'shirt',
    description: 'Sophisticated shirt perfect under blazers',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Cream', 'Light Blue']
  },

  // Accessories
  {
    id: 'ma1',
    name: 'Leather Watch',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'male',
    type: 'accessory',
    description: 'Classic leather strap watch',
    colors: ['Brown', 'Black', 'Tan']
  },
  {
    id: 'ma2',
    name: 'Designer Sunglasses',
    price: 1599,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500',
    category: 'male',
    type: 'accessory',
    description: 'Stylish sunglasses for sunny days',
    colors: ['Black', 'Brown', 'Silver']
  },
  {
    id: 'fa1',
    name: 'Pearl Necklace Set',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500',
    category: 'female',
    type: 'accessory',
    description: 'Elegant pearl necklace and earring set',
    colors: ['White Pearl', 'Cream Pearl']
  },
  {
    id: 'fa2',
    name: 'Designer Handbag',
    price: 4999,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'female',
    type: 'accessory',
    description: 'Luxury designer handbag',
    colors: ['Black', 'Brown', 'Beige']
  }
];