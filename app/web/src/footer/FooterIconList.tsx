import type { ReactNode } from 'react';

type IFooterIconListProps = {
  children: ReactNode;
};

const FooterIconList = (props: IFooterIconListProps) => (
  <div className="flex flex-wrap gap-3 [&_svg]:h-10 [&_svg]:w-10 [&_svg]:fill-current">
    {props.children}
  </div>
);

export { FooterIconList };
