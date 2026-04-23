import { AppConfig } from '../utils/AppConfig';

type ILogoProps = {
  xl?: boolean;
};

const Logo = (props: ILogoProps) => {
  const size = props.xl ? '88' : '64';
  const fontStyle = props.xl
    ? 'font-semibold text-3xl'
    : 'font-semibold text-xl';

  return (
    <span className={`inline-flex items-center text-black-forest ${fontStyle}`}>
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
