import React from 'react';
import { Outlet } from 'react-router-dom';

import Layout from 'antd/es/layout/layout';
import { useScrollTopOnRouteChange } from 'hooks/useScrollTopOnRouteChange';
import { ReactFCC } from 'types/react';
import { Content } from 'ui/components/content/Content';

type TMainWrapper = {
  className?: string;
};

/**
 * Main App's layout
 */
export const LayoutMain: ReactFCC<TMainWrapper> = props => {

  const { className } = props;

  useScrollTopOnRouteChange();

  return (
    <Layout className={className}>
      <Content>
        <Outlet />
      </Content>
    </Layout>
  );
};
