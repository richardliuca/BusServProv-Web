import Link from 'next/link';

import { AppConfig } from '@/utils/AppConfig';
import { Logo } from '@/templates/Logo';

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#location', label: 'Location' },
];

const Navbar = () => (
  <header className="sticky top-0 z-50 border-b border-ink/5 bg-linen/85 backdrop-blur-md">
    <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
      <Link href="/" aria-label={`${AppConfig.site_name} home`}>
        <Logo />
      </Link>

      <nav className="hidden md:block">
        <ul className="flex items-center gap-8 text-base font-medium text-ink-soft">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                className="transition-colors hover:text-primary-600"
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <a
        href={`tel:${AppConfig.phoneTel}`}
        className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-primary-50 shadow-md shadow-primary-600/20 transition-all hover:-translate-y-0.5 hover:bg-primary-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-4"
          aria-hidden
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        <span className="hidden sm:inline">{AppConfig.phoneDisplay}</span>
        <span className="sm:hidden">Call us</span>
      </a>
    </div>
  </header>
);

export { Navbar };
