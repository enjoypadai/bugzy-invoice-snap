import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive"
      });
      return;
    }

    if (product.colors && product.colors.length > 0 && !selectedColor) {
      toast({
        title: "Please select a color",
        variant: "destructive"
      });
      return;
    }

    dispatch({
      type: 'ADD_ITEM',
      payload: {
        product,
        size: selectedSize || undefined,
        color: selectedColor || undefined
      }
    });

    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart`
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-bee-yellow/20 hover:border-bee-yellow/40">
      <CardContent className="p-4">
        <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-sm line-clamp-2">{product.name}</h3>
            <Badge variant="secondary" className="bg-bee-yellow/20 text-bee-black">
              {product.type}
            </Badge>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-bee-yellow">₹{product.price}</span>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-medium">Size:</label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map(size => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-medium">Color:</label>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="h-8">
                  <SelectValue placeholder="Select color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map(color => (
                    <SelectItem key={color} value={color}>{color}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black font-semibold"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;