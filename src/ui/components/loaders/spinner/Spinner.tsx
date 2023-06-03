import React from 'react';


import { LoadingOutlined } from '@ant-design/icons';

export enum ESpinnerSize {
  SIZE_12 = 12,
  SIZE_16 = 16,
  SIZE_24 = 24,
  SIZE_32 = 32,
  SIZE_48 = 48,
  SIZE_64 = 64,
}

export type TSpinner = {
  size?: ESpinnerSize;
};


/**
 * Spinner loading indicator
 */
export const Spinner = (props: TSpinner) => {

  const { size = ESpinnerSize.SIZE_24 } = props;

  return (
    <LoadingOutlined
      spin
      style={{ fontSize: size }}
    />
  );
};
