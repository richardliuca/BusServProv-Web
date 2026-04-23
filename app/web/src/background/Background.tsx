import type { ReactNode } from 'react';

type IBackgroundProps = {
  children: ReactNode;
  color: string;
};

const Background = (props: IBackgroundProps) => (
  <div className={props.color}>{props.children}</div>
);

export { Background };

/** Full class strings so Tailwind can see them at build time (no `from-${…}` interpolation). */
const gradientBackgroundClasses = {
  /** Warm paper base with a slight deepen toward the bottom */
  'cornsilk-subtle': 'bg-gradient-to-b from-cornsilk to-primary-100',
  'cornsilk-to-forest': 'bg-gradient-to-b from-cornsilk to-black-forest',
  'tiger-to-forest': 'bg-gradient-to-b from-primary-400 to-black-forest',
  'forest-to-deep': 'bg-gradient-to-b from-black-forest to-primary-950',
  'cornsilk-to-copper': 'bg-gradient-to-b from-cornsilk to-copper',
} as const;

export type GradientBackgroundVariant = keyof typeof gradientBackgroundClasses;

type IGradientBackgroundProps = {
  children: ReactNode;
  /** Pick a preset; add new keys + class strings here when you need more gradients. */
  variant?: GradientBackgroundVariant;
};

const GradientBackground = (props: IGradientBackgroundProps) => (
  <div className={gradientBackgroundClasses[props.variant ?? 'cornsilk-subtle']}>
    {props.children}
  </div>
);

export { GradientBackground };
