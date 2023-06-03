import React, { lazy } from 'react';

import { ROUTES_PATHS } from 'routes/routes-paths';
import {
  ERoutesPages,
  TRoute,
} from 'routes/routes.types';


const ErrorPage = lazy(() => import('pages/error/ErrorPage'));
const RootPage = lazy(() => import('pages/root/RootPage'));
const DetailsPage = lazy(() => import('pages/detailed/DetailedPage'));


export const publicRoutes: TRoute[] = [
  {
    element: <RootPage />,
    id: ERoutesPages.ROOT,
    index: true,
    path: ROUTES_PATHS[ERoutesPages.ROOT],

  },
  {
    element: <DetailsPage />,
    id: ERoutesPages.DETAILS,
    path: ROUTES_PATHS[ERoutesPages.DETAILS],
  },
  {
    element: <ErrorPage />,
    id: ERoutesPages.ERROR,
    path: ROUTES_PATHS[ERoutesPages.ERROR],
  },
];

export const notFoundRoute: TRoute = {
  element: <ErrorPage />,
  id: ERoutesPages.ERROR,
  path: '*',
};
