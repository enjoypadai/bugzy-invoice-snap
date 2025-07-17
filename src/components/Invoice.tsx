import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { CartItem } from '@/contexts/CartContext';
import { useState } from 'react';

interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface InvoiceProps {
  isOpen: boolean;
  onClose: () => void;
  orderNumber: string;
  customerInfo: CustomerInfo;
  cartItems: CartItem[];
  total: number;
}

const Invoice = ({ isOpen, onClose, orderNumber, customerInfo, cartItems, total }: InvoiceProps) => {
  const [showWhatsAppAlert, setShowWhatsAppAlert] = useState(false);
  
  const currentDate = new Date().toLocaleDateString('en-IN');
  const currentTime = new Date().toLocaleTimeString('en-IN');

  const handleClose = () => {
    setShowWhatsAppAlert(true);
  };

  const handleFinalClose = () => {
    setShowWhatsAppAlert(false);
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen && !showWhatsAppAlert} onOpenChange={handleClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-center text-bee-black">Invoice</DialogTitle>
          </DialogHeader>
          
          <div id="invoice" className="space-y-6 p-6 bg-white text-black">
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center space-x-3">
                <img 
                  src="/lovable-uploads/550e0870-69d6-4e78-9fef-f22e8bda517b.png" 
                  alt="Bugzy Logo" 
                  className="w-16 h-16"
                />
                <div>
                  <h1 className="text-2xl font-bold text-yellow-500">BUGZY</h1>
                  <p className="text-sm text-gray-600">Bikaner Sweets Lane</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Shop no - 7, F6, Rainbow Shops Association</p>
                <p>Sector - 10, Vashi, Navi Mumbai - 400703</p>
              </div>
            </div>

            <Separator className="border-gray-300" />

            {/* Invoice Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Bill To:</h3>
                <div className="space-y-1 text-sm">
                  <p><strong>Name:</strong> {customerInfo.name}</p>
                  <p><strong>Phone:</strong> {customerInfo.phone}</p>
                  {customerInfo.email && <p><strong>Email:</strong> {customerInfo.email}</p>}
                  <p><strong>Address:</strong> {customerInfo.address}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="space-y-1 text-sm">
                  <p><strong>Invoice #:</strong> {orderNumber}</p>
                  <p><strong>Date:</strong> {currentDate}</p>
                  <p><strong>Time:</strong> {currentTime}</p>
                </div>
              </div>
            </div>

            <Separator className="border-gray-300" />

            {/* Items */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Items</h3>
              <div className="space-y-2">
                <div className="grid grid-cols-5 gap-2 font-semibold text-sm border-b border-gray-300 pb-2">
                  <span className="col-span-2">Item</span>
                  <span className="text-center">Qty</span>
                  <span className="text-right">Price</span>
                  <span className="text-right">Total</span>
                </div>
                {cartItems.map((item, index) => {
                  const itemKey = `${item.id}-${item.selectedSize || ''}-${item.selectedColor || ''}`;
                  return (
                    <div key={itemKey} className="grid grid-cols-5 gap-2 text-sm py-2 border-b border-gray-100">
                      <div className="col-span-2">
                        <p className="font-medium">{item.name}</p>
                        {item.selectedSize && <p className="text-xs text-gray-600">Size: {item.selectedSize}</p>}
                        {item.selectedColor && <p className="text-xs text-gray-600">Color: {item.selectedColor}</p>}
                      </div>
                      <span className="text-center">{item.quantity}</span>
                      <span className="text-right">₹{item.price}</span>
                      <span className="text-right">₹{item.price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="border-gray-300" />

            {/* Total */}
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-yellow-600">
                <span>Total: ₹{total}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 mt-8">
              <p>Thank you for shopping with BUGZY!</p>
              <p>For any queries, contact us at the above address</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => window.print()}
              className="flex-1"
            >
              Print Invoice
            </Button>
            <Button 
              onClick={handleClose}
              className="flex-1 bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* WhatsApp Sharing Alert */}
      <AlertDialog open={showWhatsAppAlert} onOpenChange={setShowWhatsAppAlert}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-bee-black">Share Invoice Screenshot</AlertDialogTitle>
            <AlertDialogDescription className="text-center space-y-4">
              <div className="bg-bee-yellow/10 p-4 rounded-lg">
                <p className="font-medium mb-2">📱 Please share a screenshot of your invoice to:</p>
                <p className="text-lg font-bold text-bee-black">+91 85911 27301</p>
                <p className="text-sm text-muted-foreground mt-2">
                  We'll process your order once we receive the screenshot!
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex space-x-3 mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowWhatsAppAlert(false)}
              className="flex-1"
            >
              Go Back
            </Button>
            <Button 
              onClick={handleFinalClose}
              className="flex-1 bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black"
            >
              Got It!
            </Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Invoice;