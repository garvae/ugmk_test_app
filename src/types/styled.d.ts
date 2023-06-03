/**
 * Global 'styled-components' types
 */

import 'styled-components';
import { TTheme } from 'styles/types/themes.types';

declare module 'styled-components' {

  /**
   * {@link https://styled-components.com/docs/api#create-a-declarations-file Read more}
   */
  // eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-empty-interface -- Here we are trying to apply a global naming, so we don't need to follow the project's internal naming rules. Here we also bypass some typing nuances, so we don't need the "no-empty-interface" rule
  export type DefaultTheme = TTheme;
}
