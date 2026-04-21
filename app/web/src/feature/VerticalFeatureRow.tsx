import classNames from 'classnames';
import Image from 'next/image';

type IVerticalFeatureRowProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

const VerticalFeatureRow = (props: IVerticalFeatureRowProps) => {
  const verticalFeatureClass = classNames(
    'mt-20',
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
        <h3 className="text-3xl font-semibold text-gray-900">{props.title}</h3>
        <div className="mt-6 text-xl leading-9">{props.description}</div>
      </div>

      <div className="relative h-56 w-full p-6 sm:w-1/2 sm:h-72">
        <Image
          src={props.image}
          alt={props.imageAlt}
          fill
          className="object-contain"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>
    </div>
  );
};

export { VerticalFeatureRow };
