import classNames from 'classnames';
import type { ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  /** `emphasis` — slightly darker fill (e.g. CTA on tinted banner). */
  variant?: 'default' | 'emphasis';
  children: ReactNode;
};

const Button = (props: IButtonProps) => (
  <span
    className={classNames(
      'inline-block rounded-md text-center font-semibold text-white transition-colors',
      props.variant === 'emphasis'
        ? 'bg-primary-600 hover:bg-primary-700'
        : 'bg-primary-500 hover:bg-primary-600',
      props.xl ? 'px-6 py-4 text-xl font-extrabold' : 'px-4 py-2 text-lg',
    )}
  >
    {props.children}
  </span>
);

export { Button };
