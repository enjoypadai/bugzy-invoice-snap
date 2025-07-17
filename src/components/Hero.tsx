import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-bee-yellow/10 via-background to-bee-yellow/5">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-bee-black leading-tight">
                Welcome to{' '}
                <span className="text-bee-yellow">BUGZY</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                Your one-stop destination for trendy shirts and stylish accessories. 
                Quality fashion at Bikaner Sweets Lane!
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-bee-yellow text-bee-yellow" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Trusted by 1000+ happy customers
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg"
                className="bg-bee-yellow hover:bg-bee-yellow/90 text-bee-black font-semibold"
                onClick={() => document.getElementById('male')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-bee-yellow/30 hover:bg-bee-yellow/10"
                onClick={() => document.getElementById('accessories')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Accessories
              </Button>
            </div>
          </div>
          
          {/* Right Content - Logo */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-bee-yellow/20 rounded-full blur-3xl scale-110"></div>
              <img 
                src="/lovable-uploads/550e0870-69d6-4e78-9fef-f22e8bda517b.png"
                alt="Bugzy Logo"
                className="relative w-64 h-64 lg:w-80 lg:h-80 object-contain animate-pulse"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-bee-yellow/10 rounded-full"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-bee-yellow/5 rounded-full"></div>
    </section>
  );
};

export default Hero;