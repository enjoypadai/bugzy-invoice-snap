import { MapPin, Phone, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-bee-black text-bee-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/550e0870-69d6-4e78-9fef-f22e8bda517b.png"
                alt="Bugzy Logo"
                className="w-12 h-12"
              />
              <div>
                <h3 className="text-2xl font-bold text-bee-yellow">BUGZY</h3>
                <p className="text-sm text-gray-300">Bikaner Sweets Lane</p>
              </div>
            </div>
            <p className="text-gray-300">
              Your trusted fashion destination for quality shirts and accessories.
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-bee-yellow">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-bee-yellow mt-0.5" />
                <div className="text-gray-300">
                  <p>Shop no - 7, F6</p>
                  <p>Rainbow Shops Association</p>
                  <p>Sector - 10, Vashi</p>
                  <p>Navi Mumbai - 400703</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-bee-yellow" />
                <span className="text-gray-300">+91 85911 27301</span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-bee-yellow">Business Hours</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-bee-yellow" />
                <span>Mon - Sat: 10:00 AM - 8:00 PM</span>
              </div>
              <p className="ml-8">Sunday: 11:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 BUGZY. All rights reserved. | Made with ❤️ for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;