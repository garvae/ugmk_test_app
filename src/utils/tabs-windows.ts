import { isClient } from 'env';

import { ERoutesPages } from 'routes/routes.types';
import { consoleError } from 'utils/console';
import {
  validateInternalLink,
  validateExternalURL,
} from 'utils/http/validation';
import { getRoutePath } from 'utils/routes';


export enum EOpenPathInTabOrWindowTypes {
  TAB_CURRENT = 'TAB_CURRENT',
  TAB_NEW = 'TAB_NEW',
}

type TOpenPathInTabOrWindow = {
  openType?: EOpenPathInTabOrWindowTypes;
  path: string;
};

/**
 * Utility to manage opening links in different tabs / windows
 */
export const openPathInTabOrWindow = (props: TOpenPathInTabOrWindow) => {
  const {
    openType = EOpenPathInTabOrWindowTypes.TAB_NEW,
    path: pathProp,
  } = props;

  const isRoot = pathProp === getRoutePath(ERoutesPages.ROOT);

  const validatedInternal = (isRoot || (pathProp.startsWith('/') && !validateInternalLink(pathProp))) ? pathProp : '';
  const validatedExternal = validateExternalURL(pathProp);

  let path = '';

  if (validatedInternal) {
    if (window.location.origin) {
      path = window.location.origin + path;
    }
  } else if (validatedExternal) {
    path = validatedExternal;
  }

  const err = !path || typeof window !== 'object';

  if (err) {
    let errStr = `
    Error in: "openPathInTab" function
    Params: 
    - Path received: ${pathProp}
    - Path validated: ${path}
    - [typeof window !== 'object'] = ${String(!isClient())}
    - [window?.location?.origin] = ${window.location.origin}
    `;

    if (validatedInternal || (!validatedInternal && !validatedExternal)) {
      errStr = `
      ${errStr}
      - [window?.location?.origin] = ${window.location.origin}
      `;
    }

    consoleError({ message: errStr });
    return;
  }

  if (openType === EOpenPathInTabOrWindowTypes.TAB_NEW) {
    window.open(path, '_blank');
    return;
  }

  window.open(path, '_self');
};
