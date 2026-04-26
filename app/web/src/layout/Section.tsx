import type { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
  id?: string;
};

const Section = (props: ISectionProps) => (
  <div
    id={props.id}
    className={`mx-auto max-w-screen-lg px-3 ${
      props.yPadding ? props.yPadding : 'py-10 sm:py-16'
    }`}
  >
    {(props.title || props.description) && (
      <div className="mb-3 text-center sm:mb-12">
        {props.title && (
          <h2 className="text-4xl font-bold text-black-forest">{props.title}</h2>
        )}
        {props.description && (
          <div className="mt-4 text-xl text-primary-900 md:px-20">{props.description}</div>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
