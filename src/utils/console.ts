import { isProduction } from 'env';


type TConsoleCommon = {
  message: unknown;
  optionalParams?: unknown[];
};

/**
 * Extended console error message
 */
export const consoleError = (props: TConsoleCommon) => {

  const {
    message,
    optionalParams,
  } = props;

  if (message && !isProduction()) {
    /* eslint-disable-next-line no-console -- It's allowed here */
    console.error(message, ...(optionalParams || []));
  }
};


type TConsoleErrorGrouped = {
  groupName: string;
  messages: TConsoleCommon[];
  optionalParams?: unknown[];
};

/**
 * Extended group console err message
 */
export const consoleErrorGrouped = (props: TConsoleErrorGrouped) => {

  const {
    groupName,
    messages,
    optionalParams,
  } = props;

  if (messages.length && !isProduction()) {
    /* eslint-disable no-console -- It's allowed here */
    console.group(groupName, ...(optionalParams || []));
    messages.forEach(message => console.error(message, ...(message.optionalParams || [])));
    console.groupEnd();
    /* eslint-enable no-console */
  }
};

