import { useEffect, useState } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { X } from 'lucide-react';

interface Offer {
  id: string;
  message: string;
  amount?: number;
  percentage?: number;
  isActive: boolean;
}

const NotificationBanner = () => {
  const [offer, setOffer] = useState<Offer | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        // Try to fetch offers from API
        const response = await fetch('https://enjoypadai.com/bugzy/offers.json');
        if (response.ok) {
          const data = await response.json();
          const activeOffer = data.offers?.find((offer: Offer) => offer.isActive);
          if (activeOffer) {
            setOffer(activeOffer);
            setIsVisible(true);
          }
        }
      } catch (error) {
        console.log('No offers available:', error);
        // Fallback offer if API is not available
        setOffer({
          id: 'summer-2024',
          message: 'Summer Sale! Buy for $100 to get 20% off your order',
          amount: 100,
          percentage: 20,
          isActive: true
        });
        setIsVisible(true);
      }
    };

    fetchOffer();
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
  };

  if (!offer || !isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-muted/50 to-muted text-foreground">
      <Alert className="border-0 bg-transparent rounded-none relative">
        <div className="flex items-center justify-between w-full">
          <div className="flex-1 overflow-hidden">
            <div className="animate-scroll whitespace-nowrap">
              <AlertDescription className="inline-block text-sm font-medium">
                🎉 {offer.message} - Limited Time Offer!
              </AlertDescription>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="ml-4 flex-shrink-0 p-1 hover:bg-white/10 rounded transition-colors"
            aria-label="Close notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </Alert>
    </div>
  );
};

export default NotificationBanner;