import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
  /** Use when logo is rendered on a dark/photo background. */
  onDark?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '88' : '64';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';
  const colorStyle = props.onDark
    ? 'text-cornsilk drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]'
    : 'text-black-forest';

  return (
    <span className={`inline-flex items-center ${colorStyle} ${fontStyle}`}>
      <img
        className="mr-2 inline-block"
        src="/assets/logo/logo.png"
        alt={`${AppConfig.site_name} logo`}
        width={size}
        height={size}
      />

      {AppConfig.site_name}
    </span>
  );
};

export { Logo };
