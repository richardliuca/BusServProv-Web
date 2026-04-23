import Link from 'next/link';

import { GradientBackground } from '@/background/Background';
import { Button } from '@/button/Button';
import { HeroOneButton } from '@/hero/HeroOneButton';
import { Section } from '@/layout/Section';
import { NavbarTwoColumns } from '@/navigation/NavbarTwoColumns';
import { AppConfig } from '@/utils/AppConfig';
import { Logo } from './Logo';

const Hero = () => (
  <GradientBackground variant="cornsilk-subtle">
    <Section id="home" yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl />}>
        <li>
          <Link
            className="text-primary-500 transition-colors hover:text-primary-600"
            href="#services"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            className="text-primary-500 transition-colors hover:text-primary-600"
            href="#pricing"
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            className="text-primary-500 transition-colors hover:text-primary-600"
            href="#location"
          >
            Location
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        title={
          <>
            <span className="text-primary-500">{'Local Chinatown Mom and Pop \n'}</span>
            <span className="text-black-forest">{'Spa & Massage Therapist'}</span>
          </>
        }
        description="Come and let us help you relieve stress and relax in serenity."
        button={
          <a href={`tel:${AppConfig.phoneTel}`}>
            <Button xl>Call or Text us for your appointment !</Button>
          </a>
        }
      />
    </Section>
  </GradientBackground>
);

export { Hero };
