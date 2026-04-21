import Link from 'next/link';

import { Button } from '@/button/Button';
import { CTABanner } from '@/cta/CTABanner';
import { Section } from '@/layout/Section';

const Banner = () => (
  <Section>
    <CTABanner
      title="Ready to get on the calendar?"
      subtitle="Tell us what you need — we will route it through our booking pipeline."
      button={
        <Link href="#booking">
          <Button>Get started</Button>
        </Link>
      }
    />
  </Section>
);

export { Banner };
