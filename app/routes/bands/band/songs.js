import Ember from 'ember';
import Song from '../../../models/song';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('bands.band');
  },

  actions: {
    didTransition:  function() {
      var band = this.modelFor('bands.band');
      Ember.$(document).attr('title', `${band.get('name')} songs - Rock & Roll`)
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
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;

      song.set('rating', rating);
    }
  }
});
