import { Banner } from './Banner';
import { PricingSection } from './PricingSection';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="text-primary-900 antialiased">
    <Hero />
    <VerticalFeatures />
    <PricingSection />
    <Banner />
    <Footer />
  </div>
);

export { Base };
