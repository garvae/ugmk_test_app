import React from 'react';
import { FallbackProps } from 'react-error-boundary';

import styled from 'styled-components';

import { ErrorModule } from 'ui/modules/error/ErrorModule';


const ErrorBoundaryCriticalFallbackWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-grow: 1;
  justify-content: center;
  

  .ErrorBoundaryCriticalFallback__content {
    flex-direction: column;
    display: flex;
    width: 100%;
  }
`;

/**
 * Fallback component for the "ErrorBoundaryCritical.tsx" wrapper
 *
 * !!! Be careful: Various hooks will not work here (useDispatch, etc...)
 * Read more in "ErrorBoundaryCritical.tsx" description.
 */
export const ErrorBoundaryCriticalFallback: React.ComponentType<FallbackProps> = props => {

  const { resetErrorBoundary } = props;

  return (
    <ErrorBoundaryCriticalFallbackWrapper>
      <div className="ErrorBoundaryCriticalFallback__content">
        <ErrorModule onClickPrimary={resetErrorBoundary} />
      </div>
    </ErrorBoundaryCriticalFallbackWrapper>
  );
};
