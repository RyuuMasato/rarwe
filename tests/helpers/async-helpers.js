import Ember from 'ember';

function selectBand(app, name) {
  visit('/')
  .click('.band-link:contains("' + name + '")');

  return app.testHelpers.wait();
}

function submit(app, selector, context) {
  return triggerEvent(selector, 'submit', context);
}

Ember.Test.registerAsyncHelper('selectBand', selectBand);
Ember.Test.registerAsyncHelper('submit', submit);
