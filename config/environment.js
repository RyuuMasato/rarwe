/* jshint node: true */
var contentSecurityPolicy = {
  'default-src' : "'none'" ,
  'script-src' : "'self'" ,
  'font-src' : "'self'" ,
  'connect-src' : "'self' wss://s-dal5-nss-22.firebaseio.com/.ws?v=5&ns=rock-and-roll-ember:*" ,
  'img-src' : "'self'" ,
  'style-src' : "'self' 'unsafe-inline'" ,
  'media-src' : "'self'"
};

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'rarwe',
    environment: environment,
    firebase: 'https://rock-and-roll-ember.firebaseio.com',
    baseURL: '/',
    locationType: 'auto',
    apiHost: 'http://json-api.rockandrollwithemberjs.com',
    contentSecurityPolicy: contentSecurityPolicy,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.contentSecurityPolicy = contentSecurityPolicy;
    ENV.contentSecurityPolicy[ 'script-src' ] = "'self' 'unsafe-eval'" ;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.apiHost = '';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
