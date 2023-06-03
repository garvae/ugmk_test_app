/**
 * Checks your required env vars before react full start.
 *
 * @param {string | undefined} variable - env variable to check
 * @param {string} name - human-readable env name
 * @returns {Error | string} - returns the environment variable or throw an error if the variable is not found
 */
const requireEnv = (variable: string | undefined, name: string) => {
  if (typeof variable === 'undefined') {
    throw new Error(`Env variable "${name}" is required`);
  }

  return variable;
};

/**
 * Is current environment is on the client-side
 *
 * @returns {boolean} - returns "true" if current environment is on the 'Client' side
 */
export const isClient = (): boolean => typeof window === 'object';

/**
 * Is current environment is 'production'
 *
 * @returns {boolean} - returns "true" if current environment is 'production'
 */
export const isProduction = (): boolean => process.env.NODE_ENV === 'production';

/**
 * Environment variable with accessibility check at startup
 *
 * @see {@link requireEnv} for further information.
 */
export const ENV_URL_API = requireEnv(process.env.REACT_APP_URL_API, 'URL_API');
