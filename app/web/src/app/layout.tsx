import type { Metadata } from 'next';

import { AppConfig } from '@/utils/AppConfig';

import '@/styles/global.css';

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
    <html lang={AppConfig.locale}>
      <body>{children}</body>
    </html>
  );
}
