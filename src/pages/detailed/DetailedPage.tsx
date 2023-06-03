import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import styled from 'styled-components';

import {
  useProductionCtx,
  PRODUCTION_NAME,
} from 'context/production/ProductionCtx';
import { DetailedPageContent } from 'pages/detailed/content/DetailedPageContent';
import {
  PAGE_ROUTE_DETAILS_SLUG_FACTORY,
  PAGE_ROUTE_DETAILS_SLUG_MONTH,
} from 'routes/routes-paths';
import { Content } from 'ui/components/content/Content';


const DetailedPageContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  
  > main {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

const DetailedPage = (): JSX.Element => {

  const {
    datasets,
    error,
    isLoading,
    productionMonths,
    productions,
  } = useProductionCtx();

  const {
    [PAGE_ROUTE_DETAILS_SLUG_FACTORY]: factory = '',
    [PAGE_ROUTE_DETAILS_SLUG_MONTH]: month = '',
  } = useParams();

  const isNoSlugs = typeof factory !== 'string' || typeof month !== 'string';

  const factoryName = isNoSlugs || !productions.find(key => String(key) === factory) ? '' : `${PRODUCTION_NAME} ${factory}`;

  const monthName = useMemo(() => {
    if (isNoSlugs) {
      return '';
    }

    return productionMonths.find(m => String(m.id) === month)?.label || '';
  }, [
    isNoSlugs,
    month,
    productionMonths,
  ]);

  const isInvalidSlugs = isNoSlugs || !factoryName || !monthName;

  const pageTitle = useMemo(() => {
    if (isLoading) {
      return 'Загрузка';
    }

    if (error || isInvalidSlugs) {
      return 'Ошибка';
    }

    return `${factoryName} (${monthName})`;
  }, [
    error,
    factoryName,
    isInvalidSlugs,
    isLoading,
    monthName,
  ]);

  return (
    <>
      <Helmet title={pageTitle} />

      <DetailedPageContainer>
        <Content
          $centered
          $column
          $withLayoutPadding
        >
          <DetailedPageContent
            factory={factory}
            isInvalidSlugs={isInvalidSlugs}
            month={month}
            pageTitle={pageTitle}
          />
        </Content>
      </DetailedPageContainer>
    </>
  );
};

export default DetailedPage;
