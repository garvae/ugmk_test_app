import React from 'react';

import { SWRConfig } from 'swr';

import { ReactFCC } from 'types/react';

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then(res => res.json());

/**
 * Configuring SWR Globally
 */
export const SwrManager: ReactFCC = props => {
  const { children } = props;

  return (
    <SWRConfig value={{ fetcher }}>
      {children}
    </SWRConfig>
  );
};
