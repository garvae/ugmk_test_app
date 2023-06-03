/**
 * !! This component can only use methods and tools that
 * which can be accessed during a critical error.
 *
 * And yes, here we can use only plain CSS because this component shouldn't use any third-party libs.
 *
 * More details in the component "ErrorBoundaryCriticalFallback.tsx"
 */
import React from 'react';


import { ERoutesPages } from 'routes/routes.types';
import { ReactFCC } from 'types/react';
import { getRoutePath } from 'utils/routes';
import {
  openPathInTabOrWindow,
  EOpenPathInTabOrWindowTypes,
} from 'utils/tabs-windows';


const TITLE_BTN_TO_MAIN = 'Попробуем исправить?';
const TITLE_ERROR_DEFAULT = 'Что-то пошло не так...';


type TErrorContent = {
  onClickPrimary?: () => void;
};


/**
 * Main "error block" component.
 *
 * P.S. Read info at the top of the current file
 */
export const ErrorModule: ReactFCC<TErrorContent> = props => {

  const { onClickPrimary: onClickPrimaryProp } = props;


  const onClickPrimary = () => {
    onClickPrimaryProp?.();
    openPathInTabOrWindow({
      openType: EOpenPathInTabOrWindowTypes.TAB_CURRENT,
      path: getRoutePath(ERoutesPages.ROOT),
    });
  };

  return (
    <>
      <style>
        {
          `
            html,
            body,
            #root {
              display: flex;
              flex-direction: column;
              flex-grow: 1;
              width: 100%;
            }
            
            html {
              box-sizing: border-box;
              height: 100%;
              font-family: system-ui, /* macOS 10.11-10.12 */ -apple-system, /* Windows 6+ */ 'Segoe UI',
               /* Android 4+ */ 'Roboto', /* Ubuntu 10.10+ */ 'Ubuntu', /* Gnome 3+ */ 'Cantarell', /* KDE Plasma 5+ */ 'Noto Sans',
               /* fallback */ sans-serif, /* macOS emoji */ 'Apple Color Emoji', /* Windows emoji */ 'Segoe UI Emoji',
               /* Windows emoji */ 'Segoe UI Symbol', /* Linux emoji */ 'Noto Color Emoji';
              font-size: 16px;
              font-weight: 400;
             }
          
            .ErrorModule__container {
               display: flex;
               flex-direction: column;
               width: 100%;
               flex-grow: 1;
               align-items: center;
               justify-content: center;
               margin: 4rem 2rem;
            }
            
            .ErrorModule__btn {
              margin-top: 3rem;
            }
          `
        }
      </style>

      <div className="ErrorModule__container">
        <h1>
          {TITLE_ERROR_DEFAULT}
        </h1>


        <button
          className="ErrorModule__btn"
          onClick={onClickPrimary}
          type="button"
        >
          {TITLE_BTN_TO_MAIN}
        </button>
      </div>
    </>
  );
};
