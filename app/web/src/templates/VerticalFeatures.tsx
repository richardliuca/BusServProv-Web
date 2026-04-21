import { VerticalFeatureRow } from '@/feature/VerticalFeatureRow';
import { Section } from '@/layout/Section';

const VerticalFeatures = () => (
  <Section
    title="Why book with us"
    description="Clear communication, reliable scheduling, and durable workflow tracking behind every request."
  >
    <VerticalFeatureRow
      title="Vetted providers"
      description="We focus on quality matches so you spend less time chasing confirmations and more time on what matters."
      image="/assets/images/feature.svg"
      imageAlt="Vetted providers"
    />
    <VerticalFeatureRow
      title="Workflow-backed requests"
      description="Each booking kicks off a Temporal workflow so progress survives retries, deploys, and busy periods."
      image="/assets/images/feature2.svg"
      imageAlt="Durable workflows"
      reverse
    />
    <VerticalFeatureRow
      title="Same-origin API"
      description="The UI talks to Nest through NGINX on a single origin — simpler cookies, CORS, and local dev that mirrors production."
      image="/assets/images/feature3.svg"
      imageAlt="Secure architecture"
    />
  </Section>
);

export { VerticalFeatures };
