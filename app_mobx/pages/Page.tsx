import React, { FC } from 'react';
import { Helmet } from 'react-helmet';

interface Props {
  title: string;
  link: Array<{}>;
  meta: Array<{}>;
  children: React.ReactNode;
}
const Page: FC<Props> = ({
 title, link, meta, children,
}) => {
  return (
    <div>
      <Helmet title={title} link={link} meta={meta} />
      {children}
    </div>
  );
};

Page.defaultProps = {
  title: '',
  link: [],
  meta: [],
};

export default Page;
