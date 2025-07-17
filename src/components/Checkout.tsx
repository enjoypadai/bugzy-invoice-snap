import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { CartItem, useCart } from '@/contexts/CartContext';
import { toast } from '@/hooks/use-toast';
import Invoice from './Invoice';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  total: number;
}

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

const Checkout = ({ isOpen, onClose, cartItems, total }: CheckoutProps) => {
  const { dispatch } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const generateOrderNumber = () => {
    return 'BUG' + Date.now().toString().slice(-6);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate order processing
    setTimeout(() => {
      const newOrderNumber = generateOrderNumber();
      setOrderNumber(newOrderNumber);
      setIsProcessing(false);
      setShowInvoice(true);
      
      toast({
        title: "Order Placed Successfully!",
        description: `Your order ${newOrderNumber} has been confirmed`,
      });
    }, 2000);
  };

  const handleInvoiceClose = () => {
    setShowInvoice(false);
    dispatch({ type: 'CLEAR_CART' });
    onClose();
    setCustomerInfo({ name: '', phone: '', email: '', address: '' });
  };

  return (
    <>
      <Dialog open={isOpen && !showInvoice} onOpenChange={onClose}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-bee-black">Checkout</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={customerInfo.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={customerInfo.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                  rows={3}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <h3 className="font-medium">Order Summary</h3>
              {cartItems.map((item, index) => {
                const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
                return (
                  <div key={itemKey} className="flex justify-between text-sm">
                    <span>{item.name} × {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                );
              })}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-bee-yellow">₹{total}</span>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black font-semibold"
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Invoice
        isOpen={showInvoice}
        onClose={handleInvoiceClose}
        orderNumber={orderNumber}
        customerInfo={customerInfo}
        cartItems={cartItems}
        total={total}
      />
    </>
  );
};

export default Checkout;