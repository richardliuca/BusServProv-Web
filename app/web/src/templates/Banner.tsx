import Link from 'next/link';

import { Button } from '@/button/Button';
import { CTABanner } from '@/cta/CTABanner';
import { Section } from '@/layout/Section';
import { AppConfig } from '@/utils/AppConfig';

import { Background } from '@/background/Background';

const Banner = () => (
  <Background color="bg-cornsilk">
  <Section>
    <CTABanner
      title="Looking for some detox and relaxation ?"
      subtitle="Call or Text us today at (213) 621-2508 to book your appointment !"
      button={
        <a href={`tel:${AppConfig.phoneTel}`}>
          <Button variant="emphasis">Get started</Button>
        </a>
        }
      />
    </Section>
  </Background>
);


export { Banner };
