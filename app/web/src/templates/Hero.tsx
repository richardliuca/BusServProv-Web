import Link from 'next/link';

import { Background } from '@/background/Background';
import { Button } from '@/button/Button';
import { HeroOneButton } from '@/hero/HeroOneButton';
import { Section } from '@/layout/Section';
import { NavbarTwoColumns } from '@/navigation/NavbarTwoColumns';
import { Logo } from './Logo';

const Hero = () => (
  <Background color="bg-gray-100">
    <Section yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link href="#booking">Book</Link>
        </li>
        <li>
          <Link href="https://github.com/ixartz/Next-JS-Landing-Page-Starter-Template" rel="noopener noreferrer" target="_blank">
            Template
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            {'Trusted service providers\n'}
            <span className="text-primary-500">for your business & home</span>
          </>
        }
        description="Book vetted professionals with confidence. Your request runs through a durable workflow so nothing gets lost."
        button={
          <Link href="#booking">
            <Button xl>Create a booking request</Button>
          </Link>
        }
      />
    </Section>
  </Background>
);

export { Hero };
