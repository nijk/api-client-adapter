'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('../config/default');

var _errorMessages = require('./validation/errorMessages');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Create entry point

// Pull in config from params

// Pull in defined middleware

// Pull in type descriptors

var validateMissingConfigProps = function validateMissingConfigProps(config) {
  var omittedProps = [];

  if (!config.hasOwnProperty('name')) {
    omittedProps.push('name');
  }

  if (!config.hasOwnProperty('middleware')) {
    omittedProps.push('middleware');
  }

  if (omittedProps.length > 0) {
    var msg = _errorMessages.configMessages.init(omittedProps, config).omittedProps;
    throw new Error(msg);
  }
};

var validateConfigProps = function validateConfigProps(config) {
  if (typeof config.name !== 'string') {
    var msg = _errorMessages.configMessages.init([], config).typeofName;
    throw new Error(msg);
  }

  if (typeof config.middleware !== 'string') {
    var _msg = _errorMessages.configMessages.init([], config).typeofMiddleware;
    throw new Error(_msg);
  }
};

var Client = function Client() {
  var config = arguments.length <= 0 || arguments[0] === undefined ? defaultConfig : arguments[0];

  _classCallCheck(this, Client);

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

;

exports.default = Client;