# api-client-adapter

## Purpose
This module allows JS apps to make multiple RESTful API calls using a common interface pattern by 
providing configuration and data handlers.

The purpose of this module is to centralise configuration and logic for javascript clients to access resources on 
numerous RESTful APIs. The need for this arises when either or both of the following are true:

- Multiple projects consume the same API, sharing common goals such as authentication followed by further common ops
- Multiple APIs are consumed by the client, they may or may not share commonalities

### The benefits of using an API Client Factory are:

- Configuration objects define static data.operations 
- Compose API calls through Operations provide a control flow of API calls and handlers. Operations can depened 
- Request and response structure can be standardised through data handlers
- The specifics of normalising data can be described as maps or functions
- Data handlers are processed as part of a pipeline of middleware. Allowing for fully configurable request and response
flows
- Modular design: only require in the dependencies you need for the project

_N.B._ When multiple projects consume API(s): config, descriptors & base/custom middleware might be stored in a standalone repository to allow for re-use of code across projects.

### Architecture:

- Declarative config objects (JS Objects, JSON) define API structure and capabilities 
- Pass a config object on creation of middleware
- Factory or Abstract Factory pattern to create a middleware pipeline
- Provide some middleware, but allow others to be created and organised within a pipeline
- Uses ES2016 async/await pattern for responses
- Transpiled to ES5?

## Install

// TODO

## Example usage:
```
import apiClientFactory from …;
import baseMiddleware from …; //e.g: 'redux-api-middleware'

const config = {
  name: 'default',
  middleware: [baseMiddleware],
  api: {
    endpoint: 'http://foo.com',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS', 'HEAD'],
    resources: ['bar', 'baz', 'qux']
  }
};

const operations = {
  '*first': {
    FAILURE: ['handler.analiseFailure']
  },
  '*last': {
    SUCCESS: ['ops.log.']
    FAILURE: ['ops.log.error']
  },
  auth: {
    REQUEST: ['handler.auth'],
    SUCCESS: ['handler.authSuccess'],
    FAILURE: ['handler.authFailure']
  },
  log: {
    '*last': {
    FAILURE: ['handler.retryTwice']
    },
    timing: {
    REQUEST: ['handler.log.timing']
    },
    error: {
    REQUEST: ['handler.log.error']
    }    
  },
  postFoo: {
    DEPENDS: ['handler.isUserAuth'],
    REQUEST: ['handler.getFoo'],
    SUCCESS: ['handler.getFooSuccess'],
    FAILURE: ['handler.getFooFailure']
  },
  getBar: {
    DEPENDS: ['handler.isUserAuth'],
    REQUEST: ['handler.getBar'],
    SUCCESS: ['handler.getBarSuccess'],
    FAILURE: ['handler.getBarFailure']
  },
  getFooBar: { 
    DEPENDS: ['ops.getFoo.SUCCESS']
    REQUEST: ['handler.getBar'],
    SUCCESS: ['handler.getFooBarSuccess'],
    FAILURE: ['handler.getFooBarFailure']
  },
};

const handlers = {
  analiseFailure: (req) => {
    // Failure response code logic
    return req;
  },
  auth: (req) => {
    // Normalise request data
    return req;
  },
  authSucess: (req, res) => {
    // Normalise response data
    return res;
  },
  authFailure: (req, res) => {
    // Normalise response data
    return res;
  }
};

let myAPI = apiClientFactory.init(config, operations, handlers);

myAPI.getBar(payload, headers)
  .then(res => {
    // Handle success
  }).catch(
    // Handle failure
  );
```
