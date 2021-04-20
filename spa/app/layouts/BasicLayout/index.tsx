import React, { PropsWithChildren } from 'react';

const BasicLayout: React.FC = ({ children }: PropsWithChildren<any>) => (
  <div>
    <div>{children}</div>
  </div>
);

export default BasicLayout;
