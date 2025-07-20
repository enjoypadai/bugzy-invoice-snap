import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProductSection from '@/components/ProductSection';
import Footer from '@/components/Footer';
import NotificationBanner from '@/components/NotificationBanner';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <NotificationBanner />
      <ProductSection category="male" title="Men's Collection" id="male" />
      <ProductSection category="female" title="Women's Collection" id="female" />
      <ProductSection category="professional" title="Professional Wear" id="professional" />
      <ProductSection category="accessories" title="Accessories" id="accessories" />
      <Footer />
    </div>
  );
};

export default Index;
