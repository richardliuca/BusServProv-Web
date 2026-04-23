import { Background } from '@/background/Background';
import { Section } from '@/layout/Section';

const PricingSection = () => (
    <Background color="bg-cornsilk">
      <Section
        title="Pricing"
        id="pricing"
      >
        <div className="mx-auto max-w-xl">
          <p>Pricing</p>
        </div>
      </Section>
    </Background>
);

export { PricingSection };
