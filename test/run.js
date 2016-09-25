'use strict';

var expect = require('chai').expect;
var sinon = require('sinon-es6');

var configMessages = require('../src/validation/errorMessages').configMessages;
var Client = require('../src/index').default;

var sampleConfig = {
  "name": "foo",
  "middleware": "bar",
  "api": {
    "endpoint": "http://foo.com",
    "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
    "resources": ["bar", "baz", "qux"]
  }
};

describe('client', function() {
  describe('constructor', function() {
    it('should accept a config object', function() {
      var spy = sinon.spy(Client);
      var config = sampleConfig;
      new spy(config);

      expect(spy.calledWith(config)).to.be.true;
    });

    it('should store the constructor param', function() {
      var config = sampleConfig;
      var client = new Client(config);

      expect(client.config.name).to.equal('foo');
      expect(client.config.middleware).to.equal('bar');
    });

    it('should error if rqd props are missing', function() {
      var config = {};
      var missingProps = ['name', 'middleware'];
      var errMsg = new RegExp(configMessages.init(missingProps, config).omittedProps);

      expect(function() { new Client(config) }).to.throw(errMsg);
    });

    it('should error if name is incorrect type', function() {
      var config = {
        "name": 1,
        "middleware": ""
      };

      var errMsg = configMessages.init([], config).typeofName;

      expect(function() { new Client(config) }).to.throw(Error, errMsg);
    });

    it('should error if middleware is incorrect type', function() {
      var config = {
        "name": "foo",
        "middleware": () => {}
      };

      var errMsg = configMessages.init([], config).typeofMiddleware;

      expect(function() { new Client(config) }).to.throw(Error, errMsg);
    });


  });
});
