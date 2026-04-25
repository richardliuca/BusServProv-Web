import Link from 'next/link';

import { ImageBackground } from '@/background/Background';
import { Button } from '@/button/Button';
import { HeroOneButton } from '@/hero/HeroOneButton';
import { Section } from '@/layout/Section';
import { NavbarTwoColumns } from '@/navigation/NavbarTwoColumns';
import { AppConfig } from '@/utils/AppConfig';
import { Logo } from './Logo';

const Hero = () => (
  <ImageBackground src="/assets/images/hero_bg.webp" overlayVariant="soft-vignette">
    <Section id="home" yPadding="py-6">
      <NavbarTwoColumns logo={<Logo xl onDark />}>
        <li>
          <Link
            className="text-primary-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-colors hover:text-primary-100"
            href="#services"
          >
            Services
          </Link>
        </li>
        <li>
          <Link
            className="text-primary-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-colors hover:text-primary-100"
            href="#pricing"
          >
            Pricing
          </Link>
        </li>
        <li>
          <Link
            className="text-primary-50 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)] transition-colors hover:text-primary-100"
            href="#location"
          >
            Location
          </Link>
        </li>
      </NavbarTwoColumns>
    </Section>

    <Section yPadding="pt-20 pb-32">
      <HeroOneButton
        headlineWrapClassName="inline-block max-w-4xl rounded-2xl border border-primary-50/20 bg-primary-950/45 px-6 py-5 text-left shadow-[0_12px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-10 sm:py-7 sm:text-center"
        title={
          <>
            <span className="block text-primary-50 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
              Local Chinatown Mom and Pop
            </span>
            <span className="mt-2 block text-primary-400 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
              Spa & Massage Therapist
            </span>
          </>
        }
        description={
          <span className="text-olive font-bold leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]">
            Come and let us help you relieve stress and relax in serenity.
          </span>
        }
        button={
          <a href={`tel:${AppConfig.phoneTel}`}>
            <Button xl>Call or Text us for your appointment !</Button>
          </a>
        }
      />
    </Section>
  </ImageBackground>
);

export { Hero };
