import { Button } from '@/button/Button';
import { Section } from '@/layout/Section';
import { AppConfig } from '@/utils/AppConfig';

const Banner = () => (
  <div className="bg-linen">
    <Section yPadding="py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-800 via-primary-900 to-cocoa px-6 py-14 text-center shadow-2xl shadow-primary-900/25 sm:px-16 sm:py-20">
        {/* Soft warm glow accents */}
        <div
          className="pointer-events-none absolute -left-24 -top-24 size-72 rounded-full bg-primary-500/25 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-28 -right-20 size-80 rounded-full bg-primary-400/20 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-display text-3xl font-semibold tracking-tight text-linen sm:text-5xl">
            Ready for some detox and relaxation?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-linen/75">
            Call or text us today to book your appointment — walk-ins are
            always welcome too.
          </p>
          <div className="mt-9">
            <a href={`tel:${AppConfig.phoneTel}`}>
              <Button xl variant="light">
                Call or text {AppConfig.phoneDisplay}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </Section>
  </div>
);

export { Banner };
