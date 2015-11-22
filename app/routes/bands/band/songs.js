import Ember from 'ember';
import wait from '../../../utils/wait';

export default Ember.Route.extend({
  model: function() {
    return wait(this.modelFor('bands.band'), 1000);
  },

  actions: {
    didTransition:  function() {
      var band = this.modelFor('bands.band');
      Ember.$(document).attr('title', `${band.get('name')} songs - Rock & Roll`);
    },
    createSong: function() {
      var controller = this.get('controller'),
          band = this.modelFor('bands.band');

      var song = this.store.createRecord('song', {
        title: controller.get('title'),
        band: band
      });
      song.save().then(function () {
        controller.set('title', '');
      });
    },
    removeSong: function(song) {
      this.store.find('song', song.id).then(function (song) {
        song.destroyRecord();
      });
    },
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

      song.set('rating', rating);
    }
  }
});
