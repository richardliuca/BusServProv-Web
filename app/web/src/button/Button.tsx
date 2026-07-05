import classNames from 'classnames';
import type { ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  /**
   * `primary`  — copper fill (main CTA)
   * `light`    — warm cream fill for dark surfaces
   * `outline`  — subtle border, transparent fill
   */
  variant?: 'primary' | 'light' | 'outline';
  children: ReactNode;
};

const Button = (props: IButtonProps) => {
  const variant = props.variant ?? 'primary';

  return (
    <span
      className={classNames(
        'inline-flex items-center justify-center gap-2 rounded-full text-center font-semibold transition-all duration-200',
        {
          'bg-primary-600 text-primary-50 shadow-lg shadow-primary-600/25 hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl hover:shadow-primary-600/30':
            variant === 'primary',
          'bg-linen text-ink shadow-lg shadow-black/10 hover:-translate-y-0.5 hover:bg-white':
            variant === 'light',
          'border border-ink/20 bg-transparent text-ink hover:border-ink/40 hover:bg-ink/5':
            variant === 'outline',
        },
        props.xl ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base',
      )}
    >
      {props.children}
    </span>
  );
};

export { Button };
