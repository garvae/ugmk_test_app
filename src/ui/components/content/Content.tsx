import React from 'react';

import styled from 'styled-components';

import { Content as ContentAntd } from 'antd/es/layout/layout';
import { ReactFCC } from 'types/react';

type TContent = {
  $centered?: boolean;
  $column?: boolean;
  $withLayoutPadding?: boolean;
};

const ContentStyled = styled(ContentAntd)<TContent>`
  min-height: 120px;
  display: flex;
  flex-direction: ${({ $column }) => ($column ? 'column' : undefined)};
  align-items: ${({ $centered }) => ($centered ? 'center' : undefined)};
  justify-content: ${({ $centered }) => ($centered ? 'center' : undefined)};
  padding: ${({ $withLayoutPadding }) => ($withLayoutPadding ? '2rem' : undefined)};
`;

/**
 * Styled antd 'Content' component
 */
export const Content: ReactFCC<TContent> = props => {

  const {
    children,
    ...rest
  } = props;

  return (
    <ContentStyled {...rest}>
      {children}
    </ContentStyled>
  );
};
