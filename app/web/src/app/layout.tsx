import type { Metadata } from 'next';
import { Fraunces, Manrope } from 'next/font/google';

import { AppConfig } from '@/utils/AppConfig';

import '@/styles/global.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={AppConfig.locale} className={`${manrope.variable} ${fraunces.variable}`}>
      <body className="bg-linen font-sans text-ink">{children}</body>
    </html>
  );
}
