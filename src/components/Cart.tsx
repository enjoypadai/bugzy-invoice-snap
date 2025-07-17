import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useState } from 'react';
import Checkout from './Checkout';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { state, dispatch } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const updateQuantity = (itemId: string, newQuantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: itemId, quantity: newQuantity }
    });
  };

  const removeItem = (itemId: string) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: itemId
    });
  };

  const getItemKey = (item: any) => {
    return `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
  };

  const handleCheckout = () => {
    onClose();
    setIsCheckoutOpen(true);
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle className="text-bee-black">Shopping Cart</SheetTitle>
          </SheetHeader>
          
          <div className="mt-6 space-y-4">
            {state.items.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {state.items.map((item) => {
                    const itemKey = getItemKey(item);
                    return (
                      <div key={itemKey} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">₹{item.price}</p>
                          {item.selectedSize && (
                            <p className="text-xs text-muted-foreground">Size: {item.selectedSize}</p>
                          )}
                          {item.selectedColor && (
                            <p className="text-xs text-muted-foreground">Color: {item.selectedColor}</p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(itemKey, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(itemKey, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeItem(itemKey)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-bee-yellow">₹{state.total}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black font-semibold"
                    onClick={handleCheckout}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Checkout 
        isOpen={isCheckoutOpen} 
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={state.items}
        total={state.total}
      />
    </>
  );
};

export default Cart;