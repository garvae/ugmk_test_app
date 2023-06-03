import React from 'react';

import { Spin } from 'antd';
import styled from 'styled-components';

import { SpinProps } from 'antd/es/spin';
import {
  Spinner,
  ESpinnerSize,
  TSpinner,
} from 'ui/components/loaders/spinner/Spinner';


type TLoadingScreen = SpinProps & {
  $isAbsolute?: boolean;
  $spinner?: TSpinner;
};

const SpinStyled = styled(Spin)<TLoadingScreen>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: white;
  z-index: 1001;
  position: ${({ $isAbsolute }) => ($isAbsolute ? 'fixed' : undefined)};
`;

const CSS_REMOVE_SCROLL = `
  html {
    overflow: hidden;
  }
`;

/**
 * Full-width / full-height loading indicator
 */
export const LoadingScreen = (props: TLoadingScreen) => {

  const {
    $spinner,
    ...rest
  } = props;

  return (
    <>
      {
        rest.$isAbsolute && (
          <style>
            {CSS_REMOVE_SCROLL}
          </style>
        )
      }

      <SpinStyled
        {...rest}
        indicator={
          rest.indicator || (
            <Spinner
              {...$spinner}
              size={$spinner?.size || ESpinnerSize.SIZE_64}
            />
          )
        }
      />
    </>
  );
};
