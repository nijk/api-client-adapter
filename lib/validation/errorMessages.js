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