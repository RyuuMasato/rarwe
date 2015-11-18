import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'rarwe/tests/helpers/start-app';
import Pretender from 'pretender';
import httpStubs from '../helpers/http-stubs';

var application,
    server;

module('Acceptance | bands', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
    server.shutdown();
  }
});

test('List bands', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Radiohead' },
        { id: 2, name: 'Long Distance Calling' },
      ]
    });
  });

  visit('/bands').then(function() {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertElement(assert, '.band-link:contains("Radiohead")', "First band link contains the band name");
    assertElement(assert, '.band-link:contains("Long Distance Calling")', "The other band link contains the band name");
  });
});

test('Create a new band', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Radiohead' }
      ]
    });
    httpStubs.stubCreateBand(this);
  });

  visit('/bands')
    .fillIn('.new-band', 'Long Distance Calling')
    .click('.new-band-button')
    .then(function() {
    assertLength(assert, '.band-link', 2, "All band links are rendered");
    assertTrimmedText(assert, '.band-link:last', 'Long Distance Calling', "Created band appears att the end of the list");
    assertElement(assert, '.nav a.active:contains("Songs")', "The Songs tab is active");
  });
});

test('Create a new song in two steps', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Radiohead' }
      ]
    });
    httpStubs.stubCreateSong(this);
  });

  visit('/')
    .selectBand('Radiohead')
    .click('a:contains("create one")')
    .fillIn('.new-song', 'Killer Cars')
    .triggerEvent('.new-song-form', 'submit')
    .then(function() {
    assertTrimmedText(assert, '.song:first', 'Killer Cars', "Creates the song and displays it in the list");
    assertElement(assert, '.song:contains("Killer Cars")', "Creates the song and displays it in the list");
  });
});

// test('Sort songs in various ways', function(assert) {
//   server = new Pretender(function() {
//     httpStubs.stubBands(this, {
//
//     })
//   })
// })
