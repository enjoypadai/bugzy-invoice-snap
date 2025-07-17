import { products, Product } from '@/data/products';
import ProductCard from './ProductCard';

interface ProductSectionProps {
  category: 'male' | 'female' | 'professional' | 'accessories';
  title: string;
  id: string;
}

const ProductSection = ({ category, title, id }: ProductSectionProps) => {
  const categoryProducts = category === 'accessories' 
    ? products.filter(p => p.type === 'accessory')
    : products.filter(p => p.category === category);

  return (
    <section id={id} className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-bee-black">{title}</h2>
          <div className="w-24 h-1 bg-bee-yellow mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {categoryProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No products available in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;