import type { ReactNode } from 'react';

import { FooterCopyright } from './FooterCopyright';
import { FooterIconList } from './FooterIconList';

type ICenteredFooterProps = {
  logo: ReactNode;
  iconList: ReactNode;
  children?: ReactNode;
  belowNav?: ReactNode;
};

const CenteredFooter = (props: ICenteredFooterProps) => (
  <div className="text-center">
    {props.logo}

    {props.children ? (
      <nav>
        <ul className="mt-5 flex flex-row flex-wrap justify-center gap-x-8 text-xl font-medium text-primary-900">
          {props.children}
        </ul>
      </nav>
    ) : null}

    {props.belowNav ? <div className="mt-6">{props.belowNav}</div> : null}

    <div className="mt-8 flex justify-center">
      <FooterIconList>{props.iconList}</FooterIconList>
    </div>

    <div className="mt-8 text-sm">
      <FooterCopyright />
    </div>
  </div>
);

export { CenteredFooter };
