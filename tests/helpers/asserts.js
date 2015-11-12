import Ember from 'ember';

function assertTrimmedText(app, assert, selector, text, errorMessage, context) {
  var element = findWithAssert(selector);
  var elementText = element.text().trim();
  assert.equal(elementText, text, errorMessage);
}

function assertLength(app, assert, selector, length, errorMessage, context) {
  assert.equal(find(selector).length, 1, errorMessage);
}

function assertElement(app, assert, selector, errorMessage, context) {
  assert.equal(find(selector).length, 1, errorMessage);
}

Ember.Test.registerHelper('assertTrimmedText', assertTrimmedText);
Ember.Test.registerHelper('assertLength', assertLength);
Ember.Test.registerHelper('assertElement', assertElement);
