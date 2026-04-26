import classNames from 'classnames';
import Image from 'next/image';

type IVerticalFeatureRowProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  imageClassName?: string;
  reverse?: boolean;
};

const VerticalFeatureRow = (props: IVerticalFeatureRowProps) => {
  const verticalFeatureClass = classNames(
    'mt-2',
    'sm:mt-20',
    'flex',
    'flex-wrap',
    'items-center',
    {
      'flex-row-reverse': props.reverse,
    },
  );

  return (
    <div className={verticalFeatureClass}>
      <div className="w-full text-center sm:w-1/2 sm:px-6">
        <h3 className="text-3xl font-semibold text-black-forest">{props.title}</h3>
        <div className="mt-6 text-xl leading-9 text-primary-900">{props.description}</div>
      </div>

      <div className="relative w-full p-2 sm:w-1/2 sm:p-6">
        <div className="relative mx-auto w-full max-w-xl sm:max-w-none">
          <div className="relative h-64 w-full sm:h-auto sm:aspect-[16/10]">
        <Image
          src={props.image}
          alt={props.imageAlt}
          fill
          style={{ objectFit: 'contain' }}
          className={classNames('object-contain object-center', props.imageClassName)}
          sizes="(max-width: 640px) 100vw, 50vw"
        />
          </div>
        </div>
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
