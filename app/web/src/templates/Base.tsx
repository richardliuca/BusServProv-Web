import { Banner } from './Banner';
import { BookingSection } from './BookingSection';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Sponsors } from './Sponsors';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="text-gray-600 antialiased">
    <Hero />
    <Sponsors />
    <VerticalFeatures />
    <BookingSection />
    <Banner />
    <Footer />
  </div>
);

export { Base };
