import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { ConfigProvider } from 'antd';
import dayjs from 'dayjs';

import locale from 'antd/es/locale/ru_RU';
import { useAppOnLoad } from 'app/useAppOnLoad';
import { ErrorBoundaryCritical } from 'app/wrappers/error-boundary/critical/ErrorBoundaryCritical';
import { SwrManager } from 'app/wrappers/swr/SwrManager';
import { ProductionCtxProvider } from 'context/production/ProductionCtx';
import timezone from 'dayjs/plugin/timezone';
import updateLocale from 'dayjs/plugin/updateLocale';
import utc from 'dayjs/plugin/utc';
import { Routes } from 'routes/Routes';
import { GlobalStyle } from 'styles/globals';
import 'dayjs/locale/ru';

/**
 * Добавляем в dayjs плагины
 */
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(updateLocale);

/**
 * Устанавливаем дефолтную локализацию и апдейтим дефолтное начало недели
 */
dayjs.locale('ru');
dayjs.updateLocale('ru', { weekStart: 1 /* начало недели - понедельник */ });

/**
 * Main App component.
 * Here we can see all wrappers and contexts
 */
export const App = () => {

  useAppOnLoad();

  return (
    <ErrorBoundaryCritical>
      <SwrManager>
        <BrowserRouter>
          <HelmetProvider>
            <ConfigProvider locale={locale}>
              <>
                <GlobalStyle />

                <ProductionCtxProvider>
                  <Routes />
                </ProductionCtxProvider>
              </>
            </ConfigProvider>
          </HelmetProvider>
        </BrowserRouter>
      </SwrManager>
    </ErrorBoundaryCritical>
  );
};
