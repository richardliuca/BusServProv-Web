import classNames from 'classnames';
import type { ReactNode } from 'react';

type IButtonProps = {
  xl?: boolean;
  children: ReactNode;
};

const Button = (props: IButtonProps) => (
  <span
    className={classNames(
      'inline-block rounded-md text-center font-semibold text-white bg-primary-500 transition-colors hover:bg-primary-600',
      props.xl ? 'px-6 py-4 text-xl font-extrabold' : 'px-4 py-2 text-lg',
    )}
  >
    {props.children}
  </span>
);

export { Button };
