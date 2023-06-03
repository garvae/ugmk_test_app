/**
 * Global 'react' types
 */

/* eslint-disable @typescript-eslint/naming-convention -- Here we are trying to apply a global naming, so we don't need to follow the project's internal naming rules. */
import React, { PropsWithChildren } from 'react';

/**
 * {@link https://stackoverflow.com/questions/71788254/react-18-typescript-children-fc/72087687#72087687 Read my answer about this solution}
 */
export type ReactFCC<T = unknown> = React.FC<PropsWithChildren<T>>;
/* eslint-enable @typescript-eslint/naming-convention */
