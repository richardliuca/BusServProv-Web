import Image from 'next/image';

import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
  /** Use when logo is rendered on a dark/photo background. */
  onDark?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? 56 : 44;
  const fontStyle = props.xl ? 'text-2xl' : 'text-xl';
  const colorStyle = props.onDark ? 'text-linen' : 'text-ink';

  return (
    <span
      className={`inline-flex items-center gap-2.5 font-display font-semibold tracking-tight ${colorStyle} ${fontStyle}`}
    >
      <Image
        src="/assets/logo/logo.png"
        alt={`${AppConfig.site_name} logo`}
        width={size}
        height={size}
        className="shrink-0"
      />
      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
