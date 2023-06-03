import {
  createContext,
  useMemo,
  useContext,
} from 'react';

import { ChartDataset } from 'chart.js';

import { useFetch } from 'api/hooks/useFetch';
import {
  TProductApi,
  EProductApiProduct,
  TProductionMonth,
} from 'api/routes/products/products.types';
import { PRODUCTS_URL } from 'api/routes/products/products.vars';
import { useProductionData } from 'context/production/useProductionData';
import { TProductionDatasets } from 'pages/root/content/Production.types';
import { ReactFCC } from 'types/react';
import { isArrayAndNotEmpty } from 'utils/array';
import { COLORS_CHART } from 'variables/colors';


export const FACTORY_KEY_IN_DATASET = 'factory';
export const PRODUCTION_NAME = 'Фабрика';
export const PRODUCTS_OPTION_ALL_VALUE = 'all';

/**
 * Здесь в "value" хардкод ключей из массива данных
 */
export const PRODUCTS = [
  {
    label: 'Продукт 1',
    value: EProductApiProduct.PRODUCT1,
  },
  {
    label: 'Продукт 2',
    value: EProductApiProduct.PRODUCT2,
  },
  {
    label: 'Продукт 3',
    value: EProductApiProduct.PRODUCT3,
  },
];

export const PRODUCTS_OPTIONS = [ ...PRODUCTS, {
  label: 'Все продукты',
  value: PRODUCTS_OPTION_ALL_VALUE,
} ];

type TProductsCtxProvider = {
  datasets: TProductionDatasets;
  error: unknown;
  isLoading: boolean;
  productionMonths: TProductionMonth[];
  productions: number[];
};

const ProductionCtx = createContext({} as unknown as TProductsCtxProvider);
export const useProductionCtx = () => useContext(ProductionCtx);

export const ProductionCtxProvider: ReactFCC = props => {
  const { children } = props;

  const {
    data,
    error,
    isLoading,
  } = useFetch<TProductApi[]>(PRODUCTS_URL);

  const {
    productionMonths,
    productions,
  } = useProductionData({ data });

  /**
   * Создаем датасеты 1 раз,
   * чтобы не делать этого при каждом переключении селекта
   */
  const datasets: TProductionDatasets = useMemo(() => {
    if (!isArrayAndNotEmpty(data)) {
      return null;
    }

    return Object.fromEntries(PRODUCTS_OPTIONS.map(opt => {
      const { value } = opt;

      const ds: ChartDataset<'bar', number[]>[] = productions.map(key => ({
        [FACTORY_KEY_IN_DATASET]: key,
        backgroundColor: COLORS_CHART[productions.findIndex(prod => prod === key)],
        data: productionMonths.map(month => month.production[key].map(item => {
          let total = 0;
          if (Object.values(EProductApiProduct).includes(value as EProductApiProduct)) {
            return item[value as EProductApiProduct] || 0;
          }

          PRODUCTS.forEach(product => {
            total += ((item as unknown as Record<string, number>)[product.value] || 0);
          });

          return total;
        })).flat(),
        label: `${PRODUCTION_NAME} ${key}`,
      }));

      return [ value, ds ];
    }));
  }, [
    data,
    productionMonths,
    productions,
  ]);

  const ctxValue: TProductsCtxProvider = useMemo(() => ({
    datasets,
    error,
    isLoading,
    productionMonths,
    productions,
  }), [
    error,
    isLoading,
    productions,
    productionMonths,
    datasets,
  ]);

  return (
    <ProductionCtx.Provider value={ctxValue}>
      {children}
    </ProductionCtx.Provider>
  );
};
