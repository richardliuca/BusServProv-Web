import type { ReactNode } from 'react';

type ISectionProps = {
  /** Small uppercase label rendered above the title (e.g. “Our services”). */
  eyebrow?: string;
  title?: string;
  description?: string;
  yPadding?: string;
  children: ReactNode;
  id?: string;
  /** Set when the section sits on a dark surface so headings invert. */
  onDark?: boolean;
};

const Section = (props: ISectionProps) => (
  <div
    id={props.id}
    className={`mx-auto max-w-6xl px-4 sm:px-6 ${
      props.yPadding ? props.yPadding : 'py-16 sm:py-24'
    }`}
  >
    {(props.eyebrow || props.title || props.description) && (
      <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
        {props.eyebrow && (
          <span
            className={`text-sm font-semibold uppercase tracking-[0.2em] ${
              props.onDark ? 'text-primary-300' : 'text-primary-600'
            }`}
          >
            {props.eyebrow}
          </span>
        )}
        {props.title && (
          <h2
            className={`mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl ${
              props.onDark ? 'text-linen' : 'text-ink'
            }`}
          >
            {props.title}
          </h2>
        )}
        {props.description && (
          <p
            className={`mt-4 text-lg leading-relaxed ${
              props.onDark ? 'text-linen/70' : 'text-ink-soft'
            }`}
          >
            {props.description}
          </p>
        )}
      </div>
    )}

    {props.children}
  </div>
);

export { Section };
