import { ServiceCard } from '@/feature/ServiceCard';
import { Section } from '@/layout/Section';

const VerticalFeatures = () => (
  <div className="bg-linen">
    <Section
      eyebrow="Our services"
      title="Time-honored therapies, modern comfort"
      description="Chinese-influenced reflexology, massage, and therapeutic treatments passed down through generations."
      id="services"
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <ServiceCard
          title="Reflexology"
          description="Unlocking your body’s natural healing through the map of your soles."
          image="/assets/images/reflexology.webp"
          imageAlt="Therapist performing a foot reflexology massage"
          imageClassName="-translate-x-[3%]"
        />
        <ServiceCard
          title="Meridian Acupressure"
          description="Deep tissue relief that balances your body through meridian mapping."
          image="/assets/images/massage_oil.webp"
          imageAlt="Warm massage oil poured into an open palm"
          imageClassName="translate-x-[12%]"
        />
        <ServiceCard
          title="Gua Sha & Cupping"
          description="Lifting the weight of stress off your shoulders, one cup at a time."
          image="/assets/images/cupping.webp"
          imageAlt="Fire cupping therapy glass cup"
        />
      </div>
    </Section>
  </div>
);

export { VerticalFeatures };
