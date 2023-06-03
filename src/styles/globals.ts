import {
  createGlobalStyle,
  DefaultTheme,
  GlobalStyleComponent,
} from 'styled-components';

const BORDER_RADIUS_PRIMARY = '0.125rem';
const HOVER_TRANSITION_TIME_PRIMARY = '0.3s';
const FOCUS_PRIMARY = '#0060df';
const FOCUS_SECONDARY = '#f5f5f5';

type TGlobalStyleObj = Record<string, unknown>;

/**
 * Typical global "styles reset"
 * + some extra styles for the ANTD
 */
export const GlobalStyle: GlobalStyleComponent<TGlobalStyleObj, DefaultTheme> = createGlobalStyle<TGlobalStyleObj>`
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
 
 html,
 b,
 del,
 dfn,
 em,
 h1,
 h2,
 h3,
 h4,
 h5,
 h6,
 i,
 ins,
 p,
 s,
 small,
 strong,
 sub,
 sup,
 u {
   color: #222;
 }

 html,
 body {
  width: 100%;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
 }

 body {
  --removed-body-scroll-bar-size: 0; /* radix overwrites it */
  display: flex;
  overflow-x: hidden;
  width: 100%;
  min-height: 100%;
  pointer-events: auto !important; /* fix radix dialog pointer-events: none */
 }


 body.overscroll_disabled {
  overscroll-behavior-y: contain;
 }

 #root {
  display: flex;
  width: 100%;
  min-height: 100%;
 }

 #root > div {
  width: 100%;
 }

 #root.touch * :focus {
  outline: none !important;
  box-shadow: none !important;
 }

 #root.touch * .focus-visible {
  outline: none !important;
  box-shadow: none !important;
 }

 a {
  text-decoration: none;
  color: inherit;
 }

 h1,
 h2,
 h3,
 h4,
 h5,
 h6,
 p {
  margin: 0;
  padding: 0;
 }

 address {
  font-style: normal;
 }

 input::-webkit-outer-spin-button,
 input::-webkit-inner-spin-button {
  margin: 0;
  -webkit-appearance: none;
 }

 /* Firefox */
 input[type='number'] {
  -moz-appearance: textfield;
 }

 *,
 *::before,
 *::after {
  box-sizing: inherit;
 }

 /* ------ FOCUS BEHAVIOUR. (box-shadow, outline) ------ */
 * {
   transition: box-shadow linear ${HOVER_TRANSITION_TIME_PRIMARY};
 }

 
 *:focus-visible:not([aria-disabled='true']),
 a:focus-visible:not(:active):not([aria-disabled='true']) {
   border-radius: ${BORDER_RADIUS_PRIMARY};
 }
 
 *.focus-visible:not([aria-disabled='true']),
 *:focus-visible:not([aria-disabled='true']) {
   outline: none !important;
   box-shadow: 0 0 0 0.125rem ${FOCUS_SECONDARY}, 0 0 0.0625rem 0.3125rem ${FOCUS_PRIMARY};
 }

 
 a:focus-visible:not(:active):not([aria-disabled='true']) {
   box-shadow: 0 0 0 0.125rem ${FOCUS_SECONDARY}, 0 0 0.125rem 0.5rem ${FOCUS_PRIMARY};
 }

 *:focus-visible:active:not([aria-disabled='true']) {
   box-shadow: initial !important;
 }
`;
