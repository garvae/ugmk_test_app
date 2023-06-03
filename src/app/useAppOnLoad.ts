import { useEffect } from 'react';

const APP_PRELOADER_ID = 'app-pre-loader';

/**
 * Performs some actions after the app is loaded
 */
export const useAppOnLoad = () => {
  useEffect(() => {
    const onPageLoad = () => {

      /**
       * App pre-loader
       */
      const appPreLoader = document.getElementById(APP_PRELOADER_ID);

      /**
       * Remove preloader
       */
      if (appPreLoader) {
        appPreLoader.style.setProperty('opacity', '0');

        setTimeout(() => {
          appPreLoader.remove();
        }, 300);
      }
    };

    if (document.readyState === 'complete') {
      onPageLoad();
      return undefined;
    }

    window.addEventListener('load', onPageLoad, false);

    return () => window.removeEventListener('load', onPageLoad);
  }, []);
};
