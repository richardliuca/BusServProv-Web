import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
  /** When set, wraps the headline and description in one block (e.g. frosted panel on a photo hero). */
  headlineWrapClassName?: string;
};

const HeroOneButton = (props: IHeroOneButtonProps) => {
  const headline = (
    <h1 className="whitespace-pre-line text-5xl font-bold leading-hero text-black-forest">
      {props.title}
    </h1>
  );

  const description = (
    <div
      className={`text-2xl text-primary-900 ${props.headlineWrapClassName !== undefined ? 'mt-4' : 'mb-16 mt-4'}`}
    >
      {props.description}
    </div>
  );

  const headlineBlock =
    props.headlineWrapClassName !== undefined ? (
      <div className={`${props.headlineWrapClassName} mb-16`}>
        {headline}
        {description}
      </div>
    ) : (
      <>
        {headline}
        {description}
      </>
    );

  return (
    <header className="text-center">
      {headlineBlock}
      {props.button}
    </header>
  );
};

export { HeroOneButton };
