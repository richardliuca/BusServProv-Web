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

/** Full class strings for Tailwind JIT (no dynamic `from-${…}`). */
const imageBackgroundOverlayClasses = {
  /** Gentle vertical scrim: slightly darker top and bottom for nav + hero copy. */
  'soft-vignette':
    'pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-white/10 to-white/15',
  /** Darker lift from the bottom only; leaves the top lighter for the photo to breathe. */
  'bottom-scrim':
    'pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-950/60 via-primary-950/20 to-transparent',
} as const;

export type ImageBackgroundOverlayVariant = keyof typeof imageBackgroundOverlayClasses;

type IImageBackgroundProps = {
  children: ReactNode;
  /** Public path (e.g. `/assets/hero_blur.jpg`) or full URL for `background-image`. */
  src: string;
  /** Extra classes on the wrapper (layout, min-height, etc.). */
  className?: string;
  /** Optional gradient layer above the photo, below children, for text contrast. */
  overlayVariant?: ImageBackgroundOverlayVariant;
};

const ImageBackground = (props: IImageBackgroundProps) => {
  const overlay = props.overlayVariant;

  return (
    <div
      className={`relative bg-cover bg-center bg-no-repeat ${props.className ?? ''}`.trim()}
      style={{ backgroundImage: `url(${JSON.stringify(props.src)})` }}
    >
      {overlay !== undefined && (
        <div className={imageBackgroundOverlayClasses[overlay]} aria-hidden />
      )}
      <div className="relative z-10">{props.children}</div>
    </div>
  );
};

export { ImageBackground };
