import { ChartDataset } from 'chart.js';


export type TProductionDatasets = { [key in string]: ChartDataset<'bar', number[]>[] } | null;
