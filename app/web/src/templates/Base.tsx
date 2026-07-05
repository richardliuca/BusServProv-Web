import { Navbar } from '@/navigation/Navbar';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { PricingSection } from './PricingSection';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="antialiased">
    <Navbar />
    <Hero />
    <VerticalFeatures />
    <PricingSection />
    <Banner />
    <Footer />
  </div>
);

export { Base };
