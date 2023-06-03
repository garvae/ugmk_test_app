import { consoleError } from 'utils/console';

/**
 * First letter capitalizing
 */
export const capitalizeFirstLetter = (str: string) => {
  if (!str || typeof str !== 'string') {
    consoleError({ message: `
    Error in: "normalizeString" function
    Expected: [str: string]
    Received: ${str}
    ` });

    return '';
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
};

