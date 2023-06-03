/**
 * Modules types declarations to make TypesScript happy
 */

declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare module '*.md' {
  const value: string;
  export default value;
}
