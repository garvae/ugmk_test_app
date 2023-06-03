import { ROUTES_PATHS } from 'routes/routes-paths';
import { ERoutesPages } from 'routes/routes.types';


/**
 * Returns route path
 */
export const getRoutePath = (route: ERoutesPages) => ROUTES_PATHS[route] || '';
