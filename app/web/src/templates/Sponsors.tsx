import Image from 'next/image';

import { Section } from '@/layout/Section';

/** Partner strip using assets shipped with the ixartz starter (public paths). */
const Sponsors = () => (
  <Section
    title="Built with proven tools"
    description="This stack combines the ixartz landing template structure with Next.js, Tailwind, and Temporal."
  >
    <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8">
      <a href="https://www.coderabbit.ai" rel="noopener noreferrer" target="_blank">
        <Image
          src="/assets/images/coderabbit-logo-light.svg"
          alt="CodeRabbit"
          width={200}
          height={80}
          className="h-auto w-44 object-contain"
        />
      </a>
      <a href="https://arcjet.com" rel="noopener noreferrer" target="_blank">
        <Image
          src="/assets/images/arcjet-light.svg"
          alt="Arcjet"
          width={200}
          height={80}
          className="h-auto w-44 object-contain"
        />
      </a>
      <a href="https://codecov.io" rel="noopener noreferrer" target="_blank">
        <Image
          src="/assets/images/codecov-dark.svg"
          alt="Codecov"
          width={200}
          height={80}
          className="h-auto w-44 object-contain"
        />
      </a>
    </div>
  </Section>
);

export { Sponsors };
