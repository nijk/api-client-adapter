'use strict';

const configMessages = {
  init: (omittedProps, config) => ({
    omittedProps: `Missing properties in config: ${omittedProps.join(', ')}`,
    typeofName: `Incorrect type for name (${typeof config.name}). This property should be a string.`,
    typeofMiddleware: `Incorrect type for name (${typeof config.middleware}). This property should be a string.`
  })
};

export { configMessages };
