
import { useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import styled from 'styled-components';

import {
  useProductionCtx,
  FACTORY_KEY_IN_DATASET,
  PRODUCTS_OPTION_ALL_VALUE,
  PRODUCTS,
} from 'context/production/ProductionCtx';
import { ROUTES_PATHS } from 'routes/routes-paths';
import { ERoutesPages } from 'routes/routes.types';
import { ReactFCC } from 'types/react';
import { LoadingScreen } from 'ui/components/loaders/screen/LoadingScreen';
import { COLORS_CHART } from 'variables/colors';

ChartJS.register(ArcElement, Tooltip, Legend);


const DetailedPageContentContainer = styled.div`
  display: flex;
  width: 1000px;
  flex-direction: column;
  align-items: center;
  
 > div {
   display: flex;
   width: 100%;
   
   &:not(:first-child) {
     margin-top: 3rem;
   }
   
   &.DetailedPageContent__header {
     justify-content: center;
     align-items: center;
     
     h1 {
       font-size: 2rem;
     }
   }
   
   &.DetailedPageContent__chart {
     max-width: 500px;
   }
 }
`;

type TChartData = ChartData<'pie', number[], unknown> | null;

type TDetailedPageContent = {
  factory: string;
  isInvalidSlugs: boolean;
  month: string;
  pageTitle: string;
};

export const DetailedPageContent: ReactFCC<TDetailedPageContent> = props => {

  const {
    factory,
    isInvalidSlugs,
    month,
    pageTitle,
  } = props;

  const {
    datasets,
    error,
    isLoading,
    productionMonths,
    productions,
  } = useProductionCtx();

  const navigate = useNavigate();

  const isError: boolean = isInvalidSlugs || !!error || isLoading || !datasets || !factory;

  const data: TChartData = useMemo(() => {
    if (isError) {
      return null;
    }

    const factoryIdNum = Number(factory);

    const dsArr = Object
      .entries(datasets!)
      .filter(([ key ]) => key !== PRODUCTS_OPTION_ALL_VALUE)
      .map(([ key, value ]) => ({
        product: key,
        value: value.reduce((acc, curr) => {
          if ((curr as typeof curr & { [FACTORY_KEY_IN_DATASET]: number })[FACTORY_KEY_IN_DATASET] === factoryIdNum) {
            return acc + curr.data.reduce((a, c) => a + c, 0);
          }

          return acc;
        }, 0),
      }));

    const colors = dsArr.map((_, i) => COLORS_CHART[i]);

    const dataChart = {
      datasets: [ {
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        data: dsArr.map(item => item.value),
        label: 'Объем производства',
      } ],
      labels: dsArr.map(product => PRODUCTS.find(opt => opt.value === product.product)?.label || 'Продукт'),
    };

    return dataChart;
  }, [
    datasets,
    factory,
    isError,
  ]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    navigate(ROUTES_PATHS[ERoutesPages.ERROR]);
    return null;
  }

  return (
    <DetailedPageContentContainer>
      <div className="DetailedPageContent__header">
        <h1>{pageTitle}</h1>
      </div>

      <div className="DetailedPageContent__chart">
        {data && <Pie data={data} />}
      </div>
    </DetailedPageContentContainer>
  );
};
