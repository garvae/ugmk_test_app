import {
  useEffect,
  RefObject,
  useState,
  useCallback,
} from 'react';
import { useLocation } from 'react-router-dom';


type TUseScrollTopOnRouteChange = {
  containerToScroll?: RefObject<HTMLElement>;
  scrollOnlyProvidedContainer?: boolean;
};

/**
 * Scrolls a window or a provided specific element (or both) when the pathname is updated
 */
export const useScrollTopOnRouteChange = (props?: TUseScrollTopOnRouteChange) => {

  const {
    containerToScroll,
    scrollOnlyProvidedContainer,
  } = props || {};

  const { pathname: pathnameIncoming } = useLocation();

  const [ pathname, setPathname ] = useState<string>('');

  const scrollToTop = useCallback(() => {
    if (!scrollOnlyProvidedContainer) {
      window.scrollTo(0, 0);
    }

    containerToScroll?.current?.scrollTo(0, 0);
  }, [ containerToScroll, scrollOnlyProvidedContainer ]);

  useEffect(() => {
    if (pathnameIncoming !== pathname) {
      setPathname(pathnameIncoming);
      scrollToTop();
    }
  }, [
    pathname,
    pathnameIncoming,
    scrollToTop,
  ]);
};
