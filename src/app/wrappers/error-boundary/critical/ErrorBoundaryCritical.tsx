import React from 'react';
import { ErrorBoundary as ErrorBoundaryWrapper } from 'react-error-boundary';

import { ErrorBoundaryCriticalFallback } from 'app/wrappers/error-boundary/critical/fallback/ErrorBoundaryCriticalFallback';
import { errorBoundaryHandler } from 'app/wrappers/error-boundary/error-handler';
import { ReactFCC } from 'types/react';

/**
 * Catches app bugs
 *
 * !!! Be careful here. This "Boundary" is higher than all other app wrappers,
 * so various hooks will not work here (useDispatch, etc...).
 */
export const ErrorBoundaryCritical: ReactFCC = props => {
  const { children } = props;

  return (
    <ErrorBoundaryWrapper
      FallbackComponent={ErrorBoundaryCriticalFallback}
      onError={errorBoundaryHandler}
    >
      {children}
    </ErrorBoundaryWrapper>
  );
};
