import { useMemo } from 'react';

import dayjs from 'dayjs';

import {
  TProductionMonth,
  TProductInvalid,
  TProductValid,
  TProductApi,
} from 'api/routes/products/products.types';
import { isArrayAndNotEmpty } from 'utils/array';
import { capitalizeFirstLetter } from 'utils/string';


const PLACEHOLDER_DATE = 'Другие месяцы';
const INVALID_MONTH_ID = 0;

type TDataAdapted = {
  invalid: TProductInvalid[];
  valid: TProductValid[];
};

type TUseProductionData = {
  data?: TProductApi[];
};

/**
 * Обработка полученных данных в отдельном хуке,
 * чтобы улучшить читаемость основного компонента
 */
export const useProductionData = (props: TUseProductionData) => {

  const { data } = props;

  const {
    productionMonths,
    productions,
  } = useMemo(() => {

    /* валидные данные - те, в которых есть валидные даты */
    const validArr: TDataAdapted['valid'] = [];

    /* невалидные данные - те, в которых валидные даты отсутствуют */
    const invalidArr: TDataAdapted['invalid'] = [];

    /* финальные данные сделаем объектом, чтобы проще было добавлять данные из большого массива */
    const productionMonthsArr: TProductionMonth[] = [];

    data?.forEach(item => {
      if (item.date) {
        const dateDayjs = dayjs(item.date);

        if (dayjs.isDayjs(dateDayjs) && dateDayjs.isValid()) {
          validArr.push({
            ...item,
            date: dateDayjs,
          });

          return;
        }
      }

      invalidArr.push({
        ...item,
        date: null,
      });
    });

    /**
     * ID фабрик
     */
    const productionsKeys: number[] = [];

    if (isArrayAndNotEmpty(data)) {
      data.forEach(item => {
        if (!productionsKeys.find(id => id === item.factory_id)) {
          productionsKeys.push(item.factory_id);
        }
      });
    }

    productionsKeys.sort((a, b) => (a > b ? 1 : -1));


    validArr.forEach(item => {
      const label = capitalizeFirstLetter(item.date.format('MMM YY'));
      let monthOrder = String(item.date.month());

      if (monthOrder.length === 1) {
        monthOrder = `0${monthOrder}`;
      }

      const monthYear = item.date.year();
      const monthId = Number(`${monthYear}${monthOrder}`);

      if (!productionMonthsArr.find(month => month.id === monthId)) {
        productionMonthsArr.push({
          id: monthId,
          label,
          production: Object.fromEntries(productionsKeys.map(productionId => [ productionId, [] ])),
        });
      }

      const monthIndex = productionMonthsArr.findIndex(month => month.id === monthId);
      const productionIndex = item.factory_id;
      const productionArr = productionMonthsArr[monthIndex].production[productionIndex];
      const newProduction: (TProductInvalid | TProductValid)[] = [ ...productionArr, item ];

      productionMonthsArr[monthIndex] = {
        ...productionMonthsArr[monthIndex],
        production: {
          ...productionMonthsArr[monthIndex].production,
          [productionIndex]: newProduction,
        },
      };
    });


    const productionMonthsArrSorted = Array.from(productionMonthsArr).sort((a, b) => (a.id > b.id ? 1 : -1));

    /* добавляем в конец невалидные данные в финальный объект данных */
    productionMonthsArrSorted.push({
      id: INVALID_MONTH_ID,
      label: PLACEHOLDER_DATE,
      production: Object.fromEntries(productionsKeys.map(key => [ key, invalidArr.filter(invalidItem => invalidItem.factory_id === key) ])),
    });

    return {
      productionMonths: productionMonthsArrSorted,
      productions: productionsKeys,
    };
  }, [ data ]);

  return {
    productionMonths,
    productions,
  };
};
