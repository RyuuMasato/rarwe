import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
moduleFor('controller:bands/band/songs', 'BandsBandSongsController');

test('canCreateSong', function(assert) {
  assert.expect(3);

  var controller = this.subject();
  var band = Ember.Object.create();
  controller.set('model', band);

  controller.set('songCreationStarted', false);

  assert.ok(!controller.get('canCreateSong'), "Can't create song if process has not started and no songs yet");

  controller.set('songCreationStarted', true );

  assert.ok(controller.get('canCreateSong'), "Can create song if process has started");

  controller.set('songCreationStarted' , false);
  var songs = [
    Ember.Object.create({ id: 1, title: 'Elephants', rating: 5 }),
  ];
  
    band.set('songs', songs);
    assert.ok(controller.get('canCreateSong'), "Can create song if process has not started but there are already songs");
  });
