import Ember from 'ember';
import startApp from 'rarwe/tests/helpers/start-app';
import Pretender from 'pretender'; // import Stub
import { module, test } from 'qunit';

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
    this.get('/bands', function() {
      var bands = JSON.stringify({
        bands: [
          { id: 1, name: 'Radiohead' },
          { id: 2, name: 'Long Distance Calling' },
        ]
      });
      return [200, {"Content-Type": "application/json"}, bands];
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
    this.get('/bands', function() {
      var bands = JSON.stringify({
        bands: [
          { id: 1, name: 'Radiohead' }
        ]
      });
      return [200, {"Content-Type": "application/json"}, bands];
    });

    this.post('/bands', function() {
      var band = JSON.stringify({
        band: { id: 2, name: 'Long Distance Calling' }
      });
      return [200, {"Content-Type": "application/json" }, band];
    });
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
    this.get('/bands', function() {
      var bands = JSON.stringify({
        bands: [
          { id: 1, name: 'Radiohead' }
        ]
      });
      return [200, {"Content-Type": "application/json"}, bands];
    });

    this.post('/songs', function() {
      var song = JSON.stringify({
        song: {
          id: 1,
          title: 'Killer Cars'
        }
      });
      return [200, {"Content-Type": "application/json"}, song];
    });
  });

  visit('/')
    .selectBand('Radiohead')
    .click('a:contains("create one")')
    .fillIn('.new-song', 'Killer Cars')
    .triggerEvent('.new-song-form', 'submit')
    .then(function() {
    assertElement(assert, '.song .song:contains("Killer Cars")', "Creates the song and displays it in the list");
  });
});
