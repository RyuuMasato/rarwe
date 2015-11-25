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

test('Sort songs in various ways', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Them Crooked Vultures', songs: [1, 2, 3, 4]}
      ],
      songs: [
        { id: 1, title: 'Elephants', rating: 5 },
        { id: 2, title: 'New Fang', rating: 4 },
        { id: 3, title: 'Mind Eraser, No Chaser', rating: 4 },
        { id: 4, title: 'Spinning In Daffodils', rating: 5 },

      ]
    });
  });

  selectBand('Them Crooked Vultures')
    .then(function() {
      assert.equal(currentURL(), '/bands/1/songs');
      assertTrimmedText(assert, '.song:first', 'Spinning In Daffodils', "The first song is the lowest ranked, first in the alphabet");
      assertTrimmedText(assert, '.song:last', 'Elephants', "The last song is the one that is the first in the alphabet");
    })
    .click('button.sort-rating-desc')
    .then(function() {
      assert.equal(currentURL(), '/bands/1/songs?sort=ratingDesc');
      assertTrimmedText(assert, '.song:first', 'Elephants', "The first song is the highest ranked, first in the alphabet");
      assertTrimmedText(assert, '.song:last', 'New Fang', "The last song is the lowest ranked, last in the alphabet");
    })
    .click('button.sort-rating-asc')
    .then(function() {
      assert.equal(currentURL(), '/bands/1/songs?sort=ratingAsc');
      assertTrimmedText(assert, '.song:first', 'Mind Eraser, No Chaser', "The first song is the lowest ranked, first in the alphabet");
      assertTrimmedText(assert, '.song:last', 'Spinning In Daffodils', "The last song is the highest ranked, last in the alphabet");
    });
});

test('Search songs', function(assert) {
  server = new Pretender(function() {
    httpStubs.stubBands(this, {
      bands: [
        { id: 1, name: 'Them Crooked Vultures', songs: [1, 2, 3, 4, 5]}
      ],
      songs: [
        { id: 1, title: 'Elephants', rating: 5 },
        { id: 2, title: 'New Fang', rating: 4 },
        { id: 3, title: 'Mind Eraser, No Chaser', rating: 4 },
        { id: 4, title: 'Spinning In Daffodils', rating: 5 },
        { id: 5, title: 'No One Loves Me & Neither Do I', rating: 3 },
      ]
    });
  });
  visit('/bands/1/songs')
    .fillIn('.search-field', 'no')
    .then(function() {
      assertLength(assert, '.song', 2, "The songs matching the search term are displayed");
    })
    .click('button.sort-title-desc')
    .then(function() {
      assertTrimmedText(assert, '.song:first', 'No One Loves Me & Neither Do I', "The matching song that comes later in the alphabet appears on top");
      assertTrimmedText(assert, '.song:last', 'Mind Eraser, No Chaser', "The matching song that comes sooner in the alphabet appears on top");
    });
});
