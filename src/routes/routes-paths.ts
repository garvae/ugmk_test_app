import { ERoutesPages } from 'routes/routes.types';


const PAGE_ROUTE_ROOT = '/';
export const PAGE_ROUTE_DETAILS_SLUG_FACTORY = 'factory';
export const PAGE_ROUTE_DETAILS_SLUG_MONTH = 'month';
export const PAGE_ROUTE_DETAILS_BASE = '/details';
const PAGE_ROUTE_DETAILS = `${PAGE_ROUTE_DETAILS_BASE}/:${PAGE_ROUTE_DETAILS_SLUG_FACTORY}/:${PAGE_ROUTE_DETAILS_SLUG_MONTH}`;
const PAGE_ROUTE_ERROR = '/error';

type TRoutesPaths = {
  [key in ERoutesPages]: string;
};

/**
 * I believe that this decision is obvious and needs no explanation.
 * We shouldn't hardcode strings in project components.
 */
export const ROUTES_PATHS: TRoutesPaths = {
  [ERoutesPages.ERROR]: PAGE_ROUTE_ERROR,
  [ERoutesPages.ROOT]: PAGE_ROUTE_ROOT,
  [ERoutesPages.DETAILS]: PAGE_ROUTE_DETAILS,
};
