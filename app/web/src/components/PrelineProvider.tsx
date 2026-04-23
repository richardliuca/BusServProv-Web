'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function PrelineProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;

    void import('preline').then(({ HSStaticMethods }) => {
      if (cancelled) {
        return;
      }
      HSStaticMethods.cleanCollection();
      HSStaticMethods.autoInit();
    });

    return () => {
      cancelled = true;
    };
  }, [pathname]);

  return children;
}
