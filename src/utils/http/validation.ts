import { sanitizeUrl } from '@braintree/sanitize-url';
import { consoleError } from 'utils/console';


/**
 * Validates internal link
 */
export const validateInternalLink = (url: string): boolean => {
  if (!url || typeof url !== 'string') {
    consoleError({ message: `
    Error in: "validateInternalLink" function
    Expected: [url: string]
    Received: ${url}
    ` });

    return false;
  }

  return url.startsWith('/');
};


const showDefaultValidateExternalURLErr = (url = '') => consoleError({ message: `
    Error in: "validateExternalURL" function
    Expected: [url: string]
    Received: ${url}
    ` });


/**
 * Validates external link
 */
export const validateExternalURL = (url: string): string => {
  if (!url || typeof url !== 'string') {
    showDefaultValidateExternalURLErr(url);
    return '';
  }

  if (validateInternalLink(url)) {
    consoleError({ message: `
    Error in: "validateExternalURL" function
    Current link is not external
    Received: ${url}
    ` });

    return '';
  }

  const sanitizedUrl = sanitizeUrl(url);

  if (sanitizedUrl === 'about:blank') {
    showDefaultValidateExternalURLErr(url);
    return '';
  }

  const isMailTo = sanitizedUrl.startsWith('mailto');
  const isValidHttp = sanitizedUrl.startsWith('http:');
  const isValidHttps = sanitizedUrl.startsWith('https:');

  if (isMailTo || isValidHttp || isValidHttps) {
    return sanitizedUrl;
  }

  showDefaultValidateExternalURLErr(url);
  return '';
};

