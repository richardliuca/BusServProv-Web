import Image from 'next/image';

import { Button } from '@/button/Button';
import { AppConfig } from '@/utils/AppConfig';

const HIGHLIGHTS = [
  'Walk-ins welcome',
  'Traditional Chinese techniques',
  'In the heart of Chinatown',
];

const Hero = () => (
  <section id="home" className="relative min-h-[560px] overflow-hidden sm:min-h-[680px]">
    <Image
      src="/assets/images/hero_bg.webp"
      alt="Massage therapist working in a warm candle-lit room"
      fill
      priority
      sizes="100vw"
      className="object-cover object-[50%_25%]"
    />
    {/* Warm scrim: readable text on the left, photo breathing on the right */}
    <div
      className="absolute inset-0 bg-gradient-to-r from-cocoa/90 via-cocoa/60 to-cocoa/20"
      aria-hidden
    />
    <div
      className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cocoa/70 to-transparent"
      aria-hidden
    />

    <div className="relative z-10 mx-auto flex min-h-[560px] max-w-6xl flex-col justify-center px-4 py-20 sm:min-h-[680px] sm:px-6 sm:py-28">
      <div className="max-w-2xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-linen/25 bg-linen/10 px-4 py-1.5 text-sm font-medium text-linen/90 backdrop-blur-sm">
          <span className="size-1.5 rounded-full bg-primary-300" aria-hidden />
          Your local mom &amp; pop massage studio
        </span>

        <h1 className="mt-6 font-display text-5xl font-semibold leading-hero tracking-tight text-linen sm:text-6xl">
          Unwind, restore,
          <br />
          <span className="text-primary-300">and feel at home.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-linen/85 sm:text-xl">
          Chinese-influenced reflexology, acupressure, and therapeutic massage
          in the heart of Los Angeles Chinatown. Come let us help you relieve
          stress and relax in serenity.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a href={`tel:${AppConfig.phoneTel}`}>
            <Button xl>Call or text {AppConfig.phoneDisplay}</Button>
          </a>
          <a href="#services">
            <Button xl variant="light">
              Explore services
            </Button>
          </a>
        </div>

        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-linen/70">
          {HIGHLIGHTS.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-4 text-primary-300"
                aria-hidden
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export { Hero };
