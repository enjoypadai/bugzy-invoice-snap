import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { CartItem } from '@/contexts/CartContext';
import { useState } from 'react';
import { useTextToSpeech } from '@/hooks/useTextToSpeech';
import { toast } from '@/hooks/use-toast';

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
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState('');
  
  const voiceMessage = "Please share this invoice screenshot to the number +91 85911 27301 to process your order further.";
  
  const { speak, stop, isPlaying, error } = useTextToSpeech({
    text: voiceMessage,
    apiKey: apiKey || undefined,
    voice: "EXAVITQu4vr4xnSDxMaL" // Sarah's voice
  });
  
  const currentDate = new Date().toLocaleDateString('en-IN');
  const currentTime = new Date().toLocaleTimeString('en-IN');

  const handleClose = () => {
    setShowWhatsAppAlert(true);
  };

  const handleFinalClose = () => {
    setShowWhatsAppAlert(false);
    onClose();
  };

  const handlePrint = () => {
    window.print();
    
    // Play voice message after printing
    if (apiKey) {
      setTimeout(() => {
        speak();
      }, 1000); // Small delay to ensure print dialog doesn't interfere
    } else {
      setShowApiKeyInput(true);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Voice feature is now enabled!"
      });
      speak();
    } else {
      toast({
        title: "API Key Required",
        description: "Please enter your ElevenLabs API key",
        variant: "destructive"
      });
    }
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

          <div className="flex flex-col space-y-3">
            {/* Voice Controls */}
            <div className="flex items-center justify-center space-x-2 p-2 bg-bee-yellow/10 rounded-lg">
              <Button
                variant="outline"
                size="sm"
                onClick={apiKey ? speak : () => setShowApiKeyInput(true)}
                disabled={isPlaying}
                className="flex items-center space-x-2"
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                <span>{isPlaying ? 'Playing...' : 'Voice Message'}</span>
              </Button>
              
              {apiKey && isPlaying && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={stop}
                >
                  Stop
                </Button>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKeyInput(true)}
                className="flex items-center space-x-1"
              >
                <Settings className="w-4 h-4" />
                <span className="text-xs">API</span>
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={handlePrint}
                className="flex-1"
              >
                Print & Voice
              </Button>
              <Button 
                onClick={handleClose}
                className="flex-1 bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black"
              >
                Close
              </Button>
            </div>
            
            {error && (
              <p className="text-xs text-destructive text-center">
                Voice Error: {error}
              </p>
            )}
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

      {/* API Key Input Dialog */}
      <Dialog open={showApiKeyInput} onOpenChange={setShowApiKeyInput}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-bee-black">ElevenLabs API Key</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">
              <p>To enable voice announcements, please enter your ElevenLabs API key:</p>
              <p className="mt-2 text-xs">Get your API key from: <span className="font-mono bg-muted px-1 rounded">elevenlabs.io</span></p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apikey">API Key</Label>
              <Input
                id="apikey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                onKeyDown={(e) => e.key === 'Enter' && handleApiKeySubmit()}
              />
            </div>
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowApiKeyInput(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleApiKeySubmit}
                className="flex-1 bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black"
              >
                Save & Play
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Invoice;