'use strict';

import '../config/default';

import { configMessages } from './validation/errorMessages';

// Create entry point

  // Pull in config from params

  // Pull in defined middleware

  // Pull in type descriptors

const validateMissingConfigProps = config => {
  let omittedProps = [];

  if (!config.hasOwnProperty('name')) {
    omittedProps.push('name');
  }

  if (!config.hasOwnProperty('middleware')) {
    omittedProps.push('middleware');
  }

  if (omittedProps.length > 0) {
    const msg = configMessages.init(omittedProps, config).omittedProps;
    throw new Error(msg);
  }
};

const validateConfigProps = config => {
  if (typeof config.name !== 'string') {
    const msg = configMessages.init([], config).typeofName;
    throw new Error(msg);
  }

  if (typeof config.middleware !== 'string') {
    const msg = configMessages.init([], config).typeofMiddleware;
    throw new Error(msg);
  }
};

class Client {
  constructor (config = defaultConfig) {
    //import config from `../config/${configName}`;

    //console.info('client constructor', config);
    this.config = config;

    try {
      validateMissingConfigProps(this.config);
      validateConfigProps(this.config);
    } catch (e) {
      throw new Error(e);
    }

  }


  // Create common methods

}

export default Client;
