import { RouteProps } from 'react-router';


/**
 * The reason for using this is the ability to separate navigation into different types of routes.
 */
export enum ERoutesPages {
  DETAILS = 'PAGE_DETAILS',
  ERROR = 'PAGE_ERROR',
  ROOT = 'PAGE_ROOT',
}

/**
 * Main type for routes
 */
export type TRoute = RouteProps & {
  element: JSX.Element;
  icon?: JSX.Element;
  id: ERoutesPages;
  index?: boolean;
  path?: string;
  readmePath?: string | null;
  subroutes?: TRoute[];
};
