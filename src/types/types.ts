/**
 * This type is used to logging error
 */
export type TErrorLog = Omit<Error, 'message'> & {
  description?: string;
  message?: string;
};
