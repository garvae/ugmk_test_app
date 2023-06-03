import React, { Suspense } from 'react';
import {
  Routes as RouterRoutes,
  Route,
} from 'react-router-dom';

import {
  publicRoutes,
  notFoundRoute,
} from 'routes/routes-categories';
import { LoadingScreen } from 'ui/components/loaders/screen/LoadingScreen';
import { LayoutMain } from 'ui/layouts/main/LayoutMain';


/**
 * Main route component.
 * Here I prefer to separate different types of routes
 * in order to have more flexibility in handling.
 */
export const Routes = () => (
  <Suspense fallback={<LoadingScreen $isAbsolute />}>
    <RouterRoutes>
      <Route element={<LayoutMain />}>
        {
          publicRoutes.map(route => (
            <Route
              key={`publicRoutes-${route.id}`}
              {...route}
              element={route.element}
            />
          ))
        }

        <Route {...notFoundRoute} />
      </Route>
    </RouterRoutes>
  </Suspense>
);
