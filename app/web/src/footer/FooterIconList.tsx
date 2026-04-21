import type { ReactNode } from 'react';

type IFooterIconListProps = {
  children: ReactNode;
};

const FooterIconList = (props: IFooterIconListProps) => (
  <div className="flex flex-wrap gap-3 [&_a]:text-gray-500 [&_a:hover]:text-gray-700 [&_svg]:h-5 [&_svg]:w-5 [&_svg]:fill-current">
    {props.children}
  </div>
);

export { FooterIconList };
