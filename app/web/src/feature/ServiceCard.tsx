import classNames from 'classnames';
import Image from 'next/image';

type IServiceCardProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Extra classes for the photo, e.g. a translate to re-center an off-center vignette. */
  imageClassName?: string;
};

const ServiceCard = (props: IServiceCardProps) => (
  <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary-900/10">
    {/* Photos have a circular vignette fading to white, so a white stage blends seamlessly */}
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
      <Image
        src={props.image}
        alt={props.imageAlt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={classNames(
          'scale-125 object-cover object-center transition-transform duration-500 group-hover:scale-[1.32]',
          props.imageClassName,
        )}
      />
    </div>

    <div className="flex flex-1 flex-col gap-3 px-7 pb-8 pt-2 text-center">
      <h3 className="font-display text-2xl font-semibold text-ink">
        {props.title}
      </h3>
      <p className="text-base leading-relaxed text-ink-soft">
        {props.description}
      </p>
    </div>
  </article>
);

export { ServiceCard };
