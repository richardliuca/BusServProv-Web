import { Background } from '@/background/Background';
import { VerticalFeatureRow } from '@/feature/VerticalFeatureRow';
import { Section } from '@/layout/Section';

const VerticalFeatures = () => (
  <Background color="bg-cornsilk">
    <Section
      title="Our Services"
      description="Chinese influenced reflexology, massage, and theraputic treatments."
      id="services"
    >
      <VerticalFeatureRow
        title="Reflexology"
        description="Unlocking your body’s natural healing through the map of your soles"
        image="/assets/images/reflexology.webp"
        imageAlt="foot massage"
        imageClassName="sm:scale-250"
      />
      <VerticalFeatureRow
        title="Meridian Acupressure Massage"
        description="Deep tissue relief that balances your body through meridian mapping"
        image="/assets/images/massage_oil.webp"
        imageAlt="acupressure massage"
        imageClassName="translate-x-12 sm:translate-x-0 sm:scale-250"
        reverse
      />
      <VerticalFeatureRow
        title="Guasha or Cupping Therapy"
        description="Lifting the weight of the stress off your shoulders, one cup at a time"
        image="/assets/images/cupping.webp"
        imageAlt="cupping therapy"
        imageClassName="sm:scale-250"
      />
    </Section>
  </Background>
);

export { VerticalFeatures };
