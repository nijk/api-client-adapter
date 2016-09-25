(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "name": "default",
  "middleware": "redux-api-middleware",
  "api": {
    "endpoint": "http://foo.com",
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    "resources": ["bar", "baz", "qux"]
  }
}

},{}],2:[function(require,module,exports){
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
},{"../config/default":1,"./validation/errorMessages":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var configMessages = {
  init: function init(omittedProps, config) {
    return {
      omittedProps: 'Missing properties in config: ' + omittedProps.join(', '),
      typeofName: 'Incorrect type for name (' + _typeof(config.name) + '). This property should be a string.',
      typeofMiddleware: 'Incorrect type for name (' + _typeof(config.middleware) + '). This property should be a string.'
    };
  }
};

exports.configMessages = configMessages;
},{}]},{},[2]);
