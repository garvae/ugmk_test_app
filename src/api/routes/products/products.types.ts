import { Dayjs } from 'dayjs';


type TDateFormatApi = `${number}/${number}/${number}`;

export enum EProductApiProduct {
  PRODUCT1 = 'product1',
  PRODUCT2 = 'product2',
  PRODUCT3 = 'product3',
}

export type TProductApi = {
  date: TDateFormatApi | null,
  factory_id: number,
  id: number,
  [EProductApiProduct.PRODUCT1]: number | null,
  [EProductApiProduct.PRODUCT2]: number | null,
  [EProductApiProduct.PRODUCT3]: number | null
};

export type TProductValid = Omit<TProductApi, 'date'> & {
  date: Dayjs,
};

export type TProductInvalid = Omit<TProductApi, 'date'> & {
  date: null,
};

export type TProductionMonth = {
  id: number;
  label: string;
  production: {
    [key in number]: (TProductValid | TProductInvalid)[];
  }
};
