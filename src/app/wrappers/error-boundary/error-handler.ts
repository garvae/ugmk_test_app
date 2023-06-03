import { TErrorLog } from 'types/types';
import { consoleErrorGrouped } from 'utils/console';
import { LOCAL_STORAGE_ERRORS_LOGGED } from 'variables/local-storage-keys';

/**
 * Process app error
 *
 * !!! Be careful. Don't use redux, graphql (etc) here.
 * The current handler can be used inside the "ErrorBoundaryCritical.tsx".
 * Read more: src/wrappers/error-boundary/critical/ErrorBoundaryCritical.tsx
 */
export const errorBoundaryHandler = (error: Error | string, info: { componentStack: string }) => {
  let newError: TErrorLog | undefined;

  if (error) {
    if (typeof error === 'string') {
      newError = {
        description: info.componentStack,
        name: error,
      };
    } else if (error.name) {
      newError = {
        ...error,
        description: info.componentStack,
      };
    }
  }

  if (newError) {
    let isAlreadyLogged = false;
    let errors = [] as TErrorLog[];
    const loggedErrors = localStorage.getItem(LOCAL_STORAGE_ERRORS_LOGGED);

    if (typeof loggedErrors === 'string') {
      const loggedErrorsParsed: TErrorLog[] = JSON.parse(loggedErrors);

      if (Array.isArray(loggedErrorsParsed) && loggedErrorsParsed.length) {
        errors = loggedErrorsParsed;
      }
    }

    if (!errors.length) {
      localStorage.setItem(LOCAL_STORAGE_ERRORS_LOGGED, JSON.stringify([ newError ]));
    } else {
      const isLogged = newError.name && errors.find(err => err.name === newError?.name);

      if (isLogged) {
        isAlreadyLogged = true;
      } else {
        localStorage.setItem(LOCAL_STORAGE_ERRORS_LOGGED, JSON.stringify([ ...errors, newError ]));
      }
    }

    if (!isAlreadyLogged) {

      /**
       * Do something with the newError
       * For example, add the error logging
       */
    }

    consoleErrorGrouped({
      groupName: 'Error boundary:',
      messages: [ { message: `Error: ${JSON.stringify(error)}` }, { message: `Error componentStack: ${info.componentStack}` } ],
    });
  }
};
