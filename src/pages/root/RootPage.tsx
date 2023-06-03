import React from 'react';
import { Helmet } from 'react-helmet-async';

import styled from 'styled-components';

import { RootPageContent } from 'pages/root/content/RootPageContent';
import { Content } from 'ui/components/content/Content';


const RootPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  
  > main {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const RootPage = (): JSX.Element => (
  <>
    <Helmet title="Главная" />

    <RootPageContainer>
      <Content
        $centered
        $column
        $withLayoutPadding
      >
        <RootPageContent />
      </Content>
    </RootPageContainer>
  </>
);

export default RootPage;
