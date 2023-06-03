import React, {
  useState,
  useRef,
} from 'react';
import {
  Bar,
  getElementAtEvent,
} from 'react-chartjs-2';
import { useNavigate } from 'react-router';

import { Select } from 'antd';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import styled from 'styled-components';


import {
  useProductionCtx,
  PRODUCTS_OPTION_ALL_VALUE,
  PRODUCTS_OPTIONS,
  FACTORY_KEY_IN_DATASET,
} from 'context/production/ProductionCtx';
import { ChartJSOrUndefined } from 'react-chartjs-2/dist/types';
import { PAGE_ROUTE_DETAILS_BASE } from 'routes/routes-paths';
import { ReactFCC } from 'types/react';
import { LoadingScreen } from 'ui/components/loaders/screen/LoadingScreen';


const LOCAL_STORAGE_KEY_SELECTED_CHART_TYPE = 'bar';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const CHART_OPTIONS: ChartOptions = {
  plugins: { legend: { position: 'bottom' as const } },
  responsive: true,
};


const RootPageContentContainer = styled.div`
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
   
   &.RootPageContent__header {
     justify-content: flex-end;
     align-items: center;
     
     .RootPageContent__header_select_label {
       margin-right: 1rem;
       font-weight: 600;
     }
     
     .RootPageContent__header_select {
       min-width: 200px;
     }
   }
 }
`;

/**
 * Основная диаграмма
 */
export const RootPageContent: ReactFCC = () => {

  const {
    datasets,
    error,
    isLoading,
    productionMonths,
  } = useProductionCtx();

  const navigate = useNavigate();

  const chartRef = useRef<ChartJSOrUndefined<'bar', number[], string> | null>(null);

  const [ selectedProduct, setSelectedProduct ] = useState<string>(localStorage.getItem(LOCAL_STORAGE_KEY_SELECTED_CHART_TYPE) || PRODUCTS_OPTION_ALL_VALUE);

  const onClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const {
        datasetIndex,
        index,
      } = getElementAtEvent(chartRef.current, event)[0];

      const ds = datasets?.[PRODUCTS_OPTION_ALL_VALUE][datasetIndex];

      if (!ds) {
        return;
      }


      const factoryId = (ds as typeof ds & { [FACTORY_KEY_IN_DATASET]: number })[FACTORY_KEY_IN_DATASET];
      const monthId = productionMonths[index]?.id;

      if (typeof factoryId === 'number' && typeof monthId === 'number') {
        navigate(`${PAGE_ROUTE_DETAILS_BASE}/${factoryId}/${monthId}`);
      }
    }
  };

  const handleChange = (value: string) => {
    setSelectedProduct(value);
    localStorage.setItem(LOCAL_STORAGE_KEY_SELECTED_CHART_TYPE, value);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!datasets || !!error) {
    return (
      <RootPageContentContainer>
        Что-то пошло не так при загрузке данных
      </RootPageContentContainer>
    );
  }

  return (
    <RootPageContentContainer>
      <div className="RootPageContent__header">
        <div className="RootPageContent__header_select_label">
          Фильтр по типу продукции
        </div>

        <Select
          className="RootPageContent__header_select"
          defaultValue={selectedProduct}
          onChange={handleChange}
          options={PRODUCTS_OPTIONS}
        />
      </div>

      <div className="RootPageContent__chart_container">
        <Bar
          ref={chartRef}
          data={
            {
              datasets: datasets[selectedProduct],
              labels: productionMonths.map(item => item.label),
            }
          }
          onClick={onClick}
          options={CHART_OPTIONS}
        />
      </div>
    </RootPageContentContainer>
  );
};
