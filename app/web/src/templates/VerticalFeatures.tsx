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
        image="/assets/images/feature.svg"
        imageAlt="Vetted providers"
      />
      <VerticalFeatureRow
        title="Meridian Acupressure Massage"
        description="Deep tissue relief that balances your body through meridian mapping"
        image="/assets/images/feature2.svg"
        imageAlt="Durable workflows"
        reverse
      />
      <VerticalFeatureRow
        title="Guasha or Cupping Therapy"
        description="Lifting the weight of the stress off your shoulders, one cup at a time"
        image="/assets/images/feature3.svg"
        imageAlt="Secure architecture"
      />
    </Section>
  </Background>
);

export { VerticalFeatures };
